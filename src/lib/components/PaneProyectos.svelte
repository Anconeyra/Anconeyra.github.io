<script lang="ts">
	import { cases } from '$lib/data';
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Proyectos</h1>
		<p class="pane__note">{String(cases.length).padStart(2, '0')} con repositorio público</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~/proyectos$</b> ls -l</p>

	<div>
		{#each cases as item, i}
			<article class="proj">
				<span class="proj__i" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>

				<div>
					<h2 class="proj__name">{item.name}</h2>
					<p class="proj__desc">{item.description}</p>
					<ul class="proj__stack" aria-label="Tecnologías">
						{#each item.stack as tech}
							<li><span>{tech}</span></li>
						{/each}
					</ul>
				</div>

				<div class="proj__links">
					{#each item.links as link}
						<a
							class="proj__link"
							href={link.url}
							target="_blank"
							rel="noopener"
							aria-label="{link.label} de {item.name} en GitHub, abre en una pestaña nueva"
						>
							{link.label} <span aria-hidden="true">↗</span>
						</a>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</div>
