import type { ReactNode } from 'react'
import { C, goldText, goldButton, fontDisplay, fontBody, fontLabel, mut, navBg, navClr, navBar } from '@/lib/tokens'
import type { Route } from '@/lib/freedom'

function NavButton({
  label, active, onClick, children,
}: { label: string; active: boolean; onClick: () => void; children: ReactNode }) {
  const clr = navClr(active)
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative', display: 'flex', alignItems: 'center', gap: 12, width: '100%',
        padding: '11px 13px', border: 'none', borderRadius: 11, cursor: 'pointer',
        background: navBg(active), textAlign: 'left',
      }}
    >
      <span
        style={{
          position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)',
          width: 3, height: 20, borderRadius: '0 3px 3px 0', background: navBar(active),
        }}
      />
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={clr} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
      <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 12, letterSpacing: '.03em', color: clr }}>
        {label}
      </span>
    </button>
  )
}

export function Sidebar({
  route, onNavigate, onGoPro,
}: { route: Route; onNavigate: (r: Route) => void; onGoPro: () => void }) {
  return (
    <aside
      style={{
        width: 248, flexShrink: 0, background: C.sidebar, borderRight: '1px solid rgba(221,225,255,.07)',
        display: 'flex', flexDirection: 'column', padding: '24px 16px',
      }}
    >
      {/* wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '0 6px', marginBottom: 30 }}>
        <img
          src="/assets/crow-cut.png"
          alt="DoneWithMyEx crow"
          style={{ width: 34, height: 34, objectFit: 'contain', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,.5))' }}
        />
        <div style={{ lineHeight: 0.94 }}>
          <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 15, letterSpacing: '.01em', ...goldText }}>DONE</div>
          <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 10, letterSpacing: '.13em', color: C.on }}>WITH MY EX</div>
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
          borderRadius: 14, padding: 15, background: 'linear-gradient(160deg,#13224f,#0a1638)',
          border: '1px solid rgba(255,193,7,.3)', marginBottom: 14,
        }}
      >
        <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: C.gold, marginBottom: 6 }}>
          Pro
        </div>
        <div style={{ fontFamily: fontBody, fontSize: 11.5, lineHeight: 1.4, color: mut(0.7), marginBottom: 11 }}>
          Unlock exports &amp; receipt storage.
        </div>
        <button
          onClick={onGoPro}
          style={{
            width: '100%', fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.04em',
            padding: 9, border: 'none', borderRadius: 9, cursor: 'pointer', ...goldButton,
          }}
        >
          Go Pro
        </button>
      </div>

      {/* user chip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 6 }}>
        <div
          style={{
            width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#13224f,#293359)',
            border: '1px solid rgba(221,225,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: fontDisplay, fontWeight: 700, fontSize: 13, color: C.teal,
          }}
        >
          A
        </div>
        <div style={{ lineHeight: 1.15, minWidth: 0 }}>
          <div style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 12, color: C.on }}>Alex M.</div>
          <div style={{ fontFamily: fontBody, fontSize: 10, color: mut(0.4) }}>Free plan</div>
        </div>
      </div>
    </aside>
  )
}
