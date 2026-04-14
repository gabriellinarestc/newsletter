export const C = {
  o: '#F5761A', t: '#0D8F87', pk: '#E8547A', y: '#F5C518', g: '#22D3A5', p: '#A78BFA',
  bg: '#FFF8F0', bg2: '#FFFFFF', bg3: '#FFF0E0',
  ink: '#1C1008', ink2: '#7A5C48', ink3: '#B89880',
  peach: '#FFE8D6', mint: '#D5F2EF', lemon: '#FEF5CC',
  border: 'rgba(28,16,8,0.09)',
}

export const fh = "'Fraunces',serif"
export const fb = "'Plus Jakarta Sans',sans-serif"
export const fm = "'JetBrains Mono',monospace"

export function Wave({ col }) {
  const c = col || C.o
  return (
    <svg width="80" height="12" viewBox="0 0 80 12" style={{ display: 'block', margin: '8px 0' }}>
      <path d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function SLabel({ n, label, col }) {
  const c = col || C.o
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{ background: c, color: '#fff', fontFamily: fm, fontWeight: 700, fontSize: 10, padding: '3px 10px', borderRadius: 100, letterSpacing: 1 }}>§{n}</div>
      <div style={{ fontFamily: fm, fontSize: 10, color: C.ink3, letterSpacing: 2, textTransform: 'uppercase' }}>{label}</div>
    </div>
  )
}

export function Photo({ src, label, height, accent, radius }) {
  const a = accent || C.o
  if (src) {
    return (
      <div style={{ height: height || 220, borderRadius: radius || 14, overflow: 'hidden', flexShrink: 0 }}>
        <img src={src} alt={label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    )
  }
  return (
    <div style={{
      height: height || 220, borderRadius: radius || 14, overflow: 'hidden', flexShrink: 0, position: 'relative',
      background: `linear-gradient(135deg,${a}22 0%,${a}08 100%)`,
      border: `2px dashed ${a}50`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      <div style={{ fontSize: 36 }}>📸</div>
      <div style={{ fontSize: 12, fontFamily: fm, color: a, fontWeight: 700, textAlign: 'center', padding: '0 12px', opacity: 0.7, lineHeight: 1.4 }}>{label || 'PHOTO'}</div>
    </div>
  )
}

export const PALETTE = [
  { label: 'Orange', value: '#F5761A' },
  { label: 'Teal', value: '#0D8F87' },
  { label: 'Pink', value: '#E8547A' },
  { label: 'Yellow', value: '#F5C518' },
  { label: 'Green', value: '#22D3A5' },
  { label: 'Purple', value: '#A78BFA' },
  { label: 'Cyan', value: '#0891B2' },
  { label: 'Red', value: '#DC2626' },
  { label: 'Rose', value: '#E11D48' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Sky', value: '#06B6D4' },
  { label: 'Emerald', value: '#10B981' },
  { label: 'Violet', value: '#8B5CF6' },
  { label: 'Tangerine', value: '#F97316' },
  { label: 'Deep Purple', value: '#7C3AED' },
  { label: 'Gold', value: '#C47D00' },
]
