import Link from 'next/link'
import { ClarityLogo } from '@/components/ui/ClarityLogo'
import { SubscribeForm } from '@/components/ui/SubscribeForm'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-parchment dark:bg-charcoal px-6 text-center">

      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/[0.06] blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-md">
        <div className="flex justify-center mb-8">
          <ClarityLogo variant="stacked" size={100} asLink />
        </div>

        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-sage dark:text-sage-glow mb-4">
          404 — Page Not Found
        </p>

        <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-5">
          This page took the wrong turn.
        </h1>

        <p className="font-sans text-[15px] text-ink-muted dark:text-ink-snow-muted leading-relaxed mb-10 text-balance">
          The page you&rsquo;re looking for doesn&rsquo;t exist — but there&rsquo;s plenty worth reading on the site.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold bg-sage text-white px-5 py-2.5 rounded-xl hover:bg-sage-hover transition-all shadow-sm">
            ← Back to Home
          </Link>
          <Link href="/our-work"
            className="inline-flex items-center justify-center gap-2 font-sans text-sm font-medium border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted px-5 py-2.5 rounded-xl hover:border-sage/30 hover:text-sage dark:hover:text-sage-glow transition-all">
            Browse All Issues
          </Link>
        </div>

        <div className="pt-8 border-t border-rim dark:border-rim-dark">
          <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint mb-4">
            While you&rsquo;re here — get the newsletter:
          </p>
          <SubscribeForm size="md" placeholder="Your email" buttonLabel="Subscribe Free" utmSource="404" className="max-w-sm mx-auto" />
        </div>
      </div>
    </div>
  )
}
