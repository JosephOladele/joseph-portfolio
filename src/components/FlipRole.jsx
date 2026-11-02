import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/*
 * A desk calendar for job titles: spiral rings across the top and a
 * page that flips over every couple of seconds to the next role.
 */
export default function FlipRole({ roles, start = true, interval = 2400 }) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!start || reduced || roles.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), interval);
    return () => clearInterval(t);
  }, [start, reduced, roles.length, interval]);

  return (
    <span className="flip" aria-live="off">
      <span className="flip__rings" aria-hidden="true">
        {Array.from({ length: 11 }, (_, k) => (
          <span key={k} />
        ))}
      </span>
      <motion.span className="flip__card" layout transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        <span className="sr-only">{roles.join(", ")}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            className="flip__page"
            aria-hidden="true"
            initial={{ rotateX: 92, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -92, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
