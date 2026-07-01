import { C, goldButton, fontDisplay, fontBody, fontLabel, mut, seg, bgseg } from '@/lib/tokens'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals, LogType } from '@/lib/freedom'

function TypeButton({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, fontFamily: fontLabel, fontWeight: 700, fontSize: 12, letterSpacing: '.03em',
        padding: '13px 8px', borderRadius: 10, cursor: 'pointer',
        background: bgseg(active), color: seg(active),
        border: active ? '1px solid rgba(255,193,7,.5)' : '1px solid rgba(221,225,255,.12)',
      }}
    >
      {label}
    </button>
  )
}

const fieldRow = (border: boolean) => ({
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px',
  background: C.container, ...(border ? { borderBottom: '1px solid rgba(221,225,255,.06)' } : {}),
}) as const

export function Logger({
  vals, logType, onSetType, onLogPayment, onGoVault,
}: {
  vals: FreedomVals
  logType: LogType
  onSetType: (t: LogType) => void
  onLogPayment: () => void
  onGoVault: () => void
}) {
  const isMobile = useBreakpoint() === 'mobile'
  return (
    <div style={{ padding: isMobile ? '22px 16px 44px' : '30px 32px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'minmax(300px,420px) minmax(0,1fr)', gap: 22, alignItems: 'start', maxWidth: 1200 }}>

        {/* log panel */}
        <div style={{ borderRadius: 18, padding: 22, background: C.containerLow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.5) }}>Log a payment</span>
            <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: C.teal }}>~10 seconds</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <TypeButton label="Spousal support" active={logType === 'alimony'} onClick={() => onSetType('alimony')} />
            <TypeButton label="Child support" active={logType === 'child_support'} onClick={() => onSetType('child_support')} />
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
            <div style={fieldRow(true)}>
              <span style={{ fontFamily: fontBody, fontSize: 13, color: mut(0.55) }}>Amount</span>
              <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 16, color: C.on }}>{vals.logAmount}</span>
            </div>
            <div style={fieldRow(true)}>
              <span style={{ fontFamily: fontBody, fontSize: 13, color: mut(0.55) }}>Month</span>
              <span style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 14, color: C.on }}>{vals.logMonth}</span>
            </div>
            <div style={fieldRow(false)}>
              <span style={{ fontFamily: fontBody, fontSize: 13, color: mut(0.55) }}>Receipt</span>
              <span style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 13, color: C.teal }}>Attach photo ›</span>
            </div>
          </div>
          <button onClick={onLogPayment} style={{ width: '100%', fontFamily: fontLabel, fontWeight: 700, fontSize: 14, letterSpacing: '.03em', padding: 15, border: 'none', borderRadius: 12, cursor: 'pointer', ...goldButton, boxShadow: '0 8px 20px rgba(255,193,7,.2)' }}>
            Log {vals.logTypeLabel} payment
          </button>
        </div>

        {/* on record */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.5) }}>On record</span>
            <span style={{ fontFamily: fontBody, fontSize: 11.5, color: mut(0.4) }}>{vals.payCount}</span>
          </div>
          <div style={{ borderRadius: 16, background: C.containerLow, padding: '6px 20px' }}>
            {vals.payments.map((u) => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 2px', borderBottom: '1px solid rgba(221,225,255,.06)' }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, flexShrink: 0, background: u.dot }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 14, color: C.on }}>{u.type}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 11, color: u.recClr }}>{u.when} · {u.receiptText}</div>
                </div>
                <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: C.on }}>{u.amount}</span>
              </div>
            ))}
          </div>
          <button onClick={onGoVault} style={{ width: '100%', marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: mut(0.6), background: 'transparent', border: '1px dashed rgba(221,225,255,.16)', padding: 14, borderRadius: 12, cursor: 'pointer' }}>
            <svg width="11" height="13" viewBox="0 0 12 14">
              <rect x="1" y="6" width="10" height="7" rx="1.5" fill="rgba(221,225,255,.7)" />
              <path d="M3 6V4.5a3 3 0 016 0V6" stroke="rgba(221,225,255,.7)" strokeWidth="1.6" fill="none" />
            </svg>
            Unlock export &amp; receipt storage
          </button>
        </div>

      </div>
    </div>
  )
}
