import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  Wifi, 
  WifiOff, 
  Database, 
  ArrowRight, 
  CheckCircle, 
  Receipt, 
  Printer, 
  CreditCard,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import confetti from 'canvas-confetti';

export const HeroSection: React.FC = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [activeItems, setActiveItems] = useState<Array<{ name: string; price: number }>>([
    { name: 'Smash Burger Double', price: 14.50 },
    { name: 'Truffle Parmesan Fries', price: 6.00 },
  ]);
  const [lastAction, setLastAction] = useState<string>('Ready to ring orders');
  const [receiptPrinted, setReceiptPrinted] = useState(false);

  const subtotal = activeItems.reduce((acc, item) => acc + item.price, 0);
  const cardFeeSaved = subtotal * 0.035; // 3.5% fee saved via dual pricing
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const addItem = (name: string, price: number) => {
    setActiveItems([...activeItems, { name, price }]);
    setLastAction(`Added ${name} (${isOfflineMode ? 'SQLite Local' : 'Cloud Synchronized'})`);
  };

  const simulateCheckout = () => {
    setReceiptPrinted(true);
    setLastAction(isOfflineMode ? '⚡ Order #408 Printed & Saved Locally (0.00s)' : '✅ Order #408 Synced & Printed (12ms)');
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // safe fallback
    }
    setTimeout(() => {
      setReceiptPrinted(false);
    }, 3500);
  };

  return (
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Background Glows & Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Prop & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-emerald-500/10 backdrop-blur-md">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>100% Offline-First Architecture • Zero Cloud Downtime Ever</span>
            </div>

            {/* Headline H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
              The POS Operating System That{' '}
              <span className="gradient-text-emerald block sm:inline">
                Never Goes Down.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Power registers, self-service kiosks, kitchen displays, and multi-location inventory with blistering speed. Run fully offline with local SQLite when the internet fails, and eliminate card processing fees with built-in Dual-Pricing.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/demo" className="w-full sm:w-auto">
                <Button variant="emeraldGlow" size="lg" className="w-full sm:w-auto gap-2.5 text-base px-8 py-4">
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Explore Live POS Sandbox</span>
                </Button>
              </Link>

              <Link to="/book-demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base px-6 py-4 border-slate-700 hover:border-emerald-500/50 text-slate-200">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Book a 15-Min Walkthrough</span>
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-8 border-t border-white/[0.08] w-full flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>2,500+ Active Terminals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>99.999% Local Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>$0 Card Fee Dual-Pricing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Register Simulator Preview */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-slate-800/40 to-cyan-500/20 shadow-2xl shadow-emerald-500/10">
              <div className="rounded-[22px] bg-slate-950/95 border border-white/[0.08] p-5 sm:p-6 backdrop-blur-2xl">
                
                {/* Simulator Header & Offline Switch */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">Welinx Register v2.4</span>
                  </div>

                  {/* Offline simulation toggle */}
                  <button
                    onClick={() => {
                      const newMode = !isOfflineMode;
                      setIsOfflineMode(newMode);
                      setLastAction(newMode ? '⚡ Cloud disconnected! Running 100% on Local SQLite' : '🟢 Internet restored! Synced 2 items to Postgres Cloud (8ms)');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                      isOfflineMode
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                    title="Click to test offline resilience"
                  >
                    {isOfflineMode ? (
                      <>
                        <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                        <span>OFFLINE MODE (ACTIVE)</span>
                      </>
                    ) : (
                      <>
                        <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                        <span>ONLINE (SIMULATE OUTAGE)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Item Hotkeys to Test Speed */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>TAP TO TEST SUB-MILLISECOND RINGING:</span>
                    <span className="text-emerald-400">SQLite Instant</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => addItem('Smash Burger', 12.50)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/80 transition-all text-left group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400">🍔 Burger</div>
                      <div className="text-[11px] font-mono text-slate-400">$12.50</div>
                    </button>
                    <button
                      onClick={() => addItem('Craft IPA Pint', 7.00)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/80 transition-all text-left group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400">🍺 Craft Beer</div>
                      <div className="text-[11px] font-mono text-slate-400">$7.00</div>
                    </button>
                    <button
                      onClick={() => addItem('Espresso Double', 4.25)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/80 transition-all text-left group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400">☕ Espresso</div>
                      <div className="text-[11px] font-mono text-slate-400">$4.25</div>
                    </button>
                  </div>
                </div>

                {/* Active Simulated Check / Cart */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1.5 border-b border-slate-800">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                      Table #14 • Guest 1-2
                    </span>
                    <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {activeItems.length} items
                    </span>
                  </div>

                  <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                    {activeItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-slate-300">
                        <span className="truncate pr-2">{item.name}</span>
                        <span className="font-mono text-slate-200">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-slate-300">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Sales Tax (8.25%)</span>
                      <span className="font-mono text-slate-300">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-sm text-white pt-1">
                      <span>Total Due</span>
                      <span className="font-mono text-emerald-400">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Dual-Pricing Merchant Savings Pill */}
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-[11px] text-emerald-300 font-mono">
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-emerald-400" />
                      Dual-Pricing Surcharge Saved:
                    </span>
                    <span className="font-bold text-emerald-400">+${cardFeeSaved.toFixed(2)} back</span>
                  </div>
                </div>

                {/* Checkout & Action Status */}
                <div className="mt-4 space-y-2">
                  <Button
                    onClick={simulateCheckout}
                    variant={isOfflineMode ? "default" : "emeraldGlow"}
                    className="w-full justify-center gap-2 font-bold py-3"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{receiptPrinted ? 'Printing Receipt & KDS Ticket...' : 'Charge Check & Print Ticket'}</span>
                  </Button>

                  <div className="text-[11px] font-mono text-center text-slate-400 flex items-center justify-center gap-1.5">
                    <Database className="w-3 h-3 text-cyan-400" />
                    <span className="truncate">{lastAction}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
