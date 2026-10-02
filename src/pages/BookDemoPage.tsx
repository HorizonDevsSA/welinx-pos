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
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import confetti from 'canvas-confetti';

export const BookDemoPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [vertical, setVertical] = useState<string>('restaurant');
  const [locations, setLocations] = useState<string>('1-2');
  const [currentPos, setCurrentPos] = useState<string>('Toast');
  const [painPoint, setPainPoint] = useState<string>('Processing Fees');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow at 2:00 PM EST');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="emerald">Live 1-on-1 Consultation</Badge>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
            Schedule Your Custom POS Walkthrough
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Speak with an enterprise POS architect. We'll analyze your current processing statements, hardware setup, and show you exact savings.
          </p>
        </div>

        {/* Multi-Step Card */}
        <div className="rounded-3xl border border-white/[0.1] bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
          {!isSubmitted && (
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                <span>STAGE {step} OF 4</span>
                <span className="text-emerald-400 font-bold">15-MIN VIP SESSION</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
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

          {/* Step 1: Industry */}
          {step === 1 && !isSubmitted && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-display text-white">
                What type of business are you operating?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-base">{item.label}</div>
                      </div>
                      <div className="text-xs text-slate-400 mt-2">{item.desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="emeraldGlow" size="lg" onClick={() => setStep(2)} className="gap-2">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Store Count */}
          {step === 2 && !isSubmitted && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-display text-white">
                How many locations are in your fleet?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['1 Store', '2-4 Stores', '5-15 Stores', '16+ Stores'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setLocations(opt)}
                    className={`p-4 rounded-xl font-semibold text-sm border text-center transition-all ${
                      locations === opt
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
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

          {/* Step 3: Current POS */}
          {step === 3 && !isSubmitted && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white mb-3">
                  What POS are you replacing?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Toast POS', 'Square', 'Clover', 'Lightspeed', 'Aloha / Micros', 'Opening New Store'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setCurrentPos(p)}
                      className={`p-3 rounded-xl text-xs font-semibold border transition-all ${
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
                <h3 className="text-sm font-semibold text-slate-300 mb-2">
                  Primary Pain Point to Solve:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Internet Outages & Freezes', 'High Card Processing Fees', 'Slow Checkout Queues', 'Poor 24/7 Support'].map((pain) => (
                    <button
                      key={pain}
                      type="button"
                      onClick={() => setPainPoint(pain)}
                      className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all ${
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

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button variant="emeraldGlow" onClick={() => setStep(4)} className="gap-2">
                  <span>Select Time Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Time Slot & Contact */}
          {step === 4 && !isSubmitted && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-white mb-3">
                  Select Preferred Walkthrough Time
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Today at 4:30 PM EST', 'Tomorrow at 11:00 AM EST', 'Tomorrow at 2:00 PM EST', 'Thursday at 1:00 PM EST', 'Friday at 3:00 PM EST'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedDate(t)}
                      className={`p-3 rounded-xl text-xs font-mono font-semibold border text-center transition-all ${
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <Button type="button" variant="outline" onClick={() => setStep(3)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button type="submit" variant="emeraldGlow" size="lg" className="gap-2 font-bold px-8">
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Walkthrough</span>
                </Button>
              </div>
            </form>
          )}

          {/* Confirmation Screen */}
          {isSubmitted && (
            <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-3xl font-black font-display text-white">
                Walkthrough Confirmed, {formData.name}!
              </h2>

              <p className="text-slate-300 text-base max-w-lg mx-auto leading-relaxed">
                We’ve scheduled your personalized session for <span className="text-emerald-400 font-bold">{selectedDate}</span>. An invite and direct access credentials have been sent to <span className="text-white font-mono">{formData.email}</span>.
              </p>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 max-w-lg mx-auto text-left text-xs font-mono text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" /> Session Specifications:
                </div>
                <div>• Store Name: {formData.businessName} ({locations})</div>
                <div>• Architecture Topic: Offline SQLite & Fee Elimination vs {currentPos}</div>
                <div>• Priority SLA: Account Executive Assigned</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
