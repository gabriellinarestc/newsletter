import React from 'react'
import { C, fh, fb, fm, Wave, SLabel } from '../../theme.jsx'

export default function SlideTacoDouble({ data }) {
  const { prizeText, winners } = data

  // Parse prizeText: replace **text** with bold
  function renderPrizeText(text) {
    const parts = text.split(/\*\*(.*?)\*\*/)
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: C.o }}>{part}</strong>
        : <React.Fragment key={i}>{part}</React.Fragment>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', padding: '20px 28px', gap: 18, background: C.bg }}>
      {/* Left sidebar */}
      <div style={{ width: 190, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
        <SLabel n={3} label="Taco Winners" col={C.pk} />
        <div style={{ fontFamily: fh, fontSize: 44, fontWeight: 900, color: C.ink, lineHeight: 0.9 }}>
          {'\uD83C\uDF2E'}<br />
          <span style={{ color: C.o, fontStyle: 'italic' }}>{winners[0]?.month || 'July'}</span><br />
          & {winners[1]?.month || 'August'}
        </div>
        <Wave col={C.pk} />
        <div style={{ fontFamily: fb, fontSize: 13, color: C.ink2, lineHeight: 1.7 }}>
          {renderPrizeText(prizeText)}
        </div>
      </div>

      {/* Winner cards */}
      {winners.map((w, i) => (
        <div key={i} style={{
          flex: 1, background: w.bg, border: `2px solid ${w.color}40`, borderRadius: 18,
          padding: 18, display: 'flex', flexDirection: 'column', gap: 12
        }}>
          <div style={{
            background: w.color, color: '#fff', fontFamily: fm, fontSize: 10, fontWeight: 700,
            padding: '3px 12px', borderRadius: 100, alignSelf: 'flex-start', letterSpacing: 1
          }}>
            {w.month.toUpperCase()} {w.year}
          </div>

          {/* Photo area */}
          <div style={{
            flex: 1, borderRadius: 12, overflow: 'hidden',
            border: `2px dashed ${w.color}50`,
            background: `linear-gradient(135deg,${w.color}22,${w.color}08)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            {w.image ? (
              <img src={w.image} alt={w.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <div style={{ fontSize: 48 }}>{'\uD83D\uDCF8'}</div>
                <div style={{ fontSize: 12, fontFamily: fm, color: w.color, fontWeight: 700, opacity: 0.7, textAlign: 'center' }}>
                  {w.name.toUpperCase()}
                </div>
              </>
            )}
          </div>

          {/* Name + count */}
          <div style={{ textAlign: 'center', paddingTop: 2 }}>
            <div style={{ fontFamily: fh, fontSize: 20, fontWeight: 900, color: C.ink }}>{w.name}</div>
            <div style={{ fontFamily: fh, fontSize: 72, fontWeight: 900, color: w.color, lineHeight: 1, fontStyle: 'italic' }}>{w.count}</div>
            <div style={{ fontFamily: fb, fontSize: 13, color: C.ink2 }}>tacos this month!</div>
          </div>
        </div>
      ))}
    </div>
  )
}
