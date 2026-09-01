import { useEffect } from 'react'
import { config } from '../config'
import { trackEvent } from '../utils/analytics'

/** Home: hero introduction, skills, current status and the quality manifesto. */
export function Home() {
  const { site, about } = config

  useEffect(() => {
    trackEvent('home_view', { skill_count: about.skills.length })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="page">
      <section className="hero">
        <span className="hero__shape hero__shape--1" aria-hidden="true" />
        <span className="hero__shape hero__shape--2" aria-hidden="true" />
        <span className="hero__shape hero__shape--3" aria-hidden="true" />
        <div className="hero__inner">
          <div className="hero__kicker">{site.kicker}</div>
          <h1 className="hero__title">{site.title}</h1>
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0 ? 'hero__lead' : 'hero__lead hero__lead--muted'
              }
            >
              {paragraph}
            </p>
          ))}
          <div className="tag-row" style={{ margin: '18px 0 48px' }}>
            {about.skills.map((skill) => (
              <span key={skill} className="tag tag--accent">
                {skill}
              </span>
            ))}
          </div>
          <div className="quality-card">
            <h2>{about.quality.title}</h2>
            <p className="quality-card__intro">{about.quality.intro}</p>
            <p className="quality-card__label">{about.quality.listLabel}</p>
            <div className="tag-row" style={{ marginBottom: 24 }}>
              {about.quality.values.map((value) => (
                <span key={value} className="tag tag--sage">
                  {value}
                </span>
              ))}
            </div>
            {about.quality.paragraphs.map((paragraph) => (
              <p key={paragraph} className="quality-card__text">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="card fact-card" style={{marginTop: "1rem"}}>
            <div className="fact-card__label">
              <span className="fact-card__dot" aria-hidden="true" />
              Right now
            </div>
            <div className="fact-card__rows">
              {site.rightNow.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label} · </span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
