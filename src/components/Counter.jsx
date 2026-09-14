import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/*
 * Counts a numeric stat up when it scrolls into view, once. Values that
 * are not numbers (the word "Open") are printed straight through.
 */
export default function Counter({ value, duration = 1100 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();
  const target = Number(value);
  const numeric = Number.isFinite(target);

  const [shown, setShown] = useState(numeric ? 0 : value);

  useEffect(() => {
    if (!numeric || !inView) return;
    if (reduced) {
      setShown(target);
      return;
    }

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, target, duration, reduced]);

  return <span ref={ref}>{shown}</span>;
}
