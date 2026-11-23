<script lang="ts">
	import { onMount } from 'svelte';
	import Window from '$lib/components/Window.svelte';
	import Dock from '$lib/components/Dock.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import DesktopIcons from '$lib/components/DesktopIcons.svelte';
	import DesktopMenu from '$lib/components/DesktopMenu.svelte';
	import SysWidget from '$lib/components/SysWidget.svelte';
	import DesktopClock from '$lib/components/DesktopClock.svelte';
	import DesktopCalendar from '$lib/components/DesktopCalendar.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import PanePerfil from '$lib/components/PanePerfil.svelte';
	import PaneExperiencia from '$lib/components/PaneExperiencia.svelte';
	import PaneProyectos from '$lib/components/PaneProyectos.svelte';
	import PaneCredenciales from '$lib/components/PaneCredenciales.svelte';
	import PaneSeguridad from '$lib/components/PaneSeguridad.svelte';
	import PaneArchivos from '$lib/components/PaneArchivos.svelte';
	import PaneMonitor from '$lib/components/PaneMonitor.svelte';
	import PaneManual from '$lib/components/PaneManual.svelte';
	import PaneAjustes from '$lib/components/PaneAjustes.svelte';
	import PaneStack from '$lib/components/PaneStack.svelte';
	import PaneContacto from '$lib/components/PaneContacto.svelte';
	import AppGrid from '$lib/components/AppGrid.svelte';
	import { profile, experiences, cases, credentialCount } from '$lib/data';

	let active = $state('');
	let maximized = $state(false);
	let minimized = $state(false);
	let clock = $state('··:··');
	let dateLabel = $state('···');
	let paletteOpen = $state(false);
	let flash = $state('');
	let ctx = $state<{ x: number; y: number } | null>(null);

	function toast(msg: string) {
		flash = msg;
		setTimeout(() => {
			if (flash === msg) flash = '';
		}, 2200);
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
			toast('correo copiado');
		} catch {
			toast('no se pudo copiar');
		}
	}

	function openWa() {
		window.open(
			`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
				'Hola Frank, vi tu portafolio y quiero conversar sobre un proyecto.'
			)}`,
			'_blank',
			'noopener'
		);
	}

	const apps = [
		{ id: 'terminal', label: 'Terminal' },
		{ id: 'perfil', label: 'Perfil' },
		{ id: 'experiencia', label: 'Experiencia' },
		{ id: 'proyectos', label: 'Proyectos' },
		{ id: 'credenciales', label: 'Credenciales' },
		{ id: 'seguridad', label: 'Seguridad' },
		{ id: 'stack', label: 'Stack' },
		{ id: 'contacto', label: 'Contacto' },
		{ id: 'archivos', label: 'Archivos', dock: false },
		{ id: 'monitor', label: 'Monitor', dock: false },
		{ id: 'manual', label: 'Manual', dock: false },
		{ id: 'ajustes', label: 'Ajustes', dock: false }
	];


	const menus = $derived([
		{
			label: 'Archivo',
			items: [
				{ label: 'Copiar correo', hint: '⌘C', run: copyEmail },
				{ label: 'Abrir WhatsApp', hint: '↗', run: openWa },
				{ label: 'Cerrar ventana', hint: '⌫', run: () => select('terminal') }
			]
		},
		{
			label: 'Ver',
			items: apps.map((a, i) => ({
				label: a.label,
				hint: i < dockApps.length ? String(i + 1) : '',
				run: () => select(a.id)
			}))
		},
		{
			label: 'Ayuda',
			items: [
				{ label: 'Abrir terminal', hint: 'shell', run: () => select('terminal') },
				{ label: 'Ir a contacto', hint: '8', run: () => select('contacto') }
			]
		}
	]);


	const meta: Record<string, { title: string; icon: string; status: string }> = {
		terminal: { title: 'frank@portfolio: ~', icon: 'terminal', status: 'zsh' },
		perfil: { title: 'perfil — frank anconeyra', icon: 'user', status: 'identidad' },
		experiencia: {
			title: `experiencia — ${experiences.length} puestos`,
			icon: 'briefcase',
			status: `${String(experiences.length).padStart(2, '0')} puestos`
		},
		proyectos: {
			title: `proyectos — ${cases.length} repos`,
			icon: 'folder',
			status: `${String(cases.length).padStart(2, '0')} repos`
		},
		credenciales: {
			title: 'credenciales — cisco / aws',
			icon: 'badge',
			status: `${credentialCount}+ emitidas`
		},
		seguridad: { title: 'seguridad — postura y práctica', icon: 'shield', status: 'sin cookies' },
		stack: { title: 'stack — entorno', icon: 'layers', status: 'declarado' },
		contacto: { title: 'contacto — nueva solicitud', icon: 'mail', status: 'mailto' },
		archivos: { title: 'archivos — ~/', icon: 'folder', status: '7 directorios' },
		monitor: { title: 'monitor — sistema', icon: 'activity', status: 'tiempo real' },
		manual: { title: 'manual — frank(1)', icon: 'book', status: 'man frank' },
		ajustes: { title: 'ajustes — preferencias', icon: 'sliders', status: 'sesión' }
	};

	const gridApps = $derived(
		apps.map((a) => ({ id: a.id, label: a.label, icon: meta[a.id].icon }))
	);

	const dockApps = $derived(
		apps
			.filter((a) => (a as { dock?: boolean }).dock !== false)
			.map((a) => ({ id: a.id, label: a.label, icon: meta[a.id].icon }))
	);

	function select(id: string) {
		active = id;
		minimized = false;
	}

	onMount(() => {
		try {
			const saved = localStorage.getItem('nyraroot:wall');
			if (saved) document.documentElement.dataset.wall = saved;
		} catch {
			/* private mode */
		}

		if (window.matchMedia('(max-width: 900px)').matches) active = 'perfil';

		const tick = () => {
			const now = new Date();
			clock = new Intl.DateTimeFormat('es-PE', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
				timeZone: 'America/Lima'
			}).format(now);
			dateLabel = new Intl.DateTimeFormat('es-PE', {
				weekday: 'short',
				day: 'numeric',
				month: 'short',
				timeZone: 'America/Lima'
			})
				.format(now)
				.replace('.', '');
		};
		tick();
		const id = window.setInterval(tick, 20_000);

		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				paletteOpen = true;
				return;
			}
			const tag = (e.target as HTMLElement | null)?.tagName;
			if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
			if (e.key === 'Escape' && !paletteOpen && active) {
				e.preventDefault();
				active = '';
				return;
			}
			const n = Number(e.key);
			if (n >= 1 && n <= dockApps.length) {
				e.preventDefault();
				select(dockApps[n - 1].id);
			}
		};
		window.addEventListener('keydown', onKey);

		return () => {
			clearInterval(id);
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

<div
	class="desktop"
	role="presentation"
	oncontextmenu={(e) => {
		e.preventDefault();
		const w = 220;
		const h = 190;
		ctx = {
			x: Math.min(e.clientX, window.innerWidth - w - 8),
			y: Math.min(e.clientY, window.innerHeight - h - 8)
		};
	}}
>
	<div class="wallmark" aria-hidden="true">FA</div>

	<Panel
		title={active ? meta[active].title : ''}
		hasTask={!!active}
		minimized={minimized}
		{clock}
		{dateLabel}
		onMenu={() => (paletteOpen = true)}
		onTask={() => (minimized = !minimized)}
		onMonitor={() => select('monitor')}
	/>

	<DesktopIcons {active} onselect={select} />
	<SysWidget />
	<DesktopCalendar />
	<DesktopClock />

	<DesktopMenu
		open={!!ctx}
		x={ctx?.x ?? 0}
		y={ctx?.y ?? 0}
		onclose={() => (ctx = null)}
		items={[
			{ label: 'Abrir terminal', hint: '1', run: () => select('terminal') },
			{ label: 'Ir a experiencia', hint: '3', run: () => select('experiencia') },
			{ label: 'Ir a contacto', hint: '8', run: () => select('contacto') },
			{ label: 'Cerrar ventana', hint: 'esc', run: () => (active = ''), disabled: !active },
			{ label: 'Recargar escritorio', hint: 'f5', run: () => location.reload() }
		]}
	/>

	<div class="stage">
		{#if active}
			{#key active}
				<Window
					title={meta[active].title}
					{menus}
					bind:maximized
					bind:minimized
					onclose={() => (active = '')}
				>
					{#snippet icon()}
						<Icon name={meta[active].icon} />
					{/snippet}

					{#if active === 'terminal'}
						<Terminal />
					{:else if active === 'perfil'}
						<PanePerfil />
					{:else if active === 'experiencia'}
						<PaneExperiencia />
					{:else if active === 'proyectos'}
						<PaneProyectos />
					{:else if active === 'credenciales'}
						<PaneCredenciales />
					{:else if active === 'seguridad'}
						<PaneSeguridad />
					{:else if active === 'stack'}
						<PaneStack />
					{:else if active === 'contacto'}
						<PaneContacto />
					{:else if active === 'archivos'}
						<PaneArchivos onopen={select} />
					{:else if active === 'monitor'}
						<PaneMonitor />
					{:else if active === 'manual'}
						<PaneManual onopen={select} />
					{:else if active === 'ajustes'}
						<PaneAjustes />
					{/if}

					{#snippet status()}
						<span>utf-8</span>
						<span>LF</span>
						<span>{meta[active].status}</span>
						<span class="spacer">{profile.name}</span>
					{/snippet}
				</Window>
			{/key}
		{/if}
	</div>

	<Dock {active} apps={dockApps} onselect={select} />

	<AppGrid bind:open={paletteOpen} apps={gridApps} onselect={select} />
</div>
