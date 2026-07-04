import React from "react";
import Reveal from "./Reveal.jsx";

export default function Work({ config }) {
  return (
    <section id="work" className="section-pad">
      <div className="shell">
        <span className="sec-num" aria-hidden="true">
          03
        </span>
        <Reveal className="sec-head">
          <span className="label">Work</span>
          <h2>
            Selected <em>work</em>
          </h2>
        </Reveal>

        <div className="work__list">
          {config.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} as="article" className="project">
              <div className="project__lead">
                <span className="project__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="project__cat">{p.category}</span>
                {p.image && (
                  <a
                    className="project__preview"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={-1}
                  >
                    <img src={p.image} alt={`${p.name} live preview`} loading="lazy" />
                  </a>
                )}
              </div>

              <div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </div>

              <div className="project__meta">
                <ul className="project__tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a
                  className="project__link"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View project
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
