<script lang="ts">
	import AppIcon from './AppIcon.svelte';

	let { active, onselect }: { active: string; onselect: (id: string) => void } = $props();

	const icons = [
		{ id: 'perfil', label: 'Perfil', icon: 'user' },
		{ id: 'experiencia', label: 'Experiencia', icon: 'briefcase' },
		{ id: 'proyectos', label: 'Proyectos', icon: 'folder' },
		{ id: 'credenciales', label: 'Credenciales', icon: 'badge' },
		{ id: 'seguridad', label: 'Seguridad', icon: 'shield' },
		{ id: 'stack', label: 'Stack', icon: 'layers' },
		{ id: 'terminal', label: 'Terminal', icon: 'terminal' },
		{ id: 'archivos', label: 'Archivos', icon: 'folder' },
		{ id: 'monitor', label: 'Monitor', icon: 'activity' },
		{ id: 'manual', label: 'Manual', icon: 'book' },
		{ id: 'ajustes', label: 'Ajustes', icon: 'sliders' },
		{ id: 'contacto', label: 'Contacto', icon: 'mail' }
	];
</script>

<div class="dicons" role="list" aria-label="Accesos del escritorio">
	{#each icons as it}
		<div role="listitem">
			<button
				type="button"
				class="dicon"
				class:is-active={active === it.id}
				onclick={() => onselect(it.id)}
				aria-label="Abrir {it.label}"
				aria-current={active === it.id ? 'true' : undefined}
			>
				<AppIcon id={it.icon} size={38} />
				<span class="dicon__label">{it.label}</span>
			</button>
		</div>
	{/each}
</div>

<style>
	.dicon.is-active {
		background: rgba(122, 162, 247, 0.22);
		border-color: rgba(122, 162, 247, 0.45);
	}
</style>
