import React from 'react'
import { C, fh, fb, fm } from '../../theme.jsx'

export default function SlideIndex({ data, meta, goTo, indexEntries }) {
  const { quarter, year, monthsShort } = meta

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.bg, padding: '20px 28px 16px', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div style={{ fontFamily: fh, fontSize: 36, fontWeight: 900, color: C.ink, fontStyle: 'italic' }}>What's inside</div>
        <div style={{ fontFamily: fm, fontSize: 10, color: C.ink3, letterSpacing: 2 }}>
          {quarter} {year} {'\u00B7'} {monthsShort}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, flex: 1 }}>
        {indexEntries.map((entry, idx) => (
          <button
            key={idx}
            onClick={() => goTo(entry.sectionIndex)}
            style={{
              background: entry.bg, border: `2px solid ${entry.color}30`, borderRadius: 16,
              padding: '14px 16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 6,
              transition: 'transform 0.15s,box-shadow 0.15s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${entry.color}28` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            <div style={{ fontSize: 28 }}>{entry.icon}</div>
            <div style={{ fontFamily: fh, fontSize: 18, fontWeight: 900, color: C.ink, lineHeight: 1.1 }}>{entry.title}</div>
            <div style={{ fontFamily: fb, fontSize: 11, color: C.ink2, lineHeight: 1.4 }}>{entry.subtitle}</div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ background: entry.color, color: '#fff', fontFamily: fm, fontSize: 8, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>
                {'0' + (idx + 1)}
              </div>
              <div style={{ fontSize: 18, color: entry.color }}>{'\u2192'}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
