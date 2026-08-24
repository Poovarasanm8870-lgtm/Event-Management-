import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Image as ImageIcon, 
  Tag, 
  FileText, 
  Sparkles, 
  Clock, 
  Building2 
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EVENT_CATEGORIES } from '../data/seedEvents';
import { EventCard } from '../components/events/EventCard';

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop"
];

export const AddEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    date: new Date().toISOString().split('T')[0],
    time: '09:00 AM - 05:00 PM',
    location: '',
    price: 199,
    totalSeats: 100,
    organizer: '',
    image: PRESET_IMAGES[0],
    description: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.location.trim()) errs.location = 'Event location is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (formData.totalSeats <= 0) errs.totalSeats = 'Total capacity must be > 0';
    if (formData.price < 0) errs.price = 'Price cannot be negative';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const created = addEvent(formData);
    navigate(`/events/${created.id}`);
  };

  // Preview event mock object
  const previewEvent = {
    id: 'preview',
    ...formData,
    availableSeats: Number(formData.totalSeats),
    totalSeats: Number(formData.totalSeats),
    price: Number(formData.price || 0),
    title: formData.title || 'Your Event Title Here',
    location: formData.location || 'Venue / City Location',
    description: formData.description || 'Live preview of your event description will appear here as you type...',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-600">
          EVENT CREATOR STUDIO
        </span>
        <h1 className="text-4xl font-extrabold font-display text-slate-900">
          Host a New Experience
        </h1>
        <p className="text-sm text-slate-600 font-normal">
          Fill in the details below. Watch your event card update live in 3D side-by-side preview.
        </p>
      </div>

      {/* Main Grid: Form Left, 3D Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Event Title <span className="text-violet-600">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. NextGen Web & AI Developer Conference 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-3 rounded-2xl bg-slate-50 border ${
                errors.title ? 'border-rose-500' : 'border-slate-200 focus:bg-white focus:border-violet-500'
              } text-sm text-slate-900 focus:outline-none transition-all placeholder:text-slate-400`}
            />
            {errors.title && <p className="text-[11px] text-rose-600 mt-1">{errors.title}</p>}
          </div>

          {/* Category & Organizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-violet-500 shadow-xs"
              >
                {EVENT_CATEGORIES.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Organizer / Host Name
              </label>
              <input
                type="text"
                placeholder="e.g. Horizon Labs"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Time Window
              </label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM - 06:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Venue / Location <span className="text-violet-600">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. San Francisco Tech Pavilion, CA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full px-4 py-3 rounded-2xl bg-slate-50 border ${
                errors.location ? 'border-rose-500' : 'border-slate-200 focus:bg-white focus:border-violet-500'
              } text-sm text-slate-900 focus:outline-none transition-all placeholder:text-slate-400`}
            />
            {errors.location && <p className="text-[11px] text-rose-600 mt-1">{errors.location}</p>}
          </div>

          {/* Price & Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Ticket Price ($)
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Total Seat Capacity
              </label>
              <input
                type="number"
                min="1"
                value={formData.totalSeats}
                onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Cover Image URL
            </label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500 placeholder:text-slate-400"
            />
            
            {/* Quick Presets */}
            <div className="flex items-center gap-2 pt-1 overflow-x-auto">
              <span className="text-[11px] text-slate-500 font-medium shrink-0">Presets:</span>
              {PRESET_IMAGES.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: img })}
                  className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0 hover:scale-105 transition-transform"
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Event Description <span className="text-violet-600">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describe what attendees will experience, speakers, workshops, and highlights..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-3 rounded-2xl bg-slate-50 border ${
                errors.description ? 'border-rose-500' : 'border-slate-200 focus:bg-white focus:border-violet-500'
              } text-sm text-slate-900 focus:outline-none transition-all resize-none placeholder:text-slate-400`}
            />
            {errors.description && <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5 text-white" />
            <span>Publish VIP Event</span>
          </button>

        </form>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 text-violet-600">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Real-time 3D Card Preview</span>
          </div>

          <EventCard
            event={previewEvent}
            onRegisterClick={() => {}}
            onDeleteClick={() => {}}
          />
        </div>

      </div>

    </div>
  );
};
