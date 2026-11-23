# vercelfrank — Nyraroot Unix

Portafolio de **Frank Anconeyra** — Full-Stack Developer & Cybersecurity Analyst (Arequipa, Perú).

La página es un escritorio Linux: panel del sistema, una ventana de aplicación con chrome real,
dock, iconos de escritorio y widgets. Cada sección es una aplicación.

## Stack

- [SvelteKit 5](https://svelte.dev/docs/kit) (runes) + TypeScript
- Vite 8
- `@sveltejs/adapter-vercel` — deploy nativo a Vercel
- Tipografías: Cantarell (sistema) y JetBrains Mono (datos)

## Aplicaciones

| App | Contenido |
| --- | --- |
| Terminal | shell interactiva (`help`, `experiencia`, `casos`, `neofetch`) |
| Perfil | identidad, ficha y accesos directos |
| Experiencia | 5 puestos con fecha, rol y stack |
| Proyectos | 6 sistemas con enlace al repositorio |
| Credenciales | Cisco, AWS y Python |
| Seguridad | prácticas, credenciales y auditoría de la propia página |
| Stack | 36 tecnologías con su marca real |
| Archivos | gestor TUI: cada carpeta abre su aplicación |
| Monitor | lecturas reales del dispositivo |
| Manual | `man frank` |
| Ajustes | fondos de escritorio con preferencia guardada |
| Contacto | formulario que abre WhatsApp + canales directos |

## Atajos

| Tecla | Acción |
| --- | --- |
| `⌘K` / `Ctrl+K` | lanzador de aplicaciones |
| `1` … `8` | cambiar de aplicación |
| `Esc` | cerrar la ventana activa |
| doble click en la barra | maximizar / restaurar |

La ventana se puede arrastrar desde su barra de título.

## Desarrollo

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deploy

El proyecto usa `@sveltejs/adapter-vercel`. Importá el repo en
[vercel.com/new](https://vercel.com/new) o corré `vercel --prod`.

## Documentación de diseño

- `PRODUCT.md` — verdad de producto: usuarios, propósito, límites.
- `DESIGN.md` — sistema visual: color, tipografía, componentes y reglas.
