import Link from 'next/link'
import { SubscribeForm } from '@/components/ui/SubscribeForm'
import { ClarityLogo } from '@/components/ui/ClarityLogo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/be-a-guest', label: 'Be a Guest' },
  { href: '/subscribe', label: 'Subscribe' },
]

const listenLinks = [
  { href: 'https://spotify.com', label: 'Spotify' },
  { href: 'https://podcasts.apple.com', label: 'Apple Podcasts' },
  { href: 'https://youtube.com', label: 'YouTube' },
]

const socials = [
  { href: 'https://linkedin.com', label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
  { href: 'https://twitter.com', label: 'Twitter / X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
]

export function Footer() {
  return (
    <footer className="border-t border-rim dark:border-rim-dark bg-parchment-dim dark:bg-charcoal-lift">
      <div className="container-editorial py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <ClarityLogo variant="stacked" size={115} asLink />
            <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed max-w-xs">
              Real conversations with the architects, reformers, and builders reshaping education, policy, and entrepreneurship in India.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ href, label, path }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-rim dark:border-rim-dark flex items-center justify-center text-ink-muted dark:text-ink-snow-faint hover:text-sage dark:hover:text-sage-glow hover:border-sage/30 transition-all duration-200">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
            {/* Listen on */}
            <div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint mb-3">Listen on</p>
              <div className="flex flex-wrap gap-2">
                {listenLinks.map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="font-sans text-[12px] px-3 py-1.5 rounded-lg border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted hover:text-sage dark:hover:text-sage-glow hover:border-sage/20 transition-all duration-200">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint mb-5">Pages</h4>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted hover:text-sage dark:hover:text-sage-glow transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mini subscribe */}
          <div>
            <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-ink-faint dark:text-ink-snow-faint mb-5">Newsletter</h4>
            <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted mb-4 leading-relaxed">
              Get the next conversation in your inbox — free.
            </p>
            <SubscribeForm size="sm" buttonLabel="Join" utmSource="footer" />
          </div>
        </div>

        <div className="rule mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint">
            © 2026 Clarity Project. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms'].map(l => (
              <a key={l} href="#" className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint hover:text-ink-muted dark:hover:text-ink-snow-muted transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
