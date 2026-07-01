import { useTheme } from '@/lib/theme'
import type { FreedomVals, Layout, Route } from '@/lib/freedom'

const LAYOUTS: Array<{ key: Layout; label: string }> = [
  { key: 'mission', label: 'Mission Control' },
  { key: 'cinematic', label: 'Cinematic' },
  { key: 'editorial', label: 'Editorial' },
]

function LayoutSwitcher({
  layout, onSetLayout, full = false,
}: { layout: Layout; onSetLayout: (l: Layout) => void; full?: boolean }) {
  const t = useTheme()
  return (
    <div
      style={{
        display: full ? 'flex' : 'inline-flex', border: `1px solid ${t.C.hairline}`,
        borderRadius: t.motif.pillRadius, padding: 3, gap: 3, background: t.mut(0.03),
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
              fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase',
              padding: '7px 13px', border: 'none', borderRadius: Math.max(1, t.motif.pillRadius - 1), cursor: 'pointer',
              background: t.bgseg(active), color: t.seg(active),
            }}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}

function ModeToggle() {
  const t = useTheme()
  const dark = t.mode === 'dark'
  return (
    <button
      onClick={t.toggleMode}
      aria-label={dark ? 'Turn the lights on' : 'Lights out'}
      title={dark ? 'Lights on' : 'Lights out'}
      style={{
        flexShrink: 0, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: t.motif.pillRadius, cursor: 'pointer', background: t.mut(0.05),
        border: `1px solid ${t.C.hairline}`, color: t.C.on,
      }}
    >
      {dark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={t.C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill={t.C.gold} stroke="none">
          <path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z" />
        </svg>
      )}
    </button>
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
  const t = useTheme()
  return (
    <div
      style={{
        position: 'sticky', top: 0, zIndex: 30, display: 'flex', flexDirection: 'column', gap: 11,
        padding: isMobile ? '12px 15px' : '18px 32px',
        background: t.decor.topbarBg, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${t.C.hairline}`,
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
                justifyContent: 'center', borderRadius: t.motif.pillRadius, cursor: 'pointer',
                background: t.mut(0.06), border: `1px solid ${t.C.hairline}`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.C.on} strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.42), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {vals.routeSub}
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: isMobile ? 20 : 25, letterSpacing: '.01em', textTransform: 'uppercase', color: t.C.on, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {vals.routeTitle}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end', flexShrink: 0 }}>
          {!isMobile && route === 'dashboard' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.42) }}>
                Layout
              </span>
              <LayoutSwitcher layout={layout} onSetLayout={onSetLayout} />
            </div>
          )}

          <ModeToggle />

          <button
            onClick={onLog}
            aria-label="Log a payment"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: t.fontLabel, fontWeight: 600, fontSize: 12.5, letterSpacing: '.04em', textTransform: 'uppercase',
              padding: isMobile ? 0 : '11px 18px', width: isMobile ? 38 : undefined, height: isMobile ? 38 : undefined,
              border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.C.onAccent} strokeWidth="2.4" strokeLinecap="round">
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
