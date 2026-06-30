import type { CSSProperties } from 'react'
import { goldText, fontDisplay, fontLabel, mut } from '@/lib/tokens'
import type { FreedomVals } from '@/lib/freedom'

type Size = 'lg' | 'md'

const SIZES: Record<Size, { w: string; h: string; r: number; font: string; gap: number; persp: number; shadow: string }> = {
  lg: {
    w: 'clamp(62px,6vw,88px)', h: 'clamp(80px,7.6vw,112px)', r: 13, font: 'clamp(40px,4vw,58px)',
    gap: 9, persp: 320, shadow: 'inset 0 1px 0 rgba(255,255,255,.07),0 12px 26px rgba(0,0,0,.5)',
  },
  md: {
    w: 'clamp(58px,5.4vw,80px)', h: 'clamp(74px,7vw,104px)', r: 12, font: 'clamp(36px,3.6vw,52px)',
    gap: 8, persp: 300, shadow: 'inset 0 1px 0 rgba(255,255,255,.07),0 10px 22px rgba(0,0,0,.5)',
  },
}

export function FlipTile({
  value, label, size = 'md', animated = false,
}: { value: string; label: string; size?: Size; animated?: boolean }) {
  const s = SIZES[size]
  const tile: CSSProperties = {
    position: 'relative', width: s.w, height: s.h, borderRadius: s.r,
    background: 'linear-gradient(180deg,#1f2f63,#16244f 49%,#0e1942 51%,#0b1539)',
    boxShadow: s.shadow, display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', ...(animated ? { perspective: `${s.persp}px` } : {}),
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s.gap }}>
      <div style={tile}>
        <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: s.font, lineHeight: 1, ...goldText }}>
          {value}
        </span>
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: '50%', height: 2, marginTop: -1,
            background: 'rgba(0,0,0,.5)', ...(animated ? { zIndex: 3 } : {}),
          }}
        />
        {animated && (
          <div
            style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: '50%', transformOrigin: 'bottom center',
              background: 'linear-gradient(180deg,#22336b,#16244f)', borderRadius: `${s.r}px ${s.r}px 0 0`,
              backfaceVisibility: 'hidden', animation: 'dwmxFlip 1s infinite linear',
              borderBottom: '1px solid rgba(0,0,0,.45)', zIndex: 2,
            }}
          />
        )}
      </div>
      <span
        style={{
          fontFamily: fontLabel, fontWeight: 700, fontSize: 9, letterSpacing: '.14em',
          textTransform: 'uppercase', color: mut(0.45),
        }}
      >
        {label}
      </span>
    </div>
  )
}

/** Years · Months · Days │ Hours · Mins · Secs — only the seconds tile animates. */
export function FlipClock({ vals, size }: { vals: FreedomVals; size: Size }) {
  const dividerH = size === 'lg' ? 'clamp(80px,7.6vw,112px)' : 'clamp(74px,7vw,104px)'
  return (
    <>
      <FlipTile value={vals.yy} label="Years" size={size} />
      <FlipTile value={vals.mm} label="Months" size={size} />
      <FlipTile value={vals.dd} label="Days" size={size} />
      <div style={{ width: 1, height: dividerH, background: mut(0.12) }} />
      <FlipTile value={vals.hh} label="Hours" size={size} />
      <FlipTile value={vals.mi} label="Mins" size={size} />
      <FlipTile value={vals.ss} label="Secs" size={size} animated />
    </>
  )
}
