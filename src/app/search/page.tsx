import type { Metadata } from 'next'
import { SearchClient } from './SearchClient'

export const metadata: Metadata = {
  title: 'Search — Clarity Project',
  description: 'Search across all conversations, guests, and topics on The Clarity Project.',
}

export default function SearchPage() {
  return <SearchClient />
}
