import { NextResponse } from 'next/server'
import { fetchBeehiivPosts } from '@/lib/beehiiv'
import { newsletters as fallback } from '@/data/newsletters'

export const revalidate = 3600

export async function GET() {
  const live = await fetchBeehiivPosts(50)
  const data = live ?? fallback

  return NextResponse.json(
    { data, source: live ? 'beehiiv' : 'fallback' },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  )
}
