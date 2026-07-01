import { C, goldText, goldButton, fontDisplay, fontBody, fontLabel, mut, seg, bgseg } from '@/lib/tokens'
import { FlipClock } from '@/components/FlipClock'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { CMode, CStyle, FreedomVals, UnitCard } from '@/lib/freedom'

const GOLD_BAR = 'linear-gradient(90deg,#FFE4AF,#FFC107)'

function Segmented<T extends string>({
  options, value, onChange,
}: { options: Array<{ key: T; label: string }>; value: T; onChange: (v: T) => void }) {
  return (
    <div style={{ display: 'inline-flex', border: '1px solid rgba(221,225,255,.12)', borderRadius: 11, padding: 3, gap: 3, background: 'rgba(221,225,255,.03)' }}>
      {options.map((o) => {
        const active = value === o.key
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            style={{
              fontFamily: fontLabel, fontWeight: 700, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase',
              padding: '8px 16px', border: 'none', borderRadius: 8, cursor: 'pointer',
              background: bgseg(active), color: seg(active),
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

function UnitGrid({ items, accent }: { items: UnitCard[]; accent: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
      {items.map((u) => (
        <div key={u.name} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 18px', borderRadius: 14, background: C.containerLow }}>
          <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, color: accent }}>{u.count}</div>
          <div style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 13.5, color: C.on, lineHeight: 1.2 }}>{u.name}</div>
          <div style={{ fontFamily: fontBody, fontSize: 10.5, color: mut(0.4) }}>{u.sub}</div>
        </div>
      ))}
    </div>
  )
}

export function Countdown({
  vals, cstyle, cmode, onSetStyle, onSetMode, onShare,
}: {
  vals: FreedomVals
  cstyle: CStyle
  cmode: CMode
  onSetStyle: (s: CStyle) => void
  onSetMode: (m: CMode) => void
  onShare: () => void
}) {
  const isMobile = useBreakpoint() === 'mobile'

  return (
    <div style={{ padding: isMobile ? '24px 16px 44px' : '30px 32px 56px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 6 }}>
          <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: mut(0.5), marginBottom: 8 }}>Your last payment lands</div>
          <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: isMobile ? 26 : 32, letterSpacing: '-.01em', ...goldText, marginBottom: 18 }}>{vals.endLabel}</div>
          <Segmented<CStyle>
            options={[{ key: 'flip', label: 'Flip' }, { key: 'straight', label: 'Straight' }, { key: 'minimal', label: 'Minimal' }]}
            value={cstyle}
            onChange={onSetStyle}
          />
        </div>

        {cstyle === 'flip' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 'clamp(7px,1.2vw,16px)', flexWrap: 'wrap', marginTop: 26 }}>
            <FlipClock vals={vals} size="md" />
          </div>
        )}

        {cstyle === 'straight' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 30 }}>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 'clamp(26px,6vw,64px)', letterSpacing: '.04em', color: C.on, textAlign: 'center', maxWidth: '100%' }}>{vals.straightStr}</div>
            <div style={{ display: 'flex', gap: 'clamp(14px,4vw,52px)', fontFamily: fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.14em', color: mut(0.42), textTransform: 'uppercase' }}>
              <span>Yr</span><span>Mo</span><span>Dy</span><span>Hr</span><span>Min</span><span>Sec</span>
            </div>
          </div>
        )}

        {cstyle === 'minimal' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 24 }}>
            <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 'clamp(96px,15vw,180px)', lineHeight: 0.85, ...goldText }}>{vals.daysToGo}</div>
            <div style={{ fontFamily: fontLabel, fontWeight: 700, fontSize: 13, letterSpacing: '.26em', textTransform: 'uppercase', color: mut(0.5) }}>Days to freedom</div>
          </div>
        )}

        <div style={{ maxWidth: 620, margin: '34px auto 0' }}>
          <div style={{ height: 7, borderRadius: 6, background: 'rgba(221,225,255,.09)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: vals.pctWidth, background: GOLD_BAR, borderRadius: 6 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9, fontFamily: fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: mut(0.5) }}>
            <span>{vals.daysServed} served</span>
            <span style={{ color: C.teal }}>{vals.pctText}</span>
            <span>{vals.daysToGo} to go</span>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(221,225,255,.1)', margin: '36px 0 24px' }} />

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <Segmented<CMode>
            options={[{ key: 'straight', label: 'Straight' }, { key: 'humor', label: 'Humor' }, { key: 'nerd', label: 'Nerd' }]}
            value={cmode}
            onChange={onSetMode}
          />
        </div>

        {cmode === 'straight' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'repeat(3,minmax(0,1fr))', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: 18, borderRadius: 14, background: C.containerLow }}>
              <span style={{ fontFamily: fontBody, fontSize: 12.5, color: mut(0.55) }}>Days served</span>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 24, color: C.on }}>{vals.daysServed}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: 18, borderRadius: 14, background: C.containerLow }}>
              <span style={{ fontFamily: fontBody, fontSize: 12.5, color: mut(0.55) }}>Days to go</span>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 24, color: C.teal }}>{vals.daysToGo}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: 18, borderRadius: 14, background: C.containerLow }}>
              <span style={{ fontFamily: fontBody, fontSize: 12.5, color: mut(0.55) }}>Sentence complete</span>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 24, color: C.on }}>{vals.pctText}</span>
            </div>
          </div>
        )}

        {cmode === 'humor' && <UnitGrid items={vals.humor} accent={C.teal} />}
        {cmode === 'nerd' && <UnitGrid items={vals.nerd} accent={C.gold} />}

        <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center' }}>
          <button onClick={onShare} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: fontLabel, fontWeight: 700, fontSize: 13, letterSpacing: '.04em', padding: '13px 26px', border: 'none', borderRadius: 11, cursor: 'pointer', ...goldButton, boxShadow: '0 8px 22px rgba(255,193,7,.18)' }}>
            Share this milestone
          </button>
        </div>
      </div>
    </div>
  )
}
