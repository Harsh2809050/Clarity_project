import { NextResponse } from 'next/server'

// ADMIN_PASSWORD is server-only — never use NEXT_PUBLIC_ for secrets
const ADMIN_PW = process.env.ADMIN_PASSWORD ?? 'clarity2026'

export async function POST(req: Request) {
  try {
    const { password } = await req.json() as { password?: string }
    if (!password || password !== ADMIN_PW) {
      return NextResponse.json({ ok: false, message: 'Wrong password.' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set('cp_admin_session', '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ ok: false, message: 'Bad request.' }, { status: 400 })
  }
}
