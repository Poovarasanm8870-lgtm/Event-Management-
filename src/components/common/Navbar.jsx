import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Calendar, 
  Ticket, 
  PlusCircle, 
  LayoutDashboard, 
  Menu, 
  X,
  RotateCcw
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export const Navbar = () => {
  const location = useLocation();
  const { registrations, resetToSeedData } = useEvents();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Browse Events', path: '/events', icon: Calendar },
    { name: 'My Registrations', path: '/my-registrations', icon: Ticket, badge: registrations.length },
    { name: 'Create Event', path: '/add-event', icon: PlusCircle },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/75 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 p-[1px] shadow-md shadow-violet-500/20 transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-violet-600 animate-pulse-slow" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-display font-extrabold tracking-wider bg-gradient-to-r from-slate-900 via-slate-800 to-violet-900 bg-clip-text text-transparent">
              ARASAN
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-violet-600 font-bold -mt-1">
              Events Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/90 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                  active ? 'text-violet-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white border border-slate-200/80 rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${active ? 'text-violet-600' : ''}`} />
                <span className="relative z-10">{link.name}</span>
                {link.badge > 0 && (
                  <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-bold bg-violet-600 text-white rounded-full shadow-xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={resetToSeedData}
            title="Reset platform data to default seed events"
            className="p-2.5 rounded-full bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-500 hover:text-violet-600 shadow-xs transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <Link
            to="/add-event"
            className="relative group overflow-hidden rounded-full font-semibold text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-violet-500/20"
          >
            <span className="relative block px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-bold tracking-wide flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-violet-200" />
              <span>Host Event</span>
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 border-t border-slate-200 px-4 py-6 space-y-3 overflow-hidden shadow-xl"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    active 
                      ? 'bg-violet-50 border border-violet-200 text-violet-700 font-bold' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-violet-600" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-violet-600 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
              <button
                onClick={() => {
                  resetToSeedData();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl border border-slate-200 flex items-center justify-center gap-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Demo Events</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
