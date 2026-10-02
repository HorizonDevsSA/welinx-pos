import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ShieldAlert, ShieldCheck, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ComparisonTableSection: React.FC = () => {
  const comparisonData = [
    {
      feature: 'Internet & Cloud Reliability',
      legacy: 'Cloud outage freezes registers; lines back out the door, lost sales & frustrated guests.',
      welinx: 'Local-First SQLite Engine: 100% full POS functionality with zero internet. Sub-millisecond ringing.',
      legacyBad: true,
    },
    {
      feature: 'Credit Card Processing Rates',
      legacy: 'Hidden rate hikes & locked-in proprietary rates (2.99% + $0.15) eating 3-4% of total GMV.',
      welinx: 'Transparent Interchange+ or 100% Compliant Dual-Pricing ($0 card swipe fees for merchant).',
      legacyBad: true,
    },
    {
      feature: 'Back-of-House & Station Add-ons',
      legacy: 'Aggressive add-on fees ($75/mo for KDS, $99/mo for Kiosk, $50/mo for basic inventory).',
      welinx: 'Unified Modular Ecosystem: Registers, KDS, Kiosks, and Recipe Costing included or flat rate.',
      legacyBad: true,
    },
    {
      feature: 'Hardware Ecosystem & Freedom',
      legacy: 'Closed hardware lockdown. Proprietary locked Android tablets that brick if you switch.',
      welinx: 'Cross-Platform Freedom: Run on Windows, macOS, Linux, Android, iPad, or Welinx Hardware.',
      legacyBad: true,
    },
    {
      feature: 'Multi-Store Catalog & Stock Sync',
      legacy: 'Multi-location inventory sync delays, stock count drift, and hours spent re-keying menus.',
      welinx: 'Instant Realtime Cloud Sync with PostgreSQL Row-Level Security and global instant menu pushes.',
      legacyBad: true,
    },
    {
      feature: 'Contract Terms & Vendor Lock',
      legacy: 'Strict 2-3 year auto-renewing contracts with massive early termination penalties.',
      welinx: 'Transparent Month-to-Month subscriptions. 30-Day money-back guarantee with zero lock-in.',
      legacyBad: true,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-950/60 relative overflow-hidden border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-semibold mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>The Reality of Legacy POS vs. Welinx Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Why High-Volume Operators Are Firing Their Legacy POS.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Toast, Square, and Clover built systems around cloud dependency and high transaction processing take-rates. Welinx was engineered for extreme operational autonomy.
          </p>
        </div>

        {/* Comparison Grid Table */}
        <div className="rounded-3xl border border-white/[0.08] bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/[0.08] bg-slate-900/90 text-sm font-mono font-bold">
            <div className="p-4 md:p-6 md:col-span-4 text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span>Operational Capability</span>
            </div>
            <div className="p-4 md:p-6 md:col-span-4 text-red-400/90 bg-red-950/20 border-t md:border-t-0 md:border-l border-white/[0.08] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Legacy POS (Toast / Square / Clover)</span>
            </div>
            <div className="p-4 md:p-6 md:col-span-4 text-emerald-400 bg-emerald-950/30 border-t md:border-t-0 md:border-l border-emerald-500/20 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Welinx Multi-Tenant POS Standard</span>
            </div>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {comparisonData.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 text-sm hover:bg-slate-850/40 transition-colors">
                {/* Feature Name */}
                <div className="p-4 md:p-6 md:col-span-4 flex items-center font-semibold text-white">
                  <span className="font-display text-base">{row.feature}</span>
                </div>

                {/* Legacy Nightmare */}
                <div className="p-4 md:p-6 md:col-span-4 bg-red-950/10 md:border-l border-white/[0.06] text-slate-300 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400 leading-relaxed">{row.legacy}</span>
                </div>

                {/* Welinx Advantage */}
                <div className="p-4 md:p-6 md:col-span-4 bg-emerald-950/20 md:border-l border-emerald-500/20 text-slate-200 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">{row.welinx}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA within Comparison */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/compare/vs-toast">
            <Button variant="outline" className="gap-2 border-emerald-500/40 text-emerald-400">
              <span>Read Full Toast vs. Welinx Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/resources/roi-calculator">
            <Button variant="emeraldGlow" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Calculate Your Processing Savings</span>
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};
