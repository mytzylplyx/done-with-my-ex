import type { CSSProperties } from 'react'

/**
 * Theme engine data. A "style" (e.g. The Yard) is one identity with a light and
 * a dark mode. Adding a future style (After Hours, etc.) = one more entry in
 * STYLES. Components never hardcode colors; they read the resolved tokens from
 * useTheme(). The token KEYS mirror the original tokens.ts so the rewire stayed
 * mechanical: `gold` = the primary accent (hazard orange in The Yard), `teal` =
 * the secondary accent (stamp-blue / acid green).
 */

export type Mode = 'light' | 'dark'

export interface Palette {
  page: string
  sidebar: string
  surface: string
  containerLow: string
  container: string
  on: string
  onRgb: string // "r, g, b" channels of `on`, for muted alphas
  gold: string // primary accent
  goldLight: string // primary accent, lighter
  accentRgb: string // "r, g, b" channels of `gold`
  onAccent: string // text/icon on top of the accent
  teal: string // secondary accent
  statement: string // "printed document" surface (Proof Vault)
  ink: string // text on `statement`
  hairline: string // default border color
}

export interface Decor {
  topbarBg: string
  mainGrad: string
  cardGrad: string
  proGrad: string
  heroGrad: string
  accentSoftBg: string
  accentSoftBorder: string
  avatarGrad: string
  flipFace: string
  flipFaceTop: string
  receiptPattern: string
  scrim: string
  hazardTape: string
}

export interface Motif {
  cardRadius: number
  panelRadius: number
  chipRadius: number
  pillRadius: number
  ledgerMono: boolean // ledger uses monospace / case-file styling
  hazardRail: boolean // render the hazard-tape rail at the top of surfaces
}

export interface Fonts {
  display: string
  body: string
  label: string
}

export interface ThemeModeData {
  palette: Palette
  decor: Decor
}

export interface StyleDef {
  id: string
  name: string
  fonts: Fonts
  motif: Motif
  defaultMode: Mode
  light: ThemeModeData
  dark: ThemeModeData
}

/* ---------- helpers derived from a palette (mirror the old tokens.ts) ---------- */

export interface Helpers {
  GOLD: string
  goldText: CSSProperties
  goldButton: CSSProperties
  mut: (a: number) => string
  seg: (active: boolean) => string
  bgseg: (active: boolean) => string
  navBg: (active: boolean) => string
  navClr: (active: boolean) => string
  navBar: (active: boolean) => string
}

export function makeHelpers(p: Palette): Helpers {
  const mut = (a: number): string => `rgba(${p.onRgb}, ${a})`
  return {
    mut,
    GOLD: `linear-gradient(135deg, ${p.goldLight}, ${p.gold})`,
    goldText: { color: p.gold },
    goldButton: { background: p.gold, color: p.onAccent },
    seg: (active) => (active ? p.gold : mut(0.58)),
    bgseg: (active) => (active ? `rgba(${p.accentRgb}, 0.14)` : 'transparent'),
    navBg: (active) => (active ? `rgba(${p.accentRgb}, 0.1)` : 'transparent'),
    navClr: (active) => (active ? p.gold : mut(0.62)),
    navBar: (active) => (active ? p.gold : 'transparent'),
  }
}

/* ---------- The Yard ---------- */

const yardDark: ThemeModeData = {
  palette: {
    page: '#141210',
    sidebar: '#100e0b',
    surface: '#1b1813',
    containerLow: '#201d16',
    container: '#232019',
    on: '#e8e4d8',
    onRgb: '232, 228, 216',
    gold: '#f26a1b',
    goldLight: '#e0912f',
    accentRgb: '242, 106, 27',
    onAccent: '#141210',
    teal: '#8fbf3f',
    statement: '#ece6d8',
    ink: '#2a251c',
    hairline: 'rgba(232, 228, 216, 0.12)',
  },
  decor: {
    topbarBg: 'rgba(20, 18, 16, 0.86)',
    mainGrad: 'radial-gradient(150% 80% at 82% -12%, #201d16 0%, #141210 62%)',
    cardGrad: '#232019',
    proGrad: '#232019',
    heroGrad: 'radial-gradient(130% 120% at 50% -25%, #201d16 0%, #141210 70%)',
    accentSoftBg: 'rgba(242, 106, 27, 0.08)',
    accentSoftBorder: 'rgba(242, 106, 27, 0.28)',
    avatarGrad: 'linear-gradient(135deg, #2a2620, #201d16)',
    flipFace: '#232019',
    flipFaceTop: '#2a2620',
    receiptPattern: 'repeating-linear-gradient(-45deg, #201d16, #201d16 8px, #232019 8px, #232019 16px)',
    scrim: 'rgba(10, 9, 7, 0.66)',
    hazardTape: 'repeating-linear-gradient(-45deg, #f26a1b 0 16px, #100e0b 16px 32px)',
  },
}

const yardLight: ThemeModeData = {
  palette: {
    page: '#f2eee4',
    sidebar: '#ebe6d9',
    surface: '#f7f3ea',
    containerLow: '#ebe6d9',
    container: '#e6e0d2',
    on: '#3a352d',
    onRgb: '58, 53, 45',
    gold: '#cf551d',
    goldLight: '#e2662a',
    accentRgb: '207, 85, 29',
    onAccent: '#f6f1e6',
    teal: '#3f5c93',
    statement: '#f8f4ec',
    ink: '#3a352d',
    hairline: 'rgba(58, 53, 45, 0.18)',
  },
  decor: {
    topbarBg: 'rgba(242, 238, 228, 0.86)',
    mainGrad: 'radial-gradient(150% 80% at 82% -12%, #efe9dc 0%, #f2eee4 62%)',
    cardGrad: '#ebe6d9',
    proGrad: '#ebe6d9',
    heroGrad: 'radial-gradient(130% 120% at 50% -25%, #efe9dc 0%, #f2eee4 70%)',
    accentSoftBg: 'rgba(226, 102, 42, 0.1)',
    accentSoftBorder: 'rgba(226, 102, 42, 0.3)',
    avatarGrad: 'linear-gradient(135deg, #e6e0d2, #dcd5c4)',
    flipFace: '#ebe6d9',
    flipFaceTop: '#e0d9c8',
    receiptPattern: 'repeating-linear-gradient(-45deg, #ebe6d9, #ebe6d9 8px, #e4dece 8px, #e4dece 16px)',
    scrim: 'rgba(58, 53, 45, 0.35)',
    hazardTape: 'repeating-linear-gradient(-45deg, #e2662a 0 16px, #3a352d 16px 32px)',
  },
}

const yard: StyleDef = {
  id: 'yard',
  name: 'The Yard',
  fonts: {
    display: "var(--font-oswald), 'Oswald', sans-serif",
    body: "var(--font-inter), 'Inter', sans-serif",
    label: "var(--font-plex-mono), 'IBM Plex Mono', monospace",
  },
  motif: { cardRadius: 4, panelRadius: 3, chipRadius: 3, pillRadius: 2, ledgerMono: true, hazardRail: true },
  defaultMode: 'dark',
  light: yardLight,
  dark: yardDark,
}

/* ---------- Financial Insurgent (the original navy look, kept as a style) ---------- */

const insurgentDark: ThemeModeData = {
  palette: {
    page: '#07080d',
    sidebar: '#070f24',
    surface: '#051036',
    containerLow: '#0e193e',
    container: '#131d43',
    on: '#dde1ff',
    onRgb: '221, 225, 255',
    gold: '#ffc107',
    goldLight: '#ffe4af',
    accentRgb: '255, 193, 7',
    onAccent: '#051036',
    teal: '#97f7f6',
    statement: '#fbf7ee',
    ink: '#1a2240',
    hairline: 'rgba(221, 225, 255, 0.1)',
  },
  decor: {
    topbarBg: 'rgba(7, 10, 20, 0.82)',
    mainGrad: 'radial-gradient(120% 70% at 80% -10%, #0c1430 0%, #080a14 60%)',
    cardGrad: 'linear-gradient(160deg, #0f1d49, #0a1638)',
    proGrad: 'linear-gradient(160deg, #13224f, #0a1638)',
    heroGrad: 'radial-gradient(120% 130% at 50% -25%, #16234f 0%, #0a1330 55%, #070d22 100%)',
    accentSoftBg: 'linear-gradient(135deg, rgba(255, 193, 7, 0.11), rgba(255, 193, 7, 0.03))',
    accentSoftBorder: 'rgba(255, 193, 7, 0.16)',
    avatarGrad: 'linear-gradient(135deg, #13224f, #293359)',
    flipFace: 'linear-gradient(180deg, #1f2f63, #16244f 49%, #0e1942 51%, #0b1539)',
    flipFaceTop: 'linear-gradient(180deg, #22336b, #16244f)',
    receiptPattern: 'repeating-linear-gradient(135deg, #0e193e, #0e193e 7px, #101b42 7px, #101b42 14px)',
    scrim: 'rgba(3, 6, 16, 0.62)',
    hazardTape: 'linear-gradient(90deg, #ffe4af, #ffc107)',
  },
}

const insurgent: StyleDef = {
  id: 'insurgent',
  name: 'Financial Insurgent',
  fonts: {
    // 'insurgent' is a hidden legacy style with no style-picker UI yet, so its
    // display/label webfonts are not loaded; system fallbacks are fine here.
    display: "'Space Grotesk', system-ui, sans-serif",
    body: "var(--font-inter), 'Inter', sans-serif",
    label: "'Work Sans', system-ui, sans-serif",
  },
  motif: { cardRadius: 22, panelRadius: 16, chipRadius: 14, pillRadius: 11, ledgerMono: false, hazardRail: false },
  defaultMode: 'dark',
  light: insurgentDark,
  dark: insurgentDark,
}

export const STYLES: Record<string, StyleDef> = { yard, insurgent }
export const STYLE_LIST: StyleDef[] = [yard, insurgent]

export const DEFAULT_STYLE = 'yard'
export const DEFAULT_MODE: Mode = 'dark'

/** Page background per style+mode — used by the inline anti-flash script. */
export const PAGE_BG: Record<string, string> = {
  'yard:dark': yardDark.palette.page,
  'yard:light': yardLight.palette.page,
  'insurgent:dark': insurgentDark.palette.page,
  'insurgent:light': insurgentDark.palette.page,
}

/**
 * Inline script for the document <head>: paints the correct page background and
 * color-scheme before hydration so there's no theme flash on refresh. Kept in
 * this server-safe module (no hooks) so the root layout can import it.
 */
export const THEME_INIT_SCRIPT = `(function(){try{
var s=localStorage.getItem('dwmx_style')||'${DEFAULT_STYLE}';
var m=localStorage.getItem('dwmx_mode')||'${DEFAULT_MODE}';
var bg=(${JSON.stringify(PAGE_BG)})[s+':'+m]||'${PAGE_BG[`${DEFAULT_STYLE}:${DEFAULT_MODE}`]}';
var d=document.documentElement;
d.style.background=bg;d.style.colorScheme=(m==='light'?'light':'dark');
d.dataset.dwmxStyle=s;d.dataset.dwmxMode=m;
}catch(e){}})();`
