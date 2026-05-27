import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { FeaturedIssue } from '@/components/home/FeaturedIssue'
import { RecentIssues } from '@/components/home/RecentIssues'
import { PastGuests } from '@/components/home/PastGuests'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { fetchBeehiivPosts } from '@/lib/beehiiv'
import { newsletters as fallback } from '@/data/newsletters'

export const metadata: Metadata = {
  title: 'Clarity Project — Conversations Shaping India\'s Future',
}

export default async function HomePage() {
  const live = await fetchBeehiivPosts(10)
  const all = live ?? fallback

  const featured = all[0]
  const recent = all.slice(1, 4)

  return (
    <>
      <Hero />
      {featured && <FeaturedIssue issue={featured} />}
      {recent.length > 0 && <RecentIssues issues={recent} />}
      <PastGuests />
      <SubscribeCTA />
    </>
  )
}
