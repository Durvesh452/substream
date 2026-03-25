"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Wallet, LogOut, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeb3 } from '@/context/Web3Context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { walletAddress, subBalance, connectWallet, disconnectWallet, isConnecting } = useWeb3();

  const navLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Subscriptions', href: '/subscriptions' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="glass-card px-6 py-3 flex items-center justify-between border-white/10 bg-black/40 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-gradient tracking-tight">SubStream</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                  pathname === link.href ? 'text-indigo-400 text-glow' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Wallet Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {walletAddress ? (
              <div className="flex items-center space-x-3 bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Balance</p>
                  <p className="text-sm font-bold text-indigo-400">{subBalance} SUB</p>
                </div>
                <div className="h-8 w-[1px] bg-white/10 mx-1" />
                <button 
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 text-slate-300 hover:text-red-400 transition-colors"
                >
                  <span className="text-xs font-mono">{walletAddress.substring(0, 4)}...{walletAddress.substring(walletAddress.length - 4)}</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-premium flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-40 md:hidden pointer-events-auto"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-slate-900 border-l border-white/10 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <span className="text-xl font-bold text-gradient">Menu</span>
                <button onClick={() => setIsOpen(false)}><X className="w-6 h-6 text-slate-400" /></button>
              </div>
              
              <div className="flex flex-col space-y-6 flex-grow">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium flex items-center justify-between ${
                      pathname === link.href ? 'text-indigo-400' : 'text-slate-300'
                    }`}
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>

              <div className="mt-auto">
                {walletAddress ? (
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-slate-400 mb-1">Balance</p>
                      <p className="text-xl font-bold text-indigo-400">{subBalance} SUB</p>
                    </div>
                    <button 
                      onClick={disconnectWallet}
                      className="w-full py-4 rounded-xl border border-white/10 text-slate-300 flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Disconnect Wallet</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setIsOpen(false); connectWallet(); }}
                    className="btn-premium w-full flex items-center justify-center space-x-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Connect Wallet</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
