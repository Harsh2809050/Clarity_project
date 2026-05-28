import { SubscribeForm } from '@/components/ui/SubscribeForm'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function SubscribeCTA() {
  return (
    <section className="section-y relative overflow-hidden bg-[#1C1411]">

      {/* ── Layered background ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#241811] via-[#1C1411] to-[#120D0A]" />

        {/* Primary warm glow — centred */}
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E05530]/[0.09] blur-[140px]" />

        {/* Secondary amber glow — bottom-right */}
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[350px] rounded-full bg-[#F5A725]/[0.07] blur-[100px]" />

        {/* Cool navy accent — top-left */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-[#2B5BA0]/[0.05] blur-[80px]" />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        {/* Top edge vignette */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="container-editorial relative z-10">
        <div className="max-w-2xl mx-auto text-center">

          <AnimateIn>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#E05530] mb-4">
              Free Newsletter
            </p>
            <h2 className="font-serif text-display-sm font-bold text-[#EDE8E2] leading-tight tracking-tight text-balance mb-5">
              Don&rsquo;t miss the next conversation.
            </h2>
            <p className="font-sans text-[15px] text-[#EDE8E2]/55 leading-relaxed mb-10 text-balance">
              Every week, one remarkable person changing the landscape of education, policy, or enterprise
              in India. A detailed newsletter with key ideas and frameworks — free, always.
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
            <p className="mt-5 font-sans text-xs text-[#EDE8E2]/25">
              5,000+ readers · Free forever · Unsubscribe anytime
            </p>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
