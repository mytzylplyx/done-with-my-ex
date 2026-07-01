import { useTheme } from '@/lib/theme'
import { FlipClock } from '@/components/FlipClock'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals } from '@/lib/freedom'

function StatCard({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  const t = useTheme()
  return (
    <div style={{ padding: 18, borderRadius: t.motif.chipRadius, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
      <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.12em', textTransform: 'uppercase', color: t.mut(0.45), marginBottom: 9 }}>{label}</div>
      <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 21, color: gold ? t.C.gold : t.C.on }}>{value}</div>
    </div>
  )
}

export function Cinematic({
  vals, onLog, onGoVault,
}: { vals: FreedomVals; onLog: () => void; onGoVault: () => void }) {
  const t = useTheme()
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const stack = bp !== 'desktop'

  return (
    <div>
      {/* hero */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '32px 16px 30px' : '46px 32px 40px', background: t.decor.heroGrad, borderBottom: `1px solid ${t.C.hairline}`, textAlign: 'center' }}>
        {t.motif.hazardRail && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: t.decor.hazardTape }} />}
        <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: t.C.gold, marginBottom: 12 }}>Your last payment lands</div>
        <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 'clamp(28px,3.6vw,40px)', letterSpacing: '.01em', textTransform: 'uppercase', ...t.goldText, marginBottom: 26 }}>{vals.endLabel}</div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 'clamp(8px,1.4vw,18px)', flexWrap: 'wrap' }}>
          <FlipClock vals={vals} size={isMobile ? 'md' : 'lg'} />
        </div>

        <div style={{ maxWidth: 720, margin: '30px auto 0' }}>
          <div style={{ height: 6, borderRadius: 2, background: t.mut(0.09), overflow: 'hidden' }}>
            <div style={{ height: '100%', width: vals.pctWidth, background: t.GOLD, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: t.mut(0.5) }}>
            <span>{vals.daysServed} served</span>
            <span style={{ color: t.C.gold }}>{vals.pctText} complete</span>
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
          <div style={{ borderRadius: t.motif.panelRadius, background: t.C.containerLow, border: `1px solid ${t.C.hairline}`, padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.5) }}>On record</span>
              <span style={{ fontFamily: t.fontLabel, fontSize: 11, letterSpacing: '.04em', color: t.mut(0.4) }}>{vals.payCount}</span>
            </div>
            {vals.payments.map((u) => {
              const dot = u.isCS ? t.C.teal : t.C.gold
              const recClr = u.receiptText.includes('attached') ? t.C.teal : t.mut(0.4)
              return (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 2px', borderBottom: `1px solid ${t.mut(0.06)}` }}>
                  <span style={{ width: 8, height: 8, borderRadius: 1, flexShrink: 0, background: dot }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: t.fontBody, fontWeight: 500, fontSize: 13, color: t.C.on }}>{u.type}</div>
                    <div style={{ fontFamily: t.fontLabel, fontSize: 10.5, letterSpacing: '.02em', color: recClr }}>{u.when} · {u.receiptText}</div>
                  </div>
                  <span style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 14, color: t.C.on }}>{u.amount}</span>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 18px', borderRadius: t.motif.chipRadius, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
              <div>
                <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.13em', textTransform: 'uppercase', color: t.mut(0.45), marginBottom: 5 }}>Next payment</div>
                <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 17, color: t.C.on }}>
                  {vals.nextAmount} <span style={{ fontFamily: t.fontBody, fontWeight: 400, fontSize: 12, color: t.mut(0.5) }}>· {vals.nextPay}</span>
                </div>
              </div>
              <button onClick={onLog} style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', padding: '10px 15px', border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton }}>Log it</button>
            </div>
            <div style={{ borderRadius: t.motif.chipRadius, padding: 18, background: t.decor.accentSoftBg, border: `1px solid ${t.decor.accentSoftBorder}` }}>
              <div style={{ fontFamily: t.fontBody, fontSize: 12.5, lineHeight: 1.5, color: t.mut(0.65) }}>
                You&apos;re <span style={{ color: t.C.gold, fontWeight: 600 }}>{vals.pctText}</span> of the way out. Keep the receipts — the proof is yours, not a memory.
              </div>
              <button onClick={onGoVault} style={{ marginTop: 13, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', padding: '9px 15px', border: `1px solid ${t.C.hairline}`, borderRadius: t.motif.pillRadius, cursor: 'pointer', background: 'transparent', color: t.C.on }}>Open Proof Vault</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
