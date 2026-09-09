# UI Interactions Specification

## Purpose
Client-side interactions for theme, canvas, cursor, terminal, carousel, and scroll UX. All islands MUST be `use client`, respect `prefers-reduced-motion`/`pointer:coarse`, and clean up listeners on unmount.

## Requirements

### Requirement: Theme Toggle — No FOUC

The system MUST apply `data-theme` before hydration via an inline script in `app/layout.tsx` (`beforeInteractive` or `dangerouslySetInnerHTML`) reading `localStorage.theme` then `prefers-color-scheme`. Toggle MUST persist to `localStorage` and listen to `matchMedia`. Rendering SHALL guard with a mounted flag and `suppressHydrationWarning`.

#### Scenario: 1 — No flash on reload
- GIVEN `localStorage.theme=dark`
- WHEN the page loads
- THEN `document.documentElement.dataset.theme` is `dark` before first paint

#### Scenario: 2 — Toggle and persist
- GIVEN the user clicks `#theme-toggle`
- WHEN the handler fires
- THEN theme flips, `localStorage.theme` updates, and UI reflects the new theme

#### Scenario: 3 — System preference fallback
- GIVEN no stored theme and `prefers-color-scheme: dark`
- WHEN the script runs
- THEN dark theme applies

### Requirement: Particles Canvas

`ParticlesCanvas` MUST render DPR-aware `<canvas>` with `particleCount ≈ width*height/9000`, rAF loop, repulsion 150px, grid connections, debounced resize/ResizeObserver, and cleanup. It SHOULD suspend when hero is off-screen or `prefers-reduced-motion` is set.

#### Scenario: 4 — DPR scaling
- GIVEN `devicePixelRatio=2` on 1920×1080
- WHEN canvas mounts
- THEN backing store is scaled and ~80–150 particles render

#### Scenario: 5 — Reduced-motion guard
- GIVEN `prefers-reduced-motion: reduce`
- WHEN the page loads
- THEN the canvas does not animate (static or hidden)

### Requirement: Custom Cursor

`CustomCursor` MUST provide `#cursor` + follower smoothed via rAF (`pos += (mouse-pos)/9`), expand on hover targets, and MUST disable itself on `pointer:coarse`, `prefers-reduced-motion`, or ≤768px. It MUST remove listeners on unmount.

#### Scenario: 6 — Coarse pointer disabled
- GIVEN a touch device (`pointer:coarse`)
- WHEN the component mounts
- THEN no cursor elements render and `cursor:none` is not applied globally

#### Scenario: 7 — Hover expansion
- GIVEN a fine pointer on desktop
- WHEN hovering an interactive element
- THEN the cursor expands and follower catches up via rAF

### Requirement: Terminal Easter-Egg

`Terminal` modal (z-index 10000) MUST open via `#terminal-toggle`, close on ESC/`exit`/`cls`/`clear`, and support 10 commands: `help, about, skills, projects, certifications, contact, social, whoami, date, clear`. It MUST keep history, support tab autocomplete, and render output from `data/portfolio.ts` without `innerHTML` injection.

#### Scenario: 8 — Command execution
- GIVEN the terminal is open
- WHEN the user types `skills` and presses Enter
- THEN output lists skills from typed data and history appends

#### Scenario: 9 — Autocomplete and clear
- GIVEN input `pro` in the terminal
- WHEN the user presses Tab
- THEN it completes to `projects`; `clear` empties history

### Requirement: Tech Carousel

`TechCarousel` MUST auto-advance 12 slides every 2s, show dot indicators, pause on hover, and resume on leave. It MUST be keyboard accessible (focusable controls).

#### Scenario: 10 — Auto-advance and pause
- GIVEN the carousel is visible
- WHEN 2s elapses
- THEN slide advances; hover pauses the timer and leave resumes

### Requirement: Scroll UX and Contact Form

Progress bar MUST set width to `scrollY/(scrollHeight-clientHeight)*100` via rAF; scroll-to-top MUST appear after >500px and smooth-scroll to top; parallax `translateY(scrolled*0.1+index*0.05)` MUST be rAF-throttled. `animate-on-scroll` MUST use IntersectionObserver with delays 1–4. `ContactForm` MUST validate client-side and open `wa.me/+51917394464?text=...` via `encodeURIComponent`, no backend.

#### Scenario: 11 — Scroll progress and top
- GIVEN the user scrolls to 50% of the document
- WHEN rAF fires
- THEN progress width is ~50% and scroll-to-top is visible only if >500px

#### Scenario: 12 — WhatsApp submit
- GIVEN valid name/email/message
- WHEN the user submits the form
- THEN `window.open` is called with a `wa.me` URL containing encoded fields and inline feedback appears

#### Scenario: 13 — Validation
- GIVEN an invalid email
- WHEN the user submits
- THEN the form shows an error and does not open WhatsApp
