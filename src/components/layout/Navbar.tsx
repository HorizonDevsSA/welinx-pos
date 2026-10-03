import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Play, 
  Sparkles, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Building2, 
  Monitor, 
  Database, 
  ChefHat, 
  Smartphone, 
  Boxes, 
  LineChart, 
  Layers, 
  Sliders, 
  FileText, 
  PhoneCall, 
  ArrowRight,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090D16]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span className="font-display font-black text-xl bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                  W
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  Welinx
                </span>
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  POS
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase -mt-0.5">
                Enterprise Cloud
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname.startsWith('/solutions')
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-2xl bg-slate-900/95 border border-white/[0.1] shadow-2xl backdrop-blur-2xl grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    By Industry Vertical
                  </div>
                  <Link
                    to="/solutions/restaurants-and-bars"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                        Restaurants & Bars
                      </div>
                      <div className="text-xs text-slate-400">
                        Table maps, course timing & split bills
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/solutions/quick-service-qsr"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300">
                        QSR & Fast Casual
                      </div>
                      <div className="text-xs text-slate-400">
                        15-sec counter flow & self-order kiosks
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/solutions/retail-and-boutique"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-300">
                        Retail & Boutiques
                      </div>
                      <div className="text-xs text-slate-400">
                        100k+ SKUs, matrix variations & barcoding
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/solutions/franchises-and-chains"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-blue-300">
                        Franchises & Chains
                      </div>
                      <div className="text-xs text-slate-400">
                        Multi-tenant control & rollup analytics
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname.startsWith('/products')
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 w-96 p-3 rounded-2xl bg-slate-900/95 border border-white/[0.1] shadow-2xl backdrop-blur-2xl grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Modular POS Platform</span>
                    <Badge variant="emerald" className="text-[10px]">Zero Downtime</Badge>
                  </div>

                  <Link
                    to="/products/pos-register"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                        POS Register Terminal
                      </div>
                      <div className="text-xs text-slate-400">
                        Cross-platform desktop, web, iPad & Android
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/offline-first-engine"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 flex items-center gap-1.5">
                        <span>Offline-First Engine</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">SQLite</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Local-first transactions with auto-cloud sync
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/kitchen-display-system"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <ChefHat className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-amber-300">
                        Kitchen Display System (KDS)
                      </div>
                      <div className="text-xs text-slate-400">
                        Paperless order routing & cook timers
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/self-service-kiosk"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                        Self-Service Kiosks
                      </div>
                      <div className="text-xs text-slate-400">
                        +22% higher ticket size via AI upselling
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/inventory-and-recipes"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Boxes className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-300">
                        Recipe & Inventory Costing
                      </div>
                      <div className="text-xs text-slate-400">
                        Gram-level deductions & supplier POs
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/analytics-and-cloud"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <LineChart className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-blue-300">
                        Multi-Store Analytics
                      </div>
                      <div className="text-xs text-slate-400">
                        Real-time revenue stream & labor metrics
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Hardware Link */}
            <Link
              to="/hardware"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/hardware'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Hardware
            </Link>

            {/* Pricing Link */}
            <Link
              to="/pricing"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/pricing'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Pricing
            </Link>

            {/* Downloads Link */}
            <Link
              to="/downloads"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname === '/downloads' || location.pathname === '/download'
                  ? 'text-emerald-400 bg-emerald-500/10 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Downloads</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 hidden xl:inline">
                Win/Mac
              </span>
            </Link>

            {/* Compare Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('compare')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname.startsWith('/compare')
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Compare</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'compare' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'compare' && (
                <div className="absolute top-full left-0 w-72 p-3 rounded-2xl bg-slate-900/95 border border-white/[0.1] shadow-2xl backdrop-blur-2xl grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Why Merchants Switch
                  </div>
                  <Link
                    to="/compare/vs-toast"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                        Welinx vs Toast POS
                      </div>
                      <div className="text-xs text-slate-400">Open hardware & zero rate hikes</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    to="/compare/vs-square"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                        Welinx vs Square
                      </div>
                      <div className="text-xs text-slate-400">High-volume restaurant speed</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    to="/compare/vs-clover"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                        Welinx vs Clover
                      </div>
                      <div className="text-xs text-slate-400">No app store subscription bloat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname.startsWith('/resources')
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full right-0 w-72 p-3 rounded-2xl bg-slate-900/95 border border-white/[0.1] shadow-2xl backdrop-blur-2xl grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/resources/roi-calculator"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                        ROI & Savings Calculator
                      </div>
                      <div className="text-xs text-slate-400">Calculate exact fee elimination</div>
                    </div>
                  </Link>

                  <Link
                    to="/resources/blog"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300">
                        Guides & Insights
                      </div>
                      <div className="text-xs text-slate-400">Dual-pricing legalities & case studies</div>
                    </div>
                  </Link>

                  <Link
                    to="/resources/docs-and-api"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-300">
                        Developer Docs & API
                      </div>
                      <div className="text-xs text-slate-400">Hardware SDKs & webhooks</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/demo">
              <Button variant="outline" size="sm" className="gap-2 border-emerald-500/30 hover:border-emerald-500 text-emerald-400">
                <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                <span>Live POS Sandbox</span>
              </Button>
            </Link>

            <Link to="/book-demo">
              <Button variant="emeraldGlow" size="sm" className="gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Book a Demo</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/downloads">
              <Button variant="outline" size="sm" className="px-2.5 h-9 text-xs border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                <Download className="w-3 h-3 text-emerald-400" />
                <span className="inline">App</span>
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#090D16]/98 backdrop-blur-2xl border-t border-white/[0.08] p-6 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
                Get App & Software
              </div>
              <Link to="/downloads" className="p-2.5 rounded-lg text-emerald-300 bg-emerald-500/10 font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download for Windows & Mac</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black">v2.4</span>
              </Link>
            </div>

            <div className="grid gap-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
                Solutions
              </div>
              <Link to="/solutions/restaurants-and-bars" className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium">
                🍽️ Restaurants & Bars
              </Link>
              <Link to="/solutions/quick-service-qsr" className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium">
                ⚡ QSR & Fast Casual
              </Link>
              <Link to="/solutions/retail-and-boutique" className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium">
                🛍️ Retail & Supermarkets
              </Link>
              <Link to="/solutions/franchises-and-chains" className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium">
                🏢 Franchises & Chains
              </Link>
            </div>

            <div className="grid gap-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
                Products & Hardware
              </div>
              <Link to="/products/pos-register" className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium">
                🖥️ POS Register Software
              </Link>
              <Link to="/products/offline-first-engine" className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium">
                🛡️ Offline SQLite Engine
              </Link>
              <Link to="/hardware" className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium">
                📦 Certified Hardware Catalog
              </Link>
              <Link to="/pricing" className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium">
                🏷️ Pricing & Dual-Pricing Engine
              </Link>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
              <Link to="/demo" className="w-full">
                <Button variant="outline" className="w-full justify-center gap-2 border-emerald-500/40 text-emerald-400 py-3">
                  <Play className="w-4 h-4 fill-emerald-400" />
                  <span>Launch Live POS Sandbox</span>
                </Button>
              </Link>
              <Link to="/book-demo" className="w-full">
                <Button variant="emeraldGlow" className="w-full justify-center gap-2 py-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Book Custom 15-Min Walkthrough</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
