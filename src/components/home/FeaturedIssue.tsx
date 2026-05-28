'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Newsletter } from '@/types/newsletter'
import { Badge } from '@/components/ui/Badge'
import { AnimateIn } from '@/components/ui/AnimateIn'

interface Props { issue: Newsletter }

export function FeaturedIssue({ issue }: Props) {
  return (
    <section className="section-y bg-parchment dark:bg-charcoal">
      <div className="container-editorial">

        {/* Label row */}
        <AnimateIn className="flex items-center gap-4 mb-10">
          <p className="eyebrow whitespace-nowrap">Latest Issue</p>
          <div className="flex-1 h-px bg-rim dark:bg-rim-dark" />
        </AnimateIn>

        <AnimateIn delay={0.08}>
          <motion.a
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read: ${issue.title}`}
            whileHover="hovered"
            className="group grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-sage/20 dark:border-sage-glow/15 shadow-card-hover dark:shadow-card-hover-dark cursor-pointer"
          >
            {/* Image panel */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] bg-parchment-dim dark:bg-charcoal-card overflow-hidden">
              {issue.image ? (
                <motion.div className="absolute inset-0"
                  variants={{ hovered: { scale: 1.04 } }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  <Image
                    src={issue.image} alt={issue.title} fill priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Soft gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-sage-light to-parchment-dim dark:from-sage/10 dark:to-charcoal-card" />
              )}
            </div>

            {/* Content panel */}
            <div className="flex flex-col justify-center bg-surface dark:bg-surface-dark relative overflow-hidden">
              {/* Brand accent stripe at top */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-sage via-sage-glow/60 to-transparent" />
              <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="sage">{issue.topic}</Badge>
                <span className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint">{issue.date}</span>
              </div>

              <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-4">
                {issue.title}
              </h2>

              {issue.subtitle && (
                <p className="font-serif text-lg italic text-ink-muted dark:text-ink-snow-muted mb-4 leading-relaxed">
                  {issue.subtitle}
                </p>
              )}

              <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed line-clamp-3 mb-8">
                {issue.description}
              </p>

              <motion.div
                className="flex items-center gap-2 font-sans text-sm font-medium text-sage dark:text-sage-glow"
                variants={{ hovered: { x: 4 } }}
                transition={{ duration: 0.2 }}
              >
                Read this issue
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </motion.div>

              <span className="mt-2 font-sans text-xs text-ink-faint dark:text-ink-snow-faint">{issue.readTime}</span>
              </div>{/* /inner padding */}
            </div>{/* /content panel */}
          </motion.a>
        </AnimateIn>

      </div>
    </section>
  )
}
