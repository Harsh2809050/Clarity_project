import type { Metadata } from 'next'
import { SubscribeForm } from '@/components/ui/SubscribeForm'
import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Subscribe — Clarity Project',
  description: 'Join 5,000+ readers. Free weekly newsletter on education, policy, and entrepreneurship in India.',
}

const benefits = [
  { icon: '📖', title: 'Deep-dive newsletters', description: 'After every conversation: key arguments, frameworks, counterpoints, and ideas you can act on.' },
  { icon: '🎙️', title: 'Weekly conversations', description: 'One guest per week — a practitioner, reformer, or builder doing the actual work.' },
  { icon: '🧠', title: 'Ideas worth sharing', description: 'Written for curious, serious readers who want to understand a problem fully before forming an opinion.' },
]

export default function SubscribePage() {
  return (
    <div className="min-h-screen pt-36 pb-24 bg-parchment dark:bg-charcoal">
      <div className="container-editorial">
        <div className="max-w-lg mx-auto">

          <AnimateIn className="text-center mb-12">
            <p className="eyebrow mb-4">Free Newsletter</p>
            <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-5">
              Think deeper about India&rsquo;s future.
            </h1>
            <p className="body-lg dark:text-ink-snow-muted">
              Join 5,000+ educators, policymakers, and founders who read every week.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="bg-surface dark:bg-surface-dark rounded-2xl border border-rim dark:border-rim-dark p-8 mb-6 shadow-card dark:shadow-card-dark">
              <h2 className="font-serif text-xl font-bold text-ink dark:text-ink-snow mb-1">Subscribe — it takes 10 seconds.</h2>
              <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted mb-6">No credit card. No spam. Unsubscribe any time.</p>
              <SubscribeForm size="lg" placeholder="Your email address" buttonLabel="Subscribe Free" utmSource="subscribe_page" />
            </div>
          </AnimateIn>

          <StaggerList className="space-y-4" stagger={0.08} delayStart={0.2}>
            {benefits.map(({ icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="flex gap-4 p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark">
                  <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-ink dark:text-ink-snow mb-1">{title}</h3>
                    <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">{description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          <AnimateIn delay={0.4}>
            <p className="mt-8 font-sans text-xs text-ink-faint dark:text-ink-snow-faint text-center leading-relaxed">
              By subscribing you agree to receive Clarity Project newsletter. We will never share your email.
            </p>
          </AnimateIn>
        </div>
      </div>
    </div>
  )
}
