import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { personJsonLd } from "@/lib/data/portfolio";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://anconeyra.github.io");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nyraroot | Full-Stack Developer & Cybersecurity Analyst",
  description: "Portafolio profesional de Nyraroot - Full-Stack Developer & Cybersecurity Analyst",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nyraroot | Full-Stack Developer & Cybersecurity Analyst",
    description: "Portafolio profesional de Nyraroot - Full-Stack Developer & Cybersecurity Analyst",
    type: "profile",
    url: "/",
    siteName: "Nyraroot",
    locale: "es_PE",
    images: [
      {
        url: "https://anconeyra.github.io/img/tu-foto.jpg",
        width: 1200,
        height: 630,
        alt: "Frank Anconeyra - Nyraroot",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Nyraroot | Full-Stack Developer & Cybersecurity Analyst",
    description: "Portafolio profesional de Nyraroot - Full-Stack Developer & Cybersecurity Analyst",
    images: ["https://anconeyra.github.io/img/tu-foto.jpg"],
  },
  icons: {
    icon: "/img/logo.png",
    shortcut: "/img/logo.png",
  },
};

// Inline script to set data-theme before first paint (FOUC prevention)
const foucScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var c=t||(m?'dark':'light');document.documentElement.setAttribute('data-theme',c);}catch(e){try{document.documentElement.setAttribute('data-theme',window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(_){document.documentElement.setAttribute('data-theme','light');}}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${poppins.variable} h-full antialiased`}>
      <head>
        {/* FOUC prevention — sets data-theme before React hydration */}
        <script dangerouslySetInnerHTML={{ __html: foucScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="flex min-h-full flex-col font-[var(--font-poppins)]">{children}</body>
    </html>
  );
}
