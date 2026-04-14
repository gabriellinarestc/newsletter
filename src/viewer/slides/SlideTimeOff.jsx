import React from 'react'
import { C, fh, fb, fm, Wave, SLabel, Photo } from '../../theme.jsx'

export default function SlideTimeOff({ data }) {
  const { person, destination, flag, color, quote, facts, images, photoCount } = data
  const thumbCount = Math.min((photoCount || 4) - 1, 4)

  return (
    <div style={{ flex: 1, display: 'flex', padding: '18px 26px', gap: 18, background: C.bg }}>
      {/* Left column - photos */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Main photo */}
        <div style={{
          flex: 1, borderRadius: 16, overflow: 'hidden',
          border: `2px dashed ${color}50`,
          background: `linear-gradient(135deg,${color}22,${color}08)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10
        }}>
          {images && images.length > 0 ? (
            <img src={images[0]} alt={person} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <>
              <div style={{ fontSize: 60 }}>{'\uD83D\uDCF8'}</div>
              <div style={{ fontSize: 13, fontFamily: fm, color: color, fontWeight: 700, opacity: 0.7, textAlign: 'center' }}>
                {person.toUpperCase()}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail row */}
        {thumbCount > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${thumbCount},1fr)`, gap: 7, flexShrink: 0 }}>
            {Array.from({ length: thumbCount }).map((_, i) => {
              const imgSrc = images && images.length > i + 1 ? images[i + 1] : null
              return (
                <Photo key={i} src={imgSrc} label={'\uD83D\uDCF8'} height={80} accent={color} radius={10} />
              )
            })}
          </div>
        )}
      </div>

      {/* Right column - content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SLabel n={6} label="Time Off · Travel Stories" col={color} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontFamily: fh, fontSize: 34, fontWeight: 900, color: color, fontStyle: 'italic', lineHeight: 1 }}>{person}</div>
          <div style={{ fontSize: 24 }}>{flag}</div>
        </div>

        <div style={{ fontFamily: fm, fontSize: 11, color: C.ink3, marginTop: -4 }}>{destination}</div>

        <Wave col={color} />

        {/* Quote card */}
        <div style={{
          flex: 1, background: `${color}14`, border: `2px solid ${color}28`,
          borderRadius: 14, padding: 16, overflow: 'auto'
        }}>
          <div style={{ fontFamily: fh, fontSize: 15, fontWeight: 700, fontStyle: 'italic', color: C.ink, lineHeight: 1.8 }}>
            {quote}
          </div>
        </div>

        {/* Fact tags */}
        {facts && facts.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
            {facts.map((f, i) => (
              <span key={i} style={{
                background: `${color}18`, border: `1.5px solid ${color}40`,
                color: color, fontFamily: fb, fontSize: 11, fontWeight: 700,
                padding: '4px 11px', borderRadius: 100
              }}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
