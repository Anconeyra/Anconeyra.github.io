<script lang="ts">
	import { credentialGroups, credentialCount, profile } from '$lib/data';
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Credenciales</h1>
		<p class="pane__note">{credentialCount}+ emitidas · Cisco · AWS</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~/credenciales$</b> grep -r 2025 .</p>

	<div class="cols">
		{#each credentialGroups as group}
			<div>
				<div class="cred__head">
					<h2 class="cred__issuer">{group.issuer}</h2>
					<span class="cred__count">{String(group.items.length).padStart(2, '0')}</span>
				</div>

				<ul>
					{#each group.items as item}
						<li class="cred__row">
							<span class="cred__name">{item.name}</span>
							<span class="cred__year">{item.year}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<p class="pane__note">
		Registros verificables en
		<a class="link" href={profile.credly} target="_blank" rel="noopener">Credly ↗</a>
	</p>
</div>
