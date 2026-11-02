import React, { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import MaskReveal from "./MaskReveal.jsx";

/* Repo paths carry hyphens; the house rule keeps them out of visible text. */
const readable = (name) => name.split("/").pop().replace(/[-_]+/g, " ").trim();

function ago(iso) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? "A month ago" : `${months} months ago`;
}

/*
 * Recent public pull requests and releases, read live from GitHub.
 * Unauthenticated, so it shares a small hourly limit per visitor; on any
 * failure the list simply does not render, and the section still stands.
 */
function useActivity(user) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${user}/events/public?per_page=100`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((events) => {
        const out = [];
        for (const e of events) {
          const p = e.payload ?? {};
          const n = p.number ?? p.pull_request?.number;
          const base = `https://github.com/${e.repo.name}`;
          let item = null;
          if (e.type === "PullRequestEvent" && (p.action === "merged" || p.pull_request?.merged)) {
            item = { verb: "Merged", what: `pull request ${n}`, href: `${base}/pull/${n}` };
          } else if (e.type === "PullRequestEvent" && p.action === "opened") {
            item = { verb: "Opened", what: `pull request ${n}`, href: `${base}/pull/${n}` };
          } else if (e.type === "ReleaseEvent" && p.action === "published") {
            item = { verb: "Released", what: p.release.tag_name, href: `${base}/releases` };
          }
          if (!item || out.some((o) => o.href === item.href && o.verb === item.verb)) continue;
          out.push({ ...item, repo: readable(e.repo.name), when: ago(e.created_at), id: e.id });
          if (out.length === 5) break;
        }
        setItems(out);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [user]);
  return items;
}

export default function OpenSource({ config }) {
  const { achievements, contributions } = config.openSource;
  const activity = useActivity(config.github);

  return (
    <section id="opensource" className="section-pad">
      <div className="shell">
        <span className="sec-num" aria-hidden="true">
          04
        </span>
        <div className="sec-head">
          <Reveal as="span" className="label">
            Open source
          </Reveal>
          <MaskReveal className="sec-head__title" delay={0.06}>
            <h2>
              Work in the <em>open</em>
            </h2>
          </MaskReveal>
        </div>

        <div className="oss__badges">
          {achievements.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.07} className="oss__badge">
              <a
                href={`https://github.com/${config.github}?tab=achievements`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={a.image} alt="" width="96" height="96" loading="lazy" />
                <span className="oss__badgename">
                  {a.name} <sup>{a.tier}</sup>
                </span>
                <span className="oss__badgenote">{a.note}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="skills oss__index">
          <Reveal className="skills__group">
            <h3>
              <span className="skills__num" aria-hidden="true">01</span>
              Contributed to
            </h3>
            <ul className="skills__list">
              {contributions.map((c) => (
                <li key={c.name}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="oss__repo">
                    {c.name}
                    <span className="oss__role">{c.role}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {activity.length > 0 && (
            <Reveal className="skills__group" delay={0.07}>
              <h3>
                <span className="skills__num" aria-hidden="true">02</span>
                Lately
              </h3>
              <ol className="oss__feed">
                {activity.map((item) => (
                  <li key={item.id}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      <span className="oss__verb">{item.verb}</span> {item.what} in{" "}
                      <strong>{item.repo}</strong>
                    </a>
                    <span className="oss__when">{item.when}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
