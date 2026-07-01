import { useEffect, useRef, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Topbar } from '@/components/Topbar'
import { Toast } from '@/components/Toast'
import { MissionControl } from '@/components/dashboard/MissionControl'
import { Cinematic } from '@/components/dashboard/Cinematic'
import { Editorial } from '@/components/dashboard/Editorial'
import { Countdown } from '@/components/Countdown'
import { Logger } from '@/components/Logger'
import { Vault } from '@/components/Vault'
import { computeFreedom, DEFAULT_PROPS } from '@/lib/freedom'
import type { CMode, CStyle, Layout, LogType, LoggedItem, Route } from '@/lib/freedom'
import { useBreakpoint } from '@/lib/useBreakpoint'
import { C, fontBody } from '@/lib/tokens'

const freedomConfig = DEFAULT_PROPS

function isLayout(v: string | null): v is Layout {
  return v === 'mission' || v === 'cinematic' || v === 'editorial'
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, val: string): void {
  try {
    localStorage.setItem(key, val)
  } catch {
    return
  }
}

export default function App() {
  const [layout, setLayout] = useState<Layout>(() => {
    const stored = safeGet('dwmx_layout')
    return isLayout(stored) ? stored : 'mission'
  })
  const [route, setRoute] = useState<Route>('dashboard')
  const [cstyle, setCstyle] = useState<CStyle>('flip')
  const [cmode, setCmode] = useState<CMode>('humor')
  const [logType, setLogType] = useState<LogType>('alimony')
  const [logged, setLogged] = useState<LoggedItem[]>([])
  const [now, setNow] = useState<number>(() => Date.now())
  const [toast, setToast] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'

  // Drive every countdown/progress visual off a single ticking clock.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  // Clear any pending toast timer on unmount.
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
  }, [])

  const changeLayout = (l: Layout) => {
    setLayout(l)
    safeSet('dwmx_layout', l)
  }

  const showToast = (msg: string) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 1900)
  }

  const share = () => showToast('Countdown link copied')

  const logPayment = () => {
    const isCS = logType === 'child_support'
    const item: LoggedItem = {
      id: 'u' + Date.now(),
      type: isCS ? 'Child support' : 'Spousal support',
      isCS,
      amount: '$' + Math.round(freedomConfig.monthlyAmount).toLocaleString('en-US'),
      when: 'Just now',
      receipt: true,
    }
    setLogged((prev) => [item, ...prev])
    showToast('Payment logged')
  }

  // Sidebar navigation also closes the mobile drawer.
  const navigate = (r: Route) => {
    setRoute(r)
    setMenuOpen(false)
  }
  const goLogger = () => setRoute('logger')
  const goVault = () => setRoute('vault')

  const vals = computeFreedom(freedomConfig, { route, logType, logged, now })

  return (
    <div
      style={{
        height: '100vh', display: 'flex', flexDirection: 'column', background: C.page,
        fontFamily: fontBody, color: C.on, overflow: 'hidden',
      }}
    >
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        {/* Desktop / tablet: sidebar sits in the flow. Mobile: it moves to the drawer below. */}
        {!isMobile && <Sidebar route={route} onNavigate={navigate} onGoPro={goVault} />}

        <main
          style={{
            flex: 1, minWidth: 0, overflowX: 'hidden', overflowY: 'auto', position: 'relative',
            background: 'radial-gradient(120% 70% at 80% -10%,#0c1430 0%,#080a14 60%)',
          }}
        >
          <Topbar
            vals={vals} route={route} layout={layout} onSetLayout={changeLayout}
            onLog={goLogger} isMobile={isMobile} onMenu={() => setMenuOpen(true)}
          />

          {route === 'dashboard' && layout === 'mission' && <MissionControl vals={vals} onLog={goLogger} onShare={share} />}
          {route === 'dashboard' && layout === 'cinematic' && <Cinematic vals={vals} onLog={goLogger} onGoVault={goVault} />}
          {route === 'dashboard' && layout === 'editorial' && <Editorial vals={vals} onLog={goLogger} />}
          {route === 'countdown' && <Countdown vals={vals} cstyle={cstyle} cmode={cmode} onSetStyle={setCstyle} onSetMode={setCmode} onShare={share} />}
          {route === 'logger' && <Logger vals={vals} logType={logType} onSetType={setLogType} onLogPayment={logPayment} onGoVault={goVault} />}
          {route === 'vault' && <Vault vals={vals} />}
        </main>
      </div>

      {/* Mobile drawer nav — scrim + slide-in sidebar. */}
      {isMobile && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            aria-hidden={!menuOpen}
            style={{
              position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(3,6,16,.62)',
              backdropFilter: 'blur(2px)', opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity .2s ease',
            }}
          />
          <div
            style={{
              position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, display: 'flex',
              transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform .26s cubic-bezier(.4,0,.2,1)',
              boxShadow: menuOpen ? '0 0 44px rgba(0,0,0,.6)' : 'none',
            }}
          >
            <Sidebar route={route} onNavigate={navigate} onGoPro={() => { setMenuOpen(false); goVault() }} />
          </div>
        </>
      )}

      <Toast message={toast} />
    </div>
  )
}
