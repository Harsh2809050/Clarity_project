import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export interface Subscriber {
  id: string
  email: string
  status: string
  created: number
  utm_source?: string
  utm_medium?: string
}

export async function GET() {
  // Verify session
  const store = await cookies()
  if (store.get('cp_admin_session')?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const API_KEY = process.env.BEEHIIV_API_KEY
  const PUB_ID  = process.env.BEEHIIV_PUBLICATION_ID

  if (!API_KEY || !PUB_ID) {
    return NextResponse.json({ configured: false, subscribers: [], total: 0 })
  }

  try {
    const url = `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions?limit=100&order_by=created&direction=desc`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      return NextResponse.json({ configured: true, error: 'Beehiiv fetch failed', subscribers: [], total: 0 })
    }

    const json = await res.json() as { data: Subscriber[]; total_results: number }
    const subscribers = json.data ?? []
    return NextResponse.json({
      configured: true,
      subscribers,
      // total_results can be 0 from Beehiiv even when data exists — use whichever is larger
      total: Math.max(json.total_results ?? 0, subscribers.length),
    })
  } catch {
    return NextResponse.json({ configured: true, error: 'Network error', subscribers: [], total: 0 })
  }
}
