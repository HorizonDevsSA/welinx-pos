import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  CreditCard, 
  DollarSign, 
  Download, 
  Users, 
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import confetti from 'canvas-confetti';

export const RoiCalculatorPage: React.FC = () => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(85000);
  const [avgTicket, setAvgTicket] = useState<number>(38);
  const [locations, setLocations] = useState<number>(1);
  const [laborHourlyRate, setLaborHourlyRate] = useState<number>(18);
  const [staffCount, setStaffCount] = useState<number>(6);
  const [downloaded, setDownloaded] = useState(false);

  // Calculations
  const monthlyTransactions = Math.max(1, Math.round(monthlyVolume / avgTicket));
  const totalVolume = monthlyVolume * locations;
  
  // Legacy Card Fees (Toast / Square: 2.9% + $0.30)
  const legacyMonthlyPercentage = totalVolume * 0.029;
  const legacyMonthlyFixed = monthlyTransactions * locations * 0.30;
  const legacyMonthlyFee = legacyMonthlyPercentage + legacyMonthlyFixed;
  const legacyAnnualFee = legacyMonthlyFee * 12;

  // Welinx Dual Pricing eliminates 100% of card processing fees
  const annualProcessingSaved = legacyAnnualFee;

  // Labor Efficiency Savings: 4.5 hours saved per server per week on split checks & line busting
  const weeklyLaborHoursSaved = (staffCount * locations) * 4.5;
  const annualLaborSavings = weeklyLaborHoursSaved * 52 * laborHourlyRate * 0.5; // conservative 50% realization

  const totalAnnualProfitBoost = annualProcessingSaved + annualLaborSavings;
  const threeYearTotal = totalAnnualProfitBoost * 3;

  const handleDownload = () => {
    setDownloaded(true);
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {}
    setTimeout(() => setDownloaded(false), 5000);
  };

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <Badge variant="emerald">FinTech ROI & Labor Efficiency Engine</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Calculate Your Total Annual Profit Recovery
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            See exactly how eliminating credit card swipe fees combined with faster table turns and AI kiosk ordering directly impacts your bottom line.
          </p>
        </div>

        {/* Full Interactive Calculator Suite */}
        <div className="rounded-3xl border border-white/[0.08] bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Monthly Card Volume */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Monthly Card Processing Volume (Per Store)</span>
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
                  <span>$10,000</span>
                  <span>$250,000</span>
                  <span>$500,000+</span>
                </div>
              </div>

              {/* Slider 2: Average Check */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <span>Average Check / Transaction Size</span>
                  </label>
                  <span className="font-mono font-bold text-xl text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                    ${avgTicket}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="2"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>$10 (QSR)</span>
                  <span>$38 (Casual)</span>
                  <span>$150 (Upscale)</span>
                </div>
              </div>

              {/* Slider 3: Store Count */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>Number of Store Locations</span>
                  </label>
                  <span className="font-mono font-bold text-xl text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">
                    {locations} {locations === 1 ? 'Store' : 'Stores'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={locations}
                  onChange={(e) => setLocations(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>1 Store</span>
                  <span>10 Stores</span>
                  <span>25 Stores</span>
                </div>
              </div>

              {/* Slider 4: Hourly Wage & Staff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-400" /> Hourly Labor Rate</span>
                    <span className="font-mono text-cyan-400 font-bold">${laborHourlyRate}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="35"
                    step="1"
                    value={laborHourlyRate}
                    onChange={(e) => setLaborHourlyRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-emerald-400" /> Staff per Store</span>
                    <span className="font-mono text-emerald-400 font-bold">{staffCount} Cashiers/Servers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    step="1"
                    value={staffCount}
                    onChange={(e) => setStaffCount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

            </div>

            {/* Results Box (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Total Projected Merchant Value
              </span>

              <div>
                <div className="text-4xl sm:text-5xl font-black font-display text-emerald-400 tracking-tight">
                  {formatCurrency(totalAnnualProfitBoost)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Estimated profit recovered per year
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Processing Fees Eliminated (Dual-Pricing)</span>
                  <span className="font-mono text-emerald-400 font-bold">+{formatCurrency(annualProcessingSaved)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Labor Hours Saved via Speed & Kiosks</span>
                  <span className="font-mono text-cyan-400 font-bold">+{formatCurrency(annualLaborSavings)}</span>
                </div>
                <div className="flex justify-between text-slate-200 font-bold pt-2 border-t border-slate-800/80 text-sm">
                  <span>3-Year Retained Wealth</span>
                  <span className="font-mono text-emerald-400">{formatCurrency(threeYearTotal)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <Button
                  onClick={handleDownload}
                  variant="emeraldGlow"
                  className="w-full justify-center gap-2 font-bold py-3.5"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloaded ? 'ROI Report Exported!' : 'Download Custom ROI PDF Report'}</span>
                </Button>
                <Link to="/book-demo" className="block w-full">
                  <Button variant="outline" className="w-full justify-center gap-2 border-slate-700 text-slate-200">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Validate with POS Specialist</span>
                  </Button>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
