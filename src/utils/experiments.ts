import { config, type ExperimentEntry } from '../config'

/** Converts an experiment title into its snake_case route segment. */
export function experimentSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

/** Resolves a route slug back to the configured experiment, if any. */
export function findExperimentBySlug(slug: string): ExperimentEntry | undefined {
  return config.experiments.find(
    (experiment) => experimentSlug(experiment.title) === slug,
  )
}

/**
 * Picks the link to source the README from: the "github" entry when present,
 * otherwise the first github.com link, otherwise null.
 */
export function experimentReadmeLink(experiment: ExperimentEntry): string | null {
  const links = experiment.link
  if (!links) return null
  if (links.github) return links.github
  const githubEntry = Object.values(links).find((url) => url.includes('github.com'))
  return githubEntry ?? null
}

/** Human label for a link key: "github" → "GitHub", "web-app" → "Web app". */
export function formatLinkLabel(key: string): string {
  if (key.toLowerCase() === 'github') return 'GitHub'
  const spaced = key.replace(/[-_]+/g, ' ').trim()
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}
