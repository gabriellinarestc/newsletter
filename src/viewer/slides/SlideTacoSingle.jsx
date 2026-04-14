import React from 'react'
import { C, fh, fb, fm, SLabel } from '../../theme.jsx'

export default function SlideTacoSingle({ data }) {
  const { month, year, winner, philosophy } = data

  // Render philosophy body with "deposits" in teal bold and "withdrawals" in pink bold
  function renderBody(text) {
    // Split on paragraph breaks
    const paragraphs = text.split('\n\n')
    return paragraphs.map((para, pi) => {
      // Replace key words with styled spans
      const parts = []
      let remaining = para
      const replacements = [
        { word: 'deposits', color: C.t },
        { word: 'withdrawals', color: C.pk },
      ]
      // Simple approach: split by known words
      let idx = 0
      while (remaining.length > 0) {
        let earliest = -1
        let match = null
        for (const rep of replacements) {
          const pos = remaining.toLowerCase().indexOf(rep.word.toLowerCase())
          if (pos !== -1 && (earliest === -1 || pos < earliest)) {
            earliest = pos
            match = rep
          }
        }
        if (earliest === -1) {
          parts.push(<React.Fragment key={idx++}>{remaining}</React.Fragment>)
          break
        }
        if (earliest > 0) {
          parts.push(<React.Fragment key={idx++}>{remaining.slice(0, earliest)}</React.Fragment>)
        }
        parts.push(
          <strong key={idx++} style={{ color: match.color }}>{remaining.slice(earliest, earliest + match.word.length)}</strong>
        )
        remaining = remaining.slice(earliest + match.word.length)
      }
      return (
        <React.Fragment key={pi}>
          {pi > 0 && <><br /><br /></>}
          {parts}
        </React.Fragment>
      )
    })
  }

  // Render quote with "Ever." in orange
  function renderQuote(text) {
    const everIdx = text.indexOf('Ever.')
    if (everIdx === -1) return text
    return (
      <>
        {text.slice(0, everIdx)}
        <span style={{ color: C.o }}>Ever.</span>
        {text.slice(everIdx + 5)}
      </>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', padding: '20px 28px', gap: 20, background: C.bg }}>
      {/* Left column - winner card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SLabel n={3} label={`Taco Winner \u00B7 ${month}`} col={C.pk} />

        <div style={{
          flex: 1, background: '#FFE0E8', border: `2px solid ${C.pk}40`, borderRadius: 18,
          padding: 18, display: 'flex', flexDirection: 'column', gap: 10
        }}>
          <div style={{
            background: C.pk, color: '#fff', fontFamily: fm, fontSize: 10, fontWeight: 700,
            padding: '3px 12px', borderRadius: 100, alignSelf: 'flex-start', letterSpacing: 1
          }}>
            {month.toUpperCase()} {year}
          </div>

          {/* Photo area */}
          <div style={{
            flex: 1, borderRadius: 12, overflow: 'hidden',
            border: `2px dashed ${C.pk}50`,
            background: `linear-gradient(135deg,${C.pk}22,${C.pk}08)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            {winner.image ? (
              <img src={winner.image} alt={winner.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <div style={{ fontSize: 52 }}>{'\uD83D\uDCF8'}</div>
                <div style={{ fontSize: 13, fontFamily: fm, color: C.pk, fontWeight: 700, opacity: 0.7 }}>
                  {winner.name.toUpperCase()}
                </div>
              </>
            )}
          </div>

          {/* Name + count */}
          <div style={{ textAlign: 'center', paddingTop: 4 }}>
            <div style={{ fontFamily: fh, fontSize: 26, fontWeight: 900, color: C.ink }}>{winner.name}</div>
            <div style={{ fontFamily: fh, fontSize: 96, fontWeight: 900, color: C.pk, lineHeight: 1, fontStyle: 'italic' }}>{winner.count}</div>
            <div style={{ fontFamily: fb, fontSize: 14, color: C.ink2 }}>tacos this month!</div>
          </div>
        </div>
      </div>

      {/* Right column - philosophy */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontFamily: fm, fontSize: 10, color: C.o, letterSpacing: 2 }}>FROM HEYTACO</div>

        <div style={{
          flex: 1, background: C.bg2, border: `2px solid ${C.border}`, borderRadius: 18, padding: 20,
          display: 'flex', flexDirection: 'column', gap: 10
        }}>
          <div style={{ fontFamily: fh, fontSize: 24, fontWeight: 900, color: C.ink, fontStyle: 'italic', lineHeight: 1.2 }}>
            &ldquo;{renderQuote(philosophy.quote)}&rdquo;
          </div>

          <div style={{ fontFamily: fb, fontSize: 11, color: C.ink3 }}>
            {'\u2014'} {philosophy.author}
          </div>

          <div style={{ height: '1.5px', background: C.border, margin: '4px 0' }} />

          <div style={{ fontFamily: fb, fontSize: 13, color: C.ink2, lineHeight: 1.75, flex: 1 }}>
            {renderBody(philosophy.body)}
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {philosophy.tags.map((tag, i) => (
              <span key={i} style={{
                background: C.peach, color: C.o, fontSize: 11, fontFamily: fb,
                fontWeight: 700, padding: '4px 10px', borderRadius: 100,
                border: `1.5px solid ${C.o}30`
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
