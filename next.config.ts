import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // === HSTS ===
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // === CLICKJACKING ===
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // === MIME SNIFFING ===
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // === REFERRER ===
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // === DNS PREFETCH ===
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // === CSP (Content Security Policy) ===
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js inline scripts + FOUC prevention
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Google Fonts
              "font-src 'self' https://fonts.gstatic.com", // Google Fonts files
              "img-src 'self' data: blob: https:", // Images from any HTTPS source
              "connect-src 'self' https://vitals.vercel-insights.com", // Vercel Analytics if used
              "frame-ancestors 'none'", // Prevent all framing (reinforces X-Frame-Options)
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          // === XSS PROTECTION (legacy browsers) ===
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // === PERMISSIONS POLICY ===
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
          },
          // === CROSS-DOMAIN POLICIES ===
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          // === ORIGIN ISOLATION ===
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
