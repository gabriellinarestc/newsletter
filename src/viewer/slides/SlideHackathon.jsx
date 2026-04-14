import React from 'react'
import { C, fh, fb, fm, Wave, SLabel, Photo } from '../../theme.jsx'

const MEDALS = { '1st': '\uD83E\uDD47', '2nd': '\uD83E\uDD48', '3rd': '\uD83E\uDD49' }

export default function SlideHackathon({ data }) {
  const { description, stats, podium, image, congratsMessage } = data
  // Sort podium for display: 2nd, 1st, 3rd
  const displayOrder = [
    podium.find(p => p.place === '2nd'),
    podium.find(p => p.place === '1st'),
    podium.find(p => p.place === '3rd'),
  ].filter(Boolean)

  return (
    <div style={{ flex: 1, display: 'flex', padding: '20px 28px', gap: 20, background: C.bg }}>
      {/* Left column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SLabel n={1} label="Company Updates" col={C.o} />

        <div style={{ fontFamily: fh, fontSize: 40, fontWeight: 900, color: C.ink, lineHeight: 0.95 }}>
          Hackathon<br />
          <span style={{ color: C.o, fontStyle: 'italic' }}>2025 {'\uD83D\uDE80'}</span>
        </div>

        <Wave col={C.o} />

        <div style={{ fontFamily: fb, fontSize: 13, color: C.ink2, lineHeight: 1.7, maxWidth: 360 }}>
          {description}
        </div>

        {/* Stats grid */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: C.bg2, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '8px 12px', textAlign: 'center' }}>
              <div style={{ fontFamily: fh, fontSize: 20, fontWeight: 900, color: C.o, fontStyle: 'italic' }}>{s.value}</div>
              <div style={{ fontFamily: fm, fontSize: 9, color: C.ink3, letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Podium */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flex: 1, marginTop: 6 }}>
          {displayOrder.map((p, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontSize: 24 }}>{MEDALS[p.place]}</div>
              <div style={{
                width: '100%', height: p.height, background: `${p.color}18`, border: `2px solid ${p.color}50`,
                borderRadius: '10px 10px 0 0', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4, padding: '0 6px'
              }}>
                <div style={{ fontFamily: fb, fontSize: 11, fontWeight: 700, color: C.ink, textAlign: 'center', lineHeight: 1.3 }}>
                  &ldquo;{p.name}&rdquo;
                </div>
                <div style={{ fontFamily: fh, fontSize: 16, fontWeight: 900, color: p.color, fontStyle: 'italic' }}>{p.prize}</div>
              </div>
              <div style={{
                width: '100%', background: p.color, textAlign: 'center',
                fontFamily: fm, fontSize: 9, color: '#fff', fontWeight: 700,
                padding: '3px 0', borderRadius: '0 0 6px 6px'
              }}>
                {p.place.toUpperCase()} PLACE
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
        <Photo src={image} label={'HACKATHON\n2025 TEAMS'} height={240} accent={C.o} radius={16} />
        <div style={{ background: C.peach, borderRadius: 12, border: `2px solid ${C.o}30`, padding: 12, textAlign: 'center' }}>
          <div style={{ fontFamily: fh, fontSize: 13, fontWeight: 700, color: C.ink, fontStyle: 'italic' }}>
            {'\uD83C\uDF89'} Congrats to all {stats[0]?.value || '6'} teams!
          </div>
          <div style={{ fontFamily: fb, fontSize: 11, color: C.ink2, marginTop: 4 }}>
            {congratsMessage}
          </div>
        </div>
      </div>
    </div>
  )
}
