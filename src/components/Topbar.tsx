import { C, goldButton, fontDisplay, fontLabel, mut, seg, bgseg } from '@/lib/tokens'
import type { FreedomVals, Layout, Route } from '@/lib/freedom'

const LAYOUTS: Array<{ key: Layout; label: string }> = [
  { key: 'mission', label: 'Mission Control' },
  { key: 'cinematic', label: 'Cinematic' },
  { key: 'editorial', label: 'Editorial' },
]

export function Topbar({
  vals, route, layout, onSetLayout, onLog,
}: {
  vals: FreedomVals
  route: Route
  layout: Layout
  onSetLayout: (l: Layout) => void
  onLog: () => void
}) {
  return (
    <div
      style={{
        position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 16, padding: '18px 32px',
        background: 'rgba(7,10,20,.82)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(221,225,255,.06)',
      }}
    >
      <div>
        <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.4) }}>
          {vals.routeSub}
        </div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 23, color: C.on, marginTop: 3 }}>
          {vals.routeTitle}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {route === 'dashboard' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.42) }}>
              Layout
            </span>
            <div style={{ display: 'inline-flex', border: '1px solid rgba(221,225,255,.12)', borderRadius: 10, padding: 3, gap: 3, background: 'rgba(221,225,255,.03)' }}>
              {LAYOUTS.map((l) => {
                const active = layout === l.key
                return (
                  <button
                    key={l.key}
                    onClick={() => onSetLayout(l.key)}
                    style={{
                      fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.05em',
                      padding: '7px 13px', border: 'none', borderRadius: 8, cursor: 'pointer',
                      background: bgseg(active), color: seg(active),
                    }}
                  >
                    {l.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <button
          onClick={onLog}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, fontFamily: fontLabel, fontWeight: 700,
            fontSize: 12.5, letterSpacing: '.03em', padding: '11px 18px', border: 'none', borderRadius: 11,
            cursor: 'pointer', ...goldButton, boxShadow: '0 8px 20px rgba(255,193,7,.18)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#051036" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Log a payment
        </button>
      </div>
    </div>
  )
}
