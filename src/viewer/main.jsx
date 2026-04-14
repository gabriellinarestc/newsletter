import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

async function init() {
  const base = import.meta.env.BASE_URL || '/'
  const res = await fetch(base + 'content.json')
  const content = await res.json()
  ReactDOM.createRoot(document.getElementById('root')).render(<App content={content} />)
}
init()
