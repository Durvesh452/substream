"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckCircle, PlusCircle, CreditCard, ShieldCheck, Zap } from 'lucide-react';
import { useWeb3, Web3Event } from '@/context/Web3Context';

const getIcon = (type: Web3Event['type']) => {
  switch (type) {
    case 'subscription': return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'mint': return <Zap className="w-4 h-4 text-purple-400" />;
    case 'approval': return <ShieldCheck className="w-4 h-4 text-blue-400" />;
    case 'plan_created': return <PlusCircle className="w-4 h-4 text-indigo-400" />;
    case 'transaction': return <CreditCard className="w-4 h-4 text-slate-400" />;
    default: return <Activity className="w-4 h-4 text-slate-400" />;
  }
};

export default function ActivityFeed() {
  const { events } = useWeb3();

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80 hidden lg:block">
      <div className="glass-card p-4 bg-black/60 backdrop-blur-2xl border-white/10">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-indigo-400 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Live Activity</h3>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
          <AnimatePresence initial={false}>
            {events.length === 0 ? (
              <p className="text-xs text-slate-500 italic text-center py-4">No recent activity</p>
            ) : (
              events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="flex items-start space-x-3 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="mt-0.5">{getIcon(event.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 leading-relaxed truncate">{event.message}</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">{event.timestamp}</p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
