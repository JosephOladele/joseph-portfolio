import React, { useMemo, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/*
 * Magnetic hover: the wrapped element leans toward the cursor while
 * it's near, then springs home on leave. Desktop fine-pointers only;
 * renders inert for touch and reduced motion.
 */
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const fine = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
    []
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.2 });

  if (reduced || !fine) {
    return <span style={{ display: "inline-block" }}>{children}</span>;
  }

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}
