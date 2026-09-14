import React from "react";
import Reveal from "./Reveal.jsx";
import MaskReveal from "./MaskReveal.jsx";
import Counter from "./Counter.jsx";

export default function About({ config }) {
  return (
    <section id="about" className="section-pad">
      <div className="shell">
        <span className="sec-num" aria-hidden="true">
          01
        </span>
        <div className="sec-head">
          <Reveal as="span" className="label">
            About
          </Reveal>
          <MaskReveal className="sec-head__title" delay={0.06}>
            <h2>
              A builder, <em>end to end</em>
            </h2>
          </MaskReveal>
        </div>

        <div className="about__grid">
          <span className="label label--accent about__tag" aria-hidden="true">
            Profile
          </span>

          <Reveal>
            <p className="about__bio">{config.bio}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="about__stats">
              {config.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <dt className="stat__label">{s.label}</dt>
                  <dd className="stat__value">
                    <Counter value={s.value} />
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
