import { useEffect, useState } from 'react';

/**
 * Runtime release resolution — download links update the moment a new
 * desktop build is published, with no marketing-site redeploy.
 *
 * Resolution order:
 *  1. VITE_RELEASE_MANIFEST_URL (JSON you control, e.g. on R2/S3/your API)
 *  2. GitHub Releases API for VITE_RELEASES_REPO (where electron-builder publishes)
 *  3. Fallback: link to the GitHub "latest release" page
 */

export type DesktopOS = 'windows' | 'mac';
export type AssetOS = 'windows' | 'mac' | 'linux' | 'android';
export type AssetKind = 'installer' | 'portable' | 'dmg' | 'zip' | 'appimage' | 'deb' | 'apk';
export type AssetArch = 'x64' | 'arm64' | 'universal';

export interface ReleaseAsset {
  name: string;
  url: string;
  size: number;
  os: AssetOS;
  kind: AssetKind;
  arch: AssetArch;
}

export interface ReleaseInfo {
  version: string;
  publishedAt: string | null;
  notesUrl: string;
  assets: ReleaseAsset[];
  source: 'manifest' | 'github' | 'fallback';
}

export const RELEASES_REPO = import.meta.env.VITE_RELEASES_REPO || 'HorizonDevsSA/multitenant-pos';
export const RELEASE_MANIFEST_URL = import.meta.env.VITE_RELEASE_MANIFEST_URL || '';
export const RELEASES_PAGE_URL = `https://github.com/${RELEASES_REPO}/releases/latest`;

const CACHE_KEY = 'welinx:latest-release:v1';
const CACHE_TTL_MS = 10 * 60 * 1000;

const FALLBACK: ReleaseInfo = {
  version: '',
  publishedAt: null,
  notesUrl: RELEASES_PAGE_URL,
  assets: [],
  source: 'fallback',
};

function archFrom(name: string): AssetArch {
  if (/(arm64|aarch64)/.test(name)) return 'arm64';
  if (/universal/.test(name)) return 'universal';
  // electron-builder omits the arch suffix for x64 builds
  return 'x64';
}

export function classifyAsset(name: string, url: string, size = 0): ReleaseAsset | null {
  const n = name.toLowerCase();
  if (n.endsWith('.blockmap') || n.endsWith('.yml') || n.endsWith('.yaml')) return null;

  let os: AssetOS;
  let kind: AssetKind;
  if (n.endsWith('.exe')) {
    os = 'windows';
    kind = n.includes('portable') ? 'portable' : 'installer';
  } else if (n.endsWith('.msi')) {
    os = 'windows';
    kind = 'installer';
  } else if (n.endsWith('.dmg')) {
    os = 'mac';
    kind = 'dmg';
  } else if (n.endsWith('.zip') && /(mac|darwin)/.test(n)) {
    os = 'mac';
    kind = 'zip';
  } else if (n.endsWith('.appimage')) {
    os = 'linux';
    kind = 'appimage';
  } else if (n.endsWith('.deb')) {
    os = 'linux';
    kind = 'deb';
  } else if (n.endsWith('.apk')) {
    os = 'android';
    kind = 'apk';
  } else {
    return null;
  }
  return { name, url, size, os, kind, arch: archFrom(n) };
}

interface ManifestAsset {
  name?: string;
  url: string;
  size?: number;
  os?: AssetOS;
  kind?: AssetKind;
  arch?: AssetArch;
}

async function fromManifest(url: string): Promise<ReleaseInfo> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Release manifest responded ${res.status}`);
  const data = (await res.json()) as {
    version?: string;
    publishedAt?: string;
    notesUrl?: string;
    assets?: ManifestAsset[];
  };

  const assets = (data.assets ?? [])
    .map((a): ReleaseAsset | null => {
      const name = a.name ?? decodeURIComponent(a.url.split('/').pop() ?? '');
      const guessed = classifyAsset(name, a.url, a.size ?? 0);
      if (a.os && a.kind) {
        return { name, url: a.url, size: a.size ?? 0, os: a.os, kind: a.kind, arch: a.arch ?? guessed?.arch ?? 'x64' };
      }
      return guessed;
    })
    .filter((a): a is ReleaseAsset => a !== null);

  return {
    version: data.version ?? '',
    publishedAt: data.publishedAt ?? null,
    notesUrl: data.notesUrl ?? RELEASES_PAGE_URL,
    assets,
    source: 'manifest',
  };
}

async function fromGitHub(repo: string): Promise<ReleaseInfo> {
  const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub releases responded ${res.status}`);
  const data = (await res.json()) as {
    tag_name: string;
    published_at: string | null;
    html_url: string;
    assets: { name: string; browser_download_url: string; size: number }[];
  };

  return {
    version: data.tag_name,
    publishedAt: data.published_at,
    notesUrl: data.html_url,
    assets: data.assets
      .map((a) => classifyAsset(a.name, a.browser_download_url, a.size))
      .filter((a): a is ReleaseAsset => a !== null),
    source: 'github',
  };
}

function readCache(): ReleaseInfo | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, release } = JSON.parse(raw) as { at: number; release: ReleaseInfo };
    return Date.now() - at < CACHE_TTL_MS ? release : null;
  } catch {
    return null;
  }
}

function writeCache(release: ReleaseInfo) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), release }));
  } catch {
    /* storage unavailable — ignore */
  }
}

let inflight: Promise<ReleaseInfo> | null = null;

export function getLatestRelease(): Promise<ReleaseInfo> {
  if (inflight) return inflight;
  const cached = readCache();
  if (cached) return (inflight = Promise.resolve(cached));

  inflight = (RELEASE_MANIFEST_URL ? fromManifest(RELEASE_MANIFEST_URL) : fromGitHub(RELEASES_REPO))
    .then((release) => {
      writeCache(release);
      return release;
    })
    .catch((err) => {
      console.warn('[releases] falling back to releases page:', err);
      inflight = null;
      return FALLBACK;
    });
  return inflight;
}

export function useLatestRelease() {
  const [state, setState] = useState<{ release: ReleaseInfo | null; loading: boolean }>(() => {
    const cached = readCache();
    return { release: cached, loading: !cached };
  });

  useEffect(() => {
    let alive = true;
    getLatestRelease().then((release) => {
      if (alive) setState({ release, loading: false });
    });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

/* ---------- helpers ---------- */

export function primaryAsset(release: ReleaseInfo | null, os: DesktopOS): ReleaseAsset | null {
  if (!release) return null;
  const list = release.assets.filter((a) => a.os === os);
  if (os === 'windows') {
    return list.find((a) => a.kind === 'installer') ?? list.find((a) => a.kind === 'portable') ?? null;
  }
  const dmgs = list.filter((a) => a.kind === 'dmg');
  return dmgs.find((a) => a.arch === 'universal') ?? dmgs.find((a) => a.arch === 'arm64') ?? dmgs[0] ?? null;
}

/** Secondary Intel DMG, only when the primary mac build is Apple-silicon-only. */
export function macIntelAsset(release: ReleaseInfo | null): ReleaseAsset | null {
  const primary = primaryAsset(release, 'mac');
  if (!release || !primary || primary.arch !== 'arm64') return null;
  return release.assets.find((a) => a.os === 'mac' && a.kind === 'dmg' && a.arch === 'x64') ?? null;
}

export type ClientOS = 'mac' | 'windows' | 'android' | 'ios' | 'linux' | 'other';

export function detectOS(): ClientOS {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/mac/.test(ua)) return 'mac';
  if (/win/.test(ua)) return 'windows';
  if (/linux/.test(ua)) return 'linux';
  return 'other';
}

export function formatBytes(bytes: number): string {
  if (!bytes) return '';
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(0)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

export function formatVersion(v: string): string {
  if (!v) return '';
  return v.startsWith('v') ? v : `v${v}`;
}

export function formatReleaseDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export const KIND_LABEL: Record<AssetKind, string> = {
  installer: 'Installer',
  portable: 'Portable',
  dmg: 'Disk image',
  zip: 'Zip archive',
  appimage: 'AppImage',
  deb: 'Debian package',
  apk: 'APK',
};
