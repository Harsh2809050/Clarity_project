'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Newsletter } from '@/types/newsletter'
import { Badge } from '@/components/ui/Badge'

interface Props { issue: Newsletter; featured?: boolean }

const arrow = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export function IssueCard({ issue, featured = false }: Props) {
  if (featured) {
    return (
      <motion.a
        href={issue.url} target="_blank" rel="noopener noreferrer"
        aria-label={`Read: ${issue.title}`}
        whileHover="hovered"
        className="group grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-rim dark:border-rim-dark shadow-card dark:shadow-card-dark cursor-pointer"
      >
        {/* Image (wider) */}
        <div className="relative lg:col-span-3 aspect-[4/3] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-parchment-dim dark:bg-charcoal-card">
          {issue.image ? (
            <div className="absolute inset-0">
              <Image src={issue.image} alt={issue.title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-contain" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sage-light to-parchment dark:from-sage/10 dark:to-charcoal-card" />
          )}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 flex flex-col justify-center p-8 bg-surface dark:bg-surface-dark">
          <div className="flex items-center gap-3 mb-5">
            <Badge variant="sage">{issue.topic}</Badge>
            <span className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">{issue.date}</span>
          </div>
          <h2 className="font-serif text-[1.5rem] font-bold text-ink dark:text-ink-snow leading-snug tracking-tight mb-3 text-balance">
            {issue.title}
          </h2>
          {issue.subtitle && (
            <p className="font-serif text-base italic text-ink-muted dark:text-ink-snow-muted mb-3 leading-relaxed line-clamp-2">
              {issue.subtitle}
            </p>
          )}
          <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed line-clamp-3 mb-6">
            {issue.description}
          </p>
          <motion.div
            className="flex items-center gap-2 font-sans text-sm font-medium text-sage dark:text-sage-glow"
            variants={{ hovered: { x: 5 } }}
            transition={{ duration: 0.2 }}
          >
            Read Issue {arrow}
          </motion.div>
          <span className="mt-1 font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">{issue.readTime}</span>
        </div>
      </motion.a>
    )
  }

  return (
    <motion.a
      href={issue.url} target="_blank" rel="noopener noreferrer"
      aria-label={`Read: ${issue.title}`}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="flex flex-col overflow-hidden rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark shadow-card dark:shadow-card-dark group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment-dim dark:bg-charcoal-card">
        {issue.image ? (
          <Image
            src={issue.image} alt={issue.title} fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sage-light to-parchment dark:from-sage/10 dark:to-charcoal-card" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge>{issue.topic}</Badge>
          <span className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">{issue.readTime}</span>
        </div>
        <h3 className="font-serif text-[1.1rem] font-bold text-ink dark:text-ink-snow leading-snug tracking-tight line-clamp-2 mb-2">
          {issue.title}
        </h3>
        {issue.subtitle && (
          <p className="font-sans text-[13px] italic text-ink-muted dark:text-ink-snow-muted line-clamp-1 mb-1">{issue.subtitle}</p>
        )}
        <p className="font-sans text-[13px] text-ink-muted dark:text-ink-snow-muted leading-relaxed line-clamp-2 flex-1 mb-4">
          {issue.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-rim dark:border-rim-dark">
          <span className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">{issue.date}</span>
          <motion.span
            className="font-sans text-[12px] font-medium text-sage dark:text-sage-glow flex items-center gap-1"
            whileHover={{ x: 3 }} transition={{ duration: 0.15 }}
          >
            Read
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.span>
        </div>
      </div>
    </motion.a>
  )
}
