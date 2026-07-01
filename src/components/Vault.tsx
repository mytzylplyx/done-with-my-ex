import { C, goldButton, fontDisplay, fontBody, fontLabel, mut } from '@/lib/tokens'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals } from '@/lib/freedom'

export function Vault({ vals }: { vals: FreedomVals }) {
  const isMobile = useBreakpoint() === 'mobile'
  return (
    <div style={{ padding: isMobile ? '22px 16px 44px' : '30px 32px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'minmax(320px,460px) minmax(0,1fr)', gap: 24, alignItems: 'start', maxWidth: 1240 }}>

        {/* statement document */}
        <div>
          <div style={{ borderRadius: 12, background: C.statement, padding: '26px 24px', boxShadow: '0 22px 50px rgba(0,0,0,.45)', color: C.ink }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1.5px solid ${C.ink}`, paddingBottom: 14, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/assets/crow-cut.png" alt="" style={{ width: 30, height: 30, objectFit: 'contain' }} />
                <div style={{ lineHeight: 1 }}>
                  <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 13, letterSpacing: '.02em', color: C.ink }}>DONE WITH MY EX</div>
                  <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a7565', marginTop: 2 }}>Payment Statement</div>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: fontLabel, fontWeight: 600, fontSize: 9, letterSpacing: '.06em', color: '#7a7565', textTransform: 'uppercase' }}>{vals.statementRange}</div>
            </div>

            {vals.statementRows.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid rgba(26,34,64,.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 13, color: C.ink }}>{r.when}</span>
                  <span style={{ fontFamily: fontBody, fontSize: 10.5, color: '#8a8470' }}>{r.type}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 13, color: r.recClr }}>{r.rec}</span>
                  <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 14, color: C.ink, minWidth: 58, textAlign: 'right' }}>{r.amount}</span>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, paddingTop: 13, borderTop: `1.5px solid ${C.ink}` }}>
              <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: C.ink }}>Total · {vals.statementCount}</span>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, color: C.ink }}>{vals.statementTotal}</span>
            </div>
            <div style={{ marginTop: 14, fontFamily: fontBody, fontSize: 9, lineHeight: 1.5, color: '#9a9482' }}>
              Organized records for negotiation, disputes &amp; peace of mind. Not legal, financial, or tax advice.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button style={{ flex: 1, fontFamily: fontLabel, fontWeight: 700, fontSize: 13, letterSpacing: '.03em', padding: 14, border: 'none', borderRadius: 12, cursor: 'pointer', ...goldButton }}>Download PDF</button>
            <button style={{ flex: 1, fontFamily: fontLabel, fontWeight: 700, fontSize: 13, letterSpacing: '.03em', padding: 14, border: '1px solid rgba(221,225,255,.16)', borderRadius: 12, cursor: 'pointer', background: 'transparent', color: C.on }}>Export CSV</button>
          </div>
        </div>

        {/* receipt vault */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
            <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: mut(0.5) }}>Receipt vault</span>
            <span style={{ fontFamily: fontBody, fontSize: 11.5, color: mut(0.4) }}>{vals.receiptCount}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(132px,1fr))', gap: 12 }}>
            {vals.receipts.map((r, i) => (
              <div key={i} style={{ aspectRatio: '3 / 4', borderRadius: 11, overflow: 'hidden', position: 'relative', background: 'repeating-linear-gradient(135deg,#0E193E,#0E193E 7px,#101b42 7px,#101b42 14px)', border: '1px solid rgba(221,225,255,.08)' }}>
                <div style={{ position: 'absolute', left: 10, top: 10, right: 10, height: 6, borderRadius: 2, background: 'rgba(221,225,255,.14)' }} />
                <div style={{ position: 'absolute', left: 10, top: 23, width: '60%', height: 5, borderRadius: 2, background: 'rgba(221,225,255,.1)' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '9px 10px', background: 'linear-gradient(180deg,transparent,rgba(5,11,32,.92))', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 9.5, letterSpacing: '.1em', color: C.teal }}>{r.when}</span>
                  <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, color: C.on }}>{r.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
