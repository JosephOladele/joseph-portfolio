import React, { useMemo, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/*
 * The band that stitches the hero to About: role + toolkit on a
 * hairline track. The track drifts on its own, then leans into your
 * scroll — speeding up, and reversing direction, with scroll velocity.
 * Falls back to the original CSS loop under prefers-reduced-motion.
 */

/* Wrap v into [min, max) so the two duplicated rows loop seamlessly. */
const wrap = (min, max, v) => {
  const range = max - min;
  return min + (((((v - min) % range) + range) % range) || 0);
};

export default function Marquee({ config }) {
  const reduced = useReducedMotion();
  const items = useMemo(
    () => [config.role, ...config.skills.flatMap((g) => g.items)],
    [config]
  );

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  /* How hard the scroll leans on the drift: 0 at rest, ±5 when flung. */
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionRef = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (reduced) return;
    let moveBy = directionRef.current * -1.6 * (delta / 1000);

    const vf = velocityFactor.get();
    /* A committed scroll flips the drift to follow it. */
    if (vf < -0.4) directionRef.current = -1;
    else if (vf > 0.4) directionRef.current = 1;

    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const row = (key) => (
    <div className="marquee__row" key={key}>
      {items.map((it) => (
        <span key={`${key}-${it}`}>
          {it}
          <i aria-hidden="true">✦</i>
        </span>
      ))}
    </div>
  );

  /* Reduced motion: the original gentle CSS loop (paused by the CSS). */
  if (reduced) {
    return (
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">{[row(0), row(1)]}</div>
      </div>
    );
  }

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee__track marquee__track--live" style={{ x }}>
        {[row(0), row(1)]}
      </motion.div>
    </div>
  );
}
