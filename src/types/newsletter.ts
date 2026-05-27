export interface Newsletter {
  id: string
  slug: string
  guest: string
  title: string
  subtitle?: string
  date: string
  isoDate: string
  description: string
  topic: string
  topicSlug: string
  url: string
  image: string
  readTime: string
}

export type Topic =
  | 'all'
  | 'education-policy'
  | 'edtech'
  | 'entrepreneurship'
  | 'higher-education'
  | 'policy'
  | 'skill-development'

export interface TopicFilter {
  label: string
  value: Topic | string
}
