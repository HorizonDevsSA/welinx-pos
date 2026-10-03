/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GitHub "owner/repo" whose Releases host the desktop installers. */
  readonly VITE_RELEASES_REPO?: string;
  /** Optional JSON manifest URL; takes priority over GitHub when set. */
  readonly VITE_RELEASE_MANIFEST_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
