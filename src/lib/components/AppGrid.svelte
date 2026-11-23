<script lang="ts">
	import AppIcon from './AppIcon.svelte';
	import { profile } from '$lib/data';

	type AppItem = { id: string; label: string; icon: string };

	let {
		open = $bindable(false),
		apps,
		onselect
	}: { open?: boolean; apps: AppItem[]; onselect: (id: string) => void } = $props();

	let query = $state('');
	let flash = $state('');
	let inputEl: HTMLInputElement | undefined = $state();

	const filtered = $derived(
		query.trim() === ''
			? apps
			: apps.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase()))
	);

	function close() {
		open = false;
		query = '';
	}

	function pick(id: string) {
		close();
		onselect(id);
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
			flash = 'correo copiado';
		} catch {
			flash = 'no se pudo copiar';
		}
		setTimeout(() => (flash = ''), 2000);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}

	$effect(() => {
		if (open) queueMicrotask(() => inputEl?.focus());
	});
</script>

{#if open}
	<div
		class="gridl"
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
		onkeydown={onKeydown}
	>
		<div class="gridl__panel" role="dialog" aria-modal="true" aria-label="Aplicaciones">
			<div class="gridl__search">
				<span aria-hidden="true" class="gridl__glass">⌕</span>
				<input
					bind:this={inputEl}
					bind:value={query}
					type="text"
					placeholder="Buscar aplicación…"
					aria-label="Buscar aplicación"
					autocomplete="off"
					spellcheck="false"
				/>
				<kbd>esc</kbd>
			</div>

			{#if flash}
				<p class="gridl__flash" role="status">{flash}</p>
			{/if}

			<ul class="gridl__apps">
				{#each filtered as app}
					<li>
						<button type="button" class="app" onclick={() => pick(app.id)}>
							<AppIcon id={app.icon} size={56} />
							<span class="app__label">{app.label}</span>
						</button>
					</li>
				{:else}
					<li class="gridl__empty">sin coincidencias</li>
				{/each}
			</ul>

			<div class="gridl__actions">
				<a class="pill" href="https://wa.me/{profile.whatsapp}" target="_blank" rel="noopener">
					WhatsApp <span aria-hidden="true">↗</span>
				</a>
				<button class="pill" type="button" onclick={copyEmail}>Copiar correo</button>
				<a class="pill" href={profile.github} target="_blank" rel="noopener">
					GitHub <span aria-hidden="true">↗</span>
				</a>
				<a class="pill" href={profile.linkedin} target="_blank" rel="noopener">
					LinkedIn <span aria-hidden="true">↗</span>
				</a>
				<span class="gridl__brand">Nyraroot Unix 1.1</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.gridl {
		position: fixed;
		inset: 0;
		z-index: 120;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: clamp(1.5rem, 4vh, 3rem) clamp(1rem, 4vw, 3rem) clamp(3rem, 9vh, 6rem);
		background: rgba(6, 9, 15, 0.86);
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
		animation: fade 160ms var(--ease) both;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.gridl__panel {
		width: min(880px, 100%);
	}

	.gridl__search {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: min(420px, 100%);
		margin: 0 auto 1.5rem;
		padding: 0.55rem 0.8rem;
		background: rgba(20, 24, 31, 0.9);
		border: 1px solid var(--win-line);
		border-radius: 100px;
	}

	.gridl__glass {
		color: var(--fg-3);
		font-size: 1rem;
	}

	.gridl__search input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: 0;
		outline: none;
		font-size: 0.875rem;
		color: var(--fg);
		caret-color: var(--accent);
	}

	.gridl__search input::placeholder {
		color: var(--fg-3);
	}

	.gridl__search kbd {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--fg-3);
		border: 1px solid var(--win-line);
		border-radius: 4px;
		padding: 0.05rem 0.3rem;
	}

	.gridl__flash {
		text-align: center;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--accent-2);
		margin-bottom: 0.9rem;
		max-width: none;
	}

	.gridl__apps {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
		gap: 0.5rem;
		justify-items: center;
	}

	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem 0.35rem;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 12px;
		cursor: pointer;
		transition:
			background var(--fast) var(--ease),
			border-color var(--fast) var(--ease),
			transform var(--fast) var(--ease);
	}

	.app:hover,
	.app:focus-visible {
		background: rgba(122, 162, 247, 0.12);
		border-color: rgba(122, 162, 247, 0.35);
		transform: translateY(-2px);
	}

	.app__label {
		font-size: 11.5px;
		color: rgba(234, 238, 247, 0.82);
		text-align: center;
		line-height: 1.25;
	}

	.gridl__empty {
		grid-column: 1 / -1;
		padding: 2rem;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--fg-3);
	}

	.gridl__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
		margin-top: 1.75rem;
		padding-top: 1.1rem;
		border-top: 1px solid rgba(234, 238, 247, 0.08);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.35rem 0.7rem;
		font-family: var(--mono);
		font-size: 10.5px;
		color: rgba(234, 238, 247, 0.7);
		background: transparent;
		border: 1px solid rgba(234, 238, 247, 0.14);
		border-radius: 100px;
		cursor: pointer;
		transition:
			color var(--fast) var(--ease),
			border-color var(--fast) var(--ease);
	}

	.pill:hover {
		color: var(--accent);
		border-color: rgba(122, 162, 247, 0.55);
	}

	.gridl__brand {
		margin-left: auto;
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		color: rgba(234, 238, 247, 0.3);
	}

	@media (max-width: 560px) {
		.gridl {
			padding-top: 2rem;
		}
		.gridl__apps {
			grid-template-columns: repeat(3, 1fr);
		}
		.gridl__brand {
			display: none;
		}
	}
</style>
