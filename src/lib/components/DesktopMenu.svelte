<script lang="ts">
	type Item = { label: string; hint?: string; run: () => void; disabled?: boolean };

	let {
		open = false,
		x = 0,
		y = 0,
		items = [],
		onclose
	}: { open?: boolean; x?: number; y?: number; items?: Item[]; onclose: () => void } = $props();
</script>

{#if open}
	<div
		class="ctx-scrim"
		role="presentation"
		onclick={onclose}
		oncontextmenu={(e) => {
			e.preventDefault();
			onclose();
		}}
	></div>
	<ul class="ctx" role="menu" style="left:{x}px; top:{y}px" aria-label="Menú del escritorio">
		{#each items as item}
			<li role="none">
				<button
					type="button"
					role="menuitem"
					class="ctx__item"
					disabled={item.disabled}
					onclick={() => {
						item.run();
						onclose();
					}}
				>
					<span>{item.label}</span>
					{#if item.hint}<span class="ctx__hint">{item.hint}</span>{/if}
				</button>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.ctx-scrim {
		position: fixed;
		inset: 0;
		z-index: 60;
	}

	.ctx {
		position: fixed;
		z-index: 61;
		min-width: 13.5rem;
		padding: 0.3rem;
		background: var(--win-2);
		border: 1px solid var(--win-line);
		border-radius: 8px;
		box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
	}

	.ctx__item {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		padding: 0.4rem 0.55rem;
		background: transparent;
		border: 0;
		border-radius: 5px;
		color: var(--fg-2);
		font-size: 12px;
		text-align: left;
		cursor: pointer;
	}

	.ctx__item:hover:not(:disabled) {
		background: rgba(122, 162, 247, 0.18);
		color: var(--fg);
	}

	.ctx__item:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.ctx__hint {
		font-family: var(--mono);
		font-size: 10px;
		color: var(--fg-3);
	}
</style>
