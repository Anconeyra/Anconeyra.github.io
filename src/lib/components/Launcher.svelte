<script lang="ts">
	import { profile } from '$lib/data';

	let { open = $bindable(false), apps, onselect }: {
		open?: boolean;
		apps: { id: string; label: string }[];
		onselect: (id: string) => void;
	} = $props();

	let query = $state('');
	let cursor = $state(0);
	let flash = $state('');
	let inputEl: HTMLInputElement | undefined = $state();

	type Item = { id: string; label: string; hint: string; run: () => void };

	const items = $derived<Item[]>([
		...apps.map((a) => ({
			id: `app-${a.id}`,
			label: a.label,
			hint: 'abrir ventana',
			run: () => {
				close();
				onselect(a.id);
			}
		})),
		{
			id: 'wa',
			label: 'Escribir por WhatsApp',
			hint: 'acción',
			run: () => {
				close();
				window.open(
					`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
						'Hola Frank, vi tu portafolio y quiero conversar.'
					)}`,
					'_blank',
					'noopener'
				);
			}
		},
		{
			id: 'mail',
			label: 'Copiar correo',
			hint: profile.email,
			run: async () => {
				try {
					await navigator.clipboard.writeText(profile.email);
					flash = `${profile.email} copiado`;
				} catch {
					flash = 'no se pudo copiar';
				}
				setTimeout(() => (flash = ''), 2200);
			}
		},
		{
			id: 'gh',
			label: 'GitHub',
			hint: profile.githubHandle,
			run: () => {
				close();
				window.open(profile.github, '_blank', 'noopener');
			}
		}
	]);

	const filtered = $derived(
		query.trim() === ''
			? items
			: items.filter((i) =>
					(i.label + ' ' + i.hint).toLowerCase().includes(query.trim().toLowerCase())
				)
	);

	function close() {
		open = false;
		query = '';
		cursor = 0;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			cursor = Math.min(cursor + 1, filtered.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			cursor = Math.max(cursor - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			filtered[cursor]?.run();
		}
	}

	$effect(() => {
		if (open) queueMicrotask(() => inputEl?.focus());
		else cursor = 0;
	});

	$effect(() => {
		if (cursor > filtered.length - 1) cursor = Math.max(0, filtered.length - 1);
	});
</script>

{#if open}
	<div
		class="scrim"
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
	>
		<div class="lch" role="dialog" aria-modal="true" aria-label="Buscar aplicación o acción">
			<div class="lch__bar">
				<span aria-hidden="true" style="color:var(--accent)">❯</span>
				<input
					bind:this={inputEl}
					bind:value={query}
					onkeydown={onKeydown}
					type="text"
					placeholder="buscar aplicación o acción…"
					aria-label="Buscar aplicación o acción"
					autocomplete="off"
					spellcheck="false"
				/>
				<kbd>esc</kbd>
			</div>

			{#if flash}
				<p class="lch__flash" role="status">{flash}</p>
			{/if}

			<ul role="listbox" aria-label="Resultados">
				{#each filtered as item, i}
					<li>
						<button
							type="button"
							role="option"
							aria-selected={i === cursor}
							class="lch__row"
							class:is-cur={i === cursor}
							onmouseenter={() => (cursor = i)}
							onclick={item.run}
						>
							<span class="lch__label">{item.label}</span>
							<span class="lch__hint">{item.hint}</span>
						</button>
					</li>
				{:else}
					<li class="lch__empty">sin coincidencias</li>
				{/each}
			</ul>

			<div class="lch__foot">
				<span>↑ ↓ mover</span>
				<span>↵ ejecutar</span>
				<span style="margin-left:auto">Nyraroot Unix 1.1</span>
			</div>
		</div>
	</div>
{/if}
