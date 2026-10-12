import React, { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Nav from "./components/Nav.jsx";
import RobotHero from "./components/RobotHero.jsx";
import Preloader from "./components/Preloader.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import SplitText from "./components/SplitText.jsx";
import Magnetic from "./components/Magnetic.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Work from "./components/Work.jsx";
import OpenSource from "./components/OpenSource.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Reveal from "./components/Reveal.jsx";
import useLenis from "./hooks/useLenis.js";

/* ================================================================== *
 *  CONFIG — everything editable lives here.                          *
 *  House rule for every visible string: no hyphens, no dashes.       *
 * ================================================================== */
export const CONFIG = {
  name: "Joseph Oladele",
  initials: "JO",
  role: "Full Stack Engineer",
  tagline: "I build systems that scale, from the pixel to the partition.",
  bio: "I am a software engineering student at Babcock University and a full stack developer. I build real products end to end, from the first frame a person touches to the API and the database underneath it. I ship, I measure, and I do not call anything finished until it holds up in production.",
  email: "josepholadele001@gmail.com",
  formspreeEndpoint: "https://formspree.io/f/xjgdjaaj",

  stats: [
    { value: "3", suffix: "+", label: "Years building" },
    { value: "3", label: "Products live" },
    { value: "35", suffix: "+", label: "Merged pull requests" },
    { value: "24", label: "Open source repos" },
    { value: "Open", label: "For work" },
  ],

  skills: [
    {
      group: "Languages",
      items: ["JavaScript", "TypeScript", "Rust", "Python", "Java", "Go", "PHP", "C#", "C", "C++"],
    },
    {
      group: "Frontend",
      items: ["React", "Next.js", "React Native", "Tailwind", "HTML", "CSS"],
    },
    {
      group: "Backend",
      items: ["Node.js", "Nest.js", ".NET", "Prisma"],
    },
    {
      group: "Data and Tools",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Docker", "Git", "GitHub", "GitHub Actions", "Postman", "Vercel"],
    },
  ],

  projects: [
    {
      name: "TIMMCROODS",
      category: "Ecommerce Platform",
      year: "2026",
      description:
        "A full stack editorial storefront for a London fashion label. Cinematic product pages, a live cart, real time shipping rates, and a single brand config file that lets the whole site be reskinned without touching one component.",
      tags: ["React", "Express", "GSAP", "Tailwind"],
      link: "https://timmcroods.com",
      image: "/previews/timmcroods.png",
    },
    {
      name: "BALIN, Maison de Couture",
      category: "Web Experience",
      year: "2025",
      description:
        "An immersive digital flagship for a luxury fashion house. A cinematic video hero, scroll driven reveals, a pinned horizontal lookbook, and editorial layouts that read like a printed magazine.",
      tags: ["React", "Vite", "GSAP", "Lenis"],
      link: "https://balin-two.vercel.app",
      image: "/previews/balin.png",
    },
    {
      name: "Petal",
      category: "Messaging App",
      year: "2025",
      description:
        "A soft, minimal messaging interface with no account and no password. Your name, your avatar, and every message you write stay on your own device and never reach a server.",
      tags: ["React", "Vite", "Local Storage"],
      link: "https://petal-chat-app.vercel.app",
      image: "/previews/petal-chat.png",
    },
  ],

  /* Open source. Names are written without hyphens to keep the house
     rule; the links carry the real repository paths. */
  github: "JosephOladele",
  openSource: {
    achievements: [
      { name: "Pull Shark", tier: "x2", image: "/achievements/pull-shark.png", note: "Merged pull requests" },
      { name: "Pair Extraordinaire", tier: "x2", image: "/achievements/pair-extraordinaire.png", note: "Coauthored merged pull requests" },
      { name: "Quickdraw", tier: "x2", image: "/achievements/quickdraw.png", note: "Closed an issue within five minutes" },
    ],
    contributions: [
      { name: "Soroban Lens", role: "Maintainer", href: "https://github.com/soroban-forge-labs/soroban-lens" },
      { name: "C Address Onboarding Bridge", role: "Frontend", href: "https://github.com/C-Address-Onboarding-Bridge/C-Address-Onboarding-Bridge--Frontend-" },
      { name: "CraftNexus", role: "Contributor", href: "https://github.com/Hub-of-Evolution/CraftNexus" },
      { name: "SkillSphere", role: "Contributor", href: "https://github.com/LightForgeHub/SkillSphere-Dapp" },
      { name: "Callora", role: "Frontend", href: "https://github.com/CalloraOrg/Callora-Frontend" },
      { name: "Disciplr", role: "Backend", href: "https://github.com/Disciplr-Org/Disciplr-backend" },
      { name: "StellarFraction", role: "Frontend", href: "https://github.com/StellarFraction/StellarFraction-frontend" },
    ],
  },

  /* TODO: swap the LinkedIn href for the real profile URL. */
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/JosephOladele" },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};
/* ================================================================== */

function Hero({ onRobotReady, start }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  /* As the hero scrolls away its type sinks and dissolves, a slower
     layer than the page, so the handoff to About reads as depth. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="top" className="hero" ref={ref}>
      <RobotHero onReady={onRobotReady} />
      <div className="hero__veil" />

      <motion.div
        className="hero__content shell"
        style={reduced ? undefined : { y, opacity }}
      >
        <Reveal start={start}>
          <p className="hero__role label">
            {CONFIG.name}
            <span className="hero__roledot" aria-hidden="true" />
            <em>{CONFIG.role}</em>
          </p>
        </Reveal>

        <h1>
          <SplitText start={start} delay={0.25}>
            I build systems that scale, from the <em>pixel</em> to the{" "}
            <em>partition</em>.
          </SplitText>
        </h1>

        <Reveal start={start} delay={0.55} className="hero__foot">
          <Magnetic>
            <a className="hero__cta" href="#work">
              See selected work
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1v10M6 11l4-4M6 11L2 7" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </a>
          </Magnetic>
        </Reveal>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [robotReady, setRobotReady] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const onRobotReady = useCallback(() => setRobotReady(true), []);
  const onPreloaderLeave = useCallback(() => setIntroReady(true), []);
  useLenis();

  return (
    <>
      <Preloader ready={robotReady} onLeave={onPreloaderLeave} />
      <CursorGlow />
      <ScrollProgress />
      <Nav initials={CONFIG.initials} />

      <main>
        <Hero onRobotReady={onRobotReady} start={introReady} />
        <About config={CONFIG} />
        <Skills config={CONFIG} />
        <Work config={CONFIG} />
        <OpenSource config={CONFIG} />
        <Contact config={CONFIG} />
      </main>

      <Footer config={CONFIG} />
    </>
  );
}
