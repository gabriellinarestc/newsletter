import React from 'react'
import { C, fh, fb, fm } from '../../theme.jsx'

export default function SlideHighlights({ data, meta }) {
  const { items, tacoChampions, destinations } = data

  return (
    <div style={{ flex: 1, display: 'flex', padding: '20px 28px', gap: 20, background: C.bg }}>
      {/* Left column */}
      <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontFamily: fm, fontSize: 10, color: C.t, letterSpacing: 2 }}>
          {meta.quarter} {meta.year} RECAP
        </div>
        <div style={{ fontFamily: fh, fontSize: 38, fontWeight: 900, color: C.ink, lineHeight: 0.95, marginBottom: 4 }}>
          At a<br />
          <span style={{ color: C.o, fontStyle: 'italic' }}>Glance</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {items.map((it, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px',
              background: C.bg2, borderRadius: 10, border: `1.5px solid ${C.border}`
            }}>
              <div style={{ fontSize: 18, width: 28, textAlign: 'center', flexShrink: 0 }}>{it.emoji}</div>
              <div>
                <div style={{ fontFamily: fb, fontSize: 12, fontWeight: 700, color: C.ink }}>{it.title}</div>
                <div style={{ fontFamily: fb, fontSize: 11, color: C.ink2 }}>{it.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div style={{ width: 230, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Taco Champions card */}
        <div style={{
          background: C.bg2, borderRadius: 16, border: `2px solid ${C.o}30`, padding: 14, overflow: 'hidden'
        }}>
          <div style={{ fontFamily: fh, fontSize: 20, fontWeight: 900, color: C.o, fontStyle: 'italic', marginBottom: 8 }}>
            Taco {'\uD83C\uDF2E'} Champions
          </div>
          {tacoChampions.map((w, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '7px 0', borderBottom: i < tacoChampions.length - 1 ? `1.5px solid ${C.border}` : 'none'
            }}>
              <div>
                <div style={{ fontFamily: fm, fontSize: 9, color: C.ink3 }}>{w.month}</div>
                <div style={{ fontFamily: fb, fontSize: 13, fontWeight: 700, color: C.ink }}>{w.name}</div>
              </div>
              <div style={{ fontFamily: fh, fontSize: 28, fontWeight: 900, color: w.color, fontStyle: 'italic' }}>{w.count}</div>
            </div>
          ))}
        </div>

        {/* Around the World card */}
        <div style={{ flex: 1, background: C.mint, borderRadius: 16, border: `2px solid ${C.t}30`, padding: 14 }}>
          <div style={{ fontFamily: fh, fontSize: 17, fontWeight: 900, color: C.t, fontStyle: 'italic', marginBottom: 8 }}>
            Around the World
          </div>
          {destinations.map((dest, i) => (
            <div key={i} style={{
              fontFamily: fb, fontSize: 12, color: C.ink, padding: '3px 0',
              borderBottom: i < destinations.length - 1 ? `1px solid ${C.t}20` : 'none'
            }}>
              {dest}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
