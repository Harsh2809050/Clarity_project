import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { workIssues } from '@/data/work'

export const metadata: Metadata = {
  title: 'Our Work — The Clarity Project',
  description:
    'Every conversation we have published — written out in full, with the ideas, arguments and insights that came out of each episode.',
}

export default function OurWorkPage() {
  redirect('/')
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
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
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Issues ──────────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          {workIssues.length === 0 ? (
            <p className="font-sans text-ink-muted dark:text-ink-snow-muted text-center py-24">
              First issue coming soon.
            </p>
          ) : (
            <div className="space-y-28">
              {workIssues.map((issue, issueIdx) => {

                // weave pull quotes between sections
                const pqCount = issue.pullQuotes.length

                return (
                  <AnimateIn key={issue.id} delay={issueIdx * 0.04}>
                    <article>

                      {/* ── Issue header ──────────────────── */}
                      <header className="mb-10 pb-10 border-b border-rim dark:border-rim-dark">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sage text-white font-sans text-[12px] font-bold shrink-0">
                            {issue.issueNumber}
                          </span>
                          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint dark:text-ink-snow-faint">
                            Issue #{String(issue.issueNumber).padStart(2, '0')}
                            &nbsp;·&nbsp;
                            {issue.date}
                            &nbsp;·&nbsp;
                            {issue.topic}
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
                          A conversation with {issue.guest.name}
                          &nbsp;·&nbsp;
                          {issue.guest.title}
                        </p>
                      </header>

                      {/* ── Article body ──────────────────── */}
                      <div className="max-w-[680px]">
                        {issue.sections.map((section, sIdx) => {
                          // insert a pull quote roughly in the middle of the article
                          const midPoint = Math.floor(issue.sections.length / 2)
                          const pqIndex = sIdx === midPoint ? 0 : sIdx === midPoint + 2 ? 1 : -1
                          const showPQ = pqIndex >= 0 && pqIndex < pqCount

                          return (
                            <div key={sIdx}>
                              {/* Section */}
                              <div className="mb-8">
                                {section.heading && (
                                  <h3 className="font-serif text-[1.25rem] font-bold text-ink dark:text-ink-snow mb-5 leading-snug">
                                    {section.heading}
                                  </h3>
                                )}
                                <div className="space-y-5">
                                  {section.paragraphs.map((para, pIdx) => (
                                    <p
                                      key={pIdx}
                                      className="font-sans text-[1rem] text-ink-muted dark:text-ink-snow-muted leading-[1.85]"
                                    >
                                      {para}
                                    </p>
                                  ))}
                                </div>
                              </div>

                              {/* Pull quote inserted mid-article */}
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
                      </div>

                      {/* ── Footer CTA ────────────────────── */}
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
                        <Link
                          href="/subscribe"
                          className="font-sans text-[13px] font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4 transition-all"
                        >
                          Get the next issue free →
                        </Link>
                      </div>

                    </article>

                    {issueIdx < workIssues.length - 1 && (
                      <div className="mt-24 rule" />
                    )}
                  </AnimateIn>
                )
              })}
            </div>
          )}

          {/* Coming soon note */}
          {workIssues.length < 3 && (
            <div className="mt-20 pt-12 border-t border-rim dark:border-rim-dark">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint dark:text-ink-snow-faint mb-3">
                Published weekly
              </p>
              <p className="font-serif text-xl font-bold text-ink dark:text-ink-snow mb-2">
                More conversations are coming.
              </p>
              <p className="body-md text-ink-muted dark:text-ink-snow-muted mb-5">
                Subscribe to get each new issue the moment it publishes.
              </p>
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold bg-sage text-white px-5 py-2.5 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm"
              >
                Subscribe free
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
