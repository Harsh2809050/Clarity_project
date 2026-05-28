'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Newsletter } from '@/types/newsletter'
import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/Button'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'

function IssueCard({ issue }: { issue: Newsletter }) {
  return (
    <StaggerItem>
      <motion.a
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read: ${issue.title}`}
        whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
        className="flex flex-col overflow-hidden rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark shadow-card dark:shadow-card-dark group cursor-pointer"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-parchment-dim dark:bg-charcoal-card">
          {issue.image ? (
            <Image
              src={issue.image} alt={issue.title} fill
              sizes="(max-width: 768px) 100vw, 33vw"
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

          <h3 className="font-serif text-[1.125rem] font-bold text-ink dark:text-ink-snow leading-snug tracking-tight line-clamp-2 mb-2">
            {issue.title}
          </h3>

          {issue.subtitle && (
            <p className="font-sans text-[13px] italic text-ink-muted dark:text-ink-snow-muted line-clamp-1 mb-2">
              {issue.subtitle}
            </p>
          )}

          <p className="font-sans text-[13px] text-ink-muted dark:text-ink-snow-muted leading-relaxed line-clamp-2 flex-1 mb-4">
            {issue.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-rim dark:border-rim-dark">
            <span className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">{issue.date}</span>
            <motion.span
              className="font-sans text-[12px] font-medium text-sage dark:text-sage-glow flex items-center gap-1"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.15 }}
            >
              Read
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </motion.span>
          </div>
        </div>
      </motion.a>
    </StaggerItem>
  )
}

export function RecentIssues({ issues }: { issues: Newsletter[] }) {
  return (
    <section className="section-y bg-parchment-dim dark:bg-charcoal-lift dot-grid">
      <div className="container-editorial">

        <AnimateIn className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow mb-2">Archive</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              Recent conversations
            </h2>
          </div>
          <LinkButton href="/archive" variant="outline" size="sm" className="hidden sm:inline-flex">
            Browse all
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </LinkButton>
        </AnimateIn>

        <StaggerList
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.1}
          delayStart={0.1}
        >
          {issues.map(issue => <IssueCard key={issue.id} issue={issue} />)}
        </StaggerList>

        <div className="mt-8 sm:hidden">
          <LinkButton href="/archive" variant="outline" size="md" className="w-full justify-center">
            Browse all issues
          </LinkButton>
        </div>

      </div>
    </section>
  )
}
