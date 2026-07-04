import React from "react";

/*
 * The band that stitches the hero to About: role + toolkit scrolling
 * on a hairline track. Row is duplicated so the loop is seamless;
 * the animation is a single GPU transform and pauses under
 * prefers-reduced-motion (see CSS).
 */
export default function Marquee({ config }) {
  const items = [
    config.role,
    ...config.skills.flatMap((g) => g.items),
  ];

  const row = (key) => (
    <div className="marquee__row" key={key}>
      {items.map((it) => (
        <span key={`${key}-${it}`}>
          {it}
          <i aria-hidden="true">✦</i>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{[row(0), row(1)]}</div>
    </div>
  );
}
