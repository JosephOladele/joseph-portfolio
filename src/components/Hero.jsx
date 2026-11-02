import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import RobotHero from "./RobotHero.jsx";
import Reveal from "./Reveal.jsx";
import Magnetic from "./Magnetic.jsx";
import FlipRole from "./FlipRole.jsx";
import Counter from "./Counter.jsx";

export default function Hero({ config, onRobotReady, robotReady, start }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const first = config.name.split(" ")[0];

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero__lamp" aria-hidden="true" />

      <div className={`hero__stage ${robotReady ? "is-ready" : ""}`}>
        <RobotHero onReady={onRobotReady} />
      </div>
      {/* Outside the stage: the stage's fade mask would isolate the blend. */}
      <div className={`hero__tint ${robotReady ? "is-ready" : ""}`} aria-hidden="true" />

      <motion.div className="hero__content shell" style={reduced ? undefined : { y, opacity }}>
        <Reveal start={start}>
          <p className="hero__eyebrow label">
            <span className="hero__live" aria-hidden="true" />
            Available for work
          </p>
        </Reveal>

        <Reveal start={start} delay={0.12}>
          <h1 className="hero__title">
            Hi, I&rsquo;m {first}.
            <span className="hero__iam">I am a</span>
          </h1>
        </Reveal>

        <Reveal start={start} delay={0.28}>
          <FlipRole roles={config.roles} start={start} />
        </Reveal>

        <Reveal start={start} delay={0.42}>
          <p className="hero__tagline">{config.tagline}</p>
        </Reveal>

        <Reveal start={start} delay={0.52} className="hero__ctas">
          <Magnetic>
            <a className="btn btn--solid" href="#contact">
              Start a project
              <span className="btn__dot" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h10M11 6L7 2M11 6l-4 4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
            </a>
          </Magnetic>
          <a className="btn btn--ghost" href="#work">
            See my work
          </a>
        </Reveal>
      </motion.div>

      <Reveal start={start} delay={0.7} className="hero__stats shell">
        {config.stats.map((s) => (
          <div key={s.label} className="hero__stat">
            <strong>
              <Counter value={s.value} />
              {s.suffix}
            </strong>
            <span className="hero__statlabel">{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
