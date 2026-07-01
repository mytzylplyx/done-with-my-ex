import { C, goldButton, fontDisplay, fontLabel, mut, seg, bgseg } from '@/lib/tokens'
import type { FreedomVals, Layout, Route } from '@/lib/freedom'

const LAYOUTS: Array<{ key: Layout; label: string }> = [
  { key: 'mission', label: 'Mission Control' },
  { key: 'cinematic', label: 'Cinematic' },
  { key: 'editorial', label: 'Editorial' },
]

function LayoutSwitcher({
  layout, onSetLayout, full = false,
}: { layout: Layout; onSetLayout: (l: Layout) => void; full?: boolean }) {
  return (
    <div
      style={{
        display: full ? 'flex' : 'inline-flex', border: '1px solid rgba(221,225,255,.12)',
        borderRadius: 10, padding: 3, gap: 3, background: 'rgba(221,225,255,.03)',
      }}
    >
      {LAYOUTS.map((l) => {
        const active = layout === l.key
        return (
          <button
            key={l.key}
            onClick={() => onSetLayout(l.key)}
            style={{
              flex: full ? 1 : undefined, whiteSpace: 'nowrap',
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
  )
}

export function Topbar({
  vals, route, layout, onSetLayout, onLog, isMobile = false, onMenu,
}: {
  vals: FreedomVals
  route: Route
  layout: Layout
  onSetLayout: (l: Layout) => void
  onLog: () => void
  isMobile?: boolean
  onMenu?: () => void
}) {
  return (
    <div
      style={{
        position: 'sticky', top: 0, zIndex: 30, display: 'flex', flexDirection: 'column', gap: 11,
        padding: isMobile ? '12px 15px' : '18px 32px',
        background: 'rgba(7,10,20,.82)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(221,225,255,.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          {isMobile && (
            <button
              onClick={onMenu}
              aria-label="Open menu"
              style={{
                flexShrink: 0, width: 38, height: 38, display: 'flex', alignItems: 'center',
                justifyContent: 'center', borderRadius: 10, cursor: 'pointer',
                background: 'rgba(221,225,255,.06)', border: '1px solid rgba(221,225,255,.1)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.on} strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.4), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {vals.routeSub}
            </div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: isMobile ? 18 : 23, color: C.on, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {vals.routeTitle}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-end', flexShrink: 0 }}>
          {!isMobile && route === 'dashboard' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.42) }}>
                Layout
              </span>
              <LayoutSwitcher layout={layout} onSetLayout={onSetLayout} />
            </div>
          )}

          <button
            onClick={onLog}
            aria-label="Log a payment"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: fontLabel, fontWeight: 700, fontSize: 12.5, letterSpacing: '.03em',
              padding: isMobile ? 0 : '11px 18px', width: isMobile ? 38 : undefined, height: isMobile ? 38 : undefined,
              border: 'none', borderRadius: isMobile ? 10 : 11, cursor: 'pointer', ...goldButton,
              boxShadow: '0 8px 20px rgba(255,193,7,.18)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#051036" strokeWidth="2.4" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {!isMobile && 'Log a payment'}
          </button>
        </div>
      </div>

      {/* Mobile: the layout switcher gets its own full-width row on the dashboard. */}
      {isMobile && route === 'dashboard' && (
        <div style={{ overflowX: 'auto', margin: '0 -2px', padding: '0 2px' }}>
          <LayoutSwitcher layout={layout} onSetLayout={onSetLayout} full />
        </div>
      )}
    </div>
  )
}
