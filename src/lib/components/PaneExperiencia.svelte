<script lang="ts">
	import { experiences } from '$lib/data';

	function initials(name: string) {
		return name
			.split(/\s+/)
			.filter((w) => w.length > 2)
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase();
	}

	function hue(name: string) {
		let h = 0;
		for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
		return h;
	}
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Experiencia</h1>
		<p class="pane__note">{String(experiences.length).padStart(2, '0')} puestos · 2024 — 2026</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~$</b> cat experiencia.log</p>

	<ol>
		{#each experiences as job}
			<li class="job">
				<div class="job__mark" style="--h:{hue(job.company)}" aria-hidden="true">
					{initials(job.company)}
				</div>

				<div class="job__body">
					<div class="job__top">
						<h2 class="job__name">{job.company}</h2>
						<span class="job__period">{job.period}</span>
					</div>

					<p class="job__role">{job.role}</p>
					{#if job.place}
						<p class="job__place">{job.place}</p>
					{/if}

					{#if job.description}
						<p class="job__desc">{job.description}</p>
					{/if}

					{#if job.current || job.tags.length}
						<div class="job__foot">
							{#if job.current}
								<span class="job__now">actual</span>
							{/if}
							{#if job.tags.length}
								<ul class="job__tags" aria-label="Tecnologías y áreas">
									{#each job.tags as tag}
										<li class="job__tag">{tag}</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</div>
