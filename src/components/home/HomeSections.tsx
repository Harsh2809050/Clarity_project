'use client'

import { useState, useEffect } from 'react'
import { loadSiteContent, defaultSiteContent } from '@/lib/site-content'
import { FeaturedIssue } from './FeaturedIssue'
import { RecentIssues } from './RecentIssues'
import { SubscribeCTA } from './SubscribeCTA'
import type { Newsletter } from '@/types/newsletter'

interface Props {
  featured: Newsletter | null
  recent: Newsletter[]
}

export function HomeSections({ featured, recent }: Props) {
  const [s, setS] = useState(defaultSiteContent)
  useEffect(() => { setS(loadSiteContent()) }, [])

  return (
    <>
      {s.showFeatured && featured && <FeaturedIssue issue={featured} />}
      {s.showRecent  && recent.length > 0 && <RecentIssues issues={recent} />}
      {s.showCTA     && <SubscribeCTA />}
    </>
  )
}
