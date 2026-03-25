"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'premium' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export function Button({ 
  className, 
  variant = 'premium', 
  size = 'md', 
  glow = true,
  ...props 
}: ButtonProps) {
  const variants = {
    premium: 'btn-premium text-white',
    outline: 'border border-white/10 hover:border-indigo-500/50 hover:bg-white/5 text-slate-300',
    ghost: 'hover:bg-white/5 text-slate-400 hover:text-white',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base font-bold',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center rounded-xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        glow && variant === 'premium' && 'shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]',
        className
      )}
      {...props}
    />
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({ children, className, glow = false, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        'glass-card p-6 overflow-hidden relative group',
        glow && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/10 before:to-purple-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        className
      )}
    >
      {glow && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-colors" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function Badge({ children, className, variant = 'indigo' }: { children: React.ReactNode, className?: string, variant?: 'indigo' | 'purple' | 'blue' | 'green' }) {
  const variants = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
