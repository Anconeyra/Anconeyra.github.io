export const profile = {
	name: 'Frank Anconeyra',
	first: 'Frank',
	last: 'Anconeyra',
	role: 'Full-Stack Developer',
	roleSecondary: 'Cybersecurity Analyst',
	location: 'Arequipa, Perú',
	timezone: 'America/Lima (UTC−5)',
	email: 'anconeyrafsuyo@gmail.com',
	phone: '+51 917 394 464',
	whatsapp: '51917394464',
	github: 'https://github.com/Anconeyra',
	githubHandle: 'github.com/Anconeyra',
	linkedin: 'https://linkedin.com/in/frank-anconeyra',
	linkedinHandle: 'linkedin.com/in/frank-anconeyra',
	credly: 'https://www.credly.com/users/frank-anconeyra',
	tagline:
		'Construyo sistemas de gestión completos —datos, API, interfaz y despliegue— y después reviso la superficie de ataque de lo que construyo.'
};

export const nav = [
	{ id: 'experiencia', label: 'Experiencia' },
	{ id: 'proyectos', label: 'Proyectos' },
	{ id: 'credenciales', label: 'Credenciales' },
	{ id: 'stack', label: 'Stack' },
	{ id: 'contacto', label: 'Contacto' }
] as const;

/**
 * Trayectoria profesional. Datos tomados del registro público del autor.
 * `current` marca el puesto vigente; `url` queda vacío cuando no hay página
 * verificable — no se inventan enlaces.
 */
export const experiences = [
	{
		company: 'Rsa Creative Hub',
		role: 'Desarrollador Full-Stack',
		period: 'oct. 2026 — actualidad',
		place: '',
		current: true,
		description:
			'Desarrollo del sitio corporativo de RSA Creative Hub: NestJS con render del lado del servidor, vistas Handlebars y despliegue containerizado con Docker.',
		tags: ['NestJS', 'Handlebars', 'SSR', 'Docker'],
		url: 'https://github.com/Anconeyra/RSA---LANDING'
	},
	{
		company: 'Grupo Roberts',
		role: 'Soporte Técnico & Desarrollo de Módulos',
		period: 'set. 2026 — oct. 2026',
		place: '',
		current: false,
		description:
			'Encargado del soporte técnico especializado y desarrollo de nuevos módulos que integran sistemas internos de la empresa. Implemento comunicaciones entre sistemas para optimizar procesos operativos.',
		tags: ['Soporte técnico', 'Mejora continua'],
		url: ''
	},
	{
		company: 'Peru Intercorp Corporation',
		role: 'Desarrollador de Software Full-Stack',
		period: 'feb. 2026 — ago. 2026',
		place: '',
		current: false,
		description:
			'Desarrollé proyectos desde cero transformando ideas del cliente en soluciones completas: backend con NestJS, base de datos en PostgreSQL con Docker, web con Astro y app móvil con Kotlin en Android Studio.',
		tags: ['Astro', 'NestJS', 'PostgreSQL', 'Docker', 'Kotlin', 'Android'],
		url: ''
	},
	{
		company: 'Consejeros y Corredores de Seguros',
		role: 'Desarrollador de Soluciones Tecnológicas · Prácticas',
		period: 'ago. 2025 — nov. 2025',
		place: 'Yanahuara, Arequipa · Presencial',
		current: false,
		description:
			'Desarrollé nuevas funcionalidades y módulos web bajo estándares de seguridad rigurosos utilizando C#, Angular y SQL Server, aplicando buenas prácticas de ingeniería y arquitectura limpia.',
		tags: ['C#', 'Angular', 'SQL Server', 'ASP.NET'],
		url: ''
	},
	{
		company: 'Grupo Moss',
		role: 'Desarrollo de diseño web · Pasantía',
		period: 'dic. 2024 — ene. 2025',
		place: 'Arequipa · En remoto',
		current: false,
		description:
			'Sistema de coevaluación donde los profesores crean canales y los estudiantes se califican entre sí. API RESTful con Flask, datos flexibles en MongoDB y frontend en React.',
		tags: ['React', 'Flask', 'MongoDB'],
		url: ''
	},
	{
		company: 'Grupo Moss',
		role: 'Diseño de base de datos · Pasantía',
		period: 'jul. 2024 — ago. 2024',
		place: 'Arequipa · Híbrido',
		current: false,
		description:
			'Sistema para un evento deportivo multidisciplinario: base normalizada en MySQL, API con Django y frontend dinámico en React con Axios y Redux.',
		tags: ['React', 'Django', 'MySQL', 'Redux'],
		url: ''
	}
];

export const competencies = [
	{
		area: 'Frontend',
		items: ['React', 'Angular', 'Astro', 'Vue', 'Svelte', 'TypeScript', 'HTML/CSS']
	},
	{
		area: 'Backend',
		items: ['NestJS', 'Node.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'C#', 'Python', 'Java']
	},
	{
		area: 'Datos',
		items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB']
	},
	{
		area: 'Móvil',
		items: ['Flutter', 'Kotlin', 'Android Studio', 'Dart']
	},
	{
		area: 'Infraestructura',
		items: ['Docker', 'AWS', 'Kubernetes', 'Serverless', 'Vercel']
	},
	{
		area: 'Seguridad',
		items: ['Wireshark', 'OWASP', 'Kali Linux', 'Metasploit', 'Snyk', 'Endpoint Security']
	}
];

export const credentialGroups = [
	{
		issuer: 'Cisco',
		items: [
			{ name: 'Junior Cybersecurity Analyst Career Path', year: '2025' },
			{ name: 'Endpoint Security', year: '2025' },
			{ name: 'Network Defense', year: '2025' },
			{ name: 'Introduction to Cybersecurity', year: '2025' }
		]
	},
	{
		issuer: 'AWS',
		items: [
			{ name: 'Getting Started with Databases', year: '2025' },
			{ name: 'Getting Started with Serverless', year: '2025' },
			{ name: 'Introduction to Cloud 101', year: '2025' }
		]
	},
	{
		issuer: 'Python · Cisco',
		items: [
			{ name: 'Python Essentials 1', year: '2025' },
			{ name: 'Python Essentials 2', year: '2025' }
		]
	}
];

export const credentialCount = 15;

export const cases = [
	{
		name: 'Greenfil',
		tag: 'control de procesos',
		description:
			'Cliente Flutter contra backend C#/.NET: sincronización de estado, reportes y control de producción.',
		stack: ['Flutter', 'C#', '.NET'],
		links: [
			{ label: 'frontend', url: 'https://github.com/Anconeyra/Flutter-grenfil' },
			{ label: 'backend', url: 'https://github.com/Anconeyra/C-backend-greenfi' }
		]
	},
	{
		name: 'LiteConta-SUNAT',
		tag: 'contabilidad',
		description: 'Comprobantes y facturación electrónica con integración tributaria a SUNAT.',
		stack: ['PHP', 'Blade'],
		links: [{ label: 'repo', url: 'https://github.com/Anconeyra/LiteConta-SUNAT' }]
	},
	{
		name: 'Sistema de Evaluación',
		tag: 'plataforma full-stack',
		description: 'Banco de preguntas, postulantes, resultados y reportes de punta a punta.',
		stack: ['JavaScript', 'Python'],
		links: [
			{ label: 'frontend', url: 'https://github.com/Anconeyra/Fronted-M.Evaluacion' },
			{ label: 'backend', url: 'https://github.com/Anconeyra/Backend-M.Evaluacion' }
		]
	},
	{
		name: 'MOSS',
		tag: 'análisis de datos',
		description: 'Pipelines de limpieza y modelos estadísticos sobre datos operativos.',
		stack: ['Python', 'Data Analysis', 'ML'],
		links: [{ label: 'repo', url: 'https://github.com/Anconeyra/MOSS' }]
	},
	{
		name: 'CRM Django',
		tag: 'clientes',
		description: 'Clientes, oportunidades y seguimiento comercial sobre Django y PostgreSQL.',
		stack: ['Python', 'Django'],
		links: [{ label: 'repo', url: 'https://github.com/Anconeyra/Crm-Django' }]
	},
	{
		name: 'Gestión de Inventarios',
		tag: 'stock',
		description: 'Movimientos, existencias y alertas de reposición.',
		stack: ['HTML', 'CSS', 'JavaScript'],
		links: [{ label: 'repo', url: 'https://github.com/Anconeyra/Gesti-n-de-Inventarios' }]
	}
];

export const terminalBanner = [
	'frank@portfolio — sesión de verificación',
	'escriba "help" para ver los comandos',
	''
];

export const terminalCommands: Record<string, string | (() => string)> = {
	help: 'comandos: help, whoami, experiencia, casos, credenciales, contacto, neofetch, clear',
	whoami: 'frank — Full-Stack Developer & Cybersecurity Analyst · Arequipa, PE',
	experiencia:
		'05 puestos: Grupo Roberts (actual) · Peru Intercorp Corporation · Consejeros y Corredores de Seguros · Grupo Moss ×2',
	casos: '06 sistemas: Greenfil, LiteConta-SUNAT, Evaluación, MOSS, CRM Django, Inventarios',
	credenciales: '15+ credenciales — Cisco (CyberOps, Endpoint Security, Network Defense), AWS, Python',
	contacto: 'anconeyrafsuyo@gmail.com · github.com/Anconeyra · linkedin.com/in/frank-anconeyra',
	neofetch: [
		'        ./\\        frank@portfolio',
		'       /  \\       -----------------',
		'      / /\\ \\      rol       full-stack + security',
		'     / ____ \\     puesto    Grupo Roberts',
		'    /_/    \\_\\    base      Arequipa, PE',
		'                  estado    disponible'
	].join('\n'),
	date: () => new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
};
