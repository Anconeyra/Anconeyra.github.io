<script lang="ts">
	import { profile, credentialGroups } from '$lib/data';

	const practices = [
		{
			name: 'Análisis de tráfico',
			tools: 'Wireshark',
			desc: 'Captura y filtrado de paquetes para entender qué habla realmente un sistema.'
		},
		{
			name: 'Superficie de ataque',
			tools: 'OWASP Top 10',
			desc: 'Revisión de endpoints, autenticación y entradas antes de publicar.'
		},
		{
			name: 'Dependencias',
			tools: 'Snyk · npm audit',
			desc: 'Auditoría de paquetes y actualización de versiones vulnerables.'
		},
		{
			name: 'Endurecimiento',
			tools: 'Kali · Metasploit',
			desc: 'Configuración de servidor y red, y prueba de supuestos con herramientas ofensivas.'
		}
	];

	const cisco = credentialGroups.find((g) => g.issuer === 'Cisco')?.items ?? [];

	const pageFacts = [
		{ k: 'cookies', v: 'ninguna' },
		{ k: 'analítica', v: 'ninguna' },
		{ k: 'base de datos', v: 'ninguna' },
		{ k: 'formulario', v: 'abre WhatsApp, no envía datos' },
		{ k: 'peticiones externas', v: 'Google Fonts' }
	];
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Seguridad</h1>
		<p class="pane__note">práctica · Cisco CyberOps</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~$</b> cat seguridad.md</p>

	<p class="lede">
		La seguridad no es un módulo que se agrega al final: entra en el modelo de datos, la
		autenticación, las dependencias y el despliegue. Reviso lo que construyo antes de que lo
		revise alguien más.
	</p>

	<div class="sec__grid">
		{#each practices as p}
			<div class="sec__area">
				<h2 class="sec__name">{p.name}</h2>
				<p class="sec__tools">{p.tools}</p>
				<p class="sec__desc">{p.desc}</p>
			</div>
		{/each}
	</div>

	<div class="sec__split">
		<div>
			<h2 class="sec__label">Credenciales Cisco</h2>
			<ul>
				{#each cisco as item}
					<li class="cred__row">
						<span class="cred__name">{item.name}</span>
						<span class="cred__year">{item.year}</span>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h2 class="sec__label">Esta página, auditada</h2>
			<dl>
				{#each pageFacts as fact}
					<div class="spec__row">
						<dt class="spec__k">{fact.k}</dt>
						<dd class="spec__v">{fact.v}</dd>
					</div>
				{/each}
			</dl>
			<p class="sec__note">
				Sin trackers ni terceros más allá de las fuentes tipográficas. El correo se copia en el
				cliente: no pasa por ningún servidor.
			</p>
		</div>
	</div>

	<p class="sec__note">
		Contacto directo:
		<a class="link" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
		·
		<a class="link" href={profile.github} target="_blank" rel="noopener">GitHub ↗</a>
	</p>
</div>

<style>
	.sec__grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1rem, 2.4vw, 1.75rem);
	}

	@media (max-width: 620px) {
		.sec__grid {
			grid-template-columns: 1fr;
		}
	}

	.sec__area {
		padding-top: 0.6rem;
		border-top: 1px solid var(--win-line);
	}

	.sec__name {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--fg);
	}

	.sec__tools {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--accent);
		margin-top: 0.15rem;
		max-width: none;
	}

	.sec__desc {
		font-size: 0.75rem;
		line-height: 1.6;
		color: var(--fg-3);
		margin-top: 0.35rem;
		max-width: none;
	}

	.sec__split {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: clamp(1rem, 2.4vw, 1.75rem);
	}

	.sec__label {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--fg-3);
		padding-bottom: 0.45rem;
		border-bottom: 1px solid var(--win-line);
		margin-bottom: 0.15rem;
	}

	.sec__note {
		font-size: 0.6875rem;
		line-height: 1.6;
		color: var(--fg-3);
		margin-top: 0.6rem;
		max-width: 46ch;
	}
</style>
