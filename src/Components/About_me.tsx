import Logo_LinkedIn from "./Logos_comp/Logo_LinkedIn";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Logo_wha from "./Logos_comp/Logo_whatsapp";
import { motion } from "framer-motion";

interface Props {
  languageState: boolean;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const About_me = ({ languageState }: Props) => {
  const aboutContent = {
    tag: { en: "About RIANODEVZ", es: "Sobre RIANODEVZ" },
    description: {
      en: "RIANODEVZ is a team focused on the design and implementation of digital systems oriented to marketing and operations. We integrate web development, automation and analytics to build functional and scalable technical infrastructures. Led by Juan José Riaño, with a focus on software engineering and systems.",
      es: "RIANODEVZ es un equipo enfocado en el diseño e implementación de sistemas digitales orientados a marketing y operaciones. Integramos desarrollo web, automatización y analítica para construir infraestructuras técnicas funcionales y escalables. Liderado por Juan José Riaño, con enfoque en ingeniería de software y sistemas.",
    },
    contactHeader: { en: "Get in touch", es: "Contacto" },
    stats: [
      { value: "3+", en: "Years building", es: "Años construyendo" },
      { value: "20+", en: "Projects shipped", es: "Proyectos entregados" },
      { value: "100%", en: "Data-driven", es: "Orientado a datos" },
    ],
  };

  return (
    <div className="w-[90%] md:w-[80%] mx-auto">
      <div className="md:grid md:grid-cols-5 gap-12 items-start">

        {/* Image card */}
        <motion.div
          className="relative bg-[url('/src/assets/About_me.jpg')] bg-cover bg-top rounded-2xl
            md:col-span-2 w-full md:h-[480px] h-72 overflow-hidden"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
        >
          {/* Corner decorators */}
          <span className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#10dffd]/70 rounded-tl-2xl z-20" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#10dffd]/70 rounded-br-2xl z-20" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />

          <div className="relative z-20 p-6 flex h-full flex-col justify-between">
            <div>
              <span className="block text-white/50 text-[10px] tracking-[0.3em] uppercase font-display">RIANODEVZ S.A.S.</span>
            </div>
            <div>
              <span className="block font-banner font-light text-2xl text-[#10dffd] leading-none">rianodevz</span>
              <span className="block mt-2 text-white/60 text-xs font-display">
                {languageState
                  ? "Design and implementation of digital systems."
                  : "Diseño e implementación de sistemas digitales."}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="md:col-span-3 flex flex-col gap-8 pt-8 md:pt-0"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-[#10dffd]/50" />
            <span className="text-[#10dffd]/60 text-[10px] tracking-[0.35em] uppercase font-display">
              {languageState ? aboutContent.tag.en : aboutContent.tag.es}
            </span>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed">
            {languageState ? aboutContent.description.en : aboutContent.description.es}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-y border-[#10dffd]/22 py-6">
            {aboutContent.stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-1 text-center">
                <span className="font-banner font-light text-[#10dffd] text-2xl md:text-3xl leading-none">{s.value}</span>
                <span className="text-white/35 text-[10px] tracking-wide uppercase">
                  {languageState ? s.en : s.es}
                </span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-light text-lg mb-5">
              {languageState ? aboutContent.contactHeader.en : aboutContent.contactHeader.es}
            </h3>
            <div className="flex gap-3">
              <motion.a
                href="https://linkedin.com/in/juanriza"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-xl bg-[#10dffd]/8 border border-[#10dffd]/38
                  hover:border-[#10dffd]/70 hover:bg-[#10dffd]/15 transition-all duration-300
                  flex items-center justify-center cursor-pointer text-[#10dffd]"
              >
                <div className="w-6 h-6"><Logo_LinkedIn /></div>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("mailto:juanriza@rianodevz.net", "_blank")}
                className="w-14 h-14 rounded-xl bg-[#10dffd] hover:opacity-90 transition-all duration-300
                  flex items-center justify-center cursor-pointer
                  shadow-[0_0_20px_rgba(16,223,253,0.25)] hover:shadow-[0_0_30px_rgba(16,223,253,0.65)]"
              >
                <EnvelopeIcon className="w-6 h-6 text-black" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://wa.me/3124508591", "_blank")}
                className="w-14 h-14 rounded-xl bg-[#10dffd]/8 border border-[#10dffd]/38
                  hover:border-[#10dffd]/70 hover:bg-[#10dffd]/15 transition-all duration-300
                  flex items-center justify-center cursor-pointer text-[#10dffd]"
              >
                <div className="w-6 h-6"><Logo_wha /></div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About_me;
