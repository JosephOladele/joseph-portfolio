import React from "react";
import Reveal from "./Reveal.jsx";

export default function About({ config }) {
  return (
    <section id="about" className="section-pad">
      <div className="shell">
        <span className="sec-num" aria-hidden="true">
          01
        </span>
        <Reveal className="sec-head">
          <span className="label">About</span>
          <h2>
            A builder, <em>end to end</em>
          </h2>
        </Reveal>

        <div className="about__grid">
          <span className="label label--accent" aria-hidden="true">
            Profile
          </span>

          <Reveal>
            <p className="about__bio">{config.bio}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="about__stats">
              {config.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <dt className="stat__label" style={{ order: 2 }}>
                    {s.label}
                  </dt>
                  <dd className="stat__value" style={{ order: 1 }}>
                    {s.value}
                    {s.suffix && <sup>{s.suffix}</sup>}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
