import React, { useState } from 'react'
import { C, PALETTE } from '../theme.jsx'

// ── Shared editor components ────────────────────────────────────

const s = {
  field: { marginBottom: 16 },
  label: { display: 'block', fontSize: 12, fontWeight: 700, color: '#7A5C48', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { width: '100%', padding: '8px 12px', border: '1.5px solid #e0d6cc', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff' },
  textarea: { width: '100%', padding: '8px 12px', border: '1.5px solid #e0d6cc', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff', minHeight: 80, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 },
  row: { display: 'flex', gap: 10, marginBottom: 12 },
  card: { background: '#fff', border: '1.5px solid #e0d6cc', borderRadius: 10, padding: 14, marginBottom: 10 },
  addBtn: { background: 'none', border: '1.5px dashed #ccc', borderRadius: 8, padding: '8px 16px', color: '#7A5C48', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: '100%' },
  removeBtn: { background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer', padding: '0 4px', lineHeight: 1 },
  sectionTitle: { fontSize: 12, fontWeight: 700, color: '#F5761A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8, borderBottom: '1.5px solid #f0e6dc' },
}

function Field({ label, children }) {
  return <div style={s.field}><label style={s.label}>{label}</label>{children}</div>
}

function Input({ value, onChange, placeholder, type = 'text' }) {
  return <input type={type} style={s.input} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
}

function Textarea({ value, onChange, placeholder, rows }) {
  return <textarea style={{ ...s.textarea, minHeight: rows ? rows * 24 : 80 }} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
}

function ColorPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {PALETTE.map(p => (
        <button key={p.value} onClick={() => onChange(p.value)} title={p.label} style={{
          width: 28, height: 28, borderRadius: 6, background: p.value, border: value === p.value ? '3px solid #1C1008' : '2px solid #e0d6cc', cursor: 'pointer', transition: 'transform 0.1s',
        }} />
      ))}
    </div>
  )
}

function ImageUpload({ value, onUpload, sectionId, label }) {
  const [uploading, setUploading] = useState(false)
  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const path = await onUpload(sectionId, file.name, file)
      // The parent handles setting the path in content
    } catch (err) {
      alert('Upload failed: ' + err.message)
    }
    setUploading(false)
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {value && <img src={`${import.meta.env.BASE_URL}${value}`} alt="" style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover' }} />}
      <label style={{ ...s.addBtn, width: 'auto', cursor: 'pointer', display: 'inline-block', textAlign: 'center' }}>
        {uploading ? 'Uploading...' : value ? 'Replace' : (label || 'Upload image')}
        <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      </label>
    </div>
  )
}

function ArrayEditor({ items, onChange, renderItem, onAdd, addLabel }) {
  const update = (i, val) => { const next = [...items]; next[i] = val; onChange(next) }
  const remove = (i) => { onChange(items.filter((_, j) => j !== i)) }
  const move = (i, dir) => {
    const next = [...items]
    const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ ...s.card, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => move(i, -1)} style={{ ...s.removeBtn, color: '#999' }} title="Move up">↑</button>
              <button onClick={() => move(i, 1)} style={{ ...s.removeBtn, color: '#999' }} title="Move down">↓</button>
            </div>
            <button onClick={() => remove(i)} style={s.removeBtn} title="Remove">×</button>
          </div>
          {renderItem(item, val => update(i, val))}
        </div>
      ))}
      <button onClick={() => onChange([...items, onAdd()])} style={s.addBtn}>+ {addLabel || 'Add item'}</button>
    </div>
  )
}

function TagsEditor({ tags, onChange }) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {tags.map((tag, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFE8D6', borderRadius: 100, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
            <input value={tag} onChange={e => { const next = [...tags]; next[i] = e.target.value; onChange(next) }} style={{ background: 'none', border: 'none', fontSize: 12, fontWeight: 600, width: Math.max(60, tag.length * 8), outline: 'none' }} />
            <button onClick={() => onChange(tags.filter((_, j) => j !== i))} style={{ ...s.removeBtn, fontSize: 14 }}>×</button>
          </div>
        ))}
      </div>
      <button onClick={() => onChange([...tags, 'New tag'])} style={{ ...s.addBtn, width: 'auto', padding: '4px 12px', fontSize: 12 }}>+ Add tag</button>
    </div>
  )
}

// ── Section editors ─────────────────────────────────────────────

export function MetaEditor({ meta, onChange }) {
  const set = (key, val) => onChange({ ...meta, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Newsletter Settings</div>
      <div style={s.row}>
        <div style={{ flex: 1 }}><Field label="Quarter"><Input value={meta.quarter} onChange={v => set('quarter', v)} /></Field></div>
        <div style={{ flex: 1 }}><Field label="Year"><Input value={meta.year} onChange={v => set('year', parseInt(v) || v)} type="number" /></Field></div>
      </div>
      <Field label="Months"><Input value={meta.months} onChange={v => set('months', v)} placeholder="July — August — September" /></Field>
      <Field label="Months Short"><Input value={meta.monthsShort} onChange={v => set('monthsShort', v)} placeholder="JULY–SEPTEMBER" /></Field>
      <Field label="Tagline"><Textarea value={meta.tagline} onChange={v => set('tagline', v)} /></Field>
      <Field label="Cover Topic Pills">
        <ArrayEditor
          items={meta.topicPills}
          onChange={pills => set('topicPills', pills)}
          onAdd={() => ({ emoji: '📌', label: 'New' })}
          addLabel="Add pill"
          renderItem={(pill, setPill) => (
            <div style={s.row}>
              <div style={{ width: 60 }}><Input value={pill.emoji} onChange={v => setPill({ ...pill, emoji: v })} placeholder="🎉" /></div>
              <div style={{ flex: 1 }}><Input value={pill.label} onChange={v => setPill({ ...pill, label: v })} placeholder="Label" /></div>
            </div>
          )}
        />
      </Field>
    </div>
  )
}

export function HighlightsEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Highlights — At a Glance</div>
      <Field label="Highlight Items">
        <ArrayEditor
          items={data.items}
          onChange={v => set('items', v)}
          onAdd={() => ({ emoji: '✨', title: '', description: '' })}
          addLabel="Add highlight"
          renderItem={(item, setItem) => (
            <>
              <div style={s.row}>
                <div style={{ width: 60 }}><Input value={item.emoji} onChange={v => setItem({ ...item, emoji: v })} /></div>
                <div style={{ flex: 1 }}><Input value={item.title} onChange={v => setItem({ ...item, title: v })} placeholder="Title" /></div>
              </div>
              <Input value={item.description} onChange={v => setItem({ ...item, description: v })} placeholder="Description" />
            </>
          )}
        />
      </Field>
      <Field label="Taco Champions">
        <ArrayEditor
          items={data.tacoChampions}
          onChange={v => set('tacoChampions', v)}
          onAdd={() => ({ month: '', name: '', count: 0, color: C.o })}
          addLabel="Add champion"
          renderItem={(champ, setChamp) => (
            <div style={s.row}>
              <div style={{ width: 80 }}><Input value={champ.month} onChange={v => setChamp({ ...champ, month: v })} placeholder="Month" /></div>
              <div style={{ flex: 1 }}><Input value={champ.name} onChange={v => setChamp({ ...champ, name: v })} placeholder="Name" /></div>
              <div style={{ width: 60 }}><Input value={champ.count} onChange={v => setChamp({ ...champ, count: parseInt(v) || 0 })} type="number" /></div>
            </div>
          )}
        />
      </Field>
      <Field label="Destinations">
        <TagsEditor tags={data.destinations} onChange={v => set('destinations', v)} />
      </Field>
    </div>
  )
}

export function HackathonEditor({ data, onChange, onImageUpload, sectionId }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Hackathon</div>
      <Field label="Description"><Textarea value={data.description} onChange={v => set('description', v)} rows={4} /></Field>
      <Field label="Stats">
        <ArrayEditor
          items={data.stats}
          onChange={v => set('stats', v)}
          onAdd={() => ({ value: '', label: '' })}
          addLabel="Add stat"
          renderItem={(stat, setStat) => (
            <div style={s.row}>
              <div style={{ flex: 1 }}><Input value={stat.value} onChange={v => setStat({ ...stat, value: v })} placeholder="Value" /></div>
              <div style={{ flex: 1 }}><Input value={stat.label} onChange={v => setStat({ ...stat, label: v })} placeholder="Label" /></div>
            </div>
          )}
        />
      </Field>
      <Field label="Podium">
        <ArrayEditor
          items={data.podium}
          onChange={v => set('podium', v)}
          onAdd={() => ({ place: '', name: '', prize: '', color: '#94A3B8', height: 100 })}
          addLabel="Add podium entry"
          renderItem={(p, setP) => (
            <>
              <div style={s.row}>
                <div style={{ width: 60 }}><Input value={p.place} onChange={v => setP({ ...p, place: v })} placeholder="1st" /></div>
                <div style={{ flex: 1 }}><Input value={p.name} onChange={v => setP({ ...p, name: v })} placeholder="Team name" /></div>
                <div style={{ width: 80 }}><Input value={p.prize} onChange={v => setP({ ...p, prize: v })} placeholder="$1,500" /></div>
              </div>
              <div style={s.row}>
                <div style={{ flex: 1 }}><Field label="Bar color"><ColorPicker value={p.color} onChange={v => setP({ ...p, color: v })} /></Field></div>
                <div style={{ width: 80 }}><Field label="Bar height"><Input value={p.height} onChange={v => setP({ ...p, height: parseInt(v) || 80 })} type="number" /></Field></div>
              </div>
            </>
          )}
        />
      </Field>
      <Field label="Photo"><ImageUpload value={data.image} onUpload={onImageUpload} sectionId={sectionId} /></Field>
      <Field label="Congrats Message"><Input value={data.congratsMessage} onChange={v => set('congratsMessage', v)} /></Field>
    </div>
  )
}

export function CultureEditor({ data, onChange, onImageUpload, sectionId }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Culture — Team Gatherings</div>
      <ArrayEditor
        items={data.gatherings}
        onChange={v => set('gatherings', v)}
        onAdd={() => ({ name: '', flag: '🇦🇷', category: '', quote: '', color: C.o, bg: C.peach, image: null })}
        addLabel="Add gathering"
        renderItem={(g, setG) => (
          <>
            <div style={s.row}>
              <div style={{ width: 50 }}><Field label="Flag"><Input value={g.flag} onChange={v => setG({ ...g, flag: v })} /></Field></div>
              <div style={{ flex: 1 }}><Field label="Name"><Input value={g.name} onChange={v => setG({ ...g, name: v })} /></Field></div>
              <div style={{ flex: 1 }}><Field label="Category"><Input value={g.category} onChange={v => setG({ ...g, category: v })} placeholder="Steakhouse" /></Field></div>
            </div>
            <Field label="Quote"><Textarea value={g.quote} onChange={v => setG({ ...g, quote: v })} /></Field>
            <Field label="Accent Color"><ColorPicker value={g.color} onChange={v => setG({ ...g, color: v })} /></Field>
          </>
        )}
      />
    </div>
  )
}

export function TacoDoubleEditor({ data, onChange, onImageUpload, sectionId }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Taco Winners — Double</div>
      <Field label="Prize Text"><Input value={data.prizeText} onChange={v => set('prizeText', v)} /></Field>
      <ArrayEditor
        items={data.winners}
        onChange={v => set('winners', v)}
        onAdd={() => ({ month: '', year: new Date().getFullYear(), name: '', count: 0, color: C.o, bg: C.peach, image: null })}
        addLabel="Add winner"
        renderItem={(w, setW) => (
          <>
            <div style={s.row}>
              <div style={{ width: 80 }}><Field label="Month"><Input value={w.month} onChange={v => setW({ ...w, month: v })} /></Field></div>
              <div style={{ flex: 1 }}><Field label="Name"><Input value={w.name} onChange={v => setW({ ...w, name: v })} /></Field></div>
              <div style={{ width: 70 }}><Field label="Count"><Input value={w.count} onChange={v => setW({ ...w, count: parseInt(v) || 0 })} type="number" /></Field></div>
            </div>
            <Field label="Color"><ColorPicker value={w.color} onChange={v => setW({ ...w, color: v })} /></Field>
          </>
        )}
      />
    </div>
  )
}

export function TacoSingleEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  const setWinner = (key, val) => set('winner', { ...data.winner, [key]: val })
  const setPhil = (key, val) => set('philosophy', { ...data.philosophy, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Taco Winner — Single + Philosophy</div>
      <div style={s.row}>
        <div style={{ width: 100 }}><Field label="Month"><Input value={data.month} onChange={v => set('month', v)} /></Field></div>
        <div style={{ width: 80 }}><Field label="Year"><Input value={data.year} onChange={v => set('year', parseInt(v) || v)} type="number" /></Field></div>
      </div>
      <div style={{ ...s.card, borderColor: C.pk + '40' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.pk, marginBottom: 8 }}>WINNER</div>
        <div style={s.row}>
          <div style={{ flex: 1 }}><Field label="Name"><Input value={data.winner.name} onChange={v => setWinner('name', v)} /></Field></div>
          <div style={{ width: 70 }}><Field label="Count"><Input value={data.winner.count} onChange={v => setWinner('count', parseInt(v) || 0)} type="number" /></Field></div>
        </div>
      </div>
      <div style={{ ...s.card, borderColor: C.o + '40' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.o, marginBottom: 8 }}>PHILOSOPHY QUOTE</div>
        <Field label="Quote"><Input value={data.philosophy.quote} onChange={v => setPhil('quote', v)} /></Field>
        <Field label="Author"><Input value={data.philosophy.author} onChange={v => setPhil('author', v)} /></Field>
        <Field label="Body Text"><Textarea value={data.philosophy.body} onChange={v => setPhil('body', v)} rows={5} /></Field>
        <Field label="Tags"><TagsEditor tags={data.philosophy.tags} onChange={v => setPhil('tags', v)} /></Field>
      </div>
    </div>
  )
}

export function WelcomeEditor({ data, onChange, onImageUpload, sectionId }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Welcome — New Hire</div>
      <div style={s.row}>
        <div style={{ flex: 1 }}><Field label="First Name"><Input value={data.name} onChange={v => set('name', v)} /></Field></div>
        <div style={{ flex: 1 }}><Field label="Full Name"><Input value={data.fullName} onChange={v => set('fullName', v)} /></Field></div>
      </div>
      <Field label="Role & Location"><Input value={data.role} onChange={v => set('role', v)} /></Field>
      <Field label="Bio"><Textarea value={data.bio} onChange={v => set('bio', v)} rows={3} /></Field>
      <Field label="Welcome Quote"><Textarea value={data.welcomeQuote} onChange={v => set('welcomeQuote', v)} /></Field>
      <Field label="Fun Facts">
        <ArrayEditor
          items={data.funFacts}
          onChange={v => set('funFacts', v)}
          onAdd={() => ({ emoji: '🎉', label: '' })}
          addLabel="Add fun fact"
          renderItem={(fact, setFact) => (
            <div style={s.row}>
              <div style={{ width: 50 }}><Input value={fact.emoji} onChange={v => setFact({ ...fact, emoji: v })} /></div>
              <div style={{ flex: 1 }}><Input value={fact.label} onChange={v => setFact({ ...fact, label: v })} placeholder="Fun fact" /></div>
            </div>
          )}
        />
      </Field>
      <Field label="Photo"><ImageUpload value={data.image} onUpload={onImageUpload} sectionId={sectionId} /></Field>
    </div>
  )
}

export function TeamUpdateEditor({ data, onChange, onImageUpload, sectionId }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Team Update</div>
      <div style={s.row}>
        <div style={{ width: 50 }}><Field label="Emoji"><Input value={data.emoji} onChange={v => set('emoji', v)} /></Field></div>
        <div style={{ flex: 1 }}><Field label="Title"><Input value={data.title} onChange={v => set('title', v)} /></Field></div>
      </div>
      <Field label="Quote Author"><Input value={data.quoteAuthor} onChange={v => set('quoteAuthor', v)} /></Field>
      <Field label="Quote"><Textarea value={data.quote} onChange={v => set('quote', v)} rows={5} /></Field>
      <Field label="Tags"><TagsEditor tags={data.tags} onChange={v => set('tags', v)} /></Field>
      <Field label="Photo"><ImageUpload value={data.image} onUpload={onImageUpload} sectionId={sectionId} /></Field>
      <Field label="Photo Label"><Input value={data.imageLabel} onChange={v => set('imageLabel', v)} /></Field>
    </div>
  )
}

export function TimeOffEditor({ data, onChange, onImageUpload, sectionId }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Time Off — Travel Story</div>
      <div style={s.row}>
        <div style={{ flex: 1 }}><Field label="Person"><Input value={data.person} onChange={v => set('person', v)} /></Field></div>
        <div style={{ width: 60 }}><Field label="Flag"><Input value={data.flag} onChange={v => set('flag', v)} /></Field></div>
      </div>
      <Field label="Destination"><Input value={data.destination} onChange={v => set('destination', v)} /></Field>
      <Field label="Accent Color"><ColorPicker value={data.color} onChange={v => set('color', v)} /></Field>
      <Field label="Quote / Story"><Textarea value={data.quote} onChange={v => set('quote', v)} rows={6} /></Field>
      <Field label="Fact Tags"><TagsEditor tags={data.facts} onChange={v => set('facts', v)} /></Field>
      <Field label="Number of Photos"><Input value={data.photoCount} onChange={v => set('photoCount', parseInt(v) || 1)} type="number" /></Field>
    </div>
  )
}

export function ClosingEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <div style={s.sectionTitle}>Closing Slide</div>
      <Field label="Farewell Message"><Textarea value={data.message} onChange={v => set('message', v)} rows={3} /></Field>
      <Field label="Closing Pills"><TagsEditor tags={data.closingPills} onChange={v => set('closingPills', v)} /></Field>
    </div>
  )
}

export function IndexEntryEditor({ indexEntry, onChange }) {
  if (!indexEntry) return null
  const set = (key, val) => onChange({ ...indexEntry, [key]: val })
  return (
    <div style={{ ...s.card, borderColor: '#F5761A30', marginTop: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.o, marginBottom: 8 }}>INDEX CARD (shown on table of contents)</div>
      <div style={s.row}>
        <div style={{ width: 50 }}><Field label="Icon"><Input value={indexEntry.icon} onChange={v => set('icon', v)} /></Field></div>
        <div style={{ flex: 1 }}><Field label="Title"><Input value={indexEntry.title} onChange={v => set('title', v)} /></Field></div>
      </div>
      <Field label="Subtitle"><Input value={indexEntry.subtitle} onChange={v => set('subtitle', v)} /></Field>
      <Field label="Card Color"><ColorPicker value={indexEntry.color} onChange={v => set('color', v)} /></Field>
    </div>
  )
}

export const editorRegistry = {
  cover: null,
  index: null,
  highlights: HighlightsEditor,
  hackathon: HackathonEditor,
  culture: CultureEditor,
  tacoDouble: TacoDoubleEditor,
  tacoSingle: TacoSingleEditor,
  welcome: WelcomeEditor,
  teamUpdate: TeamUpdateEditor,
  timeOff: TimeOffEditor,
  closing: ClosingEditor,
}

export const sectionTypeLabels = {
  cover: { label: 'Cover', icon: '📰', singleton: true },
  index: { label: 'Table of Contents', icon: '📋', singleton: true },
  highlights: { label: 'Highlights', icon: '✨', singleton: true },
  hackathon: { label: 'Hackathon', icon: '🚀', singleton: false },
  culture: { label: 'Culture / Gatherings', icon: '🍽️', singleton: false },
  tacoDouble: { label: 'Taco Winners (Double)', icon: '🌮', singleton: false },
  tacoSingle: { label: 'Taco Winner + Quote', icon: '🌮', singleton: false },
  welcome: { label: 'Welcome New Hire', icon: '👋', singleton: false },
  teamUpdate: { label: 'Team Update', icon: '✈️', singleton: false },
  timeOff: { label: 'Time Off Story', icon: '🌍', singleton: false },
  closing: { label: 'Closing', icon: '🎉', singleton: true },
}

export const defaultSectionData = {
  hackathon: { description: '', stats: [], podium: [], image: null, congratsMessage: '' },
  culture: { gatherings: [] },
  tacoDouble: { prizeText: '', winners: [] },
  tacoSingle: { month: '', year: new Date().getFullYear(), winner: { name: '', count: 0, image: null }, philosophy: { quote: '', author: '', body: '', tags: [] } },
  welcome: { name: '', fullName: '', role: '', bio: '', welcomeQuote: '', funFacts: [], image: null },
  teamUpdate: { title: '', emoji: '✨', quoteAuthor: '', quote: '', tags: [], image: null, imageLabel: '' },
  timeOff: { person: '', destination: '', flag: '🏳️', color: '#0891B2', quote: '', facts: [], images: [], photoCount: 4 },
  closing: { message: '', closingPills: [] },
  highlights: { items: [], tacoChampions: [], destinations: [] },
}
