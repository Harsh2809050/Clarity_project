import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Privacy Policy — Clarity Project',
  description: 'How Clarity Project collects, uses, and protects your personal information.',
}

const sections = [
  {
    title: 'What we collect',
    body: `When you subscribe to the Clarity Project newsletter, we collect your email address. If you fill out our guest application form, we also collect your name and a brief description of your work. We do not collect payment information, phone numbers, or physical addresses.`,
  },
  {
    title: 'How we use it',
    body: `Your email address is used solely to send you the Clarity Project newsletter and occasional updates about the show. We do not use it for advertising, profiling, or any purpose unrelated to the newsletter. Guest application information is used only to evaluate and respond to your application.`,
  },
  {
    title: 'Who we share it with',
    body: `We use Beehiiv (beehiiv.com) to manage our newsletter subscriber list and send emails. Your email address is stored on Beehiiv's servers, and their privacy policy governs that storage. We do not sell, rent, or share your data with any other third parties.`,
  },
  {
    title: 'Cookies and analytics',
    body: `Our website may use cookies to remember your theme preference (light/dark). If we use Google Analytics, it collects anonymised usage data such as page views and session duration. No personal identifiers are collected. You can opt out of Google Analytics via browser extensions.`,
  },
  {
    title: 'Your rights',
    body: `You can unsubscribe from the newsletter at any time by clicking the unsubscribe link in any email. To request deletion of your data or for any privacy-related queries, email us at office@theclarityproject.in. We will respond within 7 business days.`,
  },
  {
    title: 'Data retention',
    body: `We retain your email address for as long as you remain subscribed. Upon unsubscribing, Beehiiv marks your subscription as inactive. You may request complete deletion at any time by contacting us.`,
  },
  {
    title: 'Changes to this policy',
    body: `If we make material changes to this policy, we will notify subscribers via email at least 14 days in advance. The current version of this policy is always available at theclarityproject.in/privacy.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 bg-parchment dark:bg-charcoal">
      <div className="container-editorial max-w-2xl">
        <AnimateIn>
          <Link href="/" className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-ink-muted dark:text-ink-snow-muted hover:text-sage dark:hover:text-sage-glow transition-colors mb-10">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to home
          </Link>
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="font-sans text-sm text-ink-faint dark:text-ink-snow-faint mb-12">
            Last updated: May 2026 · Clarity Project, operated by Aarthik Ramkumar
          </p>
        </AnimateIn>

        <div className="space-y-10">
          {sections.map(({ title, body }, i) => (
            <AnimateIn key={title} delay={i * 0.04}>
              <div className="pb-8 border-b border-rim dark:border-rim-dark last:border-0">
                <h2 className="font-serif text-[1.2rem] font-bold text-ink dark:text-ink-snow mb-3">{title}</h2>
                <p className="font-sans text-[15px] text-ink-muted dark:text-ink-snow-muted leading-[1.85]">{body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3} className="mt-12 pt-8 border-t border-rim dark:border-rim-dark">
          <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted">
            Questions? Email us at{' '}
            <a href="mailto:office@theclarityproject.in" className="text-sage dark:text-sage-glow hover:underline underline-offset-4">
              office@theclarityproject.in
            </a>
          </p>
          <div className="mt-4">
            <Link href="/terms" className="font-sans text-sm text-ink-faint dark:text-ink-snow-faint hover:text-sage dark:hover:text-sage-glow transition-colors">
              Read our Terms of Service →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
