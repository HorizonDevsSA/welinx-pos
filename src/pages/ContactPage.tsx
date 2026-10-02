import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Headphones, 
  Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    inquiryType: 'sales',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald">24/7 Priority Support & Sales</Badge>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
            We’re Here to Help Your Store Thrive
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Speak directly with our engineering, hardware logistics, or merchant advisory team.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Columns (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-slate-900/80 border border-white/[0.08] p-8 space-y-6 backdrop-blur-xl">
              <h2 className="text-xl font-bold font-display text-white">
                Contact Information
              </h2>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Direct Sales & Support Line</div>
                    <div className="text-xs font-mono text-emerald-400 mt-0.5">1-800-555-WELINX (935-469)</div>
                    <div className="text-[11px] text-slate-400">Available 24/7/365 for emergency store cutovers</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Inquiries</div>
                    <div className="text-xs font-mono text-cyan-300 mt-0.5">hello@welinx.io • support@welinx.io</div>
                    <div className="text-[11px] text-slate-400">Average reply time &lt; 15 minutes</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Headquarters & Hardware Fulfillment</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      300 Congress Ave, Suite 1400<br />
                      Austin, TX 78701
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Guaranteed 15-minute response SLA</span>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-900/80 border border-white/[0.08] p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Your Name *</label>
                      <Input
                        required
                        placeholder="Elena Rostova"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                      <Input
                        required
                        type="email"
                        placeholder="elena@restaurant.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Business / Store Name *</label>
                      <Input
                        required
                        placeholder="Fuego Tacos & Bar"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Mobile Phone *</label>
                      <Input
                        required
                        type="tel"
                        placeholder="(512) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Inquiry Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'sales', label: 'Sales & Pricing' },
                        { id: 'hardware', label: 'Hardware Bundle' },
                        { id: 'support', label: 'Support & Tech' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: t.id })}
                          className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            formData.inquiryType === t.id
                              ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">How can we help? *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your locations, current POS, or specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80 focus-visible:border-emerald-500 transition-all resize-none"
                    />
                  </div>

                  <Button type="submit" variant="emeraldGlow" size="lg" className="w-full justify-center gap-2 font-bold py-4">
                    <Send className="w-4 h-4" />
                    <span>Send Message to Team</span>
                  </Button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-white">
                    Message Dispatched Successfully!
                  </h2>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Thank you, {formData.name}. A dedicated Welinx specialist will reach out to you at {formData.email} within 15 minutes.
                  </p>
                  <div className="pt-4">
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send Another Inquiry
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
