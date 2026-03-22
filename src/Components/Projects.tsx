import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

interface Props {
  languageState: boolean;
}

const cases = [
  {
    index: "01",
    title: {
      en: "Conversational automation and AI flows",
      es: "Automatización conversacional y flujos con IA",
    },
    context: {
      en: "Implementation of automated conversation systems for user capture, qualification and management across different types of operations.",
      es: "Implementación de sistemas de conversación automatizada para captura, calificación y gestión de usuarios en diferentes tipos de operación.",
    },
    implementation: {
      en: [
        "Chatbot development with natural conversational behavior",
        "Integration with APIs and messaging platforms",
        "Decision flow automation (dynamic funnels)",
        "Connection with scheduling systems and CRM",
      ],
      es: [
        "Desarrollo de chatbots con comportamiento conversacional natural",
        "Integración con APIs y plataformas de mensajería",
        "Automatización de flujos de decisión (funnels dinámicos)",
        "Conexión con sistemas de agendamiento y CRM",
      ],
    },
    appliedCases: {
      en: [
        "Educational campaigns (user capture and guidance)",
        "Political campaigns (interaction and segmentation)",
        "Automated scheduling for commercial teams",
      ],
      es: [
        "Campañas educativas (captura y orientación de usuarios)",
        "Campañas políticas (interacción y segmentación)",
        "Agendamiento automatizado para equipos comerciales",
      ],
    },
    result: {
      en: "Systems capable of managing conversations in real time, reducing operational load and structuring user data for commercial use.",
      es: "Sistemas capaces de gestionar conversaciones en tiempo real, reducir carga operativa y estructurar la información de usuarios para su uso comercial.",
    },
  },
  {
    index: "02",
    title: {
      en: "Process automation and data management",
      es: "Automatización de procesos y gestión de datos",
    },
    context: {
      en: "Design of solutions to automate internal operations and data handling in non-standardized environments.",
      es: "Diseño de soluciones para automatizar operaciones internas y manejo de datos en entornos no estandarizados.",
    },
    implementation: {
      en: [
        "Operational process automation",
        "Integration of physical and digital systems",
        "Massive data processing and structuring",
        "Custom logic development for non-conventional flows",
      ],
      es: [
        "Automatización de procesos operativos",
        "Integración de sistemas físicos y digitales",
        "Procesamiento y estructuración de datos masivos",
        "Desarrollo de lógica personalizada para flujos no convencionales",
      ],
    },
    appliedCases: {
      en: [
        "Automation systems for residential complexes",
        "Internal data flow automation",
        "Large-scale information processing",
      ],
      es: [
        "Sistemas de automatización para residencias y conjuntos",
        "Automatización de flujos de datos internos",
        "Procesamiento de información a gran escala",
      ],
    },
    result: {
      en: "Reduction of manual processes, greater operational control and availability of structured data for decision-making.",
      es: "Reducción de procesos manuales, mayor control operativo y disponibilidad de datos estructurados para toma de decisiones.",
    },
  },
  {
    index: "03",
    title: {
      en: "Web infrastructure and digital platforms",
      es: "Infraestructura web y plataformas digitales",
    },
    context: {
      en: "Development of web platforms aligned with performance, user experience and technical positioning standards.",
      es: "Desarrollo de plataformas web alineadas con estándares de rendimiento, experiencia de usuario y posicionamiento técnico.",
    },
    implementation: {
      en: [
        "Frontend and backend development",
        "SEO and performance optimization",
        "Tracking and analytics system integration",
        "Interactive experience implementation (3D / XR when applicable)",
      ],
      es: [
        "Desarrollo frontend y backend",
        "Optimización para SEO y rendimiento",
        "Integración de sistemas de tracking y analítica",
        "Implementación de experiencias interactivas (3D / XR cuando aplica)",
      ],
    },
    appliedCases: {
      en: [
        "Platforms for marketing agencies (e.g. Cataly)",
        "Digital experiences for XR companies (e.g. ArcovXR)",
        "Websites for product-oriented businesses",
      ],
      es: [
        "Plataformas para agencias de marketing (ej: Cataly)",
        "Experiencias digitales para empresas de XR (ej: ArcovXR)",
        "Webs para negocios orientados a venta de productos",
      ],
    },
    result: {
      en: "Functional, fast platforms aligned with commercial objectives, ready to integrate with marketing and data systems.",
      es: "Plataformas funcionales, rápidas y alineadas con objetivos comerciales, listas para integrarse con sistemas de marketing y datos.",
    },
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const Projects = ({ languageState }: Props) => {
  const l = languageState;

  return (
    <div className="w-[70%] mx-auto py-10">

      <motion.div
        className="flex items-center gap-3 mb-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="block w-8 h-[2px] bg-[#10dffd]" />
        <span className="text-[#10dffd] text-xs tracking-[0.3em] uppercase">
          {l ? "Case Studies" : "Casos de Estudio"}
        </span>
      </motion.div>

      <div className="flex flex-col gap-16">
        {cases.map((c, idx) => (
          <motion.div
            key={c.index}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ borderColor: "rgba(16,223,253,0.4)" }}
            transition={{ duration: 0.2 }}
            className="border border-[#10dffd]/15 transition-colors rounded-2xl p-8 md:p-10 relative"
          >
            <motion.span
              className="absolute top-8 right-8 text-[#10dffd]/20 text-xs tracking-widest font-light"
              whileInView={{ opacity: [0.1, 0.5, 0.2] }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 + 0.4, duration: 0.6 }}
            >
              {c.index}
            </motion.span>

            <h2 className="text-white text-xl md:text-2xl font-light mb-6 max-w-xl">
              {l ? c.title.en : c.title.es}
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl">
              {l ? c.context.en : c.context.es}
            </p>

            <div className="md:grid md:grid-cols-2 gap-10">
              <div>
                <span className="text-[#10dffd] text-xs tracking-widest uppercase block mb-4">
                  {l ? "Implementation" : "Implementación"}
                </span>
                <ul className="flex flex-col gap-2">
                  {(l ? c.implementation.en : c.implementation.es).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#10dffd] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 md:mt-0">
                <span className="text-[#10dffd] text-xs tracking-widest uppercase block mb-4">
                  {l ? "Applied cases" : "Casos aplicados"}
                </span>
                <ul className="flex flex-col gap-2">
                  {(l ? c.appliedCases.en : c.appliedCases.es).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#10dffd]/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-l-2 border-[#10dffd]/40 pl-5">
              <p className="text-gray-400 text-sm leading-relaxed italic">
                {l ? c.result.en : c.result.es}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/servicios"
                  className="text-xs tracking-widest uppercase font-light text-black bg-[#10dffd] px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  {l ? "View implementation" : "Ver implementación"}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, x: 2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/schedule"
                  className="text-xs tracking-widest uppercase font-light text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-6 py-2.5 rounded-full transition-all"
                >
                  {l ? "Start a conversation" : "Iniciar conversación"}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-gray-600 text-sm text-center mt-16 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {l
          ? "The systems implemented vary by context, but share a common objective: structure, automate and connect digital operations in a functional way."
          : "Los sistemas implementados varían según el contexto, pero comparten un objetivo común: estructurar, automatizar y conectar operaciones digitales de forma funcional."}
      </motion.p>

    </div>
  );
};

export default Projects;
