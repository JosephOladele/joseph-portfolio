import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle scroll-reveal: a short rise + fade, staggered by `delay`.
 * Renders statically for users who prefer reduced motion.
 */
export default function Reveal({ children, delay = 0, as = "div", ...rest }) {
  const prefersReduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (prefersReduced) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
