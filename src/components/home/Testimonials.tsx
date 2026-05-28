import { AnimateIn, StaggerList, StaggerItem } from '@/components/ui/AnimateIn'

const testimonials = [
  {
    quote: 'The Clarity Project is the only newsletter I open immediately. Aarthik asks the questions every school leader is thinking but nobody asks out loud.',
    author: 'Deepa Krishnamurthy',
    role: 'Principal, International School, Hyderabad',
    initial: 'D',
  },
  {
    quote: 'Dense with insight, zero fluff. Each issue gives me two or three ideas I actually take into my next board meeting.',
    author: 'Vikram Nair',
    role: 'Founder & CEO, EdTech Startup, Bengaluru',
    initial: 'V',
  },
  {
    quote: 'I forwarded the teacher retention issue to every department head in our trust. That rarely happens. This is the kind of writing we need more of.',
    author: 'Ananya Sharma',
    role: 'Education Policy Researcher, Delhi',
    initial: 'A',
  },
]

export function Testimonials() {
  return (
    <section className="section-y bg-parchment dark:bg-charcoal">
      <div className="container-editorial">

        <AnimateIn className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow mb-2">What Readers Say</p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              Trusted by people who care deeply.
            </h2>
          </div>
        </AnimateIn>

        <StaggerList className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
          {testimonials.map(({ quote, author, role, initial }) => (
            <StaggerItem key={author}>
              <div className="relative flex flex-col h-full p-7 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark shadow-card dark:shadow-card-dark overflow-hidden">
                {/* Top accent */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-sage via-sage-glow/60 to-transparent" />
                {/* Quote mark */}
                <span className="font-serif text-[64px] leading-[0.75] text-sage/[0.12] select-none mb-3" aria-hidden="true">&ldquo;</span>
                <p className="font-serif text-[15px] italic text-ink dark:text-ink-snow leading-relaxed flex-1 mb-6">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sage/15 dark:bg-sage/10 flex items-center justify-center shrink-0">
                    <span className="font-sans text-[13px] font-bold text-sage dark:text-sage-glow">{initial}</span>
                  </div>
                  <div>
                    <p className="font-sans text-[13px] font-semibold text-ink dark:text-ink-snow">{author}</p>
                    <p className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">{role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>

      </div>
    </section>
  )
}
