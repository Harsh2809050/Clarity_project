import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { workIssues } from '@/data/work'

export const metadata: Metadata = {
  title: 'Our Work — Every Issue, In Full',
  description:
    'Every conversation Clarity Project has had — the insights, the ideas, and the exact arguments that came out of each episode.',
}

export default function OurWorkPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn>
            <p className="eyebrow mb-5">Our Work</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-5">
              Every conversation.<br />
              <span className="text-sage">In full detail.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="body-lg max-w-xl dark:!text-ink-snow-muted">
              This is not a summary page. Each issue below contains the actual ideas, arguments, and insights from the conversation — written out in full so you can think with them, share them, and act on them.
            </p>
          </AnimateIn>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Issues ───────────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          {workIssues.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-ink-muted dark:text-ink-snow-muted">First issue coming soon.</p>
            </div>
          ) : (
            <div className="space-y-24">
              {workIssues.map((issue, idx) => (
                <AnimateIn key={issue.id} delay={idx * 0.05}>
                  <article className="relative">

                    {/* Issue badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sage text-white font-sans text-[13px] font-bold shrink-0">
                        {issue.issueNumber}
                      </span>
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-faint dark:text-ink-snow-faint">
                        Issue #{String(issue.issueNumber).padStart(2, '0')} &nbsp;·&nbsp; {issue.date} &nbsp;·&nbsp; {issue.topic}
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-2">
                      {issue.headline}
                    </h2>
                    {issue.subheadline && (
                      <p className="font-serif text-2xl md:text-3xl font-bold text-sage leading-tight tracking-tight mb-6">
                        {issue.subheadline}
                      </p>
                    )}

                    {/* Guest */}
                    <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-sage dark:text-sage-glow mb-8">
                      with {issue.guest.name} &nbsp;·&nbsp; {issue.guest.title}
                    </p>

                    {/* Colour rule */}
                    <div className="h-[3px] rounded-full bg-gradient-to-r from-sage via-brand-amber to-brand-teal mb-8" />

                    {/* Hook */}
                    <div className="mb-8">
                      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-ink-faint dark:text-ink-snow-faint mb-3">
                        What this conversation is about
                      </p>
                      <p className="body-lg dark:!text-ink-snow-muted leading-[1.8]">{issue.hook}</p>
                    </div>

                    {/* Story block */}
                    {issue.storyBlock && (
                      <div className="bg-parchment-dim dark:bg-charcoal-lift border-l-4 border-brand-gold rounded-r-2xl p-6 mb-8">
                        <div className="space-y-2">
                          {issue.storyBlock.map(({ month, text }) => (
                            <p key={month} className="font-sans text-[14px] text-ink-muted dark:text-ink-snow-muted leading-[1.9]">
                              <strong className="text-ink dark:text-ink-snow font-semibold">{month}:</strong> {text}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cost callout */}
                    {issue.callout && (
                      <div className="bg-brand-navy rounded-2xl p-7 mb-10 text-center">
                        <p className="font-sans text-[11px] text-brand-teal/80 uppercase tracking-[0.18em] font-bold mb-3">
                          {issue.callout.label}
                        </p>
                        <p className="font-serif text-4xl font-bold text-brand-amber mb-3">{issue.callout.value}</p>
                        <p className="font-sans text-[13px] text-[#EDE8E2] leading-[1.7] max-w-lg mx-auto">
                          {issue.callout.description}
                        </p>
                      </div>
                    )}

                    {/* Insights */}
                    <div className="mb-10">
                      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-sage dark:text-sage-glow mb-7">
                        {issue.insights.length} Key Insights
                      </p>
                      <div className="space-y-8">
                        {issue.insights.map((insight, i) => {
                          const colours = ['bg-sage', 'bg-brand-blue', 'bg-brand-teal']
                          return (
                            <div key={i} className="flex gap-5">
                              <div className={`${colours[i % colours.length]} shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[14px] mt-1`}>
                                {i + 1}
                              </div>
                              <div>
                                <h3 className="font-serif text-[18px] font-bold text-ink dark:text-ink-snow mb-3 leading-snug">
                                  {insight.heading}
                                </h3>
                                <p className="body-md dark:!text-ink-snow-muted leading-[1.85]">{insight.body}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Pull quote */}
                    <div className="border-l-4 border-sage bg-brand-navy rounded-r-2xl p-7 mb-8">
                      <p className="font-serif text-xl md:text-2xl text-white italic leading-[1.65] mb-4">
                        &ldquo;{issue.pullQuote}&rdquo;
                      </p>
                      <p className="font-sans text-[12px] text-brand-amber font-bold tracking-[0.05em]">
                        — {issue.quoteAttribution}
                      </p>
                    </div>

                    {/* Takeaway */}
                    <div className="border-2 border-sage rounded-2xl p-6 bg-sage/[0.04] dark:bg-sage/[0.08] mb-8">
                      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-sage dark:text-sage-glow mb-3">
                        This week&rsquo;s takeaway
                      </p>
                      <p className="font-sans text-[15px] text-ink dark:text-ink-snow leading-[1.8] font-medium">
                        {issue.takeaway}
                      </p>
                    </div>

                    {/* Listen CTA */}
                    <div className="flex flex-wrap items-center gap-4">
                      <a
                        href={issue.episodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold bg-sage text-white px-6 py-3 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm"
                      >
                        🎙&nbsp; Listen to This Episode
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                      <Link
                        href="/subscribe"
                        className="font-sans text-[14px] font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4 transition-all"
                      >
                        Get the next issue in your inbox →
                      </Link>
                    </div>

                  </article>

                  {/* Divider between issues */}
                  {idx < workIssues.length - 1 && (
                    <div className="mt-20 rule" />
                  )}
                </AnimateIn>
              ))}
            </div>
          )}

          {/* Coming soon note if only a few issues */}
          {workIssues.length < 3 && (
            <div className="mt-20 pt-12 border-t border-rim dark:border-rim-dark text-center">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-faint dark:text-ink-snow-faint mb-3">
                New every week
              </p>
              <p className="font-serif text-xl font-bold text-ink dark:text-ink-snow mb-2">
                More conversations coming soon.
              </p>
              <p className="body-md text-ink-muted dark:text-ink-snow-muted">
                Subscribe to get each new issue in your inbox the moment it drops.
              </p>
            </div>
          )}
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
