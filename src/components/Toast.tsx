import { useTheme } from '@/lib/theme'

export function Toast({ message }: { message: string }) {
  const t = useTheme()
  if (!message) return null
  return (
    <div
      style={{
        display: 'flex', position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)',
        alignItems: 'center', background: t.C.container, border: `1px solid ${t.decor.accentSoftBorder}`,
        color: t.C.gold, fontFamily: t.fontLabel, fontWeight: 600, fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase',
        padding: '12px 20px', borderRadius: t.motif.pillRadius, backdropFilter: 'blur(8px)', zIndex: 90,
      }}
    >
      {message}
    </div>
  )
}
