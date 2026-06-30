import { fontLabel } from '@/lib/tokens'

export function Toast({ message }: { message: string }) {
  if (!message) return null
  return (
    <div
      style={{
        display: 'flex', position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)',
        alignItems: 'center', background: 'rgba(8,16,44,.95)', border: '1px solid rgba(151,247,246,.3)',
        color: '#97F7F6', fontFamily: fontLabel, fontWeight: 700, fontSize: 12, letterSpacing: '.05em',
        padding: '12px 20px', borderRadius: 11, backdropFilter: 'blur(8px)', zIndex: 90,
      }}
    >
      {message}
    </div>
  )
}
