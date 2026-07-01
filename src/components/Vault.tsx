import { useTheme } from '@/lib/theme'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { FreedomVals } from '@/lib/freedom'

// The statement is a self-contained "printed document" with its own warm-gray
// ink scale, so these greys are intentional literals, not theme surfaces.
const DOC_MUTED = '#7a7565'
const DOC_FAINT = '#9a9482'
const DOC_RULE = 'rgba(58,53,45,.12)'

export function Vault({ vals }: { vals: FreedomVals }) {
  const t = useTheme()
  const isMobile = useBreakpoint() === 'mobile'
  return (
    <div style={{ padding: isMobile ? '22px 16px 44px' : '30px 32px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'minmax(320px,460px) minmax(0,1fr)', gap: 24, alignItems: 'start', maxWidth: 1240 }}>

        {/* statement document */}
        <div>
          <div style={{ borderRadius: t.motif.chipRadius, background: t.C.statement, padding: '26px 24px', boxShadow: '0 22px 50px rgba(0,0,0,.35)', color: t.C.ink }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1.5px solid ${t.C.ink}`, paddingBottom: 14, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/assets/crow-cut.png" alt="" style={{ width: 30, height: 30, objectFit: 'contain' }} />
                <div style={{ lineHeight: 1 }}>
                  <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 14, letterSpacing: '.03em', textTransform: 'uppercase', color: t.C.ink }}>DONE WITH MY EX</div>
                  <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: DOC_MUTED, marginTop: 2 }}>Payment Statement</div>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9, letterSpacing: '.06em', color: DOC_MUTED, textTransform: 'uppercase' }}>{vals.statementRange}</div>
            </div>

            {vals.statementRows.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: `1px solid ${DOC_RULE}` }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: t.fontBody, fontWeight: 600, fontSize: 13, color: t.C.ink }}>{r.when}</span>
                  <span style={{ fontFamily: t.fontBody, fontSize: 10.5, color: DOC_MUTED }}>{r.type}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: t.fontLabel, fontWeight: 700, fontSize: 13, color: r.recClr }}>{r.rec}</span>
                  <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 14, color: t.C.ink, minWidth: 58, textAlign: 'right' }}>{r.amount}</span>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, paddingTop: 13, borderTop: `1.5px solid ${t.C.ink}` }}>
              <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: t.C.ink }}>Total · {vals.statementCount}</span>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 22, color: t.C.ink }}>{vals.statementTotal}</span>
            </div>
            <div style={{ marginTop: 14, fontFamily: t.fontBody, fontSize: 9, lineHeight: 1.5, color: DOC_FAINT }}>
              Organized records for negotiation, disputes &amp; peace of mind. Not legal, financial, or tax advice.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button style={{ flex: 1, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 13, letterSpacing: '.04em', textTransform: 'uppercase', padding: 14, border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton }}>Download PDF</button>
            <button style={{ flex: 1, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 13, letterSpacing: '.04em', textTransform: 'uppercase', padding: 14, border: `1px solid ${t.C.hairline}`, borderRadius: t.motif.pillRadius, cursor: 'pointer', background: 'transparent', color: t.C.on }}>Export CSV</button>
          </div>
        </div>

        {/* receipt vault */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
            <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: t.mut(0.5) }}>Receipt vault</span>
            <span style={{ fontFamily: t.fontLabel, fontSize: 11, letterSpacing: '.04em', color: t.mut(0.4) }}>{vals.receiptCount}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(132px,1fr))', gap: 12 }}>
            {vals.receipts.map((r, i) => (
              <div key={i} style={{ aspectRatio: '3 / 4', borderRadius: t.motif.chipRadius, overflow: 'hidden', position: 'relative', background: t.decor.receiptPattern, border: `1px solid ${t.C.hairline}` }}>
                <div style={{ position: 'absolute', left: 10, top: 10, right: 10, height: 6, borderRadius: 2, background: t.mut(0.14) }} />
                <div style={{ position: 'absolute', left: 10, top: 23, width: '60%', height: 5, borderRadius: 2, background: t.mut(0.1) }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '9px 10px', background: `linear-gradient(180deg, transparent, ${t.C.container})`, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.1em', color: t.C.teal }}>{r.when}</span>
                  <span style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 13, color: t.C.on }}>{r.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
