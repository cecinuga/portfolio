import type { RepoReadme } from '../utils/github'

interface ReadmePreviewProps {
  readme: RepoReadme
}

/**
 * First lines of a repository README with the "... continue" link
 * redirecting to the GitHub repository.
 */
export function ReadmePreview({ readme }: ReadmePreviewProps) {
  const hasContent = readme.previewLines.length > 0
  return (
    <div className="readme-preview">
      {readme.imageUrl && (
        <img
          className="repo-image"
          src={readme.imageUrl}
          alt={`${readme.repo} preview`}
          loading="lazy"
        />
      )}
      {hasContent ? (
        <pre
          className={`readme-preview__text${
            readme.truncated ? ' readme-preview__text--clipped' : ''
          }`}
        >
          {readme.previewLines.join('\n')}
        </pre>
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
