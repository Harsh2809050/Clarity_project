import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { workIssues } from '@/data/work'
import { ReadingProgress } from '@/components/ui/ReadingProgress'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { AnimateIn } from '@/components/ui/AnimateIn'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return workIssues.map(issue => ({ slug: issue.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = workIssues.find(i => i.id === params.slug)
  if (!issue) return { title: 'Issue Not Found' }

  const description = issue.subheadline
    || issue.sections[0]?.paragraphs[0]?.slice(0, 160)
    || ''

  return {
    title: issue.headline,
    description,
    openGraph: {
      title: issue.headline,
      description,
      type: 'article',
      publishedTime: issue.date,
      authors: [issue.guest.name],
      ...(issue.thumbnail ? { images: [{ url: issue.thumbnail, width: 1200, height: 675 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: issue.headline,
      description,
      ...(issue.thumbnail ? { images: [issue.thumbnail] } : {}),
    },
  }
}

export default function IssuePage({ params }: Props) {
  const idx   = workIssues.findIndex(i => i.id === params.slug)
  if (idx === -1) notFound()

  const issue = workIssues[idx]
  const prev  = workIssues[idx + 1] ?? null
  const next  = workIssues[idx - 1] ?? null
  const issueUrl = `/issues/${issue.id}`

  return (
    <>
      <ReadingProgress />

      {/* ── Hero header ─────────────────────────────────── */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-parchment dark:bg-charcoal dot-grid">
        <div className="container-editorial max-w-3xl">
          <AnimateIn>
            <Link href="/our-work"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-ink-muted dark:text-ink-snow-muted hover:text-sage dark:hover:text-sage-glow transition-colors mb-8">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              All Issues
            </Link>
          </AnimateIn>

          <AnimateIn delay={0.05}>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sage text-white font-sans text-[11px] font-bold shrink-0">
                {issue.issueNumber}
              </span>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint dark:text-ink-snow-faint">
                Issue #{String(issue.issueNumber).padStart(2, '0')}
                &nbsp;·&nbsp;{issue.date}
                &nbsp;·&nbsp;{issue.topic}
                {issue.readTime && <>&nbsp;·&nbsp;{issue.readTime}</>}
              </span>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-bold text-ink dark:text-ink-snow leading-[1.08] tracking-tight text-balance mb-4">
              {issue.headline}
            </h1>
          </AnimateIn>

          {issue.subheadline && (
            <AnimateIn delay={0.15}>
              <p className="font-serif text-[1.35rem] md:text-[1.5rem] font-bold text-sage leading-snug tracking-tight mb-6 text-balance">
                {issue.subheadline}
              </p>
            </AnimateIn>
          )}

          <AnimateIn delay={0.2}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-sage dark:text-sage-glow">
                A conversation with {issue.guest.name}&nbsp;·&nbsp;{issue.guest.title}
              </p>
              <ShareButtons url={issueUrl} title={issue.headline} compact />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Thumbnail ───────────────────────────────────── */}
      {issue.thumbnail && (
        <div className="bg-parchment dark:bg-charcoal pb-12">
          <div className="container-editorial max-w-3xl">
            <AnimateIn delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-rim dark:border-rim-dark shadow-card-hover dark:shadow-card-hover-dark bg-white dark:bg-charcoal-card">
                <div className="relative aspect-[16/9] md:aspect-[2/1]">
                  <Image
                    src={issue.thumbnail}
                    alt={issue.headline}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      )}

      {/* ── Article body ────────────────────────────────── */}
      <section className="pb-16 bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-3xl">
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-14">

            {/* Main prose */}
            <div>
              {issue.sections.map((section, sIdx) => {
                const mid   = Math.floor(issue.sections.length / 2)
                const pqIdx = sIdx === mid ? 0 : sIdx === mid + 2 ? 1 : -1
                const showPQ = pqIdx >= 0 && pqIdx < issue.pullQuotes.length

                return (
                  <div key={sIdx}>
                    <div className="mb-8">
                      {section.heading && (
                        <h2 className="font-serif text-[1.3rem] md:text-[1.4rem] font-bold text-ink dark:text-ink-snow mb-5 leading-snug mt-10 first:mt-0">
                          {section.heading}
                        </h2>
                      )}
                      <div className="space-y-5">
                        {section.paragraphs.map((para, pIdx) => (
                          <p key={pIdx} className="font-sans text-[1rem] md:text-[1.0625rem] text-ink-muted dark:text-ink-snow-muted leading-[1.9]">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>

                    {showPQ && (
                      <blockquote className="my-10 pl-6 border-l-[3px] border-sage">
                        <p className="font-serif text-[1.3rem] font-bold text-ink dark:text-ink-snow leading-snug italic mb-3">
                          &ldquo;{issue.pullQuotes[pqIdx].quote}&rdquo;
                        </p>
                        <cite className="not-italic font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-sage dark:text-sage-glow">
                          — {issue.pullQuotes[pqIdx].attribution}
                        </cite>
                      </blockquote>
                    )}
                  </div>
                )
              })}

              {/* Episode CTA */}
              <div className="mt-12 pt-8 border-t border-rim dark:border-rim-dark flex flex-wrap items-center gap-4">
                <a href={issue.episodeUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold bg-sage text-white px-5 py-2.5 rounded-xl hover:bg-sage-hover transition-all shadow-sm">
                  🎙&nbsp;Listen to the episode
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
                <Link href="/subscribe" className="font-sans text-[13px] font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4">
                  Get the next issue free →
                </Link>
              </div>

              {/* Share */}
              <ShareButtons url={issueUrl} title={issue.headline} />
            </div>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5">
                {/* Guest card */}
                <div className="p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow mb-2">{issue.topic}</p>
                  <p className="font-serif text-[14px] font-bold text-ink dark:text-ink-snow mb-0.5">{issue.guest.name}</p>
                  <p className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint mb-4">{issue.guest.title}</p>
                  <a href={issue.episodeUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full font-sans text-[12px] font-semibold bg-sage text-white px-4 py-2 rounded-xl hover:bg-sage-hover transition-all">
                    🎙&nbsp;Listen
                  </a>
                </div>

                {/* Pull quote */}
                {issue.pullQuotes[0] && (
                  <div className="relative p-5 rounded-2xl bg-surface dark:bg-surface-dark border border-sage/20 dark:border-sage-glow/15 overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-sage via-sage-glow/60 to-transparent" />
                    <p className="font-serif text-[13px] italic text-ink dark:text-ink-snow leading-relaxed mb-3">
                      &ldquo;{issue.pullQuotes[0].quote}&rdquo;
                    </p>
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow">
                      — {issue.pullQuotes[0].attribution}
                    </p>
                  </div>
                )}

                {/* Share compact */}
                <div className="p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-3">Share</p>
                  <ShareButtons url={issueUrl} title={issue.headline} compact />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Prev / Next ─────────────────────────────────── */}
      {(prev || next) && (
        <section className="py-12 border-t border-rim dark:border-rim-dark bg-parchment-dim dark:bg-charcoal-lift">
          <div className="container-editorial max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link href={`/issues/${prev.id}`}
                  className="group flex flex-col gap-1 p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark hover:border-sage/30 transition-all">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint">← Previous</span>
                  <span className="font-serif text-[14px] font-bold text-ink dark:text-ink-snow leading-snug line-clamp-2 group-hover:text-sage transition-colors">{prev.headline}</span>
                </Link>
              ) : <div />}
              {next && (
                <Link href={`/issues/${next.id}`}
                  className="group flex flex-col gap-1 p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark hover:border-sage/30 transition-all text-right sm:items-end">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint">Next →</span>
                  <span className="font-serif text-[14px] font-bold text-ink dark:text-ink-snow leading-snug line-clamp-2 group-hover:text-sage transition-colors">{next.headline}</span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <SubscribeCTA />
    </>
  )
}
