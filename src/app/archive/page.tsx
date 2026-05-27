import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { ArchiveGrid } from '@/components/archive/ArchiveGrid'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { fetchBeehiivPosts } from '@/lib/beehiiv'
import { newsletters as fallback, topics } from '@/data/newsletters'

export const metadata: Metadata = {
  title: 'Archive — Every Conversation, Every Story',
  description:
    'Browse every issue of Clarity Project newsletter — deep-dives into education, policy, and entrepreneurship in India.',
  openGraph: {
    title: 'Archive | Clarity Project',
    description: 'Every conversation, every story. Browse the full archive.',
  },
}

export const revalidate = 3600

export default async function ArchivePage() {
  redirect('/')
  const live = await fetchBeehiivPosts(50)
  const all = live ?? fallback

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-16 bg-cream border-b border-border">
        <div className="container-editorial">
          <p className="eyebrow mb-4">Archive</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight text-balance mb-4">
            Every conversation.<br />Every story.
          </h1>
          <p className="body-lg max-w-xl">
            {all.length} issues exploring the ideas, systems, and people reshaping India&rsquo;s future.
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding">
        <div className="container-editorial">
          <ArchiveGrid newsletters={all} topics={topics} />
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
