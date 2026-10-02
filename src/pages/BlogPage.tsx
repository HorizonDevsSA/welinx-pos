import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'The 2026 Merchant Guide to Dual-Pricing & Surcharge Compliance',
    slug: 'dual-pricing-surcharge-compliance-guide',
    category: 'FinTech & Regulation',
    date: 'Oct 2, 2026',
    readTime: '6 min read',
    excerpt: 'How restaurant and retail operators legally eliminate 100% of interchange credit card processing swipe fees using modern automated dual-pricing software compliant with Visa and Mastercard regulations.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Why Cloud-Only POS Systems Fail: The Case for Local-First SQLite Architecture',
    slug: 'why-cloud-only-pos-systems-fail-local-first-sqlite',
    category: 'Engineering & Resilience',
    date: 'Sep 24, 2026',
    readTime: '8 min read',
    excerpt: 'An in-depth technical analysis of why legacy cloud point-of-sale platforms freeze during regional ISP blips and how bidirectional local SQLite replication prevents thousands in downtime losses.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'How Self-Service Kiosks Boosted Average QSR Basket Sizes by 22%',
    slug: 'self-service-kiosks-boost-qsr-basket-sizes',
    category: 'Hospitality Growth',
    date: 'Sep 12, 2026',
    readTime: '5 min read',
    excerpt: 'Case study analysis of 45 fast-casual locations deploying 21.5" touch kiosks with dynamic AI modifier upselling without adding front-of-house staff.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Breaking Free From Toast POS Hardware Lock-In: Migration Checklist',
    slug: 'toast-pos-hardware-lock-in-migration-checklist',
    category: 'Operator Playbooks',
    date: 'Aug 29, 2026',
    readTime: '7 min read',
    excerpt: 'A step-by-step checklist for migrating from Toast or Clover to an open hardware POS architecture without disrupting daily table turns or losing sales history.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=800&q=80',
  },
];

export const BlogPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Merchant Intelligence & Engineering</Badge>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
            Industry Insights & Playbooks
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Strategies for optimizing hospitality margins, eliminating merchant processing fees, and running bulletproof offline operations.
          </p>
        </div>

        {/* Featured Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/80 overflow-hidden backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 group flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="w-full h-56 overflow-hidden bg-slate-950 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="emerald">{post.category}</Badge>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <Link to="/book-demo" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold group-hover:text-emerald-300">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
