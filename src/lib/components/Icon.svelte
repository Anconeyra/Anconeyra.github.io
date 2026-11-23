<script lang="ts">
	type Props = { name: string };

	let { name }: Props = $props();

	const paths: Record<string, string> = {
		terminal: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z M7 10l3 2.5L7 15 M12.5 15.5h4',
		user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4.5 20a7.5 7.5 0 0 1 15 0',
		briefcase:
			'M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8 M3 12.5h18',
		folder: 'M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2.5h7A1.5 1.5 0 0 1 19 10v7.5A1.5 1.5 0 0 1 17.5 19h-13A1.5 1.5 0 0 1 3 17.5v-10Z',
		shield: 'M12 3.5 5 6v5.5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-2.5Z M9 12l2 2 4-4',
		badge: 'M12 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z M8.6 11.6 7 21l5-2.6L17 21l-1.6-9.4',
		layers:
			'M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z M3.5 12.5 12 17l8.5-4.5 M3.5 16.5 12 21l8.5-4.5',
		mail: 'M3.5 6.5h17a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z M3 7.5l9 6.5 9-6.5',
		activity: 'M3 12h3.5l2.5-6 3 12 2.5-6H21',
		book: 'M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z M11 4h7.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H11',
		sliders: 'M4 7h9 M17 7h3 M4 17h3 M11 17h9 M15.5 4.5v5 M8.5 14.5v5'
	};
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.6"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d={paths[name] ?? paths.folder} />
</svg>
