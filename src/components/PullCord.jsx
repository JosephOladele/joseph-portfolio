import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { getTheme, setTheme } from "../lib/theme.js";

/*
 * A lamp pull cord hanging from the top of the screen. Click it, or
 * drag it down and let go, and the lights switch. It springs back
 * up either way.
 */
export default function PullCord() {
  const [theme, setLocal] = useState("dark");
  const controls = useAnimationControls();
  const dragged = useRef(false);

  useEffect(() => setLocal(getTheme()), []);

  const toggle = () => {
    const next = getTheme() === "light" ? "dark" : "light";
    setTheme(next);
    setLocal(next);
  };

  const tug = async () => {
    toggle();
    await controls.start({ y: 26, transition: { duration: 0.14, ease: "easeOut" } });
    controls.start({ y: 0, transition: { type: "spring", stiffness: 420, damping: 9 } });
  };

  return (
    <div className="cord" aria-live="polite">
      <motion.button
        type="button"
        className="cord__pull"
        aria-label={theme === "light" ? "Turn the lights off" : "Turn the lights on"}
        aria-pressed={theme === "light"}
        animate={controls}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        dragSnapToOrigin
        onDragStart={() => (dragged.current = true)}
        onDragEnd={(_, info) => {
          if (info.offset.y > 34) toggle();
          setTimeout(() => (dragged.current = false), 0);
        }}
        onClick={() => {
          if (!dragged.current) tug();
        }}
      >
        <span className="cord__line" />
        <span className="cord__knob" />
      </motion.button>
      <span className="cord__hint" aria-hidden="true">
        {theme === "light" ? "Lights off" : "Lights on"}
      </span>
    </div>
  );
}
