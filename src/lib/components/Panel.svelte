<script lang="ts">
	type Props = {
		title: string;
		hasTask?: boolean;
		minimized: boolean;
		clock: string;
		dateLabel: string;
		onMenu: () => void;
		onTask: () => void;
		onMonitor?: () => void;
	};

	let {
		title,
		hasTask = true,
		minimized,
		clock,
		dateLabel,
		onMenu,
		onTask,
		onMonitor
	}: Props = $props();
</script>

<header class="panel">
	<button class="panel__menu" type="button" onclick={onMenu} aria-label="Abrir menú de aplicaciones — Nyraroot Unix" title="Nyraroot Unix 1.1">
		<svg
			class="panel__mark"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M12 3 2.5 21h19L12 3Z" />
			<path d="M12 9.5 7.5 19h9L12 9.5Z" />
		</svg>
		<span class="panel__menu-label">Aplicaciones</span>
	</button>

	<div class="panel__tasks">
		{#if hasTask}
			<button
				class="task"
				class:is-min={minimized}
				type="button"
				onclick={onTask}
				aria-pressed={!minimized}
				aria-label="Ventana: {title}. {minimized ? 'Restaurar' : 'Minimizar'}"
			>
				<span class="task__dot" aria-hidden="true"></span>
				<span class="task__label">{title}</span>
			</button>
		{/if}
	</div>

	<div class="panel__tray">
		<button
			class="tray__btn"
			type="button"
			onclick={() => onMonitor?.()}
			aria-label="Abrir el monitor del sistema"
			title="Monitor del sistema"
		>
			<svg class="tray__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M3 12h3.5l2.5-6 3 12 2.5-6H21" />
			</svg>
		</button>

		<svg class="tray__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
			<path d="M2.5 8.5a16 16 0 0 1 19 0" />
			<path d="M6 12.5a10.5 10.5 0 0 1 12 0" />
			<path d="M9.5 16.4a5 5 0 0 1 5 0" />
			<circle cx="12" cy="19.6" r="1" fill="currentColor" stroke="none" />
		</svg>

		<svg class="tray__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M4 9.5h3l4.5-3.5v12L7 14.5H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" />
			<path d="M15.5 9a4 4 0 0 1 0 6" />
			<path d="M18 7a7.5 7.5 0 0 1 0 10" />
		</svg>

		<span class="tray__clock">
			<span class="sr-only">Hora: </span>{clock}
			<span class="tray__date" aria-hidden="true">{dateLabel}</span>
		</span>
	</div>
</header>

<style>
	.task.is-min {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.12);
		color: rgba(234, 238, 247, 0.55);
	}

	.task.is-min .task__dot {
		background: rgba(234, 238, 247, 0.4);
	}
</style>
