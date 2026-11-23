<script lang="ts">
	import AppIcon from './AppIcon.svelte';

	type App = { id: string; label: string; icon: string };

	let {
		active,
		apps,
		onselect
	}: { active: string; apps: App[]; onselect: (id: string) => void } = $props();

	const fallback: App[] = [
		{ id: 'terminal', label: 'Terminal', icon: 'terminal' },
		{ id: 'perfil', label: 'Perfil', icon: 'user' },
		{ id: 'experiencia', label: 'Experiencia', icon: 'briefcase' },
		{ id: 'proyectos', label: 'Proyectos', icon: 'folder' },
		{ id: 'credenciales', label: 'Credenciales', icon: 'badge' },
		{ id: 'seguridad', label: 'Seguridad', icon: 'shield' },
		{ id: 'stack', label: 'Stack', icon: 'layers' },
		{ id: 'contacto', label: 'Contacto', icon: 'mail' }
	];

	const list = $derived(apps?.length ? apps : fallback);
</script>

<div class="dockwrap">
	<nav class="dock" aria-label="Aplicaciones">
		{#each list as app, i}
			{#if i === 1}
				<span class="dock__sep" aria-hidden="true"></span>
			{/if}

			<button
				type="button"
				class="dock__btn"
				class:is-active={active === app.id}
				onclick={() => onselect(app.id)}
				aria-label="Abrir {app.label}"
				aria-current={active === app.id ? 'true' : undefined}
			>
				<AppIcon id={app.icon} />
				<span class="dock__label" aria-hidden="true">{app.label}</span>
			</button>
		{/each}
	</nav>
</div>
