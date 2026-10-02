import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  HelpCircle 
} from 'lucide-react';
import { COMPETITOR_COMPARISONS } from '@/data/content';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const ComparePage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  const currentComp = slug ? COMPETITOR_COMPARISONS.find((c) => c.slug === slug) : null;

  if (currentComp) {
    return (
      <div className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
              <Zap className="w-4 h-4" />
              <span>Head-to-Head Architectural Breakdown</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Welinx POS vs. {currentComp.competitor}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {currentComp.tagline}
            </p>

            <div className="p-6 rounded-2xl bg-slate-900 border border-white/[0.08] text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-white">Our Verdict:</strong> {currentComp.verdict}
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="rounded-3xl border border-white/[0.08] bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/[0.08] bg-slate-900/90 text-sm font-mono font-bold">
              <div className="p-4 md:p-6 md:col-span-4 text-slate-400 uppercase tracking-wider">
                Feature Comparison
              </div>
              <div className="p-4 md:p-6 md:col-span-4 text-red-400 bg-red-950/20 md:border-l border-white/[0.08]">
                {currentComp.competitor} Standard
              </div>
              <div className="p-4 md:p-6 md:col-span-4 text-emerald-400 bg-emerald-950/30 md:border-l border-emerald-500/20">
                Welinx Enterprise Standard
              </div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {currentComp.table.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 text-sm">
                  <div className="p-4 md:p-6 md:col-span-4 font-semibold text-white">
                    {row.feature}
                  </div>
                  <div className="p-4 md:p-6 md:col-span-4 bg-red-950/10 md:border-l border-white/[0.06] text-slate-400 flex items-start gap-3">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{row.competitor}</span>
                  </div>
                  <div className="p-4 md:p-6 md:col-span-4 bg-emerald-950/20 md:border-l border-emerald-500/20 text-emerald-100 font-medium flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{row.welinx}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaways Cards */}
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white text-center">
              Top 3 Reasons Merchants Switch from {currentComp.competitor} to Welinx
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentComp.keyTakeaways.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-emerald-500/30">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">
                      {takeaway.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      {takeaway.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Switcher CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 p-8 sm:p-12 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Ready to migrate from {currentComp.competitor}?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Our engineering team imports your entire menu, modifier tree, and customer database for free within 24 hours.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/book-demo">
                <Button variant="emeraldGlow" size="lg" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Start Free Menu Migration</span>
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // All Comparisons Overview
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald">Competitor Analysis Hub</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white">
            Why Operators Switch to Welinx
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            See unfiltered head-to-head comparisons of offline reliability, hardware freedom, and credit card fee structures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMPETITOR_COMPARISONS.map((comp) => (
            <Link
              key={comp.slug}
              to={`/compare/${comp.slug}`}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-8 flex flex-col justify-between backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-2xl"
            >
              <div className="space-y-4">
                <Badge variant="cyan">vs. {comp.competitor}</Badge>
                <h2 className="text-2xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                  Welinx vs. {comp.competitor}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {comp.tagline}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span>Read Full Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
