import { C, goldText, goldButton, fontDisplay, fontBody, fontLabel, mut } from '@/lib/tokens'
import type { FreedomVals } from '@/lib/freedom'

const GOLD_BAR = 'linear-gradient(90deg,#FFE4AF,#FFC107)'

export function MissionControl({
  vals, onLog, onShare,
}: { vals: FreedomVals; onLog: () => void; onShare: () => void }) {
  return (
    <div style={{ padding: '28px 32px 52px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', gap: 18, alignItems: 'start', maxWidth: 1400 }}>

        {/* Freedom Clock + donut */}
        <div
          style={{
            gridColumn: 'span 7', minWidth: 0, borderRadius: 22, padding: 30,
            background: 'linear-gradient(160deg,#0f1d49,#0a1638)', border: '1px solid rgba(221,225,255,.07)',
            display: 'flex', alignItems: 'center', gap: 34, minHeight: 248,
          }}
        >
          <div style={{ position: 'relative', width: 184, height: 184, flexShrink: 0 }}>
            <svg width="184" height="184" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="ggA" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFE4AF" />
                  <stop offset="1" stopColor="#FFC107" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(221,225,255,.1)" strokeWidth="9" />
              <circle
                cx="60" cy="60" r="52" fill="none" stroke="url(#ggA)" strokeWidth="9" strokeLinecap="round"
                strokeDasharray={vals.donutCirc} strokeDashoffset={vals.donutOffset} transform="rotate(-90 60 60)"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 34, color: C.on }}>{vals.pctText}</span>
              <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.45) }}>Served</span>
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.teal, marginBottom: 8 }}>Freedom Clock</div>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 'clamp(48px,5vw,68px)', lineHeight: 0.92, color: C.on }}>{vals.daysToGo}</div>
            <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.45), margin: '4px 0 14px' }}>Days to freedom</div>
            <div style={{ fontFamily: fontBody, fontSize: 13, color: mut(0.6) }}>
              Last payment lands <span style={{ color: C.gold, fontWeight: 600 }}>{vals.endLabel}</span>
            </div>
            <div style={{ fontFamily: fontBody, fontSize: 12.5, color: mut(0.5), marginTop: 4 }}>{vals.humanLine} left</div>
            <div style={{ height: 8, borderRadius: 6, background: 'rgba(221,225,255,.09)', overflow: 'hidden', marginTop: 16, maxWidth: 380 }}>
              <div style={{ height: '100%', width: vals.pctWidth, background: GOLD_BAR, borderRadius: 6 }} />
            </div>
          </div>
        </div>

        {/* stat column */}
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 16 }}>
            <div style={{ padding: 18, borderRadius: 16, background: C.containerLow }}>
              <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: mut(0.45), marginBottom: 9 }}>Paid so far</div>
              <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 24, color: C.on }}>{vals.paidSoFar}</div>
            </div>
            <div style={{ padding: 18, borderRadius: 16, background: C.containerLow }}>
              <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: mut(0.45), marginBottom: 9 }}>Left to pay</div>
              <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 24, color: C.gold }}>{vals.leftToPay}</div>
            </div>
          </div>
          <div style={{ borderRadius: 16, padding: 18, background: 'linear-gradient(135deg,rgba(255,193,7,.11),rgba(255,193,7,.03))', border: '1px solid rgba(255,193,7,.16)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 28, ...goldText }}>{vals.dailyCost}</span>
              <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: mut(0.5) }}>per day on parole</span>
            </div>
            <div style={{ fontFamily: fontBody, fontSize: 12, lineHeight: 1.45, color: mut(0.55), marginTop: 7 }}>Every day, the meter ticks closer to your last payment.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 18px', borderRadius: 16, background: C.containerLow }}>
            <div>
              <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: mut(0.45), marginBottom: 5 }}>Next payment</div>
              <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 17, color: C.on }}>
                {vals.nextAmount} <span style={{ fontFamily: fontBody, fontWeight: 400, fontSize: 12, color: mut(0.5) }}>· {vals.nextPay}</span>
              </div>
            </div>
            <button onClick={onLog} style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase', padding: '10px 16px', border: 'none', borderRadius: 9, cursor: 'pointer', ...goldButton }}>Log it</button>
          </div>
        </div>

        {/* on record table */}
        <div style={{ gridColumn: 'span 8', minWidth: 0, borderRadius: 18, background: C.containerLow, padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.5) }}>On record</span>
            <span style={{ fontFamily: fontBody, fontSize: 11, color: mut(0.4) }}>{vals.payCount}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1.2fr) minmax(0,1fr) auto', gap: 12, padding: '9px 6px', borderBottom: '1px solid rgba(221,225,255,.08)', fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.12em', textTransform: 'uppercase', color: mut(0.38) }}>
            <span>Period</span><span>Type</span><span>Receipt</span><span style={{ textAlign: 'right' }}>Amount</span>
          </div>
          {vals.payments.map((u) => (
            <div key={u.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1.2fr) minmax(0,1fr) auto', gap: 12, alignItems: 'center', padding: '12px 6px', borderBottom: '1px solid rgba(221,225,255,.05)' }}>
              <span style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 13, color: C.on }}>{u.when}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, flexShrink: 0, background: u.dot }} />
                <span style={{ fontFamily: fontBody, fontSize: 12.5, color: mut(0.7) }}>{u.type}</span>
              </div>
              <span style={{ fontFamily: fontBody, fontSize: 11, color: u.recClr }}>{u.receiptText}</span>
              <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14, color: C.on, textAlign: 'right' }}>{u.amount}</span>
            </div>
          ))}
        </div>

        {/* share card */}
        <div style={{ gridColumn: 'span 4', minWidth: 0, borderRadius: 18, padding: 20, background: 'radial-gradient(130% 100% at 50% 0%,#0c1a47,#04102f)', border: '1px solid rgba(221,225,255,.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src="/assets/crow-cut.png" alt="" style={{ width: 40, height: 40, objectFit: 'contain', marginBottom: 12 }} />
          <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 19, color: C.on, lineHeight: 1.12 }}>{vals.humanLine}</div>
          <div style={{ fontFamily: fontBody, fontSize: 11.5, color: C.teal, marginTop: 8 }}>{vals.pctText} served · {vals.daysToGo} days to go</div>
          <button onClick={onShare} style={{ width: '100%', marginTop: 18, fontFamily: fontLabel, fontWeight: 700, fontSize: 12, letterSpacing: '.04em', padding: 11, border: 'none', borderRadius: 10, cursor: 'pointer', ...goldButton }}>Share milestone</button>
          <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.32), marginTop: 13 }}>donewithmyex.com</div>
        </div>

      </div>
    </div>
  )
}
