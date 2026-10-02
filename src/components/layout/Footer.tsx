import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Sparkles, 
  Globe, 
  Lock, 
  Server, 
  HeartHandshake 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Pre-Footer Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-white/[0.06]">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Join 2,500+ Merchants Upgrading in 2026
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                Eliminate cloud POS outages & wipe out credit card processing fees today.
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
                Try the live interactive browser sandbox with zero registration, or schedule a custom walkthrough tailored to your menu and store setup.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link to="/demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-emerald-500/40 text-emerald-300">
                  <span>Explore Live Sandbox</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button variant="emeraldGlow" size="lg" className="w-full sm:w-auto gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Book VIP Walkthrough</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 gap-y-12">
          {/* Brand & Newsletter Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-0 lg:pr-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-display font-black text-xl text-emerald-400">
                  W
                </div>
              </div>
              <div>
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  Welinx POS
                </span>
                <span className="block text-[10px] font-mono text-emerald-400">
                  OFFLINE-FIRST COMMERCE OS
                </span>
              </div>
            </Link>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              The resilient, multi-tenant cloud and local SQLite operating system built for fast-moving restaurants, QSR chains, boutiques, and multi-unit enterprise franchises.
            </p>

            <form onSubmit={handleNewsletter} className="mt-6">
              <label htmlFor="footer-email" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Merchant Intelligence Newsletter
              </label>
              <div className="flex gap-2">
                <Input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="operator@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-xs"
                />
                <Button type="submit" variant="emeraldGlow" size="sm" className="shrink-0 px-4">
                  Join
                </Button>
              </div>
              {subscribed && (
                <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Check your inbox for the 2026 POS guide.</span>
                </div>
              )}
            </form>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/solutions/restaurants-and-bars" className="hover:text-emerald-400 transition-colors">
                  Restaurants & Bars
                </Link>
              </li>
              <li>
                <Link to="/solutions/quick-service-qsr" className="hover:text-emerald-400 transition-colors">
                  QSR & Fast Casual
                </Link>
              </li>
              <li>
                <Link to="/solutions/retail-and-boutique" className="hover:text-emerald-400 transition-colors">
                  Retail & Supermarkets
                </Link>
              </li>
              <li>
                <Link to="/solutions/franchises-and-chains" className="hover:text-emerald-400 transition-colors">
                  Franchises & Chains
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-emerald-400 transition-colors">
                  Dual-Pricing Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/products/pos-register" className="hover:text-emerald-400 transition-colors">
                  POS Register Terminal
                </Link>
              </li>
              <li>
                <Link to="/products/offline-first-engine" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Offline SQLite Engine</span>
                </Link>
              </li>
              <li>
                <Link to="/products/kitchen-display-system" className="hover:text-emerald-400 transition-colors">
                  Kitchen Displays (KDS)
                </Link>
              </li>
              <li>
                <Link to="/products/self-service-kiosk" className="hover:text-emerald-400 transition-colors">
                  Self-Service Kiosks
                </Link>
              </li>
              <li>
                <Link to="/products/inventory-and-recipes" className="hover:text-emerald-400 transition-colors">
                  Recipe Inventory & Costing
                </Link>
              </li>
              <li>
                <Link to="/products/analytics-and-cloud" className="hover:text-emerald-400 transition-colors">
                  Cloud Analytics Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Hardware & Compare */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Hardware & Compare
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/hardware" className="hover:text-emerald-400 transition-colors">
                  15.6" Countertop POS
                </Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-emerald-400 transition-colors">
                  21.5" Portrait Kiosks
                </Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-emerald-400 transition-colors">
                  5.5" Handheld mPOS
                </Link>
              </li>
              <li>
                <Link to="/compare/vs-toast" className="hover:text-emerald-400 transition-colors">
                  Switch from Toast
                </Link>
              </li>
              <li>
                <Link to="/compare/vs-square" className="hover:text-emerald-400 transition-colors">
                  Switch from Square
                </Link>
              </li>
              <li>
                <Link to="/compare/vs-clover" className="hover:text-emerald-400 transition-colors">
                  Switch from Clover
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Resources & Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/resources/roi-calculator" className="hover:text-emerald-400 transition-colors">
                  Savings Calculator
                </Link>
              </li>
              <li>
                <Link to="/resources/blog" className="hover:text-emerald-400 transition-colors">
                  Guides & Playbooks
                </Link>
              </li>
              <li>
                <Link to="/resources/docs-and-api" className="hover:text-emerald-400 transition-colors">
                  Developer API & SDK
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Sales & Support
                </Link>
              </li>
              <li>
                <Link to="/demo" className="hover:text-emerald-400 transition-colors">
                  Interactive Sandbox
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Trust & Operational Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational (99.999%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>PCI-DSS Level 1 & P2PE Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-slate-400" />
              <span>Encrypted Local SQLite + Postgres</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} Welinx Technologies Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
