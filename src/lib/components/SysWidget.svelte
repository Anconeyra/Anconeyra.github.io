<script lang="ts">
	import { onMount } from 'svelte';

	let cores = $state('—');
	let mem = $state('—');
	let screen = $state('—');
	let uptime = $state('0s');

	onMount(() => {
		const n = navigator as Navigator & { deviceMemory?: number };
		cores = n.hardwareConcurrency ? `${n.hardwareConcurrency} lógicos` : 'no expuesto';
		mem = n.deviceMemory ? `≈ ${n.deviceMemory} GB` : 'no expuesta';

		const t0 = Date.now();
		const tick = () => {
			const secs = Math.floor((Date.now() - t0) / 1000);
			const m = Math.floor(secs / 60);
			const s = secs % 60;
			uptime = m > 0 ? `${m}m ${s}s` : `${s}s`;
			screen = `${window.innerWidth}×${window.innerHeight}`;
		};
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<aside class="conky" aria-label="Información del sistema">
	<p class="conky__head">nyraroot@frank</p>
	<hr />
	<dl>
		<div><dt>sistema</dt><dd>Nyraroot Unix 1.1</dd></div>
		<div><dt>kernel</dt><dd>6.8.0-nyraroot</dd></div>
		<div><dt>escritorio</dt><dd>Nyraroot DE</dd></div>
		<div><dt>shell</dt><dd>zsh 5.9</dd></div>
		<div><dt>núcleos</dt><dd>{cores}</dd></div>
		<div><dt>memoria</dt><dd>{mem}</dd></div>
		<div><dt>pantalla</dt><dd>{screen}</dd></div>
		<div><dt>sesión</dt><dd>{uptime}</dd></div>
	</dl>
</aside>

<style>
	.conky {
		position: absolute;
		top: 48px;
		right: 22px;
		z-index: 2;
		width: 190px;
		padding: 0.65rem 0.85rem 0.75rem;
		font-family: var(--mono);
		font-size: 10.5px;
		line-height: 1.6;
		color: rgba(234, 238, 247, 0.72);
		background: rgba(8, 12, 19, 0.36);
		border: 1px solid rgba(234, 238, 247, 0.07);
		border-radius: 8px;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		pointer-events: none;
	}

	.conky__head {
		color: var(--accent-2);
		margin: 0;
		max-width: none;
	}

	hr {
		border: 0;
		height: 1px;
		background: rgba(234, 238, 247, 0.1);
		margin: 0.3rem 0 0.35rem;
	}

	dt {
		color: rgba(234, 238, 247, 0.4);
	}

	dl div {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
	}

	dd {
		color: rgba(234, 238, 247, 0.84);
		text-align: right;
	}

	@media (max-width: 1360px) {
		.conky {
			display: none;
		}
	}
</style>
