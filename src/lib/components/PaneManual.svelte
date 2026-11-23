<script lang="ts">
	import { profile, experiences, cases } from '$lib/data';

	let { onopen }: { onopen: (id: string) => void } = $props();

	const seeAlso = [
		{ id: 'perfil', label: 'perfil(1)' },
		{ id: 'experiencia', label: 'experiencia(1)' },
		{ id: 'proyectos', label: 'proyectos(1)' },
		{ id: 'credenciales', label: 'credenciales(1)' },
		{ id: 'seguridad', label: 'seguridad(1)' },
		{ id: 'contacto', label: 'contacto(1)' }
	];
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Manual</h1>
		<p class="pane__note">man frank</p>
	</div>

	<article class="man">
		<p class="man__head">
			<span>FRANK(1)</span>
			<span>Manual del usuario</span>
			<span>FRANK(1)</span>
		</p>

		<h2 class="man__h">NOMBRE</h2>
		<p class="man__p">
			<strong>frank</strong> — desarrollador full-stack y analista de ciberseguridad.
		</p>

		<h2 class="man__h">SINOPSIS</h2>
		<p class="man__p">frank [--perfil] [--experiencia] [--proyectos] [--contacto]</p>

		<h2 class="man__h">DESCRIPCIÓN</h2>
		<p class="man__p">
			Construye sistemas de gestión completos —modelo de datos, API, interfaz y despliegue— y
			revisa la superficie de ataque de lo que construye. {experiences.length} puestos entre
			{experiences[experiences.length - 1].period.split('—')[0].trim()} y {new Date().getFullYear()},
			con {cases.length} sistemas de repositorio público.
		</p>
		<p class="man__p">
			Actualmente en <strong>{experiences[0].company}</strong> desde
			{experiences[0].period.split('—')[0].trim()}.
		</p>

		<h2 class="man__h">OPCIONES</h2>
		<dl class="man__dl">
			<div><dt>--perfil</dt><dd>Abre la identidad y el resumen.</dd></div>
			<div><dt>--experiencia</dt><dd>Lista los {experiences.length} puestos con fecha y rol.</dd></div>
			<div><dt>--proyectos</dt><dd>Muestra los {cases.length} sistemas con enlace al repositorio.</dd></div>
			<div><dt>--contacto</dt><dd>Abre el formulario y los canales directos.</dd></div>
		</dl>

		<h2 class="man__h">SISTEMA</h2>
		<dl class="man__dl">
			<div><dt>distribución</dt><dd>Nyraroot Unix 1.1 «Arequipa»</dd></div>
			<div><dt>kernel</dt><dd>6.8.0-nyraroot</dd></div>
			<div><dt>entorno</dt><dd>Nyraroot DE · ventana única</dd></div>
			<div><dt>shell</dt><dd>zsh 5.9</dd></div>
			<div><dt>usuario</dt><dd>frank</dd></div>
		</dl>

		<h2 class="man__h">ATAJOS</h2>
		<dl class="man__dl">
			<div><dt>1 … 8</dt><dd>Cambiar de aplicación.</dd></div>
			<div><dt>⌘K</dt><dd>Abrir el lanzador de aplicaciones.</dd></div>
			<div><dt>Esc</dt><dd>Cerrar la ventana activa.</dd></div>
			<div><dt>Doble click</dt><dd>Maximizar o restaurar la ventana.</dd></div>
		</dl>

		<h2 class="man__h">VER TAMBIÉN</h2>
		<p class="man__p man__links">
			{#each seeAlso as link, i}
				<button type="button" class="man__link" onclick={() => onopen(link.id)}>
					{link.label}
				</button>{#if i < seeAlso.length - 1}<span class="faint">, </span>{/if}
			{/each}
		</p>

		<p class="man__head man__head--foot">
			<span>{profile.name}</span>
			<span>2026</span>
			<span>FRANK(1)</span>
		</p>
	</article>
</div>

<style>
	.man {
		font-family: var(--mono);
		font-size: 11.5px;
		line-height: 1.75;
		color: var(--fg-2);
		max-width: 78ch;
	}

	.man__head {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		color: var(--fg-3);
		font-size: 10.5px;
		letter-spacing: 0.04em;
		border-bottom: 1px solid var(--win-line);
		padding-bottom: 0.4rem;
		margin-bottom: 0.9rem;
	}

	.man__head--foot {
		border-bottom: 0;
		border-top: 1px solid var(--win-line);
		padding-top: 0.4rem;
		margin-top: 1rem;
		margin-bottom: 0;
	}

	.man__h {
		font-family: var(--mono);
		font-size: 10.5px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		margin: 1rem 0 0.35rem;
	}

	.man__p {
		margin-bottom: 0.35rem;
		max-width: none;
	}

	.man__p strong {
		color: var(--fg);
		font-weight: 700;
	}

	.man__dl {
		display: grid;
		gap: 0.15rem;
	}

	.man__dl div {
		display: grid;
		grid-template-columns: 8.5rem minmax(0, 1fr);
		gap: 0.75rem;
	}

	.man__dl dt {
		color: var(--fg);
	}

	.man__dl dd {
		color: var(--fg-3);
	}

	.man__links {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.15rem;
	}

	.man__link {
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		color: var(--accent);
		text-decoration: underline;
		text-decoration-color: rgba(122, 162, 247, 0.4);
		text-underline-offset: 3px;
		cursor: pointer;
	}

	.man__link:hover {
		text-decoration-color: var(--accent);
	}

	@media (max-width: 560px) {
		.man__dl div {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.man__head span:nth-child(2) {
			display: none;
		}
	}
</style>
