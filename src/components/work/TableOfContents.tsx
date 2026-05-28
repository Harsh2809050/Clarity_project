'use client'

import { useState, useEffect, useCallback } from 'react'

interface TOCEntry {
  id: string
  issueNumber: number
  headline: string
}

interface TableOfContentsProps {
  entries: TOCEntry[]
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? '')

  useEffect(() => {
    if (entries.length === 0) return

    const observer = new IntersectionObserver(
      (observations) => {
        // Pick the topmost visible article (closest to the top of the viewport)
        let topEntry: { id: string; top: number } | null = null

        observations.forEach((obs) => {
          if (obs.isIntersecting) {
            const top = obs.boundingClientRect.top
            if (!topEntry || top < topEntry.top) {
              topEntry = { id: obs.target.id, top }
            }
          }
        })

        if (topEntry) setActiveId((topEntry as { id: string }).id)
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      }
    )

    entries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [entries])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  return (
    /* self-start + sticky = the correct flex sticky-sidebar pattern */
    <aside
      aria-label="Table of contents"
      className="hidden lg:block w-[200px] shrink-0 self-start sticky top-28"
    >
      {/* Header */}
      <p className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-ink-faint dark:text-ink-snow-faint pb-2.5 border-b border-rim dark:border-rim-dark mb-3">
        Table of Contents
      </p>

      {/* Links */}
      <nav className="space-y-0.5">
        {entries.map(({ id, issueNumber, headline }) => {
          const isActive = activeId === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={[
                'w-full text-left flex items-start gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-sage/[0.09] dark:bg-sage/[0.12]'
                  : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.04]',
              ].join(' ')}
            >
              {/* Issue number / active dash */}
              <span
                className={[
                  'shrink-0 font-sans text-[10px] font-bold mt-0.5 transition-colors duration-200',
                  isActive
                    ? 'text-sage dark:text-sage-glow'
                    : 'text-ink-faint dark:text-ink-snow-faint group-hover:text-ink-muted dark:group-hover:text-ink-snow-muted',
                ].join(' ')}
              >
                {isActive ? '–' : String(issueNumber).padStart(2, '0')}
              </span>

              {/* Headline */}
              <span
                className={[
                  'font-sans text-[11.5px] leading-snug line-clamp-3 transition-colors duration-200',
                  isActive
                    ? 'text-sage dark:text-sage-glow font-semibold'
                    : 'text-ink-muted dark:text-ink-snow-muted group-hover:text-ink dark:group-hover:text-ink-snow',
                ].join(' ')}
              >
                {headline}
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
