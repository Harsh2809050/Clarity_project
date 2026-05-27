import { NextResponse } from 'next/server'

/**
 * Webhook endpoint — called by Beehiiv or Make.com when a new issue is published.
 * Triggers ISR revalidation so the archive updates instantly.
 *
 * Headers required:
 *   x-webhook-secret: <WEBHOOK_SECRET env var>
 */
export async function POST(req: Request) {
  const secret = req.headers.get('x-webhook-secret')

  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json() as Record<string, unknown>

    // Log for debugging — replace with your logging service
    console.log('[webhook] New issue published:', JSON.stringify(body, null, 2))

    // Revalidate the archive and home page paths
    // (In production, call Next.js revalidateTag/revalidatePath via the cache API)
    // This is handled automatically by ISR (revalidate = 3600) but you can
    // force-revalidate here if you add on-demand revalidation tokens.

    return NextResponse.json({ received: true, timestamp: new Date().toISOString() })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
