import type { ReactNode } from 'react'
import { useTheme } from '@/lib/theme'
import type { Route } from '@/lib/freedom'

function NavButton({
  label, active, onClick, children,
}: { label: string; active: boolean; onClick: () => void; children: ReactNode }) {
  const t = useTheme()
  const clr = t.navClr(active)
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative', display: 'flex', alignItems: 'center', gap: 12, width: '100%',
        padding: '11px 13px', border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer',
        background: t.navBg(active), textAlign: 'left',
      }}
    >
      <span
        style={{
          position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)',
          width: 3, height: 20, borderRadius: '0 2px 2px 0', background: t.navBar(active),
        }}
      />
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={clr} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
      <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 12, letterSpacing: '.04em', textTransform: 'uppercase', color: clr }}>
        {label}
      </span>
    </button>
  )
}

export function Sidebar({
  route, onNavigate, onGoPro,
}: { route: Route; onNavigate: (r: Route) => void; onGoPro: () => void }) {
  const t = useTheme()
  return (
    <aside
      style={{
        width: 248, flexShrink: 0, background: t.C.sidebar, borderRight: `1px solid ${t.C.hairline}`,
        display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'relative',
      }}
    >
      {t.motif.hazardRail && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: t.decor.hazardTape }} />
      )}

      {/* wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '0 6px', marginBottom: 30 }}>
        <img
          src="/assets/crow-cut.png"
          alt="DoneWithMyEx crow"
          style={{ width: 34, height: 34, objectFit: 'contain', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,.4))' }}
        />
        <div style={{ lineHeight: 0.94 }}>
          <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 16, letterSpacing: '.04em', textTransform: 'uppercase', ...t.goldText }}>DONE</div>
          <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 10, letterSpacing: '.13em', textTransform: 'uppercase', color: t.C.on }}>WITH MY EX</div>
        </div>
      </div>

      {/* nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <NavButton label="Dashboard" active={route === 'dashboard'} onClick={() => onNavigate('dashboard')}>
          <path d="M3 10.5L12 3l9 7.5M5 9.5V20h14V9.5" />
        </NavButton>
        <NavButton label="Countdown" active={route === 'countdown'} onClick={() => onNavigate('countdown')}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 1.6M12 5V2.5M9.5 2.5h5" />
        </NavButton>
        <NavButton label="Logger" active={route === 'logger'} onClick={() => onNavigate('logger')}>
          <path d="M7 4h10v16H7zM10 9h4M10 13h4" />
        </NavButton>
        <NavButton label="Vault" active={route === 'vault'} onClick={() => onNavigate('vault')}>
          <path d="M5 4h14v16H5zM12 9v6" />
          <circle cx="12" cy="8.5" r="1" />
        </NavButton>
      </div>

      <div style={{ flex: 1 }} />

      {/* Pro upsell */}
      <div
        style={{
          borderRadius: t.motif.panelRadius, padding: 15, background: t.decor.proGrad,
          border: `1px solid ${t.decor.accentSoftBorder}`, marginBottom: 14,
        }}
      >
        <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: t.C.gold, marginBottom: 6 }}>
          Commissary
        </div>
        <div style={{ fontFamily: t.fontBody, fontSize: 11.5, lineHeight: 1.4, color: t.mut(0.7), marginBottom: 11 }}>
          Unlock exports &amp; receipt storage. Do your time with paperwork.
        </div>
        <button
          onClick={onGoPro}
          style={{
            width: '100%', fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase',
            padding: 9, border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton,
          }}
        >
          Go Pro
        </button>
      </div>

      {/* user chip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 6 }}>
        <div
          style={{
            width: 32, height: 32, borderRadius: '50%', background: t.decor.avatarGrad,
            border: `1px solid ${t.C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 13, color: t.C.teal,
          }}
        >
          A
        </div>
        <div style={{ lineHeight: 1.15, minWidth: 0 }}>
          <div style={{ fontFamily: t.fontBody, fontWeight: 600, fontSize: 12, color: t.C.on }}>Alex M.</div>
          <div style={{ fontFamily: t.fontLabel, fontSize: 10, letterSpacing: '.04em', color: t.mut(0.45) }}>Inmate #DWX-0417</div>
        </div>
      </div>
    </aside>
  )
}
