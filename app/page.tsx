"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, ShieldBox, Users, RefreshCw, ChevronRight, Play } from 'lucide-react';
import { Button, GlassCard, Badge } from '@/components/ui';

export default function LandingPage() {
  const features = [
    {
      title: 'Create a Plan',
      description: 'Launch customizable subscription plans with flexible pricing and durations.',
      icon: <Rocket className="w-6 h-6 text-indigo-400" />,
      badge: 'Creator'
    },
    {
      title: 'Users Subscribe',
      description: 'Onboard fans instantly with SUB tokens. Direct creator-to-fan economy.',
      icon: <Users className="w-6 h-6 text-purple-400" />,
      badge: 'Seamless'
    },
    {
      title: 'On-Chain Access',
      description: 'Exclusive NFT-style membership passes grant automated on-chain access.',
      icon: <ShieldBox className="w-6 h-6 text-blue-400" />,
      badge: 'Secure'
    },
    {
      title: 'Renew Membership',
      description: 'Automated renewal flows ensure continuous access for your community.',
      icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
      badge: 'Scale'
    }
  ];

  return (
    <div className="space-y-32 py-12">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4">v1.0 Alpha Launch</Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Token-Powered <br />
            <span className="text-gradient">Memberships</span> for Creators
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
            SubStream is a decentralized subscription platform where creators launch 
            token-powered membership plans and users manage access through on-chain NFTs.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/explore">
            <Button size="lg" className="w-full sm:w-auto">
              Explore Plans
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Launch a Plan
            </Button>
          </Link>
        </motion.div>

        {/* Hero Visual - Floating Cards Mockup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full">
           <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full" />
           <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[150px] rounded-full" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Everything you need to <span className="text-indigo-400">Scale</span></h2>
          <p className="text-slate-400">Built on Stellar for speed, security, and ultra-low fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard className="h-full group hover:border-indigo-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10">
                  {feature.icon}
                </div>
                <Badge variant={idx % 2 === 0 ? 'indigo' : 'purple'} className="mb-4">{feature.badge}</Badge>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="glass-card p-12 border-white/5 bg-gradient-to-br from-black/80 to-indigo-900/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">How SubStream <span className="text-indigo-400">Works</span></h2>
            
            <div className="space-y-8">
              {[
                { step: '01', title: 'Connect Your Wallet', text: 'Select your preferred Stellar wallet (Freighter, Albedo, or xBull) to begin.' },
                { step: '02', title: 'Find or Create Plans', text: 'Explore existing communities or set up your own customizable subscription tier.' },
                { step: '03', title: 'Mint Access Pass', text: 'Unlock instant access by subscribing. Your membership is a secure on-chain NFT.' }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <span className="text-3xl font-black text-white/5 select-none">{item.step}</span>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full sm:w-auto px-10">Get Started Now</Button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <GlassCard className="aspect-video flex items-center justify-center bg-black/40 border-white/10" hover={false}>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/40 mx-auto group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 text-indigo-400 fill-indigo-400/20 ml-1" />
                </div>
                <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Watch Demo</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-8 border-t border-white/5 text-center space-y-8">
        <div className="flex items-center justify-center space-x-2">
          <Rocket className="text-indigo-400 w-5 h-5" />
          <span className="text-xl font-bold text-gradient">SubStream</span>
        </div>
        <p className="text-slate-500 text-sm">© 2026 SubStream Protocol. Built for the future of creator economies.</p>
        <div className="flex items-center justify-center space-x-6 text-slate-400 text-sm">
          <Link href="#" className="hover:text-white">Twitter</Link>
          <Link href="#" className="hover:text-white">Discord</Link>
          <Link href="#" className="hover:text-white">Github</Link>
          <Link href="#" className="hover:text-white">Docs</Link>
        </div>
      </footer>
    </div>
  );
}
