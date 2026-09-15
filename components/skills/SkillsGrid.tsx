import { skillCards } from "@/lib/data/portfolio";
import GsapReveal from "@/components/ui/GsapReveal";
import type { IconType } from "react-icons";
import { FaAws, FaDatabase, FaDocker, FaHtml5, FaJava, FaNodeJs, FaPython, FaReact, FaVuejs } from "react-icons/fa";
import {
  SiDart,
  SiFlutter,
  SiKalilinux,
  SiKotlin,
  SiKubernetes,
  SiMetasploit,
  SiMongodb,
  SiMysql,
  SiOwasp,
  SiPostgresql,
  SiServerless,
  SiSnyk,
  SiSpringboot,
  SiSvelte,
  SiTypescript,
  SiWireshark,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const TAG_ICONS: Record<string, IconType> = {
  React: FaReact,
  Vue: FaVuejs,
  Svelte: SiSvelte,
  TypeScript: SiTypescript,
  "HTML/CSS": FaHtml5,
  "Node.js": FaNodeJs,
  "Spring Boot": SiSpringboot,
  Python: FaPython,
  Java: FaJava,
  "C#": TbBrandCSharp,
  Flutter: SiFlutter,
  Kotlin: SiKotlin,
  Dart: SiDart,
  AWS: FaAws,
  Docker: FaDocker,
  Kubernetes: SiKubernetes,
  Serverless: SiServerless,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  NoSQL: FaDatabase,
  Wireshark: SiWireshark,
  OWASP: SiOwasp,
  "Kali Linux": SiKalilinux,
  Metasploit: SiMetasploit,
  Snyk: SiSnyk,
};

function CardIcon({ index }: { index: number }) {
  const cls = "h-10 w-10";
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  if (index === 0) {
    return (
      <svg className={cls} {...common}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 9l-2 2 2 2m4-4l2 2-2 2M2 20h20" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className={cls} {...common}>
        <rect x="3" y="4" width="18" height="7" rx="2" />
        <rect x="3" y="13" width="18" height="7" rx="2" />
        <path strokeLinecap="round" d="M7 7.5h.01M7 16.5h.01" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg className={cls} {...common}>
        <rect x="7" y="2" width="10" height="20" rx="2.5" />
        <path strokeLinecap="round" d="M11 18.5h2" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg className={cls} {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      </svg>
    );
  }
  if (index === 4) {
    return (
      <svg className={cls} {...common}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    );
  }
  return (
    <svg className={cls} {...common}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

export default function SkillsGrid() {
  return (
    <section id="habilidades" className="bg-[var(--bg-secondary)] px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20" aria-labelledby="habilidades-heading">
      <div className="mx-auto max-w-7xl">
        <GsapReveal variant="blur" className="block w-full">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 id="habilidades-heading" className="w-full text-center text-4xl font-extrabold tracking-tight text-balance text-[var(--text-primary)] sm:text-5xl">
              Habilidades
            </h2>
            <p className="mt-4 w-full text-center leading-relaxed text-balance text-[var(--text-secondary)]">
              Mi stack y las herramientas que uso cada día.
            </p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--primary-color)] to-sky-500" aria-hidden="true" />
          </div>
        </GsapReveal>

        <div className="skills-grid mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {skillCards.map((card, ci) => (
            <GsapReveal key={card.title} variant="zoom" delay={(ci % 3) * 0.12} className="h-full">
            <article
              className="skill-card group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] px-6 pt-10 pb-10 text-center shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/15"
            >
              <span
                className="absolute top-0 h-1 w-16 rounded-b-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-300 group-hover:w-28 group-hover:from-indigo-500 group-hover:via-sky-500 group-hover:to-emerald-500"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="skill-icon flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6">
                <CardIcon index={ci} />
              </div>
              <h3 className="mt-6 text-xl font-extrabold tracking-tight text-[var(--text-primary)]">{card.title}</h3>
              <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">{card.description}</p>
              <div className="skill-tags mt-7 flex flex-wrap justify-center gap-2.5 pb-1">
                {card.tags.map((tag) => {
                  const TagIcon = TAG_ICONS[tag];
                  return (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-tertiary)] px-4 py-2 text-[13px] font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-color)]/10 hover:text-[var(--primary-color)]"
                    >
                      {TagIcon && <TagIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                      {tag}
                    </span>
                  );
                })}
              </div>
            </article>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
