import rawConfig from './site.config.json'

export interface SocialAttribution {
  href: string
  title: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  attribution: SocialAttribution
}

export interface PageLink {
  label: string
  path: string
}

/** Maps a button label (e.g. "github", "web-app") to the URL it opens. */
export type ExperimentLinks = Record<string, string>

export interface ExperimentEntry {
  id: string
  title: string
  status: string
  description: string
  link: ExperimentLinks | null
}

export interface BlogEntry {
  id: string
  date: string
  title: string
  excerpt: string
  link: string | null
}

export interface SiteConfig {
  site: {
    title: string
    codename: string
    tagline: string
    subtitle: string
    facility: string
    bootLines: string[]
  }
  resume: { path: string }
  pages: PageLink[]
  socials: SocialLink[]
  github: {
    username: string
    readmePreviewLines: number
    repositories: string[]
  }
  about: {
    heading: string
    paragraphs: string[]
    skills: string[]
  }
  experiments: ExperimentEntry[]
  blog: BlogEntry[]
}

export const config: SiteConfig = rawConfig as SiteConfig
