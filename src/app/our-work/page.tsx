import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { TableOfContents } from '@/components/work/TableOfContents'
import { workIssues } from '@/data/work'

export const metadata: Metadata = {
  title: 'Our Work — The Clarity Project',
  description:
    'Every conversation we have published — written out in full, with the ideas, arguments and insights that came out of each episode.',
  openGraph: {
    images: [{ url: '/thumbnails/issue-01-mahesh-balakrishnan.png', width: 1200, height: 675 }],
  },
  twitter: { images: ['/thumbnails/issue-01-mahesh-balakrishnan.png'] },
}

const tocEntries = workIssues.map((issue) => ({
  id: issue.id,
  issueNumber: issue.issueNumber,
  headline: issue.headline,
}))

export default function OurWorkPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-parchment dark:bg-charcoal dot-grid">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <AnimateIn>
                <p className="eyebrow mb-5">Our Work</p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-5">
                  Every conversation,<br />
                  <span className="text-sage">written out in full.</span>
                </h1>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p className="body-lg max-w-xl dark:!text-ink-snow-muted">
                  This is not a summary and not a highlights reel. Each piece below is the full argument from the conversation — every insight, every implication, every idea that matters — written as a proper article you can read, share, and use.
                </p>
              </AnimateIn>
            </div>

            {/* Right — first issue thumbnail card */}
            {workIssues[0]?.thumbnail && (
              <AnimateIn delay={0.15} className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-6 rounded-3xl bg-sage/[0.07] dark:bg-sage/[0.05] blur-3xl pointer-events-none" />
                  <div className="relative rounded-2xl overflow-hidden border border-rim dark:border-rim-dark shadow-card-hover dark:shadow-card-hover-dark">
                    <div className="relative aspect-[2/1] overflow-hidden">
                      <Image
                        src={workIssues[0].thumbnail}
                        alt={workIssues[0].headline}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-md bg-sage text-white">
                          Issue #01
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-serif text-white text-lg font-bold leading-snug line-clamp-2">
                          {workIssues[0].headline}
                        </p>
                        <p className="font-serif text-white/80 text-base font-semibold mt-1">
                          {workIssues[0].subheadline}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 py-4 bg-surface dark:bg-surface-dark flex items-center justify-between">
                      <div>
                        <p className="font-sans text-[12px] font-semibold text-ink dark:text-ink-snow">
                          {workIssues[0].guest.name}
                        </p>
                        <p className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">
                          {workIssues[0].guest.title}
                        </p>
                      </div>
                      <span className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">
                        {workIssues[0].readTime ?? '8 min read'}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )}
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Issues + TOC ─────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          {workIssues.length === 0 ? (
            <p className="font-sans text-ink-muted dark:text-ink-snow-muted text-center py-24">
              First issue coming soon.
            </p>
          ) : (
            /* Outer flex: [sticky TOC] + [articles] */
            <div className="flex gap-10 xl:gap-14">

              {/* ── Left: sticky Table of Contents (xl+ only) ── */}
              <TableOfContents entries={tocEntries} />

              {/* ── Right: articles ─────────────────────────── */}
              <div className="flex-1 min-w-0 space-y-28">
                {workIssues.map((issue, issueIdx) => {
                  const pqCount = issue.pullQuotes.length

                  return (
                    <AnimateIn key={issue.id} delay={issueIdx * 0.04}>
                      {/* Article root — id used by TOC scroll-spy */}
                      <article id={issue.id}>

                        {/* ── Issue header ────────────────────── */}
                        <header className="mb-10 pb-10 border-b border-rim dark:border-rim-dark">
                          <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sage text-white font-sans text-[12px] font-bold shrink-0">
                              {issue.issueNumber}
                            </span>
                            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint dark:text-ink-snow-faint">
                              Issue #{String(issue.issueNumber).padStart(2, '0')}
                              &nbsp;·&nbsp;{issue.date}
                              &nbsp;·&nbsp;{issue.topic}
                            </span>
                          </div>

                          <h2 className="font-serif text-3xl md:text-[2.6rem] font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-2">
                            {issue.headline}
                          </h2>
                          {issue.subheadline && (
                            <p className="font-serif text-2xl md:text-3xl font-bold text-sage leading-tight tracking-tight mb-7">
                              {issue.subheadline}
                            </p>
                          )}
                          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-sage dark:text-sage-glow">
                            A conversation with {issue.guest.name}&nbsp;·&nbsp;{issue.guest.title}
                          </p>
                        </header>

                        {/* ── 2-col: article body + sidebar ───── */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_280px] gap-12 xl:gap-14">

                          {/* Article body */}
                          <div>
                            {issue.sections.map((section, sIdx) => {
                              const midPoint = Math.floor(issue.sections.length / 2)
                              const pqIndex = sIdx === midPoint ? 0 : sIdx === midPoint + 2 ? 1 : -1
                              const showPQ = pqIndex >= 0 && pqIndex < pqCount

                              return (
                                <div key={sIdx}>
                                  <div className="mb-8">
                                    {section.heading && (
                                      <h3 className="font-serif text-[1.25rem] font-bold text-ink dark:text-ink-snow mb-5 leading-snug">
                                        {section.heading}
                                      </h3>
                                    )}
                                    <div className="space-y-5">
                                      {section.paragraphs.map((para, pIdx) => (
                                        <p key={pIdx} className="font-sans text-[1rem] text-ink-muted dark:text-ink-snow-muted leading-[1.85]">
                                          {para}
                                        </p>
                                      ))}
                                    </div>
                                  </div>

                                  {showPQ && (
                                    <blockquote className="my-10 border-l-[3px] border-sage pl-6">
                                      <p className="font-serif text-[1.35rem] font-bold text-ink dark:text-ink-snow leading-snug italic mb-3">
                                        &ldquo;{issue.pullQuotes[pqIndex].quote}&rdquo;
                                      </p>
                                      <cite className="not-italic font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-sage dark:text-sage-glow">
                                        — {issue.pullQuotes[pqIndex].attribution}
                                      </cite>
                                    </blockquote>
                                  )}
                                </div>
                              )
                            })}

                            {/* Article footer CTA */}
                            <div className="mt-12 pt-8 border-t border-rim dark:border-rim-dark flex flex-wrap items-center gap-5">
                              <a
                                href={issue.episodeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold bg-sage text-white px-5 py-2.5 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm"
                              >
                                🎙&nbsp; Listen to the episode
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                              </a>
                              <Link href="/subscribe" className="font-sans text-[13px] font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4 transition-all">
                                Get the next issue free →
                              </Link>
                            </div>
                          </div>

                          {/* ── Sticky sidebar ─────────────────── */}
                          <aside className="hidden lg:block">
                            <div className="sticky top-28 space-y-5">

                              {/* Episode thumbnail card */}
                              {issue.thumbnail && (
                                <div className="rounded-2xl overflow-hidden border border-rim dark:border-rim-dark shadow-card dark:shadow-card-dark">
                                  <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                      src={issue.thumbnail}
                                      alt={issue.headline}
                                      fill
                                      sizes="300px"
                                      className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                                    <div className="absolute top-3 left-3">
                                      <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-sage text-white">
                                        Issue #{String(issue.issueNumber).padStart(2, '0')}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="p-4 bg-surface dark:bg-surface-dark">
                                    <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow mb-1">{issue.topic}</p>
                                    <p className="font-serif text-[14px] font-bold text-ink dark:text-ink-snow leading-snug mb-1">
                                      A conversation with {issue.guest.name}
                                    </p>
                                    <p className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint mb-4">
                                      {issue.guest.title}
                                    </p>
                                    <a
                                      href={issue.episodeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-2 w-full font-sans text-[13px] font-semibold bg-sage text-white px-4 py-2.5 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm"
                                    >
                                      🎙&nbsp; Listen to episode
                                    </a>
                                  </div>
                                </div>
                              )}

                              {/* Pull quote card */}
                              {issue.pullQuotes[0] && (
                                <div className="relative p-5 rounded-2xl bg-surface dark:bg-surface-dark border border-sage/20 dark:border-sage-glow/15 shadow-card dark:shadow-card-dark overflow-hidden">
                                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-sage via-sage-glow/60 to-transparent" />
                                  <span className="block font-serif text-[56px] leading-[0.8] text-sage/[0.1] select-none mb-2" aria-hidden="true">&ldquo;</span>
                                  <p className="font-serif text-[13.5px] italic text-ink dark:text-ink-snow leading-relaxed mb-3">
                                    &ldquo;{issue.pullQuotes[0].quote}&rdquo;
                                  </p>
                                  <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow">
                                    — {issue.pullQuotes[0].attribution}
                                  </p>
                                </div>
                              )}

                              {/* Subscribe nudge */}
                              <div className="p-5 rounded-2xl bg-sage/[0.06] dark:bg-sage/[0.08] border border-sage/15 dark:border-sage-glow/15">
                                <p className="font-serif text-[15px] font-bold text-ink dark:text-ink-snow mb-1">
                                  Get the next one free
                                </p>
                                <p className="font-sans text-[12px] text-ink-muted dark:text-ink-snow-muted leading-relaxed mb-4">
                                  Every week, one conversation worth your time — straight to your inbox.
                                </p>
                                <Link
                                  href="/subscribe"
                                  className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold text-sage dark:text-sage-glow hover:underline underline-offset-4 transition-colors"
                                >
                                  Subscribe free
                                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                  </svg>
                                </Link>
                              </div>

                            </div>
                          </aside>

                        </div>{/* /2-col grid */}

                      </article>

                      {issueIdx < workIssues.length - 1 && (
                        <div className="mt-24 rule" />
                      )}
                    </AnimateIn>
                  )
                })}
              </div>{/* /articles */}

            </div>
          )}
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
