import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Ticket, User, Mail, Plus, Minus, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export const RegistrationModal = ({ event, isOpen, onClose, onSuccessRegistration }) => {
  const { registerForEvent } = useEvents();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketsCount, setTicketsCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !event) return null;

  const validateForm = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (ticketsCount < 1) errs.ticketsCount = 'Minimum 1 ticket required';
    if (ticketsCount > event.availableSeats) errs.ticketsCount = `Only ${event.availableSeats} seats remaining`;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#4F46E5', '#0891B2', '#059669', '#D97706']
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const res = registerForEvent({
        eventId: event.id,
        userName: fullName.trim(),
        userEmail: email.trim(),
        ticketsCount,
        notes: notes.trim()
      });

      setIsSubmitting(false);

      if (res.success) {
        triggerConfetti();
        onClose();
        if (onSuccessRegistration) {
          onSuccessRegistration(res.registration);
        }
      }
    }, 600);
  };

  const totalPrice = event.price * ticketsCount;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600 shadow-xs">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900">VIP Event Registration</h2>
              <p className="text-xs text-slate-500 truncate max-w-xs">{event.title}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-violet-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Alexandra Thorne"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border ${
                    errors.fullName ? 'border-rose-500' : 'border-slate-200 focus:bg-white focus:border-violet-500'
                  } text-sm text-slate-900 focus:outline-none transition-all placeholder:text-slate-400`}
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-violet-600">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="e.g. alexandra@frontier.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border ${
                    errors.email ? 'border-rose-500' : 'border-slate-200 focus:bg-white focus:border-violet-500'
                  } text-sm text-slate-900 focus:outline-none transition-all placeholder:text-slate-400`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
            </div>

            {/* Tickets Quantity Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Tickets (Available: {event.availableSeats})
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-sm font-semibold text-slate-900">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTicketsCount(Math.max(1, ticketsCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-bold text-violet-700 w-6 text-center">{ticketsCount}</span>
                  <button
                    type="button"
                    onClick={() => setTicketsCount(Math.min(event.availableSeats, ticketsCount + 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {errors.ticketsCount && <p className="text-[11px] text-rose-600 mt-1">{errors.ticketsCount}</p>}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Dietary & Special Requests (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Vegan meal preference, wheelchair access requirement..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-violet-500 resize-none placeholder:text-slate-400"
              />
            </div>

            {/* Pricing Breakdown Card */}
            <div className="p-4 rounded-2xl bg-violet-50/80 border border-violet-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Total Investment</span>
                <span className="text-xs text-violet-700 font-bold">${event.price} × {ticketsCount} Pass</span>
              </div>
              <span className="text-2xl font-extrabold font-display text-slate-900">
                ${totalPrice}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || event.availableSeats <= 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing VIP Pass...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>Confirm Registration (${totalPrice})</span>
                </span>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
