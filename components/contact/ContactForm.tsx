"use client";

import { useState } from "react";
import { contactData } from "@/lib/data/portfolio";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<{ text: string; error: boolean } | null>(null);

  const validate = () => {
    if (!name.trim()) return "Por favor ingresa tu nombre.";
    if (!email.trim()) return "Por favor ingresa tu email.";
    // basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Por favor ingresa un email válido.";
    if (!message.trim()) return "Por favor escribe un mensaje.";
    return null;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setFeedback({ text: err, error: true });
      return;
    }

    const whatsappNumber = contactData.whatsappNumber; // +51917394464
    const whatsappMessage =
      `👋 *Nuevo Mensaje del Portafolio*\n\n` +
      `*Nombre:* ${name}\n` +
      `*Email:* ${email}\n\n` +
      `*Mensaje:*\n${message}\n\n` +
      `_Enviado desde el portafolio de Nyraroot_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    setName("");
    setEmail("");
    setMessage("");
    setFeedback({ text: "¡Redirigiendo a WhatsApp! Por favor envía el mensaje desde allí.", error: false });
  };

  return (
    <section id="contacto" className="bg-[var(--bg-primary)] px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="contacto-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="contacto-heading" className="relative mb-12 text-center text-[2.5rem] font-bold text-[var(--text-primary)] after:absolute after:bottom-[-10px] after:left-1/2 after:h-1 after:w-20 after:-translate-x-1/2 after:rounded-sm after:bg-gradient-to-r after:from-[var(--primary-color)] after:to-[var(--secondary-color)] after:content-['']">
          Contacto
        </h2>

        <div className="grid gap-16 md:grid-cols-2">
          {/* Info */}
          <div>
            <h3 className="mb-4 text-[2rem] font-bold text-[var(--text-primary)]">{contactData.heading}</h3>
            <p className="mb-8 text-[var(--text-secondary)]">{contactData.description}</p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--bg-primary)] text-[1.5rem] text-[var(--primary-color)] shadow-sm">
                  ✉️
                </span>
                <span>{contactData.email}</span>
              </div>
              <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--bg-primary)] text-[1.5rem] text-[var(--primary-color)] shadow-sm">
                  📍
                </span>
                <span>{contactData.location}</span>
              </div>
              <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--bg-primary)] text-[1.5rem] text-[var(--primary-color)] shadow-sm">
                  💬
                </span>
                <span>{contactData.phoneDisplay}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form id="contact-form" onSubmit={onSubmit} noValidate className="rounded-[12px] bg-[var(--bg-primary)] p-8 shadow-md">
            <div className="mb-6">
              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tu Nombre"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-primary)] p-4 font-[inherit] text-[1rem] transition focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Tu Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-primary)] p-4 font-[inherit] text-[1rem] transition focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="sr-only">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="¿En qué puedo ayudarte?"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-y rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-primary)] p-4 font-[inherit] text-[1rem] transition focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-dark)] px-8 py-3 font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span aria-hidden="true">💬</span> Enviar por WhatsApp
            </button>
            {feedback && (
              <div
                id="form-feedback"
                role="status"
                aria-live="polite"
                className={`mt-4 rounded-[8px] border px-4 py-3 text-[0.9rem] leading-[1.5] ${feedback.error ? "border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.1)] text-[#ef4444]" : "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-[var(--accent-color)]"}`}
              >
                {feedback.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
