import { config } from '../config'
import { fetchRepoReadme, type RepoReadme } from '../utils/github'
import { useAsync, type AsyncState } from './useAsync'

/** Fetches the README preview of every configured GitHub repository. */
export function useRepoReadmes(): AsyncState<RepoReadme[]> {
  const { repositories, readmePreviewLines } = config.github
  return useAsync(
    () =>
      Promise.all(
        repositories.map((repo) => fetchRepoReadme(repo, readmePreviewLines)),
      ),
    repositories.join(','),
  )
}
