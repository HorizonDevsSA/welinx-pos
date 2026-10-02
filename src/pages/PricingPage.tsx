import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle,
  Zap,
  Bike,
  Brain,
  QrCode
} from 'lucide-react';
import { PRICING_TIERS, ADDONS_DATA } from '@/data/content';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="py-12 sm:py-20 space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Pricing Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Extreme Transparency • Zero Hidden Fees</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Simple, Honest Pricing for Modern Merchants.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No long-term contracts. No mandatory processing take-rate hikes. Run on your own hardware or choose our $0 upfront HaaS bundles.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-slate-800 p-1 border border-slate-700 transition-colors relative"
            >
              <div
                className={`w-6 h-6 rounded-full bg-emerald-500 transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              <span>Annual Billing</span>
              <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.id}
                className={`rounded-3xl border p-8 flex flex-col justify-between backdrop-blur-2xl transition-all duration-300 relative shadow-2xl ${
                  tier.popular
                    ? 'bg-slate-900 border-emerald-500 shadow-emerald-500/10 ring-1 ring-emerald-500 -translate-y-2'
                    : 'bg-slate-900/70 border-white/[0.08] hover:border-slate-700'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant={tier.popular ? "emerald" : "cyan"} className="font-bold text-xs py-1">
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold font-display text-white">
                        {tier.name}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                        {tier.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black font-display text-white">
                        ${price}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        / month {isAnnual ? '(billed annually)' : ''}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-emerald-400 font-semibold mt-2">
                      💳 Rates: {tier.processingRate}
                    </div>
                  </div>

                  {/* Terminals & Features List */}
                  <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Includes:
                    </div>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}

                    {tier.notIncluded && tier.notIncluded.length > 0 && (
                      <>
                        <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold pt-3">
                          Add-ons / Optional:
                        </div>
                        {tier.notIncluded.map((notFeat, nIdx) => (
                          <div key={nIdx} className="flex items-start gap-2 text-slate-400">
                            <span className="w-4 h-4 text-slate-400 shrink-0 text-center font-mono">•</span>
                            <span>{notFeat}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <Link to="/book-demo" className="w-full block">
                    <Button
                      variant={tier.popular ? "emeraldGlow" : "outline"}
                      className="w-full justify-center gap-2 font-bold py-3.5"
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual-Pricing FinTech Explanation Box */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="emerald">100% Compliant Dual-Pricing Engine</Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                How Dual-Pricing Eliminates Your Card Processing Fees.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Rather than paying 2.9% to 3.5% out of your hard-earned restaurant and retail margins, Welinx displays a cash discount vs regular card total on customer screens and printed checks. The customer pays the card surcharge, resulting in <strong>$0.00 merchant processing fees</strong> for you.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-emerald-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Full Visa/Mastercard Surcharge Compliance
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Clear Itemized Receipts
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Link to="/resources/roi-calculator">
                <Button variant="emeraldGlow" size="lg" className="gap-2">
                  <span>Open Savings Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Add-Ons Marketplace Drawer */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Modular Add-Ons Marketplace
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Activate advanced omnichannel and AI modules on a flexible month-to-month basis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADDONS_DATA.map((addon, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
              >
                <div>
                  <div className="font-mono text-emerald-400 text-xs font-bold mb-2">
                    {addon.price}
                  </div>
                  <h4 className="text-base font-bold font-display text-white">
                    {addon.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {addon.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <Link to="/book-demo" className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                    <span>Add to Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
