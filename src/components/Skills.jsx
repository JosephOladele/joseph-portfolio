import React from "react";
import Reveal from "./Reveal.jsx";
import MaskReveal from "./MaskReveal.jsx";
import {
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiC,
  SiCplusplus,
  SiReact,
  SiHtml5,
  SiNodedotjs,
  SiNestjs,
  SiDotnet,
  SiPostgresql,
  SiMysql,
  SiGithub,
  SiPostman,
  SiVercel,
} from "react-icons/si";
import { FaJava, FaCss3Alt } from "react-icons/fa";
import { TbBrandCSharp, TbBrandReactNative } from "react-icons/tb";

const ICONS = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Java: FaJava,
  PHP: SiPhp,
  "C#": TbBrandCSharp,
  C: SiC,
  "C++": SiCplusplus,
  React: SiReact,
  "React Native": TbBrandReactNative,
  HTML: SiHtml5,
  CSS: FaCss3Alt,
  "Node.js": SiNodedotjs,
  "Nest.js": SiNestjs,
  ".NET": SiDotnet,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  GitHub: SiGithub,
  Postman: SiPostman,
  Vercel: SiVercel,
};

/* An index, not a badge wall: each group is one ruled row and the tools
   are set as type, so the section reads at the same weight as the rest
   of the page. */
export default function Skills({ config }) {
  return (
    <section id="skills" className="section-pad">
      <div className="shell">
        <span className="sec-num" aria-hidden="true">
          02
        </span>
        <div className="sec-head">
          <Reveal as="span" className="label">
            Skills
          </Reveal>
          <MaskReveal className="sec-head__title" delay={0.06}>
            <h2>
              The <em>toolkit</em>
            </h2>
          </MaskReveal>
        </div>

        <div className="skills">
          {config.skills.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.07} className="skills__group">
              <h3>
                <span className="skills__num" aria-hidden="true">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                {group.group}
              </h3>
              <ul className="skills__list">
                {group.items.map((name) => {
                  const Icon = ICONS[name];
                  return (
                    <li key={name}>
                      {Icon && <Icon aria-hidden="true" />}
                      {name}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
