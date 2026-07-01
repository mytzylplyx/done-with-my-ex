import type { CSSProperties } from 'react'
import { useTheme } from '@/lib/theme'
import type { FreedomVals } from '@/lib/freedom'

type Size = 'lg' | 'md'

const SIZES: Record<Size, { w: string; h: string; font: string; gap: number; persp: number }> = {
  lg: { w: 'clamp(62px,6vw,88px)', h: 'clamp(80px,7.6vw,112px)', font: 'clamp(40px,4vw,58px)', gap: 9, persp: 320 },
  md: { w: 'clamp(58px,5.4vw,80px)', h: 'clamp(74px,7vw,104px)', font: 'clamp(36px,3.6vw,52px)', gap: 8, persp: 300 },
}

export function FlipTile({
  value, label, size = 'md', animated = false,
}: { value: string; label: string; size?: Size; animated?: boolean }) {
  const t = useTheme()
  const s = SIZES[size]
  const seam = t.mode === 'dark' ? 'rgba(0,0,0,.5)' : 'rgba(58,53,45,.22)'
  const shadow = t.mode === 'dark' ? '0 10px 22px rgba(0,0,0,.45)' : '0 8px 18px rgba(58,53,45,.14)'
  const tile: CSSProperties = {
    position: 'relative', width: s.w, height: s.h, borderRadius: t.motif.chipRadius,
    background: t.decor.flipFace, border: `1px solid ${t.C.hairline}`,
    boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', ...(animated ? { perspective: `${s.persp}px` } : {}),
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s.gap }}>
      <div style={tile}>
        <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: s.font, lineHeight: 1, color: t.C.gold }}>
          {value}
        </span>
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: '50%', height: 2, marginTop: -1,
            background: seam, ...(animated ? { zIndex: 3 } : {}),
          }}
        />
        {animated && (
          <div
            style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: '50%', transformOrigin: 'bottom center',
              background: t.decor.flipFaceTop, borderRadius: `${t.motif.chipRadius}px ${t.motif.chipRadius}px 0 0`,
              backfaceVisibility: 'hidden', animation: 'dwmxFlip 1s infinite linear',
              borderBottom: `1px solid ${seam}`, zIndex: 2,
            }}
          />
        )}
      </div>
      <span
        style={{
          fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9, letterSpacing: '.16em',
          textTransform: 'uppercase', color: t.mut(0.5),
        }}
      >
        {label}
      </span>
    </div>
  )
}

/** Years · Months · Days │ Hours · Mins · Secs — only the seconds tile animates. */
export function FlipClock({ vals, size }: { vals: FreedomVals; size: Size }) {
  const t = useTheme()
  const dividerH = size === 'lg' ? 'clamp(80px,7.6vw,112px)' : 'clamp(74px,7vw,104px)'
  return (
    <>
      <FlipTile value={vals.yy} label="Years" size={size} />
      <FlipTile value={vals.mm} label="Months" size={size} />
      <FlipTile value={vals.dd} label="Days" size={size} />
      <div style={{ width: 1, height: dividerH, background: t.C.hairline }} />
      <FlipTile value={vals.hh} label="Hours" size={size} />
      <FlipTile value={vals.mi} label="Mins" size={size} />
      <FlipTile value={vals.ss} label="Secs" size={size} animated />
    </>
  )
}
