<script lang="ts">
	import { experiences, cases, credentialGroups, competencies } from '$lib/data';

	let { onopen }: { onopen: (id: string) => void } = $props();

	const dirs = [
		{ id: 'perfil', name: 'perfil/', meta: 'identidad, resumen', perm: 'drwxr-xr-x' },
		{ id: 'experiencia', name: 'experiencia/', meta: `${experiences.length} puestos`, perm: 'drwxr-xr-x' },
		{ id: 'proyectos', name: 'proyectos/', meta: `${cases.length} repos`, perm: 'drwxr-xr-x' },
		{
			id: 'credenciales',
			name: 'credenciales/',
			meta: `${credentialGroups.reduce((n, g) => n + g.items.length, 0)} archivos`,
			perm: 'drwxr-xr-x'
		},
		{ id: 'seguridad', name: 'seguridad/', meta: 'prácticas, auditoría', perm: 'drwx------' },
		{ id: 'stack', name: 'stack/', meta: `${competencies.length} grupos`, perm: 'drwxr-xr-x' },
		{ id: 'contacto', name: 'contacto/', meta: 'canales directos', perm: 'drwxr-xr-x' }
	];
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Archivos</h1>
		<p class="pane__note">{dirs.length} directorios</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~$</b> ls -la</p>

	<nav class="crumb" aria-label="Ruta">
		<span class="crumb__seg">~</span>
		<span class="crumb__sep">/</span>
		<span class="crumb__cur">archivos</span>
	</nav>

	<ul class="files">
		{#each dirs as d}
			<li>
				<button type="button" class="file" onclick={() => onopen(d.id)}>
					<span class="file__perm">{d.perm}</span>
					<span class="file__name">{d.name}</span>
					<span class="file__meta">{d.meta}</span>
					<span class="file__go" aria-hidden="true">↗</span>
				</button>
			</li>
		{/each}
	</ul>

	<p class="hintline">
		<span class="faint">#</span> click o <kbd>tab</kbd> + <kbd>enter</kbd> para abrir · cada carpeta es una
		aplicación del escritorio
	</p>
</div>

<style>
	.crumb {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--fg-3);
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--win-line);
	}

	.crumb__cur {
		color: var(--fg);
	}

	.files {
		display: grid;
		gap: 2px;
	}

	.file {
		display: grid;
		grid-template-columns: 7.5rem 9rem minmax(0, 1fr) 1rem;
		gap: 0.75rem;
		align-items: baseline;
		width: 100%;
		padding: 0.35rem 0.45rem;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 5px;
		text-align: left;
		cursor: pointer;
		font-family: var(--mono);
		font-size: 11.5px;
		transition:
			background var(--fast) var(--ease),
			border-color var(--fast) var(--ease);
	}

	.file:hover,
	.file:focus-visible {
		background: rgba(122, 162, 247, 0.12);
		border-color: rgba(122, 162, 247, 0.3);
	}

	.file__perm {
		color: var(--fg-3);
	}

	.file__name {
		color: var(--accent);
	}

	.file__meta {
		color: var(--fg-3);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.file__go {
		color: var(--fg-3);
		text-align: right;
	}

	.hintline {
		font-family: var(--mono);
		font-size: 10.5px;
		color: var(--fg-3);
		max-width: none;
	}

	.hintline kbd {
		border: 1px solid var(--win-line);
		border-radius: 3px;
		padding: 0 0.25em;
		font-size: 9.5px;
	}

	@media (max-width: 620px) {
		.file {
			grid-template-columns: 1fr 1rem;
			gap: 0.15rem 0.5rem;
		}
		.file__perm,
		.file__meta {
			display: none;
		}
	}
</style>
