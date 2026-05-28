import type { Metadata } from 'next'
import { BeAGuestEditor } from '@/components/admin/BeAGuestEditor'

export const metadata: Metadata = {
  title: 'Be a Guest — Clarity Project',
  description:
    'Appear on Clarity Project. We speak with educators, policymakers, founders, and researchers reshaping India\'s future. Apply to be a guest.',
}

export default function BeAGuestPage() {
  return <BeAGuestEditor />
}
