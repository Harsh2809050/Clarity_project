'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { workIssues } from '@/data/work'
import { newsletters } from '@/data/newsletters'
import { AnimateIn } from '@/components/ui/AnimateIn'

interface SearchResult {
  id: string
  type: 'issue' | 'newsletter'
  title: string
  guest: string
  topic: string
  date: string
  description?: string
  thumbnail?: string
  href: string
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = []

  for (const issue of workIssues) {
    results.push({
      id: issue.id,
      type: 'issue',
      title: issue.headline,
      guest: issue.guest.name,
      topic: issue.topic,
      date: issue.date,
      description: issue.subheadline || issue.sections[0]?.paragraphs[0]?.slice(0, 120),
      thumbnail: issue.thumbnail,
      href: `/issues/${issue.id}`,
    })
  }

  for (const nl of newsletters) {
    if (!workIssues.some(i => i.guest.name === nl.guest && i.date === nl.date)) {
      results.push({
        id: nl.id,
        type: 'newsletter',
        title: nl.title,
        guest: nl.guest,
        topic: nl.topic,
        date: nl.date,
        description: nl.description,
        thumbnail: nl.image,
        href: nl.url,
      })
    }
  }

  return results
}

const ALL_RESULTS = buildIndex()

export function SearchClient() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return ALL_RESULTS.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.guest.toLowerCase().includes(q) ||
      r.topic.toLowerCase().includes(q) ||
      (r.description ?? '').toLowerCase().includes(q)
    )
  }, [query])

  const topics = [...new Set(ALL_RESULTS.map(r => r.topic))].sort()

  return (
    <div className="min-h-screen pt-32 pb-24 bg-parchment dark:bg-charcoal">
      <div className="container-editorial max-w-2xl">

        {/* Header */}
        <AnimateIn className="mb-10">
          <p className="eyebrow mb-4">Search</p>
          <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight mb-2">
            Find any conversation.
          </h1>
          <p className="body-lg dark:!text-ink-snow-muted">
            Search by guest name, topic, or keyword across all {ALL_RESULTS.length} issues.
          </p>
        </AnimateIn>

        {/* Search input */}
        <AnimateIn delay={0.1}>
          <div className="relative mb-3">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint dark:text-ink-snow-faint pointer-events-none"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search guests, topics, keywords…"
              autoFocus
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark text-ink dark:text-ink-snow font-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-sage/50 shadow-card dark:shadow-card-dark"
            />
            {query && (
              <button onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-parchment-dim dark:bg-charcoal-lift text-ink-faint hover:text-ink dark:hover:text-ink-snow transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
        </AnimateIn>

        {/* Topic chips */}
        {!query && (
          <AnimateIn delay={0.15} className="flex flex-wrap gap-2 mb-10">
            {topics.map(topic => (
              <button key={topic} onClick={() => setQuery(topic)}
                className="font-sans text-[12px] px-3 py-1.5 rounded-lg border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark text-ink-muted dark:text-ink-snow-muted hover:text-sage dark:hover:text-sage-glow hover:border-sage/30 transition-all">
                {topic}
              </button>
            ))}
          </AnimateIn>
        )}

        {/* Results */}
        {query && (
          <div className="mt-6">
            {results.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-xl font-bold text-ink dark:text-ink-snow mb-2">No results for &ldquo;{query}&rdquo;</p>
                <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted">Try a different keyword, guest name, or topic.</p>
              </div>
            ) : (
              <>
                <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint mb-5">
                  {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                </p>
                <div className="space-y-3">
                  {results.map(r => (
                    <ResultCard key={r.id} result={r} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Empty state */}
        {!query && (
          <AnimateIn delay={0.2} className="mt-10 pt-8 border-t border-rim dark:border-rim-dark">
            <p className="font-sans text-sm text-ink-faint dark:text-ink-snow-faint text-center">
              {ALL_RESULTS.length} conversations indexed · start typing to search
            </p>
          </AnimateIn>
        )}
      </div>
    </div>
  )
}

function ResultCard({ result }: { result: SearchResult }) {
  const isExternal = result.href.startsWith('http')
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    isExternal ? (
      <a href={result.href} target="_blank" rel="noopener noreferrer" className="group flex gap-4 p-4 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark hover:border-sage/30 hover:-translate-y-0.5 transition-all shadow-card dark:shadow-card-dark">
        {children}
      </a>
    ) : (
      <Link href={result.href} className="group flex gap-4 p-4 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark hover:border-sage/30 hover:-translate-y-0.5 transition-all shadow-card dark:shadow-card-dark">
        {children}
      </Link>
    )

  return (
    <Wrapper>
      {result.thumbnail && (
        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-white dark:bg-charcoal-card shrink-0">
          <Image src={result.thumbnail} alt="" fill sizes="64px" className="object-contain" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow">{result.topic}</span>
          <span className="font-sans text-[10px] text-ink-faint dark:text-ink-snow-faint">· {result.date}</span>
        </div>
        <p className="font-serif text-[15px] font-bold text-ink dark:text-ink-snow leading-snug mb-1 group-hover:text-sage transition-colors">
          {result.title}
        </p>
        <p className="font-sans text-[12px] text-ink-muted dark:text-ink-snow-muted">{result.guest}</p>
        {result.description && (
          <p className="font-sans text-[12px] text-ink-faint dark:text-ink-snow-faint mt-1 line-clamp-1">{result.description}</p>
        )}
      </div>
    </Wrapper>
  )
}
