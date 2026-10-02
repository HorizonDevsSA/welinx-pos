import React from 'react';
import { Star, Quote, CheckCircle, TrendingUp, ShieldCheck, Building2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/content';
import { Badge } from '@/components/ui/Badge';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-slate-950/70 relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold mb-4">
            <Quote className="w-4 h-4" />
            <span>Proven Merchant Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Trusted by High-Volume Hospitality & Retail Leaders.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            See how real operators eliminated downtime, sped up checkouts, and recouped tens of thousands in merchant processing fees.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="rounded-2xl bg-slate-900/80 border border-white/[0.08] p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black font-display text-emerald-400">99.999%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Local Register Uptime</div>
          </div>
          <div className="rounded-2xl bg-slate-900/80 border border-white/[0.08] p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black font-display text-cyan-400">+18%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Average Ticket Growth</div>
          </div>
          <div className="rounded-2xl bg-slate-900/80 border border-white/[0.08] p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black font-display text-emerald-400">$14,200</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Avg Annual Savings</div>
          </div>
          <div className="rounded-2xl bg-slate-900/80 border border-white/[0.08] p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black font-display text-purple-400">&lt; 15s</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Peak Counter Checkout</div>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-8 flex flex-col justify-between backdrop-blur-xl shadow-2xl relative group hover:border-emerald-500/30 transition-all duration-300"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-emerald-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border border-emerald-500/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-white font-display">
                      {t.author}
                    </div>
                    <div className="text-xs text-slate-400">
                      {t.role} • {t.business}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <Badge variant="emerald" className="text-[10px] font-mono font-bold">
                    {t.stats}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
