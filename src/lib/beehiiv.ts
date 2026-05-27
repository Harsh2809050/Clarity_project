import type { Newsletter } from '@/types/newsletter'

const API_BASE = 'https://api.beehiiv.com/v2'
const API_KEY = process.env.BEEHIIV_API_KEY
const PUB_ID = process.env.BEEHIIV_PUBLICATION_ID

interface BeehiivPost {
  id: string
  title: string
  subtitle?: string
  publish_date: number
  status: string
  content_tags?: string[]
  thumbnail_url?: string
  web_url: string
  authors?: Array<{ name: string }>
}

interface BeehiivPostsResponse {
  data: BeehiivPost[]
  total_results: number
}

export async function fetchBeehiivPosts(limit = 20): Promise<Newsletter[] | null> {
  if (!API_KEY || !PUB_ID) return null

  try {
    const res = await fetch(
      `${API_BASE}/publications/${PUB_ID}/posts?status=confirmed&limit=${limit}&order_by=publish_date&direction=desc`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null

    const json: BeehiivPostsResponse = await res.json()
    return json.data.map(mapPost)
  } catch {
    return null
  }
}

function mapPost(post: BeehiivPost): Newsletter {
  const date = new Date(post.publish_date * 1000)
  const tag = post.content_tags?.[0] ?? 'Insight'

  return {
    id: post.id,
    slug: post.id,
    guest: post.authors?.[0]?.name ?? 'Guest',
    title: post.title,
    subtitle: post.subtitle,
    date: date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    isoDate: date.toISOString().split('T')[0],
    description: post.subtitle ?? '',
    topic: tag,
    topicSlug: tag.toLowerCase().replace(/\s+/g, '-'),
    url: post.web_url,
    image: post.thumbnail_url ?? '',
    readTime: '8 min read',
  }
}

export async function subscribeToBeehiiv(
  email: string,
  utmSource = 'website'
): Promise<{ success: boolean; message: string }> {
  if (!API_KEY || !PUB_ID) {
    return { success: false, message: 'Newsletter service not configured.' }
  }

  try {
    const res = await fetch(`${API_BASE}/publications/${PUB_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: false, // we send our own via Resend
        utm_source: utmSource,
        utm_medium: 'inline_form',
        utm_campaign: 'website_subscribe',
      }),
    })

    if (res.ok) return { success: true, message: 'You\'re in! Check your inbox for a welcome note.' }

    const err = await res.json().catch(() => ({}))
    if (res.status === 409) return { success: true, message: 'You\'re already subscribed.' }

    return { success: false, message: (err as { message?: string }).message ?? 'Something went wrong. Please try again.' }
  } catch {
    return { success: false, message: 'Could not connect. Please try again.' }
  }
}
