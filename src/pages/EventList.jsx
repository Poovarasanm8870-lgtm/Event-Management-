import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List as ListIcon, 
  Calendar, 
  MapPin, 
  Tag, 
  Users, 
  Sparkles, 
  X,
  RotateCcw,
  ArrowUpDown
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/events/EventCard';
import { RegistrationModal } from '../components/events/RegistrationModal';
import { TicketModal } from '../components/events/TicketModal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { EVENT_CATEGORIES } from '../data/seedEvents';

export const EventList = () => {
  const { events, deleteEvent } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState('date-asc'); // date-asc, price-asc, price-desc, seats-desc
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [activeTicket, setActiveTicket] = useState(null);

  // Filter & Sort Logic
  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        // Search query filter
        const matchSearch =
          evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          evt.location.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchCategory =
          selectedCategory === 'All' || evt.category === selectedCategory;

        // Availability filter
        const matchAvailable = !onlyAvailable || evt.availableSeats > 0;

        return matchSearch && matchCategory && matchAvailable;
      })
      .sort((a, b) => {
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'seats-desc') return b.availableSeats - a.availableSeats;
        return 0;
      });
  }, [events, searchQuery, selectedCategory, sortBy, onlyAvailable]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('date-asc');
    setOnlyAvailable(false);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-600">
          EVENT DIRECTORY
        </span>
        <h1 className="text-4xl font-extrabold font-display text-slate-900">
          Explore World-Class Events
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl font-normal">
          Browse upcoming summits, concerts, galas, and tech workshops. Filter by category or search by keywords.
        </p>
      </div>

      {/* Control Bar (Search, Category Pills, Sort, View Toggle) */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by event title, location, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-violet-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-violet-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-violet-500 shadow-xs"
            >
              <option value="date-asc">Sort: Date (Upcoming)</option>
              <option value="price-asc">Sort: Price (Low to High)</option>
              <option value="price-desc">Sort: Price (High to Low)</option>
              <option value="seats-desc">Sort: Most Seats Available</option>
            </select>
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all ${
                viewMode === 'grid' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl transition-all ${
                viewMode === 'list' ? 'bg-white text-violet-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Category Pills & Availability Checkbox */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              <span>Available Seats Only</span>
            </label>

            {(searchQuery || selectedCategory !== 'All' || onlyAvailable) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-violet-600 hover:text-violet-800 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Events Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing <strong className="text-slate-900">{filteredEvents.length}</strong> of {events.length} total events</span>
      </div>

      {/* Events Display (Grid vs List) */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <Sparkles className="w-12 h-12 text-slate-400 mx-auto animate-bounce" />
          <h3 className="text-xl font-bold text-slate-900">No Events Found</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            We couldn't find any events matching your current filters. Try tweaking your search term or category.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs uppercase shadow-md shadow-violet-500/20"
          >
            Clear Search Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegisterClick={(evt) => setSelectedEventForReg(evt)}
              onDeleteClick={(evt) => setEventToDelete(evt)}
            />
          ))}
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-5 w-full md:w-auto">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-200"
                />
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-200">
                    {event.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-violet-600" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium block">Pass Price</span>
                  <span className="text-xl font-extrabold text-slate-900">${event.price}</span>
                </div>

                <button
                  onClick={() => setSelectedEventForReg(event)}
                  disabled={event.availableSeats <= 0}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-violet-500/20"
                >
                  {event.availableSeats <= 0 ? 'Sold Out' : 'Register Now'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
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
        onConfirm={() => deleteEvent(eventToDelete.id)}
        onClose={() => setEventToDelete(null)}
      />

    </div>
  );
};
