import {
  CodeBracketIcon,
  BoltIcon,
  ChartBarIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { motion, type Variants } from "framer-motion";
import { useRef, type MouseEvent } from "react";

interface Props {
  languageState: boolean;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease } },
};

const cardStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const tagStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const tagItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Spotlight card with mouse-follow glow
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.removeProperty("--mx");
    card.style.removeProperty("--my");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      {/* Spotlight radial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
        style={{
          background:
            "radial-gradient(200px circle at var(--mx) var(--my), rgba(16,223,253,0.07), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

const Services = ({ languageState }: Props) => {
  const serviceCards = [
    {
      index: "01",
      icon: <CodeBracketIcon className="w-6 h-6 text-[#10dffd]" />,
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
      index: "02",
      icon: <BoltIcon className="w-6 h-6 text-[#10dffd]" />,
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
      index: "03",
      icon: <ChartBarIcon className="w-6 h-6 text-[#10dffd]" />,
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
    <div className="relative w-[90%] md:w-[80%] mx-auto text-center pt-20 md:pt-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-[#10dffd] opacity-[0.05] blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Section header */}
      <motion.div
        className="flex flex-col items-center gap-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#10dffd]/10 border border-[#10dffd]/45 flex items-center justify-center">
          <CpuChipIcon className="w-5 h-5 text-[#10dffd]" />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#10dffd]/40" />
          <span className="text-[#10dffd]/60 text-[10px] tracking-[0.35em] uppercase font-display">
            {languageState ? "System components" : "Componentes del sistema"}
          </span>
          <span className="w-6 h-px bg-[#10dffd]/40" />
        </div>
        <h2 className="md:text-3xl text-xl font-light text-white">
          {languageState ? "Three layers. One system." : "Tres capas. Un sistema."}
        </h2>
        <p className="text-white/40 mt-2 md:px-32 md:text-sm text-xs max-w-xl leading-relaxed">
          {languageState
            ? "Each one handles a specific function — together they form the operational infrastructure for your marketing."
            : "Cada una resuelve una función específica — juntas forman la infraestructura operativa de tu marketing."}
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-4 mt-14"
        variants={cardStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {serviceCards.map((card, i) => (
          <motion.div key={i} variants={fadeUp}>
            <SpotlightCard className="h-full">
              <div
                className="relative h-full border border-[#10dffd]/30 hover:border-[#10dffd]/60
                  rounded-2xl flex flex-col items-start pt-8 pb-8 px-7 gap-5 cursor-default
                  transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,223,253,0.05)]
                  text-left z-10"
              >
                {/* Corner decorators */}
                <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#10dffd]/50 rounded-tl-2xl" />
                <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-[#10dffd]/50 rounded-tr-2xl" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-[#10dffd]/50 rounded-bl-2xl" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#10dffd]/50 rounded-br-2xl" />

                {/* Header row */}
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-[#10dffd]/10 border border-[#10dffd]/38 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="text-[#10dffd]/20 text-xs tracking-widest font-light">{card.index}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-white text-sm font-light tracking-wide">
                    {languageState ? card.en.title : card.es.title}
                  </span>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {languageState ? card.en.body : card.es.body}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-[#10dffd]/22 w-full">
                  {card.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-[#10dffd]/8 text-[#10dffd]/70 rounded-full px-2.5 py-1 border border-[#10dffd]/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Hashtags desktop */}
      <motion.div
        className="text-sm md:flex flex-col hidden mt-16"
        variants={tagStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {desktopRows.map((row, ri) => (
          <div key={ri} className={`flex gap-4 justify-center ${ri > 0 ? "mt-3" : "mt-4"}`}>
            {row.map((idx, ci) => (
              <motion.span
                key={idx}
                variants={tagItem}
                whileHover={{ scale: 1.06, y: -2 }}
                className={`rounded-full py-1.5 px-4 text-xs cursor-default transition-all duration-200
                  ${(ri + ci) % 2 === 0
                    ? "bg-[#10dffd] text-black font-display shadow-[0_0_14px_rgba(16,223,253,0.3)]"
                    : "bg-[#10dffd]/10 text-[#10dffd] border border-[#10dffd]/38"
                  }`}
              >
                {languageState ? hashtagList[idx].en : hashtagList[idx].es}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Hashtags mobile */}
      <motion.div
        className="text-xs md:hidden flex-col flex mt-12"
        variants={tagStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {mobileRows.map((row, ri) => (
          <div key={ri} className={`flex gap-3 justify-center ${ri > 0 ? "mt-2.5" : "mt-4"}`}>
            {row.map((idx, ci) => (
              <motion.span
                key={idx}
                variants={tagItem}
                className={`rounded-full py-1.5 px-3 ${(ri + ci) % 2 === 0
                  ? "bg-[#10dffd] text-black"
                  : "bg-[#10dffd]/10 text-[#10dffd]"
                  }`}
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
