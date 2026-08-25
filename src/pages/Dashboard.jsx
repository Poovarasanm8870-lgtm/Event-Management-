import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Ticket, 
  Users, 
  DollarSign, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  Activity 
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { ConfirmModal } from '../components/common/ConfirmModal';

export const Dashboard = () => {
  const { events, registrations, deleteEvent } = useEvents();
  const [eventToDelete, setEventToDelete] = useState(null);

  // Metrics Calculations
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;

  const totalSeatsAllEvents = events.reduce((sum, e) => sum + e.totalSeats, 0);
  const totalAvailableSeatsAllEvents = events.reduce((sum, e) => sum + e.availableSeats, 0);
  const seatsOccupied = totalSeatsAllEvents - totalAvailableSeatsAllEvents;
  const utilizationPercentage = totalSeatsAllEvents > 0 
    ? Math.round((seatsOccupied / totalSeatsAllEvents) * 100)
    : 0;

  const totalRevenue = registrations.reduce((sum, r) => sum + (r.totalPaid || 0), 0);

  // Category counts
  const categoryCounts = events.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600">
            ANALYTICS & METRICS
          </span>
          <h1 className="text-4xl font-extrabold font-display text-slate-900">
            Management Dashboard
          </h1>
        </div>

        <Link
          to="/add-event"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-violet-500/25 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-violet-200" />
          <span>Host New Event</span>
        </Link>
      </div>

      {/* KPI STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Events */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Hosted Events</span>
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-4 font-display">{totalEvents}</div>
          <span className="text-[11px] text-violet-600 font-bold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Active in LocalStorage
          </span>
        </div>

        {/* Total Registrations */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">VIP Registrations</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-4 font-display">{totalRegistrations}</div>
          <span className="text-[11px] text-indigo-600 font-bold flex items-center gap-1 mt-1">
            Confirmed Attendees
          </span>
        </div>

        {/* Seat Utilization */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Capacity Filled</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-4 font-display">{utilizationPercentage}%</div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden border border-slate-200/60">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${utilizationPercentage}%` }} />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-4 font-display">₹{totalRevenue}</div>
          <span className="text-[11px] text-amber-700 font-bold flex items-center gap-1 mt-1">
            Calculated from bookings
          </span>
        </div>

      </div>

      {/* CATEGORIES BREAKDOWN & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Category Breakdown */}
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-600" />
            <span>Category Distribution</span>
          </h3>

          <div className="space-y-3 pt-2">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalEvents) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">{cat}</span>
                    <span className="text-violet-700 font-bold">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Registrations Log */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Recent VIP Registrations Activity</span>
          </h3>

          {registrations.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center font-medium">No registrations recorded yet.</p>
          ) : (
            <div className="space-y-3 overflow-x-auto">
              {registrations.slice(0, 5).map((reg) => (
                <div key={reg.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs">
                      {reg.userName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{reg.userName}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{reg.eventTitle}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 block">₹{reg.totalPaid}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{reg.ticketsCount} Ticket(s)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* EVENT MANAGEMENT DATA TABLE */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900">Full Event Management Directory</h3>
            <p className="text-xs text-slate-500 font-medium">Perform CRUD operations (Edit details, View, or Delete events)</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/80 uppercase text-[10px] font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4">Event Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Location</th>
                <th className="p-4">Seats Left / Total</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                    <img src={evt.image} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                    <span>{evt.title}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-200">
                      {evt.category}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{evt.date}</td>
                  <td className="p-4 truncate max-w-xs font-medium">{evt.location}</td>
                  <td className="p-4">
                    <span className={`font-bold ${evt.availableSeats === 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {evt.availableSeats} / {evt.totalSeats}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900">₹{evt.price}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/events/${evt.id}`}
                        title="View Details"
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-violet-600 hover:border-violet-300 shadow-xs"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/edit-event/${evt.id}`}
                        title="Edit Details"
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 shadow-xs"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setEventToDelete(evt)}
                        title="Delete Event"
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-300 shadow-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
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
