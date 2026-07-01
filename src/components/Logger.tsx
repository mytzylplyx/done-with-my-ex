import type { CSSProperties } from 'react'
import { useTheme } from '@/lib/theme'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals, LogType } from '@/lib/freedom'

function TypeButton({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  const t = useTheme()
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 12, letterSpacing: '.04em', textTransform: 'uppercase',
        padding: '13px 8px', borderRadius: t.motif.pillRadius, cursor: 'pointer',
        background: t.bgseg(active), color: t.seg(active),
        border: `1px solid ${active ? t.decor.accentSoftBorder : t.C.hairline}`,
      }}
    >
      {label}
    </button>
  )
}

export function Logger({
  vals, logType, onSetType, onLogPayment, onGoVault,
}: {
  vals: FreedomVals
  logType: LogType
  onSetType: (t: LogType) => void
  onLogPayment: () => void
  onGoVault: () => void
}) {
  const t = useTheme()
  const isMobile = useBreakpoint() === 'mobile'
  const fieldRow = (border: boolean): CSSProperties => ({
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px',
    background: t.C.container, ...(border ? { borderBottom: `1px solid ${t.mut(0.06)}` } : {}),
  })

  return (
    <div style={{ padding: isMobile ? '22px 16px 44px' : '30px 32px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'minmax(300px,420px) minmax(0,1fr)', gap: 22, alignItems: 'start', maxWidth: 1200 }}>

        {/* log panel */}
        <div style={{ borderRadius: t.motif.panelRadius, padding: 22, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.5) }}>Log a payment</span>
            <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: t.C.teal }}>~10 seconds</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <TypeButton label="Spousal support" active={logType === 'alimony'} onClick={() => onSetType('alimony')} />
            <TypeButton label="Child support" active={logType === 'child_support'} onClick={() => onSetType('child_support')} />
          </div>
          <div style={{ borderRadius: t.motif.chipRadius, overflow: 'hidden', marginBottom: 16, border: `1px solid ${t.C.hairline}` }}>
            <div style={fieldRow(true)}>
              <span style={{ fontFamily: t.fontBody, fontSize: 13, color: t.mut(0.55) }}>Amount</span>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16, color: t.C.on }}>{vals.logAmount}</span>
            </div>
            <div style={fieldRow(true)}>
              <span style={{ fontFamily: t.fontBody, fontSize: 13, color: t.mut(0.55) }}>Month</span>
              <span style={{ fontFamily: t.fontBody, fontWeight: 500, fontSize: 14, color: t.C.on }}>{vals.logMonth}</span>
            </div>
            <div style={fieldRow(false)}>
              <span style={{ fontFamily: t.fontBody, fontSize: 13, color: t.mut(0.55) }}>Receipt</span>
              <span style={{ fontFamily: t.fontBody, fontWeight: 600, fontSize: 13, color: t.C.teal }}>Attach photo ›</span>
            </div>
          </div>
          <button onClick={onLogPayment} style={{ width: '100%', fontFamily: t.fontLabel, fontWeight: 600, fontSize: 14, letterSpacing: '.04em', textTransform: 'uppercase', padding: 15, border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton }}>
            Log {vals.logTypeLabel} payment
          </button>
        </div>

        {/* on record */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.5) }}>On record</span>
            <span style={{ fontFamily: t.fontLabel, fontSize: 11, letterSpacing: '.04em', color: t.mut(0.4) }}>{vals.payCount}</span>
          </div>
          <div style={{ borderRadius: t.motif.panelRadius, background: t.C.containerLow, border: `1px solid ${t.C.hairline}`, padding: '6px 20px' }}>
            {vals.payments.map((u) => {
              const dot = u.isCS ? t.C.teal : t.C.gold
              const recClr = u.receiptText.includes('attached') ? t.C.teal : t.mut(0.4)
              return (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 2px', borderBottom: `1px solid ${t.mut(0.06)}` }}>
                  <span style={{ width: 9, height: 9, borderRadius: 1, flexShrink: 0, background: dot }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: t.fontBody, fontWeight: 500, fontSize: 14, color: t.C.on }}>{u.type}</div>
                    <div style={{ fontFamily: t.fontLabel, fontSize: 10.5, letterSpacing: '.02em', color: recClr }}>{u.when} · {u.receiptText}</div>
                  </div>
                  <span style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 15, color: t.C.on }}>{u.amount}</span>
                </div>
              )
            })}
          </div>
          <button onClick={onGoVault} style={{ width: '100%', marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: t.mut(0.6), background: 'transparent', border: `1px dashed ${t.mut(0.2)}`, padding: 14, borderRadius: t.motif.pillRadius, cursor: 'pointer' }}>
            <svg width="11" height="13" viewBox="0 0 12 14">
              <rect x="1" y="6" width="10" height="7" rx="1.5" fill={t.mut(0.7)} />
              <path d="M3 6V4.5a3 3 0 016 0V6" stroke={t.mut(0.7)} strokeWidth="1.6" fill="none" />
            </svg>
            Unlock export &amp; receipt storage
          </button>
        </div>

      </div>
    </div>
  )
}
