import { useTheme } from '@/lib/theme'
import { FlipClock } from '@/components/FlipClock'
import { useBreakpoint } from '@/lib/useBreakpoint'
import type { CMode, CStyle, FreedomVals, UnitCard } from '@/lib/freedom'

function Segmented<T extends string>({
  options, value, onChange,
}: { options: Array<{ key: T; label: string }>; value: T; onChange: (v: T) => void }) {
  const t = useTheme()
  return (
    <div style={{ display: 'inline-flex', border: `1px solid ${t.C.hairline}`, borderRadius: t.motif.pillRadius, padding: 3, gap: 3, background: t.mut(0.03) }}>
      {options.map((o) => {
        const active = value === o.key
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            style={{
              fontFamily: t.fontLabel, fontWeight: 600, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase',
              padding: '8px 16px', border: 'none', borderRadius: Math.max(1, t.motif.pillRadius - 1), cursor: 'pointer',
              background: t.bgseg(active), color: t.seg(active),
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
  const t = useTheme()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
      {items.map((u) => (
        <div key={u.name} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 18px', borderRadius: t.motif.chipRadius, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
          <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 22, color: accent }}>{u.count}</div>
          <div style={{ fontFamily: t.fontBody, fontWeight: 600, fontSize: 13.5, color: t.C.on, lineHeight: 1.2 }}>{u.name}</div>
          <div style={{ fontFamily: t.fontLabel, fontSize: 10.5, letterSpacing: '.01em', color: t.mut(0.42) }}>{u.sub}</div>
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
  const t = useTheme()
  const isMobile = useBreakpoint() === 'mobile'

  return (
    <div style={{ padding: isMobile ? '24px 16px 44px' : '30px 32px 56px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 6 }}>
          <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: t.mut(0.5), marginBottom: 8 }}>Your last payment lands</div>
          <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: isMobile ? 30 : 40, letterSpacing: '.01em', textTransform: 'uppercase', ...t.goldText, marginBottom: 18 }}>{vals.endLabel}</div>
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
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 'clamp(26px,6vw,64px)', letterSpacing: '.04em', color: t.C.on, textAlign: 'center', maxWidth: '100%' }}>{vals.straightStr}</div>
            <div style={{ display: 'flex', gap: 'clamp(14px,4vw,52px)', fontFamily: t.fontLabel, fontWeight: 600, fontSize: 10, letterSpacing: '.14em', color: t.mut(0.42), textTransform: 'uppercase' }}>
              <span>Yr</span><span>Mo</span><span>Dy</span><span>Hr</span><span>Min</span><span>Sec</span>
            </div>
          </div>
        )}

        {cstyle === 'minimal' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 24 }}>
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 'clamp(96px,15vw,180px)', lineHeight: 0.85, ...t.goldText }}>{vals.daysToGo}</div>
            <div style={{ fontFamily: t.fontLabel, fontWeight: 600, fontSize: 13, letterSpacing: '.26em', textTransform: 'uppercase', color: t.mut(0.5) }}>Days until parole</div>
          </div>
        )}

        <div style={{ maxWidth: 620, margin: '34px auto 0' }}>
          <div style={{ height: 7, borderRadius: 2, background: t.mut(0.09), overflow: 'hidden' }}>
            <div style={{ height: '100%', width: vals.pctWidth, background: t.GOLD, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: t.mut(0.5) }}>
            <span>{vals.daysServed} served</span>
            <span style={{ color: t.C.gold }}>{vals.pctText}</span>
            <span>{vals.daysToGo} to go</span>
          </div>
        </div>

        <div style={{ height: 1, background: t.C.hairline, margin: '36px 0 24px' }} />

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <Segmented<CMode>
            options={[{ key: 'straight', label: 'Straight' }, { key: 'humor', label: 'Humor' }, { key: 'nerd', label: 'Nerd' }]}
            value={cmode}
            onChange={onSetMode}
          />
        </div>

        {cmode === 'straight' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'repeat(3,minmax(0,1fr))', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: 18, borderRadius: t.motif.chipRadius, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
              <span style={{ fontFamily: t.fontLabel, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: t.mut(0.55) }}>Days served</span>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 24, color: t.C.on }}>{vals.daysServed}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: 18, borderRadius: t.motif.chipRadius, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
              <span style={{ fontFamily: t.fontLabel, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: t.mut(0.55) }}>Days to go</span>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 24, color: t.C.gold }}>{vals.daysToGo}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: 18, borderRadius: t.motif.chipRadius, background: t.C.containerLow, border: `1px solid ${t.C.hairline}` }}>
              <span style={{ fontFamily: t.fontLabel, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: t.mut(0.55) }}>Sentence complete</span>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 24, color: t.C.on }}>{vals.pctText}</span>
            </div>
          </div>
        )}

        {cmode === 'humor' && <UnitGrid items={vals.humor} accent={t.C.teal} />}
        {cmode === 'nerd' && <UnitGrid items={vals.nerd} accent={t.C.gold} />}

        <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center' }}>
          <button onClick={onShare} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 13, letterSpacing: '.05em', textTransform: 'uppercase', padding: '13px 26px', border: 'none', borderRadius: t.motif.pillRadius, cursor: 'pointer', ...t.goldButton }}>
            Share this milestone
          </button>
        </div>
      </div>
    </div>
  )
}
