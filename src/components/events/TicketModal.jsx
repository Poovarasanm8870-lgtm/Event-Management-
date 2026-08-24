import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Calendar, MapPin, User, Mail, Printer, Download, X, QrCode, Sparkles } from 'lucide-react';

export const TicketModal = ({ registration, isOpen, onClose }) => {
  if (!isOpen || !registration) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        {/* Ticket Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          className="relative w-full max-w-xl z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Luxury Card Design */}
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-2xl">
            
            {/* Header Ribbon */}
            <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span className="font-display font-extrabold tracking-wider text-xs uppercase">
                  OFFICIAL VIP ACCESS PASS
                </span>
              </div>
              <span className="font-mono text-xs font-bold bg-white/20 px-3 py-1 rounded-full border border-white/30 text-white">
                {registration.ticketId}
              </span>
            </div>

            {/* Ticket Main Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Event Image & Title */}
              <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <img
                  src={registration.eventImage}
                  alt={registration.eventTitle}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    {registration.eventTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-violet-700 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{registration.eventDate} • {registration.eventTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{registration.eventLocation}</span>
                  </div>
                </div>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Pass Holder</span>
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <User className="w-4 h-4 text-violet-600" />
                    {registration.userName}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Contact Email</span>
                  <span className="font-semibold text-slate-800 truncate block">
                    {registration.userEmail}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Quantity & Status</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-emerald-600" />
                    {registration.ticketsCount} Ticket(s) • {registration.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Amount Paid</span>
                  <span className="font-bold text-slate-900 text-sm">
                    ${registration.totalPaid}
                  </span>
                </div>
              </div>

              {/* Perforated Stub Divider */}
              <div className="relative flex items-center justify-between my-4">
                <div className="w-6 h-6 bg-[#F8FAFC] rounded-full -ml-9 border-r border-slate-300" />
                <div className="w-full border-t-2 border-dashed border-slate-300" />
                <div className="w-6 h-6 bg-[#F8FAFC] rounded-full -mr-9 border-l border-slate-300" />
              </div>

              {/* QR Code & Barcode Simulation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                    <QrCode className="w-16 h-16 text-slate-900" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-violet-700 block">
                      SCAN FOR ENTRY
                    </span>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Present this digital QR code at the venue gate for instant check-in.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Printer className="w-4 h-4 text-violet-600" />
                    <span>Print Pass</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
