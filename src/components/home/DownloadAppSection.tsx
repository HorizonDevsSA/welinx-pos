import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Apple, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  ExternalLink,
  BellRing,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import confetti from 'canvas-confetti';

export const DownloadAppSection: React.FC = () => {
  const [detectedOS, setDetectedOS] = useState<'windows' | 'mac' | 'other'>('windows');
  const [emailWaitlist, setEmailWaitlist] = useState('');
  const [waitlistPlatform, setWaitlistPlatform] = useState('Android Mobile & Tablet');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [activeDownloadPlatform, setActiveDownloadPlatform] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) {
        setDetectedOS('mac');
      } else if (userAgent.includes('win')) {
        setDetectedOS('windows');
      } else {
        setDetectedOS('other');
      }
    }
  }, []);

  const handleDownloadClick = (platform: string, fileName: string) => {
    setActiveDownloadPlatform(platform);
    setDownloadModalOpen(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailWaitlist) {
      setWaitlistSubmitted(true);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {}
      setTimeout(() => {
        setWaitlistSubmitted(false);
        setEmailWaitlist('');
      }, 5000);
    }
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden border-t border-white/[0.06] bg-slate-950/80">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold mb-4">
            <Download className="w-4 h-4" />
            <span>Cross-Platform Native Apps • Version 2.4.0 (Latest)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Download Welinx POS for Desktop & Mobile.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Install native, offline-first register software on your existing PCs and Macs today. Android mobile, commercial tablet, and kiosk editions expanding soon.
          </p>
        </div>

        {/* Available Desktop Downloads Grid (Windows & Mac) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Windows Installer Card */}
          <div className={`rounded-3xl border p-8 flex flex-col justify-between backdrop-blur-2xl transition-all duration-300 shadow-2xl relative ${
            detectedOS === 'windows'
              ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500 shadow-emerald-500/10'
              : 'bg-slate-900/80 border-white/[0.08] hover:border-slate-700'
          }`}>
            {detectedOS === 'windows' && (
              <div className="absolute -top-3 right-6">
                <Badge variant="emerald" className="font-bold">Detected for your PC</Badge>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                  <Monitor className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
                    v2.4.0 Stable
                  </span>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">Windows 10 / 11 (64-bit)</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-display text-white">
                Welinx for Windows
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Native Electron & SQLite binary with full hardware driver acceleration for thermal receipt printers, cash drawers, and COM serial scales.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Integrated local SQLite 3.45 with WAL zero-latency writes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>OPOS, JPOS, and USB ESC/POS thermal printer spooler</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Supports dual customer-facing HDMI/USB displays</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="emeraldGlow"
                size="lg"
                onClick={() => handleDownloadClick('Windows 10/11 (x64)', 'Welinx-POS-Setup-2.4.0.exe')}
                className="w-full sm:w-auto justify-center gap-2 font-bold px-6"
              >
                <Download className="w-4 h-4" />
                <span>Download for Windows (.exe)</span>
              </Button>
              <span className="text-[11px] font-mono text-slate-400">
                Size: 112 MB • SHA256 Verified
              </span>
            </div>
          </div>

          {/* macOS Installer Card */}
          <div className={`rounded-3xl border p-8 flex flex-col justify-between backdrop-blur-2xl transition-all duration-300 shadow-2xl relative ${
            detectedOS === 'mac'
              ? 'bg-slate-900 border-cyan-500/60 ring-1 ring-cyan-500 shadow-cyan-500/10'
              : 'bg-slate-900/80 border-white/[0.08] hover:border-slate-700'
          }`}>
            {detectedOS === 'mac' && (
              <div className="absolute -top-3 right-6">
                <Badge variant="cyan" className="font-bold">Detected for your Mac</Badge>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                  <Apple className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/30">
                    v2.4.0 Universal
                  </span>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">macOS 12+ (Apple Silicon & Intel)</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-display text-white">
                Welinx for macOS
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Apple Notarized package optimized for MacBook, iMac, and Mac Mini POS countertop setups with smooth retina graphics and thermal LAN printing.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Native Apple Silicon (M1/M2/M3/M4) + Intel 64-bit support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Apple Notarized with Hardened Runtime security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Direct Ethernet LAN & Bluetooth receipt printer firing</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="cyanGlow"
                size="lg"
                onClick={() => handleDownloadClick('macOS (Universal DMG)', 'Welinx-POS-2.4.0.dmg')}
                className="w-full sm:w-auto justify-center gap-2 font-bold px-6"
              >
                <Download className="w-4 h-4" />
                <span>Download for macOS (.dmg)</span>
              </Button>
              <span className="text-[11px] font-mono text-slate-400">
                Size: 118 MB • Notarized
              </span>
            </div>
          </div>

        </div>

        {/* Coming Soon: Mobile & Tablet Expansion Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-purple-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Expansion Details (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>Next Expansion Phase (Q4 2026)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Expanding to Android Mobile, Tablets & Self-Service Kiosks
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                Take payments at the table with handheld tap-to-pay Android devices, manage store lines with 10" staff tablets, and turn standard Android displays into autonomous customer-ordering kiosks.
              </p>

              {/* Mobile Platforms Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-purple-500/20 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <span>Android Mobile</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Tap-to-Pay & Order-at-Table</div>
                  <Badge variant="purple" className="mt-2 text-[9px]">Beta Testing</Badge>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-purple-500/20 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Tablet className="w-4 h-4 text-purple-400" />
                    <span>Android Tablets</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Samsung Galaxy / Lenovo POS</div>
                  <Badge variant="purple" className="mt-2 text-[9px]">In Staging</Badge>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-purple-500/20 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Apple className="w-4 h-4 text-purple-400" />
                    <span>iPadOS</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">iPad Air & Pro Countertop</div>
                  <Badge variant="outline" className="mt-2 text-[9px]">Roadmap</Badge>
                </div>
              </div>
            </div>

            {/* Waitlist Box (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-purple-500/30 p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-white font-display font-bold text-base">
                  <BellRing className="w-4 h-4 text-purple-400" />
                  <span>Get Early Mobile Beta Access</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Be the first to receive pre-release APKs and test table ordering on your staff phones.
                </p>
              </div>

              {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <select
                    value={waitlistPlatform}
                    onChange={(e) => setWaitlistPlatform(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Android Mobile & Tablet">Android Mobile Handhelds & Tablets</option>
                    <option value="Commercial Android Kiosk Stand">Commercial Android Kiosk Stands</option>
                    <option value="iPadOS Tablet Fleet">Apple iPadOS Tablet Fleet</option>
                  </select>

                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="operator@restaurant.com"
                      value={emailWaitlist}
                      onChange={(e) => setEmailWaitlist(e.target.value)}
                      className="flex-1 h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <Button type="submit" variant="default" className="bg-purple-600 hover:bg-purple-500 text-white font-bold shrink-0 px-4 text-xs">
                      Join Beta
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs text-purple-200 space-y-1 animate-in fade-in">
                  <div className="font-bold flex items-center gap-1.5 text-purple-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Registered for {waitlistPlatform}!</span>
                  </div>
                  <div>We'll notify you as soon as the test APK builds go live.</div>
                </div>
              )}

              <div className="text-[10px] text-slate-500 font-mono text-center">
                Private TestFlight & Direct APK distribution via Welinx Cloud
              </div>
            </div>

          </div>
        </div>

        {/* Minimal System Specs Checklist */}
        <div className="mt-12 rounded-2xl bg-slate-900/60 border border-white/[0.06] p-6 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Recommended Minimum Specs: 4GB RAM, Intel Core i3 or Apple M1+, 2GB Free SSD Disk Space</span>
            </div>
            <Link to="/resources/docs-and-api" className="text-emerald-400 hover:underline flex items-center gap-1 shrink-0">
              <span>View Hardware Driver Guide</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Download Instructions Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 sm:p-8 space-y-4 animate-in fade-in zoom-in-95 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Download className="w-7 h-7 animate-bounce" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold font-display text-white">
                Preparing {activeDownloadPlatform} Installer
              </h3>
              <p className="text-xs text-slate-400">
                Your package download will begin momentarily. Follow the 3-step setup guide below.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-slate-300 font-mono">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">1</span>
                <span>Open downloaded package & run installer</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">2</span>
                <span>Launch Welinx POS & enter Tenant ID</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">3</span>
                <span>Registers initialize local SQLite offline database</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDownloadModalOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Link to="/demo" className="flex-1">
                <Button variant="emeraldGlow" className="w-full">
                  Open Web Sandbox
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
