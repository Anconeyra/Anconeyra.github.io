<script lang="ts">
	type Props = { id: string; size?: number };

	let { id, size = 46 }: Props = $props();

	const glyphs: Record<string, string> = {
		terminal: 'M7 10l3 2.5L7 15 M12.5 15.5h4',
		user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4.5 20a7.5 7.5 0 0 1 15 0',
		briefcase:
			'M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8',
		folder: 'M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2.5h7A1.5 1.5 0 0 1 19 10v7.5A1.5 1.5 0 0 1 17.5 19h-13A1.5 1.5 0 0 1 3 17.5v-10Z',
		badge: 'M12 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z M8.6 11.6 7 21l5-2.6L17 21l-1.6-9.4',
		shield: 'M12 3.5 5 6v5.5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-2.5Z M9 12l2 2 4-4',
		layers: 'M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z M3.5 12.5 12 17l8.5-4.5 M3.5 16.5 12 21l8.5-4.5',
		mail: 'M3.5 6.5h17a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z M3 7.5l9 6.5 9-6.5',
		activity: 'M3 12h3.5l2.5-6 3 12 2.5-6H21',
		book: 'M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z M11 4h7.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H11',
		sliders: 'M4 7h9 M17 7h3 M4 17h3 M11 17h9 M15.5 4.5v5 M8.5 14.5v5'
	};

	const tiles: Record<string, { from: string; to: string; ink: string }> = {
		terminal: { from: '#242b38', to: '#161c26', ink: '#9ece6a' },
		user: { from: '#2f6fed', to: '#1e4fc4', ink: '#ffffff' },
		briefcase: { from: '#f2994a', to: '#d97706', ink: '#ffffff' },
		folder: { from: '#3b82f6', to: '#2563eb', ink: '#ffffff' },
		badge: { from: '#8b5cf6', to: '#6d28d9', ink: '#ffffff' },
		shield: { from: '#10b981', to: '#047857', ink: '#ffffff' },
		layers: { from: '#64748b', to: '#475569', ink: '#ffffff' },
		mail: { from: '#ef4444', to: '#dc2626', ink: '#ffffff' },
		activity: { from: '#14b8a6', to: '#0f766e', ink: '#ffffff' },
		book: { from: '#a78bfa', to: '#7c3aed', ink: '#ffffff' },
		sliders: { from: '#94a3b8', to: '#475569', ink: '#ffffff' }
	};

	const t = $derived(tiles[id] ?? tiles.folder);
	const g = $derived(glyphs[id] ?? glyphs.folder);
	const gid = $derived(`g-${id}`);
</script>

<svg viewBox="0 0 46 46" width={size} height={size} aria-hidden="true" class="appicon">
	<defs>
		<linearGradient id={gid} x1="0" y1="0" x2="0.35" y2="1">
			<stop offset="0%" stop-color={t.from} />
			<stop offset="100%" stop-color={t.to} />
		</linearGradient>
	</defs>

	<rect x="1" y="1" width="44" height="44" rx="11" fill="url(#{gid})" />
	<rect
		x="1"
		y="1"
		width="44"
		height="44"
		rx="11"
		fill="none"
		stroke="#ffffff"
		stroke-opacity="0.16"
	/>

	<g
		transform="translate(11 11)"
		fill="none"
		stroke={t.ink}
		stroke-width="1.9"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d={g} />
	</g>
</svg>

<style>
	.appicon {
		display: block;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
	}
</style>
