import type { Metadata } from 'next'
import { SubscribeEditor } from '@/components/admin/SubscribeEditor'

export const metadata: Metadata = {
  title: 'Subscribe — Clarity Project',
  description: 'Join 5,000+ readers. Free weekly newsletter on education, policy, and entrepreneurship in India.',
}

export default function SubscribePage() {
  return <SubscribeEditor />
}
