import { motion, type Variants } from "framer-motion";

interface Props {
  languageState: boolean;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

const problemStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const WhySection = ({ languageState }: Props) => {
  const problems = [
    {
      index: "01",
      en: { title: "Inconsistent tracking", body: "Badly implemented or incomplete events generate unreliable data that distorts every downstream decision." },
      es: { title: "Tracking inconsistente", body: "Eventos mal implementados o incompletos generan datos poco confiables que distorsionan cada decisión." },
    },
    {
      index: "02",
      en: { title: "Non-integrated systems", body: "Tools operating in isolation without unified data flow, creating silos that block operational visibility." },
      es: { title: "Sistemas no integrados", body: "Herramientas que operan de forma aislada sin flujo de datos unificado, creando silos que bloquean la visibilidad operativa." },
    },
    {
      index: "03",
      en: { title: "Manual processes", body: "Repetitive operations that consume team bandwidth and prevent the business from scaling efficiently." },
      es: { title: "Procesos manuales", body: "Operaciones repetitivas que consumen capacidad del equipo e impiden que el negocio escale de forma eficiente." },
    },
  ];

  return (
    <section className="w-[90%] md:w-[80%] mx-auto py-20 md:py-28 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#10dffd] opacity-[0.04] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#10dffd]/[0.03] via-transparent to-transparent pointer-events-none" />

      {/* Eyebrow */}
      <motion.div
        className="flex items-center gap-3 mb-12"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="block w-8 h-px bg-[#10dffd]" />
        <span className="font-display text-[#10dffd]/60 text-[10px] tracking-[0.35em] uppercase">
          {languageState ? "Structural problems" : "Problemas estructurales"}
        </span>
      </motion.div>

      <div className="md:grid md:grid-cols-5 gap-16 items-start">
        {/* Left — title + close */}
        <motion.div
          className="md:col-span-2 mb-12 md:mb-0 flex flex-col gap-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h2 className="text-white text-2xl md:text-3xl font-light leading-tight">
            {languageState
              ? "Structural problems in marketing systems"
              : "Problemas estructurales en sistemas de marketing"}
          </h2>
          <p className="text-[#10dffd]/70 text-sm md:text-base font-light leading-relaxed">
            {languageState
              ? "These are not strategy problems. They are technical implementation problems."
              : "Estos problemas no son de estrategia. Son de implementación técnica."}
          </p>
          <div className="w-12 h-px bg-[#10dffd]/30 mt-2" />
        </motion.div>

        {/* Right — problems */}
        <motion.div
          className="md:col-span-3 flex flex-col gap-6"
          variants={problemStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {problems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="group flex gap-5 items-start border-l-2 border-[#10dffd]/30
                hover:border-[#10dffd]/70 pl-5 transition-colors duration-300 cursor-default"
            >
              <span className="text-[#10dffd]/20 text-[10px] tracking-[0.3em] font-display mt-1 shrink-0 group-hover:text-[#10dffd]/40 transition-colors">
                {item.index}
              </span>
              <div>
                <h4 className="text-white text-sm font-light mb-1.5">
                  {languageState ? item.en.title : item.es.title}
                </h4>
                <p className="text-white/35 text-xs leading-relaxed">
                  {languageState ? item.en.body : item.es.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
