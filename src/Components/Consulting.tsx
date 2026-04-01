import React from "react";
import {
  MagnifyingGlassIcon,
  CpuChipIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";
import type { JSX } from "react";
import { motion, type Variants } from "framer-motion";

interface Card {
  step: string;
  icon: JSX.Element;
  title: { en: string; es: string };
  text: { en: string; es: string };
}

interface Props {
  languageState: boolean;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

const cardStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const TechPartnerCarousel: React.FC<Props> = ({ languageState }) => {
  const steps: Card[] = [
    {
      step: "01",
      icon: <MagnifyingGlassIcon className="w-7 h-7 text-[#10dffd]" />,
      title: { en: "Technical evaluation", es: "Evaluación técnica" },
      text: {
        en: "Analysis of current infrastructure, tools, data flows and operational friction points.",
        es: "Análisis de infraestructura actual, herramientas, flujos de datos y puntos de fricción operativa.",
      },
    },
    {
      step: "02",
      icon: <CpuChipIcon className="w-7 h-7 text-[#10dffd]" />,
      title: { en: "Architecture design", es: "Diseño de arquitectura" },
      text: {
        en: "Definition of technical structure: integrations, automation, data capture and system logic.",
        es: "Definición de estructura técnica: integraciones, automatización, captura de datos y lógica del sistema.",
      },
    },
    {
      step: "03",
      icon: <BoltIcon className="w-7 h-7 text-[#10dffd]" />,
      title: { en: "Development & integration", es: "Desarrollo e integración" },
      text: {
        en: "Solution implementation: web development, service connection and automation deployment.",
        es: "Implementación de la solución: desarrollo web, conexión de servicios y despliegue de automatizaciones.",
      },
    },
    {
      step: "04",
      icon: <ArrowTrendingUpIcon className="w-7 h-7 text-[#10dffd]" />,
      title: { en: "Monitoring & optimization", es: "Monitoreo y optimización" },
      text: {
        en: "Continuous data-driven tracking for system adjustment and improvement.",
        es: "Seguimiento continuo basado en datos para ajuste y mejora del sistema.",
      },
    },
  ];

  return (
    <section className="w-[90%] md:w-[80%] mx-auto py-16 md:py-24 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#10dffd] opacity-[0.04] blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="flex flex-col items-center gap-4 text-center mb-14"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#10dffd]/40" />
          <span className="text-[#10dffd]/60 text-[10px] tracking-[0.35em] uppercase font-display">
            {languageState ? "How we work" : "Cómo trabajamos"}
          </span>
          <span className="w-6 h-px bg-[#10dffd]/40" />
        </div>
        <h2 className="text-white font-light text-2xl md:text-3xl">
          {languageState ? "Implementation model" : "Modelo de implementación"}
        </h2>
      </motion.div>

      {/* Steps grid with connector line on desktop */}
      <div className="relative">
        {/* Horizontal connector — desktop only */}
        <div className="hidden md:block absolute top-[2.75rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#10dffd]/20 to-transparent z-0" />

        <motion.div
          className="grid md:grid-cols-4 gap-4 relative z-10"
          variants={cardStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative border border-[#10dffd]/25 hover:border-[#10dffd]/60
                rounded-2xl p-6 flex flex-col gap-4 cursor-default
                hover:shadow-[0_8px_40px_rgba(16,223,253,0.06)]
                transition-all duration-300 bg-black/20 backdrop-blur-sm"
            >
              {/* Corner decorators */}
              <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#10dffd]/38 rounded-tl-2xl group-hover:border-[#10dffd]/70 transition-colors" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#10dffd]/38 rounded-br-2xl group-hover:border-[#10dffd]/70 transition-colors" />

              {/* Icon + step */}
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#10dffd]/10 border border-[#10dffd]/38 flex items-center justify-center
                  group-hover:bg-[#10dffd]/15 group-hover:border-[#10dffd]/60 transition-all duration-300
                  group-hover:shadow-[0_0_16px_rgba(16,223,253,0.2)]">
                  {step.icon}
                </div>
                <span className="text-[#10dffd]/20 text-[10px] tracking-[0.3em] font-display">{step.step}</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-white text-sm font-light">
                  {languageState ? step.title.en : step.title.es}
                </h3>
                <p className="text-white/35 text-xs leading-relaxed">
                  {languageState ? step.text.en : step.text.es}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechPartnerCarousel;
