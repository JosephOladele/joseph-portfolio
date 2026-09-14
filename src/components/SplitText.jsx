import React, { Children, Fragment, isValidElement, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * Word by word headline reveal. Each word rides up from behind its own
 * clipping mask, so the line assembles itself rather than simply fading.
 * Accepts plain strings and <em> spans, and keeps trailing punctuation
 * welded to the word it belongs to. Flat for reduced motion.
 */

const RISE = {
  hidden: { y: "108%" },
  show: { y: "0%" },
};

/* Flatten the children into words, where a word is a list of runs that
   remember whether they came from an <em>. */
function toWords(children) {
  const runs = [];

  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      runs.push({ text: String(child), em: false });
    } else if (isValidElement(child)) {
      runs.push({
        text: Children.toArray(child.props.children).join(""),
        em: true,
      });
    }
  });

  const words = [];
  let current = [];
  const flush = () => {
    if (current.length) {
      words.push(current);
      current = [];
    }
  };

  runs.forEach(({ text, em }) => {
    text.split(/(\s+)/).forEach((part) => {
      if (part === "") return;
      if (/^\s+$/.test(part)) flush();
      else current.push({ text: part, em });
    });
  });
  flush();

  return words;
}

export default function SplitText({
  children,
  delay = 0,
  stagger = 0.045,
  start = true,
}) {
  const reduced = useReducedMotion();
  const words = useMemo(() => toWords(children), [children]);

  if (reduced) return <>{children}</>;

  return (
    <motion.span
      className="split"
      initial="hidden"
      animate={start ? "show" : "hidden"}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
    >
      {words.map((runs, i) => (
        /* The literal space after each mask is what separates the words,
           for the reader and for anything parsing the text. */
        <Fragment key={i}>
          <span className="split__word">
            <motion.span
              className="split__inner"
              variants={RISE}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              {runs.map((run, j) =>
                run.em ? (
                  <em key={j}>{run.text}</em>
                ) : (
                  <Fragment key={j}>{run.text}</Fragment>
                )
              )}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </motion.span>
  );
}
