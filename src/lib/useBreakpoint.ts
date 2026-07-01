import { useSyncExternalStore } from 'react'

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

/**
 * Reactive viewport breakpoint. The whole app styles via inline style objects
 * (not CSS classes), so responsiveness is JS-driven: components read this hook
 * and branch their layout. useSyncExternalStore keeps it lint-clean (no
 * set-state-in-effect) and returns a stable string, so a re-render only happens
 * when we actually cross a breakpoint.
 *
 *   mobile   ≤ 767px   phones — drawer nav, single-column
 *   tablet   ≤ 1023px  compact — sidebar stays, dense grids collapse
 *   desktop  ≥ 1024px  the original Claude Design layout
 */
function subscribe(callback: () => void): () => void {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

function getSnapshot(): Breakpoint {
  const w = window.innerWidth
  return w <= 767 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop'
}

function getServerSnapshot(): Breakpoint {
  return 'desktop'
}

export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
