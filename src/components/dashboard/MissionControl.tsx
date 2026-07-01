import { useTheme } from '@/lib/theme'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals } from '@/lib/freedom'

export function MissionControl({
  vals, onLog, onShare,
}: { vals: FreedomVals; onLog: () => void; onShare: () => void }) {
  const t = useTheme()
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const stack = bp !== 'desktop'
  // In a single-column grid, `span N` would spawn implicit columns and overflow,
  // so collapse spans to `auto` when stacking.
  const col = (span: number) => (stack ? 'auto' : `span ${span}`)
  const panel = t.motif.panelRadius
  const chip = t.motif.chipRadius

  return (
    <div style={{ padding: isMobile ? '20px 16px 40px' : '28px 32px 52px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: stack ? 'minmax(0,1fr)' : 'repeat(12,minmax(0,1fr))',
          gap: 18, alignItems: 'start', maxWidth: 1400,
        }}
      >

        {/* Freedom Clock + donut */}
        <div
          style={{
            gridColumn: col(7), minWidth: 0, borderRadius: t.motif.cardRadius, overflow: 'hidden',
            background: t.decor.cardGrad, border: `1px solid ${t.C.hairline}`,
          }}
        >
          {t.motif.hazardRail && <div style={{ height: 6, background: t.decor.hazardTape }} />}
          <div
            style={{
              padding: isMobile ? 22 : 30, display: 'flex', flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center', gap: isMobile ? 20 : 34, minHeight: 236, textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <div style={{ position: 'relative', width: 184, height: 184, flexShrink: 0 }}>
              <svg width="184" height="184" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="ggA" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={t.C.goldLight} />
                    <stop offset="1" stopColor={t.C.gold} />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="52" fill="none" stroke={t.mut(0.12)} strokeWidth="9" />
                <circle
                  cx="60" cy="60" r="52" fill="none" stroke="url(#ggA)" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={vals.donutCirc} strokeDashoffset={vals.donutOffset} transform="rotate(-90 60 60)"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 34, color: t.C.on }}>{vals.pctText}</span>
                <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: t.mut(0.45) }}>Time served</span>
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: t.C.gold, marginBottom: 8 }}>Freedom Clock</div>
              <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 'clamp(48px,5vw,68px)', lineHeight: 0.92, color: t.C.on }}>{vals.daysToGo}</div>
              <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.45), margin: '4px 0 14px' }}>Days until parole</div>
              <div style={{ fontFamily: t.fontBody, fontSize: 13, color: t.mut(0.6) }}>
                They stop garnishing your dignity <span style={{ color: t.C.gold, fontWeight: 600 }}>{vals.endLabel}</span>
              </div>
              <div style={{ fontFamily: t.fontBody, fontSize: 12.5, color: t.mut(0.5), marginTop: 4 }}>{vals.humanLine} left on the sentence</div>
              <div style={{ height: 8, borderRadius: 2, background: t.mut(0.09), overflow: 'hidden', margin: isMobile ? '16px auto 0' : '16px 0 0', maxWidth: isMobile ? '100%' : 380 }}>
                <div style={{ height: '100%', width: vals.pctWidth, background: t.GOLD }} />
              </div>
            </div>
          </div>
        </div>

        {/* stat column */}
        <div style={{ gridColumn: col(5), display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 16 }}>
            <div style={{ padding: 18, borderRadius: chip, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
              <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: t.mut(0.45), marginBottom: 9 }}>Paid so far</div>
              <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 24, color: t.C.on }}>{vals.paidSoFar}</div>
            </div>
            <div style={{ padding: 18, borderRadius: chip, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
              <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: t.mut(0.45), marginBottom: 9 }}>Left to pay</div>
              <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 24, color: t.C.gold }}>{vals.leftToPay}</div>
            </div>
          </div>
          <div style={{ borderRadius: chip, padding: 18, background: t.decor.accentSoftBg, border: `1px solid ${t.decor.accentSoftBorder}` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 28, ...t.goldText }}>{vals.dailyCost}</span>
              <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: t.mut(0.5) }}>per day on parole</span>
            </div>
            <div style={{ fontFamily: t.fontBody, fontSize: 12, lineHeight: 1.45, color: t.mut(0.55), marginTop: 7 }}>The meter runs whether you look at it or not.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 18px', borderRadius: chip, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
            <div>
              <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: t.mut(0.45), marginBottom: 5 }}>Next payment</div>
              <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 17, color: t.C.on }}>
                {vals.nextAmount} <span style={{ fontFamily: t.fontBody, fontWeight: 400, fontSize: 12, color: t.mut(0.5) }}>· {vals.nextPay}</span>
              </div>
            </div>
            <button onClick={onLog} style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', padding: '10px 16px', border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton }}>Log it</button>
          </div>
        </div>

        {/* on record table */}
        <div style={{ gridColumn: col(8), minWidth: 0, borderRadius: panel, background: t.C.containerLow, border: `1px solid ${t.C.hairline}`, padding: isMobile ? '18px 16px' : '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.5) }}>On record</span>
            <span style={{ fontFamily: t.fontLabel, fontSize: 11, letterSpacing: '.04em', color: t.mut(0.4) }}>{vals.payCount}</span>
          </div>

          {!isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1.2fr) minmax(0,1fr) auto', gap: 12, padding: '9px 6px', borderBottom: `1px solid ${t.C.hairline}`, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.12em', textTransform: 'uppercase', color: t.mut(0.38) }}>
              <span>Period</span><span>Type</span><span>Receipt</span><span style={{ textAlign: 'right' }}>Amount</span>
            </div>
          )}

          {vals.payments.map((u) => {
            const dot = u.isCS ? t.C.teal : t.C.gold
            const recClr = u.receiptText.includes('attached') ? t.C.teal : t.mut(0.4)
            return isMobile ? (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 2px', borderBottom: `1px solid ${t.mut(0.06)}` }}>
                <span style={{ width: 8, height: 8, borderRadius: 1, flexShrink: 0, background: dot }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: t.fontBody, fontWeight: 500, fontSize: 13.5, color: t.C.on }}>{u.type}</div>
                  <div style={{ fontFamily: t.fontLabel, fontSize: 10.5, letterSpacing: '.02em', color: recClr }}>{u.when} · {u.receiptText}</div>
                </div>
                <span style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 14, color: t.C.on }}>{u.amount}</span>
              </div>
            ) : (
              <div key={u.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1.2fr) minmax(0,1fr) auto', gap: 12, alignItems: 'center', padding: '12px 6px', borderBottom: `1px solid ${t.mut(0.06)}` }}>
                <span style={{ fontFamily: t.fontLabel, fontWeight: 500, fontSize: 12.5, letterSpacing: '.02em', color: t.C.on }}>{u.when}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 1, flexShrink: 0, background: dot }} />
                  <span style={{ fontFamily: t.fontBody, fontSize: 12.5, color: t.mut(0.7) }}>{u.type}</span>
                </div>
                <span style={{ fontFamily: t.fontLabel, fontSize: 10.5, letterSpacing: '.02em', color: recClr }}>{u.receiptText}</span>
                <span style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 14, color: t.C.on, textAlign: 'right' }}>{u.amount}</span>
              </div>
            )
          })}
        </div>

        {/* share card */}
        <div style={{ gridColumn: col(4), minWidth: 0, borderRadius: panel, overflow: 'hidden', background: t.decor.heroGrad, border: `1px solid ${t.C.hairline}` }}>
          {t.motif.hazardRail && <div style={{ height: 6, background: t.decor.hazardTape }} />}
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img src="/assets/crow-cut.png" alt="" style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: 12 }} />
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 19, color: t.C.on, lineHeight: 1.12 }}>{vals.humanLine}</div>
            <div style={{ fontFamily: t.fontLabel, fontSize: 11, letterSpacing: '.04em', color: t.C.teal, marginTop: 8 }}>{vals.pctText} served · {vals.daysToGo} to go</div>
            <button onClick={onShare} style={{ width: '100%', marginTop: 18, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 12, letterSpacing: '.05em', textTransform: 'uppercase', padding: 11, border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton }}>Share milestone</button>
            <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.32), marginTop: 13 }}>donewithmyex.com</div>
          </div>
        </div>

      </div>
    </div>
  )
}
