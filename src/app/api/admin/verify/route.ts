import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const store = await cookies()
  const ok = store.get('cp_admin_session')?.value === '1'
  return NextResponse.json({ ok })
}
