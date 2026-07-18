import DOMPurify from 'dompurify'
import { marked } from 'marked'

/** True for URLs that must not be rebased (already absolute or in-page). */
function isAbsolute(url: string): boolean {
  return /^(https?:|mailto:|data:|#)/i.test(url)
}

function resolve(url: string, base: string): string {
  return base + url.replace(/^\.?\//, '')
}

/**
 * Renders README markdown to sanitized HTML.
 *
 * Relative image sources are rebased onto `assetBase` (raw.githubusercontent.com)
 * so diagrams and screenshots committed next to the README load correctly;
 * relative document links are rebased onto `linkBase` (github.com blob view).
 */
export function renderMarkdown(
  markdown: string,
  assetBase: string,
  linkBase: string,
): string {
  const dirty = marked.parse(markdown, { gfm: true, async: false })
  const clean = DOMPurify.sanitize(dirty)

  // Post-process as DOM so raw HTML <img> tags in the markdown are covered too.
  const doc = new DOMParser().parseFromString(clean, 'text/html')

  doc.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') ?? ''
    if (src && !isAbsolute(src) && assetBase) {
      img.setAttribute('src', resolve(src, assetBase))
    }
    img.setAttribute('loading', 'lazy')
  })

  doc.querySelectorAll('a').forEach((anchor) => {
    const href = anchor.getAttribute('href') ?? ''
    if (href && !isAbsolute(href) && linkBase) {
      anchor.setAttribute('href', resolve(href, linkBase))
    }
    if (!href.startsWith('#')) {
      anchor.setAttribute('target', '_blank')
      anchor.setAttribute('rel', 'noreferrer')
    }
  })

  return doc.body.innerHTML
}
