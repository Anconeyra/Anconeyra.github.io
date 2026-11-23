<script lang="ts">
	import { onMount } from 'svelte';

	type Wall = { id: string; label: string; hint: string };

	const walls: Wall[] = [
		{ id: 'nyraroot', label: 'Cordillera', hint: 'por defecto · Nyraroot' },
		{ id: 'aurora', label: 'Aurora', hint: 'degradado frío' },
		{ id: 'carbon', label: 'Carbón', hint: 'sin imagen' }
	];

	let wall = $state('nyraroot');

	onMount(() => {
		try {
			wall = localStorage.getItem('nyraroot:wall') || 'nyraroot';
		} catch {
			wall = 'nyraroot';
		}
		document.documentElement.dataset.wall = wall;
	});

	function setWall(id: string) {
		wall = id;
		document.documentElement.dataset.wall = id;
		try {
			localStorage.setItem('nyraroot:wall', id);
		} catch {
			/* private mode */
		}
	}

	function reset() {
		try {
			localStorage.clear();
			sessionStorage.clear();
		} catch {
			/* noop */
		}
		location.reload();
	}
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Ajustes</h1>
		<p class="pane__note">preferencias de la sesión</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~$</b> nyraroot-settings</p>

	<section class="block">
		<h2 class="block__h">Apariencia</h2>
		<p class="block__note">El fondo se guarda en este navegador.</p>

		<div class="walls" role="radiogroup" aria-label="Fondo de escritorio">
			{#each walls as w}
				<button
					type="button"
					class="wall"
					class:is-on={wall === w.id}
					role="radio"
					aria-checked={wall === w.id}
					onclick={() => setWall(w.id)}
				>
					<span class="wall__swatch" data-swatch={w.id} aria-hidden="true"></span>
					<span class="wall__text">
						<span class="wall__label">{w.label}</span>
						<span class="wall__hint">{w.hint}</span>
					</span>
					<span class="wall__check" aria-hidden="true">{wall === w.id ? '✓' : ''}</span>
				</button>
			{/each}
		</div>
	</section>

	<section class="block">
		<h2 class="block__h">Sistema</h2>
		<dl class="info">
			<div><dt>distribución</dt><dd>Nyraroot Unix 1.1 «Arequipa»</dd></div>
			<div><dt>kernel</dt><dd>6.8.0-nyraroot</dd></div>
			<div><dt>entorno</dt><dd>Nyraroot DE</dd></div>
			<div><dt>shell</dt><dd>zsh 5.9</dd></div>
			<div><dt>usuario</dt><dd>frank</dd></div>
			<div><dt>lenguaje</dt><dd>es-PE</dd></div>
		</dl>
	</section>

	<section class="block">
		<h2 class="block__h">Sesión</h2>
		<div class="row-actions">
			<button type="button" class="btn btn--ghost" onclick={() => location.reload()}>
				Recargar escritorio
			</button>
			<button type="button" class="btn btn--ghost btn--danger" onclick={reset}>
				Borrar preferencias
			</button>
		</div>
		<p class="block__note">
			Borrar preferencias elimina el fondo elegido y vuelve a mostrar la configuración de
			fábrica.
		</p>
	</section>
</div>

<style>
	.block {
		display: grid;
		gap: 0.55rem;
		padding-top: 0.85rem;
		border-top: 1px solid var(--win-line);
	}

	.block__h {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--fg-3);
	}

	.block__note {
		font-size: 0.75rem;
		color: var(--fg-3);
		max-width: 52ch;
	}

	.walls {
		display: grid;
		gap: 0.35rem;
	}

	.wall {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.45rem 0.55rem;
		background: transparent;
		border: 1px solid var(--win-line);
		border-radius: 7px;
		color: var(--fg-2);
		text-align: left;
		cursor: pointer;
		transition:
			border-color var(--fast) var(--ease),
			background var(--fast) var(--ease);
	}

	.wall:hover {
		border-color: rgba(122, 162, 247, 0.45);
		background: rgba(122, 162, 247, 0.08);
	}

	.wall.is-on {
		border-color: rgba(122, 162, 247, 0.7);
		background: rgba(122, 162, 247, 0.12);
	}

	.wall__swatch {
		width: 46px;
		height: 30px;
		border-radius: 4px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		flex: none;
	}

	.wall__swatch[data-swatch='nyraroot'] {
		background:
			url('/img/wallpaper.svg') center / cover no-repeat,
			#0a0f18;
	}

	.wall__swatch[data-swatch='aurora'] {
		background:
			radial-gradient(60px 40px at 30% 25%, rgba(122, 162, 247, 0.7), transparent 70%),
			radial-gradient(70px 50px at 75% 70%, rgba(158, 206, 106, 0.5), transparent 70%),
			#0b1020;
	}

	.wall__swatch[data-swatch='carbon'] {
		background:
			radial-gradient(70px 50px at 50% 35%, rgba(90, 100, 120, 0.45), transparent 70%),
			#0b0d10;
	}

	.wall__text {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.wall__label {
		font-size: 0.8125rem;
		color: var(--fg);
	}

	.wall__hint {
		font-family: var(--mono);
		font-size: 9.5px;
		color: var(--fg-3);
	}

	.wall__check {
		margin-left: auto;
		color: var(--accent-2);
		font-size: 0.8125rem;
	}

	.info {
		display: grid;
		gap: 0.1rem;
	}

	.info div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.32rem 0;
		border-bottom: 1px solid rgba(43, 51, 66, 0.6);
		font-family: var(--mono);
		font-size: 11px;
	}

	.info dt {
		color: var(--fg-3);
	}

	.info dd {
		color: var(--fg);
	}

	.row-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.btn--danger:hover {
		border-color: var(--danger);
		color: var(--danger);
	}
</style>
