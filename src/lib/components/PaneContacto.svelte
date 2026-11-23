<script lang="ts">
	import { profile } from '$lib/data';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let copied = $state(false);

	function send(e: Event) {
		e.preventDefault();
		const body = `nombre: ${name}\ncorreo: ${email}\n\n${message}`;
		window.open(
			`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(body)}`,
			'_blank',
			'noopener'
		);
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
			copied = true;
			setTimeout(() => (copied = false), 2200);
		} catch {
			copied = false;
		}
	}
</script>

<div class="pane">
	<div class="pane__head">
		<h1 class="pane__title">Contacto</h1>
		<p class="pane__note">respuesta directa · sin intermediarios</p>
	</div>

	<p class="prompt"><b>frank@portfolio:~$</b> mail -s "nuevo proyecto"</p>

	<div class="contact">
		<form onsubmit={send}>
			<p class="lede" style="margin-bottom:0.75rem">
				Tres campos y el mensaje se abre en WhatsApp ya redactado.
			</p>

			<div class="field">
				<label class="field__label" for="c-name">nombre</label>
				<input
					id="c-name"
					class="field__input"
					type="text"
					bind:value={name}
					required
					autocomplete="name"
					placeholder="nombre y apellido"
				/>
			</div>

			<div class="field">
				<label class="field__label" for="c-email">correo</label>
				<input
					id="c-email"
					class="field__input"
					type="email"
					bind:value={email}
					required
					autocomplete="email"
					placeholder="nombre@empresa.com"
				/>
			</div>

			<div class="field">
				<label class="field__label" for="c-msg">motivo</label>
				<textarea
					id="c-msg"
					class="field__input field__input--area"
					bind:value={message}
					required
					rows="3"
					placeholder="qué necesita construir o revisar, y en qué plazo"
				></textarea>
			</div>

			<div class="form__foot">
				<button class="btn btn--primary" type="submit">
					Enviar <span aria-hidden="true">↗</span>
				</button>
				<span class="pane__note">se abre en una pestaña nueva</span>
			</div>
		</form>

		<aside class="channels" aria-label="Canales directos">
			<h2 class="channels__head">Canales</h2>

			<dl>
				<div class="channels__row">
					<dt>correo</dt>
					<dd>
						<button type="button" class="channels__act" onclick={copyEmail}>
							{copied ? `${profile.email} ✓` : profile.email}
						</button>
					</dd>
				</div>
				<div class="channels__row">
					<dt>whatsapp</dt>
					<dd>
						<a
							class="channels__act"
							href="https://wa.me/{profile.whatsapp}"
							target="_blank"
							rel="noopener">{profile.phone} ↗</a
						>
					</dd>
				</div>
				<div class="channels__row">
					<dt>github</dt>
					<dd>
						<a class="channels__act" href={profile.github} target="_blank" rel="noopener"
							>{profile.githubHandle} ↗</a
						>
					</dd>
				</div>
				<div class="channels__row">
					<dt>linkedin</dt>
					<dd>
						<a class="channels__act" href={profile.linkedin} target="_blank" rel="noopener"
							>{profile.linkedinHandle} ↗</a
						>
					</dd>
				</div>
			</dl>
		</aside>
	</div>
</div>
