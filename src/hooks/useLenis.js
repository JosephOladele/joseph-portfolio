import { useEffect } from "react";
import Lenis from "lenis";

/*
 * Inertia smooth-scrolling for the whole page (Lenis), with anchor
 * links routed through lenis.scrollTo so in-page navigation glides
 * instead of jumping. Skipped entirely under prefers-reduced-motion
 * and on coarse (touch) pointers, where native scrolling feels best.
 */
export default function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    /* lerp instead of a fixed duration: each frame closes a small share
       of the gap to the target, so fast wheel spins blend into one long
       glide instead of restarting an animation on every tick. */
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });
    /* Shared so overlays (the door rooms) can pause page scrolling. */
    window.__lenis = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* Glide to in-page anchors instead of jumping. */
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = a.getAttribute("href");
      if (!target || target === "#") return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, {
        offset: target === "#top" ? 0 : -24,
        duration: 1.6,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
      history.pushState(null, "", target);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);
}
