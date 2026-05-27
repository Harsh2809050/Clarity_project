import { NextResponse } from 'next/server'
import { subscribeToBeehiiv } from '@/lib/beehiiv'

export async function POST(req: Request) {
  try {
    const { email, utmSource } = await req.json() as { email?: string; utmSource?: string }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 })
    }

    const result = await subscribeToBeehiiv(email, utmSource ?? 'website')
    return NextResponse.json(result, { status: result.success ? 200 : 500 })
  } catch {
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 })
  }
}
