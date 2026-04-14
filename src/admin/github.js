const REPO = 'gabriellinarestc/newsletter'
const BRANCH = 'main'

function getToken() {
  return localStorage.getItem('btl_github_pat')
}

async function githubFetch(path, options = {}) {
  const token = getToken()
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...options,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub API ${res.status}: ${body}`)
  }
  return res.json()
}

export async function validateToken(token) {
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${token}` },
    })
    if (!res.ok) return false
    const repoRes = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Authorization: `token ${token}` },
    })
    return repoRes.ok
  } catch {
    return false
  }
}

export async function loadContent() {
  const data = await githubFetch('/contents/public/content.json?ref=' + BRANCH)
  const decoded = decodeURIComponent(escape(atob(data.content)))
  return { content: JSON.parse(decoded), sha: data.sha }
}

export async function saveContent(content, currentSha, message = 'Update newsletter content') {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))))
  const result = await githubFetch('/contents/public/content.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: encoded,
      sha: currentSha,
      branch: BRANCH,
    }),
  })
  return result.content.sha
}

export async function uploadImage(sectionId, filename, file) {
  const path = `public/images/${sectionId}/${filename}`
  const base64 = await fileToBase64(file)

  let sha
  try {
    const existing = await githubFetch(`/contents/${path}?ref=${BRANCH}`)
    sha = existing.sha
  } catch { /* file doesn't exist yet */ }

  await githubFetch(`/contents/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Upload image: ${sectionId}/${filename}`,
      content: base64,
      sha,
      branch: BRANCH,
    }),
  })

  return `images/${sectionId}/${filename}`
}

function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.readAsDataURL(file)
  })
}
