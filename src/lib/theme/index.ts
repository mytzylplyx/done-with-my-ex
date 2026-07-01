import type { Decor, Helpers, Mode, Motif, Palette } from './tokens'
import { makeHelpers, STYLE_LIST, STYLES } from './tokens'
import { setMode, setStyle, toggleMode, useThemeSelection } from './store'

export type { Mode } from './tokens'

export interface Theme extends Helpers {
  styleId: string
  styleName: string
  mode: Mode
  C: Palette
  decor: Decor
  motif: Motif
  fontDisplay: string
  fontBody: string
  fontLabel: string
  // controls
  setMode: (m: Mode) => void
  toggleMode: () => void
  setStyle: (id: string) => void
  styles: Array<{ id: string; name: string }>
}

interface ResolvedBase {
  styleId: string
  styleName: string
  mode: Mode
  C: Palette
  decor: Decor
  motif: Motif
  fontDisplay: string
  fontBody: string
  fontLabel: string
  helpers: Helpers
}

// Resolving is pure; cache by "style:mode" so `t` stays referentially stable.
const cache = new Map<string, ResolvedBase>()

function resolve(styleId: string, mode: Mode): ResolvedBase {
  const key = `${styleId}:${mode}`
  const hit = cache.get(key)
  if (hit) return hit
  const style = STYLES[styleId] ?? STYLES.yard
  const data = mode === 'light' ? style.light : style.dark
  const base: ResolvedBase = {
    styleId: style.id,
    styleName: style.name,
    mode,
    C: data.palette,
    decor: data.decor,
    motif: style.motif,
    fontDisplay: style.fonts.display,
    fontBody: style.fonts.body,
    fontLabel: style.fonts.label,
    helpers: makeHelpers(data.palette),
  }
  cache.set(key, base)
  return base
}

const STYLE_META = STYLE_LIST.map((s) => ({ id: s.id, name: s.name }))

export function useTheme(): Theme {
  const { styleId, mode } = useThemeSelection()
  const base = resolve(styleId, mode)
  return {
    ...base.helpers,
    styleId: base.styleId,
    styleName: base.styleName,
    mode: base.mode,
    C: base.C,
    decor: base.decor,
    motif: base.motif,
    fontDisplay: base.fontDisplay,
    fontBody: base.fontBody,
    fontLabel: base.fontLabel,
    setMode,
    toggleMode,
    setStyle,
    styles: STYLE_META,
  }
}
