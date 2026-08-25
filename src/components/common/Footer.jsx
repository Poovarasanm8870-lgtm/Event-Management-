import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, Github, Twitter, Linkedin, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-slate-200/80 bg-slate-100/70 text-slate-600 overflow-hidden">
      {/* Background glow graphics */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-violet-200/40 to-indigo-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-200/40 to-blue-200/40 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-[1px] shadow-sm">
                <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                </div>
              </div>
              <span className="text-xl font-display font-extrabold tracking-wider text-slate-900">
                ARASAN
              </span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curating luxury events, high-impact conferences, tech visionaries, and immersive music spectacles across the globe.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/events" className="hover:text-violet-600 transition-colors">Browse All Events</Link></li>
              <li><Link to="/my-registrations" className="hover:text-violet-600 transition-colors">My Tickets Wallet</Link></li>
              <li><Link to="/add-event" className="hover:text-violet-600 transition-colors">Host an Event</Link></li>
              <li><Link to="/dashboard" className="hover:text-violet-600 transition-colors">Analytics Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/events?category=Technology" className="hover:text-violet-600 transition-colors">Technology & AI</Link></li>
              <li><Link to="/events?category=Music+%26+Festivals" className="hover:text-violet-600 transition-colors">Music & Festivals</Link></li>
              <li><Link to="/events?category=Design" className="hover:text-violet-600 transition-colors">Architecture & Design</Link></li>
              <li><Link to="/events?category=Business+%26+Startup" className="hover:text-violet-600 transition-colors">Business & Venture</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">VIP Access</h4>
            <p className="text-xs text-slate-600">Subscribe for early-bird access to exclusive invitation-only galas and tech summits.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your VIP email..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-violet-500 shadow-xs"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-violet-600" />
            <span>100% Client-Side LocalStorage Powered • No Backend Required</span>
          </div>
          <p>© 2026 ARASAN Event Management System. Crafted with React, Vite & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
};
