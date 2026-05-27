import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { LinkButton } from '@/components/ui/Button'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'

export const metadata: Metadata = {
  title: 'About — Clarity Project',
  description:
    'The story behind Clarity Project — why we started, who it\'s for, what we believe, and how every conversation becomes a newsletter you can act on.',
}

const problems = [
  {
    stat: '4.5 crore',
    label: 'School-going children',
    note: 'Most of their futures depend on decisions made by people who never set foot in a classroom.',
  },
  {
    stat: '1.5 crore',
    label: 'Teachers in India',
    note: 'Some of the most underpaid, undervalued professionals in a country that claims to take education seriously.',
  },
  {
    stat: '₹1.1 lakh crore',
    label: 'Annual education budget',
    note: 'Spent every year. The debate over where it goes and what it changes is largely missing from public discourse.',
  },
]

const topics = [
  {
    label: 'Teacher Retention',
    description:
      'Why the schools building India\'s future are losing their best people — and what the ones getting it right do differently.',
  },
  {
    label: 'Education Policy',
    description:
      'What policies like NEP 2020 actually change on the ground — not in press releases, but in classrooms.',
  },
  {
    label: 'EdTech for Bharat',
    description:
      'Products built for real teachers in government schools, not just urban English-speaking markets.',
  },
  {
    label: 'Entrepreneurship',
    description:
      'Founders solving problems no VC wanted to fund, in markets no playbook was written for.',
  },
  {
    label: 'Higher Education',
    description:
      'The university rankings obsession and the rare institutions doing the genuinely interesting work.',
  },
  {
    label: 'Skill Development',
    description:
      'The often-ignored pipeline between getting an education and getting a meaningful livelihood.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Find the right person',
    body: 'Every conversation starts with a question: who is doing the most honest, specific, consequential work on this problem? Not the most famous. The most insightful.',
  },
  {
    step: '02',
    title: 'Have a real conversation',
    body: 'No pre-submitted questions. No PR handlers. No time limit. We go until we hit the actual idea — the argument they\'ve never been asked to make on record before.',
  },
  {
    step: '03',
    title: 'Write it all out',
    body: 'Every episode becomes a long-form newsletter. Not a transcript, not bullet points — a written argument with the three insights you should carry away and use.',
  },
  {
    step: '04',
    title: 'Send it to people who care',
    body: 'Our readers are school founders, principals, policymakers, educators, and investors. People who are already trying to change the system and need better thinking to do it.',
  },
]

const beliefs = [
  'India has a people crisis in education, not just a curriculum crisis.',
  'The people closest to the problem almost never get a real platform.',
  'Long-form thinking is not niche — it\'s what serious people are hungry for.',
  'Every conversation is an argument. Our job is to find the strongest version of it.',
  'If a newsletter doesn\'t change how you think, it failed.',
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <AnimateIn><p className="eyebrow mb-6">About</p></AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-7">
                India&rsquo;s most important conversations<br />
                <span className="text-sage">aren&rsquo;t happening in public.</span>
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="body-lg mb-5 dark:!text-ink-snow-muted">
                The people reshaping India&rsquo;s education, policy, and entrepreneurship ecosystem are remarkable. They&rsquo;re building things that matter. They have ideas that are specific, hard-won, and genuinely useful.
              </p>
              <p className="body-lg mb-5 dark:!text-ink-snow-muted">
                Most of them never get the right platform. A 45-second TV interview. A panel at a conference where every answer is a talking point. A quote in an article that strips out all the nuance.
              </p>
              <p className="body-lg mb-10 dark:!text-ink-snow-muted">
                <strong className="text-ink dark:text-ink-snow">The Clarity Project exists to fix that.</strong> One long, honest conversation at a time — and a newsletter that doesn&rsquo;t summarise it, but writes it out in full so you can think with it.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <LinkButton href="/subscribe" size="lg">
                  Subscribe Free
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </LinkButton>
                <Link href="/our-work"
                  className="font-sans text-sm font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4 transition-all">
                  Read our published work →
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── The Problem ──────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4">The Problem We&rsquo;re Solving</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight mb-5">
              The stakes are enormous.<br />The conversation is not keeping up.
            </h2>
            <p className="body-lg dark:!text-ink-snow-muted">
              India is making decisions right now that will shape hundreds of millions of lives for the next thirty years. The people making those decisions — and the people challenging them — deserve a better conversation than what currently exists.
            </p>
          </AnimateIn>
          <StaggerList className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
            {problems.map(({ stat, label, note }) => (
              <StaggerItem key={label}>
                <div className="p-7 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full">
                  <p className="font-serif text-4xl font-bold text-sage mb-2">{stat}</p>
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-widest text-ink dark:text-ink-snow mb-3">{label}</p>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{note}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          <AnimateIn delay={0.3} className="mt-10 max-w-2xl">
            <p className="body-lg dark:!text-ink-snow-muted">
              The debates that should be happening publicly — about teacher pay, about what NEP 2020 has actually changed, about which EdTech products are real and which are vaporware, about why India&rsquo;s best-educated young people are leaving to teach in Dubai — are mostly happening in private.
            </p>
            <p className="body-lg mt-4 dark:!text-ink-snow-muted">
              We think that&rsquo;s a problem. And we think a weekly podcast and newsletter is a better tool for fixing it than most people give it credit for.
            </p>
          </AnimateIn>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── What We Do ───────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-14 max-w-2xl">
            <p className="eyebrow mb-4">What We Do</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight mb-5">
              A podcast that becomes a newsletter.<br />
              <span className="text-sage">A conversation that becomes an argument.</span>
            </h2>
            <p className="body-lg dark:!text-ink-snow-muted">
              Every issue of the Clarity Project follows the same process. Find someone who is doing genuinely important work. Have a real conversation — the kind with no prepared answers, no PR handlers, and no artificial time limits. Then write it all out.
            </p>
          </AnimateIn>

          <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.08}>
            {howItWorks.map(({ step, title, body }) => (
              <StaggerItem key={step}>
                <div className="p-7 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full">
                  <p className="font-sans text-[11px] font-bold text-sage dark:text-sage-glow uppercase tracking-widest mb-4">{step}</p>
                  <h3 className="font-serif text-[18px] font-bold text-ink dark:text-ink-snow mb-3 leading-snug">{title}</h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          <AnimateIn delay={0.3} className="mt-10">
            <div className="bg-brand-navy rounded-2xl p-8 md:p-10 max-w-2xl">
              <p className="font-sans text-[11px] text-brand-teal/80 font-bold uppercase tracking-widest mb-4">What the newsletter is not</p>
              <ul className="space-y-3">
                {[
                  'Not a summary. We write the actual argument.',
                  'Not a transcript. We edit for clarity, not length.',
                  'Not both-sides-ism. We go where the evidence and honest thinking take us.',
                  'Not a press release for the guest. We ask the uncomfortable questions too.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-[14px] text-[#EDE8E2] leading-relaxed">
                    <span className="text-brand-amber mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Topics ───────────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12">
            <p className="eyebrow mb-3">What We Cover</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              Six themes. One through line.
            </h2>
            <p className="body-lg mt-4 max-w-lg dark:!text-ink-snow-muted">
              Every conversation connects to a single question: what would it actually take for India&rsquo;s systems to match the ambition of its people?
            </p>
          </AnimateIn>
          <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
            {topics.map(({ label, description }) => (
              <StaggerItem key={label}>
                <div className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full group hover:border-sage/30 hover:shadow-card-hover transition-all duration-300">
                  <div className="w-8 h-1 bg-sage rounded-full mb-4 group-hover:w-12 transition-all duration-300" />
                  <h3 className="font-serif text-lg font-bold text-ink dark:text-ink-snow mb-2">{label}</h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── What We Believe ──────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-2xl">
          <AnimateIn>
            <p className="eyebrow mb-6">What We Believe</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight mb-8">
              Our editorial principles.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <ul className="space-y-5">
              {beliefs.map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-sage/10 dark:bg-sage/20 flex items-center justify-center mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-sage" />
                  </span>
                  <p className="font-sans text-[15px] text-ink dark:text-ink-snow leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          </AnimateIn>

          <AnimateIn delay={0.2} className="mt-12">
            <blockquote className="font-serif text-2xl md:text-3xl font-bold text-ink dark:text-ink-snow leading-snug tracking-tight text-balance mb-5">
              &ldquo;Most reporting treats complexity as a problem to simplify. We treat it as the point.&rdquo;
            </blockquote>
            <p className="font-sans text-[13px] text-sage dark:text-sage-glow font-semibold tracking-wide">
              — Aarthik Ramkumar, Host
            </p>
          </AnimateIn>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Host bio ─────────────────────────────────────────── */}
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
                  Researcher, writer, and curious generalist focused on the institutions and individuals reshaping India — particularly at the intersection of education, governance, and technology.
                </p>
                <p className="body-lg dark:!text-ink-snow-muted">
                  Before starting Clarity Project, Aarthik spent years in the field — interviewing educators, policymakers, and founders across India, and writing long-form essays on why systems succeed or fail. His conclusion: the most important ideas almost never make it into the public conversation in their most honest, useful form.
                </p>
                <p className="body-lg dark:!text-ink-snow-muted">
                  Clarity Project is his attempt to fix that. The format is simple: find someone who has done the hard work of thinking about a specific problem, give them the time and space to make their best argument, and write it up so it&rsquo;s useful to the people who most need to hear it.
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

      {/* ── Who It&rsquo;s For ─────────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-2xl">
          <AnimateIn>
            <p className="eyebrow mb-5">Who Reads This</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight mb-6">
              Built for people who are already trying to change something.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="space-y-4">
              {[
                { label: 'School founders and principals', desc: 'Looking for frameworks and real-world evidence to make better decisions about their institutions.' },
                { label: 'Educators and teachers', desc: 'Who want to understand the system they\'re part of — and where its real leverage points are.' },
                { label: 'Policy researchers and advisors', desc: 'Who think carefully about what actually works and what\'s mostly theatre.' },
                { label: 'EdTech founders and investors', desc: 'Building or funding products for a market most of them have never fully understood.' },
                { label: 'Parents and students', desc: 'Who are navigating a complex system and want to understand the forces shaping it.' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-4 py-4 border-b border-rim dark:border-rim-dark last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage mt-2.5 shrink-0" />
                  <div>
                    <p className="font-sans text-[15px] font-semibold text-ink dark:text-ink-snow mb-1">{label}</p>
                    <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Be a guest CTA ───────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-2xl text-center mx-auto">
          <AnimateIn>
            <p className="eyebrow mb-4">Want to appear on the show?</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-5">
              We&rsquo;re always looking for the next<br />remarkable conversation.
            </h2>
            <p className="body-lg mb-8 dark:!text-ink-snow-muted max-w-lg mx-auto text-balance">
              If you are building, reforming, or researching something that India&rsquo;s educational or policy ecosystem needs to hear about — we want to talk.
            </p>
            <Link href="/be-a-guest"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium bg-sage text-white px-6 py-3 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm">
              Learn about being a guest
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </AnimateIn>
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
