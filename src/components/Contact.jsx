import React, { useState } from "react";
import Reveal from "./Reveal.jsx";
import MaskReveal from "./MaskReveal.jsx";
import Magnetic from "./Magnetic.jsx";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

export default function Contact({ config }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const res = await fetch(config.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="shell">
        <span className="sec-num" aria-hidden="true">
          05
        </span>
        <div className="sec-head">
          <Reveal as="span" className="label">
            Contact
          </Reveal>
          <MaskReveal className="sec-head__title" delay={0.06}>
            <h2>
              Got a project? <em>Let&rsquo;s build it together.</em>
            </h2>
          </MaskReveal>
        </div>

        <div className="contact__grid">
          <Reveal>
            {/* The last door on the site is the one I'm standing at. */}
            <figure className="contact__me">
              <div className="contact__photo">
                <span className="contact__frame">
                <img
                  src={config.photo}
                  alt={`${config.name}, in an all white outfit, sitting on a park bench`}
                  width="1000"
                  height="1333"
                  loading="lazy"
                />
                </span>
              </div>
              <figcaption>
                <strong>{config.name}</strong>
                <span>{config.role}</span>
                <span className="contact__status">
                  <i aria-hidden="true" />
                  Available for work
                </span>
              </figcaption>
            </figure>

            <p className="contact__lede">
              Have a product to build, a role to fill, or an idea worth
              testing? <em>Write to me.</em>
            </p>
            <a className="contact__email" href={`mailto:${config.email}`}>
              {config.email}
            </a>
            <ul className="contact__socials">
              {config.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.id];
                return (
                  <li key={s.id}>
                    <Magnetic strength={0.45}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                      >
                        {Icon && <Icon aria-hidden="true" />}
                      </a>
                    </Magnetic>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            {status === "success" ? (
              <div className="form__success" role="status">
                <h3>Message sent.</h3>
                <p>
                  Your note is on its way to my inbox. I read every one of them
                  and I will come back to you shortly.
                </p>
                <button className="form__again" onClick={() => setStatus("idle")}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit} noValidate={false}>
                {/* Spam trap: hidden from people, filled in by bots. Formspree
                    drops any submission where it has a value. */}
                <input
                  type="text"
                  name="_gotcha"
                  className="form__trap"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="field">
                  <label htmlFor="cf-name">Name</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    maxLength={5000}
                    placeholder="What are we building?"
                    required
                  />
                </div>

                {status === "error" && (
                  <p className="form__error" role="alert">
                    That message did not go through. Try once more, or email me
                    directly at {config.email}.
                  </p>
                )}

                <Magnetic strength={0.18}>
                  <button
                    className="form__submit"
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                </Magnetic>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
