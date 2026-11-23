<script lang="ts">
	import { onMount } from 'svelte';

	export type MenuItem = { label: string; hint?: string; run: () => void };
	export type Menu = { label: string; items: MenuItem[] };

	type Props = {
		title: string;
		icon?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		status?: import('svelte').Snippet;
		menus?: Menu[];
		maximized?: boolean;
		minimized?: boolean;
		onclose?: () => void;
	};

	let {
		title,
		icon,
		children,
		status,
		menus = [],
		maximized = $bindable(false),
		minimized = $bindable(false),
		onclose
	}: Props = $props();

	let navEl: HTMLElement | undefined = $state();

	let dx = $state(0);
	let dy = $state(0);
	let dragging = $state(false);
	let sx = 0;
	let sy = 0;
	let ox = 0;
	let oy = 0;

	function dragStart(e: PointerEvent) {
		if ((e.target as HTMLElement).closest('button')) return;
		if (window.matchMedia('(max-width: 700px)').matches) return;
		dragging = true;
		sx = e.clientX;
		sy = e.clientY;
		ox = dx;
		oy = dy;
		(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
	}

	function dragMove(e: PointerEvent) {
		if (!dragging) return;
		const maxX = window.innerWidth / 2 - 140;
		const maxY = window.innerHeight / 2 - 120;
		dx = Math.max(-maxX, Math.min(maxX, ox + (e.clientX - sx)));
		dy = Math.max(-maxY, Math.min(maxY, oy + (e.clientY - sy)));
	}

	function dragEnd() {
		dragging = false;
	}

	function choose(e: MouseEvent, item: MenuItem) {
		item.run();
		const details = (e.currentTarget as HTMLElement).closest('details');
		details?.removeAttribute('open');
	}

	onMount(() => {
		const onDoc = (e: PointerEvent) => {
			if (!navEl) return;
			if (!navEl.contains(e.target as Node)) {
				navEl.querySelectorAll('details[open]').forEach((d) => d.removeAttribute('open'));
			}
		};
		document.addEventListener('pointerdown', onDoc);
		return () => document.removeEventListener('pointerdown', onDoc);
	});
</script>

<section
	class="win"
	class:win--max={maximized}
	aria-label={title}
	style="transform: translate({dx}px, {dy}px)"
>
	<div
		class="win__bar"
		class:is-dragging={dragging}
		onpointerdown={dragStart}
		onpointermove={dragMove}
		onpointerup={dragEnd}
		onpointercancel={dragEnd}
		ondblclick={() => (maximized = !maximized)}
		role="presentation"
	>
		<span class="win__icon" aria-hidden="true">{@render icon?.()}</span>

		<p class="win__title">{title}</p>

		<div class="win__ctrls">
			<button
				class="win__btn"
				type="button"
				onclick={() => (minimized = !minimized)}
				aria-label={minimized ? 'Restaurar ventana' : 'Minimizar ventana'}
				aria-expanded={!minimized}
			>
				<span aria-hidden="true">{minimized ? '▢' : '–'}</span>
			</button>
			<button
				class="win__btn"
				type="button"
				onclick={() => (maximized = !maximized)}
				aria-label={maximized ? 'Restaurar tamaño' : 'Maximizar ventana'}
				aria-pressed={maximized}
			>
				<span aria-hidden="true">{maximized ? '❐' : '□'}</span>
			</button>
			<button
				class="win__btn win__btn--close"
				type="button"
				onclick={() => onclose?.()}
				aria-label="Cerrar ventana"
			>
				<span aria-hidden="true">×</span>
			</button>
		</div>
	</div>

	{#if !minimized}
		{#if menus.length}
			<nav class="menubar" bind:this={navEl} aria-label="Menú de la ventana">
				{#each menus as menu}
					<details class="menu">
						<summary class="menu__btn">{menu.label}</summary>
						<ul class="menu__list">
							{#each menu.items as item}
								<li>
									<button type="button" class="menu__item" onclick={(e) => choose(e, item)}>
										<span>{item.label}</span>
										{#if item.hint}<span class="menu__hint">{item.hint}</span>{/if}
									</button>
								</li>
							{/each}
						</ul>
					</details>
				{/each}
			</nav>
		{/if}

		<div class="win__body">
			<div class="win__pad">
				{@render children?.()}
			</div>
		</div>

		{#if status}
			<div class="win__status">{@render status()}</div>
		{/if}
	{/if}
</section>

<style>
	.win__bar {
		cursor: grab;
		touch-action: none;
	}

	.win__bar.is-dragging {
		cursor: grabbing;
	}

	.menubar {
		position: relative;
		z-index: 4;
		display: flex;
		align-items: stretch;
		height: 26px;
		padding-inline: 0.35rem;
		background: var(--win-2);
		border-bottom: 1px solid var(--win-line);
		flex: none;
	}

	.menu {
		position: relative;
	}

	.menu__btn {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 0.55rem;
		font-size: 11.5px;
		color: var(--fg-2);
		cursor: default;
		list-style: none;
		border-radius: 4px;
		user-select: none;
	}

	.menu__btn::-webkit-details-marker {
		display: none;
	}

	.menu__btn:hover,
	.menu[open] .menu__btn {
		background: var(--win-3);
		color: var(--fg);
	}

	.menu__list {
		position: absolute;
		top: 100%;
		left: 0;
		min-width: 13rem;
		padding: 0.3rem;
		background: var(--win-2);
		border: 1px solid var(--win-line);
		border-radius: 7px;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
		z-index: 20;
	}

	.menu__item {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		text-align: left;
		padding: 0.4rem 0.5rem;
		background: transparent;
		border: 0;
		border-radius: 4px;
		font-size: 12px;
		color: var(--fg-2);
		cursor: pointer;
	}

	.menu__item:hover {
		background: rgba(122, 162, 247, 0.16);
		color: var(--fg);
	}

	.menu__hint {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--fg-3);
	}
</style>
