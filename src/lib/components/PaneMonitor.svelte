<script lang="ts">
	import { onMount } from 'svelte';

	let rows = $state<{ k: string; v: string }[]>([
		{ k: 'plataforma', v: '…' },
		{ k: 'núcleos', v: '…' },
		{ k: 'memoria', v: '…' },
		{ k: 'pantalla', v: '…' },
		{ k: 'conexión', v: '…' },
		{ k: 'sesión', v: '…' }
	]);

	onMount(() => {
		const n = navigator as Navigator & {
			deviceMemory?: number;
			userAgentData?: { platform?: string };
			connection?: { effectiveType?: string };
		};

		const t0 = Date.now();

		const build = () => {
			const secs = Math.floor((Date.now() - t0) / 1000);
			const m = Math.floor(secs / 60);
			const s = secs % 60;
			rows = [
				{ k: 'plataforma', v: (n.userAgentData?.platform || navigator.platform || 'web').toString() },
				{ k: 'núcleos', v: n.hardwareConcurrency ? `${n.hardwareConcurrency} lógicos` : 'no expuesto' },
				{ k: 'memoria', v: n.deviceMemory ? `≈ ${n.deviceMemory} GB` : 'no expuesta' },
				{ k: 'pantalla', v: `${window.innerWidth}×${window.innerHeight}` },
				{ k: 'conexión', v: n.connection?.effectiveType ?? 'no expuesta' },
				{ k: 'sesión', v: m > 0 ? `${m}m ${s}s` : `${s}s` }
			];
		};

		build();
		const id = window.setInterval(build, 1000);
		return () => clearInterval(id);
	});
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Monitor</h1>
		<p class="pane__note">lecturas reales del dispositivo</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~$</b> htop --once</p>

	<div class="mono-head">
		<span>RECURSO</span>
		<span class="mono-head__v">VALOR</span>
	</div>

	<ul class="mono-rows">
		{#each rows as r, i}
			<li>
				<span class="mono-rows__i">{String(i + 1).padStart(2, '0')}</span>
				<span class="mono-rows__k">{r.k}</span>
				<span class="mono-rows__v">{r.v}</span>
			</li>
		{/each}
	</ul>

	<p class="hintline">
		<span class="faint">#</span> todo sale del navegador: algunas APIs de hardware son de grano
		grueso o no están expuestas, y se indica cuando faltan.
	</p>
</div>

<style>
	.mono-head {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr) auto;
		gap: 0.75rem;
		font-family: var(--mono);
		font-size: 9.5px;
		letter-spacing: 0.12em;
		color: var(--fg-3);
		padding-bottom: 0.4rem;
		border-bottom: 1px solid var(--win-line);
	}

	.mono-head span:first-child {
		grid-column: 2;
	}

	.mono-rows {
		display: grid;
	}

	.mono-rows li {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr) auto;
		gap: 0.75rem;
		align-items: baseline;
		padding: 0.42rem 0;
		border-bottom: 1px solid rgba(43, 51, 66, 0.6);
		font-family: var(--mono);
		font-size: 11.5px;
	}

	.mono-rows__i {
		color: var(--fg-3);
	}

	.mono-rows__k {
		color: var(--fg-3);
	}

	.mono-rows__v {
		color: var(--fg);
		text-align: right;
	}

	.hintline {
		font-family: var(--mono);
		font-size: 10.5px;
		line-height: 1.6;
		color: var(--fg-3);
		max-width: 62ch;
	}
</style>
