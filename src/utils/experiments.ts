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
