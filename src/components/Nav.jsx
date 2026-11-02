import React, { useEffect, useState } from "react";

const LINKS = [
  { href: "#doors", label: "What I do" },
  { href: "#story", label: "Story" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ initials }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  /* The bar steps aside while you read downward and returns the moment
     you scroll back up. It never hides near the top of the page. */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 160) {
        setHidden(false);
      } else if (y > lastY + 6) {
        setHidden(true);
      } else if (y < lastY - 6) {
        setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel when a link is chosen or on resize-up
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header
        className={`nav ${scrolled ? "is-scrolled" : ""} ${
          hidden && !open ? "is-hidden" : ""
        }`}
      >
        <div className="shell nav__inner">
          <a href="#top" className="nav__mark" aria-label="Back to top">
            {initials}
            <span>.</span>
          </a>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`nav__mobile ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
