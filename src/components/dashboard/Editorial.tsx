import { useTheme } from '@/lib/theme'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals } from '@/lib/freedom'

export function Editorial({
  vals, onLog,
}: { vals: FreedomVals; onLog: () => void }) {
  const t = useTheme()
  const isMobile = useBreakpoint() === 'mobile'
  const colBorder = isMobile ? 'none' : `1px solid ${t.C.hairline}`
  const colPad = isMobile ? 0 : 28

  return (
    <div style={{ padding: isMobile ? '32px 16px 48px' : '56px 32px 64px' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>
        <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: t.C.gold, marginBottom: 18 }}>The end of the sentence is in sight</div>
        <h1 style={{ margin: 0, fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 'clamp(34px,5.4vw,62px)', lineHeight: 1.02, letterSpacing: '-.01em', textTransform: 'uppercase', color: t.C.on }}>
          You&apos;re <span style={t.goldText}>{vals.pctText}</span> of the way out.
        </h1>
        <p style={{ margin: '20px 0 0', fontFamily: t.fontBody, fontSize: isMobile ? 15 : 16, lineHeight: 1.5, color: t.mut(0.6), maxWidth: 560 }}>
          Your last payment lands <span style={{ color: t.C.on, fontWeight: 500 }}>{vals.endLabel}</span>. That&apos;s {vals.humanLine} left — logged, proven, and ticking down whether the ex likes it or not.
        </p>

        <div style={{ marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 30, color: t.C.on }}>
              {vals.daysToGo} <span style={{ fontSize: 13, fontFamily: t.fontLabel, letterSpacing: '.12em', textTransform: 'uppercase', color: t.mut(0.5) }}>days to go</span>
            </span>
            <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 12, letterSpacing: '.1em', color: t.C.gold }}>{vals.pctText}</span>
          </div>
          <div style={{ height: 5, borderRadius: 2, background: t.mut(0.1), overflow: 'hidden' }}>
            <div style={{ height: '100%', width: vals.pctWidth, background: t.GOLD, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: t.mut(0.4) }}>
            <span>Aug 1, 2025</span><span>{vals.endLabel}</span>
          </div>
        </div>

        <div style={{ height: 1, background: t.C.hairline, margin: '40px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'repeat(3,minmax(0,1fr))', gap: isMobile ? 22 : 28 }}>
          <div>
            <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: t.mut(0.42), marginBottom: 10 }}>Paid so far</div>
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 30, color: t.C.on }}>{vals.paidSoFar}</div>
          </div>
          <div style={{ borderLeft: colBorder, paddingLeft: colPad }}>
            <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: t.mut(0.42), marginBottom: 10 }}>Left to pay</div>
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 30, color: t.C.gold }}>{vals.leftToPay}</div>
          </div>
          <div style={{ borderLeft: colBorder, paddingLeft: colPad }}>
            <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: t.mut(0.42), marginBottom: 10 }}>Per day on parole</div>
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 30, color: t.C.on }}>{vals.dailyCost}</div>
          </div>
        </div>

        <div style={{ height: 1, background: t.C.hairline, margin: '40px 0' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.5) }}>Recent activity</span>
          <span style={{ fontFamily: t.fontLabel, fontSize: 11, letterSpacing: '.04em', color: t.mut(0.4) }}>{vals.payCount}</span>
        </div>
        {vals.payments.map((u) => {
          const dot = u.isCS ? t.C.teal : t.C.gold
          return (
            <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '15px 0', borderBottom: `1px solid ${t.mut(0.07)}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13, minWidth: 0 }}>
                <span style={{ width: 7, height: 7, borderRadius: 1, flexShrink: 0, background: dot }} />
                <span style={{ fontFamily: t.fontBody, fontWeight: 500, fontSize: 14, color: t.C.on }}>{u.type}</span>
                <span style={{ fontFamily: t.fontLabel, fontSize: 11.5, letterSpacing: '.02em', color: t.mut(0.4) }}>{u.when}</span>
              </div>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 15, color: t.C.on }}>{u.amount}</span>
            </div>
          )
        })}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 34, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: t.fontBody, fontSize: 14, color: t.mut(0.6) }}>
            Next payment <span style={{ color: t.C.on, fontWeight: 600, fontFamily: t.fontDisplay }}>{vals.nextAmount}</span> · {vals.nextPay}
          </div>
          <button onClick={onLog} style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase', padding: '12px 22px', border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton }}>Log it</button>
        </div>
      </div>
    </div>
  )
}
