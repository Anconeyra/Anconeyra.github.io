<script lang="ts">
	import { onMount } from 'svelte';
	import { profile, experiences, cases, credentialCount } from '$lib/data';

	type Line = { kind: 'in' | 'out' | 'err' | 'ok'; text: string };

	let lines = $state<Line[]>([]);
	let input = $state('');
	let inputEl: HTMLInputElement | undefined = $state();
	let scroller: HTMLDivElement | undefined = $state();

	const art = ['      /\\', '     /  \\', '    / /\\ \\', '   / /  \\ \\', '  /_/    \\_\\'];

	const info = [
		['usuario', 'frank anconeyra'],
		['rol', 'full-stack + security'],
		['empresa', 'rsa creative hub (actual)'],
		['base', 'arequipa, perú'],
		['shell', 'zsh · neovim'],
		['stack', 'astro · nestjs · postgres · docker'],
		['estado', 'disponible']
	];

	const short = (p: string) =>
		p.replace('. ', '-').replace(' — ', ' → ').replace('actualidad', 'ahora');

	const COMMANDS: Record<string, string | (() => string)> = {
		help: 'comandos: help · whoami · experiencia · casos · credenciales · contacto · neofetch · clear',
		whoami: `${profile.name} — ${profile.role} & ${profile.roleSecondary} · Arequipa, PE`,
		experiencia: experiences
			.map((j) => `${short(j.period).padEnd(22)}${j.company}`)
			.join('\n'),
		casos: cases.map((c) => `${c.name} — ${c.stack.join(', ')}`).join('\n'),
		credenciales: `${credentialCount}+ credenciales — Cisco (CyberOps, Endpoint Security, Network Defense), AWS, Python`,
		contacto: `${profile.email} · ${profile.githubHandle} · ${profile.linkedinHandle}`,
		neofetch: `${profile.name}\n${profile.role} & ${profile.roleSecondary}\n${profile.location}`,
		date: () => new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
	};

	function run(raw: string) {
		const cmd = raw.trim().toLowerCase().split(/\s+/)[0];
		if (!cmd) return;

		lines = [...lines, { kind: 'in', text: raw }];

		if (cmd === 'clear') {
			lines = [];
			return;
		}

		const entry = COMMANDS[cmd];
		if (entry === undefined) {
			lines = [
				...lines,
				{ kind: 'err', text: `command not found: ${cmd} — escriba "help"` }
			];
		} else {
			lines = [...lines, { kind: 'out', text: typeof entry === 'function' ? entry() : entry }];
		}
	}

	function submit(e: Event) {
		e.preventDefault();
		run(input);
		input = '';
	}

	$effect(() => {
		if (scroller && lines.length) scroller.scrollTop = scroller.scrollHeight;
	});

	onMount(() => {
		// no autofocus: the desktop's number shortcuts must stay usable
	});
</script>

<div class="term">
	<div class="archey">
		<pre class="archey__art" aria-hidden="true">{art.join('\n')}</pre>

		<dl class="archey__info">
			{#each info as [k, v]}
				<div class="archey__row">
					<dt>{k}</dt>
					<dd class:ok={k === 'estado'}>{v}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<div class="term__body" bind:this={scroller}>
		<p class="term__line term__line--in">
			<span class="term__prompt">frank@portfolio:~$</span>experiencia --list
		</p>

		<ul class="eplist">
			{#each experiences as job}
				<li class="eprow">
					<span class="eprow__when">{short(job.period)}</span>
					<span class="eprow__co">{job.company.toLowerCase()}</span>
					<span class="eprow__role">{job.role.toLowerCase()}</span>
				</li>
			{/each}
		</ul>

		<p class="term__line term__line--ok">
			{#if experiences[0]?.current}↳ puesto vigente: {experiences[0].company} · {experiences[0].role}{/if}
		</p>

		{#each lines as line, i (i)}
			<p
				class="term__line"
				class:term__line--in={line.kind === 'in'}
				class:term__line--err={line.kind === 'err'}
			>
				{#if line.kind === 'in'}
					<span class="term__prompt">frank@portfolio:~$</span>
				{/if}
				<span>{line.text}</span>
			</p>
		{/each}
	</div>

	<form class="term__form" onsubmit={submit}>
		<label class="sr-only" for="term-input">Comando de la terminal</label>
		<span class="term__prompt" aria-hidden="true">frank@portfolio:~$</span>
		<input
			bind:this={inputEl}
			bind:value={input}
			id="term-input"
			class="term__input"
			type="text"
			autocapitalize="off"
			spellcheck="false"
			placeholder="help"
			aria-describedby="term-help"
		/>
	</form>

	<div class="term__chips" id="term-help">
		{#each ['help', 'neofetch', 'casos', 'contacto', 'clear'] as cmd}
			<button
				type="button"
				class="term__chip"
				onclick={() => {
					run(cmd);
					inputEl?.focus();
				}}
			>
				{cmd}
			</button>
		{/each}
	</div>
</div>

<style>
	.term {
		font-family: var(--mono);
		font-size: 12px;
		line-height: 1.72;
		color: var(--fg-2);
	}

	.archey {
		display: flex;
		gap: clamp(1rem, 3vw, 2.25rem);
		align-items: center;
		margin-bottom: 1.1rem;
	}

	.archey__art {
		margin: 0;
		font-family: var(--mono);
		font-size: 11px;
		line-height: 1.28;
		color: var(--accent);
		text-shadow: 0 0 14px rgba(122, 162, 247, 0.35);
		flex: none;
	}

	.archey__info {
		display: grid;
		gap: 0.1rem;
		min-width: 0;
	}

	.archey__row {
		display: flex;
		gap: 0.75rem;
		font-size: 12px;
	}

	.archey__row dt {
		color: var(--fg-3);
		min-width: 4.75rem;
	}

	.archey__row dd {
		color: var(--fg);
	}

	.archey__row dd.ok {
		color: var(--accent-2);
	}

	.term__body {
		max-height: 300px;
		overflow-y: auto;
	}

	.eplist {
		display: grid;
		gap: 0.05rem;
		margin: 0.1rem 0 0.35rem;
	}

	.eprow {
		display: grid;
		grid-template-columns: 10.5rem 16rem minmax(0, 1fr);
		gap: 0.6rem;
		font-size: 12px;
		color: var(--fg-3);
	}

	.eprow__when {
		color: var(--fg-3);
	}

	.eprow__co {
		color: var(--accent);
	}

	.eprow__role {
		color: var(--fg-2);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@media (max-width: 780px) {
		.archey {
			align-items: flex-start;
		}
		.archey__art {
			font-size: 10px;
		}
		.archey__row dt {
			min-width: 4rem;
		}
		.eprow {
			grid-template-columns: 1fr;
			gap: 0;
			padding-block: 0.2rem;
			border-bottom: 1px solid rgba(43, 51, 66, 0.5);
		}
		.eprow__role {
			white-space: normal;
			overflow: visible;
			text-overflow: clip;
		}
	}

	@media (max-width: 460px) {
		.archey__art {
			display: none;
		}
	}
</style>
