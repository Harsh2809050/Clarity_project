'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { newsletters as seed } from '@/data/newsletters'
import type { Newsletter } from '@/types/newsletter'

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

type Mode = 'list' | 'add' | 'edit'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function NewsletterManager() {
  const [items, setItems]     = useState<Newsletter[]>([])
  const [mode, setMode]       = useState<Mode>('list')
  const [editing, setEditing] = useState<Newsletter | null>(null)
  const [search, setSearch]   = useState('')
  const [saved, setSaved]     = useState(false)
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
      const newItem: Newsletter = { ...form, id: Date.now().toString() }
      persist([newItem, ...items])
    }
    setMode('list'); setEditing(null)
  }

  function handleDelete(id: string) {
    persist(items.filter(i => i.id !== id))
    setDeleteConfirm(null)
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = 'newsletters.json'; a.click()
  }

  function resetToSeed() {
    if (window.confirm('Reset to original seed data? All local changes will be lost.')) {
      persist(seed)
    }
  }

  const displayed = items.filter(n => {
    const q = search.toLowerCase()
    return !q || n.title.toLowerCase().includes(q) || n.guest.toLowerCase().includes(q)
  })

  if (mode !== 'list') {
    return (
      <NewsletterForm
        initial={editing ?? undefined}
        onSave={handleSave}
        onCancel={() => { setMode('list'); setEditing(null) }}
      />
    )
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-8">
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint dark:text-ink-snow-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search newsletters…"
            className="w-full h-10 pl-10 pr-4 input-base text-sm" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {saved && <span className="font-sans text-xs text-sage dark:text-sage-glow">✓ Saved</span>}
          <button onClick={exportJSON}
            className="font-sans text-xs px-3 py-2 rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/50 hover:text-sage transition-all">
            Export JSON
          </button>
          <button onClick={resetToSeed}
            className="font-sans text-xs px-3 py-2 rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-red-300 hover:text-red-500 transition-all">
            Reset to seed
          </button>
          <button onClick={() => { setEditing(null); setMode('add') }}
            className="font-sans text-sm font-medium px-4 py-2 rounded-xl bg-sage text-white hover:bg-sage-hover transition-all shadow-sm">
            + New Issue
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="mb-8 p-4 rounded-xl bg-sage-light dark:bg-sage/10 border border-sage/20 dark:border-sage/10">
        <p className="font-sans text-xs text-ink-muted dark:text-ink-snow-muted leading-relaxed">
          <strong className="text-sage">📌 How this works:</strong> Changes are saved to your browser's localStorage. Click <strong>Export JSON</strong> to download the file, then paste the contents into <code className="text-[11px] bg-parchment dark:bg-charcoal-card px-1 rounded">src/data/newsletters.ts</code> to make them permanent. For live publishing, use <a href="https://app.beehiiv.com" target="_blank" rel="noopener noreferrer" className="underline text-sage">Beehiiv</a> — your site auto-syncs when connected.
        </p>
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence>
          {displayed.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 } }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark hover:border-sage/30 transition-all group">

              {/* Thumbnail */}
              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-parchment-dim dark:bg-charcoal-card shrink-0">
                {item.image ? (
                  <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-light to-parchment dark:from-sage/10 dark:to-charcoal-card" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow">{item.topic}</span>
                  <span className="font-sans text-[10px] text-ink-faint dark:text-ink-snow-faint">{item.date}</span>
                </div>
                <p className="font-serif text-[15px] font-semibold text-ink dark:text-ink-snow truncate">{item.title}</p>
                <p className="font-sans text-xs text-ink-muted dark:text-ink-snow-muted truncate">{item.guest}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-faint dark:text-ink-snow-faint hover:text-ink dark:hover:text-ink-snow hover:bg-parchment-dim dark:hover:bg-charcoal-card transition-all"
                  title="Preview">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <button onClick={() => { setEditing(item); setMode('edit') }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-faint dark:text-ink-snow-faint hover:text-sage dark:hover:text-sage-glow hover:bg-sage-light dark:hover:bg-sage/10 transition-all"
                  title="Edit">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>

                {deleteConfirm === item.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(item.id)}
                      className="font-sans text-[11px] px-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all">Confirm</button>
                    <button onClick={() => setDeleteConfirm(null)}
                      className="font-sans text-[11px] px-2 py-1 rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/30 transition-all">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-faint dark:text-ink-snow-faint hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    title="Delete">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {displayed.length === 0 && (
          <p className="py-12 text-center font-sans text-sm text-ink-faint dark:text-ink-snow-faint">No newsletters match your search.</p>
        )}
      </div>

      <p className="mt-6 font-sans text-xs text-ink-faint dark:text-ink-snow-faint text-right">
        {items.length} total issues in local storage
      </p>
    </div>
  )
}

/* ────────────────────────────────────────────────────── */
/* NewsletterForm                                         */
/* ────────────────────────────────────────────────────── */

function NewsletterForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Newsletter
  onSave: (data: Omit<Newsletter, 'id'>) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Omit<Newsletter, 'id'>>(
    initial ? { ...initial } : { ...empty }
  )

  function set(k: keyof typeof form, v: string) {
    setForm(prev => {
      const next = { ...prev, [k]: v }
      if (k === 'title' && !initial) next.slug = slugify(v)
      if (k === 'topic') next.topicSlug = slugify(v)
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
  }

  const field = (label: string, key: keyof typeof form, opts?: { type?: string; placeholder?: string; textarea?: boolean }) => (
    <div>
      <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-1.5">{label}</label>
      {opts?.textarea ? (
        <textarea rows={3} value={form[key] as string}
          onChange={e => set(key, e.target.value)}
          placeholder={opts?.placeholder}
          className="w-full px-4 py-3 input-base text-sm resize-none" />
      ) : (
        <input type={opts?.type ?? 'text'} value={form[key] as string}
          onChange={e => set(key, e.target.value)}
          placeholder={opts?.placeholder}
          className="w-full h-10 px-4 input-base text-sm" />
      )}
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onCancel}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/50 hover:text-sage transition-all">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <h2 className="font-serif text-xl font-bold text-ink dark:text-ink-snow">
          {initial ? 'Edit Issue' : 'Add New Issue'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        <div className="md:col-span-2">{field('Beehiiv / Newsletter URL *', 'url', { type: 'url', placeholder: 'https://yourname.beehiiv.com/p/…' })}</div>
        <div className="md:col-span-2">{field('Cover Image URL', 'image', { type: 'url', placeholder: 'https://images.unsplash.com/photo-…' })}</div>
        <div className="md:col-span-2">{field('Description *', 'description', { textarea: true, placeholder: 'A short summary of the key ideas in this issue…' })}</div>

        {/* Image preview */}
        {form.image && (
          <div className="md:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-1.5">Image Preview</label>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-parchment-dim dark:bg-charcoal-card w-full max-w-sm">
              <Image src={form.image} alt="Preview" fill sizes="400px" className="object-cover" />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="md:col-span-2 flex items-center gap-3 pt-4 border-t border-rim dark:border-rim-dark">
          <button type="submit"
            className="font-sans text-sm font-medium px-6 py-2.5 rounded-xl bg-sage text-white hover:bg-sage-hover transition-all shadow-sm">
            {initial ? 'Save Changes' : 'Add Issue'}
          </button>
          <button type="button" onClick={onCancel}
            className="font-sans text-sm px-4 py-2.5 rounded-xl border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/50 hover:text-sage transition-all">
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}
