import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'

export const metadata: Metadata = {
  title: 'Be a Guest — Clarity Project',
  description:
    'Appear on Clarity Project. We speak with educators, policymakers, founders, and researchers reshaping India\'s future. Apply to be a guest.',
}

const whatToExpect = [
  {
    step: '01',
    title: 'A real conversation',
    body: 'Not a PR interview. We read your work, study your organisation, and come prepared with specific questions about your thinking — the decisions, the mistakes, the things you\'d do differently.',
  },
  {
    step: '02',
    title: 'Deep audience, not wide',
    body: '5,000+ educators, policymakers, founders, and researchers in India. People who read the long version because they care about the problem — not casual scrollers.',
  },
  {
    step: '03',
    title: 'A newsletter that does the work justice',
    body: 'After every conversation, we write a long-form newsletter — key frameworks, debates, concrete ideas — that reaches our full subscriber base. Your ideas live beyond the episode.',
  },
  {
    step: '04',
    title: 'Your time is respected',
    body: 'Recording takes 60–75 minutes, done remotely at your convenience. We send questions in advance. No performance required — just an honest exchange.',
  },
]

const guestTypes = [
  {
    icon: '🏫',
    label: 'School & Institution Leaders',
    description: 'Principals, school chains, university leaders driving curriculum or structural change.',
  },
  {
    icon: '📜',
    label: 'Policy Architects',
    description: 'Bureaucrats, advisors, and researchers shaping education and enterprise policy in India.',
  },
  {
    icon: '🚀',
    label: 'Founders & Operators',
    description: 'Builders solving real problems in EdTech, skill development, or related sectors.',
  },
  {
    icon: '🔬',
    label: 'Researchers & Thinkers',
    description: 'Academics and independent researchers with grounded, evidence-based perspectives.',
  },
]

const faqs = [
  {
    q: 'How long is a typical recording?',
    a: '60 to 75 minutes over video call (Zoom or Google Meet). We send the questions beforehand so you can think — not memorise answers, just orient yourself.',
  },
  {
    q: 'Will I be able to review the episode before it goes live?',
    a: 'Yes. We share a draft of the newsletter and the episode title / description for your review. We don\'t do surprise edits.',
  },
  {
    q: 'Is this a paid appearance?',
    a: 'No — and we don\'t accept payment to feature guests either. Every guest appears because the conversation is worth having.',
  },
  {
    q: 'What if I\'m not comfortable on camera?',
    a: 'The primary output is the newsletter — audio-only is fine. Many of our best conversations have been voice-only. Your ideas are the product, not your face.',
  },
  {
    q: 'How far out are you booking?',
    a: 'We typically book 4–6 weeks ahead. Reach out and we\'ll find a slot that works.',
  },
]

export default function BeAGuestPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <AnimateIn>
              <p className="eyebrow mb-6">Be a Guest</p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-7">
                Your work deserves a real conversation.
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="body-lg mb-5 dark:!text-ink-snow-muted">
                Clarity Project is a weekly long-form conversation with the educators, policymakers, founders, and researchers reshaping India&rsquo;s systems. If you have something important to say about education, policy, or entrepreneurship — we want to hear it.
              </p>
              <p className="body-lg mb-10 dark:!text-ink-snow-muted">
                We keep it substantive, we do our homework, and we write a newsletter that gives your ideas a life beyond the episode. No fluff, no filler.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <a
                href="mailto:aarthik@clarityproject.in?subject=Guest%20Application%20—%20The%20Insight%20Hour&body=Hi%20Aarthik%2C%0A%0AI'd%20love%20to%20be%20considered%20as%20a%20guest%20on%20The%20Insight%20Hour.%20Here%20is%20a%20brief%20overview%20of%20my%20work%3A%0A%0A[Your%20background%20and%20what%20you%20want%20to%20discuss]%0A%0ABest%2C%0A[Your%20Name]"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold bg-sage text-white px-6 py-3.5 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm"
              >
                Apply to be a guest
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* Who we look for */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12">
            <p className="eyebrow mb-3">Who We Talk To</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              The people shaping what&rsquo;s possible.
            </h2>
            <p className="body-lg mt-4 max-w-lg dark:!text-ink-snow-muted">
              We don&rsquo;t care about titles. We care about whether you have done the work, made the mistakes, and formed real opinions from them.
            </p>
          </AnimateIn>

          <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.08}>
            {guestTypes.map(({ icon, label, description }) => (
              <StaggerItem key={label}>
                <div className="flex gap-5 p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full">
                  <span className="text-2xl shrink-0 mt-0.5" role="img" aria-hidden="true">{icon}</span>
                  <div>
                    <h3 className="font-serif text-[17px] font-bold text-ink dark:text-ink-snow mb-1.5">{label}</h3>
                    <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* What to expect */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12">
            <p className="eyebrow mb-3">What to Expect</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              We keep it simple. And good.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatToExpect.map(({ step, title, body }, i) => (
              <AnimateIn key={step} delay={i * 0.07}>
                <div className="flex gap-5 p-7 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full">
                  <span className="font-serif text-[13px] font-bold text-sage dark:text-sage-glow shrink-0 mt-0.5 w-8">{step}</span>
                  <div>
                    <h3 className="font-serif text-[17px] font-bold text-ink dark:text-ink-snow mb-2">{title}</h3>
                    <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{body}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* FAQ */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-2xl">
          <AnimateIn className="mb-10">
            <p className="eyebrow mb-3">Common Questions</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              Quick answers.
            </h2>
          </AnimateIn>

          <div className="space-y-6">
            {faqs.map(({ q, a }, i) => (
              <AnimateIn key={q} delay={i * 0.06}>
                <div className="border-b border-rim dark:border-rim-dark pb-6 last:border-0">
                  <h3 className="font-serif text-[17px] font-bold text-ink dark:text-ink-snow mb-2">{q}</h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* CTA */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-xl mx-auto text-center">
          <AnimateIn>
            <p className="eyebrow mb-5">Ready?</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-5">
              Send us a note. We read everything.
            </h2>
            <p className="body-lg mb-8 dark:!text-ink-snow-muted text-balance">
              A sentence or two about who you are and what you want to discuss is enough. We&rsquo;ll come back to you within 48 hours.
            </p>
            <a
              href="mailto:aarthik@clarityproject.in?subject=Guest%20Application%20—%20The%20Insight%20Hour"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold bg-sage text-white px-6 py-3.5 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm"
            >
              aarthik@clarityproject.in
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
            <p className="mt-4 font-sans text-xs text-ink-faint dark:text-ink-snow-faint">
              Or find us on{' '}
              <a href="https://linkedin.com" className="underline hover:text-sage dark:hover:text-sage-glow">LinkedIn</a>
              {' '}·{' '}
              <a href="https://twitter.com" className="underline hover:text-sage dark:hover:text-sage-glow">Twitter / X</a>
            </p>
          </AnimateIn>
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
