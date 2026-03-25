"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Plan {
  id: string;
  creator: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  members: number;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  creator: string;
  status: 'active' | 'expired';
  expiryDate: string;
  tokenId: string; // "Pass ID"
}

export interface Web3Event {
  id: string;
  type: 'subscription' | 'mint' | 'approval' | 'plan_created' | 'transaction';
  message: string;
  timestamp: string;
}

interface Web3ContextType {
  walletAddress: string | null;
  subBalance: number;
  isConnecting: boolean;
  plans: Plan[];
  subscriptions: Subscription[];
  events: Web3Event[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  subscribe: (planId: string) => Promise<boolean>;
  createPlan: (plan: Omit<Plan, 'id' | 'members'>) => Promise<boolean>;
  addEvent: (type: Web3Event['type'], message: string) => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

const MOCK_PLANS: Plan[] = [
  { id: '1', creator: 'Pro Creator', name: 'Starter Tier', description: 'Access to basic community content and newsletters.', price: 10, duration: 30, members: 124 },
  { id: '2', creator: 'Elite Membership', name: 'VIP Access', description: 'Premium benefits, direct alpha access, and DAO voting rights.', price: 35, duration: 30, members: 89 },
  { id: '3', creator: 'Gaming Hub', name: 'Pro Gamer Pass', description: 'Weekly tournaments and exclusive in-game assets.', price: 20, duration: 7, members: 456 },
];

export function Web3Provider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [subBalance, setSubBalance] = useState(100);
  const [isConnecting, setIsConnecting] = useState(false);
  const [plans, setPlans] = useState<Plan[]>(MOCK_PLANS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [events, setEvents] = useState<Web3Event[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('substream_address');
    if (savedAddress) setWalletAddress(savedAddress);
    
    const savedSubs = localStorage.getItem('substream_subs');
    if (savedSubs) setSubscriptions(JSON.parse(savedSubs));

    const savedPlans = localStorage.getItem('substream_plans');
    if (savedPlans) setPlans(JSON.parse(savedPlans));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('substream_subs', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('substream_plans', JSON.stringify(plans));
  }, [plans]);

  const addEvent = (type: Web3Event['type'], message: string) => {
    const newEvent: Web3Event = {
      id: Math.random().toString(36).substring(7),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 10));
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    addEvent('transaction', 'Connecting to Freighter Wallet...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockAddress = 'GBR...SUBSTR';
    setWalletAddress(mockAddress);
    localStorage.setItem('substream_address', mockAddress);
    setIsConnecting(false);
    addEvent('transaction', 'Wallet connected: GBR...SUBSTR');
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem('substream_address');
    addEvent('transaction', 'Wallet disconnected');
  };

  const subscribe = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan || !walletAddress) return false;

    addEvent('approval', `Approving ${plan.price} SUB...`);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    addEvent('transaction', `Executing subscription for ${plan.name}...`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newSub: Subscription = {
      id: Math.random().toString(36).substring(7),
      planId,
      planName: plan.name,
      creator: plan.creator,
      status: 'active',
      expiryDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000).toLocaleDateString(),
      tokenId: `SUB-${Math.floor(Math.random() * 10000)}`,
    };

    setSubscriptions(prev => [...prev, newSub]);
    setSubBalance(prev => prev - plan.price);
    addEvent('subscription', `Subscribed to ${plan.name}!`);
    addEvent('mint', `Membership Pass ${newSub.tokenId} minted.`);
    
    return true;
  };

  const createPlan = async (planData: Omit<Plan, 'id' | 'members'>) => {
    addEvent('transaction', 'Deploying Subscription Plan contract...');
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const newPlan: Plan = {
      ...planData,
      id: Math.random().toString(36).substring(7),
      members: 0,
      creator: 'You',
    };

    setPlans(prev => [newPlan, ...prev]);
    addEvent('plan_created', `Plan "${newPlan.name}" deployed on-chain.`);
    return true;
  };

  return (
    <Web3Context.Provider value={{ 
      walletAddress, subBalance, isConnecting, plans, subscriptions, events,
      connectWallet, disconnectWallet, subscribe, createPlan, addEvent 
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
