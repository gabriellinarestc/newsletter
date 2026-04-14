import React from 'react'
import { C, fh, fb, fm, Wave } from '../../theme.jsx'

export default function SlideCover({ data, meta }) {
  const { quarter, year, months, tagline, topicPills } = meta

  return (
    <div style={{ flex: 1, display: 'flex', background: C.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Orange strip */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '43%', height: '100%',
        background: C.o, zIndex: 1,
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', left: -80, top: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ position: 'absolute', left: 40, bottom: -90, width: 220, height: 220, borderRadius: '50%', background: 'rgba(0,0,0,0.09)' }} />

        {/* Top label */}
        <div style={{ position: 'absolute', left: 20, top: 24, fontFamily: fm, fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>
          INTERNAL {'\u00B7'} {quarter} {year}
        </div>

        {/* Bottom info */}
        <div style={{
          position: 'absolute', bottom: 24, left: 20, right: 16,
          color: 'rgba(255,255,255,0.85)', fontFamily: fb, fontSize: 12, lineHeight: 1.7
        }}>
          {months} {year}<br />
          <span style={{ fontFamily: fm, fontSize: 10, opacity: 0.7 }}>tangocode.com</span>
        </div>
      </div>

      {/* Right panel content */}
      <div style={{
        position: 'absolute', left: '43%', right: 0, top: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '32px 40px 32px 44px',
        zIndex: 1, gap: 8
      }}>
        <div style={{ fontFamily: fm, fontSize: 11, color: C.o, letterSpacing: 2, marginBottom: 4 }}>
          {'<newsletter />'}
        </div>

        <div style={{ fontFamily: fh, fontSize: 52, fontWeight: 900, color: C.ink, lineHeight: 0.93, marginBottom: 4 }}>
          <span style={{ color: C.o, fontStyle: 'italic' }}>Between</span><br />
          The<br />
          Lines
        </div>

        <Wave col={C.t} />

        <div style={{ fontFamily: fb, fontSize: 14, color: C.ink2, lineHeight: 1.7, maxWidth: 280 }}>
          {tagline}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {topicPills.map((pill, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: C.peach, borderRadius: 100, padding: '5px 12px',
              border: `1.5px solid ${C.o}30`
            }}>
              <span style={{ fontSize: 13 }}>{pill.emoji}</span>
              <span style={{ fontFamily: fb, fontSize: 11, fontWeight: 700, color: C.o }}>{pill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
