import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Tag, 
  Sparkles, 
  ArrowLeft, 
  Share2, 
  Ticket, 
  CheckCircle, 
  Building2, 
  ShieldCheck, 
  Edit, 
  Trash2 
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/events/EventCard';
import { RegistrationModal } from '../components/events/RegistrationModal';
import { TicketModal } from '../components/events/TicketModal';
import { ConfirmModal } from '../components/common/ConfirmModal';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent, showToast } = useEvents();

  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [activeTicket, setActiveTicket] = useState(null);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <Sparkles className="w-16 h-16 text-violet-600 mx-auto animate-bounce" />
        <h2 className="text-3xl font-extrabold text-slate-900">Event Not Found</h2>
        <p className="text-sm text-slate-600">The event you are looking for might have been deleted or relocated.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 text-white font-bold text-xs uppercase shadow-md shadow-violet-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  const isSoldOut = event.availableSeats <= 0;
  const similarEvents = events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Event URL copied to clipboard!', 'info');
  };

  return (
    <div className="pb-20 space-y-12">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-violet-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events Directory</span>
        </Link>
      </div>

      {/* Hero Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl">
          
          <div className="relative h-80 sm:h-[450px] w-full bg-slate-100">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
          </div>

          {/* Badges Over Cover */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/90 text-violet-700 border border-slate-200 backdrop-blur-md shadow-xs uppercase tracking-wide">
              {event.category}
            </span>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/90 border border-slate-200 text-slate-700 hover:text-violet-600 transition-all shadow-xs"
                title="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <Link
                to={`/edit-event/${event.id}`}
                className="p-2.5 rounded-full bg-white/90 border border-slate-200 text-slate-700 hover:text-violet-600 transition-all shadow-xs"
                title="Edit Details"
              >
                <Edit className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Title Banner */}
          <div className="absolute bottom-6 left-6 right-6 z-10 space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900 text-white shadow-xs">
                ${event.price} / Pass
              </span>
              <span className="text-xs text-slate-200 flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-violet-300" />
                Hosted by {event.organizer || 'AURA VIP'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white max-w-3xl">
              {event.title}
            </h1>
          </div>

        </div>
      </section>

      {/* Main Grid: Details Left, Action Sticky Right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Main Information */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-slate-500 block">Date & Time</span>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-violet-600" />
                  {event.date}
                </span>
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-violet-600" />
                  {event.time}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-slate-500 block">Location</span>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  {event.location}
                </span>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[11px] uppercase font-bold text-slate-500 block">Remaining Seats</span>
                <span className={`text-xs font-bold flex items-center gap-1.5 ${
                  isSoldOut ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  <Users className="w-4 h-4" />
                  {isSoldOut ? 'Sold Out' : `${event.availableSeats} of ${event.totalSeats} left`}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-xl font-bold font-display text-slate-900">Event Overview</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                {event.description}
              </p>

              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {event.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-[11px] font-bold bg-violet-50 text-violet-700 border border-violet-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Agenda / Schedule Breakdown */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <h3 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-violet-600" />
                  <span>Program Agenda Timeline</span>
                </h3>

                <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative pl-8 flex items-start gap-3">
                      <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-violet-600 shadow-xs" />
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 w-full text-xs font-semibold text-slate-800">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Action Panel */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Single VIP Pass</span>
                  <span className="text-3xl font-extrabold font-display text-slate-900">${event.price}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Instant Confirmation
                </span>
              </div>

              {/* Seats Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Available Capacity</span>
                  <span className="text-violet-700 font-bold">{event.availableSeats} Seats Left</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                    style={{ width: `${((event.totalSeats - event.availableSeats) / event.totalSeats) * 100}%` }}
                  />
                </div>
              </div>

              {/* Primary Register Button */}
              <button
                onClick={() => setSelectedEventForReg(event)}
                disabled={isSoldOut}
                className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                  isSoldOut
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-500/25 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <Ticket className="w-4 h-4 text-white" />
                <span>{isSoldOut ? 'Sold Out' : 'Register VIP Pass'}</span>
              </button>

              <div className="space-y-3 pt-2 text-xs text-slate-600 font-medium border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-violet-600" />
                  <span>100% Guaranteed seat reservation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Instant digital pass QR generation</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SIMILAR EVENTS */}
      {similarEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <h2 className="text-2xl font-bold font-display text-slate-900">
            Similar Events in {event.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                onRegisterClick={(e) => setSelectedEventForReg(e)}
                onDeleteClick={(e) => setEventToDelete(e)}
              />
            ))}
          </div>
        </section>
      )}

      {/* MODALS */}
      <RegistrationModal
        event={selectedEventForReg}
        isOpen={!!selectedEventForReg}
        onClose={() => setSelectedEventForReg(null)}
        onSuccessRegistration={(reg) => setActiveTicket(reg)}
      />

      <TicketModal
        registration={activeTicket}
        isOpen={!!activeTicket}
        onClose={() => setActiveTicket(null)}
      />

      <ConfirmModal
        isOpen={!!eventToDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${eventToDelete?.title}"?`}
        confirmText="Delete Event"
        onConfirm={() => {
          deleteEvent(eventToDelete.id);
          navigate('/events');
        }}
        onClose={() => setEventToDelete(null)}
      />

    </div>
  );
};
