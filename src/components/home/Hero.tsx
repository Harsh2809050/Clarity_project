'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SubscribeForm } from '@/components/ui/SubscribeForm'
import { loadSiteContent, defaultSiteContent, type SiteContent } from '@/lib/site-content'
import type { Newsletter } from '@/types/newsletter'

interface Props { issue?: Newsletter }

export function Hero({ issue }: Props) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)

  useEffect(() => { setContent(loadSiteContent()) }, [])

  return (
    <section className="relative min-h-[92vh] flex items-center bg-parchment dark:bg-charcoal overflow-hidden pt-24 pb-20 dot-grid">

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[600px] h-[500px] -translate-y-1/2 -translate-x-1/4 rounded-full bg-sage/[0.06] dark:bg-sage/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[350px] rounded-full bg-brand-amber/[0.04] dark:bg-brand-amber/[0.03] blur-[80px]" />
      </div>

      <div className="container-editorial relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: editorial content ──────────────────────── */}
          <div>

            <div className="anim-fade-up anim-d0">
              <span className="inline-flex items-center gap-2 eyebrow mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                {content.heroEyebrow}
              </span>
            </div>

            <div className="anim-fade-up anim-d1">
              <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-6">
                {content.heroHeadline}
              </h1>
            </div>

            <div className="anim-fade-up anim-d2">
              <p className="body-lg dark:!text-ink-snow-muted max-w-xl text-balance mb-10">
                {content.heroSubtitle}
              </p>
            </div>

            <div className="anim-fade-up anim-d3">
              <SubscribeForm
                size="xl"
                placeholder="Enter your email address"
                buttonLabel="Subscribe — It's Free"
                utmSource="hero"
                className="max-w-[520px]"
              />
            </div>

            <div className="anim-fade-up anim-d4 mt-4">
              <Link href="/be-a-guest"
                className="font-sans text-xs font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4">
                Want to be a guest? →
              </Link>
            </div>

          </div>

          {/* ── Right: latest episode card ───────────────────── */}
          {issue && (
            <div className="hidden lg:flex items-center justify-center anim-fade-up anim-d2">
              <div className="relative w-full max-w-[420px]">

                <div className="absolute -inset-8 rounded-3xl bg-sage/[0.08] dark:bg-sage/[0.06] blur-3xl pointer-events-none" />

                <a
                  href={issue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read: ${issue.title}`}
                  className="relative block rounded-2xl overflow-hidden border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark group shadow-card dark:shadow-card-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover dark:hover:shadow-card-hover-dark"
                >
                  {issue.image && (
                    <div className="relative aspect-[4/3] bg-parchment-dim dark:bg-charcoal-card">
                      <Image
                        src={issue.image}
                        alt={issue.title}
                        fill
                        priority
                        sizes="420px"
                        className="object-contain"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-sage text-white shadow-sm">
                          Latest Issue
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-sage dark:text-sage-glow mb-1.5">
                      {issue.topic}
                    </p>
                    <h3 className="font-serif text-[1.0625rem] font-bold text-ink dark:text-ink-snow leading-snug tracking-tight mb-2">
                      {issue.title}
                    </h3>
                    {issue.subtitle && (
                      <p className="font-sans text-[12px] italic text-ink-muted dark:text-ink-snow-muted mb-3 line-clamp-1">
                        {issue.subtitle}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t border-rim dark:border-rim-dark">
                      <span className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">
                        {issue.date} · {issue.readTime}
                      </span>
                      <span className="font-sans text-[12px] font-medium text-sage dark:text-sage-glow flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200">
                        Read
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>

                <div className="absolute -top-3 -right-3 bg-white dark:bg-surface-dark rounded-xl border border-rim/60 dark:border-rim-dark shadow-card-hover px-3 py-2 pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-ink dark:text-ink-snow">New</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
