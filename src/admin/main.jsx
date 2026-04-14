import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom/client'
import { validateToken, loadContent, saveContent, uploadImage } from './github.js'
import { MetaEditor, IndexEntryEditor, editorRegistry, sectionTypeLabels, defaultSectionData } from './editors.jsx'
import { C } from '../theme.jsx'

const fm = "'JetBrains Mono',monospace"
const fb = "'Plus Jakarta Sans',sans-serif"

// ── Login ───────────────────────────────────────────────────────

function Login({ onLogin }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    setError('')
    const valid = await validateToken(token.trim())
    if (valid) {
      localStorage.setItem('btl_github_pat', token.trim())
      onLogin()
    } else {
      setError('Invalid token or no access to the newsletter repo.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF8F0' }}>
      <div style={{ width: 420, background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 8px 32px rgba(28,16,8,0.08)' }}>
        <div style={{ fontFamily: fm, fontSize: 11, color: C.o, letterSpacing: 2, marginBottom: 8 }}>{'<newsletter />'}</div>
        <h1 style={{ fontFamily: fb, fontSize: 28, fontWeight: 800, color: '#1C1008', marginBottom: 6 }}>BetweenTheLines</h1>
        <p style={{ fontSize: 14, color: '#7A5C48', marginBottom: 24, lineHeight: 1.6 }}>Enter your access key to manage the newsletter. This key was provided by your administrator.</p>
        <input
          type="password"
          value={token}
          onChange={e => setToken(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Paste your access key here"
          style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0d6cc', borderRadius: 10, fontSize: 14, outline: 'none', marginBottom: 12, fontFamily: fm }}
        />
        {error && <p style={{ color: '#e74c3c', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button
          onClick={submit}
          disabled={loading || !token.trim()}
          style={{ width: '100%', padding: '12px 0', background: C.o, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'Checking...' : 'Log In'}
        </button>
      </div>
    </div>
  )
}

// ── Section List ────────────────────────────────────────────────

function SectionList({ sections, selected, onSelect, onAdd, onRemove, onMove }) {
  const [showAdd, setShowAdd] = useState(false)
  const existingTypes = sections.map(s => s.type)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 12px 0' }}>
        {sections.map((sec, i) => {
          const info = sectionTypeLabels[sec.type] || { label: sec.type, icon: '📄' }
          const isSelected = selected === i
          return (
            <div
              key={sec.id}
              onClick={() => onSelect(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', marginBottom: 4,
                borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: isSelected ? 700 : 500,
                background: isSelected ? C.o + '12' : 'transparent',
                border: isSelected ? `1.5px solid ${C.o}30` : '1.5px solid transparent',
                color: '#1C1008', transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{info.icon}</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {sec.type === 'timeOff' ? `${info.icon} ${sec.data?.person || 'Unnamed'}` : info.label}
              </span>
              <div style={{ display: 'flex', gap: 2 }}>
                {i > 0 && <button onClick={e => { e.stopPropagation(); onMove(i, -1) }} style={{ background: 'none', border: 'none', color: '#999', fontSize: 14, cursor: 'pointer', padding: '0 2px' }}>↑</button>}
                {i < sections.length - 1 && <button onClick={e => { e.stopPropagation(); onMove(i, 1) }} style={{ background: 'none', border: 'none', color: '#999', fontSize: 14, cursor: 'pointer', padding: '0 2px' }}>↓</button>}
                {!info.singleton && <button onClick={e => { e.stopPropagation(); onRemove(i) }} style={{ background: 'none', border: 'none', color: '#ccc', fontSize: 16, cursor: 'pointer', padding: '0 2px' }} title="Remove">×</button>}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ padding: 12, borderTop: '1px solid #e0d6cc' }}>
        {showAdd ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {Object.entries(sectionTypeLabels)
              .filter(([type, info]) => !info.singleton || !existingTypes.includes(type))
              .filter(([type]) => type !== 'cover' && type !== 'index')
              .map(([type, info]) => (
                <button
                  key={type}
                  onClick={() => { onAdd(type); setShowAdd(false) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: '#fff', border: '1px solid #e0d6cc', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#1C1008', textAlign: 'left' }}
                >
                  <span>{info.icon}</span> {info.label}
                </button>
              ))}
            <button onClick={() => setShowAdd(false)} style={{ padding: '6px', background: 'none', border: 'none', color: '#999', fontSize: 12, cursor: 'pointer' }}>Cancel</button>
          </div>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            style={{ width: '100%', padding: '10px 0', background: 'none', border: '1.5px dashed #ccc', borderRadius: 10, color: '#7A5C48', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            + Add Section
          </button>
        )}
      </div>
    </div>
  )
}

// ── Admin App ───────────────────────────────────────────────────

function AdminApp() {
  const [content, setContent] = useState(null)
  const [sha, setSha] = useState(null)
  const [selected, setSelected] = useState(-1) // -1 = meta editor
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [dirty, setDirty] = useState(false)

  const load = useCallback(async () => {
    try {
      setStatus('Loading...')
      const { content: c, sha: s } = await loadContent()
      setContent(c)
      setSha(s)
      setStatus('')
    } catch (err) {
      setStatus('Failed to load: ' + err.message)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true)
    setStatus('Saving...')
    try {
      const newSha = await saveContent(content, sha)
      setSha(newSha)
      setDirty(false)
      setStatus('Saved! Deploying...')
      setTimeout(() => setStatus(''), 4000)
    } catch (err) {
      setStatus('Save failed: ' + err.message)
    }
    setSaving(false)
  }

  const updateMeta = (meta) => {
    setContent({ ...content, meta })
    setDirty(true)
  }

  const updateSection = (i, data) => {
    const sections = [...content.sections]
    sections[i] = { ...sections[i], data }
    setContent({ ...content, sections })
    setDirty(true)
  }

  const updateIndexEntry = (i, indexEntry) => {
    const sections = [...content.sections]
    sections[i] = { ...sections[i], indexEntry }
    setContent({ ...content, sections })
    setDirty(true)
  }

  const addSection = (type) => {
    const id = type + '-' + Date.now()
    const data = defaultSectionData[type] || {}
    const indexEntryTypes = ['hackathon', 'culture', 'tacoDouble', 'welcome', 'teamUpdate', 'timeOff']
    const section = { id, type, data }
    if (indexEntryTypes.includes(type)) {
      const info = sectionTypeLabels[type]
      section.indexEntry = { icon: info.icon, title: info.label, subtitle: '', color: C.o, bg: C.peach }
    }
    const sections = [...content.sections]
    const closingIdx = sections.findIndex(s => s.type === 'closing')
    if (closingIdx >= 0) {
      sections.splice(closingIdx, 0, section)
    } else {
      sections.push(section)
    }
    setContent({ ...content, sections })
    setSelected(closingIdx >= 0 ? closingIdx : sections.length - 1)
    setDirty(true)
  }

  const removeSection = (i) => {
    if (!confirm('Remove this section?')) return
    const sections = content.sections.filter((_, j) => j !== i)
    setContent({ ...content, sections })
    if (selected >= sections.length) setSelected(sections.length - 1)
    setDirty(true)
  }

  const moveSection = (i, dir) => {
    const sections = [...content.sections]
    const j = i + dir
    if (j < 0 || j >= sections.length) return
    ;[sections[i], sections[j]] = [sections[j], sections[i]]
    setContent({ ...content, sections })
    if (selected === i) setSelected(j)
    else if (selected === j) setSelected(i)
    setDirty(true)
  }

  const handleImageUpload = async (sectionId, filename, file) => {
    const path = await uploadImage(sectionId, filename, file)
    // Update the section's image field
    const sections = [...content.sections]
    const idx = sections.findIndex(s => s.id === sectionId)
    if (idx >= 0) {
      sections[idx] = { ...sections[idx], data: { ...sections[idx].data, image: path } }
      setContent({ ...content, sections })
      setDirty(true)
    }
    return path
  }

  if (!content) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: fb, color: '#7A5C48' }}>{status || 'Loading...'}</div>
  }

  const currentSection = selected >= 0 ? content.sections[selected] : null
  const Editor = currentSection ? editorRegistry[currentSection.type] : null
  const base = import.meta.env.BASE_URL || '/newsletter/'
  const viewerUrl = window.location.origin + base

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: fb }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: '#fff', borderRight: '1px solid #e0d6cc', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px 16px 0', borderBottom: '1px solid #e0d6cc', paddingBottom: 12 }}>
          <div style={{ fontFamily: fm, fontSize: 10, color: C.o, letterSpacing: 2 }}>{'<newsletter />'}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#1C1008' }}>BetweenTheLines</div>
        </div>

        <button
          onClick={() => setSelected(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', margin: '8px 12px 0',
            borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: selected === -1 ? 700 : 500,
            background: selected === -1 ? '#f0e6dc' : 'transparent', border: 'none', color: '#1C1008', textAlign: 'left',
          }}
        >
          ⚙️ Newsletter Settings
        </button>

        <SectionList
          sections={content.sections}
          selected={selected}
          onSelect={setSelected}
          onAdd={addSection}
          onRemove={removeSection}
          onMove={moveSection}
        />
      </div>

      {/* Editor Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: '#fff', borderBottom: '1px solid #e0d6cc', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {status && <span style={{ fontSize: 13, color: status.includes('fail') || status.includes('Failed') ? '#e74c3c' : '#7A5C48' }}>{status}</span>}
            {dirty && !status && <span style={{ fontSize: 12, color: C.o, fontWeight: 600 }}>Unsaved changes</span>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={viewerUrl} target="_blank" rel="noopener" style={{ padding: '8px 16px', background: '#f5f0eb', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#7A5C48', textDecoration: 'none' }}>
              Preview ↗
            </a>
            <button
              onClick={save}
              disabled={saving || !dirty}
              style={{ padding: '8px 20px', background: dirty ? C.o : '#ccc', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, opacity: saving ? 0.6 : 1 }}
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
            <button
              onClick={() => { localStorage.removeItem('btl_github_pat'); window.location.reload() }}
              style={{ padding: '8px 12px', background: 'none', border: '1px solid #e0d6cc', borderRadius: 8, fontSize: 12, color: '#999', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          <div style={{ maxWidth: 640 }}>
            {selected === -1 ? (
              <MetaEditor meta={content.meta} onChange={updateMeta} />
            ) : Editor ? (
              <>
                <Editor
                  data={currentSection.data}
                  onChange={data => updateSection(selected, data)}
                  onImageUpload={handleImageUpload}
                  sectionId={currentSection.id}
                />
                {currentSection.indexEntry && (
                  <IndexEntryEditor
                    indexEntry={currentSection.indexEntry}
                    onChange={ie => updateIndexEntry(selected, ie)}
                  />
                )}
              </>
            ) : (
              <div style={{ padding: 40, textAlign: 'center', color: '#B89880' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{sectionTypeLabels[currentSection?.type]?.icon || '📄'}</div>
                <p style={{ fontSize: 14 }}>This section is auto-generated from your content. No editing needed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── App Root ────────────────────────────────────────────────────

function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('btl_github_pat'))

  if (!authed) return <Login onLogin={() => setAuthed(true)} />
  return <AdminApp />
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
