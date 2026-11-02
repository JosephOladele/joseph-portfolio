import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Reveal from "./Reveal.jsx";
import MaskReveal from "./MaskReveal.jsx";

/*
 * "Let's go back in time." A big year holds still on the left while
 * the story scrolls past on the right; the year rolls over to match
 * whichever chapter you are reading.
 */
export default function Timeline({ config }) {
  const [active, setActive] = useState(0);
  const items = config.timeline;
  const year = items[active]?.year;

  return (
    <section id="story" className="section-pad story">
      <div className="shell">
        <span className="sec-num" aria-hidden="true">
          02
        </span>

        <div className="story__grid">
          <div className="story__aside">
            <Reveal as="span" className="label">
              My story
            </Reveal>
            <MaskReveal className="sec-head__title" delay={0.06}>
              <h2 className="story__title">
                Let&rsquo;s go <em>back in time.</em>
              </h2>
            </MaskReveal>

            <div className="story__year" aria-hidden="true">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={year}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {year}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="story__progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${(active + 1) / items.length})` }} />
              <em>
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </em>
            </div>

            <Reveal>
              <p className="story__bio">{config.bio}</p>
            </Reveal>
          </div>

          <ol className="story__list">
            {items.map((it, i) => (
              <Chapter key={it.title} item={it} active={active === i} onSeen={() => setActive(i)} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Chapter({ item, active, onSeen }) {
  const ref = useRef(null);
  const seen = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (seen) onSeen();
  }, [seen, onSeen]);

  return (
    <li ref={ref} className={`chapter ${active ? "is-active" : ""}`}>
      <span className="chapter__dot" aria-hidden="true" />
      <p className="chapter__when">
        <span>{item.year}</span>
        {item.kind}
      </p>
      <h3>{item.title}</h3>
      <p className="chapter__text">{item.text}</p>
      {item.tags && (
        <ul className="chapter__tags">
          {item.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
