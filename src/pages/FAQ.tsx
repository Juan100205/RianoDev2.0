import type { RefObject } from "react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

const faqs = [
  {
    q: { en: "What exactly does RIANODEVZ do?", es: "¿Qué hace exactamente RIANODEVZ?" },
    a: {
      en: "We design and implement digital systems that integrate web development, automation and data tracking. We work with marketing agencies and companies that need a reliable technical partner to build functional, scalable infrastructure.",
      es: "Diseñamos e implementamos sistemas digitales que integran desarrollo web, automatización y tracking de datos. Trabajamos con agencias de marketing y empresas que necesitan un socio técnico confiable para construir infraestructura funcional y escalable.",
    },
  },
  {
    q: { en: "Who do you work with?", es: "¿Con quién trabajan?" },
    a: {
      en: "Primarily marketing agencies that need technical implementation, companies with internal marketing teams running manual processes, and entrepreneurs validating digital products.",
      es: "Principalmente agencias de marketing que necesitan implementación técnica, empresas con equipos de marketing interno que operan con procesos manuales, y emprendedores validando productos digitales.",
    },
  },
  {
    q: { en: "Do you sell isolated services or complete systems?", es: "¿Venden servicios sueltos o sistemas completos?" },
    a: {
      en: "We build complete systems. Web, automation and data are designed to work together as a single infrastructure — not as isolated services. That said, we can also intervene in a specific layer if needed.",
      es: "Construimos sistemas completos. Web, automatización y datos están diseñados para funcionar juntos como una sola infraestructura — no como servicios aislados. Dicho eso, también podemos intervenir en una capa específica si es necesario.",
    },
  },
  {
    q: { en: "How does a project start?", es: "¿Cómo empieza un proyecto?" },
    a: {
      en: "We start with a technical evaluation: we analyze your current infrastructure, tools, data flows and friction points. From that diagnosis we define the architecture and scope of implementation.",
      es: "Empezamos con una evaluación técnica: analizamos tu infraestructura actual, herramientas, flujos de datos y puntos de fricción. A partir de ese diagnóstico definimos la arquitectura y el alcance de la implementación.",
    },
  },
  {
    q: { en: "How long does an implementation take?", es: "¿Cuánto tiempo toma una implementación?" },
    a: {
      en: "It depends on the scope. A specific system (chatbot, tracking, landing) can be operational in 2–4 weeks. A complete infrastructure with multiple integrations may take 6–12 weeks. We define this in the technical evaluation.",
      es: "Depende del alcance. Un sistema específico (chatbot, tracking, landing) puede estar operativo en 2–4 semanas. Una infraestructura completa con múltiples integraciones puede tomar 6–12 semanas. Esto lo definimos en la evaluación técnica.",
    },
  },
  {
    q: { en: "Do you offer technical support after implementation?", es: "¿Ofrecen soporte técnico después de la implementación?" },
    a: {
      en: "Yes. We offer continuous monitoring and optimization as part of the implementation model. Specific support conditions are defined in each engagement agreement.",
      es: "Sí. Ofrecemos monitoreo y optimización continua como parte del modelo de implementación. Las condiciones específicas de soporte se definen en cada acuerdo de trabajo.",
    },
  },
  {
    q: { en: "How do I request a quote?", es: "¿Cómo solicito una cotización?" },
    a: {
      en: "You can schedule a consultation directly or send us an email at juanriza@rianodevz.net. We'll review your context and send you a technical proposal.",
      es: "Puedes agendar una consultoría directamente o enviarnos un correo a juanriza@rianodevz.net. Revisamos tu contexto y te enviamos una propuesta técnica.",
    },
  },
];

const FAQ = ({ languageState, setLanguageState, scrollRef }: Props) => {
  const l = languageState;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
      <div ref={scrollRef} className="page_scroll scrollbar_exp">
        <div className="max-w-3xl mx-auto px-6 py-20">

          <div className="flex items-center gap-3 mb-10">
            <span className="block w-8 h-[2px] bg-[#10dffd]" />
            <span className="text-[#10dffd] text-xs tracking-[0.3em] uppercase">
              {l ? "Help" : "Ayuda"}
            </span>
          </div>

          <h1 className="md:text-4xl text-2xl font-light text-white mb-4">
            {l ? "Frequently asked questions" : "Preguntas frecuentes"}
          </h1>
          <p className="text-gray-500 text-sm mb-14">
            {l
              ? "Everything you need to know before starting a conversation."
              : "Todo lo que necesitas saber antes de iniciar una conversación."}
          </p>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-[#10dffd]/30 hover:border-[#10dffd]/60 transition-all duration-300 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                >
                  <span className="text-white font-light text-sm pr-4">
                    {l ? faq.q.en : faq.q.es}
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-[#10dffd] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 border-t border-[#10dffd]/22">
                    <p className="text-gray-400 text-sm leading-relaxed pt-4">
                      {l ? faq.a.en : faq.a.es}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 border border-[#10dffd]/30 rounded-xl px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {l ? "Didn't find what you were looking for?" : "¿No encontraste lo que buscabas?"}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/schedule" className="text-xs tracking-widest uppercase text-black bg-[#10dffd] px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                {l ? "Schedule a consultation" : "Agendar consultoría"}
              </Link>
              <Link to="/quote" className="text-xs tracking-widest uppercase text-white/60 border border-white/15 hover:border-white/40 px-5 py-2.5 rounded-full transition-all">
                {l ? "Request a quote" : "Solicitar cotización"}
              </Link>
            </div>
          </div>

        </div>
        <Footer languageState={languageState} />
      </div>
    </>
  );
};

export default FAQ;
