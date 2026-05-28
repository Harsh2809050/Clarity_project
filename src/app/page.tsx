import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { FeaturedIssue } from '@/components/home/FeaturedIssue'
import { RecentIssues } from '@/components/home/RecentIssues'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { fetchBeehiivPosts } from '@/lib/beehiiv'
import { newsletters as fallback } from '@/data/newsletters'

export const metadata: Metadata = {
  title: 'Clarity Project — Conversations Shaping India\'s Future',
  openGraph: {
    images: [{ url: '/thumbnails/issue-01-mahesh-balakrishnan.png', width: 1200, height: 675 }],
  },
  twitter: { images: ['/thumbnails/issue-01-mahesh-balakrishnan.png'] },
}

export default async function HomePage() {
  const live = await fetchBeehiivPosts(10)
  const all = live ?? fallback

  const featured = all[0]
  const recent = all.slice(1, 4)

  return (
    <>
      <Hero issue={featured} />
      {featured && <FeaturedIssue issue={featured} />}
      {recent.length > 0 && <RecentIssues issues={recent} />}
      <SubscribeCTA />
    </>
  )
}
