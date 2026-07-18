import type { RepoReadme } from '../utils/github'
import { MarkdownView } from './MarkdownView'

interface ReadmePreviewProps {
  readme: RepoReadme
}

/**
 * First lines of a repository README rendered as HTML, with the
 * "... continue" link redirecting to the GitHub repository.
 */
export function ReadmePreview({ readme }: ReadmePreviewProps) {
  const hasContent = readme.markdown.length > 0
  return (
    <div className="readme-preview">
      {hasContent ? (
        <div
          className={`readme-preview__rendered${
            readme.truncated ? ' readme-preview__rendered--clipped' : ''
          }`}
        >
          <MarkdownView
            markdown={readme.markdown}
            assetBase={readme.assetBase}
            linkBase={readme.linkBase}
          />
        </div>
      ) : (
        <p className="state-line">{'> README NOT FOUND IN ARCHIVE'}</p>
      )}
      <a
        className="readme-preview__continue"
        href={readme.url}
        target="_blank"
        rel="noreferrer"
      >
        ... continue
      </a>
    </div>
  )
}
