import type { CSSProperties } from 'react'

/**
 * "Financial Insurgent" tokens — the exact values used by the Claude Design
 * canvas (DoneWithMyEx Desktop.dc.html), centralized so the screens stay
 * pixel-faithful without scattering magic hex codes.
 */
export const C = {
  page: '#07080d',
  sidebar: '#070f24',
  surface: '#051036',
  containerLow: '#0E193E',
  container: '#131D43',
  on: '#DDE1FF',
  gold: '#FFC107',
  goldLight: '#FFE4AF',
  teal: '#97F7F6',
  statement: '#fbf7ee',
  ink: '#1a2240',
} as const

export const GOLD = 'linear-gradient(135deg,#FFE4AF,#FFC107)'

export const fontDisplay = "'Space Grotesk',sans-serif"
export const fontBody = "'Inter',sans-serif"
export const fontLabel = "'Work Sans',sans-serif"

/** Gold gradient clipped to text (countdown numerals, wordmark "DONE", accents). */
export const goldText: CSSProperties = {
  background: GOLD,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
}

/** Primary gold button face. */
export const goldButton: CSSProperties = {
  background: GOLD,
  color: '#051036',
}

/** muted on-surface text at a given alpha (matches rgba(221,225,255,a) in the canvas). */
export const mut = (a: number): string => `rgba(221,225,255,${a})`

/* Segmented-control state helpers (mirror seg/bgseg in the canvas logic). */
export const seg = (active: boolean): string => (active ? C.gold : mut(0.58))
export const bgseg = (active: boolean): string => (active ? 'rgba(255,193,7,.14)' : 'transparent')

/* Sidebar nav state helpers (mirror nb/nc/nbar in the canvas logic). */
export const navBg = (active: boolean): string => (active ? 'rgba(255,193,7,.1)' : 'transparent')
export const navClr = (active: boolean): string => (active ? C.gold : mut(0.62))
export const navBar = (active: boolean): string => (active ? C.gold : 'transparent')
