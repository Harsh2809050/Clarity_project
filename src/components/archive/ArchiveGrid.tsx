'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Newsletter } from '@/types/newsletter'
import { IssueCard } from './IssueCard'
import { cn } from '@/lib/utils'

interface Props {
  newsletters: Newsletter[]
  topics: Array<{ label: string; value: string }>
}

export function ArchiveGrid({ newsletters, topics }: Props) {
  const [query, setQuery]           = useState('')
  const [activeFilter, setFilter]   = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return newsletters.filter(n => {
      const matchesTopic = activeFilter === 'all' || n.topicSlug === activeFilter
      const matchesQuery = !q || [n.title, n.guest, n.topic, n.description].some(s => s.toLowerCase().includes(q))
      return matchesTopic && matchesQuery
    })
  }, [newsletters, query, activeFilter])

  const [featured, ...rest] = filtered

  return (
    <div>
      {/* Controls */}
      <div className="mb-12 space-y-5">

        {/* Search */}
        <div className="relative max-w-md">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint dark:text-ink-snow-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="search" value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title, guest, or topic…"
            className="w-full h-12 pl-11 pr-4 input-base text-sm"
            aria-label="Search newsletters"
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {topics.map(({ label, value }) => (
            <button key={value} onClick={() => setFilter(value)} aria-pressed={activeFilter === value}
              className={cn(
                'font-sans text-[12px] font-medium px-4 py-1.5 rounded-full border transition-all duration-200',
                activeFilter === value
                  ? 'bg-sage text-white border-sage shadow-sm'
                  : 'bg-transparent text-ink-muted dark:text-ink-snow-muted border-rim dark:border-rim-dark hover:border-sage/50 hover:text-sage dark:hover:text-sage-glow'
              )}>
              {label}
            </button>
          ))}
        </div>

        {/* Count */}
        <motion.p
          key={filtered.length}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint"
          aria-live="polite"
        >
          {filtered.length === 0 ? 'No issues found' : `${filtered.length} issue${filtered.length !== 1 ? 's' : ''}`}
        </motion.p>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div key="empty"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="py-24 text-center">
            <p className="font-serif text-xl text-ink-muted dark:text-ink-snow-muted mb-2">No issues found</p>
            <p className="font-sans text-sm text-ink-faint dark:text-ink-snow-faint mb-4">Try different keywords or clear the filter.</p>
            <button onClick={() => { setQuery(''); setFilter('all') }}
              className="font-sans text-sm text-sage dark:text-sage-glow hover:underline">
              Clear all
            </button>
          </motion.div>
        ) : (
          <motion.div key="results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12">
            {featured && <IssueCard issue={featured} featured />}
            {rest.length > 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.07 } } }}
              >
                {rest.map(issue => (
                  <motion.div key={issue.id}
                    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } } }}>
                    <IssueCard issue={issue} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
