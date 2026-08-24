import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider, useEvents } from './context/EventContext';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';

import { Home } from './pages/Home';
import { EventList } from './pages/EventList';
import { EventDetails } from './pages/EventDetails';
import { AddEvent } from './pages/AddEvent';
import { EditEvent } from './pages/EditEvent';
import { MyRegistrations } from './pages/MyRegistrations';
import { Dashboard } from './pages/Dashboard';

const AppContent = () => {
  const { toast, removeToast } = useEvents();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-slate-900 selection:bg-violet-500/20 selection:text-violet-900">
      <CustomCursor />
      
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/edit-event/:id" element={<EditEvent />} />
            <Route path="/my-registrations" element={<MyRegistrations />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>

      <Footer />

      <Toast toast={toast} onClose={removeToast} />
    </div>
  );
};

export default function App() {
  return (
    <EventProvider>
      <Router>
        <AppContent />
      </Router>
    </EventProvider>
  );
}
