"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Check, Loader2, User, ArrowRight } from 'lucide-react';
import { useWeb3, Plan } from '@/context/Web3Context';
import { Button, GlassCard, Badge } from '@/components/ui';

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const { subscribe, walletAddress, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    if (!walletAddress) {
      connectWallet();
      return;
    }

    setLoading(true);
    const result = await subscribe(plan.id);
    setLoading(false);
    
    if (result) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <GlassCard className="h-full flex flex-col group hover:border-indigo-500/30 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-indigo-500/30 transition-colors">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">By {plan.creator}</p>
            <h3 className="text-lg font-bold group-hover:text-white transition-colors">{plan.name}</h3>
          </div>
        </div>
        <Badge variant={plan.price > 20 ? 'purple' : 'indigo'}>
          {plan.price > 20 ? 'Premium' : 'Standard'}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
        {plan.description}
      </p>

      {/* Stats */}
      <div className="flex items-center space-x-6 mb-8 text-xs text-slate-500 font-mono">
        <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-2 py-1">
          <Users className="w-3.5 h-3.5 text-indigo-400" />
          <span>{plan.members} Members</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-2 py-1">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span>{plan.duration} Days</span>
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div>
          <span className="text-2xl font-black text-white">{plan.price}</span>
          <span className="text-sm font-bold text-slate-500 ml-1 tracking-widest">SUB</span>
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Per {plan.duration} days</p>
        </div>

        <Button 
          variant={success ? 'secondary' : 'premium'}
          className="px-8"
          disabled={loading || success}
          onClick={handleSubscribe}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : success ? (
            <Check className="w-4 h-4" />
          ) : (
            <>
              {walletAddress ? 'Subscribe' : 'Connect'}
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </GlassCard>
  );
}
