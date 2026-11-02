import React, { useCallback, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero, { Stats } from "./components/Hero.jsx";
import Preloader from "./components/Preloader.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import PullCord from "./components/PullCord.jsx";
import Doors from "./components/Doors.jsx";
import Timeline from "./components/Timeline.jsx";
import Work from "./components/Work.jsx";
import OpenSource from "./components/OpenSource.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import useLenis from "./hooks/useLenis.js";

/* ================================================================== *
 *  CONFIG — everything editable lives here.                          *
 *  House rule for every visible string: no hyphens, no dashes.       *
 * ================================================================== */
export const CONFIG = {
  name: "Joseph Oladele",
  initials: "JO",
  role: "Full Stack Engineer",
  /* The flip calendar in the hero cycles through these. */
  roles: [
    "Full Stack Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer",
    "Problem Solver",
  ],
  tagline: "I build systems that scale, from the pixel to the partition.",
  bio: "I am a software engineering student at Babcock University and a full stack developer. I build real products end to end, from the first frame a person touches to the API and the database underneath it. I ship, I measure, and I do not call anything finished until it holds up in production.",
  email: "josepholadele001@gmail.com",
  photo: "/joseph.jpg",
  formspreeEndpoint: "https://formspree.io/f/xjgdjaaj",

  stats: [
    { value: "3", suffix: "+", label: "Years building" },
    { value: "4", label: "Products live" },
    { value: "35", suffix: "+", label: "Merged pull requests" },
    { value: "24", label: "Open source repos" },
    { value: "Open", label: "For work" },
  ],

  /* The doors. Each one opens onto a room: what I do there, the tools,
     and the projects (matched by name) that were built in it. */
  services: [
    {
      id: "web",
      title: "Web Development",
      short: "Web",
      color: "#2f4f9e",
      intro:
        "Fast, responsive sites and web apps in React, from editorial storefronts to immersive brand experiences that feel as good as they look.",
      points: [
        "Responsive interfaces built in React",
        "Scroll driven motion with GSAP and Framer Motion",
        "Performance and accessibility from the first commit",
        "Deployed and monitored on Vercel",
      ],
      tools: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind", "HTML", "CSS", "Vercel"],
      projects: ["Pleats & Plissé", "TIMMCROODS", "BALIN, Maison de Couture"],
    },
    {
      id: "backend",
      title: "Backend and APIs",
      short: "Backend",
      color: "#5d4a7e",
      intro:
        "The part nobody sees and everybody feels. APIs and services that stay fast and correct once real people start using them.",
      points: [
        "REST APIs in Node, Nest and .NET",
        "Third party integrations like live shipping rates",
        "Clean data models and sensible validation",
        "Built to hold up in production",
      ],
      tools: ["Node.js", "Nest.js", ".NET", "Java", "Python", "Go", "Rust", "PHP", "C#"],
      projects: ["TIMMCROODS", "Pleats & Plissé"],
    },
    {
      id: "apps",
      title: "App Development",
      short: "Apps",
      color: "#4c8a68",
      intro:
        "Mobile and app style interfaces that feel native: quick to load, soft to touch, and respectful of the person using them.",
      points: [
        "Cross platform apps with React Native",
        "Offline friendly, privacy first by design",
        "Small, focused interfaces with real polish",
      ],
      tools: ["React Native", "React", "TypeScript"],
      projects: ["Petal"],
    },
    {
      id: "data",
      title: "Databases and Tools",
      short: "Data",
      color: "#c2562f",
      intro:
        "Where the data lives and how the work gets shipped. Relational databases, version control, API testing, and the languages underneath it all.",
      points: [
        "Relational schema design in PostgreSQL and MySQL",
        "Type safe database access with Prisma",
        "Content models in Sanity that clients edit themselves",
        "Git based workflows and code review",
        "API testing and documentation with Postman",
        "Systems fundamentals in C and C++",
      ],
      tools: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Sanity", "Docker", "Git", "GitHub", "GitHub Actions", "Postman", "C", "C++"],
      projects: ["TIMMCROODS", "Pleats & Plissé"],
    },
  ],

  /* "Let's go back in time": newest first. */
  timeline: [
    {
      year: "2026",
      kind: "Fashion Ecommerce",
      title: "Pleats & Plissé",
      text: "A womenswear storefront from Lagos where every signature moment folds like fabric, from pleated page transitions to a shader ripple on product photos. Content runs on Sanity and payments on Paystack.",
      tags: ["Next.js", "Sanity", "GSAP", "Paystack"],
    },
    {
      year: "2026",
      kind: "Ecommerce Platform",
      title: "TIMMCROODS",
      text: "Lead developer on a full stack storefront for a London fashion label. Cinematic product pages, a live cart, real time shipping rates, and one brand config file that reskins the whole site.",
      tags: ["React", "Express", "GSAP", "Tailwind"],
    },
    {
      year: "2025",
      kind: "Web Experience",
      title: "BALIN, Maison de Couture",
      text: "An immersive digital flagship for a luxury fashion house, with a cinematic video hero, a pinned horizontal lookbook, and layouts that read like a printed magazine.",
      tags: ["React", "Vite", "GSAP", "Lenis"],
    },
    {
      year: "2025",
      kind: "Messaging App",
      title: "Petal",
      text: "A soft, minimal messaging app with no account and no password. Everything you write stays on your own device.",
      tags: ["React", "Vite", "Local Storage"],
    },
    {
      year: "2024",
      kind: "Building the toolkit",
      title: "Sharpening the craft",
      text: "The year of going deep instead of wide. Moved from tutorials to building my own projects in React and Node, learned to design databases in PostgreSQL and MySQL, picked up TypeScript, and got serious about Git, APIs, and shipping work other people could actually use.",
      tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "Git"],
    },
    {
      year: "2023",
      kind: "Where it started",
      title: "Babcock University",
      text: "Started studying software engineering and building for real. Java, C and C++ in class; JavaScript and React after hours, until the side projects became products.",
      tags: ["Java", "C", "C++", "JavaScript"],
    },
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
      name: "Pleats & Plissé",
      category: "Fashion Ecommerce",
      year: "2026",
      description:
        "A storefront for an everyday womenswear label from Lagos, built around one idea: everything folds like fabric. Pleated page transitions, images that unfold as you scroll, a WebGL plissé ripple on product hover, a CMS the owners can edit, and Paystack checkout in naira or dollars.",
      tags: ["Next.js", "Sanity", "GSAP", "Paystack"],
      link: "https://pleats-and-plisse.vercel.app",
      image: "/previews/pleats-and-plisse.png",
    },
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

  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/JosephOladele" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joseph-oladele-00b07b3b1",
    },
  ],
};
/* ================================================================== */

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
      <PullCord />

      <main>
        <Hero config={CONFIG} onRobotReady={onRobotReady} robotReady={robotReady} start={introReady} />
        {/* Phones only: the stats sit between the hero and the doors */}
        <div className="shell stats-strip">
          <Stats stats={CONFIG.stats} className="hero__stats hero__stats--strip" />
        </div>
        <Doors config={CONFIG} />
        <Timeline config={CONFIG} />
        <Work config={CONFIG} />
        <OpenSource config={CONFIG} />
        <Contact config={CONFIG} />
      </main>

      <Footer config={CONFIG} />
    </>
  );
}
