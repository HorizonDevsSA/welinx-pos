import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Building2, 
  ArrowRight, 
  ArrowLeft,
  X,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import confetti from 'canvas-confetti';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [vertical, setVertical] = useState<string>('restaurant');
  const [locations, setLocations] = useState<string>('1-2');
  const [currentPos, setCurrentPos] = useState<string>('Toast');
  const [painPoint, setPainPoint] = useState<string>('Processing Fees');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 2:00 PM EST');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/[0.1] shadow-2xl p-6 sm:p-8 my-8 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        {!isSubmitted && (
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step {step} of 4 • VIP Consultation</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Schedule Your 15-Minute Custom POS Walkthrough
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Personalized demo tailored to your exact menu structure, hardware setup, and processing savings.
            </p>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Industry Vertical */}
        {step === 1 && !isSubmitted && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-200">
              What type of business are you operating?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'restaurant', label: 'Full-Service Dining & Bar', desc: 'Table maps, course pacing, split checks', icon: Utensils },
                { id: 'qsr', label: 'Quick-Service (QSR) & Fast Casual', desc: '15-sec counter flow & self-order kiosks', icon: Zap },
                { id: 'retail', label: 'Retail, Boutique & Grocer', desc: '100k+ SKUs, matrix variations, barcodes', icon: ShoppingBag },
                { id: 'franchise', label: 'Multi-Location Franchise', desc: 'HQ menu control & consolidated reports', icon: Building2 },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = vertical === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVertical(item.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="font-bold text-sm">{item.label}</div>
                    </div>
                    <div className="text-xs text-slate-400 mt-2">{item.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="emeraldGlow" onClick={() => setStep(2)} className="gap-2">
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Locations & Registers */}
        {step === 2 && !isSubmitted && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                How many locations are you currently running or opening?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['1 Store', '2-4 Stores', '5-15 Stores', '16+ Stores'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setLocations(opt)}
                    className={`p-3.5 rounded-xl font-semibold text-sm border text-center transition-all ${
                      locations === opt
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button variant="emeraldGlow" onClick={() => setStep(3)} className="gap-2">
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Current POS & Pain Point */}
        {step === 3 && !isSubmitted && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                What POS system are you currently using?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Toast POS', 'Square', 'Clover', 'Lightspeed', 'Aloha / Micros', 'New Business'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPos(p)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      currentPos === p
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                What is your #1 biggest headache?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Internet Outages & Freezes', 'High Card Processing Fees', 'Slow Checkout & Queues', 'Poor 24/7 Support'].map((pain) => (
                  <button
                    key={pain}
                    type="button"
                    onClick={() => setPainPoint(pain)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                      painPoint === pain
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {pain}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button variant="emeraldGlow" onClick={() => setStep(4)} className="gap-2">
                <span>Pick Time & Details</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Time Slot & Contact Form */}
        {step === 4 && !isSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Preferred Walkthrough Time
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Today at 4:30 PM EST', 'Tomorrow at 11:00 AM EST', 'Tomorrow at 2:00 PM EST', 'Thursday at 1:00 PM EST', 'Friday at 3:00 PM EST'].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedDate(t)}
                    className={`p-2.5 rounded-xl text-xs font-mono font-semibold border text-center transition-all ${
                      selectedDate === t
                        ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Your Full Name *</label>
                <Input
                  required
                  placeholder="Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Business Name *</label>
                <Input
                  required
                  placeholder="Fuego Tacos & Bar"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Work Email *</label>
                <Input
                  required
                  type="email"
                  placeholder="elena@fuegotacos.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Mobile Phone (for SMS invite) *</label>
                <Input
                  required
                  type="tel"
                  placeholder="(512) 555-0199"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <Button type="button" variant="outline" onClick={() => setStep(3)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button type="submit" variant="emeraldGlow" className="gap-2 font-bold px-6">
                <Calendar className="w-4 h-4" />
                <span>Confirm Walkthrough</span>
              </Button>
            </div>
          </form>
        )}

        {/* Confirmation State */}
        {isSubmitted && (
          <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black font-display text-white">
              Walkthrough Confirmed, {formData.name}!
            </h3>

            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              We’ve reserved your session for <span className="text-emerald-400 font-bold">{selectedDate}</span>. A calendar invite and direct sandbox credentials have been sent to <span className="text-white font-mono">{formData.email}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left text-xs font-mono text-slate-400 space-y-1">
              <div>• Account Executive: Assigned (VIP Hospitality Specialist)</div>
              <div>• Business: {formData.businessName} ({locations})</div>
              <div>• Custom Topic: Dual-Pricing ROI & Offline SQLite Migration from {currentPos}</div>
            </div>

            <div className="pt-4">
              <Button variant="emeraldGlow" onClick={onClose} className="px-8">
                Done & Return to Site
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
