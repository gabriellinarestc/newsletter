import React from 'react'
import { C, fh, fb, fm, Wave } from '../../theme.jsx'

export default function SlideClosing({ data, meta }) {
  const { message, closingPills } = data
  const { quarter, year, months } = meta

  return (
    <div style={{ flex: 1, display: 'flex', background: C.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Teal left panel */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', background: C.t, overflow: 'hidden' }} />

      {/* Teal decorative circles */}
      <div style={{ position: 'absolute', left: -80, top: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', left: 40, bottom: -90, width: 240, height: 240, borderRadius: '50%', background: 'rgba(0,0,0,0.08)' }} />

      {/* Left text content */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '50%', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '40px 44px', zIndex: 1, gap: 10
      }}>
        <div style={{ fontSize: 48, marginBottom: 4 }}>{'\uD83C\uDF89'}</div>
        <div style={{ fontFamily: fh, fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 0.9 }}>
          See you<br />next<br />
          <span style={{ color: C.lemon, fontStyle: 'italic' }}>quarter!</span>
        </div>
        <Wave col="rgba(255,255,255,0.5)" />
        <div style={{ fontFamily: fb, fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
          {message}
        </div>
      </div>

      {/* Right side content */}
      <div style={{
        position: 'absolute', left: '50%', right: 0, top: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '40px 44px', zIndex: 1, gap: 14
      }}>
        <div style={{ fontFamily: fm, fontSize: 11, color: C.o, letterSpacing: 2 }}>
          {'<newsletter />'}
        </div>

        <div style={{ fontFamily: fh, fontSize: 38, fontWeight: 900, color: C.ink, lineHeight: 0.92, fontStyle: 'italic' }}>
          Between<br />
          <span style={{ fontStyle: 'normal', color: C.o }}>The Lines</span>
        </div>

        <div style={{ fontFamily: fb, fontSize: 13, color: C.ink2, lineHeight: 1.7 }}>
          {quarter} {year} {'\u2014'} {months}<br />
          tangocode.com
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
          {closingPills.map((pill, i) => (
            <div key={i} style={{
              background: C.peach, color: C.o, fontFamily: fb, fontSize: 11,
              fontWeight: 700, padding: '4px 10px', borderRadius: 100,
              border: `1.5px solid ${C.o}30`
            }}>
              {pill}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
