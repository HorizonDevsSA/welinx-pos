import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

export const RoiCalculatorSection: React.FC = () => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(65000);
  const [avgTicket, setAvgTicket] = useState<number>(35);

  // Calculations
  const monthlyTransactions = Math.max(1, Math.round(monthlyVolume / avgTicket));
  // Typical competitor rate (Toast / Square / Clover): 2.9% + $0.30 per swipe
  const legacyPercentageFee = monthlyVolume * 0.029;
  const legacyFixedFee = monthlyTransactions * 0.30;
  const legacyMonthlyFee = legacyPercentageFee + legacyFixedFee;
  const legacyAnnualFee = legacyMonthlyFee * 12;

  // Welinx Dual-Pricing: Surcharge passed to cardholder compliant with Visa/Mastercard rules = $0 merchant fee
  const welinxAnnualCost = 0;
  const annualSavings = legacyAnnualFee - welinxAnnualCost;
  const threeYearSavings = annualSavings * 3;

  return (
    <section className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden border-y border-white/[0.06]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            <span>Interactive FinTech Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Calculate How Much You’re Overpaying on Card Processing.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            See exactly how much annual revenue Welinx’s automated Dual-Pricing Engine puts back into your bank account.
          </p>
        </div>

        {/* Calculator Card Grid */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/[0.08] bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls: Sliders */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Monthly Card Volume */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Monthly Card Processing Volume</span>
                  </label>
                  <span className="font-mono font-bold text-xl text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                    {formatCurrency(monthlyVolume)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>$10,000 / mo</span>
                  <span>$250,000 / mo</span>
                  <span>$500,000+ / mo</span>
                </div>
              </div>

              {/* Slider 2: Average Ticket Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <span>Average Transaction / Check Size</span>
                  </label>
                  <span className="font-mono font-bold text-xl text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                    ${avgTicket}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>$10 (QSR/Boba)</span>
                  <span>$45 (Casual Dining)</span>
                  <span>$150 (Upscale)</span>
                </div>
              </div>

              {/* Volume Metrics */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Estimated Swipes: ~{monthlyTransactions.toLocaleString()} txns/mo</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Dual-Pricing Compliant
                </span>
              </div>

            </div>

            {/* Right Output: Savings Summary Box */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 p-6 sm:p-8 text-center space-y-6 shadow-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Your Annual Merchant Profit Recovery
              </span>

              <div>
                <div className="text-4xl sm:text-5xl font-black font-display text-emerald-400 tracking-tight">
                  {formatCurrency(annualSavings)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Saved every single year with Welinx
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-left">
                <div className="flex justify-between text-slate-400">
                  <span>Standard Processor Fee (2.9% + $0.30)</span>
                  <span className="font-mono text-red-400 font-semibold">{formatCurrency(legacyAnnualFee)}/yr</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Welinx Dual-Pricing Card Fee</span>
                  <span className="font-mono text-emerald-400 font-semibold">$0.00 / yr</span>
                </div>
                <div className="flex justify-between text-slate-300 font-bold pt-2 border-t border-slate-800/80">
                  <span>3-Year Projected Retention</span>
                  <span className="font-mono text-emerald-400 font-bold">{formatCurrency(threeYearSavings)}</span>
                </div>
              </div>

              <Link to="/book-demo" className="block w-full">
                <Button variant="emeraldGlow" size="lg" className="w-full justify-center gap-2 font-bold py-3.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Claim Your Savings — Switch</span>
                </Button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
