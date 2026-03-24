import type { RefObject } from "react";
import type { JSX } from "react";
import LogoSinBgBlack from "../assets/LogoSinBgBlack.png";
import LogoSinBgWhite from "../assets/LogoSinBgWhite.png";
import {
  CodeBracketIcon,
  BoltIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

interface ServiceDef {
  index: string;
  icon: JSX.Element;
  title: { en: string; es: string };
  body: { en: string; es: string };
  groups: {
    label: { en: string; es: string };
    items: { en: string; es: string }[];
  }[];
  cases: { en: string; es: string }[];
  stack: string[];
}

const services: ServiceDef[] = [
  {
    index: "01",
    icon: <CodeBracketIcon className="w-6 h-6 text-[#10dffd]" />,
    title: { en: "Web Infrastructure", es: "Infraestructura Web" },
    body: {
      en: "Architecture defined before writing a single line. Built for performance, conversion and long-term scalability.",
      es: "Arquitectura definida antes de escribir una sola línea. Construida para rendimiento, conversión y escalabilidad a largo plazo.",
    },
    groups: [
      {
        label: { en: "Platforms", es: "Plataformas" },
        items: [
          { en: "Landing pages and conversion-focused sites", es: "Landing pages y sitios orientados a conversión" },
          { en: "Corporate and institutional platforms", es: "Plataformas corporativas e institucionales" },
          { en: "E-commerce and product catalog", es: "E-commerce y catálogo de productos" },
          { en: "Custom web applications", es: "Aplicaciones web a medida" },
        ],
      },
      {
        label: { en: "Technical implementation", es: "Implementación técnica" },
        items: [
          { en: "SEO and Core Web Vitals optimization", es: "Optimización SEO y Core Web Vitals" },
          { en: "Performance and load time tuning", es: "Rendimiento y optimización de carga" },
          { en: "CMS and content integration", es: "Integración con CMS y contenido" },
          { en: "Third-party API connection", es: "Conexión con APIs de terceros" },
        ],
      },
    ],
    cases: [
      { en: "Marketing agency platform (e.g. Catali)", es: "Plataforma para agencia de marketing (ej: Catali)" },
      { en: "XR company digital experience (e.g. Siilla)", es: "Experiencia digital para empresa XR (ej: Siilla)" },
      { en: "Product-oriented business website", es: "Web para negocio orientado a productos" },
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "SEO", "CRO"],
  },
  {
    index: "02",
    icon: <BoltIcon className="w-6 h-6 text-[#10dffd]" />,
    title: { en: "Automation & AI", es: "Automatización & IA" },
    body: {
      en: "Operational flow mapping and automation of repetitive processes. Defined logic, traceable execution, measurable output.",
      es: "Mapeo de flujos operativos y automatización de procesos repetitivos. Lógica definida, ejecución trazable, resultado medible.",
    },
    groups: [
      {
        label: { en: "Conversational systems", es: "Sistemas conversacionales" },
        items: [
          { en: "Chatbots with natural AI behavior", es: "Chatbots con comportamiento conversacional natural" },
          { en: "WhatsApp and web messaging integration", es: "Integración con WhatsApp y mensajería web" },
          { en: "Dynamic decision funnels", es: "Funnels de decisión dinámicos" },
          { en: "Automated scheduling and CRM connection", es: "Agendamiento automatizado y conexión con CRM" },
        ],
      },
      {
        label: { en: "Operations", es: "Operaciones" },
        items: [
          { en: "Workflow automation (n8n, Make, Zapier)", es: "Automatización de flujos (n8n, Make, Zapier)" },
          { en: "Internal process automation", es: "Automatización de procesos internos" },
          { en: "Physical and digital system integration", es: "Integración de sistemas físicos y digitales" },
          { en: "Data pipeline orchestration", es: "Orquestación de pipelines de datos" },
        ],
      },
    ],
    cases: [
      { en: "Educational campaigns — user capture and guidance", es: "Campañas educativas — captura y orientación de usuarios" },
      { en: "Political campaigns — interaction and segmentation", es: "Campañas políticas — interacción y segmentación" },
      { en: "Residential complex automation", es: "Automatización para conjuntos residenciales" },
    ],
    stack: ["n8n", "Make", "Zapier", "AI Agents", "WhatsApp API", "CRM"],
  },
  {
    index: "03",
    icon: <ChartBarIcon className="w-6 h-6 text-[#10dffd]" />,
    title: { en: "Data & Tracking", es: "Data & Tracking" },
    body: {
      en: "Correct event implementation, validated data layers and connected analytics. Clean data at the source — not cleaned up downstream.",
      es: "Implementación correcta de eventos, capas de datos validadas y analítica conectada. Datos limpios en el origen — no corregidos después.",
    },
    groups: [
      {
        label: { en: "Measurement", es: "Medición" },
        items: [
          { en: "GA4 and GTM event implementation", es: "Implementación de eventos GA4 y GTM" },
          { en: "Data layer architecture", es: "Arquitectura de capa de datos" },
          { en: "Conversion and pixel tracking", es: "Tracking de conversiones y píxeles" },
          { en: "Data validation and QA", es: "Validación y QA de datos" },
        ],
      },
      {
        label: { en: "Analytics", es: "Analítica" },
        items: [
          { en: "Custom dashboards", es: "Dashboards personalizados" },
          { en: "Attribution models", es: "Modelos de atribución" },
          { en: "Structured data reporting", es: "Reportes con datos estructurados" },
          { en: "Integration with BI tools", es: "Integración con herramientas de BI" },
        ],
      },
    ],
    cases: [
      { en: "Tracking implementation for marketing operations", es: "Implementación de tracking para operaciones de marketing" },
      { en: "Analytics dashboards for commercial teams", es: "Dashboards de analítica para equipos comerciales" },
      { en: "Large-scale data processing and structuring", es: "Procesamiento y estructuración de datos a gran escala" },
    ],
    stack: ["GA4", "GTM", "Looker Studio", "BigQuery", "Meta Pixel", "BI"],
  },
];

const Servicios = ({ languageState, setLanguageState, scrollRef }: Props) => {
  const l = languageState;

  return (
    <>
      <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
      <div ref={scrollRef} className="page_scroll scrollbar_exp">
      <div className="w-[92%] md:w-[88%] mx-auto py-20">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 bg-[#10dffd]/10 text-[#10dffd] rounded-full outline-2 outline-[#10dffd] p-2">
            <GlobeAltIcon />
          </div>
          <span className="flex items-center gap-1">
            <img src={LogoSinBgBlack} alt="RIANODEVZ" className="h-20 dark:hidden object-contain" />
            <img src={LogoSinBgWhite} alt="RIANODEVZ" className="h-20 hidden dark:block object-contain" />
            <span className="text-xs text-gray-400 dark:text-gray-500">S.A.S.</span>
          </span>
        </div>
        <h1 className="md:text-5xl text-3xl font-light text-white mb-4">
          {l ? "Services" : "Servicios"}
        </h1>
        <p className="text-gray-400 md:text-lg text-sm mb-16 md:w-2/3">
          {l
            ? "Not isolated services. A complete system: web, automation and data working together."
            : "No servicios sueltos. Un sistema completo: web, automatización y datos trabajando juntos."}
        </p>

        {/* Grid map */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {services.map((svc) => (
            <div
              key={svc.index}
              className="border border-[#10dffd]/15 hover:border-[#10dffd]/40 transition-all duration-300 rounded-2xl flex flex-col overflow-hidden bg-black"
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-5 border-b border-[#10dffd]/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#10dffd]/10 rounded-xl p-2">
                    {svc.icon}
                  </div>
                  <span className="text-[#10dffd]/25 text-xs tracking-widest">{svc.index}</span>
                </div>
                <h2 className="text-white font-light text-lg mb-2">
                  {l ? svc.title.en : svc.title.es}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {l ? svc.body.en : svc.body.es}
                </p>
              </div>

              {/* Scope groups */}
              <div className="px-6 py-5 flex flex-col gap-6 flex-1">
                {svc.groups.map((group, gi) => (
                  <div key={gi}>
                    <span className="text-[#10dffd] text-[10px] tracking-[0.25em] uppercase block mb-3">
                      {l ? group.label.en : group.label.es}
                    </span>
                    <ul className="flex flex-col gap-2">
                      {group.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#10dffd]/50 shrink-0" />
                          {l ? item.en : item.es}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Applied cases */}
              <div className="px-6 py-4 border-t border-[#10dffd]/10 bg-[#10dffd]/[0.02]">
                <span className="text-[#10dffd] text-[10px] tracking-[0.25em] uppercase block mb-3">
                  {l ? "Applied cases" : "Casos aplicados"}
                </span>
                <ul className="flex flex-col gap-1.5">
                  {svc.cases.map((c, ci) => (
                    <li key={ci} className="text-xs text-gray-500 leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                      {l ? c.en : c.es}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="px-6 py-4 border-t border-[#10dffd]/10 flex flex-wrap gap-1.5">
                {svc.stack.map((tag) => (
                  <span key={tag} className="text-[10px] bg-[#10dffd]/8 text-[#10dffd] rounded-full px-2.5 py-0.5 border border-[#10dffd]/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* System integration note */}
        <div className="border border-[#10dffd]/10 rounded-2xl px-8 py-6 text-center mb-16">
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            {l
              ? "These three layers are not isolated services. They are designed to operate as a connected system — web captures, automation processes, data measures."
              : "Estas tres capas no son servicios aislados. Están diseñadas para operar como un sistema conectado — la web captura, la automatización procesa, los datos miden."}
          </p>
        </div>

        {/* Custom solutions block */}
        <div className="border border-[#10dffd]/30 rounded-2xl p-8 bg-[#10dffd]/[0.03] mb-16 flex md:flex-row flex-col gap-6 items-start">
          <div className="w-10 bg-[#10dffd]/10 text-[#10dffd] rounded-full outline-2 outline-[#10dffd]/40 p-2 shrink-0">
            <WrenchScrewdriverIcon />
          </div>
          <div>
            <h3 className="text-white font-light text-xl mb-3">
              {l ? "Custom solutions" : "Soluciones a medida"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {l
                ? "Every business is different. We design custom solutions aligned to your specific processes, tools and goals — so the system fits your operation, not the other way around."
                : "Cada negocio es diferente. Diseñamos soluciones personalizadas alineadas a tus procesos, herramientas y objetivos específicos — para que el sistema se adapte a tu operación y no al revés."}
            </p>
          </div>
        </div>

        <div className="border-t border-[#10dffd]/20 pt-12 flex md:flex-row flex-col md:items-center justify-between gap-6">
          <p className="text-white md:text-2xl text-lg font-light">
            {l ? "Ready to build something?" : "¿Listo para construir algo?"}
          </p>
          <Link to="/schedule" className="flex items-center gap-2 bg-[#10dffd] text-black font-light px-6 py-3 rounded-xl hover:opacity-90 transition-opacity w-fit">
            {l ? "Work with us" : "Trabajar con nosotros"}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer languageState={languageState} />
      </div>
    </>
  );
};

export default Servicios;
