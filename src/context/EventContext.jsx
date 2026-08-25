import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS } from '../data/seedEvents';

const EventContext = createContext();

const LOCAL_STORAGE_EVENTS_KEY = 'arasan_events_v3';
const LOCAL_STORAGE_REGISTRATIONS_KEY = 'arasan_registrations_v3';

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY);
      if (savedEvents) {
        const parsed = JSON.parse(savedEvents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse events from LocalStorage:', e);
    }
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(INITIAL_EVENTS));
    return INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState(() => {
    try {
      const savedRegs = localStorage.getItem(LOCAL_STORAGE_REGISTRATIONS_KEY);
      if (savedRegs) {
        return JSON.parse(savedRegs);
      }
    } catch (e) {
      console.error('Failed to parse registrations from LocalStorage:', e);
    }
    return [];
  });

  const [toast, setToast] = useState(null);

  // Sync to LocalStorage whenever events change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(events));
    } catch (e) {
      console.error('Error saving events to LocalStorage', e);
    }
  }, [events]);

  // Sync to LocalStorage whenever registrations change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REGISTRATIONS_KEY, JSON.stringify(registrations));
    } catch (e) {
      console.error('Error saving registrations to LocalStorage', e);
    }
  }, [registrations]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const removeToast = () => {
    setToast(null);
  };

  // Add Event
  const addEvent = (newEventData) => {
    const createdEvent = {
      id: `evt-${Date.now()}`,
      availableSeats: Number(newEventData.totalSeats),
      totalSeats: Number(newEventData.totalSeats),
      price: Number(newEventData.price || 0),
      featured: false,
      tags: newEventData.category ? [newEventData.category] : ['Event'],
      ...newEventData
    };
    setEvents((prev) => [createdEvent, ...prev]);
    showToast(`Event "${createdEvent.title}" added successfully!`, 'success');
    return createdEvent;
  };

  // Update Event
  const updateEvent = (id, updatedData) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === id) {
          const totalSeats = Number(updatedData.totalSeats || evt.totalSeats);
          // Adjust available seats proportionally if capacity changed
          const seatsDiff = totalSeats - evt.totalSeats;
          const newAvailableSeats = Math.max(0, evt.availableSeats + seatsDiff);

          return {
            ...evt,
            ...updatedData,
            totalSeats,
            availableSeats: newAvailableSeats,
            price: Number(updatedData.price || evt.price)
          };
        }
        return evt;
      })
    );
    showToast('Event details updated successfully!', 'success');
  };

  // Delete Event
  const deleteEvent = (id) => {
    const target = events.find(e => e.id === id);
    setEvents((prev) => prev.filter((evt) => evt.id !== id));
    // Also remove registrations associated with this event
    setRegistrations((prev) => prev.filter((reg) => reg.eventId !== id));
    showToast(`Event "${target?.title || 'Event'}" has been deleted.`, 'info');
  };

  // Register for Event
  const registerForEvent = ({ eventId, userName, userEmail, ticketsCount = 1, notes = '' }) => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) {
      showToast('Event not found!', 'error');
      return { success: false, message: 'Event not found' };
    }

    if (targetEvent.availableSeats < ticketsCount) {
      showToast(`Not enough seats available! Only ${targetEvent.availableSeats} left.`, 'error');
      return { success: false, message: 'Insufficient seats' };
    }

    // Deduct seats
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === eventId
          ? { ...evt, availableSeats: evt.availableSeats - ticketsCount }
          : evt
      )
    );

    // Create registration record
    const ticketId = `TICKET-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const newRegistration = {
      id: `reg-${Date.now()}`,
      ticketId,
      eventId,
      eventTitle: targetEvent.title,
      eventDate: targetEvent.date,
      eventTime: targetEvent.time,
      eventLocation: targetEvent.location,
      eventImage: targetEvent.image,
      userName,
      userEmail,
      ticketsCount: Number(ticketsCount),
      totalPaid: targetEvent.price * ticketsCount,
      notes,
      registeredAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setRegistrations((prev) => [newRegistration, ...prev]);
    showToast(`Successfully registered for ${targetEvent.title}!`, 'success');
    return { success: true, registration: newRegistration };
  };

  // Cancel Registration
  const cancelRegistration = (registrationId) => {
    const targetReg = registrations.find((r) => r.id === registrationId);
    if (!targetReg) return;

    // Restore available seats
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === targetReg.eventId
          ? { ...evt, availableSeats: evt.availableSeats + targetReg.ticketsCount }
          : evt
      )
    );

    // Remove registration
    setRegistrations((prev) => prev.filter((r) => r.id !== registrationId));
    showToast(`Registration for "${targetReg.eventTitle}" canceled. Seat restored.`, 'info');
  };

  // Reset data to defaults
  const resetToSeedData = () => {
    setEvents(INITIAL_EVENTS);
    setRegistrations([]);
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(INITIAL_EVENTS));
    localStorage.setItem(LOCAL_STORAGE_REGISTRATIONS_KEY, JSON.stringify([]));
    showToast('Platform reset to default seed events.', 'info');
  };

  return (
    <EventContext.Provider
      value={{
        events,
        registrations,
        toast,
        showToast,
        removeToast,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        cancelRegistration,
        resetToSeedData
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
