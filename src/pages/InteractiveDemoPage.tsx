import React, { useState } from 'react';
import { Play, Sparkles, ShieldCheck, Zap, ArrowRight, Laptop, HelpCircle } from 'lucide-react';
import { InteractivePosSandbox } from '@/components/demo/InteractivePosSandbox';
import { BookDemoModal } from '@/components/demo/BookDemoModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const InteractiveDemoPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <Badge variant="emerald">Instant Browser Sandbox</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
            Test Drive Welinx POS in Your Browser
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Experience sub-millisecond local SQLite ringing, modifiers, bill splitting, and simulated WAN cutoffs without downloading anything.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Zap className="w-3.5 h-3.5" /> 100% Client-Side Interactive
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" /> No Account Required
            </span>
          </div>
        </div>

        {/* Live POS Sandbox Simulator */}
        <InteractivePosSandbox />

        {/* Post-Demo Callout */}
        <div className="rounded-3xl bg-slate-900 border border-white/[0.08] p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl font-bold font-display text-white">
            Want to see Welinx loaded with your real store menu?
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Book a 15-minute 1-on-1 walkthrough and our team will pre-load your categories, prices, and floorplan before the call.
          </p>
          <Button
            variant="emeraldGlow"
            size="lg"
            onClick={() => setModalOpen(true)}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Custom 1-on-1 Walkthrough</span>
          </Button>
        </div>

      </div>

      <BookDemoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
