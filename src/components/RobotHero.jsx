import React, { Suspense, lazy, useEffect, useMemo } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

/*
 * Whobee — the interactive robot from 21st.dev
 * (aghasisahakyan1/interactive-3d-robot). Head and eye tracking are
 * baked into the Spline scene: the robot watches the cursor / touch
 * point wherever it moves over the canvas.
 */
const SCENE = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function RobotHero({ onReady }) {
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  /* Reduced motion: no 3D scene at all — release the preloader at once. */
  useEffect(() => {
    if (reduced) onReady?.();
  }, [reduced, onReady]);

  if (reduced) {
    return <div className="hero__robot hero__robot--static" aria-hidden="true" />;
  }

  return (
    <div className="hero__robot" aria-hidden="true">
      <Suspense fallback={null}>
        <Spline scene={SCENE} onLoad={onReady} />
      </Suspense>
    </div>
  );
}
