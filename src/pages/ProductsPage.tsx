import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Monitor, 
  Database, 
  ChefHat, 
  Smartphone, 
  Boxes, 
  LineChart, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { PRODUCTS_DATA } from '@/data/content';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const ProductsPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  const currentProduct = slug ? PRODUCTS_DATA.find((p) => p.slug === slug) : null;

  if (currentProduct) {
    return (
      <div className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Product Hero */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
              <Zap className="w-4 h-4" />
              <span>{currentProduct.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              {currentProduct.name}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {currentProduct.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/demo">
                <Button variant="emeraldGlow" size="lg" className="w-full sm:w-auto gap-2">
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Launch Live POS Sandbox</span>
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-slate-700 hover:border-emerald-500/40 text-slate-200">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Schedule Technical Deep Dive</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Core Capabilities & Architectural Pillars
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Built from the ground up to eliminate single points of failure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentProduct.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl shadow-xl hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    {h.stat && (
                      <div className="text-2xl font-black font-display text-emerald-400 mb-3">
                        {h.stat}
                      </div>
                    )}
                    <h3 className="text-lg font-bold font-display text-white">
                      {h.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications & Architecture Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Tech Specs */}
            <div className="lg:col-span-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] p-8 space-y-6">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold font-display text-white">
                  Technical Specifications
                </h3>
              </div>

              <div className="divide-y divide-slate-800">
                {currentProduct.techSpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="py-3.5 flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1">
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className="font-mono text-emerald-300 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture In-Depth Points */}
            <div className="lg:col-span-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] p-8 space-y-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold font-display text-white">
                  Enterprise Resilience & Sync Specs
                </h3>
              </div>

              <ul className="space-y-4">
                {currentProduct.architecturePoints.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Module Conversion */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/25 p-8 sm:p-12 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Ready to deploy {currentProduct.name} in your store?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Get pre-configured plug-and-play terminals or install the software directly onto your existing hardware fleet today.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/demo">
                <Button variant="emeraldGlow" size="lg" className="gap-2">
                  <span>Try Sandbox Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // All Products Overview
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Full Product Architecture</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white">
            The Welinx Product Suite
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            A modular POS ecosystem engineered for sub-millisecond execution, zero cloud downtime, and unified enterprise control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS_DATA.map((prod) => (
            <Link
              key={prod.id}
              to={`/products/${prod.slug}`}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-8 flex flex-col justify-between backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">{prod.category}</Badge>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                  {prod.name}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {prod.tagline}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span>View Architecture & Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
