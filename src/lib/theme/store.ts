import { useSyncExternalStore } from 'react'
import type { Mode } from './tokens'
import { DEFAULT_MODE, DEFAULT_STYLE, STYLES } from './tokens'

/**
 * Module-level theme selection ({styleId, mode}) backed by localStorage.
 *
 * useSyncExternalStore (not setState-in-effect) keeps this lint-clean under
 * React 19 and hydration-safe: the server snapshot and the first client render
 * both use the defaults, then the client swaps in the persisted value after
 * hydration. Same-tab writes notify via the listener set; cross-tab writes come
 * through the 'storage' event.
 */

export interface ThemeSelection {
  styleId: string
  mode: Mode
}

const STYLE_KEY = 'dwmx_style'
const MODE_KEY = 'dwmx_mode'
const DEFAULT: ThemeSelection = { styleId: DEFAULT_STYLE, mode: DEFAULT_MODE }

let cached: ThemeSelection | null = null
const listeners = new Set<() => void>()

function readStorage(): ThemeSelection {
  try {
    const s = localStorage.getItem(STYLE_KEY)
    const m = localStorage.getItem(MODE_KEY)
    return {
      styleId: s && STYLES[s] ? s : DEFAULT.styleId,
      mode: m === 'light' || m === 'dark' ? m : DEFAULT.mode,
    }
  } catch {
    return DEFAULT
  }
}

function getSnapshot(): ThemeSelection {
  if (!cached) cached = readStorage()
  return cached
}

function getServerSnapshot(): ThemeSelection {
  return DEFAULT
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STYLE_KEY || e.key === MODE_KEY) {
      cached = readStorage()
      listeners.forEach((l) => l())
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}

function commit(next: ThemeSelection): void {
  cached = next
  try {
    localStorage.setItem(STYLE_KEY, next.styleId)
    localStorage.setItem(MODE_KEY, next.mode)
  } catch {
    /* storage unavailable — keep the in-memory value */
  }
  listeners.forEach((l) => l())
}

export function useThemeSelection(): ThemeSelection {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function setMode(mode: Mode): void {
  commit({ ...getSnapshot(), mode })
}

export function toggleMode(): void {
  const cur = getSnapshot()
  commit({ ...cur, mode: cur.mode === 'dark' ? 'light' : 'dark' })
}

export function setStyle(styleId: string): void {
  if (!STYLES[styleId]) return
  commit({ ...getSnapshot(), styleId })
}
