import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Check, 
  Sparkles, 
  ExternalLink,
  BellRing,
  CheckCircle2,
  HardDrive,
  Cpu,
  Layers,
  ArrowRight
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
  RELEASES_PAGE_URL 
} from '@/lib/releases';
import { WindowsIcon, AppleIcon, AndroidIcon } from '@/components/brand/PlatformIcons';
import { Reveal, Stagger, StaggerItem, SectionHeader } from '@/components/motion/Motion';
import confetti from 'canvas-confetti';

export const DownloadAppSection: React.FC = () => {
  const { release, loading } = useLatestRelease();
  const [detectedOS] = useState(() => detectOS());
  const [emailWaitlist, setEmailWaitlist] = useState('');
  const [waitlistPlatform, setWaitlistPlatform] = useState('Android Mobile & Tablet');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const winAsset = primaryAsset(release, 'windows');
  const macAsset = primaryAsset(release, 'mac');
  const macIntel = macIntelAsset(release);
  const version = release?.version ? formatVersion(release.version) : 'Latest';
  const releaseDate = formatReleaseDate(release?.publishedAt ?? null);

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

  const fireConfetti = () => {
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    } catch {}
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden border-t border-white/[0.06] bg-[#07090E]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <SectionHeader
          eyebrow="Cross-Platform Native Client"
          title="Download Welinx POS for Windows & Mac."
          description="Sub-millisecond SQLite local engine with automated cloud background syncing. Zero cloud lag, 100% offline resilience."
        />

        {/* Live version & date bar */}
        <Reveal delay={0.1} className="mt-8 flex items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Production Build {version}</span>
          </span>
          {releaseDate && <span className="text-zinc-500 hidden sm:inline">• Released {releaseDate}</span>}
        </Reveal>

        {/* Available Desktop Downloads Grid (Windows & Mac) */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 mb-12">
          
          {/* Windows Card */}
          <StaggerItem className="h-full">
            <div className={`h-full rounded-2xl border p-7 sm:p-8 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 relative ${
              detectedOS === 'windows'
                ? 'bg-zinc-900/90 border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-2xl shadow-emerald-950/20'
                : 'bg-zinc-900/50 border-white/[0.07] hover:border-zinc-700'
            }`}>
              {detectedOS === 'windows' && (
                <div className="absolute -top-3 right-6">
                  <Badge variant="emerald" className="font-mono text-[10px] tracking-wide uppercase">
                    Detected for this device
                  </Badge>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/[0.08] text-white flex items-center justify-center">
                    <WindowsIcon className="w-6 h-6 text-zinc-200" />
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      {version} x64
                    </span>
                    <div className="text-[11px] font-mono text-zinc-500 mt-1">Windows 10 / 11</div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-white">
                  Welinx POS for Windows
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Native binary with low-level ESC/POS thermal printer spooling, COM serial checkout scale drivers, and local SQLite 3.45 WAL engine.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Native USB, Serial, and Network thermal receipt spooler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Dual customer-facing display mirror via HDMI/USB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Background delta updates with zero downtime</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={winAsset?.url ?? RELEASES_PAGE_URL}
                  download={winAsset ? winAsset.name : undefined}
                  target={winAsset ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={fireConfetti}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="emeraldGlow"
                    size="lg"
                    disabled={loading}
                    className="w-full sm:w-auto justify-center gap-2 font-medium px-6 text-xs h-11"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download for Windows (.exe)</span>
                  </Button>
                </a>
                <span className="text-[11px] font-mono text-zinc-500">
                  {winAsset?.size ? formatBytes(winAsset.size) : '112 MB'} • Verified SHA-256
                </span>
              </div>
            </div>
          </StaggerItem>

          {/* macOS Card */}
          <StaggerItem className="h-full">
            <div className={`h-full rounded-2xl border p-7 sm:p-8 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 relative ${
              detectedOS === 'mac'
                ? 'bg-zinc-900/90 border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-2xl shadow-emerald-950/20'
                : 'bg-zinc-900/50 border-white/[0.07] hover:border-zinc-700'
            }`}>
              {detectedOS === 'mac' && (
                <div className="absolute -top-3 right-6">
                  <Badge variant="emerald" className="font-mono text-[10px] tracking-wide uppercase">
                    Detected for your Mac
                  </Badge>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/[0.08] text-white flex items-center justify-center">
                    <AppleIcon className="w-6 h-6 text-zinc-200" />
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      {version} Universal
                    </span>
                    <div className="text-[11px] font-mono text-zinc-500 mt-1">macOS 12+ (Apple Silicon & Intel)</div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-white">
                  Welinx POS for macOS
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Apple Notarized package optimized for MacBook, iMac, and Mac Mini POS registers with retina UI fidelity and AirPrint/LAN thermal printing.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Native Apple Silicon (M1/M2/M3/M4) + Intel 64-bit architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Hardened Runtime security & Apple Notarized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct Ethernet LAN & Bluetooth kitchen order firing</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={macAsset?.url ?? RELEASES_PAGE_URL}
                  download={macAsset ? macAsset.name : undefined}
                  target={macAsset ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={fireConfetti}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="emeraldGlow"
                    size="lg"
                    disabled={loading}
                    className="w-full sm:w-auto justify-center gap-2 font-medium px-6 text-xs h-11"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download for macOS (.dmg)</span>
                  </Button>
                </a>
                <span className="text-[11px] font-mono text-zinc-500">
                  {macAsset?.size ? formatBytes(macAsset.size) : '118 MB'} • Apple Notarized
                  {macIntel && (
                    <a href={macIntel.url} className="ml-2 text-zinc-400 hover:text-white underline">
                      Intel dmg
                    </a>
                  )}
                </span>
              </div>
            </div>
          </StaggerItem>

        </Stagger>

        {/* Mobile & Tablet Expansion Section */}
        <Reveal delay={0.2} className="rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-7 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Expansion Details (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                <AndroidIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mobile & Kiosks • Q4 2026</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Expanding to Android Handhelds, Tablets & Kiosks
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Take payments at the table with handheld tap-to-pay Android devices, manage dining floors with 10" staff tablets, and turn commercial screens into self-ordering stations.
              </p>

              {/* Mobile Platforms Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <AndroidIcon className="w-4 h-4 text-emerald-400" />
                    <span>Android Handhelds</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">Sunmi, Pax & Clover mPOS</div>
                  <Badge variant="outline" className="mt-2 text-[9px] border-emerald-500/30 text-emerald-400">Beta Testing</Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <AndroidIcon className="w-4 h-4 text-emerald-400" />
                    <span>Android Tablets</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">Samsung Galaxy / Lenovo POS</div>
                  <Badge variant="outline" className="mt-2 text-[9px] border-zinc-700 text-zinc-400">In Staging</Badge>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <AppleIcon className="w-4 h-4 text-zinc-300" />
                    <span>iPadOS Fleet</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">iPad Air & Pro Countertop</div>
                  <Badge variant="outline" className="mt-2 text-[9px] border-zinc-700 text-zinc-400">Roadmap</Badge>
                </div>
              </div>
            </div>

            {/* Waitlist Box (5 cols) */}
            <div className="lg:col-span-5 rounded-xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <BellRing className="w-4 h-4 text-emerald-400" />
                  <span>Early Mobile Beta Access</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Get pre-release APK builds and test handheld ordering with your floor staff.
                </p>
              </div>

              {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <select
                    value={waitlistPlatform}
                    onChange={(e) => setWaitlistPlatform(e.target.value)}
                    className="w-full h-9 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Android Mobile & Tablet">Android Handhelds & Tablets</option>
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
                      className="flex-1 h-9 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
                    />
                    <Button type="submit" variant="default" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shrink-0 px-4 text-xs h-9">
                      Join Beta
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Enrolled for {waitlistPlatform}!</span>
                  </div>
                  <div>We'll notify you as soon as test builds are available.</div>
                </div>
              )}

              <div className="text-[10px] text-zinc-500 font-mono text-center">
                Private direct distribution via Welinx Cloud portal
              </div>
            </div>

          </div>
        </Reveal>

        {/* Minimal System Specs Checklist */}
        <Reveal delay={0.3} className="mt-8 rounded-xl bg-zinc-900/30 border border-white/[0.06] p-5 text-xs text-zinc-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-2 text-zinc-300">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Recommended Specs: 4GB+ RAM, Intel i3 or Apple M1+, 2GB Free SSD Storage</span>
            </div>
            <Link to="/resources/docs-and-api" className="text-emerald-400 hover:underline flex items-center gap-1 shrink-0">
              <span>View Hardware Driver Docs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

