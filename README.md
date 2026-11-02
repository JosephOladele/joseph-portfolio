# Joseph Oladele — Portfolio

A warm, lamp-lit portfolio built with Vite + React and Framer Motion, organised around one idea: **magic happens behind the doors**. Each service is a painted door; tap one and the camera flies through it into a room with the details, tools and projects for that area. A pull cord switches the lights between dark and light mode.

## Run locally

```bash
npm install
npm run dev
```

## Build / deploy

```bash
npm run build   # outputs to dist/
```

Deploy to **Vercel**: import the repo, framework preset "Vite" — no extra config needed (build command `npm run build`, output `dist`).

## Editing content

Everything editable (name, roles, bio, stats, the doors, the timeline, projects, open source, socials, email, Formspree endpoint, photo) lives in the single `CONFIG` object at the top of `src/App.jsx`. Your photo is `public/joseph.jpg`; project previews are in `public/previews/`.

## Structure

```
src/
  App.jsx                  ← CONFIG + page assembly
  index.css                ← design tokens & all styling (light theme under [data-theme="light"])
  lib/theme.js             ← light / dark switch
  components/
    Hero.jsx  FlipRole.jsx ← "Hi, I'm Joseph. I am a" + the flip calendar
    PullCord.jsx           ← the lights switch
    Doors.jsx              ← doors, hover focus, camera flight, rooms
    Timeline.jsx           ← "Let's go back in time"
    Work.jsx  OpenSource.jsx  Contact.jsx  Footer.jsx  Nav.jsx
    RobotHero.jsx          ← Spline robot (falls back quietly if WebGL fails)
vercel.json                ← security headers and caching
```

## Security

`vercel.json` sends a strict Content Security Policy plus the usual hardening headers (no framing, no MIME sniffing, HSTS, locked down permissions). The CSP allows only the outside services the site uses: Google Fonts, Fontshare, Spline, the GitHub API and Formspree. If you add a new outside service, add its origin there.

The small inline script in `index.html` (it applies the saved theme before first paint) is allowed by its sha256 hash. If you change it, regenerate the hash in `vercel.json`.

The contact form has a hidden `_gotcha` field that Formspree uses to drop bot submissions, and length limits on every field.

## Accessibility & performance

- Every animation has a `prefers-reduced-motion` fallback
- Smooth scrolling (Lenis) is desktop only; touch devices keep native scrolling
- The door rooms are real dialogs: focus moves in, Escape leaves
- Checked for horizontal overflow from 320px to 1920px wide

## Project context (handoff notes, 2 Nov 2026)

For picking this up in a new session.

**Where things stand**
- Live: https://joseph-portfolio-nu.vercel.app (Vercel auto-deploys every push to `main`)
- Repo: `JosephOladele/joseph-portfolio`. Push and open PRs as the **JosephOladele** account. No Claude attribution in commits or PRs.
- Redesign shipped in PR #1 (`0af061f`). The design is based on a reel by @rishithakor.creates (`~/Downloads/portfolioidea.MP4`): flip-calendar hero, pull-cord light switch, "behind the doors" services, "back in time" timeline, and the "Let's build it together" contact section.
- Section order and numbers: Hero, Doors 01, Story 02, Work 03, Open Source 04, Contact 05.
- Contact form: Formspree `https://formspree.io/f/xjgdjaaj` (confirmed working).

**Still to do**
- The 2024 ("Sharpening the craft") and 2023 (Babcock, "Where it started") timeline entries in `CONFIG.timeline` are placeholder copy. Replace them with real details.
- The Pleats & Plissé preview (`public/previews/pleats-and-plisse.png`) still shows the placeholder "H01 · HERO · 16:9" image. Take a new screenshot once the real photos are on that site.
- The contact photo (`public/joseph.jpg`, from `profilepic3.HEIC`, 720×960) shows the subject quite small. It could use a tighter crop or a bigger arch.
- `npm audit` reports one remaining issue in the esbuild/Vite dev server. It only affects `npm run dev` and needs a major Vite upgrade.

**Gotchas**
- The robot tint is a separate `.hero__tint` element. Putting a filter on a WebGL parent blanks the canvas, and the stage's mask stops blending. On phones the tint is `.hero__stage::after` instead.
- Door camera timings are constants at the top of `Doors.jsx`: SWING, DOLLY, SETTLE, ROOM_OUT and PULL_BACK. The zoom multiplier is ×1.6.
- `MaskReveal` uses `useInView` on its outer mask. Watching the inner element meant titles never animated in.
- Lenis is exposed as `window.__lenis`. Doors stop and restart it when a room opens and closes, and native `scroll-behavior` is turned off while Lenis runs.
- The theme is stored in localStorage under `jo-theme` (`src/lib/theme.js`). The inline script in `index.html` applies it before first paint. If you edit that script, update its CSP hash in `vercel.json`.
- Horizontal overflow is prevented by `overflow-x: clip` on `body` and `.doors`. Check it from 320 to 1920px after any layout change.
