import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Sliders,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HARDWARE_ITEMS } from '@/data/content';
import { formatCurrency } from '@/lib/utils';

export const HardwareShowcaseSection: React.FC = () => {
  const [pricingMode, setPricingMode] = useState<'lease' | 'outright'>('lease');

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold mb-4">
            <Package className="w-4 h-4" />
            <span>Commercial-Grade Hardware Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Built for Extreme Restaurant & Retail Velocity.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Die-cast aluminum frames, spill-resistant IP54 touchscreens, and drop-tested mobile terminals. Available outright or with **$0 upfront HaaS financing**.
          </p>

          {/* Pricing Model Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-white/[0.08]">
            <button
              onClick={() => setPricingMode('lease')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                pricingMode === 'lease'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              $0 Upfront HaaS Lease (/mo)
            </button>
            <button
              onClick={() => setPricingMode('outright')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                pricingMode === 'outright'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Outright Purchase
            </button>
          </div>
        </div>

        {/* Hardware Bundle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HARDWARE_ITEMS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-6 flex flex-col justify-between backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-2xl relative"
            >
              {item.popular && (
                <div className="absolute -top-3 right-6">
                  <Badge variant="emerald" className="font-bold">Most Popular</Badge>
                </div>
              )}

              <div>
                {/* Hardware Photo */}
                <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 text-xs font-mono text-emerald-400 font-semibold bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                    {item.category.toUpperCase()}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {item.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black font-display text-white">
                      {pricingMode === 'lease'
                        ? `$${item.priceLeasePerMonth}`
                        : formatCurrency(item.priceOutright)}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {pricingMode === 'lease' ? '/ month per terminal' : 'one-time purchase'}
                    </span>
                  </div>
                  {pricingMode === 'lease' && (
                    <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                      Includes 24/7 next-day hardware replacement
                    </div>
                  )}
                </div>

                {/* Specs List */}
                <ul className="mt-6 space-y-2 text-xs text-slate-300">
                  {item.specs.slice(0, 3).map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-800">
                <Link to="/hardware" className="w-full">
                  <Button variant="outline" className="w-full justify-center gap-2 border-slate-700 hover:border-emerald-500/50 text-slate-200">
                    <span>Configure Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Hardware Configurator Callout */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/60 to-slate-900 border border-cyan-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-display">
                Need a Custom Store Setup or Multi-Lane Fleet?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Use our interactive hardware configurator to calculate bundles, printers, and scanners.
              </p>
            </div>
          </div>
          <Link to="/hardware" className="shrink-0">
            <Button variant="cyanGlow" className="gap-2">
              <span>Open Hardware Configurator</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};
