import React, { useState } from 'react';
import { 
  Package, 
  Check, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  ArrowRight,
  Monitor,
  Smartphone,
  Printer
} from 'lucide-react';
import { HARDWARE_ITEMS } from '@/data/content';
import { HardwareConfigurator } from '@/components/hardware/HardwareConfigurator';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export const HardwarePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [pricingMode, setPricingMode] = useState<'lease' | 'outright'>('lease');

  const filteredItems = activeCategory === 'all'
    ? HARDWARE_ITEMS
    : HARDWARE_ITEMS.filter((h) => h.category === activeCategory);

  return (
    <div className="py-12 sm:py-20 space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hardware Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
            <Package className="w-4 h-4" />
            <span>Plug & Play Pre-Provisioned Fleet</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Commercial POS Hardware Built for High Velocity.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Industrial touchscreens, thermal auto-cutters, drop-tested handhelds, and 21.5" self-order kiosks. Zero lock-in, full open driver support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Free 2-Day Express Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3-Year Next-Day Advance Swap</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>$0 Upfront HaaS Leasing</span>
            </div>
          </div>
        </div>

        {/* Interactive Custom Bundle Configurator */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h2 className="text-2xl font-bold font-display text-white">
                Interactive Custom Hardware Configurator
              </h2>
            </div>
            <Badge variant="emerald">Live Dynamic Quote</Badge>
          </div>
          <HardwareConfigurator />
        </div>

        {/* Complete Hardware Catalog Grid */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Complete Certified Hardware Catalog
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                All devices ship pre-flashed with Welinx OS or connect via standard ESC/POS drivers.
              </p>
            </div>

            {/* Filter Buttons & Pricing Mode */}
            <div className="flex flex-wrap items-center gap-2">
              {['all', 'terminal', 'kiosk', 'mpos', 'peripheral'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    activeCategory === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl hover:border-emerald-500/30 transition-all duration-300 group"
              >
                <div>
                  <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative mb-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
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

                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black font-display text-white">
                        ${item.priceLeasePerMonth}
                      </span>
                      <span className="text-xs font-mono text-slate-400">/mo HaaS</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-slate-300">
                        {formatCurrency(item.priceOutright)}
                      </span>
                      <div className="text-[10px] text-slate-500">outright</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 text-xs text-slate-300">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800">
                  <a href="/contact">
                    <Button variant="outline" className="w-full justify-center gap-2 border-slate-700 hover:border-emerald-500/40 text-slate-200">
                      <span>Inquire for Fulfillment</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
