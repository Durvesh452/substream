"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, Grid } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';
import PlanCard from '@/components/explore/PlanCard';
import { Badge } from '@/components/ui';

export default function ExplorePage() {
  const { plans } = useWeb3();
  const [filter, setFilter] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Plans', icon: <Grid className="w-4 h-4" /> },
    { id: 'popular', label: 'Popular', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'newest', label: 'Newest', icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge>Protocol Marketplace</Badge>
          <h1 className="text-4xl font-black tracking-tight">Explore <span className="text-gradient">Plans</span></h1>
          <p className="text-slate-400 max-w-xl">
            Discover decentralized communities and premium content creators on the Stellar network.
          </p>
        </div>

        {/* Search Mockup */}
        <div className="relative group max-w-md w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search by creator or plan name..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/5 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`
              flex items-center space-x-2 px-6 py-3 text-sm font-bold transition-all relative
              ${filter === tab.id ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {filter === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <PlanCard plan={plan} />
          </motion.div>
        ))}
      </div>

      {/* Empty State Mockup */}
      {plans.length === 0 && (
        <div className="text-center py-32 space-y-6">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
            <Filter className="w-8 h-8 text-slate-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-300">No plans found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
          </div>
        </div>
      )}
    </div>
  );
}
