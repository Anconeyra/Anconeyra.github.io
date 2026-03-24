# Portafolio Profesional - Frank Anconeyra

Un portafolio profesional moderno y responsivo creado con HTML, CSS y JavaScript puro, diseñado específicamente para mostrar habilidades como **Full-Stack Developer & Cybersecurity Analyst**.

## 🚀 Características

- **Modo Oscuro/Claro**: Toggle para cambiar entre temas con un clic
- **Diseño Moderno**: Interfaz limpia y profesional
- **Totalmente Responsivo**: Se adapta a todos los dispositivos (móvil, tablet, desktop)
- **Animaciones Suaves**: Efectos visuales atractivos y profesionales
- **Optimizado para SEO**: Meta etiquetas configuradas
- **Sección de Certificaciones**: Muestra todas tus certificaciones profesionales
- **Fácil de Personalizar**: Código limpio y bien organizado
- **Listo para GitHub Pages**: Configuración optimizada para deployment

## 📁 Estructura del Proyecto

```
portafolio/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos y diseño (con variables CSS para temas)
├── js/
│   └── main.js         # Funcionalidad e interacciones
└── README.md           # Documentación
```

## 🎨 Personalización

### 1. Información Personal

Edita `index.html` para actualizar:

- **Nombre**: Busca "Frank Anconeyra" y reemplázalo si es necesario
- **Email**: Actualiza `tu-email@email.com`
- **Ubicación**: Cambia "Tu Ciudad, País"
- **Redes Sociales**: Actualiza los enlaces de GitHub, LinkedIn

### 2. Colores del Tema

En `css/styles.css`, modifica las variables CSS:

```css
:root {
    /* Light Theme (default) */
    --primary-color: #6366f1;      /* Color principal */
    --secondary-color: #0ea5e9;    /* Color secundario */
    --accent-color: #10b981;       /* Color de acento */
    /* ... más variables */
}

/* Dark Theme */
[data-theme="dark"] {
    --primary-color: #818cf8;
    /* ... más variables */
}
```

### 3. Proyectos

En la sección `#proyectos` de `index.html`, edita cada `project-card` con:
- Nombre del proyecto
- Descripción
- Tecnologías utilizadas
- Enlaces a GitHub y demo

### 4. Certificaciones

En la sección `#certificaciones`, puedes agregar o quitar certificaciones según necesites. Cada categoría tiene esta estructura:

```html
<div class="certification-category">
    <h3 class="certification-category-title">
        <i class="fas fa-shield-alt"></i> Nombre Categoría
    </h3>
    <div class="certification-list">
        <div class="certification-item">
            <div class="certification-icon">
                <i class="fas fa-certificate"></i>
            </div>
            <div class="certification-info">
                <h4>Nombre Certificación</h4>
                <p>Emisor • Año</p>
            </div>
        </div>
    </div>
</div>
```

### 5. Estadísticas

Actualiza los valores en `data-target` para las estadísticas en la sección "Sobre Mí":

```html
<span class="stat-number" data-target="14">0</span>
```

## 📤 Deployment en GitHub Pages

### Paso 1: Crear Repositorio

1. Ve a [GitHub](https://github.com)
2. Crea un nuevo repositorio llamado `tu-usuario.github.io` (reemplaza `tu-usuario` con tu nombre de usuario de GitHub)
   - O crea un repositorio con cualquier nombre si prefieres otra URL

### Paso 2: Subir Archivos

```bash
# Navega al directorio del proyecto
cd /home/alondrita/portafolio

# Inicializa el repositorio git
git init

# Agrega todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit - Portafolio profesional"

# Agrega tu repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/Anconeyra/tu-repositorio.git

# Sube los archivos
git branch -M main
git push -u origin main
```

### Paso 3: Configurar GitHub Pages

1. Ve a la página de tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **Source**, selecciona:
   - Branch: `main` (o `master`)
   - Folder: `/ (root)`
5. Haz clic en **Save**

### Paso 4: Acceder a tu Portafolio

Después de unos minutos, tu portafolio estará disponible en:

- `https://tu-usuario.github.io/tu-repositorio/`

O si usaste el nombre `tu-usuario.github.io`:

- `https://tu-usuario.github.io/`

## 🌟 Características Destacadas

### Modo Oscuro/Claro
- Botón flotante en la esquina inferior derecha
- Preferencia guardada en localStorage
- Transición suave entre temas
- Iconos de sol/luna animados

### Sección de Certificaciones
- Organizadas por categorías (Cybersecurity, Cloud, Networking, Python, Enterprise)
- Iconos representativos para cada categoría
- Diseño de tarjetas con hover effects

### Animaciones
- Fade-in al hacer scroll
- Contadores animados en estadísticas
- Hover effects en tarjetas y botones
- Smooth scroll para navegación

### Responsive Design
- Menú hamburguesa para móviles
- Grid adaptable a diferentes tamaños de pantalla
- Optimizado para touch

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript (ES6+)**: Interactividad sin frameworks
- **Font Awesome**: Iconos vectoriales
- **Google Fonts**: Tipografía Poppins

## 📝 Próximas Mejoras Sugeridas

- [ ] Agregar imágenes reales de proyectos
- [ ] Integrar formulario de contacto con Formspree o EmailJS
- [ ] Agregar más animaciones con GSAP o Anime.js
- [ ] Implementar blog integrado
- [ ] Agregar Google Analytics
- [ ] Optimizar imágenes con WebP
- [ ] Agregar PWA (Progressive Web App)

## 📄 Licencia

Este proyecto es de código abierto y puedes usarlo libremente.

## 👨‍💻 Autor

**Frank Anconeyra**
- GitHub: [@Anconeyra](https://github.com/Anconeyra)
- LinkedIn: [frank-anconeyra](https://linkedin.com/in/frank-anconeyra)

---

**¡Mucho éxito con tu portafolio!** 🚀

> "My code has opinions—and linters to enforce them." 😄
