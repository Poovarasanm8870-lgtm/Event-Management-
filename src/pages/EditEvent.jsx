import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Edit, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EVENT_CATEGORIES } from '../data/seedEvents';
import { EventCard } from '../components/events/EventCard';

export const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();

  const existingEvent = events.find((e) => e.id === id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    date: '',
    time: '',
    location: '',
    price: 0,
    totalSeats: 100,
    organizer: '',
    image: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingEvent) {
      setFormData({
        title: existingEvent.title || '',
        category: existingEvent.category || 'Technology',
        date: existingEvent.date || '',
        time: existingEvent.time || '',
        location: existingEvent.location || '',
        price: existingEvent.price || 0,
        totalSeats: existingEvent.totalSeats || 100,
        organizer: existingEvent.organizer || '',
        image: existingEvent.image || '',
        description: existingEvent.description || '',
      });
    }
  }, [existingEvent]);

  if (!existingEvent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <Sparkles className="w-16 h-16 text-violet-600 mx-auto" />
        <h2 className="text-3xl font-extrabold text-slate-900">Event Not Found</h2>
        <Link to="/events" className="px-6 py-3 rounded-2xl bg-violet-600 text-white font-bold text-xs uppercase shadow-md shadow-violet-500/20">
          Back to Events
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.location.trim()) errs.location = 'Event location is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (formData.totalSeats <= 0) errs.totalSeats = 'Total capacity must be > 0';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateEvent(id, formData);
    navigate(`/events/${id}`);
  };

  const previewEvent = {
    ...existingEvent,
    ...formData,
    availableSeats: Math.max(0, Number(formData.totalSeats) - (existingEvent.totalSeats - existingEvent.availableSeats)),
    totalSeats: Number(formData.totalSeats),
    price: Number(formData.price || 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center gap-4">
        <Link to={`/events/${id}`} className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600">
            EDIT MODE
          </span>
          <h1 className="text-4xl font-extrabold font-display text-slate-900">
            Modify Event Details
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Event Title <span className="text-violet-600">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
            />
          </div>

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
                Organizer
              </label>
              <input
                type="text"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
              />
            </div>
          </div>

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
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Venue Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Ticket Price (₹)
              </label>
              <input
                type="number"
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
                value={formData.totalSeats}
                onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-violet-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>Save Changes</span>
          </button>

        </form>

        {/* Live Preview */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 block">
            Updated Card Preview
          </span>
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
