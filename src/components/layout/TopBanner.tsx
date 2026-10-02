import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export const TopBanner: React.FC = () => {
  return (
    <div className="relative z-50 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-cyan-950/90 border-b border-emerald-500/20 py-2 px-4 text-xs sm:text-sm text-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap mx-auto sm:mx-0">
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold text-xs animate-pulse">
            <Zap className="w-3 h-3 text-emerald-400" />
            NEW v2.4
          </span>
          <span className="font-medium text-slate-300 hidden md:inline">
            Zero Cloud Downtime Architecture • Dual-Pricing Engine saves merchants up to $14,200/yr.
          </span>
          <span className="font-medium text-slate-300 md:hidden">
            Zero Cloud Downtime POS & Dual-Pricing Engine.
          </span>
        </div>
        
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Local SQLite Active</span>
          </div>
          <Link
            to="/book-demo"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Book 1-on-1 Walkthrough</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
