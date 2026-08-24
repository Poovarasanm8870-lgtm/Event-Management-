import React from 'react';
import { motion } from 'framer-motion';

export const StatsCounter = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-10">
      {stats.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-violet-300 hover:shadow-md transition-all duration-300"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-violet-100/50 rounded-full blur-2xl group-hover:bg-violet-200/60 transition-all" />
          <div className="flex items-center gap-3 text-violet-600 mb-2">
            <item.icon className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
              {item.label}
            </span>
          </div>
          <div className="text-3xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            {item.value}
          </div>
          <p className="text-[11px] font-medium text-slate-600 mt-1">{item.subtext}</p>
        </motion.div>
      ))}
    </div>
  );
};
