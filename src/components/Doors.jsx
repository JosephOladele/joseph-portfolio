import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import MaskReveal from "./MaskReveal.jsx";
import { SKILL_ICONS } from "./skillIcons.js";

/* Camera timings (ms) */
const SWING = 380; // door starts swinging, then the camera moves
const DOLLY = 1150; // camera flight into the doorway
const SETTLE = 120; // beat of pure light before the room appears
const ROOM_OUT = 450; // room fades back to light
const PULL_BACK = 1000; // camera flight back out

/*
 * "Magic happens behind the doors." Each service is a painted door.
 * Hover one and it steps forward while the others fall back into the
 * dark. Tap it and it swings open, the camera flies through the
 * doorway into the light, and the room behind it appears. "Back to
 * the doors" (or Escape) flies the camera back out.
 */
export default function Doors({ config }) {
  const reduced = useReducedMotion();
  const [focus, setFocus] = useState(null); // door being pointed at
  const [opening, setOpening] = useState(null); // door swung open
  const [camera, setCamera] = useState(false); // camera is inside / moving
  const [room, setRoom] = useState(null);
  const doorRefs = useRef({});
  const lightRefs = useRef({});
  const stageRef = useRef(null);
  const busy = useRef(false);

  /* Fly the stage so the chosen doorway's light fills the viewport. */
  const flyInto = (id) => {
    const stage = stageRef.current;
    const light = lightRefs.current[id];
    if (!stage || !light) return;
    const s = stage.getBoundingClientRect();
    const l = light.getBoundingClientRect();
    const cx = l.left + l.width / 2;
    const cy = l.top + l.height / 2;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.max(vw / l.width, vh / l.height) * 1.6;
    stage.style.transformOrigin = `${cx - s.left}px ${cy - s.top}px`;
    stage.style.transition = `transform ${DOLLY}ms cubic-bezier(0.7, 0, 0.2, 1)`;
    stage.style.transform = `translate(${vw / 2 - cx}px, ${vh / 2 - cy}px) scale(${scale})`;
  };

  const flyOut = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.transition = `transform ${PULL_BACK}ms cubic-bezier(0.6, 0, 0.25, 1)`;
    stage.style.transform = "";
  };

  const enter = useCallback(
    (door) => {
      if (busy.current) return;
      busy.current = true;
      setFocus(door.id);
      setOpening(door.id);
      window.__lenis?.stop();
      document.documentElement.classList.add("is-room");

      if (reduced) {
        setRoom(door);
        busy.current = false;
        return;
      }

      setCamera(true);
      setTimeout(() => flyInto(door.id), SWING);
      setTimeout(() => {
        setRoom(door);
        busy.current = false;
      }, SWING + DOLLY + SETTLE);
    },
    [reduced]
  );

  const leave = useCallback(() => {
    if (busy.current || !room) return;
    busy.current = true;
    const id = room.id;
    setRoom(null);

    const done = () => {
      setCamera(false);
      setOpening(null);
      setFocus(null);
      window.__lenis?.start();
      document.documentElement.classList.remove("is-room");
      doorRefs.current[id]?.focus({ preventScroll: true });
      busy.current = false;
    };

    if (reduced) return done();
    setTimeout(flyOut, ROOM_OUT);
    /* the door swings shut as the camera clears the frame */
    setTimeout(() => setOpening(null), ROOM_OUT + PULL_BACK * 0.7);
    setTimeout(done, ROOM_OUT + PULL_BACK);
  }, [room, reduced]);

  useEffect(() => {
    if (!room) return;
    const onKey = (e) => e.key === "Escape" && leave();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [room, leave]);

  return (
    <section id="doors" className={`section-pad doors ${camera ? "is-camera" : ""}`}>
      <div className="shell doors__stage" ref={stageRef}>
        <span className="sec-num" aria-hidden="true">
          01
        </span>
        <div className="sec-head">
          <Reveal as="span" className="label">
            What I do
          </Reveal>
          <MaskReveal className="sec-head__title" delay={0.06}>
            <h2>
              Magic happens <em>behind the doors</em>
            </h2>
          </MaskReveal>
        </div>

        <p className="doors__hint">Pick a door. Each one opens onto a different part of the work.</p>

        <div
          className={`doors__row ${focus ? "has-focus" : ""}`}
          onPointerLeave={() => !camera && setFocus(null)}
        >
          {config.services.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08} className="doors__cell">
              <button
                type="button"
                ref={(el) => (doorRefs.current[d.id] = el)}
                className={`door ${focus === d.id ? "is-focus" : ""} ${
                  opening === d.id ? "is-open" : ""
                }`}
                style={{ "--door": d.color }}
                onClick={() => enter(d)}
                onPointerEnter={() => !camera && setFocus(d.id)}
                onFocus={() => !camera && setFocus(d.id)}
                onBlur={() => !camera && setFocus(null)}
                aria-label={`Open the ${d.title} door`}
              >
                <span className="door__frame">
                  <span
                    className="door__light"
                    ref={(el) => (lightRefs.current[d.id] = el)}
                    aria-hidden="true"
                  />
                  <span className="door__leaf" aria-hidden="true">
                    <span className="door__panel" />
                    <span className="door__panel" />
                    <span className="door__plate">{d.short}</span>
                    <span className="door__knob" />
                  </span>
                </span>
                <span className="door__spill" aria-hidden="true" />
                <span className="door__caption">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {d.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {room && (
          <Room
            key={room.id}
            door={room}
            index={config.services.findIndex((s) => s.id === room.id)}
            projects={config.projects}
            onBack={leave}
            reduced={reduced}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Room({ door, index, projects, onBack, reduced }) {
  const backRef = useRef(null);
  const work = projects.filter((p) => door.projects?.includes(p.name));

  useEffect(() => {
    backRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      className="room"
      style={{ "--door": door.color }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-title"
      data-lenis-prevent
      /* The camera is already inside the light; the room resolves out of it. */
      initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 1.02 }}
      transition={{ duration: reduced ? 0.2 : ROOM_OUT / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="room__inner shell">
        <button ref={backRef} type="button" className="room__back" onClick={onBack}>
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M11 6H1M1 6l4-4M1 6l4 4" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Back to the doors
        </button>

        <motion.div
          className="room__grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="room__lead">
            <p className="label room__num">Door {String(index + 1).padStart(2, "0")}</p>
            <h2 id="room-title">{door.title}</h2>
            <p className="room__intro">{door.intro}</p>

            <ul className="room__points">
              {door.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>

            <div className="room__tools">
              <p className="label">Tools in this room</p>
              <ul>
                {door.tools.map((t) => {
                  const Icon = SKILL_ICONS[t];
                  return (
                    <li key={t}>
                      {Icon && <Icon aria-hidden="true" />}
                      {t}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="room__work">
            <p className="label">{work.length ? "Built in here" : "In the workshop"}</p>
            {work.length ? (
              work.map((p) => (
                <a key={p.name} className="room__card" href={p.link} target="_blank" rel="noreferrer">
                  {p.image && <img src={p.image} alt={`${p.name} preview`} loading="lazy" />}
                  <span className="room__cardmeta">
                    <span>
                      <strong>{p.name}</strong>
                      <em>{p.category}</em>
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </span>
                </a>
              ))
            ) : (
              <div className="room__empty">
                <p>{door.empty}</p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onBack();
                    setTimeout(() => {
                      const el = document.getElementById("contact");
                      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -24 });
                      else el?.scrollIntoView({ behavior: "smooth" });
                    }, ROOM_OUT + PULL_BACK + 120);
                  }}
                >
                  Ask me about it
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
