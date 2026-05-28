'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LinkButton } from '@/components/ui/Button'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { EditableText } from '@/components/admin/EditableText'
import { EditableImage } from '@/components/admin/EditableImage'
import { getField, isAdmin, isEditMode } from '@/lib/page-content'

const P = 'about'

const defaultProblems = [
  { stat: '4.5 crore',     label: 'School-going children', note: 'Most of their futures depend on decisions made by people who never set foot in a classroom.' },
  { stat: '1.5 crore',     label: 'Teachers in India',     note: 'Some of the most underpaid, undervalued professionals in a country that claims to take education seriously.' },
  { stat: '₹1.1 lakh crore', label: 'Annual education budget', note: 'Spent every year. The debate over where it goes and what it changes is largely missing from public discourse.' },
]

const defaultTopics = [
  { label: 'Teacher Retention',    description: 'Why the schools building India\'s future are losing their best people — and what the ones getting it right do differently.' },
  { label: 'Education Policy',     description: 'What policies like NEP 2020 actually change on the ground — not in press releases, but in classrooms.' },
  { label: 'EdTech for Bharat',    description: 'Products built for real teachers in government schools, not just urban English-speaking markets.' },
  { label: 'Entrepreneurship',     description: 'Founders solving problems no VC wanted to fund, in markets no playbook was written for.' },
  { label: 'Higher Education',     description: 'The university rankings obsession and the rare institutions doing the genuinely interesting work.' },
  { label: 'Skill Development',    description: 'The often-ignored pipeline between getting an education and getting a meaningful livelihood.' },
]

const defaultBeliefs = [
  'India has a people crisis in education, not just a curriculum crisis.',
  'The people closest to the problem almost never get a real platform.',
  'Long-form thinking is not niche — it\'s what serious people are hungry for.',
  'Every conversation is an argument. Our job is to find the strongest version of it.',
  'If a newsletter doesn\'t change how you think, it failed.',
]

const defaultHowItWorks = [
  { step: '01', title: 'Find the right person',   body: 'Every conversation starts with a question: who is doing the most honest, specific, consequential work on this problem? Not the most famous. The most insightful.' },
  { step: '02', title: 'Have a real conversation', body: 'No pre-submitted questions. No PR handlers. No time limit. We go until we hit the actual idea — the argument they\'ve never been asked to make on record before.' },
  { step: '03', title: 'Write it all out',         body: 'Every episode becomes a long-form newsletter. Not a transcript, not bullet points — a written argument with the three insights you should carry away and use.' },
  { step: '04', title: 'Send it to people who care', body: 'Our readers are school founders, principals, policymakers, educators, and investors. People who are already trying to change the system and need better thinking to do it.' },
]

export default function AboutPage() {
  const [admin, setAdmin] = useState(false)
  const [editOn, setEditOn] = useState(false)

  useEffect(() => {
    setAdmin(isAdmin())
    setEditOn(isEditMode())
    const h = () => setEditOn(isEditMode())
    window.addEventListener('cp_edit_change', h)
    return () => window.removeEventListener('cp_edit_change', h)
  }, [])

  const problems  = defaultProblems.map((p, i) => ({
    stat:  getField(P, `problem_${i}_stat`,  p.stat),
    label: getField(P, `problem_${i}_label`, p.label),
    note:  getField(P, `problem_${i}_note`,  p.note),
  }))

  const topics = defaultTopics.map((t, i) => ({
    label:       getField(P, `topic_${i}_label`, t.label),
    description: getField(P, `topic_${i}_desc`,  t.description),
  }))

  const beliefs = defaultBeliefs.map((b, i) => getField(P, `belief_${i}`, b))

  const howItWorks = defaultHowItWorks.map((h, i) => ({
    step:  h.step,
    title: getField(P, `how_${i}_title`, h.title),
    body:  getField(P, `how_${i}_body`,  h.body),
  }))

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <AnimateIn><p className="eyebrow mb-6">About</p></AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-7">
                <EditableText page={P} field="hero_h1" fallback="India's most important conversations aren't happening in public." />
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="body-lg mb-5 dark:!text-ink-snow-muted">
                <EditableText page={P} field="hero_p1" fallback="The people reshaping India's education, policy, and entrepreneurship ecosystem are remarkable. They're building things that matter. They have ideas that are specific, hard-won, and genuinely useful." />
              </p>
              <p className="body-lg mb-5 dark:!text-ink-snow-muted">
                <EditableText page={P} field="hero_p2" fallback="Most of them never get the right platform. A 45-second TV interview. A panel at a conference where every answer is a talking point. A quote in an article that strips out all the nuance." />
              </p>
              <p className="body-lg mb-10 dark:!text-ink-snow-muted">
                <EditableText page={P} field="hero_p3" fallback="The Clarity Project exists to fix that. One long, honest conversation at a time — and a newsletter that doesn't summarise it, but writes it out in full so you can think with it." />
              </p>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <LinkButton href="/subscribe" size="lg">Subscribe Free</LinkButton>
                <Link href="/our-work" className="font-sans text-sm font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4">Read our published work →</Link>
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
              <EditableText page={P} field="problem_h2" fallback="The stakes are enormous. The conversation is not keeping up." />
            </h2>
            <p className="body-lg dark:!text-ink-snow-muted">
              <EditableText page={P} field="problem_intro" fallback="India is making decisions right now that will shape hundreds of millions of lives for the next thirty years. The people making those decisions — and the people challenging them — deserve a better conversation than what currently exists." />
            </p>
          </AnimateIn>
          <StaggerList className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
            {problems.map(({ stat, label, note }, i) => (
              <StaggerItem key={i}>
                <div className="p-7 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full">
                  <p className="font-serif text-4xl font-bold text-sage mb-2">
                    <EditableText page={P} field={`problem_${i}_stat`} fallback={defaultProblems[i].stat} />
                  </p>
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-widest text-ink dark:text-ink-snow mb-3">
                    <EditableText page={P} field={`problem_${i}_label`} fallback={defaultProblems[i].label} />
                  </p>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">
                    <EditableText page={P} field={`problem_${i}_note`} fallback={defaultProblems[i].note} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── What We Do ───────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-14 max-w-2xl">
            <p className="eyebrow mb-4">What We Do</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight mb-5">
              <EditableText page={P} field="whatwedo_h2" fallback="A podcast that becomes a newsletter. A conversation that becomes an argument." />
            </h2>
            <p className="body-lg dark:!text-ink-snow-muted">
              <EditableText page={P} field="whatwedo_intro" fallback="Every issue of the Clarity Project follows the same process. Find someone who is doing genuinely important work. Have a real conversation — the kind with no prepared answers, no PR handlers, and no artificial time limits. Then write it all out." />
            </p>
          </AnimateIn>
          <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.08}>
            {howItWorks.map(({ step, title, body }, i) => (
              <StaggerItem key={step}>
                <div className="p-7 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full">
                  <p className="font-sans text-[11px] font-bold text-sage dark:text-sage-glow uppercase tracking-widest mb-4">{step}</p>
                  <h3 className="font-serif text-[18px] font-bold text-ink dark:text-ink-snow mb-3 leading-snug">
                    <EditableText page={P} field={`how_${i}_title`} fallback={defaultHowItWorks[i].title} />
                  </h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">
                    <EditableText page={P} field={`how_${i}_body`} fallback={defaultHowItWorks[i].body} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Topics ───────────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <AnimateIn className="mb-12">
            <p className="eyebrow mb-3">What We Cover</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              <EditableText page={P} field="topics_h2" fallback="Six themes. One through line." />
            </h2>
          </AnimateIn>
          <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
            {topics.map(({ label, description }, i) => (
              <StaggerItem key={i}>
                <div className="p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full group hover:border-sage/30 hover:shadow-card-hover transition-all duration-300">
                  <div className="w-8 h-1 bg-sage rounded-full mb-4 group-hover:w-12 transition-all duration-300" />
                  <h3 className="font-serif text-lg font-bold text-ink dark:text-ink-snow mb-2">
                    <EditableText page={P} field={`topic_${i}_label`} fallback={defaultTopics[i].label} />
                  </h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">
                    <EditableText page={P} field={`topic_${i}_desc`} fallback={defaultTopics[i].description} />
                  </p>
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
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight mb-8">Our editorial principles.</h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <ul className="space-y-5">
              {beliefs.map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-sage/10 dark:bg-sage/20 flex items-center justify-center mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-sage" />
                  </span>
                  <p className="font-sans text-[15px] text-ink dark:text-ink-snow leading-relaxed">
                    <EditableText page={P} field={`belief_${i}`} fallback={defaultBeliefs[i]} />
                  </p>
                </li>
              ))}
            </ul>
          </AnimateIn>

          <AnimateIn delay={0.2} className="mt-12">
            <blockquote className="font-serif text-2xl md:text-3xl font-bold text-ink dark:text-ink-snow leading-snug tracking-tight text-balance mb-5">
              &ldquo;<EditableText page={P} field="blockquote" fallback="Most reporting treats complexity as a problem to simplify. We treat it as the point." />&rdquo;
            </blockquote>
            <p className="font-sans text-[13px] text-sage dark:text-sage-glow font-semibold tracking-wide">
              — <EditableText page={P} field="blockquote_attr" fallback="Aarthik Ramkumar, Host" />
            </p>
          </AnimateIn>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Host bio ─────────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <AnimateIn direction="left">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-parchment-dim dark:bg-charcoal-lift shadow-card dark:shadow-card-dark relative">
                  <EditableImage
                    page={P} field="host_photo"
                    fallback="/aarthik-ramkumar.jpg"
                    alt="Aarthik Ramkumar" fill sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-surface dark:bg-surface-dark border border-rim dark:border-rim-dark rounded-xl px-5 py-4 shadow-card dark:shadow-card-dark max-w-[200px]">
                  <p className="font-serif text-sm font-bold text-ink dark:text-ink-snow mb-0.5">
                    <EditableText page={P} field="host_name" fallback="Aarthik Ramkumar" />
                  </p>
                  <p className="font-sans text-[11px] text-ink-muted dark:text-ink-snow-muted">Host &amp; Editor</p>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.1}>
              <p className="eyebrow mb-6">Your Host</p>
              <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight mb-6">
                <EditableText page={P} field="host_heading" fallback="Aarthik Ramkumar" />
              </h2>
              <div className="space-y-4">
                {['host_bio1','host_bio2','host_bio3','host_bio4'].map((f, i) => {
                  const defaults = [
                    'Researcher, writer, and curious generalist focused on the institutions and individuals reshaping India — particularly at the intersection of education, governance, and technology.',
                    'Before starting Clarity Project, Aarthik spent years in the field — interviewing educators, policymakers, and founders across India, and writing long-form essays on why systems succeed or fail.',
                    'Clarity Project is his attempt to fix that. The format is simple: find someone who has done the hard work of thinking about a specific problem, give them the time and space to make their best argument, and write it up so it\'s useful to the people who most need to hear it.',
                    'His questions are detailed, his notes are thorough, and his goal is the same for every guest: get to the idea that actually matters — the one that doesn\'t make it into the press release.',
                  ]
                  return (
                    <p key={f} className="body-lg dark:!text-ink-snow-muted">
                      <EditableText page={P} field={f} fallback={defaults[i]} />
                    </p>
                  )
                })}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* ── Be a guest CTA ───────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-2xl text-center mx-auto">
          <AnimateIn>
            <p className="eyebrow mb-4">Want to appear on the show?</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-5">
              <EditableText page={P} field="guest_h2" fallback="We're always looking for the next remarkable conversation." />
            </h2>
            <p className="body-lg mb-8 dark:!text-ink-snow-muted max-w-lg mx-auto text-balance">
              <EditableText page={P} field="guest_body" fallback="If you are building, reforming, or researching something that India's educational or policy ecosystem needs to hear about — we want to talk." />
            </p>
            <Link href="/be-a-guest" className="inline-flex items-center gap-2 font-sans text-sm font-medium bg-sage text-white px-6 py-3 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm">
              Learn about being a guest
            </Link>
          </AnimateIn>
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
