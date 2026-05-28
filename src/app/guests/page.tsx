import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { workIssues } from '@/data/work'
import { newsletters } from '@/data/newsletters'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Past Guests — Clarity Project',
  description: 'Every guest who has appeared on The Clarity Project — educators, policymakers, founders, and researchers reshaping India.',
}

interface GuestEntry {
  name: string
  title: string
  topic: string
  issueSlug?: string
  thumbnail?: string
  date: string
}

function buildGuestList(): GuestEntry[] {
  const seen = new Set<string>()
  const guests: GuestEntry[] = []

  for (const issue of workIssues) {
    if (!seen.has(issue.guest.name)) {
      seen.add(issue.guest.name)
      guests.push({
        name: issue.guest.name,
        title: issue.guest.title,
        topic: issue.topic,
        issueSlug: issue.id,
        thumbnail: issue.thumbnail,
        date: issue.date,
      })
    }
  }

  for (const nl of newsletters) {
    if (!seen.has(nl.guest)) {
      seen.add(nl.guest)
      guests.push({
        name: nl.guest,
        title: '',
        topic: nl.topic,
        thumbnail: nl.image,
        date: nl.date,
      })
    }
  }

  return guests
}

export default function GuestsPage() {
  const guests = buildGuestList()

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-parchment dark:bg-charcoal dot-grid">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <AnimateIn>
              <p className="eyebrow mb-5">Past Guests</p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-5">
                The people behind the conversations.
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="body-lg max-w-xl dark:!text-ink-snow-muted">
                Every guest on Clarity Project is a practitioner — someone who has built, reformed, or navigated the systems they talk about. No theory without skin in the game.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* Guest grid */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.07}>
            {guests.map(guest => (
              <StaggerItem key={guest.name}>
                {guest.issueSlug ? (
                  <Link href={`/issues/${guest.issueSlug}`}
                    className="group flex gap-4 p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark hover:border-sage/30 hover:-translate-y-1 transition-all duration-200 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark">
                    <GuestAvatar name={guest.name} thumbnail={guest.thumbnail} />
                    <GuestInfo guest={guest} linked />
                  </Link>
                ) : (
                  <div className="flex gap-4 p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark shadow-card dark:shadow-card-dark">
                    <GuestAvatar name={guest.name} thumbnail={guest.thumbnail} />
                    <GuestInfo guest={guest} linked={false} />
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerList>

          <AnimateIn delay={0.3} className="mt-14 pt-10 border-t border-rim dark:border-rim-dark text-center">
            <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted mb-4">
              Want to share your expertise with our audience?
            </p>
            <Link href="/be-a-guest"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold bg-sage text-white px-5 py-2.5 rounded-xl hover:bg-sage-hover transition-all shadow-sm">
              Apply to be a guest →
            </Link>
          </AnimateIn>
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}

function GuestAvatar({ name, thumbnail }: { name: string; thumbnail?: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="w-14 h-14 rounded-xl overflow-hidden bg-sage/10 dark:bg-sage/[0.08] shrink-0 flex items-center justify-center">
      {thumbnail ? (
        <Image src={thumbnail} alt={name} width={56} height={56} className="w-full h-full object-cover" />
      ) : (
        <span className="font-serif text-lg font-bold text-sage dark:text-sage-glow">{initials}</span>
      )}
    </div>
  )
}

function GuestInfo({ guest, linked }: { guest: GuestEntry; linked: boolean }) {
  return (
    <div className="min-w-0">
      <p className={`font-serif text-[15px] font-bold text-ink dark:text-ink-snow mb-0.5 leading-snug ${linked ? 'group-hover:text-sage transition-colors' : ''}`}>
        {guest.name}
      </p>
      {guest.title && (
        <p className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint mb-2 leading-snug">{guest.title}</p>
      )}
      <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-md bg-sage/10 dark:bg-sage/[0.08] text-sage dark:text-sage-glow">
        {guest.topic}
      </span>
      {linked && (
        <p className="mt-2 font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">
          Read issue →
        </p>
      )}
    </div>
  )
}
