import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Package, 
  Play, 
  Quote, 
  ShieldCheck, 
  TrendingUp,
  LayoutGrid,
  ChefHat,
  Receipt,
  CreditCard,
  Clock,
  Tag,
  Barcode,
  Boxes,
  Gift,
  Globe,
  Lock,
  Database
} from 'lucide-react';
import { SOLUTIONS_DATA } from '@/data/content';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

// Helper to map icon names
const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  ChefHat,
  Receipt,
  CreditCard,
  Zap,
  Smartphone: Zap,
  Clock,
  ShieldCheck,
  Tag,
  Barcode,
  Boxes,
  Gift,
  Globe,
  Lock,
  TrendingUp,
  Database,
};

export const SolutionsPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  // If a slug is specified, render the vertical deep dive
  const currentSolution = slug ? SOLUTIONS_DATA.find((s) => s.slug === slug) : null;

  if (currentSolution) {
    return (
      <div className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Vertical Hero */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>{currentSolution.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              {currentSolution.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {currentSolution.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/demo">
                <Button variant="emeraldGlow" size="lg" className="w-full sm:w-auto gap-2">
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Test Drive in Browser</span>
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-slate-700 hover:border-emerald-500/40 text-slate-200">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Book Vertical Walkthrough</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Metric Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentSolution.metrics.map((m, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900/80 border border-white/[0.08] p-6 text-center">
                <div className="text-3xl sm:text-4xl font-black font-display text-emerald-400">
                  {m.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Industry Benefits 4-Card Grid */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Purpose-Built Features for {currentSolution.title.split('&')[0]}
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Engineered with specific workflows required by top operators in your vertical.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSolution.benefits.map((b, idx) => {
                const Icon = iconMap[b.icon] || CheckCircle2;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] flex items-start gap-5 backdrop-blur-xl shadow-xl hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hardware Recommendation Bundle Card */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Badge variant="emerald">{currentSolution.hardwareBundle.tag}</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  {currentSolution.hardwareBundle.name}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {currentSolution.hardwareBundle.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
                  {currentSolution.hardwareBundle.specs.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 flex items-baseline gap-4">
                  <div>
                    <span className="text-3xl font-black font-display text-white">
                      ${currentSolution.hardwareBundle.priceHaas}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/mo ($0 upfront HaaS)</span>
                  </div>
                  <div className="text-slate-500 text-xs">or</div>
                  <div>
                    <span className="text-lg font-bold font-mono text-slate-300">
                      {formatCurrency(currentSolution.hardwareBundle.priceOutright)}
                    </span>
                    <span className="text-xs text-slate-400"> outright</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/hardware">
                    <Button variant="emeraldGlow" className="gap-2">
                      <span>Customize This Bundle</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl h-64 bg-slate-950">
                  <img
                    src={currentSolution.hardwareBundle.image}
                    alt={currentSolution.hardwareBundle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Case Study Card */}
          <div className="rounded-3xl bg-slate-950 border border-white/[0.08] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Quote className="w-10 h-10 text-emerald-400 mx-auto opacity-40" />
              <p className="text-lg sm:text-xl text-slate-200 italic leading-relaxed">
                "{currentSolution.caseStudy.quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={currentSolution.caseStudy.avatar}
                  alt={currentSolution.caseStudy.author}
                  className="w-12 h-12 rounded-full object-cover border border-emerald-500/40"
                />
                <div className="text-left">
                  <div className="font-bold text-white text-base">
                    {currentSolution.caseStudy.author}
                  </div>
                  <div className="text-xs text-slate-400">
                    {currentSolution.caseStudy.role} • {currentSolution.caseStudy.business}
                  </div>
                </div>
              </div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                Results: {currentSolution.caseStudy.results}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Overview of all solutions if no slug
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald">Industry Specific POS Portals</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white">
            Tailored Solutions for Modern Commerce
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Discover how Welinx solves the unique operational bottlenecks of restaurants, high-volume fast casual, multi-SKU retail, and enterprise franchise chains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SOLUTIONS_DATA.map((sol) => (
            <Link
              key={sol.id}
              to={`/solutions/${sol.slug}`}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-8 flex flex-col justify-between backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">{sol.heroBadge}</Badge>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-2xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                  {sol.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {sol.description}
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {sol.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-emerald-400 font-bold font-display text-lg">{m.value}</div>
                      <div className="text-[11px] text-slate-400">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span>View Full {sol.title.split('&')[0]} Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
