# VercelFrank

Portafolio profesional de **Frank Anconeyra** — Full-Stack Developer & Cybersecurity Analyst.

Reconstruido con **SvelteKit 5** (runes mode) + TypeScript, tomando como referencia
`anconeyra.github.io` pero con stack moderno optimizado para **Vercel**.

## Stack

- [SvelteKit 5](https://svelte.dev/docs/kit) (runes mode)
- TypeScript
- Vite 8
- `@sveltejs/adapter-vercel` — deploy nativo a Vercel
- Font Awesome 6 + Google Fonts (Poppins)

## Caracteristicas

- Landing page completa (Hero, Sobre Mi, Habilidades, Certificaciones, Proyectos, Contacto)
- Toggle de tema claro/oscuro (persistido en localStorage)
- Terminal interactiva (comando `help` para ver los comandos)
- Particle canvas en el hero
- Carrusel de tecnologias
- Contadores de estadisticas animados
- Scroll progress bar + boton volver arriba
- Formulario de contacto que abre WhatsApp
- Totalmente responsive

## Desarrollo

```sh
npm install
npm run dev
```

## Build y preview

```sh
npm run build
npm run preview
```

## Deploy a Vercel

El proyecto ya usa `@sveltejs/adapter-vercel`. Opciones:

1. **Dashboard**: Importa el repo en [vercel.com](https://vercel.com) — Vercel detecta el framework automaticamente.
2. **CLI**:
   ```sh
   npm i -g vercel
   vercel
   ```
   El framework preset, build command (`npm run build`) y output se configuran solos.

### Nota sobre la imagen de perfil

La foto actual es un placeholder (`static/img/tu-foto.svg`). Reemplazarla por la foto real:
colocala en `static/img/tu-foto.jpg` y actualiza el `src` en `src/lib/components/Hero.svelte`.
