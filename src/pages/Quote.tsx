import type { RefObject } from "react";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

// 👉 Reemplaza con tu Form ID de Formspree (formspree.io) o tu webhook de n8n
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const serviceOptions = [
  { en: "Web Infrastructure", es: "Infraestructura Web" },
  { en: "Automation & AI", es: "Automatización & IA" },
  { en: "Data & Tracking", es: "Data & Tracking" },
  { en: "Complete system (all three)", es: "Sistema completo (los tres)" },
  { en: "I'm not sure yet", es: "No estoy seguro aún" },
];

const Quote = ({ languageState, setLanguageState, scrollRef }: Props) => {
  const l = languageState;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
      <div ref={scrollRef} className="page_scroll scrollbar_exp">
        <div className="max-w-2xl mx-auto px-6 py-16">

          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[#10dffd]" />
            <span className="text-[#10dffd]/60 text-[10px] tracking-[0.35em] uppercase font-display">
              {l ? "Quote" : "Cotización"}
            </span>
          </div>

          <h1 className="md:text-4xl text-2xl font-light text-white mb-3 leading-tight">
            {l ? "Request a quote" : "Solicitar cotización"}
          </h1>
          <p className="text-white/35 text-sm mb-10 max-w-lg leading-relaxed">
            {l
              ? "Tell us about your context. We'll review it and send you a technical proposal within 48 hours."
              : "Cuéntanos tu contexto. Lo revisamos y te enviamos una propuesta técnica en menos de 48 horas."}
          </p>

          {status === "success" ? (
            <div className="border border-[#10dffd]/50 rounded-2xl px-8 py-12 flex flex-col items-center gap-4 text-center">
              <CheckCircleIcon className="w-12 h-12 text-[#10dffd]" />
              <h2 className="text-white font-light text-xl">
                {l ? "Request received" : "Solicitud recibida"}
              </h2>
              <p className="text-gray-400 text-sm max-w-sm">
                {l
                  ? "We'll review your context and get back to you within 48 hours."
                  : "Revisaremos tu contexto y te contactamos en menos de 48 horas."}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-xs tracking-widest uppercase text-[#10dffd] border border-[#10dffd]/50 px-5 py-2 rounded-full hover:border-[#10dffd]/70 transition-all cursor-pointer"
              >
                {l ? "Send another" : "Enviar otra"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#10dffd]/60 text-[10px] tracking-[0.25em] uppercase font-display">
                    {l ? "Name" : "Nombre"}
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Juan García"
                    className="bg-[#10dffd]/[0.02] hover:bg-[#10dffd]/[0.04] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#10dffd]/60 text-[10px] tracking-[0.25em] uppercase font-display">
                    {l ? "Company" : "Empresa"}
                  </label>
                  <input
                    name="company"
                    placeholder={l ? "Your company" : "Tu empresa"}
                    className="bg-[#10dffd]/[0.02] hover:bg-[#10dffd]/[0.04] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#10dffd]/60 text-[10px] tracking-[0.25em] uppercase font-display">
                  {l ? "Email" : "Correo electrónico"}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="tu@empresa.com"
                  className="bg-[#10dffd]/[0.02] hover:bg-[#10dffd]/[0.04] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#10dffd]/60 text-[10px] tracking-[0.25em] uppercase font-display">
                  {l ? "Service of interest" : "Servicio de interés"}
                </label>
                <select
                  name="service"
                  required
                  className="bg-[#10dffd]/[0.02] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 cursor-pointer"
                >
                  <option value="" disabled>{l ? "Select an option" : "Selecciona una opción"}</option>
                  {serviceOptions.map((opt, i) => (
                    <option key={i} value={l ? opt.en : opt.es}>
                      {l ? opt.en : opt.es}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#10dffd]/60 text-[10px] tracking-[0.25em] uppercase font-display">
                  {l ? "Context" : "Contexto"}
                </label>
                <textarea
                  name="context"
                  required
                  rows={5}
                  placeholder={l
                    ? "Briefly describe your situation, what you need and what tools you currently use..."
                    : "Describe brevemente tu situación, qué necesitas y qué herramientas usas actualmente..."}
                  className="bg-[#10dffd]/[0.02] hover:bg-[#10dffd]/[0.04] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-xs">
                  {l ? "Something went wrong. Try again or write to juanriza@rianodevz.net" : "Algo salió mal. Intenta de nuevo o escribe a juanriza@rianodevz.net"}
                </p>
              )}

              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="text-[10px] tracking-[0.25em] uppercase font-display text-black bg-[#10dffd] px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(16,223,253,0.2)]"
                >
                  {status === "sending"
                    ? (l ? "Sending..." : "Enviando...")
                    : (l ? "Send request" : "Enviar solicitud")}
                </button>
                <Link to="/schedule" className="text-xs tracking-widest uppercase text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-7 py-3 rounded-full transition-all">
                  {l ? "Schedule a call instead" : "Prefiero agendar una llamada"}
                </Link>
              </div>

            </form>
          )}

          <p className="text-gray-600 text-xs mt-10 text-center">
            {l
              ? "Your information will only be used to respond to your request."
              : "Tu información solo será utilizada para responder a tu solicitud."}
          </p>

        </div>
        <Footer languageState={languageState} />
      </div>
    </>
  );
};

export default Quote;
