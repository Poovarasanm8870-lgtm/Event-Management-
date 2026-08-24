import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  User, 
  QrCode, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { TicketModal } from '../components/events/TicketModal';
import { ConfirmModal } from '../components/common/ConfirmModal';

export const MyRegistrations = () => {
  const { registrations, cancelRegistration } = useEvents();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [regToCancel, setRegToCancel] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600">
            DIGITAL TICKET WALLET
          </span>
          <h1 className="text-4xl font-extrabold font-display text-slate-900">
            My Registered Events
          </h1>
          <p className="text-sm text-slate-600 font-normal">
            View your confirmed VIP passes, access digital QR codes, or manage registrations.
          </p>
        </div>

        <Link
          to="/events"
          className="px-6 py-3 rounded-2xl bg-white border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 shrink-0 flex items-center gap-2 shadow-xs"
        >
          <span>Browse More Events</span>
          <ArrowRight className="w-4 h-4 text-violet-600" />
        </Link>
      </div>

      {/* Registrations List */}
      {registrations.length === 0 ? (
        <div className="text-center py-24 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <Ticket className="w-16 h-16 text-slate-400 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-slate-900">No Tickets in Wallet Yet</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            You haven't registered for any events yet. Explore our premier lineup of conferences, festivals, and galas!
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-violet-500/25"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover Events Now</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((reg) => (
            <motion.div
              key={reg.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-violet-300 hover:shadow-xl transition-all duration-300 shadow-xs group"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={reg.eventImage}
                    alt={reg.eventTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 backdrop-blur-md">
                      ✓ {reg.status}
                    </span>
                    <span className="font-mono text-xs font-bold bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-white">
                      {reg.ticketId}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-display text-slate-900 line-clamp-1 group-hover:text-violet-700 transition-colors">
                    {reg.eventTitle}
                  </h3>

                  <div className="space-y-2 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                      <span>{reg.eventDate} • {reg.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="truncate">{reg.eventLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Holder: {reg.userName} ({reg.ticketsCount} Ticket{reg.ticketsCount > 1 ? 's' : ''})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex items-center gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() => setSelectedTicket(reg)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-violet-50 border border-violet-200 text-violet-700 font-bold text-xs uppercase hover:bg-violet-100 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <QrCode className="w-4 h-4 text-violet-600" />
                  <span>View Pass</span>
                </button>

                <button
                  onClick={() => setRegToCancel(reg)}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all"
                  title="Cancel Registration"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      )}

      {/* MODALS */}
      <TicketModal
        registration={selectedTicket}
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />

      <ConfirmModal
        isOpen={!!regToCancel}
        title="Cancel Registration"
        message={`Are you sure you want to cancel your registration for "${regToCancel?.eventTitle}"? Your seat will be restored to the available pool.`}
        confirmText="Cancel Ticket"
        onConfirm={() => cancelRegistration(regToCancel.id)}
        onClose={() => setRegToCancel(null)}
      />

    </div>
  );
};
