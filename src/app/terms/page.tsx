import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Terms of Service — Clarity Project',
  description: 'Terms governing your use of The Clarity Project website and newsletter.',
}

const sections = [
  {
    title: 'Use of the website',
    body: `The Clarity Project website is provided for informational purposes. You may read, share, and link to any content on this site freely. You may not copy, republish, or distribute full articles or newsletter issues without written permission.`,
  },
  {
    title: 'Newsletter content',
    body: `All newsletter content — including articles, interviews, and editorial commentary — is the intellectual property of The Clarity Project and Aarthik Ramkumar. You are welcome to quote up to 150 words with attribution and a link back to the original. Full reproduction requires written permission.`,
  },
  {
    title: 'No professional advice',
    body: `Content on this site reflects the personal views of guests and the editorial team. Nothing on this site constitutes legal, financial, medical, or professional advice of any kind. Always consult a qualified professional before acting on any information from this site.`,
  },
  {
    title: 'Accuracy',
    body: `We make every reasonable effort to ensure the accuracy of information published. However, we cannot guarantee that all content is current, complete, or error-free. Guest opinions do not necessarily reflect the views of The Clarity Project.`,
  },
  {
    title: 'Limitation of liability',
    body: `The Clarity Project is not liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on its content. Your use of this site is entirely at your own risk.`,
  },
  {
    title: 'External links',
    body: `This site may link to external websites. We are not responsible for the content, privacy practices, or availability of those sites. Links do not constitute endorsement.`,
  },
  {
    title: 'Changes to these terms',
    body: `We may update these terms from time to time. Continued use of the site after changes are published constitutes acceptance of the new terms. Material changes will be communicated via newsletter.`,
  },
  {
    title: 'Governing law',
    body: `These terms are governed by the laws of India. Any disputes arising from use of this site shall be subject to the exclusive jurisdiction of the courts in India.`,
  },
]

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="font-sans text-sm text-ink-faint dark:text-ink-snow-faint mb-12">
            Last updated: May 2026 · By using this site, you agree to these terms.
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
            <Link href="/privacy" className="font-sans text-sm text-ink-faint dark:text-ink-snow-faint hover:text-sage dark:hover:text-sage-glow transition-colors">
              Read our Privacy Policy →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
