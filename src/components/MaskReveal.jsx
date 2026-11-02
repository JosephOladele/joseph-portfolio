import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/*
 * Editorial "curtain" reveal for display type: the block rises out of
 * an overflow-hidden mask with a long expo ease, like type emerging
 * from behind a rule. Use for headlines; Reveal stays the tool for
 * body copy. Renders statically under prefers-reduced-motion.
 *
 * The visible mask is what gets watched, not the hidden type inside
 * it: the type starts fully clipped, so it would never count as seen.
 */
export default function MaskReveal({ children, delay = 0, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <div ref={ref} style={{ overflow: "hidden" }} {...rest}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
