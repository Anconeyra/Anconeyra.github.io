---
name: Workstation — Frank Anconeyra
description: A Linux desktop portfolio for a full-stack developer who also works in security.
colors:
  desktop:
    value: '#0a0f18'
    type: color
  window:
    value: '#14181f'
    type: color
  window-raised:
    value: '#1a1f29'
    type: color
  window-hover:
    value: '#232936'
    type: color
  window-line:
    value: '#2b3342'
    type: color
  ink:
    value: '#e7eaf2'
    type: color
  ink-secondary:
    value: '#b4bbcd'
    type: color
  ink-tertiary:
    value: '#8b93a8'
    type: color
  signal-blue:
    value: '#7aa2f7'
    type: color
  signal-green:
    value: '#9ece6a'
    type: color
  signal-amber:
    value: '#e0af68'
    type: color
  signal-red:
    value: '#f7768e'
    type: color
typography:
  display:
    fontFamily: Sora
    fontSize: clamp(1.6rem, 4vw, 2.4rem)
    fontWeight: '700'
    lineHeight: '1.05'
    letterSpacing: '-0.035em'
  title:
    fontFamily: Sora
    fontSize: 17px
    fontWeight: '600'
    letterSpacing: '-0.025em'
  body:
    fontFamily: Sora
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.65'
  small:
    fontFamily: Sora
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
  base:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    letterSpacing: '0.04em'
  micro:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    letterSpacing: '0.04em'
  term:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.72'
rounded:
  window:
    value: 10px
    type: dimension
  control:
    value: 7px
    type: dimension
spacing:
  panel:
    value: 34px
    type: dimension
  gutter:
    value: clamp(0.75rem, 2.5vw, 2rem)
    type: dimension
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.desktop}'
    rounded: '{rounded.control}'
    padding: 0.55rem 0.95rem
    typography: '{typography.small}'
  window-bar:
    backgroundColor: '{colors.window-raised}'
    textColor: '{colors.ink-secondary}'
    rounded: '{rounded.window}'
    padding: 0 0.5rem 0 0.85rem
---

# Design System: Workstation

## Overview

**Creative North Star: "The Desktop You Actually Work On"**

The portfolio is a Linux workstation viewed head-on: a system panel across the top, one
application window on a real wallpaper, and a dock at the bottom. Every section is an
application, and switching apps is the navigation model — the dock, the number keys, or
`⌘K`.

The anti-reference is the novelty "OS portfolio": draggable windows scattered across a
fake desktop, a macOS traffic-light clone, a pixel-art taskbar, a terminal that does
nothing. Here the window is a real container with real chrome and real controls, the
terminal genuinely executes commands, the shortcut keys genuinely switch apps, and the
content inside each window is typeset for reading — not monospaced for cosplay.

**Key Characteristics:**
- One window at a time, never overlapping, never dragging.
- Wallpaper is authored, not stock: layered ridgelines with rim light, stars, aurora.
- Two voices only: Sora for language, JetBrains Mono for machine data.
- Chrome is flat and quiet; the content is the only thing with contrast.
- Every icon is drawn or a real brand mark — never an emoji.

**The One Window Rule.** There is exactly one application window at rest. A second
floating surface (the launcher) is the only exception, because it is modal.

## Colors

A cold dark ground lit by a teal sky, with one blue signal for interaction and green
strictly for live state.

### Primary
- **Signal Blue** (`#7aa2f7`): interaction. Links, active dock item, focused field,
  window outline on hover, the terminal prompt's sibling accent.
- **Signal Green** (`#9ece6a`): live state only. "Disponible", the "actual" badge, the
  availability dot, successful output. Never decoration.

### Secondary
- **Signal Amber** (`#e0af68`): reserved, currently unused in the shipped surfaces.
- **Signal Red** (`#f7768e`): terminal errors and the close control's hover only.

### Neutral
- **Desktop** (`#0a0f18`): the fallback beneath the wallpaper.
- **Window** (`#14181f`), **Window Raised** (`#1a1f29`), **Window Hover** (`#232936`),
  **Window Line** (`#2b3342`): the chrome ladder.
- **Ink** (`#e7eaf2`): primary text, 14.2:1 on the window.
- **Ink Secondary** (`#b4bbcd`): prose and secondary data, 9.2:1.
- **Ink Tertiary** (`#8b93a8`): labels, periods, metadata, 5.5:1 — the floor. Nothing dimmer ships.

## Typography

**Display:** Sora (600/700) · **Body:** Sora (400/500) · **Machine:** JetBrains Mono (400/500).

**Character:** Sora's geometric tone keeps the window legible and modern at 13–15px, while
JetBrains Mono is confined to what a machine would print — prompts, paths, periods, tags,
the terminal. Mono is never used for prose.

### Hierarchy
- **Display** (700, `clamp(1.6rem, 4vw, 2.4rem)`, 1.05, −0.035em): the name, and pane titles.
- **Title** (600, 17px, −0.025em): company names.
- **Body** (400, 15px, 1.65, max 66ch): the lede.
- **Small** (400, 13px, 1.6): descriptions, rows, form values.
- **Label** (400, 11px, +0.04em, mono): periods, status bar, panel.
- **Micro** (400, 10px, mono): tags, tools, keycaps, window title.

### Named Rules
**The Ramp Rule.** The ramp is 10 · 11 · 12 · 13 · 14 · 15 · 16 · 17 + display. No half-pixel
sizes. If a value is off the ramp it is a bug, not a nuance.

**The Two Voices Rule.** Sora never sets a path, a version, a date or a command. JetBrains
Mono never sets a paragraph.

## Layout

A fixed 34px system panel, a flexible stage, and a dock. The window is `min(980px, 100%)`
wide, centred in the stage, capped at `calc(100svh - 165px)` tall with the body scrolling
inside it. The window body carries the mask fade at its foot so a scrolled edge never
looks like a broken crop.

Below 700px the stage loses its top margin, the window takes the full gutter, the panel
drops its secondary items, and the dock shrinks to 38px buttons. The dock never wraps; it
is sized to fit eight applications on a 390px screen.

## Elevation & Depth

Two levels only. The window sits on the wallpaper with a single deep shadow
(`0 30px 80px rgba(0,0,0,.55)`) plus a 1px inner top highlight; the dock floats with a
backdrop blur because it is glass over live wallpaper, which is its actual material. No
cards inside the window carry shadows — separation there is a 1px line and a one-step
tonal lift.

## Shapes

Soft but restrained: 10px on the window, 7px on buttons and inputs, 6px on tags, 100px on
status pills and availability badges, 50% on the two indicator dots. The monogram tiles are
10px squares with a hue derived from the company name, so each employer reads distinct
without a fabricated logo.

## Components

### Window
Title bar 38px, centred title at 12px, app icon at left, and three controls at right.
Below it a 26px menubar (Archivo · Ver · Ayuda) built on native `<details>` disclosures with
real, working items — copy email, open WhatsApp, switch app, close. An item runs and the
menu closes; a click outside closes any open menu.
minimise (collapses the body), maximise (toggles `width: 100%`), close (returns to the
terminal). All three are real and keyboard reachable.

### Dock
Eight filled application tiles at 46px, 11px radius, each with its own gradient and glyph
colour (a dark terminal with a green prompt, a blue user, an amber briefcase, a blue folder,
a violet badge, a green shield, a slate stack, a red envelope) — the colour is what makes it
read as an installed dock rather than a line-icon set. Label tooltip above on hover, a green
dot marking the active app, and a separator between the terminal and the content apps.
`alt+1…8` and plain `1…8` switch apps when focus is not in a text field.

### System panel
32px, translucent over the wallpaper with a 1px bottom rule. Left: the app-menu button
(logo + "Aplicaciones") which opens the launcher. Centre: the task list, one pill per open
window, dimmed when minimised, click to minimise/restore. Right: network and volume tray
icons, then clock with the weekday and date.

### Desktop
A column of six access icons at the top left, each a coloured app tile with a label and a
text-shadow for legibility over the wallpaper. Right-click anywhere on the desktop opens a
context menu with real actions (open terminal, jump to a section, close the window, reload).
Top right, a conky-style readout reports real device values — platform, logical cores,
approximate memory, viewport size and session uptime — read from the browser at mount.
Hidden below 1360px so it never collides with the window.

### Experience record
Each entry: a coloured monogram tile, company at title size, period right-aligned in mono,
role in signal blue, description at 13px/66ch, and a footer with the live "actual" badge
and technology pills.

### Stack
Chips, each carrying the real brand mark at its brand colour when that colour survives on
dark (luminance floor 0.2), otherwise the icon falls back to secondary ink. C# inherits the
.NET mark; SQL Server uses a drawn cylinder because no official mark ships in the icon set.

### Terminal
Real input and output, `role="log"` with `aria-live="polite"`, archey-style identity block,
`experiencia --list` table, command chips, unknown commands return a named error.

## Do's and Don'ts

### Do:
- **Do** keep one window on screen at a time.
- **Do** keep green for live state and blue for interaction; never swap them.
- **Do** keep the ramp on the eight documented steps.
- **Do** use real brand marks for technologies and monograms for employers.
- **Do** keep the whole page readable and navigable with JavaScript disabled.

### Don't:
- **Don't** add draggable, overlapping, or multi-window arrangements.
- **Don't** use emoji or unicode glyphs as icons.
- **Don't** put monospace on prose.
- **Don't** fabricate employer logos, roles, or metrics.
- **Don't** let a scrolled window edge read as a cropped image.
