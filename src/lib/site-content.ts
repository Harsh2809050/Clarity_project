export interface HeroStat { n: string; label: string }

export interface SiteContent {
  heroEyebrow: string
  heroHeadline: string
  heroSubtitle: string
  heroStats: HeroStat[]
  showFeatured: boolean
  showRecent: boolean
  showCTA: boolean
}

export const SITE_KEY = 'cp_site_v1'

export const defaultSiteContent: SiteContent = {
  heroEyebrow: 'Season 1 · Now Live · Hosted by Aarthik Ramkumar',
  heroHeadline: 'Conversations shaping the future of Indian education.',
  heroSubtitle: 'A weekly deep-dive with the architects, reformers, and builders rewriting what school, policy, and enterprise can be. Every conversation becomes a newsletter you can act on.',
  heroStats: [
    { n: '8',    label: 'Issues'  },
    { n: '5K+',  label: 'Readers' },
    { n: '6',    label: 'Topics'  },
    { n: '100%', label: 'Free'    },
  ],
  showFeatured: false,
  showRecent: true,
  showCTA: true,
}

export function loadSiteContent(): SiteContent {
  if (typeof window === 'undefined') return defaultSiteContent
  try {
    const raw = localStorage.getItem(SITE_KEY)
    if (!raw) return defaultSiteContent
    return { ...defaultSiteContent, ...(JSON.parse(raw) as Partial<SiteContent>) }
  } catch {
    return defaultSiteContent
  }
}

export function saveSiteContent(c: SiteContent): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SITE_KEY, JSON.stringify(c))
}
