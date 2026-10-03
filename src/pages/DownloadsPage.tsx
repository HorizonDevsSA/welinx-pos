import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Monitor, 
  Apple, 
  Smartphone, 
  Tablet, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Printer, 
  Wifi, 
  FileText, 
  ArrowRight,
  HelpCircle,
  BellRing,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import confetti from 'canvas-confetti';

export const DownloadsPage: React.FC = () => {
  const [detectedOS, setDetectedOS] = useState<'windows' | 'mac' | 'other'>('windows');
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile' | 'drivers'>('desktop');
  const [downloadModal, setDownloadModal] = useState<string | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.includes('mac')) setDetectedOS('mac');
      else if (ua.includes('win')) setDetectedOS('windows');
      else setDetectedOS('other');
    }
  }, []);

  const handleDownload = (platform: string) => {
    setDownloadModal(platform);
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    } catch {}
  };

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      setWaitlistSuccess(true);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {}
      setTimeout(() => {
        setWaitlistSuccess(false);
        setWaitlistEmail('');
      }, 5000);
    }
  };

  return (
    <div className="py-12 sm:py-20 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
            <Download className="w-4 h-4" />
            <span>Native Client Hub • Release v2.4.0 Production</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Download Welinx POS for Your Hardware.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Run local-first SQLite POS registers with zero lag. Windows and macOS installers are production-ready, with Android mobile and tablet editions expanding soon.
          </p>

          {/* Quick Platform Switcher Tabs */}
          <div className="pt-2 flex items-center justify-center gap-2">
            {[
              { id: 'desktop', label: '🖥️ Desktop Registers (Win & Mac)' },
              { id: 'mobile', label: '📱 Mobile & Tablet Expansion' },
              { id: 'drivers', label: '🖨️ Peripheral & ESC/POS Drivers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Desktop Installers */}
        {activeTab === 'desktop' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Windows Card */}
              <div className="rounded-3xl border border-white/[0.08] bg-slate-900/90 p-8 flex flex-col justify-between backdrop-blur-2xl shadow-2xl space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                      <Monitor className="w-7 h-7" />
                    </div>
                    <Badge variant="emerald">v2.4.0 (x64 Installer)</Badge>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-white">
                    Windows 10 / Windows 11
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    Designed for commercial touch registers, countertop all-in-one terminals, and Windows back-office workstations.
                  </p>

                  <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Direct ESC/POS serial, network & USB thermal printer support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Automatic background software updater</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Full SQLite database encryption & offline queue</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 space-y-3">
                  <Button
                    variant="emeraldGlow"
                    size="lg"
                    onClick={() => handleDownload('Windows 64-bit (.exe)')}
                    className="w-full justify-center gap-2 font-bold py-4"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Windows Installer (.exe)</span>
                  </Button>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>File size: 112 MB</span>
                    <span>MD5 / SHA-256 Verified</span>
                  </div>
                </div>
              </div>

              {/* macOS Card */}
              <div className="rounded-3xl border border-white/[0.08] bg-slate-900/90 p-8 flex flex-col justify-between backdrop-blur-2xl shadow-2xl space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                      <Apple className="w-7 h-7" />
                    </div>
                    <Badge variant="cyan">v2.4.0 (Universal DMG)</Badge>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-white">
                    macOS 12+ (Apple Silicon & Intel)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    Apple Notarized package tuned for MacBook, iMac, and Mac Mini POS registers with retina UI fidelity.
                  </p>

                  <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Optimized for M1, M2, M3, M4 Apple Silicon architectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Supports AirPrint and local Ethernet thermal kitchen printers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Dark mode UI designed for low-glare bar & restaurant lighting</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 space-y-3">
                  <Button
                    variant="cyanGlow"
                    size="lg"
                    onClick={() => handleDownload('macOS Universal (.dmg)')}
                    className="w-full justify-center gap-2 font-bold py-4"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download macOS Disk Image (.dmg)</span>
                  </Button>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>File size: 118 MB</span>
                    <span>Apple Notarized</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Minimum Hardware Requirements Table */}
            <div className="rounded-3xl bg-slate-900/60 border border-white/[0.08] p-8 space-y-6">
              <h3 className="text-xl font-bold font-display text-white">
                Hardware & System Requirements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 font-mono">PROCESSOR (CPU)</div>
                  <div className="text-sm font-bold text-white mt-1">Intel i3 / AMD Ryzen 3 / Apple M1+</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 font-mono">MEMORY (RAM)</div>
                  <div className="text-sm font-bold text-white mt-1">4 GB RAM (8 GB Recommended)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 font-mono">DISK SPACE</div>
                  <div className="text-sm font-bold text-white mt-1">2 GB Free SSD Storage (SQLite WAL)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 font-mono">DISPLAY RESOLUTION</div>
                  <div className="text-sm font-bold text-white mt-1">1280x800 Min (1080p Touch Recommended)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Mobile & Tablet Expansion */}
        {activeTab === 'mobile' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 p-8 sm:p-12 shadow-2xl">
              <div className="max-w-3xl space-y-6">
                <Badge variant="purple">Expanding to Mobile Handhelds & Tablets</Badge>
                <h2 className="text-3xl font-bold font-display text-white">
                  Android Mobile, Tablet POS & Kiosk Editions
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We are actively preparing native Android builds (APK and Google Play) for pay-at-table handhelds, floorplan server tablets, and 21.5" commercial Android touchscreen kiosks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/20">
                    <Smartphone className="w-6 h-6 text-purple-400 mb-2" />
                    <h3 className="font-bold text-white text-sm">Android Handheld mPOS</h3>
                    <p className="text-xs text-slate-400 mt-1">Built for 5.5" Sunmi, Pax & Clover-style tap devices.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/20">
                    <Tablet className="w-6 h-6 text-purple-400 mb-2" />
                    <h3 className="font-bold text-white text-sm">Android 10" Tablets</h3>
                    <p className="text-xs text-slate-400 mt-1">Turn consumer Samsung or Lenovo tablets into POS stations.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/20">
                    <Apple className="w-6 h-6 text-purple-400 mb-2" />
                    <h3 className="font-bold text-white text-sm">iPadOS Tablet Fleet</h3>
                    <p className="text-xs text-slate-400 mt-1">Native Swift-powered client coming to the App Store.</p>
                  </div>
                </div>

                {/* Waitlist Form */}
                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-white mb-2">
                    Request Early Access & Beta APKs
                  </h3>
                  {!waitlistSuccess ? (
                    <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md">
                      <input
                        type="email"
                        required
                        placeholder="operator@restaurant.com"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        className="flex-1 h-11 rounded-xl border border-slate-700 bg-slate-950 px-4 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                      />
                      <Button type="submit" variant="default" className="bg-purple-600 hover:bg-purple-500 text-white font-bold">
                        Join Waitlist
                      </Button>
                    </form>
                  ) : (
                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs text-purple-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>Thank you! You're enrolled in the mobile beta program.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Drivers & Peripherals */}
        {activeTab === 'drivers' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="rounded-3xl bg-slate-900 border border-white/[0.08] p-8 space-y-6">
              <h2 className="text-2xl font-bold font-display text-white">
                Certified Peripheral Drivers & Utilities
              </h2>
              <p className="text-slate-400 text-sm">
                Welinx connects natively to ESC/POS hardware, but you can download standalone test utilities and USB drivers here.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <Printer className="w-6 h-6 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Epson & Star ESC/POS Utility</h3>
                  <p className="text-xs text-slate-400">Windows thermal printer test tool for baud rate and auto-cutter testing.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Download Utility (.zip)
                  </Button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <HardDrive className="w-6 h-6 text-cyan-400" />
                  <h3 className="font-bold text-white text-base">USB Serial / COM Scale Driver</h3>
                  <p className="text-xs text-slate-400">Virtual COM port driver for Avery Berkel and Tor-Rey checkout scales.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Download Driver (.exe)
                  </Button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <FileText className="w-6 h-6 text-purple-400" />
                  <h3 className="font-bold text-white text-base">Hardware Setup & Pinout PDF</h3>
                  <p className="text-xs text-slate-400">Comprehensive wiring diagram for RJ12 cash drawers and pole displays.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Download Guide (.pdf)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Download Modal Trigger */}
      {downloadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 sm:p-8 space-y-4 animate-in fade-in zoom-in-95 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Download className="w-7 h-7 animate-bounce" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold font-display text-white">
                Downloading {downloadModal}
              </h3>
              <p className="text-xs text-slate-400">
                Your installer download has started. Once installed, log in with your tenant credentials.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300 font-mono">
              <div className="text-emerald-400 font-bold">Quick Start Instructions:</div>
              <div>1. Run the installer package on your register.</div>
              <div>2. Enter your Store / Tenant ID code.</div>
              <div>3. Local SQLite database initializes in 0.00s.</div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDownloadModal(null)}
                className="flex-1"
              >
                Done
              </Button>
              <Link to="/demo" className="flex-1">
                <Button variant="emeraldGlow" className="w-full">
                  Try Web Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
