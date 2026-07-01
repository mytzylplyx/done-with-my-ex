'use client'

import { useEffect } from 'react'
import { useTheme } from '@/lib/theme'

/**
 * Keeps the document background + color-scheme in sync with the active theme
 * after the initial (inline-script) paint. Renders nothing; the effect only
 * mutates the DOM, so it stays clear of the set-state-in-effect rule.
 */
export function ThemeSync(): null {
  const { C, mode, styleId } = useTheme()
  useEffect(() => {
    const d = document.documentElement
    d.style.background = C.page
    d.style.colorScheme = mode
    d.dataset.dwmxStyle = styleId
    d.dataset.dwmxMode = mode
  }, [C.page, mode, styleId])
  return null
}
