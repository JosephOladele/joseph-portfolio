import React, { useEffect, useRef } from "react";

/*
 * A soft pool of blue light that trails the cursor across the whole
 * page — screen-blended so it reads as light, not as an element.
 * Desktop pointers only; skipped for touch and reduced motion.
 */
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduced || !el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let raf;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };

    const loop = () => {
      x += (tx - x) * 0.11;
      y += (ty - y) * 0.11;
      el.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}
