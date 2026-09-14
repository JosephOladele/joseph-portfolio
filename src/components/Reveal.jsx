import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle scroll-reveal: a short rise + fade, staggered by `delay`.
 *
 * By default it fires the first time it scrolls into view. Pass `start`
 * and it switches to an explicit trigger instead — the hero uses that so
 * its intro plays as the preloader lifts, not behind it.
 *
 * Renders statically for users who prefer reduced motion.
 */
const HIDDEN = { opacity: 0, y: 26 };
const SHOWN = { opacity: 1, y: 0 };

export default function Reveal({
  children,
  delay = 0,
  as = "div",
  start,
  ...rest
}) {
  const prefersReduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (prefersReduced) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }

  const gated = start !== undefined;

  return (
    <Tag
      initial={HIDDEN}
      {...(gated
        ? { animate: start ? SHOWN : HIDDEN }
        : {
            whileInView: SHOWN,
            viewport: { once: true, margin: "0px 0px -80px 0px" },
          })}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
