'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ClarityLogo } from '@/components/ui/ClarityLogo'
import { newsletters as seed } from '@/data/newsletters'
import { loadSiteContent, saveSiteContent, defaultSiteContent, type SiteContent } from '@/lib/site-content'
import { setAdminFlag } from '@/lib/page-content'
import type { Newsletter } from '@/types/newsletter'
import type { Subscriber } from '@/app/api/admin/subscribers/route'

/* ─── Constants ──────────────────────────────────────── */
const STORAGE_KEY = 'cp_newsletters_v2'
const TOPICS = [
  { label: 'Education Policy', value: 'education-policy' },
  { label: 'EdTech', value: 'edtech' },
  { label: 'Entrepreneurship', value: 'entrepreneurship' },
  { label: 'Higher Education', value: 'higher-education' },
  { label: 'Policy', value: 'policy' },
  { label: 'Skill Development', value: 'skill-development' },
  { label: 'Insight', value: 'insight' },
]
const empty: Omit<Newsletter, 'id'> = {
  slug: '', guest: '', title: '', subtitle: '', date: '',
  isoDate: new Date().toISOString().split('T')[0],
  description: '', topic: 'Education Policy', topicSlug: 'education-policy',
  url: '', image: '', readTime: '8 min read',
}
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/* ─── Types ──────────────────────────────────────────── */
type Tab = 'overview' | 'issues' | 'subscribers' | 'content'
type IssueMode = 'list' | 'add' | 'edit'

/* ═══════════════════════════════════════════════════════
   LOGIN SCREEN
══════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw]       = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy]   = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!pw) return
    setBusy(true); setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) { setAdminFlag(true); onLogin() } else { setError('Wrong password. Try again.'); setPw('') }
    setBusy(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment dark:bg-charcoal px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <ClarityLogo variant="stacked" size={110} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink dark:text-ink-snow mb-1">Admin Access</h1>
          <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted">Clarity Project control panel</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="password" value={pw} onChange={e => setPw(e.target.value)}
            placeholder="Enter admin password"
            className="w-full h-12 px-4 input-base text-sm text-center tracking-widest"
            autoFocus
          />
          {error && <p className="font-sans text-xs text-red-500 text-center">{error}</p>}
          <button type="submit" disabled={busy || !pw}
            className="w-full h-12 rounded-xl bg-sage text-white font-sans font-medium hover:bg-sage-hover transition-all shadow-sm disabled:opacity-60">
            {busy ? 'Verifying…' : 'Access Admin →'}
          </button>
        </form>

        <p className="mt-6 font-sans text-xs text-ink-faint dark:text-ink-snow-faint text-center">
          Set password via <code className="text-[10px] bg-parchment-dim dark:bg-charcoal-lift px-1 rounded">ADMIN_PASSWORD</code> env var
        </p>
        <div className="mt-6 text-center">
          <Link href="/" className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted hover:text-sage transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   OVERVIEW TAB
══════════════════════════════════════════════════════ */
function OverviewTab({ issueCount, totalSubs, beehiivConfigured }: {
  issueCount: number; totalSubs: number | null; beehiivConfigured: boolean
}) {
  const stats = [
    { label: 'Total Issues', value: issueCount.toString(), sub: 'in your archive' },
    { label: 'Subscribers', value: totalSubs !== null ? totalSubs.toString() : '—', sub: beehiivConfigured ? 'via Beehiiv' : 'connect Beehiiv to see' },
    { label: 'Publish workflow', value: beehiivConfigured ? 'Live ✓' : 'Not connected', sub: beehiivConfigured ? 'site auto-syncs' : 'add API keys' },
  ]

  return (
    <div className="space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, sub }) => (
          <div key={label} className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint mb-1">{label}</p>
            <p className="font-serif text-3xl font-bold text-ink dark:text-ink-snow mb-0.5">{value}</p>
            <p className="font-sans text-xs text-ink-muted dark:text-ink-snow-muted">{sub}</p>
          </div>
        ))}
      </div>

      {/* Workflow explanation */}
      <div className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark">
        <h2 className="font-serif text-lg font-bold text-ink dark:text-ink-snow mb-5">How publishing works</h2>
        <div className="space-y-4">
          {[
            {
              n: '1', icon: '✍️',
              title: 'Write your newsletter on Beehiiv',
              body: 'Go to app.beehiiv.com → New Post. Write, format, and preview your issue there. Beehiiv is your editor.',
              action: { label: 'Open Beehiiv ↗', href: 'https://app.beehiiv.com' },
            },
            {
              n: '2', icon: '🚀',
              title: 'Hit Publish on Beehiiv',
              body: 'When you publish on Beehiiv, it sends the email to subscribers AND your website auto-fetches it within 1 hour.',
              action: null,
            },
            {
              n: '3', icon: '🔄',
              title: 'Site updates automatically',
              body: 'Your website polls Beehiiv every hour. New issues appear on your homepage and archive automatically — no code needed.',
              action: null,
            },
            {
              n: '4', icon: '👥',
              title: 'Monitor subscribers here',
              body: 'Use the Subscribers tab in this panel to see who signed up, when, and where they came from.',
              action: null,
            },
          ].map(({ n, icon, title, body, action }) => (
            <div key={n} className="flex gap-4 p-4 rounded-xl bg-parchment-dim dark:bg-charcoal-lift">
              <span className="font-serif text-[13px] font-bold text-sage dark:text-sage-glow w-5 shrink-0 mt-0.5">{n}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base" role="img" aria-hidden>{icon}</span>
                  <p className="font-sans text-sm font-semibold text-ink dark:text-ink-snow">{title}</p>
                </div>
                <p className="font-sans text-xs text-ink-muted dark:text-ink-snow-muted leading-relaxed">{body}</p>
                {action && (
                  <a href={action.href} target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-2 font-sans text-xs font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4">
                    {action.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beehiiv status */}
      {!beehiivConfigured && (
        <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20">
          <p className="font-sans text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">⚠️ Beehiiv not connected</p>
          <p className="font-sans text-xs text-amber-700 dark:text-amber-500 leading-relaxed">
            Add <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">BEEHIIV_API_KEY</code> and{' '}
            <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">BEEHIIV_PUBLICATION_ID</code> to your Vercel environment variables, then redeploy.
            Until then, the site shows the seed newsletters and subscribe forms will not work.
          </p>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SUBSCRIBERS TAB
══════════════════════════════════════════════════════ */
function SubscribersTab() {
  const [subs, setSubs]           = useState<Subscriber[]>([])
  const [total, setTotal]         = useState(0)
  const [configured, setConfigured] = useState(true)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [search, setSearch]       = useState('')

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then(r => r.json())
      .then((d: { configured: boolean; subscribers: Subscriber[]; total: number; error?: string }) => {
        setConfigured(d.configured)
        setSubs(d.subscribers ?? [])
        setTotal(d.total ?? 0)
        if (d.error) setError(d.error)
      })
      .catch(() => setError('Could not load subscribers.'))
      .finally(() => setLoading(false))
  }, [])

  const shown = search
    ? subs.filter(s => s.email.toLowerCase().includes(search.toLowerCase()))
    : subs

  if (loading) return (
    <div className="py-20 text-center">
      <div className="inline-block w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin mb-3" />
      <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted">Loading subscribers…</p>
    </div>
  )

  if (!configured) return (
    <div className="py-20 text-center max-w-sm mx-auto">
      <p className="font-serif text-xl font-bold text-ink dark:text-ink-snow mb-3">Beehiiv not connected</p>
      <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted mb-6 leading-relaxed">
        Add your Beehiiv API key and Publication ID to Vercel environment variables to see your subscriber list here.
      </p>
      <a href="https://app.beehiiv.com/settings/api" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-sans text-sm font-medium px-5 py-2.5 rounded-xl bg-sage text-white hover:bg-sage-hover transition-all">
        Get API key from Beehiiv ↗
      </a>
    </div>
  )

  return (
    <div>
      {/* Stats bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="font-serif text-2xl font-bold text-ink dark:text-ink-snow">{total.toLocaleString()}</p>
          <p className="font-sans text-xs text-ink-muted dark:text-ink-snow-muted">total subscribers</p>
        </div>
        <div className="relative w-full sm:w-64">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint dark:text-ink-snow-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Filter by email…"
            className="w-full h-10 pl-10 pr-4 input-base text-sm" />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
          <p className="font-sans text-xs text-red-600 dark:text-red-400">{error} — Showing cached data if available.</p>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-rim dark:border-rim-dark overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-rim dark:border-rim-dark bg-parchment-dim dark:bg-charcoal-lift">
              <th className="px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint">Email</th>
              <th className="px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint hidden sm:table-cell">Joined</th>
              <th className="px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint hidden md:table-cell">Source</th>
              <th className="px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rim dark:divide-rim-dark bg-surface dark:bg-surface-dark">
            {shown.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center font-sans text-sm text-ink-faint dark:text-ink-snow-faint">
                  {search ? 'No subscribers match your search.' : 'No subscribers yet. Share your site!'}
                </td>
              </tr>
            ) : shown.map(s => (
              <tr key={s.id} className="hover:bg-parchment-dim/50 dark:hover:bg-charcoal-lift/50 transition-colors">
                <td className="px-5 py-3 font-sans text-sm text-ink dark:text-ink-snow">{s.email}</td>
                <td className="px-5 py-3 font-sans text-xs text-ink-muted dark:text-ink-snow-muted hidden sm:table-cell">
                  {s.created ? new Date(s.created * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                </td>
                <td className="px-5 py-3 font-sans text-xs text-ink-muted dark:text-ink-snow-muted hidden md:table-cell">
                  {s.utm_source ?? 'direct'}
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-block font-sans text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md ${
                    s.status === 'active'
                      ? 'bg-sage/10 dark:bg-sage-glow/10 text-sage dark:text-sage-glow'
                      : 'bg-parchment-dim dark:bg-charcoal-lift text-ink-faint dark:text-ink-snow-faint'
                  }`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 font-sans text-xs text-ink-faint dark:text-ink-snow-faint text-right">
        Showing {shown.length} of {total} · Full list at{' '}
        <a href="https://app.beehiiv.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-sage">
          app.beehiiv.com
        </a>
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   ISSUES TAB (Newsletter Manager)
══════════════════════════════════════════════════════ */
function IssuesTab() {
  const [items, setItems]         = useState<Newsletter[]>([])
  const [mode, setMode]           = useState<IssueMode>('list')
  const [editing, setEditing]     = useState<Newsletter | null>(null)
  const [search, setSearch]       = useState('')
  const [saved, setSaved]         = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    setItems(raw ? JSON.parse(raw) as Newsletter[] : seed)
  }, [])

  const persist = useCallback((data: Newsletter[]) => {
    setItems(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [])

  function handleSave(form: Omit<Newsletter, 'id'>) {
    if (mode === 'edit' && editing) {
      persist(items.map(i => i.id === editing.id ? { ...form, id: editing.id } : i))
    } else {
      persist([{ ...form, id: Date.now().toString() }, ...items])
    }
    setMode('list'); setEditing(null)
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'newsletters.json'; a.click()
  }

  const displayed = items.filter(n => {
    const q = search.toLowerCase()
    return !q || n.title.toLowerCase().includes(q) || n.guest.toLowerCase().includes(q)
  })

  if (mode !== 'list') {
    return <NewsletterForm initial={editing ?? undefined} onSave={handleSave} onCancel={() => { setMode('list'); setEditing(null) }} />
  }

  return (
    <div>
      {/* Workflow banner */}
      <div className="mb-6 p-4 rounded-xl bg-sage/[0.08] dark:bg-sage/[0.06] border border-sage/20 dark:border-sage/10">
        <p className="font-sans text-xs text-ink-muted dark:text-ink-snow-muted leading-relaxed">
          <strong className="text-sage dark:text-sage-glow">Publishing workflow:</strong> Write and publish on{' '}
          <a href="https://app.beehiiv.com" target="_blank" rel="noopener noreferrer" className="underline text-sage dark:text-sage-glow">Beehiiv</a>{' '}
          → your site auto-updates. Use this panel to manage metadata or manually add issues when Beehiiv isn&rsquo;t connected.
          Export JSON → paste into <code className="text-[11px] bg-parchment dark:bg-charcoal-card px-1 rounded">src/data/newsletters.ts</code> to make changes permanent.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint dark:text-ink-snow-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search issues…" className="w-full h-10 pl-10 pr-4 input-base text-sm" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {saved && <span className="font-sans text-xs text-sage dark:text-sage-glow">✓ Saved</span>}
          <button onClick={exportJSON}
            className="font-sans text-xs px-3 py-2 rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/50 hover:text-sage transition-all">
            Export JSON
          </button>
          <a href="https://app.beehiiv.com/posts/new" target="_blank" rel="noopener noreferrer"
            className="font-sans text-xs px-3 py-2 rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/50 hover:text-sage transition-all">
            Write on Beehiiv ↗
          </a>
          <button onClick={() => { setEditing(null); setMode('add') }}
            className="font-sans text-sm font-medium px-4 py-2 rounded-xl bg-sage text-white hover:bg-sage-hover transition-all shadow-sm">
            + Add Manually
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence>
          {displayed.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.03 } }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark hover:border-sage/30 transition-all group">

              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-parchment-dim dark:bg-charcoal-card shrink-0">
                {item.image ? (
                  <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-parchment-dim dark:from-sage/10 dark:to-charcoal-card" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow">{item.topic}</span>
                  <span className="font-sans text-[10px] text-ink-faint dark:text-ink-snow-faint">{item.date}</span>
                </div>
                <p className="font-serif text-[15px] font-semibold text-ink dark:text-ink-snow truncate">{item.title}</p>
                <p className="font-sans text-xs text-ink-muted dark:text-ink-snow-muted truncate">{item.guest}</p>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-faint hover:text-ink dark:hover:text-ink-snow hover:bg-parchment-dim dark:hover:bg-charcoal-card transition-all"
                  title="Preview">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <button onClick={() => { setEditing(item); setMode('edit') }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-faint hover:text-sage dark:hover:text-sage-glow hover:bg-sage/10 transition-all" title="Edit">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                {deleteConfirm === item.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => { persist(items.filter(i => i.id !== item.id)); setDeleteConfirm(null) }}
                      className="font-sans text-[11px] px-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all">Confirm</button>
                    <button onClick={() => setDeleteConfirm(null)}
                      className="font-sans text-[11px] px-2 py-1 rounded-lg border border-rim dark:border-rim-dark text-ink-muted hover:border-sage/30 transition-all">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-faint hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all" title="Delete">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {displayed.length === 0 && (
          <p className="py-12 text-center font-sans text-sm text-ink-faint dark:text-ink-snow-faint">No issues found.</p>
        )}
      </div>
      <p className="mt-4 font-sans text-xs text-ink-faint dark:text-ink-snow-faint text-right">{items.length} issues in local storage</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   NEWSLETTER FORM (shared by IssuesTab)
══════════════════════════════════════════════════════ */
function NewsletterForm({ initial, onSave, onCancel }: {
  initial?: Newsletter; onSave: (d: Omit<Newsletter, 'id'>) => void; onCancel: () => void
}) {
  const [form, setForm] = useState<Omit<Newsletter, 'id'>>(initial ? { ...initial } : { ...empty })

  function set(k: keyof typeof form, v: string) {
    setForm(prev => {
      const next = { ...prev, [k]: v }
      if (k === 'title' && !initial) next.slug = slugify(v)
      if (k === 'topic') next.topicSlug = slugify(v)
      return next
    })
  }

  const field = (label: string, key: keyof typeof form, opts?: { type?: string; placeholder?: string; textarea?: boolean }) => (
    <div>
      <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-1.5">{label}</label>
      {opts?.textarea ? (
        <textarea rows={3} value={form[key] as string} onChange={e => set(key, e.target.value)}
          placeholder={opts?.placeholder} className="w-full px-4 py-3 input-base text-sm resize-none" />
      ) : (
        <input type={opts?.type ?? 'text'} value={form[key] as string} onChange={e => set(key, e.target.value)}
          placeholder={opts?.placeholder} className="w-full h-10 px-4 input-base text-sm" />
      )}
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onCancel}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-rim dark:border-rim-dark text-ink-muted hover:border-sage/50 hover:text-sage transition-all">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <h2 className="font-serif text-xl font-bold text-ink dark:text-ink-snow">
          {initial ? 'Edit Issue' : 'Add New Issue'}
        </h2>
      </div>
      <form onSubmit={e => { e.preventDefault(); onSave(form) }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">{field('Title *', 'title', { placeholder: 'e.g. Why Indian Schools Are Failing Their Best Teachers' })}</div>
        <div className="md:col-span-2">{field('Subtitle', 'subtitle', { placeholder: 'One-line editorial subheading' })}</div>
        {field('Guest Name *', 'guest', { placeholder: 'e.g. Mahesh Balakrishnan' })}
        {field('Date *', 'date', { placeholder: 'e.g. May 19, 2026' })}
        {field('ISO Date *', 'isoDate', { type: 'date' })}
        <div>
          <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-1.5">Topic *</label>
          <select value={form.topic} onChange={e => set('topic', e.target.value)}
            className="w-full h-10 px-4 input-base text-sm appearance-none">
            {TOPICS.map(t => <option key={t.value} value={t.label}>{t.label}</option>)}
          </select>
        </div>
        {field('Read Time', 'readTime', { placeholder: '8 min read' })}
        <div className="md:col-span-2">{field('Newsletter URL *', 'url', { type: 'url', placeholder: 'https://clarityproject.beehiiv.com/p/…' })}</div>
        <div className="md:col-span-2">{field('Cover Image URL', 'image', { type: 'url', placeholder: 'https://images.unsplash.com/photo-…' })}</div>
        <div className="md:col-span-2">{field('Description *', 'description', { textarea: true, placeholder: 'A short summary of the key ideas in this issue…' })}</div>
        {form.image && (
          <div className="md:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-1.5">Image Preview</label>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-parchment-dim dark:bg-charcoal-card w-full max-w-sm">
              <Image src={form.image} alt="Preview" fill sizes="400px" className="object-cover" />
            </div>
          </div>
        )}
        <div className="md:col-span-2 flex items-center gap-3 pt-4 border-t border-rim dark:border-rim-dark">
          <button type="submit"
            className="font-sans text-sm font-medium px-6 py-2.5 rounded-xl bg-sage text-white hover:bg-sage-hover transition-all shadow-sm">
            {initial ? 'Save Changes' : 'Add Issue'}
          </button>
          <button type="button" onClick={onCancel}
            className="font-sans text-sm px-4 py-2.5 rounded-xl border border-rim dark:border-rim-dark text-ink-muted hover:border-sage/50 hover:text-sage transition-all">
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   CONTENT TAB — edit hero text, stats, section visibility
══════════════════════════════════════════════════════ */
function ContentTab() {
  const [c, setC]       = useState<SiteContent>(defaultSiteContent)
  const [saved, setSaved] = useState(false)

  useEffect(() => { setC(loadSiteContent()) }, [])

  function save() {
    saveSiteContent(c)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function setStat(i: number, key: 'n' | 'label', val: string) {
    const stats = c.heroStats.map((s, idx) => idx === i ? { ...s, [key]: val } : s)
    setC(prev => ({ ...prev, heroStats: stats }))
  }

  const inputCls = 'w-full px-4 py-2.5 input-base text-sm'
  const labelCls = 'block font-sans text-xs font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-1.5'

  return (
    <div className="space-y-10 max-w-2xl">

      {/* Hero text */}
      <div className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark space-y-5">
        <h2 className="font-serif text-lg font-bold text-ink dark:text-ink-snow">Hero Section</h2>

        <div>
          <label className={labelCls}>Eyebrow text</label>
          <input className={inputCls} value={c.heroEyebrow}
            onChange={e => setC(p => ({ ...p, heroEyebrow: e.target.value }))} />
        </div>

        <div>
          <label className={labelCls}>Main Headline</label>
          <textarea rows={2} className="w-full px-4 py-2.5 input-base text-sm resize-none"
            value={c.heroHeadline}
            onChange={e => setC(p => ({ ...p, heroHeadline: e.target.value }))} />
        </div>

        <div>
          <label className={labelCls}>Subtitle / Description</label>
          <textarea rows={3} className="w-full px-4 py-2.5 input-base text-sm resize-none"
            value={c.heroSubtitle}
            onChange={e => setC(p => ({ ...p, heroSubtitle: e.target.value }))} />
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark space-y-4">
        <h2 className="font-serif text-lg font-bold text-ink dark:text-ink-snow">Hero Stats</h2>
        <div className="grid grid-cols-2 gap-3">
          {c.heroStats.map((s, i) => (
            <div key={i} className="flex gap-2 items-center p-3 rounded-xl bg-parchment-dim dark:bg-charcoal-lift">
              <input className="w-16 px-2 py-1.5 input-base text-sm font-bold text-center"
                value={s.n} onChange={e => setStat(i, 'n', e.target.value)} placeholder="8" />
              <input className="flex-1 px-2 py-1.5 input-base text-sm"
                value={s.label} onChange={e => setStat(i, 'label', e.target.value)} placeholder="Issues" />
            </div>
          ))}
        </div>
      </div>

      {/* Section visibility */}
      <div className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark space-y-4">
        <h2 className="font-serif text-lg font-bold text-ink dark:text-ink-snow">Page Sections</h2>
        <p className="font-sans text-xs text-ink-muted dark:text-ink-snow-muted">Toggle which sections appear on the homepage below the hero.</p>

        {([
          { key: 'showFeatured', label: 'Featured Issue (large card)', desc: 'The highlighted latest issue section' },
          { key: 'showRecent',   label: 'Recent Conversations (grid)', desc: '3-card grid of recent issues' },
          { key: 'showCTA',      label: 'Subscribe CTA band',          desc: 'Dark email subscribe section at bottom' },
        ] as { key: keyof SiteContent; label: string; desc: string }[]).map(({ key, label, desc }) => (
          <label key={key} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-parchment-dim dark:bg-charcoal-lift cursor-pointer group">
            <div>
              <p className="font-sans text-sm font-medium text-ink dark:text-ink-snow group-hover:text-sage transition-colors">{label}</p>
              <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint mt-0.5">{desc}</p>
            </div>
            <div className="relative shrink-0">
              <input type="checkbox" className="sr-only" checked={c[key] as boolean}
                onChange={e => setC(p => ({ ...p, [key]: e.target.checked }))} />
              <div className={`w-10 h-6 rounded-full transition-colors ${c[key] ? 'bg-sage' : 'bg-rim dark:bg-rim-dark'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${c[key] ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button onClick={save}
          className="font-sans text-sm font-medium px-6 py-2.5 rounded-xl bg-sage text-white hover:bg-sage-hover transition-all shadow-sm">
          Save Changes
        </button>
        <button onClick={() => { setC(defaultSiteContent); saveSiteContent(defaultSiteContent) }}
          className="font-sans text-sm px-4 py-2.5 rounded-xl border border-rim dark:border-rim-dark text-ink-muted hover:border-red-300 hover:text-red-500 transition-all">
          Reset to Defaults
        </button>
        {saved && <span className="font-sans text-xs text-sage dark:text-sage-glow">✓ Saved — refresh the site to see changes</span>}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN ADMIN PAGE
══════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [authed, setAuthed]   = useState<boolean | null>(null) // null = checking
  const [tab, setTab]         = useState<Tab>('overview')
  const [totalSubs, setTotalSubs] = useState<number | null>(null)
  const [beehiivOk, setBeehiivOk] = useState(false)
  const [issueCount, setIssueCount] = useState(0)

  // Verify session cookie on mount
  useEffect(() => {
    fetch('/api/admin/verify')
      .then(r => r.json())
      .then((d: { ok: boolean }) => setAuthed(d.ok))
      .catch(() => setAuthed(false))
  }, [])

  // Load subscriber count and issue count once logged in
  useEffect(() => {
    if (!authed) return
    const raw = localStorage.getItem(STORAGE_KEY)
    const issues = raw ? (JSON.parse(raw) as Newsletter[]) : seed
    setIssueCount(issues.length)

    fetch('/api/admin/subscribers')
      .then(r => r.json())
      .then((d: { configured: boolean; total: number }) => {
        setBeehiivOk(d.configured)
        setTotalSubs(d.configured ? d.total : null)
      })
      .catch(() => {})
  }, [authed])

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAdminFlag(false)
    setAuthed(false)
  }

  // Loading splash
  if (authed === null) return (
    <div className="min-h-screen flex items-center justify-center bg-parchment dark:bg-charcoal">
      <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview',     label: 'Overview'     },
    { id: 'issues',       label: 'Issues'       },
    { id: 'subscribers',  label: 'Subscribers'  },
    { id: 'content',      label: 'Site Content' },
  ]

  return (
    <div className="min-h-screen bg-parchment dark:bg-charcoal">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-parchment/95 dark:bg-charcoal/95 backdrop-blur-md border-b border-rim dark:border-rim-dark">
        <div className="container-editorial flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <ClarityLogo variant="icon" size={30} />
            <span className="font-sans text-[14px] font-semibold text-ink dark:text-ink-snow tracking-tight">Clarity Project</span>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank"
              className="font-sans text-xs px-3 py-1.5 rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/50 hover:text-sage transition-all">
              View site ↗
            </Link>
            <button onClick={logout}
              className="font-sans text-xs px-3 py-1.5 rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-red-300 hover:text-red-500 transition-all">
              Lock
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="container-editorial flex items-center gap-1 pb-0">
          {tabs.map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`font-sans text-[13px] px-4 py-2.5 border-b-2 transition-all ${
                tab === id
                  ? 'border-sage text-ink dark:text-ink-snow font-medium'
                  : 'border-transparent text-ink-muted dark:text-ink-snow-muted hover:text-ink dark:hover:text-ink-snow'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="container-editorial py-10">
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}>
            {tab === 'overview'    && <OverviewTab issueCount={issueCount} totalSubs={totalSubs} beehiivConfigured={beehiivOk} />}
            {tab === 'issues'      && <IssuesTab />}
            {tab === 'subscribers' && <SubscribersTab />}
            {tab === 'content'     && <ContentTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
