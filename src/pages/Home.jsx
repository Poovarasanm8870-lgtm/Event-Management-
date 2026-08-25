import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Calendar, 
  Search, 
  ArrowRight, 
  Ticket, 
  Users, 
  Star, 
  PlusCircle, 
  CheckCircle 
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/events/EventCard';
import { CoverflowSlider } from '../components/events/CoverflowSlider';
import { StatsCounter } from '../components/common/StatsCounter';
import { RegistrationModal } from '../components/events/RegistrationModal';
import { TicketModal } from '../components/events/TicketModal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { EVENT_CATEGORIES } from '../data/seedEvents';

export const Home = () => {
  const { events, registrations, deleteEvent } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [activeTicket, setActiveTicket] = useState(null);

  const filteredEvents = events.filter((e) => {
    if (selectedCategory === 'All') return true;
    return e.category === selectedCategory;
  });

  const stats = [
    { label: 'Live Events', value: `${events.length}+`, icon: Calendar, subtext: 'Curated world-class galas' },
    { label: 'Registrations', value: `${registrations.length + 340}+`, icon: Ticket, subtext: 'VIP attendees confirmed' },
    { label: 'Seat Utilization', value: '94%', icon: Users, subtext: 'Average capacity filled' },
    { label: 'Rating', value: '4.9/5', icon: Star, subtext: 'Based on 1.2k reviews' },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Background glow graphics */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-violet-200/40 via-indigo-200/30 to-cyan-200/40 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-violet-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Next Generation Event Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]"
          >
            Curating Extraordinary <br />
            <span className="gradient-text-cyan-purple">Experiences & Galas</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Discover tech summits, electronic odysseys, venture galas, and design expos. Seamless booking, real-time seat tracking, and instant digital passes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/events"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Explore All Events</span>
            </Link>

            <Link
              to="/add-event"
              className="px-8 py-4 rounded-2xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-extrabold text-sm uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-violet-600" />
              <span>Create Event</span>
            </Link>
          </motion.div>

        </div>

        {/* 3D COVERFLOW CAROUSEL SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <CoverflowSlider
            events={events}
            onRegisterClick={(evt) => setSelectedEventForReg(evt)}
          />
        </motion.div>
      </section>

      {/* STATS METRICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatsCounter stats={stats} />
      </section>

      {/* FEATURED & CATEGORY BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Curated Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mt-1">
              Explore Featured Events
            </h2>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-700 group"
          >
            <span>View Complete Directory ({events.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {EVENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 font-bold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.slice(0, 6).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegisterClick={(evt) => setSelectedEventForReg(evt)}
              onDeleteClick={(evt) => setEventToDelete(evt)}
            />
          ))}
        </motion.div>
      </section>

      {/* HOST AN EVENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 shadow-2xl text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/20 text-violet-200 border border-white/30 uppercase tracking-wider">
              ORGANIZER STUDIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
              Host Your Next Flagship Event With ARASAN
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Launch events in seconds with instant capacity management, form validations, ticket wallets, and real-time LocalStorage tracking.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/add-event"
                className="px-7 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                Create Event Now
              </Link>
            </div>
          </div>
        </div>
      </section>

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
        message={`Are you sure you want to delete "${eventToDelete?.title}"? This cannot be undone.`}
        confirmText="Delete Event"
        onConfirm={() => deleteEvent(eventToDelete.id)}
        onClose={() => setEventToDelete(null)}
      />

    </div>
  );
};
