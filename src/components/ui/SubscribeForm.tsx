'use client'

import { useState } from 'react'
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

export function SubscribeForm({
  utmSource = 'website',
  placeholder = 'Your email address',
  buttonLabel = 'Subscribe Free',
  size = 'md',
  className,
  dark = false,
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
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

  const h = { sm: 'h-10', md: 'h-12', lg: 'h-14' }[size]
  const px = { sm: 'px-3', md: 'px-4', lg: 'px-5' }[size]
  const bpx = { sm: 'px-4', md: 'px-6', lg: 'px-8' }[size]
  const text = { sm: 'text-sm', md: 'text-sm', lg: 'text-[15px]' }[size]

  if (status === 'success') {
    return (
      <p className={cn('font-sans text-sm text-sage dark:text-sage-glow font-medium', className)}>
        ✓ {msg}
      </p>
    )
  }

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
            'flex-1 rounded-xl border font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent disabled:opacity-60',
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
            'shrink-0 rounded-xl font-sans font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed',
            dark
              ? 'bg-white text-sage hover:bg-parchment'
              : 'bg-sage text-white hover:bg-sage-hover shadow-sm hover:shadow-md'
          )}
        >
          {status === 'loading' ? 'Subscribing…' : buttonLabel}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 font-sans text-xs text-red-500">{msg}</p>
      )}
    </div>
  )
}
