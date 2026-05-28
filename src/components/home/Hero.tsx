import Image from 'next/image'
import Link from 'next/link'
import { SubscribeForm } from '@/components/ui/SubscribeForm'
import type { Newsletter } from '@/types/newsletter'

interface Props { issue?: Newsletter }

export function Hero({ issue }: Props) {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-parchment dark:bg-charcoal overflow-hidden pt-24 pb-20 dot-grid">

      {/* Ambient glow — will-change:filter kept off the main thread */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[600px] h-[500px] -translate-y-1/2 -translate-x-1/4 rounded-full bg-sage/[0.06] dark:bg-sage/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[350px] rounded-full bg-brand-amber/[0.04] dark:bg-brand-amber/[0.03] blur-[80px]" />
      </div>

      <div className="container-editorial relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: editorial content ──────────────────────── */}
          <div>

            {/* Eyebrow */}
            <div className="anim-fade-up anim-d0">
              <span className="inline-flex items-center gap-2 eyebrow mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                Season 1 &middot; Now Live &middot; Hosted by Aarthik Ramkumar
              </span>
            </div>

            {/* Headline */}
            <div className="anim-fade-up anim-d1">
              <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-6">
                Conversations shaping<br />
                the future of{' '}
                <em className="not-italic text-sage dark:text-sage-glow">Indian education</em>.
              </h1>
            </div>

            {/* Sub */}
            <div className="anim-fade-up anim-d2">
              <p className="body-lg dark:!text-ink-snow-muted max-w-xl text-balance mb-10">
                A weekly deep-dive with the architects, reformers, and builders rewriting what school,
                policy, and enterprise can be. Every conversation becomes a newsletter you can act on.
              </p>
            </div>

            {/* Subscribe form */}
            <div className="anim-fade-up anim-d3">
              <SubscribeForm
                size="xl"
                placeholder="Enter your email address"
                buttonLabel="Subscribe — It's Free"
                utmSource="hero"
                className="max-w-[520px]"
              />
            </div>

            {/* Social proof + be a guest */}
            <div className="anim-fade-up anim-d4">
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint">
                  5,000+ educators, policymakers, and founders · Free forever
                </p>
                <span className="hidden sm:block w-px h-3 bg-rim dark:bg-rim-dark" />
                <Link href="/be-a-guest"
                  className="font-sans text-xs font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4">
                  Want to be a guest? →
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="anim-fade-up anim-d5">
              <div className="flex items-center gap-8 mt-12 pt-10 border-t border-rim dark:border-rim-dark">
                {[
                  { n: '8',    label: 'Issues'  },
                  { n: '5K+',  label: 'Readers' },
                  { n: '6',    label: 'Topics'  },
                  { n: '100%', label: 'Free'    },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <p className="font-serif text-2xl font-bold text-ink dark:text-ink-snow">{n}</p>
                    <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right: latest episode card ───────────────────── */}
          {issue && (
            <div className="hidden lg:flex items-center justify-center anim-fade-up anim-d2">
              <div className="relative w-full max-w-[400px]">

                {/* Ambient glow behind card */}
                <div className="absolute -inset-8 rounded-3xl bg-sage/[0.08] dark:bg-sage/[0.06] blur-3xl pointer-events-none" />

                {/* Main card */}
                <a
                  href={issue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read: ${issue.title}`}
                  className="relative block rounded-2xl overflow-hidden border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark group shadow-card dark:shadow-card-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover dark:hover:shadow-card-hover-dark"
                >
                  {/* Thumbnail */}
                  {issue.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-parchment-dim dark:bg-charcoal-card">
                      <Image
                        src={issue.image}
                        alt={issue.title}
                        fill
                        priority
                        sizes="400px"
                        className="object-contain"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      {/* Issue badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-sage text-white shadow-sm">
                          Issue #01
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
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

                {/* "Latest" floating badge */}
                <div className="absolute -top-3 -right-3 bg-white dark:bg-surface-dark rounded-xl border border-rim/60 dark:border-rim-dark shadow-card-hover px-3 py-2 pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-ink dark:text-ink-snow">Latest</p>
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
