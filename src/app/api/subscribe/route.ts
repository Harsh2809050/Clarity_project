import { NextResponse } from 'next/server'
import { subscribeToBeehiiv } from '@/lib/beehiiv'
import { sendWelcomeEmail } from '@/lib/mailer'

export async function POST(req: Request) {
  try {
    const { email, utmSource } = await req.json() as { email?: string; utmSource?: string }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const result = await subscribeToBeehiiv(email, utmSource ?? 'website')

    // Send welcome email only for brand-new subscribers.
    // "already subscribed" returns success:true but a different message — skip those.
    const isNewSubscriber =
      result.success && !result.message.toLowerCase().includes('already')

    if (isNewSubscriber) {
      // Fire-and-forget — email failure must never break the subscribe flow
      void sendWelcomeEmail(email)
    }

    return NextResponse.json(result, { status: result.success ? 200 : 500 })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
