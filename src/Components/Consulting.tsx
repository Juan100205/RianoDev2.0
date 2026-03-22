import React from "react";
import {
  MagnifyingGlassIcon,
  CpuChipIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";
import type { JSX } from "react/jsx-dev-runtime";

interface Card {
  step: string;
  icon: JSX.Element;
  title: { en: string; es: string };
  text: { en: string; es: string };
}

interface Props {
  languageState: boolean;
}

const TechPartnerCarousel: React.FC<Props> = ({ languageState }) => {
  const steps: Card[] = [
    {
      step: "01",
      icon: <MagnifyingGlassIcon className="w-10 h-10 text-[#10dffd]" />,
      title: { en: "Technical evaluation", es: "Evaluación técnica" },
      text: {
        en: "Analysis of current infrastructure, tools, data flows and operational friction points.",
        es: "Análisis de infraestructura actual, herramientas, flujos de datos y puntos de fricción operativa.",
      },
    },
    {
      step: "02",
      icon: <CpuChipIcon className="w-10 h-10 text-[#10dffd]" />,
      title: { en: "Architecture design", es: "Diseño de arquitectura" },
      text: {
        en: "Definition of technical structure: integrations, automation, data capture and system logic.",
        es: "Definición de estructura técnica: integraciones, automatización, captura de datos y lógica del sistema.",
      },
    },
    {
      step: "03",
      icon: <BoltIcon className="w-10 h-10 text-[#10dffd]" />,
      title: { en: "Development & integration", es: "Desarrollo e integración" },
      text: {
        en: "Solution implementation: web development, service connection and automation deployment.",
        es: "Implementación de la solución: desarrollo web, conexión de servicios y despliegue de automatizaciones.",
      },
    },
    {
      step: "04",
      icon: <ArrowTrendingUpIcon className="w-10 h-10 text-[#10dffd]" />,
      title: { en: "Monitoring & optimization", es: "Monitoreo y optimización" },
      text: {
        en: "Continuous data-driven tracking for system adjustment and improvement.",
        es: "Seguimiento continuo basado en datos para ajuste y mejora del sistema.",
      },
    },
  ];

  return (
    <section className="w-full px-6 md:px-16 py-10 relative overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-light text-center mb-10 text-white">
        {languageState ? "Implementation model" : "Modelo de implementación"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-black rounded-2xl p-5 py-10 flex flex-col
            items-center justify-center text-center border border-[#10dffd]/20
            hover:border-[#10dffd]/60 hover:shadow-[0_0_30px_rgba(16,223,253,0.08)]
            transition-all duration-300 min-h-[220px] relative"
          >
            <span className="absolute top-5 left-6 font-display text-xs text-[#10dffd]/30 tracking-widest">{step.step}</span>
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-lg font-light mb-2 text-white">{languageState ? step.title.en : step.title.es}</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {languageState ? step.text.en : step.text.es}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechPartnerCarousel;
