import { SubscribeForm } from '@/components/ui/SubscribeForm'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function SubscribeCTA() {
  return (
    <section className="section-y relative overflow-hidden bg-[#2A2420] dark:bg-[#1A1714]">
      {/* Subtle warm glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/[0.08] blur-[100px]" />
      </div>

      <div className="container-editorial relative z-10">
        <div className="max-w-2xl mx-auto text-center">

          <AnimateIn>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-sage-glow/70 mb-4">
              Free Newsletter
            </p>
            <h2 className="font-serif text-display-sm font-bold text-[#EDE8E2] leading-tight tracking-tight text-balance mb-5">
              Don&rsquo;t miss the next conversation.
            </h2>
            <p className="font-sans text-[15px] text-[#EDE8E2]/60 leading-relaxed mb-10 text-balance">
              Every week, one remarkable person changing the landscape of education, policy, or enterprise in India. A detailed newsletter with key ideas and frameworks — free, always.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <SubscribeForm
              size="lg"
              placeholder="Your email address"
              buttonLabel="Subscribe Free"
              utmSource="cta_band"
              dark
              className="max-w-md mx-auto"
            />
            <p className="mt-4 font-sans text-xs text-[#EDE8E2]/30">
              5,000+ readers · Free forever · Unsubscribe anytime
            </p>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
