import React, { useState } from "react";
import Reveal from "./Reveal.jsx";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
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
          04
        </span>
        <Reveal className="sec-head">
          <span className="label">Contact</span>
          <h2>
            Let&rsquo;s build <em>something</em>
          </h2>
        </Reveal>

        <div className="contact__grid">
          <Reveal>
            <p className="contact__lede">
              Have a project, a role, or just an idea worth talking about?{" "}
              <em>Write to me.</em>
            </p>
            <a className="contact__email" href={`mailto:${config.email}`}>
              {config.email}
            </a>
            <ul className="contact__socials">
              {config.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.id];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                    >
                      {Icon && <Icon aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            {status === "success" ? (
              <div className="form__success" role="status">
                <h3>Thank you. Message sent.</h3>
                <p>
                  Your note is on its way to my inbox. I read everything and
                  I&rsquo;ll get back to you soon.
                </p>
                <button className="form__again" onClick={() => setStatus("idle")}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit} noValidate={false}>
                <div className="field">
                  <label htmlFor="cf-name">Name</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    autoComplete="name"
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
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    placeholder="What are we building?"
                    required
                  />
                </div>

                {status === "error" && (
                  <p className="form__error" role="alert">
                    Something went wrong sending your message. Try again, or
                    email me directly at {config.email}.
                  </p>
                )}

                <button
                  className="form__submit"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
