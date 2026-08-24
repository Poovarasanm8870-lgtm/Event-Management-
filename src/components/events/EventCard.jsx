import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Edit, 
  Trash2, 
  Tag 
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export const EventCard = ({ event, onRegisterClick, onDeleteClick }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const isSoldOut = event.availableSeats <= 0;
  const seatRatio = ((event.totalSeats - event.availableSeats) / event.totalSeats) * 100;

  const handleMouseMove = (e) => {
    // Disable complex 3D tilt on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="group relative rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10"
    >
      {/* Specular Glare Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)`,
        }}
      />

      <div>
        {/* Cover Image Container */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 text-violet-700 border border-slate-200 backdrop-blur-md shadow-xs flex items-center gap-1.5 uppercase tracking-wide">
              <Tag className="w-3 h-3 text-violet-600" />
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900/90 text-white backdrop-blur-md border border-slate-800 shadow-xs">
              ${event.price}
            </span>
          </div>

          {/* Featured Ribbon */}
          {event.featured && (
            <div className="absolute bottom-3 left-4 flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/95 border border-amber-300 px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
              <span>FEATURED GALA</span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-1">
            {event.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {event.description}
          </p>

          <div className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-violet-600 shrink-0" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Seat Capacity Progress Meter */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Users className="w-3.5 h-3.5 text-violet-600" />
                <span>Seats Availability</span>
              </span>
              <span className={`font-bold ${
                isSoldOut ? 'text-rose-600' : event.availableSeats < 15 ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {isSoldOut ? 'SOLD OUT' : `${event.availableSeats} left / ${event.totalSeats}`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isSoldOut
                    ? 'bg-rose-500'
                    : event.availableSeats < 15
                    ? 'bg-amber-500 shadow-xs'
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, 100 - seatRatio))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 flex items-center gap-2">
        <Link
          to={`/events/${event.id}`}
          className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-violet-600" />
        </Link>

        <button
          onClick={() => onRegisterClick(event)}
          disabled={isSoldOut}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
            isSoldOut
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-500/20 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isSoldOut ? 'Sold Out' : 'Register Now'}
        </button>

        {/* Quick Admin Actions (Edit/Delete) */}
        <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
          <Link
            to={`/edit-event/${event.id}`}
            title="Edit Event"
            className="p-2 rounded-lg text-slate-500 hover:text-violet-600 hover:bg-slate-100 transition-all"
          >
            <Edit className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onDeleteClick(event)}
            title="Delete Event"
            className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
