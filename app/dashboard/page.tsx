"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Users, Landmark, Plus, 
  Settings, Info, Power, Globe, 
  Cpu, Trash2, ExternalLink, Loader2
} from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';
import { Button, GlassCard, Badge } from '@/components/ui';

export default function DashboardPage() {
  const { plans, createPlan, walletAddress, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 10,
    duration: 30
  });

  const myPlans = plans.filter(p => p.creator === 'You' || p.creator === 'Pro Creator'); // Mocking some as "mine"

  const stats = [
    { label: 'Total Plans', value: myPlans.length, icon: <BarChart3 className="w-4 h-4 text-indigo-400" />, trend: '+2 this month' },
    { label: 'Active Subscribers', value: '1,284', icon: <Users className="w-4 h-4 text-purple-400" />, trend: '+12% weekly' },
    { label: 'Total Revenue', value: '42.5K SUB', icon: <Landmark className="w-4 h-4 text-emerald-400" />, trend: '≈ $10,400' },
  ];

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      connectWallet();
      return;
    }

    setLoading(true);
    await createPlan(formData);
    setLoading(false);
    setFormData({ name: '', description: '', price: 10, duration: 30 });
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Badge variant="indigo" className="mb-2">Creator Hub</Badge>
          <h1 className="text-4xl font-black tracking-tight">Your <span className="text-gradient">Dashboard</span></h1>
          <p className="text-slate-400">Manage your subscription economy and monitor growth.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="green" className="py-1 px-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            System Healthy
          </Badge>
          <Badge variant="indigo" className="py-1 px-3">Testnet Connected</Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard className="border-white/5 bg-white/[0.02]" hover={false}>
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 w-fit">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {stat.trend}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Plan Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center space-x-2 px-1">
            <Plus className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold">Launch New Plan</h2>
          </div>
          
          <GlassCard className="border-white/10 bg-black/40">
            <form onSubmit={handleCreatePlan} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Plan Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. VIP Alpha Access"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="What benefits do subscribers get?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price (SUB)</label>
                  <input 
                    type="number"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Duration (Days)</label>
                  <input 
                    type="number"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full py-4 text-base">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Deploy Subscription Contract'}
              </Button>
            </form>
          </GlassCard>
        </div>

        {/* Your Plans List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold">Your Active Plans</h2>
            </div>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <GlassCard className="p-0 border-white/5 bg-white/[0.01] overflow-hidden" hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-black/40">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pricing</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subscribers</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {myPlans.map((plan) => (
                    <tr key={plan.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-200">{plan.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {plan.price} SUB / {plan.duration}d
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {plan.members} members
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center space-x-4">
                          <Badge variant="indigo">Online</Badge>
                          <button className="p-2 text-slate-600 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800" />)}
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">+1,281 subscribers globally</p>
              </div>
              <button className="flex items-center space-x-1 text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                <span>View on Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
