'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'

const guests = [
  {
    name: 'Mahesh Balakrishnan',
    role: 'Former Principal, CBSE School Network',
    topic: 'Why Indian schools are failing their best teachers',
    quote: 'The most honest conversation I\'ve had about what actually breaks inside school systems.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'why-indian-schools-are-failing-their-best-teachers',
  },
  {
    name: 'Priya Anand',
    role: 'Founder, EdTech Startup',
    topic: 'Building EdTech that actually works for Bharat',
    quote: 'Harsh asked questions no journalist had bothered to ask. The newsletter reached 60+ people in my own field I hadn\'t connected with.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'building-edtech-that-actually-works-for-bharat',
  },
  {
    name: 'Rohan Verma',
    role: 'Former Govt. Advisor, NEP 2020',
    topic: 'NEP 2020: Promise vs. Reality on the ground',
    quote: 'I\'ve done dozens of interviews. This one was different — no gotchas, no lazy framing, just genuine curiosity.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'nep-2020-promise-vs-reality-on-the-ground',
  },
  {
    name: 'Kavitha Iyer',
    role: 'CEO, Rural Entrepreneurship Venture',
    topic: 'From IIT to villages: The entrepreneurship no one talks about',
    quote: 'The kind of audience that actually reads and thinks — not just opens and deletes. Worth every minute.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'from-iit-to-villages-the-entrepreneurship-no-one-talks-about',
  },
]

const listenOn = [
  { name: 'Spotify', href: '#', color: '#1DB954' },
  { name: 'Apple Podcasts', href: '#', color: '#872EC4' },
  { name: 'YouTube', href: '#', color: '#FF0000' },
]

export function PastGuests() {
  return (
    <section className="section-y bg-parchment dark:bg-charcoal">
      <div className="container-editorial">

        {/* Header */}
        <AnimateIn className="flex items-center gap-4 mb-12">
          <p className="eyebrow whitespace-nowrap">Past Guests</p>
          <div className="flex-1 h-px bg-rim dark:bg-rim-dark" />
          <Link href="/archive"
            className="font-sans text-[13px] text-ink-muted dark:text-ink-snow-muted hover:text-sage dark:hover:text-sage-glow transition-colors whitespace-nowrap">
            All issues →
          </Link>
        </AnimateIn>

        {/* Featured quote — first guest */}
        <AnimateIn delay={0.05} className="mb-10">
          <div className="relative p-8 md:p-10 rounded-2xl bg-surface dark:bg-surface-dark border border-sage/20 dark:border-sage-glow/15 shadow-card-hover dark:shadow-card-hover-dark overflow-hidden">
            {/* Brand accent stripe */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-sage via-sage-glow/60 to-transparent" />
            {/* Big open-quote decoration */}
            <span className="absolute top-4 left-8 font-serif text-[120px] leading-none text-sage/[0.09] dark:text-sage-glow/[0.07] select-none pointer-events-none" aria-hidden="true">&ldquo;</span>

            <div className="relative flex flex-col md:flex-row gap-7 items-start">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-rim dark:border-rim-dark">
                  <Image
                    src={guests[1].image}
                    alt={guests[1].name}
                    width={56} height={56}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="font-serif text-xl md:text-2xl font-bold text-ink dark:text-ink-snow leading-snug text-balance mb-5">
                  &ldquo;{guests[1].quote}&rdquo;
                </p>
                <div>
                  <p className="font-sans text-[13px] font-semibold text-ink dark:text-ink-snow">{guests[1].name}</p>
                  <p className="font-sans text-[12px] text-ink-muted dark:text-ink-snow-muted">{guests[1].role}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Guest grid */}
        <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.07}>
          {guests.map(({ name, role, topic, image }) => (
            <StaggerItem key={name}>
              <div className="flex flex-col gap-3 p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full hover:border-sage/30 dark:hover:border-sage-glow/30 hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-rim dark:border-rim-dark">
                    <Image src={image} alt={name} width={40} height={40} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-sans text-[13px] font-semibold text-ink dark:text-ink-snow leading-snug">{name}</p>
                    <p className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint leading-snug">{role}</p>
                  </div>
                </div>
                <p className="font-serif text-[14px] text-ink-muted dark:text-ink-snow-muted leading-relaxed line-clamp-2">{topic}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Listen platforms */}
        <AnimateIn delay={0.2} className="mt-12 pt-10 border-t border-rim dark:border-rim-dark">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint shrink-0">
              Listen on
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {listenOn.map(({ name, href }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -1 }}
                  className="inline-flex items-center gap-2 font-sans text-[12px] font-medium px-4 py-2 rounded-xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark text-ink-muted dark:text-ink-snow-muted hover:text-ink dark:hover:text-ink-snow hover:border-sage/20 transition-all duration-200"
                >
                  {name}
                </motion.a>
              ))}
            </div>
            <div className="flex-1 hidden sm:block" />
            <Link href="/be-a-guest"
              className="font-sans text-[13px] font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4 shrink-0">
              Want to be a guest? →
            </Link>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
