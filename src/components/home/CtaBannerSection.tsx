import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Play, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const CtaBannerSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/30 shadow-2xl relative overflow-hidden text-center">
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>30-Day Risk-Free Guarantee • Setup in Under 20 Minutes</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Ready to Upgrade to the POS That Never Goes Down?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Join thousands of restaurant owners, QSR operators, and multi-unit franchises who eliminated cloud downtime and slashed credit card processing fees.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/demo" className="w-full sm:w-auto">
                <Button variant="emeraldGlow" size="lg" className="w-full sm:w-auto gap-2 font-bold px-8 py-4 text-base">
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Launch Live POS Sandbox</span>
                </Button>
              </Link>
              <Link to="/book-demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-slate-700 hover:border-emerald-500/50 text-slate-200 px-8 py-4 text-base">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Book Custom Consultation</span>
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Long-Term Contracts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Menu Migration Service</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>24/7 VIP Live Support</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
