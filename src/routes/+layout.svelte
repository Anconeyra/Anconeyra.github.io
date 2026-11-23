<script lang="ts">
	import '../app.css';
	import { profile, cases, experiences, credentialCount } from '$lib/data';

	let { children } = $props();

	const title = `${profile.name} — Full-Stack Developer & Cybersecurity Analyst`;
	const description = `${profile.name}, ${profile.role} y ${profile.roleSecondary} en ${profile.location}. ${experiences.length} empresas, ${cases.length} sistemas en producción, ${credentialCount}+ credenciales.`;

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: profile.name,
		jobTitle: `${profile.role} & ${profile.roleSecondary}`,
		email: `mailto:${profile.email}`,
		telephone: profile.phone,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Arequipa',
			addressCountry: 'PE'
		},
		worksFor: { '@type': 'Organization', name: experiences[0].company },
		sameAs: [profile.github, profile.linkedin, profile.credly],
		knowsAbout: [
			'Full-stack development',
			'Cybersecurity',
			'Astro',
			'NestJS',
			'PostgreSQL',
			'Docker',
			'Kotlin',
			'Angular',
			'C#'
		],
		hasCredential: `${credentialCount}+ professional credentials (Cisco, AWS)`,
		workExample: cases.map((c) => ({
			'@type': 'CreativeWork',
			name: c.name,
			description: c.description,
			url: c.links[0]?.url
		}))
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content="es_PE" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<a class="skip" href="#contenido">Saltar al contenido</a>

<main id="contenido">{@render children()}</main>
