<script lang="ts">
	import { onMount } from 'svelte';

	const DOW = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

	let title = $state('');
	let cells = $state<(number | null)[]>([]);
	let today = $state(-1);

	onMount(() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth();

		title = new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric' })
			.format(now)
			.replace(/^\w/, (c) => c.toUpperCase());

		const first = new Date(year, month, 1);
		const offset = (first.getDay() + 6) % 7;
		const days = new Date(year, month + 1, 0).getDate();

		const out: (number | null)[] = Array.from({ length: offset }, () => null);
		for (let d = 1; d <= days; d++) out.push(d);
		while (out.length % 7 !== 0) out.push(null);

		cells = out;
		today = now.getDate();
	});
</script>

<aside class="dcal" aria-label="Calendario">
	<p class="dcal__title">{title}</p>

	<div class="dcal__grid dcal__dow" aria-hidden="true">
		{#each DOW as d}<span>{d}</span>{/each}
	</div>

	<div class="dcal__grid">
		{#each cells as c}
			<span class="dcal__day" class:is-today={c === today} class:is-empty={c === null}>
				{c ?? ''}
			</span>
		{/each}
	</div>
</aside>

<style>
	.dcal {
		position: absolute;
		top: 244px;
		right: 22px;
		z-index: 2;
		width: 168px;
		padding: 0.65rem 0.8rem 0.8rem;
		background: rgba(8, 12, 19, 0.34);
		border: 1px solid rgba(234, 238, 247, 0.07);
		border-radius: 8px;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		font-family: var(--mono);
		font-size: 10px;
		color: rgba(234, 238, 247, 0.7);
		pointer-events: none;
	}

	.dcal__title {
		font-size: 10.5px;
		letter-spacing: 0.06em;
		color: rgba(234, 238, 247, 0.85);
		margin-bottom: 0.5rem;
		max-width: none;
	}

	.dcal__grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
	}

	.dcal__dow span {
		color: rgba(234, 238, 247, 0.32);
		padding-bottom: 0.2rem;
	}

	.dcal__day {
		padding: 0.14rem 0;
		color: rgba(234, 238, 247, 0.68);
	}

	.dcal__day.is-empty {
		color: transparent;
	}

	.dcal__day.is-today {
		color: #0a0f18;
		background: var(--accent-2);
		border-radius: 4px;
		font-weight: 700;
	}

	@media (max-width: 1360px) {
		.dcal {
			display: none;
		}
	}
</style>
