import { useMemo } from 'react'
import { renderMarkdown } from '../utils/markdown'

interface MarkdownViewProps {
  markdown: string
  /** Base URL for resolving relative images/assets. */
  assetBase: string
  /** Base URL for resolving relative document links. */
  linkBase: string
}

/** Renders README markdown as sanitized, styled HTML. */
export function MarkdownView({ markdown, assetBase, linkBase }: MarkdownViewProps) {
  const html = useMemo(
    () => renderMarkdown(markdown, assetBase, linkBase),
    [markdown, assetBase, linkBase],
  )
  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
