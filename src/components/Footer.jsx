import React from "react";
import Magnetic from "./Magnetic.jsx";

export default function Footer({ config }) {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p>
          {config.name} <span>&copy;</span> {new Date().getFullYear()}
        </p>
        <p>Designed &amp; built from the pixel to the partition.</p>
        <Magnetic>
          <a className="footer__top" href="#top">
            Back to top
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 11V1M6 1L2 5M6 1l4 4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
