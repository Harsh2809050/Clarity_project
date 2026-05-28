import type { Metadata } from 'next'
import { WorkEditor } from '@/components/admin/WorkEditor'

export const metadata: Metadata = {
  title: 'Our Work — The Clarity Project',
  description:
    'Every conversation we have published — written out in full, with the ideas, arguments and insights that came out of each episode.',
  openGraph: {
    images: [{ url: '/thumbnails/issue-01-mahesh-balakrishnan.png', width: 1200, height: 675 }],
  },
  twitter: { images: ['/thumbnails/issue-01-mahesh-balakrishnan.png'] },
}

export default function OurWorkPage() {
  return <WorkEditor />
}
