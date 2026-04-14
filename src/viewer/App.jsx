import React, { useState, useEffect, useCallback } from 'react'
import { C, fm } from '../theme.jsx'
import slideRegistry from './slideRegistry'

export default function App({ content }) {
  const { meta, sections } = content
  const TOTAL = sections.length
  const [cur, setCur] = useState(0)
  const [fade, setFade] = useState(true)
  const [key, setKey] = useState(0)

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= TOTAL) return
    setFade(false)
    setTimeout(() => {
      setCur(idx)
      setFade(true)
      setKey(k => k + 1)
    }, 140)
  }, [TOTAL])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') {
        setCur(c => {
          const n = c < TOTAL - 1 ? c + 1 : c
          if (n !== c) {
            setFade(false)
            setTimeout(() => { setFade(true); setKey(k => k + 1) }, 140)
          }
          return n
        })
      }
      if (e.key === 'ArrowLeft') {
        setCur(c => {
          const n = c > 0 ? c - 1 : c
          if (n !== c) {
            setFade(false)
            setTimeout(() => { setFade(true); setKey(k => k + 1) }, 140)
          }
          return n
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [TOTAL])

  // Build the index entries map: sectionIndex -> indexEntry, for the index slide
  const indexEntries = []
  sections.forEach((sec, i) => {
    if (sec.indexEntry) {
      indexEntries.push({ ...sec.indexEntry, sectionIndex: i })
    }
  })

  const SlideComponent = slideRegistry[sections[cur]?.type]

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      {/* Top progress bar */}
      <div style={{ height: 4, background: C.border, flexShrink: 0 }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg,${C.o},${C.t})`,
          width: ((cur + 1) / TOTAL * 100) + '%',
          transition: 'width 0.3s ease',
          borderRadius: '0 2px 2px 0'
        }} />
      </div>

      {/* Slide area */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', opacity: fade ? 1 : 0, transition: 'opacity 0.14s ease' }} key={key}>
        {SlideComponent && (
          <SlideComponent
            data={sections[cur].data}
            meta={meta}
            goTo={goTo}
            sectionIndex={cur}
            indexEntries={indexEntries}
          />
        )}

        {/* Prev arrow */}
        {cur > 0 && (
          <button onClick={() => goTo(cur - 1)} style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            background: C.bg2, border: `2px solid ${C.border}`,
            boxShadow: '0 4px 14px rgba(28,16,8,0.12)',
            color: C.ink, width: 36, height: 36, borderRadius: '50%',
            fontSize: 18, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{'\u2039'}</button>
        )}

        {/* Next arrow */}
        {cur < TOTAL - 1 && (
          <button onClick={() => goTo(cur + 1)} style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            background: C.o, border: `2px solid ${C.o}`,
            boxShadow: `0 4px 14px ${C.o}40`,
            color: '#fff', width: 36, height: 36, borderRadius: '50%',
            fontSize: 18, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{'\u203A'}</button>
        )}
      </div>

      {/* Bottom nav bar */}
      <div style={{
        height: 38, background: C.bg2, borderTop: `1.5px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', flexShrink: 0
      }}>
        <button onClick={() => goTo(1)} style={{
          background: 'none', border: `1.5px solid ${C.o}40`, color: C.o,
          fontFamily: fm, fontSize: 9, padding: '3px 10px', borderRadius: 100,
          display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700
        }}>{'\u2302'} INDEX</button>

        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {sections.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === cur ? 18 : 6, height: 6, borderRadius: 3, border: 'none', padding: 0,
              background: i === cur ? C.o : C.border,
              transition: 'all 0.2s', cursor: 'pointer'
            }} />
          ))}
        </div>

        <span style={{ fontFamily: fm, fontSize: 9, color: C.ink3 }}>
          {cur + 1} / {TOTAL} {'\u00B7'} {'\u2190'} {'\u2192'}
        </span>
      </div>
    </div>
  )
}
