import { useSyncExternalStore } from 'react'

/**
 * Returns false during SSR and the first (hydration) client render, then true.
 *
 * Uses useSyncExternalStore rather than a setState-in-effect so it stays
 * lint-clean under React 19's rules and matches the pattern in useBreakpoint.
 * Gate anything time- or storage-dependent on this to keep hydration clean.
 */
const noop = (): (() => void) => () => {}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}
