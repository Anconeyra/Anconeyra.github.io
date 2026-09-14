// ========================================
// Shared Data (single source of truth)
// ========================================
const DATA = {
    skills: [
        { name: 'Frontend', items: ['React', 'Vue', 'Svelte', 'TypeScript', 'HTML/CSS'] },
        { name: 'Backend', items: ['Node.js', 'Spring Boot', 'Python', 'Java', 'C#'] },
        { name: 'Mobile', items: ['Flutter', 'Kotlin', 'Dart'] },
        { name: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Serverless'] },
        { name: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'NoSQL'] },
        { name: 'Cybersecurity', items: ['Wireshark', 'OWASP', 'Kali Linux', 'Metasploit', 'Snyk'] }
    ],
    projects: [
        { name: 'Greenfil', icon: '🌿', tech: 'Flutter + C# + .NET', description: 'Management system with scalable architecture' },
        { name: 'MOSS', icon: '🧠', tech: 'Python + Data Analysis + ML', description: 'Data processing with advanced techniques' },
        { name: 'Sistema de Evaluación', icon: '📋', tech: 'JavaScript + Python', description: 'Full-stack evaluation platform' },
        { name: 'LiteConta-SUNAT', icon: '🧮', tech: 'PHP + Blade', description: 'Accounting system with SUNAT integration' },
        { name: 'CRM Django', icon: '👥', tech: 'Python + Django', description: 'Customer relationship management' },
        { name: 'Gestión de Inventarios', icon: '📦', tech: 'HTML + CSS + JS', description: 'Inventory control system' }
    ],
    certifications: [
        {
            category: 'Cybersecurity',
            count: 5,
            items: [
                { name: 'Junior Cybersecurity Analyst', org: 'Cisco', year: '2025' },
                { name: 'Endpoint Security', org: 'Cisco', year: '2025' },
                { name: 'Network Defense', org: 'Cisco', year: '2025' },
                { name: 'Introduction to Cybersecurity', org: 'Cisco', year: '2025' },
                { name: 'Lifelong Learning 2025 & 2026', org: 'Certiprof', year: '2025-2026' }
            ]
        },
        {
            category: 'Cloud - AWS',
            count: 3,
            items: [
                { name: 'Getting Started with Databases', org: 'AWS', year: '2025' },
                { name: 'Getting Started with Serverless', org: 'AWS', year: '2025' },
                { name: 'Introduction to Cloud 101', org: 'AWS', year: '2025' }
            ]
        },
        {
            category: 'Networking',
            count: 2,
            items: [
                { name: 'Networking Basics', org: 'Cisco', year: '2025' },
                { name: 'Networking Devices', org: 'Cisco', year: '2025' }
            ]
        },
        {
            category: 'Python',
            count: 2,
            items: [
                { name: 'Python Essentials 1', org: 'Cisco', year: '2025' },
                { name: 'Python Essentials 2', org: 'Cisco', year: '2025' }
            ]
        },
        {
            category: 'Enterprise',
            count: 1,
            items: [
                { name: 'SAP SuccessFactors', org: 'SAP', year: '2025' }
            ]
        }
    ]
};

// ========================================
// Initialize All Features
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCustomCursor();
    initScrollAnimations();
    initParallax();
    initTechCarousel();
    initNavigation();
    initCounters();
    initContactForm();
    initScrollProgressBar();
    initScrollToTop();
    initTerminal();
    initParticles();
    
    console.log('🚀 Portafolio Nyraroot cargado correctamente');
});

// ========================================
// Theme Toggle with Auto-Detection
// ========================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    html.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// ========================================
// Custom Cursor
// ========================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;

    // Skip on touch/coarse pointer devices and reduced-motion preference
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    let rafId = null;

    // Smooth follow via requestAnimationFrame (starts on first mousemove)
    function animateCursor() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';

        rafId = requestAnimationFrame(animateCursor);
    }

    // Mouse move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Start the rAF loop on first mouse movement
        if (rafId === null) {
            rafId = requestAnimationFrame(animateCursor);
        }
    });
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .certification-item, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .certification-category, .stat, .about-text, .tech-group');
    
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.classList.add(`delay-${(index % 4) + 1}`);
        observer.observe(el);
    });
}

// ========================================
// Parallax Effect
// ========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image-wrapper, .floating-badge, .about-image-wrapper');

    if (parallaxElements.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Throttle scroll handler to at most once per frame via requestAnimationFrame
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach((el, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        });
    });
}

// ========================================
// Tech Carousel (About Section)
// ========================================
function initTechCarousel() {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.dot');
    
    if (carouselSlides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 2000; // 2 seconds
    
    function showSlide(index) {
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        carouselDots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= carouselSlides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = carouselSlides.length - 1;
        } else {
            currentSlide = index;
        }
        
        carouselSlides[currentSlide].classList.add('active');
        if (carouselDots[currentSlide]) {
            carouselDots[currentSlide].classList.add('active');
        }
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    let carouselInterval = setInterval(nextSlide, slideInterval);
    
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(carouselInterval);
            showSlide(index);
            carouselInterval = setInterval(nextSlide, slideInterval);
        });
    });
    
    const techCarousel = document.querySelector('.tech-carousel');
    if (techCarousel) {
        techCarousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        techCarousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, slideInterval);
        });
    }
    
    showSlide(0);
}

// ========================================
// Navigation — Professional Header
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // --- Sliding indicator helper ---
    function moveIndicator(activeLink) {
        if (!activeLink || window.innerWidth <= 768) return;
        const rect = activeLink.getBoundingClientRect();
        const menuRect = navMenu.getBoundingClientRect();
        const left = rect.left - menuRect.left;
        const width = rect.width;
        navMenu.style.setProperty('--indicator-left', left + 'px');
        navMenu.style.setProperty('--indicator-width', width + 'px');
    }

    // --- Toggle mobile menu + hamburger animation ---
    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Scroll effects ---
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Navbar compact state
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                // Active section highlight
                highlightNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- Scroll-spy with sliding indicator ---
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        let currentLink = null;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentLink = navLink;
            }
        });

        navLinks.forEach(link => link.classList.remove('active'));
        if (currentLink) {
            currentLink.classList.add('active');
            moveIndicator(currentLink);
        } else {
            // Reset indicator when at top
            navMenu.style.setProperty('--indicator-width', '0px');
        }
    }

    // Position indicator on resize
    window.addEventListener('resize', () => {
        const active = document.querySelector('.nav-link.active');
        if (active) moveIndicator(active);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial state
    highlightNavLink();
}

// ========================================
// Counter Animation
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter, speed);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(counter, speed) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText.replace('+', '');
    const increment = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + increment) + '+';
        setTimeout(() => animateCounter(counter, speed), 10);
    } else {
        counter.innerText = target + '+';
    }
}

// ========================================
// Contact Form (WhatsApp)
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Tu número de WhatsApp (cámbialo por el tuyo)
    const whatsappNumber = '+51917394464'; // Reemplaza con tu número real
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Crear mensaje formateado (real newlines; encodeURIComponent handles special chars)
        const whatsappMessage = `👋 *Nuevo Mensaje del Portafolio*\n\n` +
                               `*Nombre:* ${name}\n` +
                               `*Email:* ${email}\n\n` +
                               `*Mensaje:*\n${message}\n\n` +
                               `_Enviado desde el portafolio de Nyraroot_`;

        // Crear URL de WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Abrir WhatsApp en nueva pestaña
        window.open(whatsappUrl, '_blank');

        // Resetear formulario
        contactForm.reset();

        // Mostrar feedback en línea
        const feedback = document.getElementById('form-feedback');
        if (feedback) {
            feedback.textContent = '¡Redirigiendo a WhatsApp! Por favor envía el mensaje desde allí.';
            feedback.classList.add('visible');
        }
    });
}

// ========================================
// Scroll Progress Bar
// ========================================
function initScrollProgressBar() {
    const progressBar = document.getElementById('scroll-progress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ========================================
// Scroll to Top Button
// ========================================
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Terminal Interactiva
// ========================================
function initTerminal() {
    const terminalToggle = document.getElementById('terminal-toggle');
    const terminalModal = document.getElementById('terminal-modal');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');

    if (!terminalToggle || !terminalModal || !terminalInput) return;

    let commandHistory = [];
    let historyIndex = -1;

    // Comandos disponibles
    const commands = {
        'help': {
            description: 'Show available commands',
            output: `
<span class="info">Available Commands:</span>
  <span class="command-highlight">help</span>              - Show this help message
  <span class="command-highlight">about</span>             - Show information about Frank
  <span class="command-highlight">skills</span>            - List technical skills
  <span class="command-highlight">projects</span>          - Show projects list
  <span class="command-highlight">certifications</span>    - Show certifications
  <span class="command-highlight">contact</span>           - Show contact information
  <span class="command-highlight">social</span>            - Show social media links
  <span class="command-highlight">clear</span>             - Clear terminal
  <span class="command-highlight">whoami</span>            - Current user information
  <span class="command-highlight">date</span>              - Show current date/time
  <span class="command-highlight">cls</span>               - Clear terminal (alias)
  <span class="command-highlight">exit</span>              - Close terminal`
        },
        'about': {
            description: 'Show information about Frank',
            output: `
<span class="info">╔══════════════════════════════════════════════════════╗</span>
<span class="info">║</span>  Frank Anconeyra - Nyraroot                      <span class="info">║</span>
<span class="info">╠══════════════════════════════════════════════════════╣</span>
<span class="info">║</span>  Full-Stack Developer & Cybersecurity Analyst      <span class="info">║</span>
<span class="info">║</span>  Location: Arequipa, Perú                          <span class="info">║</span>
<span class="info">║</span>  Email: anconeyrafsuyo@gmail.com                   <span class="info">║</span>
<span class="info">╠══════════════════════════════════════════════════════╣</span>
<span class="info">║</span>  Passionate about creating secure, scalable         <span class="info">║</span>
<span class="info">║</span>  applications that connect people, devices,          <span class="info">║</span>
<span class="info">║</span>  and data.                                           <span class="info">║</span>
<span class="info">╚══════════════════════════════════════════════════════╝</span>`
        },
        'skills': {
            description: 'List technical skills',
            output: () => {
                let html = '<span class="info">Technical Skills:</span>';
                DATA.skills.forEach(skill => {
                    html += `\n\n<span class="warning">${skill.name}:</span>\n  ${skill.items.join(' • ')}`;
                });
                return html;
            }
        },
        'projects': {
            description: 'Show projects list',
            output: () => {
                let html = '<span class="info">Projects:</span>';
                DATA.projects.forEach(project => {
                    html += `\n\n<span class="success">${project.icon} ${project.name}</span> - ${project.tech}\n  ${project.description}`;
                });
                html += `\n\n<span class="info">Type 'projects --all' for more details</span>`;
                return html;
            }
        },
        'certifications': {
            description: 'Show certifications',
            output: () => {
                let html = '<span class="info">Certifications (15+):</span>';
                DATA.certifications.forEach(cert => {
                    html += `\n\n<span class="warning">${cert.category} (${cert.count}):</span>`;
                    cert.items.forEach(item => {
                        html += `\n  ✓ ${item.name} - ${item.org} ${item.year}`;
                    });
                });
                html += '\n\n<span class="info">Visit Credly for verified badges!</span>';
                return html;
            }
        },
        'contact': {
            description: 'Show contact information',
            output: `
<span class="info">╔══════════════════════════════════════════════════════╗</span>
<span class="info">║</span>  Contact Information                             <span class="info">║</span>
<span class="info">╠══════════════════════════════════════════════════════╣</span>
<span class="info">║</span>  📧 Email: anconeyrafsuyo@gmail.com              <span class="info">║</span>
<span class="info">║</span>  📍 Location: Arequipa, Perú                     <span class="info">║</span>
<span class="info">║</span>  💬 WhatsApp: +51 917 394 464                    <span class="info">║</span>
<span class="info">║</span>  🔗 GitHub: github.com/Anconeyra                 <span class="info">║</span>
<span class="info">║</span>  💼 LinkedIn: linkedin.com/in/frank-anconeyra    <span class="info">║</span>
<span class="info">╚══════════════════════════════════════════════════════╝</span>`
        },
        'social': {
            description: 'Show social media links',
            output: `
<span class="info">Social Media:</span>

  <span class="command-highlight">GitHub:</span>    https://github.com/Anconeyra
  <span class="command-highlight">LinkedIn:</span>  https://linkedin.com/in/frank-anconeyra
  <span class="command-highlight">Email:</span>     mailto:anconeyrafsuyo@gmail.com
  <span class="command-highlight">Credly:</span>    https://credly.com/users/frank-anconeyra`
        },
        'whoami': {
            description: 'Current user information',
            output: `<span class="success">root@nyraroot</span> - Full-Stack Developer & Cybersecurity Analyst`
        },
        'date': {
            description: 'Show current date/time',
            output: () => `<span class="info">Current Date:</span> ${new Date().toLocaleString('es-PE')}`
        },
        'clear': {
            description: 'Clear terminal',
            action: () => {
                terminalOutput.innerHTML = '';
                return null;
            }
        },
        'cls': {
            description: 'Clear terminal (alias)',
            action: () => {
                terminalOutput.innerHTML = '';
                return null;
            }
        },
        'exit': {
            description: 'Close terminal',
            action: () => {
                closeTerminal();
                return null;
            }
        }
    };

    // Abrir terminal
    terminalToggle.addEventListener('click', openTerminal);

    // Cerrar terminal
    terminalClose.addEventListener('click', closeTerminal);

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
            closeTerminal();
        }
    });

    // Input del terminal
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                executeCommand(command);
            }
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            autocompleteCommand();
        }
    });

    function openTerminal() {
        terminalModal.classList.add('active');
        setTimeout(() => terminalInput.focus(), 300);
    }

    function closeTerminal() {
        terminalModal.classList.remove('active');
    }

    function executeCommand(cmd) {
        // Mostrar comando ingresado (seguro: el texto del usuario se inserta como texto plano, no como HTML)
        const commandLine = document.createElement('div');
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = 'root@nyraroot:~$';
        commandLine.appendChild(promptSpan);
        commandLine.append(' ' + cmd);
        terminalOutput.appendChild(commandLine);

        // Procesar comando
        const args = cmd.split(' ');
        const command = args[0];

        if (commands[command]) {
            const output = typeof commands[command].output === 'function' 
                ? commands[command].output() 
                : commands[command].output;
            
            if (commands[command].action) {
                commands[command].action();
            } else if (output) {
                const outputLine = document.createElement('div');
                outputLine.className = 'command-output';
                outputLine.innerHTML = output;
                terminalOutput.appendChild(outputLine);
            }
        } else if (cmd) {
            const errorLine = document.createElement('div');
            errorLine.className = 'error';
            errorLine.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
            terminalOutput.appendChild(errorLine);
        }

        // Auto-scroll al final
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function autocompleteCommand() {
        const input = terminalInput.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            const outputLine = document.createElement('div');
            outputLine.className = 'info';
            outputLine.textContent = matches.join('  ');
            terminalOutput.appendChild(outputLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
}

// ========================================
// Partículas en el Hero
// ========================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    // Skip on devices that prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationId;

    // Simulation space is CSS pixels; the backing store scales by devicePixelRatio
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;

    // Mouse interaction
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    function setCanvasSize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    setCanvasSize();

    window.addEventListener('mousemove', (event) => {
        const heroSection = document.querySelector('.hero');
        const rect = heroSection.getBoundingClientRect();

        if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
            mouse.x = event.x - rect.left;
            mouse.y = event.y - rect.top;
        } else {
            mouse.x = null;
            mouse.y = null;
        }
    });

    // Clase Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.speedX = (Math.random() * 1) - 0.5;
            this.speedY = (Math.random() * 1) - 0.5;
            this.color = `rgba(${Math.random() > 0.5 ? '102, 126, 234' : '118, 75, 162'}, ${Math.random() * 0.5 + 0.3})`;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Movimiento básico
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebote en bordes
            if (this.x > width || this.x < 0) {
                this.speedX *= -1;
            }
            if (this.y > height || this.y < 0) {
                this.speedY *= -1;
            }

            // Interacción con mouse
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }
    }

    // Inicializar partículas
    function init() {
        particlesArray = [];
        const numberOfParticles = (width * height) / 9000;

        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Conectar partículas con líneas usando una cuadrícula espacial
    // (solo se comparan celdas adyacentes, no todos los pares)
    function connect() {
        const thresholdSq = (width / 7) * (height / 7);
        const cellSize = Math.sqrt(thresholdSq);

        // Reconstruir la cuadrícula en cada frame
        const grid = new Map();
        for (let i = 0; i < particlesArray.length; i++) {
            const p = particlesArray[i];
            const key = Math.floor(p.x / cellSize) + ',' + Math.floor(p.y / cellSize);
            if (!grid.has(key)) grid.set(key, []);
            grid.get(key).push(i);
        }

        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            const p = particlesArray[a];
            const cellX = Math.floor(p.x / cellSize);
            const cellY = Math.floor(p.y / cellSize);

            // Revisar solo la celda propia y las 8 vecinas
            for (let gx = -1; gx <= 1; gx++) {
                for (let gy = -1; gy <= 1; gy++) {
                    const neighbors = grid.get((cellX + gx) + ',' + (cellY + gy));
                    if (!neighbors) continue;

                    for (let k = 0; k < neighbors.length; k++) {
                        const b = neighbors[k];
                        if (b <= a) continue; // evita duplicados y auto-conexiones

                        const q = particlesArray[b];
                        const dx = p.x - q.x;
                        const dy = p.y - q.y;
                        const distance = dx * dx + dy * dy;

                        if (distance < thresholdSq) {
                            opacityValue = 1 - (distance / 20000);
                            ctx.strokeStyle = `rgba(102, 126, 234, ${opacityValue * 0.2})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(q.x, q.y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }
    }

    // Animación
    function animate() {
        animationId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].draw();
            particlesArray[i].update();
        }
        connect();
    }

    // Resize handler (debounced: se ejecuta al dejar de redimensionar)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setCanvasSize();
            mouse.radius = 150;
            init();
        }, 200);
    });

    // Mouse out
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Iniciar
    init();
    animate();
}
