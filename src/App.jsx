import React, { useCallback, useState } from "react";
import Nav from "./components/Nav.jsx";
import RobotHero from "./components/RobotHero.jsx";
import Preloader from "./components/Preloader.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Work from "./components/Work.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Reveal from "./components/Reveal.jsx";

/* ================================================================== *
 *  CONFIG — everything editable lives here.                          *
 * ================================================================== */
export const CONFIG = {
  name: "Joseph Oladele",
  initials: "JO",
  role: "Full Stack Engineer",
  tagline: "I build systems that scale, from the pixel to the partition.",
  bio: "I'm a software engineering student at Babcock University and a full stack developer. I've worked with teams to build real projects end to end, from frontends to APIs to databases, and I care about writing clean code and shipping things that actually work.",
  email: "josepholadele001@gmail.com",
  formspreeEndpoint: "https://formspree.io/f/xjgdjaaj",

  stats: [
    { value: "3", label: "Years coding" },
    { value: "20", suffix: "+", label: "Technologies" },
    { value: "Open", label: "To work" },
  ],

  skills: [
    {
      group: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "PHP", "C#", "C", "C++"],
    },
    {
      group: "Frontend",
      items: ["React", "React Native", "HTML", "CSS"],
    },
    {
      group: "Backend",
      items: ["Node.js", "Nest.js", ".NET"],
    },
    {
      group: "Databases & Tools",
      items: ["PostgreSQL", "MySQL", "GitHub", "Postman", "Vercel"],
    },
  ],

  projects: [
    {
      name: "BALIN, Maison de Couture",
      category: "Web Experience",
      description:
        "An immersive digital flagship for a luxury fashion house, with a cinematic video hero, animated scroll reveals, a pinned horizontal lookbook, and editorial magazine layouts.",
      tags: ["React", "Vite", "GSAP", "Lenis"],
      link: "https://balin-two.vercel.app",
      image: "/previews/balin.png",
    },
    {
      name: "Petal",
      category: "Chat App",
      description:
        "A soft, minimal messaging interface. No account and no password. Your name, avatar, and messages live on your device.",
      tags: ["React", "Vite", "LocalStorage"],
      link: "https://petal-chat-app.vercel.app",
      image: "/previews/petal-chat.png",
    },
    {
      name: "Project Three",
      category: "API / Backend",
      description:
        "A short description of what this project does, who it's for, and the problem it solves. Replace with the real thing.",
      tags: [".NET", "MySQL"],
      link: "#",
    },
  ],

  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/" },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/" },
    { id: "x", label: "X", href: "https://x.com/" },
  ],
};
/* ================================================================== */

function Hero({ onRobotReady }) {
  return (
    <section id="top" className="hero">
      <RobotHero onReady={onRobotReady} />
      <div className="hero__veil" />

      <div className="hero__content shell">
        <Reveal>
          <p className="hero__role label label--accent">{CONFIG.role}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1>
            I build systems that scale, from the <em>pixel</em> to the{" "}
            <em>partition</em>.
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="hero__foot">
          <p className="hero__intro">
            {CONFIG.name}. Full stack, from frontends to APIs to databases,
            with a bias for shipping.
          </p>
          <a className="hero__cta" href="#work">
            See selected work
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v10M6 11l4-4M6 11L2 7" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </Reveal>
      </div>

      <p className="hero__scrollhint" aria-hidden="true">
        Scroll
      </p>
    </section>
  );
}

export default function App() {
  const [robotReady, setRobotReady] = useState(false);
  const onRobotReady = useCallback(() => setRobotReady(true), []);

  return (
    <>
      <Preloader ready={robotReady} />
      <CursorGlow />
      <Nav initials={CONFIG.initials} />

      <main>
        <Hero onRobotReady={onRobotReady} />
        <Marquee config={CONFIG} />
        <About config={CONFIG} />
        <Skills config={CONFIG} />
        <Work config={CONFIG} />
        <Contact config={CONFIG} />
      </main>

      <Footer config={CONFIG} />
    </>
  );
}
