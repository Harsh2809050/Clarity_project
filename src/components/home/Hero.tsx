import Link from 'next/link'
import { SubscribeForm } from '@/components/ui/SubscribeForm'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-parchment dark:bg-charcoal overflow-hidden pt-24 pb-20">

      {/* Very soft ambient glow — soothing, not neon */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[700px] h-[600px] -translate-y-1/2 -translate-x-1/3 rounded-full bg-sage/[0.07] dark:bg-sage/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-sage/[0.05] dark:bg-sage/[0.03] blur-[120px]" />
      </div>

      <div className="container-editorial relative z-10 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="anim-fade-up anim-d0">
            <span className="inline-flex items-center gap-2 eyebrow mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              Season 1 &middot; Now Live &middot; Hosted by Aarthik Ramkumar
            </span>
          </div>

          {/* Headline */}
          <div className="anim-fade-up anim-d1">
            <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-6">
              Conversations shaping<br />
              the future of{' '}
              <em className="not-italic text-sage dark:text-sage-glow">Indian education</em>.
            </h1>
          </div>

          {/* Sub */}
          <div className="anim-fade-up anim-d2">
            <p className="body-lg dark:!text-ink-snow-muted max-w-xl text-balance mb-10">
              A weekly deep-dive with the architects, reformers, and builders rewriting what school,
              policy, and enterprise can be. Every conversation becomes a newsletter you can act on.
            </p>
          </div>

          {/* Subscribe form */}
          <div className="anim-fade-up anim-d3">
            <SubscribeForm
              size="lg"
              placeholder="Enter your email address"
              buttonLabel="Subscribe — It's Free"
              utmSource="hero"
              className="max-w-[480px]"
            />
          </div>

          {/* Social proof + be a guest */}
          <div className="anim-fade-up anim-d4">
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint">
                5,000+ educators, policymakers, and founders · Free forever
              </p>
              <span className="hidden sm:block w-px h-3 bg-rim dark:bg-rim-dark" />
              <Link href="/be-a-guest"
                className="font-sans text-xs font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4">
                Want to be a guest? →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="anim-fade-up anim-d5">
            <div className="flex items-center gap-8 mt-12 pt-10 border-t border-rim dark:border-rim-dark">
              {[
                { n: '8',    label: 'Issues'  },
                { n: '5K+',  label: 'Readers' },
                { n: '6',    label: 'Topics'  },
                { n: '100%', label: 'Free'    },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="font-serif text-2xl font-bold text-ink dark:text-ink-snow">{n}</p>
                  <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
