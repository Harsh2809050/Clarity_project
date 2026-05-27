import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { LinkButton } from '@/components/ui/Button'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'

export const metadata: Metadata = {
  title: 'About — Clarity Project',
  description: 'The story behind Clarity Project — why we started, who it\'s for, and what we believe.',
}

const topics = [
  { label: 'Education Policy', description: 'What works, what doesn\'t, and why the gap between policy and classroom is the central challenge of our generation.' },
  { label: 'EdTech', description: 'Products built for real teachers and real students — not just urban English-speaking markets.' },
  { label: 'Entrepreneurship', description: 'Founders solving problems no VC wanted to fund, in markets no playbook was written for.' },
  { label: 'Higher Education', description: 'The university system, its rankings obsession, and the rare institutions doing the interesting work.' },
  { label: 'Policy & Governance', description: 'The regulatory architecture that shapes what\'s possible — and the people trying to change it from the inside.' },
  { label: 'Skill Development', description: 'The often-ignored pipeline between education and meaningful employment.' },
]

const pressLogos = [
  { name: 'YourStory', note: 'As heard on' },
  { name: 'Inc42', note: 'Featured in' },
  { name: 'The Hindu', note: 'Mentioned in' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <AnimateIn><p className="eyebrow mb-6">About</p></AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-7">
                Ideas worth sharing deserve a real audience.
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="body-lg mb-5 dark:!text-ink-snow-muted">
                I&rsquo;m <strong className="text-ink dark:text-ink-snow font-semibold">Aarthik Ramkumar</strong>, a researcher and writer focused on the systems shaping India&rsquo;s future — education, policy, and the entrepreneurs rebuilding both.
              </p>
              <p className="body-lg mb-5 dark:!text-ink-snow-muted">
                I kept meeting remarkable people — school principals rewriting curriculum from scratch, bureaucrats pushing reform from the inside, founders solving problems no investor wanted to fund — whose ideas were changing lives quietly, with almost no attention.
              </p>
              <p className="body-lg mb-10 dark:!text-ink-snow-muted">
                Clarity Project is my attempt to give those conversations the platform they deserve. No soundbites, no PR spin. After every conversation, I write a newsletter that goes deep — frameworks, debates, and ideas you can actually use.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <LinkButton href="/subscribe" size="lg">
                  Subscribe Free
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </LinkButton>
                <Link href="/be-a-guest"
                  className="font-sans text-sm font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4 transition-all">
                  Interested in being a guest? →
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* Host bio section */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Photo */}
            <AnimateIn direction="left">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-parchment-dim dark:bg-charcoal-lift shadow-card dark:shadow-card-dark">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=1000&q=80"
                    alt="Aarthik Ramkumar — Host, Clarity Project"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating credential card */}
                <div className="absolute -bottom-5 -right-5 bg-surface dark:bg-surface-dark border border-rim dark:border-rim-dark rounded-xl px-5 py-4 shadow-card dark:shadow-card-dark max-w-[200px]">
                  <p className="font-serif text-sm font-bold text-ink dark:text-ink-snow mb-0.5">Aarthik Ramkumar</p>
                  <p className="font-sans text-[11px] text-ink-muted dark:text-ink-snow-muted">Host &amp; Editor</p>
                  <p className="font-sans text-[11px] text-ink-muted dark:text-ink-snow-muted">Clarity Project</p>
                </div>
              </div>
            </AnimateIn>

            {/* Bio text */}
            <AnimateIn direction="right" delay={0.1}>
              <p className="eyebrow mb-6">Your Host</p>
              <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight mb-6">
                Aarthik Ramkumar
              </h2>
              <div className="space-y-4">
                <p className="body-lg dark:!text-ink-snow-muted">
                  Researcher, writer, and curious generalist with a focus on the institutions and individuals reshaping India — particularly at the intersection of education, governance, and technology.
                </p>
                <p className="body-lg dark:!text-ink-snow-muted">
                  Before starting Clarity Project, Aarthik spent years in the field — interviewing educators, policymakers, and founders across India, and writing long-form essays on why systems succeed or fail.
                </p>
                <p className="body-lg dark:!text-ink-snow-muted">
                  His questions are detailed, his notes are thorough, and his goal is the same for every guest: get to the idea that actually matters — the one that doesn&rsquo;t make it into the press release.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  { href: 'https://linkedin.com', label: 'LinkedIn' },
                  { href: 'https://twitter.com', label: 'Twitter / X' },
                  { href: 'mailto:aarthik@clarityproject.in', label: 'Email' },
                ].map(({ href, label }) => (
                  <a key={label} href={href}
                    className="font-sans text-[13px] font-medium px-4 py-2 rounded-xl border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:text-sage dark:hover:text-sage-glow hover:border-sage/30 transition-all duration-200">
                    {label}
                  </a>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* Topics */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12">
            <p className="eyebrow mb-3">What We Cover</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              Six themes. One through line.
            </h2>
            <p className="body-lg mt-4 max-w-lg dark:!text-ink-snow-muted">
              Every conversation connects to a single question: what would it take for India&rsquo;s systems to match the ambition of its people?
            </p>
          </AnimateIn>

          <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
            {topics.map(({ label, description }) => (
              <StaggerItem key={label}>
                <div className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full">
                  <h3 className="font-serif text-lg font-bold text-ink dark:text-ink-snow mb-2">{label}</h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* Philosophy */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-2xl">
          <AnimateIn><p className="eyebrow mb-6">Editorial Philosophy</p></AnimateIn>
          <AnimateIn delay={0.1}>
            <blockquote className="font-serif text-2xl md:text-3xl font-bold text-ink dark:text-ink-snow leading-snug tracking-tight text-balance mb-7">
              &ldquo;Most reporting treats complexity as a problem to simplify. We treat it as the point.&rdquo;
            </blockquote>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="body-lg mb-5 dark:!text-ink-snow-muted">Every issue is written for someone who already cares and wants the full argument, not the headline version. Long-form, nuanced, and rigorous without being academic.</p>
            <p className="body-lg dark:!text-ink-snow-muted">We don&rsquo;t do both-sides-ism for its own sake. We go where the evidence and the most honest thinkers point us.</p>
          </AnimateIn>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* Be a guest CTA */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-2xl text-center mx-auto">
          <AnimateIn>
            <p className="eyebrow mb-4">Want to appear on the show?</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-5">
              We&rsquo;re always looking for the next remarkable conversation.
            </h2>
            <p className="body-lg mb-8 dark:!text-ink-snow-muted max-w-lg mx-auto text-balance">
              If you are building, reforming, or researching something that India&rsquo;s educational or policy ecosystem needs to hear about — reach out.
            </p>
            <Link href="/be-a-guest"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium bg-sage text-white px-6 py-3 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm">
              Learn about being a guest
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </AnimateIn>
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
