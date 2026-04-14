import React from 'react'
import { C, fh, fb, fm, SLabel, Photo } from '../../theme.jsx'

export default function SlideCulture({ data, meta }) {
  const { gatherings } = data

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '18px 28px 14px', gap: 10, background: C.bg }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <SLabel n={2} label="Department Updates · Culture Team" col={C.t} />
      </div>

      <div style={{ fontFamily: fh, fontSize: 34, fontWeight: 900, color: C.ink, lineHeight: 1, marginBottom: 8 }}>
        <span style={{ color: C.t, fontStyle: 'italic' }}>Team Gatherings</span>
        {' '}{'\uD83C\uDF7D\uFE0F'} {'\u2014'} {meta.quarter} {meta.year}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, flex: 1 }}>
        {gatherings.map((g, i) => (
          <div key={i} style={{
            background: g.bg, border: `2px solid ${g.color}30`, borderRadius: 14,
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}>
            <Photo src={g.image} label={g.name} height={120} accent={g.color} radius={0} />
            <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ fontFamily: fh, fontSize: 15, fontWeight: 900, color: C.ink, lineHeight: 1.1 }}>
                {g.flag} {g.name}
              </div>
              <div style={{
                display: 'inline-block', background: g.color, color: '#fff',
                fontFamily: fm, fontSize: 9, fontWeight: 700, padding: '2px 8px',
                borderRadius: 100, marginTop: 2, alignSelf: 'flex-start'
              }}>
                {g.category}
              </div>
              <div style={{ fontFamily: fb, fontSize: 12, color: C.ink2, lineHeight: 1.5, flex: 1, marginTop: 4 }}>
                &ldquo;{g.quote}&rdquo;
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
