import { fetchLinkReadme, type LinkReadme } from '../utils/github'
import { useAsync, type AsyncState } from './useAsync'

/** Fetches the README behind an experiment's GitHub link. */
export function useExperimentReadme(link: string | null): AsyncState<LinkReadme> {
  return useAsync(
    () =>
      link
        ? fetchLinkReadme(link)
        : Promise.resolve({ url: '', markdown: '', assetBase: '', linkBase: '' }),
    link ?? 'no-link',
  )
}
