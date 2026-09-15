"use client";

import { useState } from "react";
import { contactData } from "@/lib/data/portfolio";
import GsapReveal from "@/components/ui/GsapReveal";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty
  const [feedback, setFeedback] = useState<{ text: string; error: boolean } | null>(null);

  const validate = () => {
    if (website) return null; // bot detected — silent reject
    if (!name.trim()) return "Por favor ingresa tu nombre.";
    if (!email.trim()) return "Por favor ingresa tu email.";
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

    const whatsappNumber = contactData.whatsappNumber;
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
    setWebsite("");
    setFeedback({ text: "¡Redirigiendo a WhatsApp! Por favor envía el mensaje desde allí.", error: false });
  };

  const contactItems = [
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
      label: contactData.email,
      color: "from-indigo-500 to-blue-500",
      shadow: "shadow-indigo-500/30",
      text: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></>,
      label: contactData.location,
      color: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/30",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></>,
      label: contactData.phoneDisplay,
      color: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/30",
      text: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <section id="contacto" className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)]/30 to-[var(--bg-primary)] px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20" aria-labelledby="contacto-heading">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 right-1/4 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <GsapReveal variant="blur" className="block w-full">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 id="contacto-heading" className="w-full text-center text-4xl font-extrabold tracking-tight text-balance text-[var(--text-primary)] sm:text-5xl">
              Contacto
            </h2>
            <p className="mt-4 w-full text-center leading-relaxed text-balance text-[var(--text-secondary)]">
              ¿Tienes un proyecto en mente? Escríbeme y hablemos.
            </p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--primary-color)] to-sky-500" aria-hidden="true" />
          </div>
        </GsapReveal>

        <div className="mt-14 grid w-full min-w-0 grid-cols-1 items-start gap-10 lg:mt-20 lg:grid-cols-5 lg:gap-12 xl:gap-16">
          {/* Info — 2 cols */}
          <GsapReveal className="min-w-0 lg:col-span-2">
          <div className="flex h-full w-full min-w-0 flex-col justify-center overflow-visible">
            <h3 className="text-2xl font-extrabold tracking-tight text-balance break-words text-[var(--text-primary)] sm:text-3xl">{contactData.heading}</h3>
            <p className="mt-4 max-w-md leading-relaxed text-pretty text-[var(--text-secondary)]">{contactData.description}</p>

            <ul className="mt-10 w-full min-w-0 space-y-5">
              {contactItems.map((item, i) => (
                <li key={i} className="group flex min-w-0 items-center gap-4">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md ${item.shadow} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                      {item.icon}
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1 break-all text-[15px] font-medium text-[var(--text-primary)] lg:break-normal lg:truncate">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
          </GsapReveal>

          {/* Form — 3 cols */}
          <GsapReveal delay={0.12} className="min-w-0 lg:col-span-3">
          <div className="relative w-full min-w-0 max-w-full">
            <form id="contact-form" onSubmit={onSubmit} noValidate className="relative flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-7 shadow-2xl shadow-indigo-500/8 sm:p-9">
              {/* Top gradient accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary-color)] via-indigo-400 to-sky-400" aria-hidden="true" />

              <div className="mb-5 mt-1">
                <label htmlFor="name" className="mb-2 block max-w-full text-xs font-bold tracking-wider text-[var(--text-secondary)] uppercase">
                  Nombre
                </label>
                <div className="relative w-full min-w-0">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/15 dark:text-indigo-400">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu Nombre"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-full min-w-0 max-w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 pl-12 pr-4 text-[0.95rem] text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-light)] focus:border-[var(--primary-color)] focus:bg-[var(--card-bg)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block max-w-full text-xs font-bold tracking-wider text-[var(--text-secondary)] uppercase">
                  Email
                </label>
                <div className="relative w-full min-w-0">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500 dark:bg-sky-400/15 dark:text-sky-400">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Tu Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full min-w-0 max-w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 pl-12 pr-4 text-[0.95rem] text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-light)] focus:border-[var(--primary-color)] focus:bg-[var(--card-bg)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-6 flex-1">
                <label htmlFor="message" className="mb-2 block max-w-full text-xs font-bold tracking-wider text-[var(--text-secondary)] uppercase">
                  Mensaje
                </label>
                <div className="relative w-full min-w-0">
                  <span className="pointer-events-none absolute left-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 dark:bg-violet-400/15 dark:text-violet-400">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="¿En qué puedo ayudarte?"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[140px] w-full min-w-0 max-w-full resize-none rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 py-3.5 pl-12 pr-4 text-[0.95rem] text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-light)] focus:border-[var(--primary-color)] focus:bg-[var(--card-bg)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Honeypot — hidden from humans, bots will fill it */}
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                <label htmlFor="website">No completar</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <button
                type="submit"
                className="group flex h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[var(--primary-color)] via-indigo-500 to-sky-500 px-8 text-[15px] font-bold text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] active:translate-y-0 active:scale-[0.98]"
              >
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Enviar por WhatsApp
              </button>

              {feedback && (
                <div
                  id="form-feedback"
                  role="status"
                  aria-live="polite"
                  className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-relaxed ${feedback.error ? "border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.1)] text-[#ef4444]" : "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-[var(--accent-color)]"}`}
                >
                  {feedback.text}
                </div>
              )}
            </form>
          </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}
