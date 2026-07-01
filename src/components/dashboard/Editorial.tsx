import { C, goldText, goldButton, fontDisplay, fontBody, fontLabel, mut } from '@/lib/tokens'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals } from '@/lib/freedom'

const GOLD_BAR = 'linear-gradient(90deg,#FFE4AF,#FFC107)'

export function Editorial({
  vals, onLog,
}: { vals: FreedomVals; onLog: () => void }) {
  const isMobile = useBreakpoint() === 'mobile'
  const colBorder = isMobile ? 'none' : '1px solid rgba(221,225,255,.1)'
  const colPad = isMobile ? 0 : 28

  return (
    <div style={{ padding: isMobile ? '32px 16px 48px' : '56px 32px 64px' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>
        <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: C.teal, marginBottom: 18 }}>The end is in sight</div>
        <h1 style={{ margin: 0, fontFamily: fontDisplay, fontWeight: 700, fontSize: 'clamp(34px,5.4vw,62px)', lineHeight: 1.02, letterSpacing: '-.02em', color: C.on }}>
          You're <span style={goldText}>{vals.pctText}</span> of the way out.
        </h1>
        <p style={{ margin: '20px 0 0', fontFamily: fontBody, fontSize: isMobile ? 15 : 16, lineHeight: 1.5, color: mut(0.6), maxWidth: 560 }}>
          Your last payment lands <span style={{ color: C.on, fontWeight: 500 }}>{vals.endLabel}</span>. That's {vals.humanLine} left — logged, proven, and ticking down.
        </p>

        <div style={{ marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 30, color: C.on }}>
              {vals.daysToGo} <span style={{ fontSize: 13, fontFamily: fontLabel, letterSpacing: '.12em', textTransform: 'uppercase', color: mut(0.5) }}>days to go</span>
            </span>
            <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 12, letterSpacing: '.1em', color: C.teal }}>{vals.pctText}</span>
          </div>
          <div style={{ height: 5, borderRadius: 6, background: 'rgba(221,225,255,.1)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: vals.pctWidth, background: GOLD_BAR, borderRadius: 6 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9, fontFamily: fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: mut(0.4) }}>
            <span>Aug 1, 2025</span><span>{vals.endLabel}</span>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(221,225,255,.1)', margin: '40px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'repeat(3,minmax(0,1fr))', gap: isMobile ? 22 : 28 }}>
          <div>
            <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: mut(0.42), marginBottom: 10 }}>Paid so far</div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 30, color: C.on }}>{vals.paidSoFar}</div>
          </div>
          <div style={{ borderLeft: colBorder, paddingLeft: colPad }}>
            <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: mut(0.42), marginBottom: 10 }}>Left to pay</div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 30, color: C.gold }}>{vals.leftToPay}</div>
          </div>
          <div style={{ borderLeft: colBorder, paddingLeft: colPad }}>
            <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: mut(0.42), marginBottom: 10 }}>Per day on parole</div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 30, color: C.on }}>{vals.dailyCost}</div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(221,225,255,.1)', margin: '40px 0' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.5) }}>Recent activity</span>
          <span style={{ fontFamily: fontBody, fontSize: 11, color: mut(0.4) }}>{vals.payCount}</span>
        </div>
        {vals.payments.map((u) => (
          <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '15px 0', borderBottom: '1px solid rgba(221,225,255,.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, minWidth: 0 }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, flexShrink: 0, background: u.dot }} />
              <span style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 14, color: C.on }}>{u.type}</span>
              <span style={{ fontFamily: fontBody, fontSize: 12, color: mut(0.4) }}>{u.when}</span>
            </div>
            <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: C.on }}>{u.amount}</span>
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 34, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: fontBody, fontSize: 14, color: mut(0.6) }}>
            Next payment <span style={{ color: C.on, fontWeight: 600, fontFamily: fontDisplay }}>{vals.nextAmount}</span> · {vals.nextPay}
          </div>
          <button onClick={onLog} style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 12, letterSpacing: '.05em', textTransform: 'uppercase', padding: '12px 22px', border: 'none', borderRadius: 11, cursor: 'pointer', ...goldButton }}>Log it</button>
        </div>
      </div>
    </div>
  )
}
