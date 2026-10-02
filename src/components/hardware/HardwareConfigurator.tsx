import React, { useState } from 'react';
import { 
  Package, 
  Check, 
  Plus, 
  Minus, 
  Sliders, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CreditCard, 
  Download,
  Trash2
} from 'lucide-react';
import { HARDWARE_ITEMS } from '@/data/content';
import { HardwareItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import confetti from 'canvas-confetti';

export const HardwareConfigurator: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<string>('countertop-bundle');
  const [selectedPeripherals, setSelectedPeripherals] = useState<string[]>(['thermal-printer', 'cash-drawer']);
  const [paymentModel, setPaymentModel] = useState<'lease' | 'outright'>('lease');
  const [terminalQuantity, setTerminalQuantity] = useState<number>(2);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const baseTerminal = HARDWARE_ITEMS.find((h) => h.id === selectedStation) || HARDWARE_ITEMS[0];
  const peripherals = HARDWARE_ITEMS.filter((h) => selectedPeripherals.includes(h.id));

  // Calculations
  const baseTerminalCost = paymentModel === 'lease'
    ? baseTerminal.priceLeasePerMonth * terminalQuantity
    : baseTerminal.priceOutright * terminalQuantity;

  const peripheralsCost = peripherals.reduce((acc, p) => {
    return acc + (paymentModel === 'lease' ? p.priceLeasePerMonth : p.priceOutright);
  }, 0);

  const totalCost = baseTerminalCost + peripheralsCost;

  const togglePeripheral = (id: string) => {
    if (selectedPeripherals.includes(id)) {
      setSelectedPeripherals(selectedPeripherals.filter((p) => p !== id));
    } else {
      setSelectedPeripherals([...selectedPeripherals, id]);
    }
  };

  const handleDownloadQuote = () => {
    setQuoteSuccess(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
    setTimeout(() => setQuoteSuccess(false), 4000);
  };

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: 3 Config Steps */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Step 1: Base Station */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                Choose Base Register or Station
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {HARDWARE_ITEMS.filter((h) => h.category !== 'peripheral').map((h) => {
                const isSelected = selectedStation === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setSelectedStation(h.id)}
                    className={`rounded-2xl p-4 text-left border transition-all duration-200 flex flex-col justify-between h-52 relative group ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                          {h.category}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className="font-bold text-sm text-white mt-2 group-hover:text-emerald-300">
                        {h.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {h.tagline}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="font-mono text-base font-black text-white">
                        {paymentModel === 'lease' ? `$${h.priceLeasePerMonth}/mo` : formatCurrency(h.priceOutright)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quantity Selector */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-300 font-medium">
                Number of Station Terminals:
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTerminalQuantity(Math.max(1, terminalQuantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-emerald-400 text-sm">
                  {terminalQuantity}
                </span>
                <button
                  onClick={() => setTerminalQuantity(terminalQuantity + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Peripherals */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                Select Certified Peripherals
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {HARDWARE_ITEMS.filter((h) => h.category === 'peripheral').map((p) => {
                const isChecked = selectedPeripherals.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePeripheral(p.id)}
                    className={`rounded-2xl p-4 text-left border transition-all duration-200 flex flex-col justify-between h-44 ${
                      isChecked
                        ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/15'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-mono text-cyan-400 font-bold">PERIPHERAL</span>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="font-bold text-sm text-white mt-2">
                        {p.name}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="font-mono text-sm font-bold text-cyan-300">
                        {paymentModel === 'lease' ? `+$${p.priceLeasePerMonth}/mo` : `+${formatCurrency(p.priceOutright)}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Payment Model */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                Choose Payment / Financing Model
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentModel('lease')}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  paymentModel === 'lease'
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">HaaS (Hardware-as-a-Service)</span>
                  <Badge variant="emerald">$0 Upfront</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Low monthly fee, includes automatic warranty upgrades and overnight hardware replacements.
                </p>
              </button>

              <button
                onClick={() => setPaymentModel('outright')}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  paymentModel === 'outright'
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">Outright Purchase</span>
                  <Badge variant="outline">Own 100%</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  One-time hardware purchase with 3-year advance manufacturer warranty and zero monthly lease fees.
                </p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Live Config Summary Drawer */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-950 border border-emerald-500/30 p-6 flex flex-col justify-between shadow-xl space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Custom Hardware Quote
              </span>
              <Badge variant="emerald" className="text-[10px]">Pre-Provisioned</Badge>
            </div>

            {/* Config Breakdown Items */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{terminalQuantity}x {baseTerminal.name}</span>
                  <span className="font-mono text-emerald-400">
                    {paymentModel === 'lease' ? `$${baseTerminalCost}/mo` : formatCurrency(baseTerminalCost)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{baseTerminal.specs[0]}</div>
              </div>

              {peripherals.map((p) => (
                <div key={p.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">{p.name}</span>
                  <span className="font-mono text-cyan-300 font-semibold">
                    {paymentModel === 'lease' ? `$${p.priceLeasePerMonth}/mo` : formatCurrency(p.priceOutright)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Display */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-mono text-slate-400">
                  {paymentModel === 'lease' ? 'Total Monthly Lease:' : 'Total Outright Hardware:'}
                </span>
                <span className="text-3xl font-black font-display text-emerald-400">
                  {paymentModel === 'lease' ? `$${totalCost}/mo` : formatCurrency(totalCost)}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free 2-day express shipping included</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <Button
              onClick={handleDownloadQuote}
              variant="emeraldGlow"
              className="w-full justify-center gap-2 font-bold py-3.5"
            >
              <Download className="w-4 h-4" />
              <span>{quoteSuccess ? 'Quote Saved & Downloaded!' : 'Download Official Hardware Quote'}</span>
            </Button>
            <div className="text-[11px] text-center text-slate-400">
              Need custom volume leasing? <a href="/contact" className="text-emerald-400 hover:underline">Contact sales</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
