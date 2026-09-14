import React, { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import MaskReveal from "./MaskReveal.jsx";

/*
 * The work list. On a desktop pointer the row images lift out of the
 * layout into a single plate that trails the cursor across the list —
 * the row you are reading is the row you are looking at. Touch and
 * reduced motion keep an inline thumbnail instead, so nothing is lost.
 */
export default function Work({ config }) {
  const listRef = useRef(null);
  const plateRef = useRef(null);
  /* Pointer state lives in a ref so the rAF loop never re-renders and the
     enter handler can seed it before the plate is ever painted. */
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, seeded: false });
  const [active, setActive] = useState(-1);
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    setFloating(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  /* One rAF loop for the plate; easing toward the pointer, never per event. */
  useEffect(() => {
    if (!floating) return;
    const plate = plateRef.current;
    const list = listRef.current;
    if (!plate || !list) return;

    let raf;

    const onMove = (e) => {
      const p = pos.current;
      p.tx = e.clientX;
      p.ty = e.clientY;
      if (!p.seeded) {
        p.x = p.tx;
        p.y = p.ty;
        p.seeded = true;
      }
    };

    const loop = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.12;
      p.y += (p.ty - p.y) * 0.12;
      plate.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    list.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      list.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [floating]);

  /* Seed from the entering event too, so the plate fades in under the
     cursor rather than flying in from the corner of the viewport. */
  const enter = useCallback(
    (i) => (e) => {
      const p = pos.current;
      p.tx = e.clientX;
      p.ty = e.clientY;
      if (!p.seeded) {
        p.x = p.tx;
        p.y = p.ty;
        p.seeded = true;
      }
      setActive(i);
    },
    []
  );
  const leave = useCallback(() => setActive(-1), []);

  return (
    <section id="work" className="section-pad">
      <div className="shell">
        <span className="sec-num" aria-hidden="true">
          03
        </span>
        <div className="sec-head">
          <Reveal as="span" className="label">
            Work
          </Reveal>
          <MaskReveal className="sec-head__title" delay={0.06}>
            <h2>
              Selected <em>work</em>
            </h2>
          </MaskReveal>
        </div>

        <div
          className={`work__list ${floating ? "work__list--floating" : ""}`}
          ref={listRef}
          onPointerLeave={leave}
        >
          {config.projects.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.08}
              as="article"
              className={`project ${active === i ? "is-active" : ""}`}
              onPointerEnter={enter(i)}
            >
              {/* The whole row is the target. The label keeps the link's
                  announced name short instead of reading the entire card. */}
              <a
                className="project__hit"
                href={p.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name}, ${p.category}, opens in a new tab`}
              >
                <span className="project__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="project__body">
                  <div className="project__kicker">
                    <span className="project__cat">{p.category}</span>
                    <span className="project__year">{p.year}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p className="project__desc">{p.description}</p>

                  {p.image && (
                    <div className="project__inline">
                      <img
                        src={p.image}
                        alt={`${p.name} preview`}
                        loading="lazy"
                        width="1280"
                        height="800"
                      />
                    </div>
                  )}
                </div>

                <div className="project__meta">
                  <div className="project__tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <span className="project__link">
                    View project
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}

          {floating && (
            <div
              className={`work__plate ${
                active >= 0 && pos.current.seeded ? "is-on" : ""
              }`}
              ref={plateRef}
              aria-hidden="true"
            >
              {config.projects.map((p, i) =>
                p.image ? (
                  <img
                    key={p.name}
                    src={p.image}
                    alt=""
                    className={active === i ? "is-on" : ""}
                    loading="lazy"
                  />
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
