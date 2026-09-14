import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* A single cobalt hairline across the top of the nav that fills as the
   page is read. Spring damped so it glides rather than snaps. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: width }}
      aria-hidden="true"
    />
  );
}
