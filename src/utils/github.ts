/**
 * Runtime fetching of GitHub repository READMEs (no backend, no auth).
 * READMEs are pulled from raw.githubusercontent.com to avoid API rate limits.
 */

export interface RepoReadme {
  repo: string
  url: string
  /** First N source lines of the README markdown (code fences kept balanced). */
  markdown: string
  /** Whether the README continues past the preview. */
  truncated: boolean
  /** Raw-content base URL (trailing slash) for resolving relative images/assets. */
  assetBase: string
  /** github.com blob base URL (trailing slash) for resolving relative doc links. */
  linkBase: string
}

const BRANCHES = ['HEAD', 'main', 'master']
const README_NAMES = ['README.md', 'readme.md', 'Readme.md']

async function fetchRawReadme(repo: string): Promise<{ text: string; branch: string } | null> {
  for (const branch of BRANCHES) {
    for (const name of README_NAMES) {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/${repo}/${branch}/${name}`,
        )
        if (res.ok) return { text: await res.text(), branch }
      } catch {
        // network error: try next candidate
      }
    }
  }
  return null
}

/** Cuts markdown to its first N source lines, closing any code fence left open. */
function sliceMarkdown(text: string, maxLines: number): { markdown: string; truncated: boolean } {
  const allLines = text.split(/\r?\n/)
  const sliced = allLines.slice(0, maxLines)
  const fenceCount = sliced.filter((l) => /^\s*(```|~~~)/.test(l)).length
  if (fenceCount % 2 === 1) sliced.push('```')
  return { markdown: sliced.join('\n'), truncated: allLines.length > maxLines }
}

export interface LinkReadme {
  /** The original github.com link the README belongs to. */
  url: string
  /** Full README markdown source (empty if not found). */
  markdown: string
  /** Raw-content base URL (trailing slash) for resolving relative images/assets. */
  assetBase: string
  /** github.com blob base URL (trailing slash) for resolving relative doc links. */
  linkBase: string
}

/** Parses a github.com repo or ``/tree/<branch>/<path>`` link into raw coordinates. */
function parseGithubLink(
  link: string,
): { repo: string; branch: string | null; path: string } | null {
  const match = link.match(
    /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/tree\/([^/]+)\/?(.*?))?\/?$/,
  )
  if (!match) return null
  return {
    repo: `${match[1]}/${match[2]}`,
    branch: match[3] ?? null,
    path: match[4] ?? '',
  }
}

/** Fetches the full README markdown behind any github.com repo/tree link. */
export async function fetchLinkReadme(link: string): Promise<LinkReadme> {
  const empty: LinkReadme = { url: link, markdown: '', assetBase: '', linkBase: '' }
  const parsed = parseGithubLink(link)
  if (!parsed) return empty

  const branches = parsed.branch ? [parsed.branch] : BRANCHES
  const prefix = parsed.path ? `${parsed.path}/` : ''
  for (const branch of branches) {
    for (const name of README_NAMES) {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/${parsed.repo}/${branch}/${prefix}${name}`,
        )
        if (res.ok) {
          return {
            url: link,
            markdown: await res.text(),
            assetBase: `https://raw.githubusercontent.com/${parsed.repo}/${branch}/${prefix}`,
            linkBase: `https://github.com/${parsed.repo}/blob/${branch}/${prefix}`,
          }
        }
      } catch {
        // network error: try next candidate
      }
    }
  }
  return empty
}

export async function fetchRepoReadme(
  repo: string,
  maxLines: number,
): Promise<RepoReadme> {
  const url = `https://github.com/${repo}`
  const raw = await fetchRawReadme(repo)
  if (!raw) {
    return { repo, url, markdown: '', truncated: false, assetBase: '', linkBase: '' }
  }

  const { markdown, truncated } = sliceMarkdown(raw.text, maxLines)
  return {
    repo,
    url,
    markdown,
    truncated,
    assetBase: `https://raw.githubusercontent.com/${repo}/${raw.branch}/`,
    linkBase: `https://github.com/${repo}/blob/${raw.branch}/`,
  }
}
