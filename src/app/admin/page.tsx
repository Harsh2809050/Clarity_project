'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NewsletterManager } from '@/components/admin/NewsletterManager'

const DEFAULT_PW = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'insight2026'

export default function AdminPage() {
  const [unlocked, setUnlocked]   = useState(false)
  const [pw, setPw]               = useState('')
  const [error, setError]         = useState('')

  useEffect(() => {
    setUnlocked(sessionStorage.getItem('cp_admin') === '1')
  }, [])

  function unlock(e: React.FormEvent) {
    e.preventDefault()
    if (pw === DEFAULT_PW) {
      sessionStorage.setItem('cp_admin', '1')
      setUnlocked(true)
    } else {
      setError('Wrong password. Try again.')
      setPw('')
    }
  }

  function lock() {
    sessionStorage.removeItem('cp_admin')
    setUnlocked(false)
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment dark:bg-charcoal px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink dark:text-ink-snow mb-1">Admin Access</h1>
            <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted">Clarity Project newsletter manager</p>
          </div>

          <form onSubmit={unlock} className="space-y-4">
            <input type="password" value={pw} onChange={e => setPw(e.target.value)}
              placeholder="Enter admin password"
              className="w-full h-12 px-4 input-base text-sm text-center tracking-widest"
              autoFocus />
            {error && <p className="font-sans text-xs text-red-500 text-center">{error}</p>}
            <button type="submit"
              className="w-full h-12 rounded-xl bg-sage text-white font-sans font-medium hover:bg-sage-hover transition-all shadow-sm">
              Access Admin →
            </button>
          </form>

          <p className="mt-6 font-sans text-xs text-ink-faint dark:text-ink-snow-faint text-center">
            Default password: <code className="bg-parchment-dim dark:bg-charcoal-lift px-1.5 py-0.5 rounded text-sage">insight2026</code>
            <br />
            Change via <code className="text-[10px]">NEXT_PUBLIC_ADMIN_PASSWORD</code> env var.
          </p>

          <div className="mt-8 text-center">
            <Link href="/" className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted hover:text-sage dark:hover:text-sage-glow transition-colors">
              ← Back to site
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-parchment dark:bg-charcoal pt-20">
      <div className="container-editorial py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-rim dark:border-rim-dark">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 rounded-lg bg-sage flex items-center justify-center">
                <span className="font-serif text-[11px] font-bold text-white">TI</span>
              </div>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint">Admin</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink dark:text-ink-snow">Newsletter Manager</h1>
            <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted mt-0.5">
              Add, edit, and organise your issues
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank"
              className="font-sans text-sm px-4 py-2 rounded-xl border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/50 hover:text-sage transition-all">
              View site ↗
            </Link>
            <button onClick={lock}
              className="font-sans text-sm px-4 py-2 rounded-xl border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-red-300 hover:text-red-500 transition-all">
              Lock
            </button>
          </div>
        </div>

        <NewsletterManager />
      </div>
    </div>
  )
}
