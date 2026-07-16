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
          <MaskReveal delay={0.06}>
            <h2>
              The <em>toolkit</em>
            </h2>
          </MaskReveal>
        </div>

        <div>
          {config.skills.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.08} className="skills__group">
              <h3>{group.group}</h3>
              <ul className="skills__list">
                {group.items.map((name) => {
                  const Icon = ICONS[name];
                  return (
                    <li key={name}>
                      <span className="skill-chip">
                        {Icon && <Icon aria-hidden="true" />}
                        {name}
                      </span>
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
