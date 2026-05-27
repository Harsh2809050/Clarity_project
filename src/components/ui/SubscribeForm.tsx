'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface Props {
  utmSource?: string
  placeholder?: string
  buttonLabel?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  dark?: boolean
}

function SuccessCard({ dark, size }: { dark: boolean; size: Props['size'] }) {
  if (size === 'sm') {
    // Compact inline success for footer / small contexts
    return (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 text-sage dark:text-sage-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p className="font-sans text-sm text-sage dark:text-sage-glow font-medium">
          You&rsquo;re in! Check your inbox.
        </p>
      </div>
    )
  }

  return (
    <div className={cn(
      'rounded-2xl p-6 border',
      dark
        ? 'bg-white/10 border-white/20'
        : 'bg-surface dark:bg-surface-dark border-sage/20 dark:border-sage-glow/20'
    )}>
      {/* Checkmark */}
      <div className="w-10 h-10 rounded-full bg-sage/15 dark:bg-sage-glow/15 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-sage dark:text-sage-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h3 className={cn(
        'font-serif text-lg font-bold mb-1',
        dark ? 'text-white' : 'text-ink dark:text-ink-snow'
      )}>
        You&rsquo;re subscribed!
      </h3>
      <p className={cn(
        'font-sans text-sm leading-relaxed mb-4',
        dark ? 'text-white/70' : 'text-ink-muted dark:text-ink-snow-muted'
      )}>
        Check your inbox for a welcome note. Every week, one conversation worth your time.
      </p>

      <Link
        href="/archive"
        className={cn(
          'inline-flex items-center gap-1.5 font-sans text-[13px] font-medium transition-colors',
          dark
            ? 'text-white/80 hover:text-white'
            : 'text-sage dark:text-sage-glow hover:underline underline-offset-4'
        )}
      >
        Browse past issues
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </Link>
    </div>
  )
}

export function SubscribeForm({
  utmSource = 'website',
  placeholder = 'Your email address',
  buttonLabel = 'Subscribe Free',
  size = 'md',
  className,
  dark = false,
}: Props) {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [msg, setMsg]       = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res  = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utmSource }),
      })
      const data = await res.json() as { success: boolean; message: string }
      setStatus(data.success ? 'success' : 'error')
      setMsg(data.message)
      if (data.success) setEmail('')
    } catch {
      setStatus('error')
      setMsg('Something went wrong. Please try again.')
    }
  }

  // --- Success ---
  if (status === 'success') {
    return (
      <div className={className}>
        <SuccessCard dark={dark} size={size} />
      </div>
    )
  }

  // --- Already subscribed (also a success variant) ---

  const h    = { sm: 'h-10', md: 'h-12', lg: 'h-14' }[size]
  const px   = { sm: 'px-3', md: 'px-4', lg: 'px-5' }[size]
  const bpx  = { sm: 'px-4', md: 'px-6', lg: 'px-8' }[size]
  const text = { sm: 'text-sm', md: 'text-sm', lg: 'text-[15px]' }[size]

  return (
    <div className={className}>
      <form onSubmit={submit} className="flex gap-2 flex-col sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'loading'}
          className={cn(
            h, px, text,
            'flex-1 rounded-xl border font-sans transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent',
            'disabled:opacity-60',
            dark
              ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40'
              : 'input-base'
          )}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={cn(
            h, bpx, text,
            'shrink-0 rounded-xl font-sans font-medium transition-all duration-200',
            'active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed',
            dark
              ? 'bg-white text-sage hover:bg-parchment'
              : 'bg-sage text-white hover:bg-sage-hover shadow-sm hover:shadow-md'
          )}
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Subscribing…
            </span>
          ) : buttonLabel}
        </button>
      </form>

      {status === 'error' && (
        <p className={cn(
          'mt-2 font-sans text-xs',
          dark ? 'text-red-300' : 'text-red-500'
        )}>
          {msg}
        </p>
      )}
    </div>
  )
}
