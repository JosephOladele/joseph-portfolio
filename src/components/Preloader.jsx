import React, { useEffect, useMemo, useState } from "react";

/*
 * Intro veil: holds the page for a beat while the robot scene streams
 * in, then lifts. Leaves when the scene reports ready — but never
 * earlier than MIN_MS (so it doesn't flash) and never later than
 * CAP_MS (so a slow network can't hold the site hostage).
 */
const MIN_MS = 1000;
const CAP_MS = 4500;

export default function Preloader({ ready, onLeave }) {
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [minDone, setMinDone] = useState(false);
  const [capDone, setCapDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const a = setTimeout(() => setMinDone(true), MIN_MS);
    const b = setTimeout(() => setCapDone(true), CAP_MS);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduced]);

  const leaving = minDone && (ready || capDone);

  /* The page behind the veil holds its intro until this fires. */
  useEffect(() => {
    if (reduced || leaving) onLeave?.();
  }, [reduced, leaving, onLeave]);

  /* Lock scroll while the veil is up. */
  useEffect(() => {
    if (reduced || gone) return;
    if (!leaving) {
      document.documentElement.classList.add("is-loading");
      return () => document.documentElement.classList.remove("is-loading");
    }
    document.documentElement.classList.remove("is-loading");
    const t = setTimeout(() => setGone(true), 950);
    return () => clearTimeout(t);
  }, [leaving, gone, reduced]);

  if (reduced || gone) return null;

  return (
    <div className={`preloader ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="preloader__inner">
        <p className="preloader__mark">
          JO<span>.</span>
        </p>
        <div className="preloader__bar">
          <span />
        </div>
      </div>
    </div>
  );
}
