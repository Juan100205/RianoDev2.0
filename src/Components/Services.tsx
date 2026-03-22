import {
  CodeBracketIcon,
  BoltIcon,
  ChartBarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { motion, type Variants } from "framer-motion";

interface Props {
  languageState: boolean;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const cardStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const tagStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

const tagItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

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

  const desktopRows = [
    [0, 1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const mobileRows = [[0, 6], [3, 9], [7, 8], [4], [1], [2], [5]];

  return (
    <div className="relative w-[92%] md:w-[80%] mx-auto text-center pt-20 md:pt-50">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#10dffd] opacity-[0.06] blur-[120px] pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
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
      </motion.div>

      {/* Cards */}
      <motion.div
        className="flex md:flex-row flex-col md:w-full justify-center gap-5 mt-20 text-gray-400"
        variants={cardStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {serviceCards.map((card, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}
            className="md:h-auto h-auto md:w-80 w-full mx-auto outline-1 outline-[#10dffd]/25 hover:outline-[#10dffd]/70 transition-colors rounded-2xl flex flex-col justify-start items-center pt-8 pb-8 px-6 gap-4 cursor-default"
          >
            <motion.div whileHover={{ scale: 1.1, rotate: 3 }} transition={{ duration: 0.2 }}>
              {card.icon}
            </motion.div>
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
          </motion.div>
        ))}
      </motion.div>

      {/* Hashtags desktop */}
      <motion.div
        className="text-sm md:flex flex-col hidden mt-15"
        variants={tagStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {desktopRows.map((row, ri) => (
          <div key={ri} className={`flex gap-5 justify-center ${ri > 0 ? "mt-4" : "mt-5"}`}>
            {row.map((idx, ci) => (
              <motion.span
                key={idx}
                variants={tagItem}
                whileHover={{ scale: 1.07 }}
                className={`rounded-full p-2 px-3 cursor-default ${(ri + ci) % 2 === 0 ? "bg-[#10dffd] text-white" : "bg-[#10dffd]/10 text-[#10dffd]"}`}
              >
                {languageState ? hashtagList[idx].en : hashtagList[idx].es}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Hashtags mobile */}
      <motion.div
        className="text-xs md:hidden flex-col flex mt-15"
        variants={tagStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {mobileRows.map((row, ri) => (
          <div key={ri} className={`flex gap-5 justify-center ${ri > 0 ? "mt-2" : "mt-5"}`}>
            {row.map((idx, ci) => (
              <motion.span
                key={idx}
                variants={tagItem}
                className={`rounded-full p-2 px-3 ${(ri + ci) % 2 === 0 ? "bg-[#10dffd] text-white" : "bg-[#10dffd]/10 text-[#10dffd]"}`}
              >
                {languageState ? hashtagList[idx].en : hashtagList[idx].es}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
