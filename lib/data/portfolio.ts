// Typed content source — single source of truth extracted from js/main.js DATA + index.html (ES preserved)
// Stats preserved: 14 repositories / 15 certifications / 5 domains

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface SkillCard {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Project {
  name: string;
  icon: string;
  tech: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
}

export interface CertItem {
  name: string;
  org: string;
  year: string;
}

export interface CertificationCategory {
  category: string;
  count: number;
  items: CertItem[];
}

export interface Stat {
  value: number;
  label: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

export interface HeroData {
  badge: string;
  greeting: string;
  name: string;
  subtitle: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface AboutData {
  title: string;
  name: string;
  role: string;
  cvHref: string;
  paragraphs: string[];
}

export interface TechGroup {
  icon: string;
  title: string;
  items: string[];
}

export interface ContactData {
  title: string;
  heading: string;
  description: string;
  email: string;
  location: string;
  phoneDisplay: string;
  whatsappNumber: string;
}

// ---------------------------------------------------------------------------
// Raw DATA from js/main.js — typed
// ---------------------------------------------------------------------------

export const skills: SkillCategory[] = [
  { name: "Frontend", items: ["React", "Vue", "Svelte", "TypeScript", "HTML/CSS"] },
  { name: "Backend", items: ["Node.js", "Spring Boot", "Python", "Java", "C#"] },
  { name: "Mobile", items: ["Flutter", "Kotlin", "Dart"] },
  { name: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Serverless"] },
  { name: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "NoSQL"] },
  { name: "Cybersecurity", items: ["Wireshark", "OWASP", "Kali Linux", "Metasploit", "Snyk"] },
];

// Display cards for Skills section (ES descriptions preserved from index.html)
export const skillCards: SkillCard[] = [
  {
    icon: "fa-laptop-code",
    title: "Frontend",
    description: "Desarrollo de interfaces web modernas y responsivas",
    tags: ["React", "Vue", "Svelte", "TypeScript", "HTML/CSS"],
  },
  {
    icon: "fa-server",
    title: "Backend",
    description: "Construcción de APIs y lógica de servidor robusta",
    tags: ["Node.js", "Spring Boot", "Python", "Java", "C#"],
  },
  {
    icon: "fa-mobile-alt",
    title: "Móvil",
    description: "Desarrollo de aplicaciones nativas y multiplataforma",
    tags: ["Flutter", "Kotlin", "Dart"],
  },
  {
    icon: "fa-cloud",
    title: "Cloud & DevOps",
    description: "Infraestructura en la nube y automatización",
    tags: ["AWS", "Docker", "Kubernetes", "Serverless"],
  },
  {
    icon: "fa-database",
    title: "Bases de Datos",
    description: "Gestión de datos SQL y NoSQL",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "NoSQL"],
  },
  {
    icon: "fa-shield-alt",
    title: "Cybersecurity",
    description: "Seguridad ofensiva y defensiva",
    tags: ["Wireshark", "OWASP", "Kali Linux", "Metasploit", "Snyk"],
  },
];

export const projects: Project[] = [
  {
    name: "Greenfil",
    icon: "🌿",
    tech: "Flutter + C# + .NET",
    description:
      "Sistema de gestión frontend y backend para control de procesos. Tecnologías modernas y arquitectura escalable.",
    tags: ["Flutter", "C#", ".NET", "Backend"],
    links: [
      { label: "Frontend", href: "https://github.com/Anconeyra/Flutter-grenfil" },
      { label: "Backend", href: "https://github.com/Anconeyra/C-backend-greenfi" },
    ],
  },
  {
    name: "MOSS",
    icon: "🧠",
    tech: "Python + Data Analysis + ML",
    description: "Proyecto desarrollado en Python para análisis y procesamiento de datos con técnicas avanzadas.",
    tags: ["Python", "Data Analysis", "ML"],
    links: [{ label: "Ver Código", href: "https://github.com/Anconeyra/MOSS" }],
  },
  {
    name: "Sistema de Evaluación",
    icon: "📋",
    tech: "JavaScript + Python",
    description:
      "Plataforma completa para gestión y evaluación con frontend en JavaScript y backend en Python.",
    tags: ["JavaScript", "Python", "Full-Stack"],
    links: [
      { label: "Frontend", href: "https://github.com/Anconeyra/Fronted-M.Evaluacion" },
      { label: "Backend", href: "https://github.com/Anconeyra/Backend-M.Evaluacion" },
    ],
  },
  {
    name: "LiteConta-SUNAT",
    icon: "🧮",
    tech: "PHP + Blade",
    description:
      "Sistema contable que minimiza la carga cognitiva del empresario mediante un flujo de trabajo simple. Integración con SUNAT.",
    tags: ["Blade", "PHP", "Contabilidad", "SUNAT"],
    links: [{ label: "Ver Código", href: "https://github.com/Anconeyra/LiteConta-SUNAT" }],
  },
  {
    name: "CRM Django",
    icon: "👥",
    tech: "Python + Django",
    description: "Sistema de gestión de relaciones con clientes desarrollado con Django y Python.",
    tags: ["Python", "Django", "CRM"],
    links: [{ label: "Ver Código", href: "https://github.com/Anconeyra/Crm-Django" }],
  },
  {
    name: "Gestión de Inventarios",
    icon: "📦",
    tech: "HTML + CSS + JS",
    description: "Sistema para control y gestión de inventarios con interfaz web moderna.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Ver Código", href: "https://github.com/Anconeyra/Gesti-n-de-Inventarios" }],
  },
];

export const certifications: CertificationCategory[] = [
  {
    category: "Cybersecurity",
    count: 5,
    items: [
      { name: "Junior Cybersecurity Analyst Career Path", org: "Cisco", year: "2025" },
      { name: "Endpoint Security", org: "Cisco", year: "2025" },
      { name: "Network Defense", org: "Cisco", year: "2025" },
      { name: "Introduction to Cybersecurity", org: "Cisco", year: "2025" },
      { name: "Lifelong Learning 2025 & 2026", org: "Certiprof", year: "2025-2026" },
    ],
  },
  {
    category: "Cloud - AWS",
    count: 3,
    items: [
      { name: "Getting Started with Databases", org: "AWS", year: "2025" },
      { name: "Getting Started with Serverless", org: "AWS", year: "2025" },
      { name: "Introduction to Cloud 101", org: "AWS", year: "2025" },
    ],
  },
  {
    category: "Networking",
    count: 2,
    items: [
      { name: "Networking Basics", org: "Cisco", year: "2025" },
      { name: "Networking Devices and Initial Configuration", org: "Cisco", year: "2025" },
    ],
  },
  {
    category: "Python",
    count: 2,
    items: [
      { name: "Python Essentials 1", org: "Cisco", year: "2025" },
      { name: "Python Essentials 2", org: "Cisco", year: "2025" },
    ],
  },
  {
    category: "Enterprise",
    count: 1,
    items: [{ name: "Discovering SAP SuccessFactors HCM Solutions", org: "SAP", year: "2025" }],
  },
];

export const stats: Stat[] = [
  { value: 14, label: "Repositorios" },
  { value: 15, label: "Certificaciones" },
  { value: 5, label: "Dominios" },
];

export const navLinks: NavLink[] = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#certificaciones", label: "Certificaciones" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/Anconeyra", label: "GitHub", icon: "fa-github" },
  { href: "https://linkedin.com/in/frank-anconeyra", label: "LinkedIn", icon: "fa-linkedin" },
  { href: "mailto:anconeyrafsuyo@gmail.com", label: "Email", icon: "fa-envelope" },
];

export const heroData: HeroData = {
  badge: "Disponible para oportunidades",
  greeting: "¡Hola! Soy",
  name: "Frank Anconeyra",
  subtitle: "Software Engineer | Cybersecurity Analyst",
  description: "Bachiller de TECSUP que construye sistemas resilientes e inteligentes que conectan personas, dispositivos y datos de forma segura y escalable.",
  ctaPrimary: { label: "Ver Proyectos", href: "#proyectos" },
  ctaSecondary: { label: "Contactar", href: "#contacto" },
};

export const aboutData: AboutData = {
  title: "Sobre Mí",
  name: "Frank Anconeyra",
  role: "Software Engineer | Cybersecurity Analyst · Bachiller TECSUP",
  cvHref: "https://drive.google.com/file/d/1ymySfictqgYqEMlSGUziEUyjWUrGOwuK/view?usp=drive_link",
  paragraphs: [
    "Soy Software Engineer y analista de ciberseguridad, bachiller de TECSUP, con experiencia en la creación de aplicaciones web, móviles y sistemas seguros. Me especializo en transformar ideas complejas en soluciones digitales intuitivas, eficientes y protegidas.",
    "Mi enfoque combina creatividad técnica, metodologías ágiles y mejores prácticas de seguridad para entregar productos de alta calidad que superan las expectativas del usuario y resisten amenazas modernas.",
  ],
};

export const techGroups: TechGroup[] = [
  { icon: "fa-laptop-code", title: "Frontend", items: ["React", "Vue", "Svelte", "TypeScript"] },
  { icon: "fa-server", title: "Backend", items: ["Node.js", "Spring", "Python", "Java"] },
  { icon: "fa-mobile-alt", title: "Móvil", items: ["Flutter", "Kotlin", "Dart"] },
  { icon: "fa-cloud", title: "Cloud & DevOps", items: ["AWS", "Docker", "K8s"] },
];

export const contactData: ContactData = {
  title: "Contacto",
  heading: "¿Trabajamos juntos?",
  description: "Estoy disponible para proyectos freelance y oportunidades laborales. ¡Contáctame!",
  email: "anconeyrafsuyo@gmail.com",
  location: "Arequipa, Perú",
  phoneDisplay: "+51 917 394 464",
  whatsappNumber: "+51917394464",
};

export const siteMetadata = {
  title: "Nyraroot | Full-Stack Developer & Cybersecurity Analyst",
  description: "Portafolio profesional de Nyraroot - Full-Stack Developer & Cybersecurity Analyst",
  siteName: "Nyraroot",
  locale: "es_PE" as const,
  canonicalPath: "/" as const,
  ogImage: "https://anconeyra.github.io/img/tu-foto.jpg",
  favicon: "/img/logo.png",
} as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Frank Anconeyra",
  alternateName: "Nyraroot",
  jobTitle: "Full-Stack Developer & Cybersecurity Analyst",
  url: "https://anconeyra.github.io/",
  image: "https://anconeyra.github.io/img/tu-foto.jpg",
  email: "mailto:anconeyrafsuyo@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arequipa",
    addressCountry: "PE",
  },
  sameAs: ["https://github.com/Anconeyra", "https://linkedin.com/in/frank-anconeyra"],
  knowsAbout: ["Full-Stack Development", "Cybersecurity", "Cloud Computing", "DevOps"],
} as const;
