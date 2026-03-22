import {
  CodeBracketIcon,
  BoltIcon,
  ChartBarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

interface Props {
  languageState: boolean;
}

const Services = ({ languageState }: Props) => {
  const serviceCards = [
    {
      icon: <CodeBracketIcon className="w-15 text-gray-400 mx-auto" />,
      en: {
        title: "Web Infrastructure",
        body: "Custom web development oriented to performance and conversion. Architecture defined before writing a single line — structured for growth.",
      },
      es: {
        title: "Infraestructura Web",
        body: "Desarrollo web personalizado orientado a rendimiento y conversión. La arquitectura se define antes de escribir una sola línea — estructurada para escalar.",
      },
      tags: ["React", "Next.js", "SEO", "CRO"],
    },
    {
      icon: <BoltIcon className="w-15 text-gray-400 mx-auto" />,
      en: {
        title: "Automation & AI",
        body: "Mapping of operational flows and automation of repetitive processes. Integration between platforms with defined logic and traceable execution.",
      },
      es: {
        title: "Automatización & IA",
        body: "Mapeo de flujos operativos y automatización de procesos repetitivos. Integración entre plataformas con lógica definida y ejecución trazable.",
      },
      tags: ["n8n", "Make", "AI Agents", "Zapier"],
    },
    {
      icon: <ChartBarIcon className="w-15 text-gray-400 mx-auto" />,
      en: {
        title: "Data & Tracking",
        body: "Correct event implementation, validated data layers and connected analytics. Clean data at the source — not cleaned up downstream.",
      },
      es: {
        title: "Data & Tracking",
        body: "Implementación correcta de eventos, capas de datos validadas y analítica conectada. Datos limpios en el origen — no corregidos después.",
      },
      tags: ["GA4", "GTM", "Dashboards", "Pixels"],
    },
  ];

  const hashtagList = [
    { en: "#WebDevelopment", es: "#DesarrolloWeb" },
    { en: "#AIAutomation", es: "#AutomatizaciónIA" },
    { en: "#DataTracking", es: "#TrackingDeDatos" },
    { en: "#ConversionOptimization", es: "#OptimizaciónDeConversión" },
    { en: "#MarketingTech", es: "#MarketingTech" },
    { en: "#SEO", es: "#SEO" },
    { en: "#Workflows", es: "#Flujos" },
    { en: "#SystemsIntegration", es: "#IntegraciónDeSistemas" },
    { en: "#Funnels", es: "#Funnels" },
    { en: "#Analytics", es: "#Analítica" },
  ];

  return (
    <div className="relative w-[80%] mx-auto text-center overflow-x-hidden pt-50">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#10dffd] opacity-[0.06] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div>
        <div className="md:w-20 w-15 bg-[#10dffd]/10 text-[#10dffd] rounded-full outline-2 outline-[#10dffd]/40 mx-auto p-3">
          <GlobeAltIcon />
        </div>
        <h1 className="md:text-3xl text-xl font-light text-center mt-5 text-white">
          {languageState ? "System components" : "Componentes del sistema"}
        </h1>

        <p className="text-gray-400 text-center mt-15 md:px-40 md:text-base text-sm">
          {languageState
            ? "Three technical layers that work as a single system. Each one handles a specific function — together they form the operational infrastructure."
            : "Tres capas técnicas que funcionan como un solo sistema. Cada una resuelve una función específica — juntas forman la infraestructura operativa."}
        </p>
      </div>

      <div className="flex md:flex-row flex-col md:w-full justify-center gap-5 mt-20 text-gray-400">
        {serviceCards.map((card, i) => (
          <div
            key={i}
            className="md:h-auto h-auto md:w-80 w-70 mx-auto outline-1 outline-[#10dffd]/25 hover:outline-[#10dffd]/70 transition-all rounded-2xl flex flex-col justify-start items-center pt-8 pb-8 px-6 gap-4"
          >
            {card.icon}
            <span className="text-white text-sm font-light">
              {languageState ? card.en.title : card.es.title}
            </span>
            <p className="text-gray-500 text-xs leading-relaxed text-center">
              {languageState ? card.en.body : card.es.body}
            </p>
            <div className="flex flex-wrap gap-1 justify-center mt-1">
              {card.tags.map((t) => (
                <span key={t} className="text-xs bg-[#10dffd]/10 text-[#10dffd] rounded-full px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm md:flex flex-col hidden mt-15">
        <div className="flex gap-5 mt-5 justify-center">
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[0].en : hashtagList[0].es}</span>
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[1].en : hashtagList[1].es}</span>
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[2].en : hashtagList[2].es}</span>
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[3].en : hashtagList[3].es}</span>
        </div>
        <div className="mt-4 flex gap-5 justify-center">
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[4].en : hashtagList[4].es}</span>
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[5].en : hashtagList[5].es}</span>
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[6].en : hashtagList[6].es}</span>
        </div>
        <div className="flex gap-5 justify-center mt-4">
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[7].en : hashtagList[7].es}</span>
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[8].en : hashtagList[8].es}</span>
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[9].en : hashtagList[9].es}</span>
        </div>
      </div>

      <div className="text-xs md:hidden flex-col flex mt-15">
        <div className="flex gap-5 mt-5 justify-center">
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[0].en : hashtagList[0].es}</span>
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[6].en : hashtagList[6].es}</span>
        </div>
        <div className="mt-2 flex gap-3 justify-center">
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[3].en : hashtagList[3].es}</span>
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[9].en : hashtagList[9].es}</span>
        </div>
        <div className="flex gap-5 mt-2 justify-center">
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[7].en : hashtagList[7].es}</span>
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[8].en : hashtagList[8].es}</span>
        </div>
        <div className="flex gap-5 justify-center mt-2">
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[4].en : hashtagList[4].es}</span>
        </div>
        <div className="flex gap-5 mt-2 justify-center">
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[1].en : hashtagList[1].es}</span>
        </div>
        <div className="flex gap-5 mt-2 justify-center">
          <span className="bg-[#10dffd]/10 text-[#10dffd] rounded-full p-2 px-3">{languageState ? hashtagList[2].en : hashtagList[2].es}</span>
        </div>
        <div className="flex gap-5 mt-2 justify-center">
          <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">{languageState ? hashtagList[5].en : hashtagList[5].es}</span>
        </div>
      </div>
    </div>
  );
};

export default Services;
