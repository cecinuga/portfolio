/**
 * Runtime fetching of GitHub repository READMEs (no backend, no auth).
 * READMEs are pulled from raw.githubusercontent.com to avoid API rate limits.
 */

export interface RepoReadme {
  repo: string
  url: string
  /** First N lines of the README, markdown stripped down to plain text. */
  previewLines: string[]
  /** Whether the README continues past the preview. */
  truncated: boolean
  /** First image referenced in the README, resolved to an absolute URL. */
  imageUrl: string | null
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

/** Extracts the first image from markdown (``![alt](src)`` or ``<img src>``). */
function extractFirstImage(
  markdown: string,
  repo: string,
  branch: string,
  pathPrefix = '',
): string | null {
  const md = markdown.match(/!\[[^\]]*\]\(([^)\s]+)/)
  const html = markdown.match(/<img[^>]+src=["']([^"']+)["']/i)
  const src = md?.[1] ?? html?.[1] ?? null
  if (!src) return null
  if (/^https?:\/\//.test(src)) return src
  return `https://raw.githubusercontent.com/${repo}/${branch}/${pathPrefix}${src.replace(/^\.?\//, '')}`
}

/** Light markdown cleanup so the preview reads like terminal output. */
function stripMarkdown(line: string): string {
  return line
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`]{1,3}/g, '')
    .replace(/^#{1,6}\s*/, '')
}

export interface LinkReadme {
  /** The original github.com link the README belongs to. */
  url: string
  /** Full README, markdown stripped down to plain text. */
  lines: string[]
  /** First image referenced in the README, resolved to an absolute URL. */
  imageUrl: string | null
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

/** Fetches the full README behind any github.com repo/tree link. */
export async function fetchLinkReadme(link: string): Promise<LinkReadme> {
  const parsed = parseGithubLink(link)
  if (!parsed) return { url: link, lines: [], imageUrl: null }

  const branches = parsed.branch ? [parsed.branch] : BRANCHES
  const prefix = parsed.path ? `${parsed.path}/` : ''
  for (const branch of branches) {
    for (const name of README_NAMES) {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/${parsed.repo}/${branch}/${prefix}${name}`,
        )
        if (res.ok) {
          const text = await res.text()
          return {
            url: link,
            lines: text
              .split(/\r?\n/)
              .map(stripMarkdown)
              .map((l) => l.trimEnd()),
            imageUrl: extractFirstImage(text, parsed.repo, branch, prefix),
          }
        }
      } catch {
        // network error: try next candidate
      }
    }
  }
  return { url: link, lines: [], imageUrl: null }
}

export async function fetchRepoReadme(
  repo: string,
  maxLines: number,
): Promise<RepoReadme> {
  const url = `https://github.com/${repo}`
  const raw = await fetchRawReadme(repo)
  if (!raw) {
    return { repo, url, previewLines: [], truncated: false, imageUrl: null }
  }

  const allLines = raw.text.split(/\r?\n/)
  const previewLines = allLines
    .slice(0, maxLines)
    .map(stripMarkdown)
    .map((l) => l.trimEnd())

  return {
    repo,
    url,
    previewLines,
    truncated: allLines.length > maxLines,
    imageUrl: extractFirstImage(raw.text, repo, raw.branch),
  }
}
