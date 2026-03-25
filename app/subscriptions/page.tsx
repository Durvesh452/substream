"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Clock, Calendar, 
  RefreshCw, History, ArrowRight, 
  ExternalLink, CreditCard, Box
} from 'lucide-react';
import { useWeb3, Subscription } from '@/context/Web3Context';
import MembershipPass from '@/components/subscription/MembershipPass';
import { Button, GlassCard, Badge } from '@/components/ui';

export default function SubscriptionsPage() {
  const { subscriptions, walletAddress, connectWallet } = useWeb3();
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(
    subscriptions.length > 0 ? subscriptions[0] : null
  );

  if (!walletAddress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <GlassCard className="max-w-md text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
            <p className="text-slate-400">Please connect your Stellar wallet to view and manage your active subscriptions.</p>
          </div>
          <Button onClick={connectWallet} className="w-full py-4">Connect Wallet</Button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="space-y-4">
        <Badge variant="indigo">Member Portal</Badge>
        <h1 className="text-4xl font-black tracking-tight">Your <span className="text-gradient">Subscriptions</span></h1>
        <p className="text-slate-400">Access exclusive content, manage renewals, and view your on-chain membership passes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Subscriptions List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-2 px-1">
             <CreditCard className="w-5 h-5 text-indigo-400" />
             <h3 className="text-xl font-bold">Active Plans</h3>
          </div>

          <div className="space-y-4">
            {subscriptions.length === 0 ? (
              <GlassCard className="text-center py-12 border-dashed border-white/10 bg-transparent">
                 <p className="text-slate-500 mb-6 italic">No active subscriptions found.</p>
                 <Button variant="outline" size="sm" onClick={() => window.location.href='/explore'}>Explore Available Plans</Button>
              </GlassCard>
            ) : (
              subscriptions.map((sub) => (
                <motion.div 
                  key={sub.id}
                  onClick={() => setSelectedSub(sub)}
                  className="cursor-pointer"
                >
                  <GlassCard 
                    className={`border-indigo-500/0 hover:border-indigo-500/20 transition-all ${
                      selectedSub?.id === sub.id ? 'bg-white/10 border-indigo-500/40 ring-1 ring-indigo-500/20' : 'bg-white/5'
                    }`}
                    hover={false}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-slate-200">{sub.planName}</h4>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">By {sub.creator}</p>
                      </div>
                      <Badge variant={sub.status === 'active' ? 'green' : 'purple'}>
                        {sub.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                         <Calendar className="w-3 h-3" />
                         <span>Expires: {sub.expiryDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                         <Box className="w-3 h-3 text-indigo-400" />
                         <span>Pass ID: <span className="text-slate-400 font-mono">{sub.tokenId}</span></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                      <button className="flex items-center text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                         Renew <RefreshCw className="w-3 h-3 ml-1" />
                      </button>
                      <button className="text-[10px] font-bold text-slate-600 hover:text-red-400 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Detailed Pass View (Right Side) */}
        <div className="lg:col-span-8 space-y-8">
          {selectedSub ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div className="space-y-8">
                <div className="flex items-center space-x-2 px-1">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-xl font-bold">Membership Access</h3>
                </div>

                <div className="space-y-6">
                  <GlassCard className="bg-white/[0.02] border-white/5" hover={false}>
                    <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                       <Clock className="w-4 h-4 text-purple-400" />
                       Access Details
                    </h4>
                    <ul className="space-y-3">
                      {[
                        'Full Access to Premium Library',
                        'Direct Messaging with Creator',
                        'DAO Voting Rights (v1 Token)',
                        'Priority Beta Access'
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-xs text-slate-400">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                           {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>

                  <div className="flex gap-4">
                    <Button className="flex-1">Enter Community</Button>
                    <Button variant="outline" size="md">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Recent Activity Timeline */}
                <div className="space-y-6 pt-4">
                   <div className="flex items-center space-x-2 px-1">
                    <History className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-xl font-bold">Recent Activity</h3>
                  </div>

                  <div className="space-y-4 pl-4 border-l border-white/10">
                    {[
                      { event: 'Membership Pass Minted', date: '2 hours ago', icon: <Box className="w-3 h-3" /> },
                      { event: 'Subscription Payment Confirmed', date: '2 hours ago', icon: <CreditCard className="w-3 h-3" /> },
                      { event: 'Wallet Connected to Protocol', date: '1 day ago', icon: <ShieldCheck className="w-3 h-3" /> },
                    ].map((item, id) => (
                      <div key={id} className="relative pb-6 last:pb-0">
                        <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-slate-400">
                           {item.icon}
                        </div>
                        <div className="space-y-1">
                           <p className="text-sm font-bold text-slate-200">{item.event}</p>
                           <p className="text-xs text-slate-500 font-mono">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual NFT Pass */}
              <div className="pt-10 md:pt-0">
                 <div className="text-center mb-8 space-y-2">
                   <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Digital Twin Assets</p>
                   <h3 className="text-sm font-bold text-slate-400">NFT-00-1 Access Hologram</h3>
                 </div>
                 <MembershipPass subscription={selectedSub} />
                 
                 <div className="mt-12 text-center">
                    <button className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 mx-auto">
                      View on Stellar Ledger <ArrowRight className="w-3 h-3" />
                    </button>
                 </div>
              </div>
            </div>
          ) : (
             <GlassCard className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/10 bg-transparent">
                <Box className="w-12 h-12 text-slate-700" />
                <p className="text-slate-500 italic max-w-xs">Select a subscription from the list to view your membership details and NFT pass.</p>
             </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
