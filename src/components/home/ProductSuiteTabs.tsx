import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Smartphone, 
  ChefHat, 
  Boxes, 
  LineChart, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Layers 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const ProductSuiteTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'kds' | 'kiosk' | 'inventory' | 'cloud'>('register');

  const tabs = [
    { id: 'register', label: 'POS Register', icon: Monitor, badge: 'Core Terminal' },
    { id: 'kds', label: 'Kitchen KDS', icon: ChefHat, badge: 'Paperless Routing' },
    { id: 'kiosk', label: 'AI Kiosks', icon: Smartphone, badge: '+22% Ticket Boost' },
    { id: 'inventory', label: 'Recipe Inventory', icon: Boxes, badge: 'Gram-Level Control' },
    { id: 'cloud', label: 'Multi-Store Cloud', icon: LineChart, badge: 'Enterprise HQ' },
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold mb-4">
            <Layers className="w-4 h-4" />
            <span>The Unified Modular Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Everything Your Store Needs. Zero Clunky Add-Ons.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Every station communicates natively over your local store LAN. No third-party connectors or monthly API synchronization headaches.
          </p>

          {/* Tab Switcher Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/[0.08] max-w-4xl mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Tab Content Showcase */}
        <div className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative">
          
          {/* Tab 1: POS Register */}
          {activeTab === 'register' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-6">
                <Badge variant="emerald">⚡ Sub-Second Checkout Engine</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Intuitive Touch Register with Offline SQLite Speed
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Engineered for blistering speed during peak rush hours. Ring 5-item checks with complex modifiers in seconds, split tenders across multiple cards, and switch cash drawers without slowing down.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-emerald-400 font-display font-black text-2xl">&lt; 0.2s</div>
                    <div className="text-xs text-slate-400 mt-1">Button tap to ticket print latency</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-cyan-400 font-display font-black text-2xl">100%</div>
                    <div className="text-xs text-slate-400 mt-1">Full offline functionality with local SQLite</div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-tender split payments & custom seat checking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dual-pricing display automatically passes zero fee to merchant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Runs on Windows, macOS, Linux, Android & iPadOS</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link to="/products/pos-register">
                    <Button variant="emeraldGlow" className="gap-2">
                      <span>Explore POS Register Features</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* UI Mockup Graphic */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Register #1 • Main Bar • Shift $4,820</span>
                    </div>
                    <span className="text-slate-400">Server: Alex M.</span>
                  </div>

                  {/* Menu Grid Preview */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                      <div className="font-bold">Ribeye 14oz</div>
                      <div className="font-mono text-slate-400 mt-1">$38.00</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                      <div className="font-bold">Craft IPA</div>
                      <div className="font-mono text-slate-400 mt-1">$8.00</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                      <div className="font-bold">Caesar Salad</div>
                      <div className="font-mono text-slate-400 mt-1">$14.00</div>
                    </div>
                  </div>

                  {/* Check Totals */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Table #8 (4 Guests)</span>
                      <span className="text-emerald-400 font-mono font-bold">Cash: $60.00 | Card: $62.40</span>
                    </div>
                    <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-slate-800">
                      <span>Total (Dual-Pricing Surcharge Saved)</span>
                      <span className="text-emerald-400 font-mono">$60.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Kitchen KDS */}
          {activeTab === 'kds' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-6">
                <Badge variant="amber">👨‍🍳 Paperless Kitchen Timing</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Paperless Kitchen Display System with Cook Timers
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Route orders to custom kitchen stations (Grill, Fryer, Salad, Expo), monitor elapsed ticket prep times, and notify waitstaff the second an order is ready for pickup.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-amber-400 font-display font-black text-2xl">30%</div>
                    <div className="text-xs text-slate-400 mt-1">Faster kitchen ticket fulfillment</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-emerald-400 font-display font-black text-2xl">$0</div>
                    <div className="text-xs text-slate-400 mt-1">Thermal paper waste & lost paper tickets</div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Color-coded timers: Green (&lt;5m), Yellow (&lt;10m), Red (&gt;10m)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Industrial USB bump bar & touchscreen gesture support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct local LAN multicast synchronization</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link to="/products/kitchen-display-system">
                    <Button variant="emeraldGlow" className="gap-2">
                      <span>Explore KDS Features</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* KDS Mockup */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                    <span className="text-amber-400 font-bold">KDS LINE #1 • GRILL STATION</span>
                    <span className="text-slate-400">Avg Ticket Time: 6m 12s</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-bold text-white">Ticket #102</span>
                        <span className="text-emerald-400 font-bold">03:45</span>
                      </div>
                      <div className="text-xs text-slate-200 font-medium">
                        <div>1x Ribeye Medium-Rare</div>
                        <div className="text-amber-300 text-[11px]">• Sub Truffle Fries</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-bold text-white">Ticket #103</span>
                        <span className="text-amber-400 font-bold">08:12</span>
                      </div>
                      <div className="text-xs text-slate-200 font-medium">
                        <div>2x Double Smash Burger</div>
                        <div className="text-slate-400 text-[11px]">• Extra Pickles</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Self-Service Kiosks */}
          {activeTab === 'kiosk' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-6">
                <Badge variant="cyan">📱 AI Upselling & Line-Busting</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  21.5" Self-Service Kiosks That Boost Check Sizes +22%
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Turn walk-in foot traffic into larger basket sizes without extra cashiers. Customers customize toppings, browse rich photography, and pay with contactless tap in seconds.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-cyan-400 font-display font-black text-2xl">+22%</div>
                    <div className="text-xs text-slate-400 mt-1">Average order value increase</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-emerald-400 font-display font-black text-2xl">55%</div>
                    <div className="text-xs text-slate-400 mt-1">Queue wait time reduction</div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dynamic AI upselling triggers based on cart items</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Integrated EMV chip & NFC Apple/Google Pay reader</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ADA compliant low-reach accessibility mode</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link to="/products/self-service-kiosk">
                    <Button variant="cyanGlow" className="gap-2">
                      <span>Explore Kiosk Features</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Kiosk Mockup */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-950 border border-cyan-500/30 p-5 shadow-2xl space-y-4">
                  <div className="text-center font-display font-bold text-white text-base">
                    Custom Order Kiosk • "Make It A Combo?"
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">Add Artisan Garlic Parm Fries & Soda</div>
                      <div className="text-xs text-cyan-300">Save $2.00 vs individual items</div>
                    </div>
                    <Button variant="cyanGlow" size="sm" className="font-bold">
                      + $4.50
                    </Button>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                    <span>Tap Card or Apple Pay</span>
                    <span className="text-emerald-400 font-bold">Ticket #214</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Recipe Inventory */}
          {activeTab === 'inventory' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-6">
                <Badge variant="purple">📦 Margin Control & Costing</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Gram-Level Recipe Deductions & Automated Supplier POs
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Every time a burger, cocktail, or espresso is sold, Welinx deducts exact ingredient quantities automatically. Know your exact theoretical food cost percentage and stop inventory shrinkage.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-purple-400 font-display font-black text-2xl">3-5%</div>
                    <div className="text-xs text-slate-400 mt-1">Average food cost margin savings</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-emerald-400 font-display font-black text-2xl">100k+</div>
                    <div className="text-xs text-slate-400 mt-1">SKU barcode matrix capacity</div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time Food Cost % calculation per menu item</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated purchase orders triggered when stock hits par</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Spillage, burn, and comp logging with variance auditing</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link to="/products/inventory-and-recipes">
                    <Button variant="emeraldGlow" className="gap-2">
                      <span>Explore Inventory Features</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Inventory Mockup */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-2xl space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-purple-400 font-bold pb-2 border-b border-slate-800">
                    <span>LIVE INGREDIENT DEDUCTIONS</span>
                    <span>Welinx Stock Engine</span>
                  </div>
                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <span>Angus Beef Patty (200g)</span>
                      <span className="text-emerald-400">Stock: 48.2 kg</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <span>Brioche Buns (Units)</span>
                      <span className="text-amber-400">Stock: 34 (Reorder Par 40)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <span>Aged Cheddar (30g)</span>
                      <span className="text-emerald-400">Stock: 12.5 kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Multi-Store Cloud */}
          {activeTab === 'cloud' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-6">
                <Badge variant="cyan">🏢 Enterprise HQ Command</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Multi-Location Governance & Consolidated Analytics
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Manage 5 to 500+ locations from a single dashboard. Push global catalog updates, monitor live sales streams, and isolate branch data with PostgreSQL Row-Level Security.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-cyan-400 font-display font-black text-2xl">14 ms</div>
                    <div className="text-xs text-slate-400 mt-1">Telemetry cloud sync latency</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <div className="text-emerald-400 font-display font-black text-2xl">500+</div>
                    <div className="text-xs text-slate-400 mt-1">Stores per enterprise tenant</div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Global menu pushes & regional price overrides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-location role-based permissions (RBAC)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time labor % vs sales tracking across all branches</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link to="/products/analytics-and-cloud">
                    <Button variant="emeraldGlow" className="gap-2">
                      <span>Explore Cloud Analytics</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Cloud Mockup */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-2xl space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-cyan-400 font-bold pb-2 border-b border-slate-800">
                    <span>EXECUTIVE DASHBOARD (12 LOCATIONS)</span>
                    <span className="text-emerald-400">Live GMV: $48,920</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-200">
                    <div className="p-3 rounded bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Labor Cost %</div>
                      <div className="text-lg font-bold text-emerald-400">24.2%</div>
                    </div>
                    <div className="p-3 rounded bg-slate-900 border border-slate-800">
                      <div className="text-slate-400">Avg Ticket Size</div>
                      <div className="text-lg font-bold text-cyan-400">$34.80</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
