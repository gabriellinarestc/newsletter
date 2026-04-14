import React from 'react'
import { C, fh, fb, fm, Wave, SLabel } from '../../theme.jsx'

export default function SlideWelcome({ data }) {
  const { name, fullName, role, bio, welcomeQuote, funFacts, image } = data

  return (
    <div style={{ flex: 1, display: 'flex', padding: '20px 28px', gap: 20, background: C.bg }}>
      {/* Left column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Large photo placeholder */}
        <div style={{
          flex: 1, borderRadius: 16, overflow: 'hidden',
          border: '2px dashed #C47D0050',
          background: 'linear-gradient(135deg,#C47D0022,#C47D0008)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10
        }}>
          {image ? (
            <img src={image} alt={fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <>
              <div style={{ fontSize: 52 }}>{'\uD83D\uDCF8'}</div>
              <div style={{ fontSize: 13, fontFamily: fm, color: '#C47D00', fontWeight: 700, opacity: 0.7, textAlign: 'center' }}>
                {fullName.toUpperCase()}
              </div>
            </>
          )}
        </div>

        {/* Welcome quote card */}
        <div style={{ background: C.lemon, border: `2px solid ${C.y}50`, borderRadius: 12, padding: 14 }}>
          <div style={{ fontFamily: fh, fontSize: 15, fontWeight: 700, fontStyle: 'italic', color: C.ink, lineHeight: 1.65 }}>
            &ldquo;{welcomeQuote}&rdquo;
          </div>
        </div>
      </div>

      {/* Right column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SLabel n={4} label={`Welcome \u2014 Joining TangoCode`} col="#C47D00" />

        <div style={{ fontFamily: fh, fontSize: 40, fontWeight: 900, color: C.ink, lineHeight: 0.9 }}>
          {'\uD83D\uDC4B'} Welcome,<br />
          <span style={{ color: '#C47D00', fontStyle: 'italic' }}>{name}!</span>
        </div>

        <div style={{ fontFamily: fm, fontSize: 11, color: C.ink3, marginTop: 4 }}>{role}</div>

        <Wave col="#C47D00" />

        <div style={{ fontFamily: fb, fontSize: 13, color: C.ink2, lineHeight: 1.7, marginBottom: 4 }}>
          {bio}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
          {funFacts.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
              background: C.bg2, borderRadius: 10, border: `1.5px solid ${C.border}`
            }}>
              <span style={{ fontSize: 16 }}>{f.emoji}</span>
              <span style={{ fontFamily: fb, fontSize: 12, color: C.ink }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
