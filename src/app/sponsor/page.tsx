import type { Metadata } from 'next'
import Link from 'next/link'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Sponsor — Clarity Project',
  description: 'Partner with The Clarity Project to reach 5,000+ educators, policymakers, founders and researchers in India.',
}

const stats = [
  { n: '5,000+', label: 'Active subscribers' },
  { n: '60%+',   label: 'Open rate' },
  { n: '8+',     label: 'Issues published' },
  { n: '100%',   label: 'India-focused audience' },
]

const audience = [
  { icon: '🏫', label: 'School & institution leaders', share: '35%' },
  { icon: '🚀', label: 'EdTech founders & operators',  share: '25%' },
  { icon: '📜', label: 'Policy researchers & advisors', share: '22%' },
  { icon: '🔬', label: 'Academics & independent thinkers', share: '18%' },
]

const packages = [
  {
    name: 'Newsletter Mention',
    price: '₹15,000',
    period: 'per issue',
    features: [
      'One dedicated paragraph in the issue body',
      'Your link included in the issue footer',
      'Mentioned in the subject line if relevant',
      'Minimum 2-issue commitment',
    ],
  },
  {
    name: 'Exclusive Sponsor',
    price: '₹45,000',
    period: 'per issue',
    highlight: true,
    features: [
      'Opening sponsor block with logo',
      'One-paragraph custom message (your copy, our tone)',
      'Featured in social posts for the issue',
      'Logo in our email header for the week',
      'Minimum 1-issue commitment',
    ],
  },
  {
    name: 'Series Sponsor',
    price: 'Custom',
    period: 'quarterly',
    features: [
      'All Exclusive Sponsor benefits for 12 issues',
      'Co-branded content opportunity',
      'Early access to guest pipeline',
      'Monthly performance reports',
    ],
  },
]

export default function SponsorPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-parchment dark:bg-charcoal dot-grid">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <AnimateIn>
              <p className="eyebrow mb-5">Sponsor</p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-5">
                Reach the people reshaping Indian education.
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="body-lg max-w-xl dark:!text-ink-snow-muted mb-8">
                The Clarity Project reaches 5,000+ senior educators, policymakers, founders, and researchers — the people making decisions, not just reading about them. Our readers are practitioners, not scrollers.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.25}>
              <a href="mailto:office@theclarityproject.in?subject=Sponsorship%20Enquiry%20—%20The%20Clarity%20Project"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold bg-sage text-white px-6 py-3.5 rounded-xl hover:bg-sage-hover transition-all shadow-sm">
                Enquire about sponsorship
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* Stats */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12">
            <p className="eyebrow mb-3">By the Numbers</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              A small, serious audience.
            </h2>
          </AnimateIn>

          <StaggerList className="grid grid-cols-2 md:grid-cols-4 gap-5" stagger={0.07}>
            {stats.map(({ n, label }) => (
              <StaggerItem key={label}>
                <div className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark text-center">
                  <p className="font-serif text-[2.2rem] font-bold text-sage mb-1">{n}</p>
                  <p className="font-sans text-[12px] text-ink-muted dark:text-ink-snow-muted">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* Audience breakdown */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12">
            <p className="eyebrow mb-3">Who Reads This</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              Decision-makers, not students.
            </h2>
          </AnimateIn>

          <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.08}>
            {audience.map(({ icon, label, share }) => (
              <StaggerItem key={label}>
                <div className="flex items-center gap-5 p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark">
                  <span className="text-3xl shrink-0" role="img" aria-hidden="true">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-[16px] font-bold text-ink dark:text-ink-snow mb-0.5">{label}</p>
                  </div>
                  <span className="font-serif text-[1.5rem] font-bold text-sage shrink-0">{share}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* Packages */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12">
            <p className="eyebrow mb-3">Packages</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              Simple, transparent pricing.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(({ name, price, period, features, highlight }, i) => (
              <AnimateIn key={name} delay={i * 0.08}>
                <div className={`relative flex flex-col h-full p-7 rounded-2xl border transition-all ${
                  highlight
                    ? 'border-sage/40 bg-sage/[0.04] dark:bg-sage/[0.06] shadow-card-hover'
                    : 'border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark shadow-card dark:shadow-card-dark'
                }`}>
                  {highlight && (
                    <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-sage via-sage-glow/60 to-transparent" />
                  )}
                  {highlight && (
                    <span className="inline-block font-sans text-[10px] font-bold uppercase tracking-widest text-sage dark:text-sage-glow mb-4">Most Popular</span>
                  )}
                  <h3 className="font-serif text-[1.2rem] font-bold text-ink dark:text-ink-snow mb-1">{name}</h3>
                  <div className="mb-6">
                    <span className="font-serif text-[1.8rem] font-bold text-ink dark:text-ink-snow">{price}</span>
                    <span className="font-sans text-sm text-ink-faint dark:text-ink-snow-faint ml-1">/ {period}</span>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 font-sans text-[13px] text-ink-muted dark:text-ink-snow-muted">
                        <svg className="w-4 h-4 text-sage shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:office@theclarityproject.in?subject=Sponsorship%20Enquiry"
                    className={`flex items-center justify-center w-full py-2.5 rounded-xl font-sans text-sm font-semibold transition-all ${
                      highlight
                        ? 'bg-sage text-white hover:bg-sage-hover shadow-sm'
                        : 'border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:border-sage/40 hover:text-sage dark:hover:text-sage-glow'
                    }`}>
                    Get in touch
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={0.3} className="mt-10 p-6 rounded-2xl bg-sage/[0.06] dark:bg-sage/[0.08] border border-sage/20 dark:border-sage-glow/15 text-center">
            <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted mb-1">
              All prices are excluding GST. Custom packages available for brands with specific reach objectives.
            </p>
            <p className="font-sans text-sm font-medium text-ink dark:text-ink-snow">
              Email <a href="mailto:office@theclarityproject.in" className="text-sage dark:text-sage-glow hover:underline underline-offset-4">office@theclarityproject.in</a> to start a conversation.
            </p>
          </AnimateIn>
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
