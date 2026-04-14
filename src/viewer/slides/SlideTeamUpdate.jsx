import React from 'react'
import { C, fh, fb, fm, Wave, SLabel } from '../../theme.jsx'

export default function SlideTeamUpdate({ data }) {
  const { title, emoji, quoteAuthor, quote, tags, image, imageLabel } = data

  // Split quote by double newlines for paragraph breaks
  const quoteParagraphs = quote.split('\n\n')

  return (
    <div style={{ flex: 1, display: 'flex', padding: '20px 28px', gap: 22, background: C.bg }}>
      {/* Left column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SLabel n={5} label="Team Updates · L2T Gathering" col={C.g} />

        <div style={{ fontFamily: fh, fontSize: 38, fontWeight: 900, color: C.ink, lineHeight: 0.92 }}>
          {emoji} {title.split('\n').map((line, i) => {
            // Check if this line contains "the L2T Team" or similar to style in teal italic
            if (line.toLowerCase().includes('l2t')) {
              return <React.Fragment key={i}>{i > 0 && <br />}<span style={{ color: C.t, fontStyle: 'italic' }}>{line}</span></React.Fragment>
            }
            return <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
          })}
        </div>

        <Wave col={C.t} />

        <div style={{
          background: C.mint, border: `2px solid ${C.t}40`, borderRadius: 14,
          padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 6
        }}>
          <div style={{ fontFamily: fm, fontSize: 10, color: C.t, letterSpacing: 1, marginBottom: 4 }}>
            // {quoteAuthor} shares:
          </div>
          <div style={{ fontFamily: fh, fontSize: 15, fontWeight: 700, fontStyle: 'italic', color: C.ink, lineHeight: 1.65, flex: 1 }}>
            &ldquo;{quoteParagraphs.map((para, i) => (
              <React.Fragment key={i}>
                {i > 0 && <><br /><br /></>}
                {para}
              </React.Fragment>
            ))}&rdquo;
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tags.map((tag, i) => (
              <span key={i} style={{
                background: C.bg2, border: `1.5px solid ${C.t}30`,
                color: C.t, fontFamily: fb, fontSize: 11, fontWeight: 600,
                padding: '4px 10px', borderRadius: 100
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right column - photo placeholder */}
      <div style={{
        flex: 1, borderRadius: 16, overflow: 'hidden',
        border: `2px dashed ${C.t}50`,
        background: `linear-gradient(135deg,${C.t}22,${C.t}08)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12
      }}>
        {image ? (
          <img src={image} alt={imageLabel || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <>
            <div style={{ fontSize: 60 }}>{'\uD83D\uDCF8'}</div>
            <div style={{ fontSize: 14, fontFamily: fm, color: C.t, fontWeight: 700, textAlign: 'center', opacity: 0.7, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
              {imageLabel || 'PHOTO'}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
