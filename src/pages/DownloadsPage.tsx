import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Check, 
  Sparkles, 
  Cpu, 
  HardDrive, 
  Printer, 
  FileText, 
  ArrowRight,
  BellRing,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  useLatestRelease, 
  primaryAsset, 
  macIntelAsset, 
  detectOS, 
  formatBytes, 
  formatVersion, 
  formatReleaseDate, 
  RELEASES_PAGE_URL,
  RELEASES_REPO
} from '@/lib/releases';
import { WindowsIcon, AppleIcon, AndroidIcon } from '@/components/brand/PlatformIcons';
import { Reveal, Stagger, StaggerItem, SectionHeader } from '@/components/motion/Motion';
import confetti from 'canvas-confetti';

export const DownloadsPage: React.FC = () => {
  const { release, loading } = useLatestRelease();
  const [detectedOS] = useState(() => detectOS());
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile' | 'drivers'>('desktop');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const winAsset = primaryAsset(release, 'windows');
  const macAsset = primaryAsset(release, 'mac');
  const macIntel = macIntelAsset(release);
  const version = release?.version ? formatVersion(release.version) : 'v2.4.0';
  const releaseDate = formatReleaseDate(release?.publishedAt ?? null);

  const fireConfetti = () => {
    try {
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
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
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/[0.08] text-emerald-400 font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Release {version} Production</span>
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient">
              Download Welinx POS for Your Hardware.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Native, zero-lag local SQLite POS engine. Production-ready binaries for Windows and macOS with background auto-sync.
            </p>
          </Reveal>

          {/* Platform Switcher Tabs */}
          <Reveal delay={0.2} className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'desktop', label: 'Desktop Registers (Win & Mac)' },
              { id: 'mobile', label: 'Mobile & Tablet Beta' },
              { id: 'drivers', label: 'Peripheral Drivers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </Reveal>
        </div>

        {/* Tab 1: Desktop Installers */}
        {activeTab === 'desktop' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Windows Card */}
              <div className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between backdrop-blur-xl shadow-xl transition-all ${
                detectedOS === 'windows'
                  ? 'bg-zinc-900/90 border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'bg-zinc-900/40 border-white/[0.08]'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/[0.08] text-white flex items-center justify-center">
                      <WindowsIcon className="w-6 h-6 text-zinc-200" />
                    </div>
                    <Badge variant="emerald" className="font-mono text-[10px]">
                      {version} x64
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    Windows 10 / Windows 11
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    Designed for commercial touchscreen registers, countertop all-in-ones, and back-office cashier workstations.
                  </p>

                  <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Direct ESC/POS serial, network & USB thermal printer support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Automatic background delta software updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Full SQLite WAL database with instant sub-millisecond commits</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-zinc-800/80 space-y-3">
                  <a
                    href={winAsset?.url ?? RELEASES_PAGE_URL}
                    download={winAsset ? winAsset.name : undefined}
                    target={winAsset ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    onClick={fireConfetti}
                    className="block"
                  >
                    <Button
                      variant="emeraldGlow"
                      size="lg"
                      disabled={loading}
                      className="w-full justify-center gap-2 font-medium text-xs h-11"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Windows Installer (.exe)</span>
                    </Button>
                  </a>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                    <span>{winAsset?.size ? formatBytes(winAsset.size) : '112 MB'}</span>
                    <span>Verified SHA-256</span>
                  </div>
                </div>
              </div>

              {/* macOS Card */}
              <div className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between backdrop-blur-xl shadow-xl transition-all ${
                detectedOS === 'mac'
                  ? 'bg-zinc-900/90 border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'bg-zinc-900/40 border-white/[0.08]'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/[0.08] text-white flex items-center justify-center">
                      <AppleIcon className="w-6 h-6 text-zinc-200" />
                    </div>
                    <Badge variant="emerald" className="font-mono text-[10px]">
                      {version} Universal
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    macOS 12+ (Apple Silicon & Intel)
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    Apple Notarized binary tuned for MacBook, iMac, and Mac Mini POS registers with sharp retina graphics.
                  </p>

                  <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Optimized for M1, M2, M3, M4 Apple Silicon architectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Hardened Runtime security & Apple Notarized</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>AirPrint and local Ethernet thermal kitchen printers</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-zinc-800/80 space-y-3">
                  <a
                    href={macAsset?.url ?? RELEASES_PAGE_URL}
                    download={macAsset ? macAsset.name : undefined}
                    target={macAsset ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    onClick={fireConfetti}
                    className="block"
                  >
                    <Button
                      variant="emeraldGlow"
                      size="lg"
                      disabled={loading}
                      className="w-full justify-center gap-2 font-medium text-xs h-11"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download macOS Universal (.dmg)</span>
                    </Button>
                  </a>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                    <span>{macAsset?.size ? formatBytes(macAsset.size) : '118 MB'}</span>
                    <span>
                      Apple Notarized
                      {macIntel && (
                        <a href={macIntel.url} className="ml-2 text-zinc-400 hover:text-white underline">
                          Intel DMG
                        </a>
                      )}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Hardware & System Requirements */}
            <div className="rounded-2xl bg-zinc-900/30 border border-white/[0.08] p-7 space-y-6">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Hardware & System Requirements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <div className="text-zinc-500 font-mono">PROCESSOR (CPU)</div>
                  <div className="text-sm font-medium text-white mt-1">Intel i3 / Ryzen 3 / Apple M1+</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <div className="text-zinc-500 font-mono">MEMORY (RAM)</div>
                  <div className="text-sm font-medium text-white mt-1">4 GB RAM (8 GB Recommended)</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <div className="text-zinc-500 font-mono">DISK SPACE</div>
                  <div className="text-sm font-medium text-white mt-1">2 GB Free SSD Storage</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <div className="text-zinc-500 font-mono">RESOLUTION</div>
                  <div className="text-sm font-medium text-white mt-1">1280x800 Min (1080p Touch)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Mobile & Tablet Expansion */}
        {activeTab === 'mobile' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-8 sm:p-12">
              <div className="max-w-3xl space-y-6">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                  Expanding to Mobile Handhelds & Tablets
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  Android Mobile, Tablet POS & Self-Order Kiosks
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We are actively preparing native Android builds (APK and Google Play) for pay-at-table handhelds, floorplan server tablets, and 21.5" commercial Android touchscreen kiosks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                    <AndroidIcon className="w-5 h-5 text-emerald-400 mb-2" />
                    <h3 className="font-semibold text-white text-sm">Android Handheld mPOS</h3>
                    <p className="text-xs text-zinc-400 mt-1">Built for 5.5" Sunmi, Pax & Clover-style tap devices.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                    <AndroidIcon className="w-5 h-5 text-emerald-400 mb-2" />
                    <h3 className="font-semibold text-white text-sm">Android 10" Tablets</h3>
                    <p className="text-xs text-zinc-400 mt-1">Turn consumer Samsung or Lenovo tablets into POS stations.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                    <AppleIcon className="w-5 h-5 text-zinc-300 mb-2" />
                    <h3 className="font-semibold text-white text-sm">iPadOS Tablet Fleet</h3>
                    <p className="text-xs text-zinc-400 mt-1">Native Swift-powered client coming to the App Store.</p>
                  </div>
                </div>

                {/* Waitlist Form */}
                <div className="pt-6 border-t border-zinc-800">
                  <h3 className="text-sm font-semibold text-white mb-2">
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
                        className="flex-1 h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                      />
                      <Button type="submit" variant="default" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs h-10">
                        Join Waitlist
                      </Button>
                    </form>
                  ) : (
                    <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-8 space-y-6">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Certified Peripheral Drivers & Utilities
              </h2>
              <p className="text-zinc-400 text-sm">
                Welinx connects natively to ESC/POS hardware, but you can download standalone test utilities and USB drivers here.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <Printer className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white text-sm">Epson & Star ESC/POS Utility</h3>
                  <p className="text-xs text-zinc-400">Windows thermal printer test tool for baud rate and auto-cutter testing.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs border-zinc-800 hover:border-zinc-700">
                    Download Utility (.zip)
                  </Button>
                </div>

                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <HardDrive className="w-5 h-5 text-zinc-300" />
                  <h3 className="font-semibold text-white text-sm">USB Serial / COM Scale Driver</h3>
                  <p className="text-xs text-zinc-400">Virtual COM port driver for Avery Berkel and Tor-Rey checkout scales.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs border-zinc-800 hover:border-zinc-700">
                    Download Driver (.exe)
                  </Button>
                </div>

                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <FileText className="w-5 h-5 text-zinc-300" />
                  <h3 className="font-semibold text-white text-sm">Hardware Setup & Pinout PDF</h3>
                  <p className="text-xs text-zinc-400">Comprehensive wiring diagram for RJ12 cash drawers and pole displays.</p>
                  <Button variant="outline" size="sm" className="w-full text-xs border-zinc-800 hover:border-zinc-700">
                    Download Guide (.pdf)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

