<script lang="ts">
	import { onMount } from 'svelte';

	let time = $state('··:··');
	let date = $state('');
	let ready = $state(false);

	onMount(() => {
		const tick = () => {
			const now = new Date();
			time = new Intl.DateTimeFormat('es-PE', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
				timeZone: 'America/Lima'
			}).format(now);
			date = new Intl.DateTimeFormat('es-PE', {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				timeZone: 'America/Lima'
			})
				.format(now)
				.replace(/^\p{L}/u, (c) => c.toUpperCase());
			ready = true;
		};
		tick();
		const id = window.setInterval(tick, 15000);
		return () => clearInterval(id);
	});

</script>

<div class="dclock" class:is-ready={ready}>
	<p class="dclock__os" aria-hidden="true">Nyraroot Unix 1.1</p>
	<p class="dclock__time" aria-hidden="true">{time}</p>
	<p class="dclock__date" aria-hidden="true">{date}</p>


</div>

<style>
	.dclock {
		position: absolute;
		left: 50%;
		top: clamp(96px, 20vh, 210px);
		transform: translateX(-50%);
		z-index: 2;
		text-align: center;
		opacity: 0;
		transition: opacity 600ms var(--ease);
	}

	.dclock.is-ready {
		opacity: 1;
	}

	.dclock__os {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: rgba(234, 238, 247, 0.42);
		margin-bottom: 0.3rem;
		max-width: none;
		pointer-events: none;
	}

	.dclock__time {
		font-family: var(--mono);
		font-size: clamp(3rem, 7.4vw, 5rem);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
		color: rgba(240, 245, 255, 0.92);
		text-shadow: 0 2px 26px rgba(0, 0, 0, 0.5);
		max-width: none;
		pointer-events: none;
	}

	.dclock__date {
		font-size: 0.875rem;
		color: rgba(234, 238, 247, 0.55);
		margin-top: 0.3rem;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
		max-width: none;
		pointer-events: none;
	}

	

	

	

	

	

	@media (max-width: 900px) {
		.dclock {
			display: none;
		}
	}
</style>
