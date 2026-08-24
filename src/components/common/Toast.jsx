import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600" />,
    info: <Info className="w-5 h-5 text-violet-600" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-950 shadow-md',
    error: 'border-rose-200 bg-rose-50/90 text-rose-950 shadow-md',
    info: 'border-violet-200 bg-violet-50/90 text-violet-950 shadow-md',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto max-w-md">
      <AnimatePresence>
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl backdrop-blur-xl border ${borders[toast.type] || borders.info} text-slate-900 text-sm shadow-xl`}
        >
          <div className="shrink-0">{icons[toast.type] || icons.info}</div>
          <div className="flex-1 font-semibold">{toast.message}</div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
