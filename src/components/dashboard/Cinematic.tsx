import { C, goldText, goldButton, fontDisplay, fontBody, fontLabel, mut } from '@/lib/tokens'
import { FlipClock } from '@/components/FlipClock'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals } from '@/lib/freedom'

const GOLD_BAR = 'linear-gradient(90deg,#FFE4AF,#FFC107)'

function StatCard({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div style={{ padding: 18, borderRadius: 15, background: C.containerLow }}>
      <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.12em', textTransform: 'uppercase', color: mut(0.45), marginBottom: 9 }}>{label}</div>
      <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 21, color: gold ? C.gold : C.on }}>{value}</div>
    </div>
  )
}

export function Cinematic({
  vals, onLog, onGoVault,
}: { vals: FreedomVals; onLog: () => void; onGoVault: () => void }) {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const stack = bp !== 'desktop'

  return (
    <div>
      {/* hero */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '32px 16px 30px' : '46px 32px 40px', background: 'radial-gradient(120% 130% at 50% -25%,#16234f 0%,#0a1330 55%,#070d22 100%)', borderBottom: '1px solid rgba(221,225,255,.06)', textAlign: 'center' }}>
        <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: C.teal, marginBottom: 12 }}>Your last payment lands</div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 'clamp(28px,3.6vw,40px)', letterSpacing: '-.01em', ...goldText, marginBottom: 26 }}>{vals.endLabel}</div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 'clamp(8px,1.4vw,18px)', flexWrap: 'wrap' }}>
          <FlipClock vals={vals} size={isMobile ? 'md' : 'lg'} />
        </div>

        <div style={{ maxWidth: 720, margin: '30px auto 0' }}>
          <div style={{ height: 6, borderRadius: 6, background: 'rgba(221,225,255,.09)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: vals.pctWidth, background: GOLD_BAR, borderRadius: 6, boxShadow: '0 0 14px rgba(255,193,7,.5)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9, fontFamily: fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: mut(0.5) }}>
            <span>{vals.daysServed} served</span>
            <span style={{ color: C.teal }}>{vals.pctText} complete</span>
            <span>{vals.daysToGo} to go</span>
          </div>
        </div>
      </div>

      {/* lower */}
      <div style={{ padding: isMobile ? '20px 16px 40px' : '24px 32px 52px', maxWidth: 1320 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 14, marginBottom: 18 }}>
          <StatCard label="Paid so far" value={vals.paidSoFar} />
          <StatCard label="Left to pay" value={vals.leftToPay} gold />
          <StatCard label="Per day on parole" value={vals.dailyCost} />
          <StatCard label="Days served" value={vals.daysServed} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: stack ? 'minmax(0,1fr)' : 'minmax(0,1.5fr) minmax(0,1fr)', gap: 18, alignItems: 'start' }}>
          <div style={{ borderRadius: 18, background: C.containerLow, padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.5) }}>On record</span>
              <span style={{ fontFamily: fontBody, fontSize: 11, color: mut(0.4) }}>{vals.payCount}</span>
            </div>
            {vals.payments.map((u) => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 2px', borderBottom: '1px solid rgba(221,225,255,.06)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, flexShrink: 0, background: u.dot }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 13, color: C.on }}>{u.type}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 10.5, color: u.recClr }}>{u.when} · {u.receiptText}</div>
                </div>
                <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14, color: C.on }}>{u.amount}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 18px', borderRadius: 16, background: C.containerLow }}>
              <div>
                <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: mut(0.45), marginBottom: 5 }}>Next payment</div>
                <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 17, color: C.on }}>
                  {vals.nextAmount} <span style={{ fontFamily: fontBody, fontWeight: 400, fontSize: 12, color: mut(0.5) }}>· {vals.nextPay}</span>
                </div>
              </div>
              <button onClick={onLog} style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase', padding: '10px 15px', border: 'none', borderRadius: 9, cursor: 'pointer', ...goldButton }}>Log it</button>
            </div>
            <div style={{ borderRadius: 16, padding: 18, background: 'linear-gradient(135deg,rgba(255,193,7,.1),rgba(255,193,7,.02))', border: '1px solid rgba(255,193,7,.16)' }}>
              <div style={{ fontFamily: fontBody, fontSize: 12.5, lineHeight: 1.5, color: mut(0.65) }}>
                You're <span style={{ color: C.gold, fontWeight: 600 }}>{vals.pctText}</span> of the way out. Keep the receipts — the proof is yours, not a memory.
              </div>
              <button onClick={onGoVault} style={{ marginTop: 13, fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase', padding: '9px 15px', border: '1px solid rgba(221,225,255,.16)', borderRadius: 9, cursor: 'pointer', background: 'transparent', color: C.on }}>Open Proof Vault</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
