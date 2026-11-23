<script lang="ts">
	import { competencies } from '$lib/data';
	import { techIcons } from '$lib/techicons';

	function tone(hex: string) {
		const r = parseInt(hex.slice(1, 3), 16) / 255;
		const g = parseInt(hex.slice(3, 5), 16) / 255;
		const b = parseInt(hex.slice(5, 7), 16) / 255;
		const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
		return lum > 0.2 ? hex : 'var(--fg-2)';
	}
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Stack</h1>
		<p class="pane__note">declarado según uso real en los puestos</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~$</b> which --all</p>

	<div class="cols">
		{#each competencies as group}
			<div>
				<h2 class="stack__area">{group.area}</h2>
				<ul class="stack__items">
					{#each group.items as item}
						{@const ico = techIcons[item]}
						<li class="stack__item">
							{#if ico}
								<span class="stack__ico" style="color:{tone(ico.hex)}">
									<svg viewBox={ico.vb} aria-hidden="true">
										{#each ico.d as d}
											<path {d} />
										{/each}
									</svg>
								</span>
							{/if}
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>

<style>
	.stack__items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.stack__item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.2rem 0.5rem 0.2rem 0.42rem;
		border: 1px solid var(--win-line);
		border-radius: 6px;
		background: rgba(231, 234, 242, 0.035);
		font-size: 0.75rem;
		color: var(--fg-2);
		transition:
			border-color var(--fast) var(--ease),
			background var(--fast) var(--ease);
	}

	.stack__item:hover {
		border-color: rgba(122, 162, 247, 0.45);
		background: rgba(122, 162, 247, 0.08);
	}

	.stack__ico {
		display: inline-flex;
		width: 14px;
		height: 14px;
		flex: none;
	}

	.stack__ico svg {
		width: 100%;
		height: 100%;
		fill: currentColor;
	}
</style>
