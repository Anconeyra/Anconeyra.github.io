<script lang="ts">
	import { profile, experiences, cases, credentialCount } from '$lib/data';

	const wa = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
		'Hola Frank, vi tu portafolio y quiero conversar sobre un proyecto.'
	)}`;
</script>

<div class="pane">
	<div>
		<h1 class="profile__name">{profile.name}</h1>
		<p class="profile__role">
			<b>{profile.role}</b> <span class="dim">/</span> {profile.roleSecondary}
		</p>
	</div>

	<p class="lede">{profile.tagline}</p>

	<dl class="spec">
		<div class="spec__row">
			<dt class="spec__k">Base</dt>
			<dd class="spec__v">{profile.location} · {profile.timezone}</dd>
		</div>
		<div class="spec__row">
			<dt class="spec__k">Empresas</dt>
			<dd class="spec__v num">{String(experiences.length).padStart(2, '0')}</dd>
		</div>
		<div class="spec__row">
			<dt class="spec__k">Sistemas</dt>
			<dd class="spec__v num">{String(cases.length).padStart(2, '0')} con repositorio público</dd>
		</div>
		<div class="spec__row">
			<dt class="spec__k">Credenciales</dt>
			<dd class="spec__v num">{credentialCount}+ emitidas</dd>
		</div>
		<div class="spec__row">
			<dt class="spec__k">Puesto actual</dt>
			<dd class="spec__v spec__v--ok">{experiences[0].company} · {experiences[0].role}</dd>
		</div>
	</dl>

	<div class="form__foot">
		<a class="btn btn--primary" href={wa} target="_blank" rel="noopener">
			Hablemos por WhatsApp <span aria-hidden="true">↗</span>
		</a>
		<a class="btn btn--ghost" href={profile.github} target="_blank" rel="noopener">
			GitHub <span aria-hidden="true">↗</span>
		</a>
	</div>
</div>
