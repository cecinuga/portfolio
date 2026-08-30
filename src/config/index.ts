import rawConfig from './site.config.json'

export interface SocialLink {
  name: string
  url: string
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

export interface FactEntry {
  label: string
  value: string
}

export interface QualitySection {
  title: string
  intro: string
  listLabel: string
  values: string[]
  paragraphs: string[]
}

export interface SiteConfig {
  site: {
    title: string
    tagline: string
    kicker: string
    rightNow: FactEntry[]
  }
  resume: {
    /** Plaintext resume parsed at runtime by Work Experience. */
    path: string
    /** File served behind the header's Resume download button. */
    download: string
  }
  pages: PageLink[]
  socials: SocialLink[]
  github: {
    username: string
    readmePreviewLines: number
    repositories: string[]
  }
  about: {
    paragraphs: string[]
    skills: string[]
    quality: QualitySection
  }
  experiments: ExperimentEntry[]
  blog: BlogEntry[]
}

export const config: SiteConfig = rawConfig as SiteConfig
