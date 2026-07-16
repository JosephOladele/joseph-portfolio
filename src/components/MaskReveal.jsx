import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * Editorial "curtain" reveal for display type: the block rises out of
 * an overflow-hidden mask with a long expo ease, like type emerging
 * from behind a rule. Use for headlines; Reveal stays the tool for
 * body copy. Renders statically under prefers-reduced-motion.
 */
export default function MaskReveal({ children, delay = 0, ...rest }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <div style={{ overflow: "hidden" }} {...rest}>
      <motion.div
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
