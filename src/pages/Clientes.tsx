import type { RefObject } from "react";
import LogoSinBgBlack from "../assets/LogoSinBgBlack.png";
import LogoSinBgWhite from "../assets/LogoSinBgWhite.png";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

const clients = [
  {
    index: "01",
    name: "Catali AI",
    category: { en: "Marketing & Automation", es: "Marketing & Automatización" },
    context: {
      en: "Technical implementation collaboration for marketing operations and digital campaigns.",
      es: "Colaboración en la implementación técnica para operaciones de marketing y campañas digitales.",
    },
    implementation: {
      en: [
        "Web infrastructure development",
        "Tracking and analytics implementation",
        "Technical support for campaigns (educational and political)",
        "System integration for user capture and management",
      ],
      es: [
        "Desarrollo de infraestructura web",
        "Implementación de tracking y analítica",
        "Soporte técnico en campañas (educativas y políticas)",
        "Integración de sistemas para captura y gestión de usuarios",
      ],
    },
    subgroups: [
      {
        label: { en: "Associated cases", es: "Casos asociados" },
        items: [
          { en: "Mass outreach campaign — human-replicating chatbot with voice cloning", es: "Campaña de comunicación masiva — chatbot imitador de humano con replicación de voz" },
          { en: "Educational project (Compucol)", es: "Proyecto educativo (Compucol)" },
          { en: "Catali AI corporate website development", es: "Desarrollo de la web corporativa de Catali AI" },
        ],
      },
    ],
    result: {
      en: "Functional systems for campaign execution with user capture, measurement and data structuring.",
      es: "Sistemas funcionales para ejecución de campañas con captura, medición y estructuración de datos.",
    },
    stack: ["React", "GTM", "GA4", "Meta Pixel", "n8n"],
  },
  {
    index: "02",
    name: "Alpha Studio",
    category: { en: "Automation & Conversational Systems", es: "Automatización & Sistemas Conversacionales" },
    context: {
      en: "Development of digital assets and automated systems oriented to conversion and commercial operation.",
      es: "Desarrollo de activos digitales y sistemas automatizados orientados a conversión y operación comercial.",
    },
    implementation: {
      en: [
        "Development of multiple conversion-focused landing pages",
        "User tracking implementation (pixels and events)",
        "Information architecture design for decision-making (CEO-level clarity)",
      ],
      es: [
        "Desarrollo de múltiples landing pages con estructura orientada a conversión",
        "Implementación de tracking de usuario (píxeles y eventos)",
        "Diseño de arquitectura de información para toma de decisiones (CEO-level clarity)",
      ],
    },
    subgroups: [
      {
        label: { en: "Vecino Alquila — Conversational system", es: "Vecino Alquila — Sistema conversacional" },
        items: [
          { en: "Chatbot with structured conversational flow", es: "Chatbot con flujo conversacional estructurado" },
          { en: "Appointment scheduling system integration", es: "Integración de sistema de agendamiento de citas" },
          { en: "Dashboard for data and conversation visualization", es: "Dashboard para visualización de datos y conversaciones" },
        ],
      },
      {
        label: { en: "Ergonómica — Conversational system", es: "Ergonómica — Sistema conversacional" },
        items: [
          { en: "Conversational chatbot implementation", es: "Implementación de chatbot conversacional" },
          { en: "Interaction management system (no scheduling)", es: "Sistema de gestión de interacciones (sin agendamiento)" },
        ],
      },
    ],
    result: {
      en: "User interaction automation, data structuring and improvement in capture and commercial management processes.",
      es: "Automatización de interacción con usuarios, estructuración de datos y mejora en procesos de captación y gestión comercial.",
    },
    stack: ["React", "n8n", "WhatsApp API", "Dashboards", "Meta Pixel"],
  },
  {
    index: "03",
    name: "Conjunto Callejas",
    category: { en: "Operational Automation", es: "Automatización Operativa" },
    context: {
      en: "Implementation of a custom solution for process automation in a residential environment.",
      es: "Implementación de solución personalizada para automatización de procesos en entorno residencial.",
    },
    implementation: {
      en: [
        "Operational automation logic design",
        "System integration for internal management",
        "Data flow structuring",
      ],
      es: [
        "Diseño de lógica de automatización operativa",
        "Integración de sistemas para gestión interna",
        "Estructuración de flujos de datos",
      ],
    },
    subgroups: [],
    result: {
      en: "Reduction of manual processes and improved operational management through automation.",
      es: "Reducción de procesos manuales y mejora en la gestión operativa mediante automatización.",
    },
    stack: ["n8n", "Make", "APIs", "Webhooks"],
  },
  {
    index: "04",
    name: "Silla",
    category: { en: "Conversational System & Dashboard", es: "Sistema Conversacional & Dashboard" },
    context: {
      en: "Implementation of a conversational system with integrated data dashboard for operational visibility.",
      es: "Implementación de sistema conversacional con dashboard integrado para visibilidad operativa.",
    },
    implementation: {
      en: [
        "Conversational chatbot development with structured flow",
        "Real-time interaction data capture",
        "Custom dashboard for conversation and metric visualization",
        "Integration between chat system and data layer",
      ],
      es: [
        "Desarrollo de chatbot conversacional con flujo estructurado",
        "Captura de datos de interacción en tiempo real",
        "Dashboard personalizado para visualización de conversaciones y métricas",
        "Integración entre sistema de chat y capa de datos",
      ],
    },
    subgroups: [],
    result: {
      en: "Automated user interaction with full operational visibility through a centralized data dashboard.",
      es: "Interacción automatizada con usuarios y visibilidad operativa completa a través de un dashboard centralizado de datos.",
    },
    stack: ["n8n", "WhatsApp API", "Dashboards", "Webhooks"],
  },
  {
    index: "05",
    name: "Siilla",

    category: { en: "Digital Platform", es: "Plataforma Digital" },
    context: {
      en: "Development of a digital presence aligned with technical positioning in XR.",
      es: "Desarrollo de presencia digital alineada con posicionamiento técnico en XR.",
    },
    implementation: {
      en: [
        "Web platform development",
        "Experience design oriented to technical communication",
        "Digital structure optimization",
      ],
      es: [
        "Desarrollo de plataforma web",
        "Diseño de experiencia orientada a comunicación técnica",
        "Optimización de estructura digital",
      ],
    },
    subgroups: [],
    result: {
      en: "Platform coherent with the company's positioning and ready for future integrations.",
      es: "Plataforma coherente con el posicionamiento de la empresa y preparada para integraciones futuras.",
    },
    stack: ["React", "Three.js", "Figma", "SEO"],
  },
];

const Clientes = ({ languageState, setLanguageState, scrollRef }: Props) => {
  const l = languageState;

  return (
    <>
      <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
      <div ref={scrollRef} className="page_scroll scrollbar_exp">
        <div className="w-4/5 mx-auto py-20">

          {/* Page header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 bg-[#10dffd]/10 text-[#10dffd] rounded-full outline-2 outline-[#10dffd] p-2">
              <RocketLaunchIcon />
            </div>
            <span className="flex items-center gap-1">
              <img src={LogoSinBgBlack} alt="RIANODEVZ" className="h-20 dark:hidden object-contain" />
              <img src={LogoSinBgWhite} alt="RIANODEVZ" className="h-20 hidden dark:block object-contain" />
              <span className="text-xs text-gray-400 dark:text-gray-500">S.A.S.</span>
            </span>
          </div>
          <h1 className="md:text-5xl text-3xl font-light text-white mb-4">
            {l ? "Case Studies" : "Casos de Uso"}
          </h1>
          <p className="text-gray-400 md:text-lg text-sm mb-16 md:w-2/3">
            {l
              ? "Real implementations. Technical context. Measurable results."
              : "Implementaciones reales. Contexto técnico. Resultados medibles."}
          </p>

          {/* Client cards */}
          <div className="flex flex-col gap-8">
            {clients.map((c) => (
              <div
                key={c.index}
                className="border border-[#10dffd]/30 hover:border-[#10dffd]/60 transition-all duration-300 rounded-2xl overflow-hidden bg-black"
              >
                {/* Card header */}
                <div className="px-8 pt-7 pb-6 border-b border-[#10dffd]/22 flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-[#10dffd]/30 text-xs tracking-widest block mb-1">{c.index}</span>
                    <h2 className="text-white font-light text-2xl">{c.name}</h2>
                  </div>
                  <span className="text-xs bg-[#10dffd]/10 text-[#10dffd] rounded-full px-3 py-1 whitespace-nowrap border border-[#10dffd]/38">
                    {l ? c.category.en : c.category.es}
                  </span>
                </div>

                <div className="px-8 py-6 grid md:grid-cols-2 gap-8">
                  {/* Left: context + implementation */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="text-[#10dffd] text-[10px] tracking-[0.25em] uppercase block mb-2">
                        {l ? "Context" : "Contexto"}
                      </span>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {l ? c.context.en : c.context.es}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#10dffd] text-[10px] tracking-[0.25em] uppercase block mb-3">
                        {l ? "Implementation" : "Implementación"}
                      </span>
                      <ul className="flex flex-col gap-2">
                        {(l ? c.implementation.en : c.implementation.es).map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#10dffd]/50 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: subgroups + result */}
                  <div className="flex flex-col gap-6">
                    {c.subgroups.map((sg, si) => (
                      <div key={si}>
                        <span className="text-[#10dffd] text-[10px] tracking-[0.25em] uppercase block mb-3">
                          {l ? sg.label.en : sg.label.es}
                        </span>
                        <ul className="flex flex-col gap-2">
                          {sg.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#10dffd]/30 shrink-0" />
                              {l ? item.en : item.es}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="border-l-2 border-[#10dffd]/50 pl-4 mt-auto">
                      <span className="text-[#10dffd] text-[10px] tracking-[0.25em] uppercase block mb-2">
                        {l ? "Result" : "Resultado"}
                      </span>
                      <p className="text-gray-400 text-xs leading-relaxed italic">
                        {l ? c.result.en : c.result.es}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stack */}
                <div className="px-8 py-4 border-t border-[#10dffd]/22 flex flex-wrap gap-1.5">
                  {c.stack.map((tag) => (
                    <span key={tag} className="text-[10px] bg-[#10dffd]/8 text-[#10dffd] rounded-full px-2.5 py-0.5 border border-[#10dffd]/38">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Closing note */}
          <p className="text-gray-600 text-sm text-center mt-16 max-w-2xl mx-auto leading-relaxed">
            {l
              ? "The systems implemented vary by context, but share a common foundation: integration, automation and data structuring for real operation."
              : "Los sistemas implementados varían según el contexto, pero mantienen una base común: integración, automatización y estructuración de datos para operación real."}
          </p>

        </div>
        <Footer languageState={languageState} />
      </div>
    </>
  );
};

export default Clientes;
