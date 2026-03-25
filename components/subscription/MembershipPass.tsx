"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Cpu, User } from 'lucide-react';
import { Subscription } from '@/context/Web3Context';
import { GlassCard, Badge } from '@/components/ui';

interface MembershipPassProps {
  subscription: Subscription;
}

export default function MembershipPass({ subscription }: MembershipPassProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10, rotateY: 5, rotateX: -5 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[320px] aspect-[3/4] group perspective-1000 mx-auto"
    >
      {/* Outer Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* The Card */}
      <div className="relative h-full rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-2xl flex flex-col shadow-2xl">
        
        {/* Holographic Header */}
        <div className="h-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-slate-900/60">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          
          {/* Animated Glow Lines */}
          <motion.div 
            animate={{ x: [-100, 400], y: [-100, 400] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-20 h-full bg-white/20 blur-xl -rotate-45 pointer-events-none"
          />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
               <ShieldCheck className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            </div>
          </div>

          <div className="absolute top-4 left-4">
            <Badge variant="indigo" className="bg-indigo-500/30 border-white/20">Active Access</Badge>
          </div>
          <div className="absolute top-4 right-4">
             <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4 flex-grow relative">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Membership Pass</h3>
            <h2 className="text-xl font-black text-white">{subscription.planName}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Token ID</p>
              <p className="text-xs font-mono text-indigo-400">{subscription.tokenId}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Valid Until</p>
              <p className="text-xs font-mono text-slate-300">{subscription.expiryDate}</p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-3 h-3 text-slate-400" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{subscription.creator}</span>
            </div>
            <Globe className="w-4 h-4 text-slate-600" />
          </div>

          {/* Footer Decoration */}
          <div className="absolute bottom-2 right-4 opacity-5">
            <Cpu className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      {/* Tilt Border Highlight */}
      <div className="absolute inset-0 rounded-2xl border-[0.5px] border-white/30 pointer-events-none group-hover:border-indigo-500/50 transition-colors" />
    </motion.div>
  );
}
