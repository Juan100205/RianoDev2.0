import Logo_LinkedIn from "./Logos_comp/Logo_LinkedIn";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Logo_wha from "./Logos_comp/Logo_whatsapp";
import { motion } from "framer-motion";

interface Props {
  languageState: boolean;
}

const About_me = ({ languageState }: Props) => {
  const aboutContent = {
    tag: {
      en: "About RIANODEVZ",
      es: "Sobre RIANODEVZ",
    },
    description: {
      en: "RIANODEVZ is a team focused on the design and implementation of digital systems oriented to marketing and operations. We integrate web development, automation and analytics to build functional and scalable technical infrastructures. Led by Juan José Riaño, with a focus on software engineering and systems.",
      es: "RIANODEVZ es un equipo enfocado en el diseño e implementación de sistemas digitales orientados a marketing y operaciones. Integramos desarrollo web, automatización y analítica para construir infraestructuras técnicas funcionales y escalables. Liderado por Juan José Riaño, con enfoque en ingeniería de software y sistemas.",
    },
    contactHeader: {
      en: "Get in touch",
      es: "Contacto",
    },
  };

  return (
    <div className="w-4/5 mx-auto md:flex md:flex-row flex-col">
      <motion.div
        className="relative bg-[url('/src/assets/About_me.jpg')] bg-cover bg-top rounded-xl md:w-2/6 w-full md:h-130 h-90"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="absolute inset-0 bg-black h-full w-full rounded-xl opacity-20"></div>
        <div className="relative z-10 p-5 flex h-full flex-col justify-between">
          <div>
            <span className="block text-white text-sm">RIANODEVZ S.A.S.</span>
            <span className="block font-light text-3xl text-[#10dffd]">rianodevz</span>
          </div>
          <span className="block w-4/5 text-white opacity-100 md:text-base text-sm">
            {languageState
              ? "Design and implementation of digital systems."
              : "Diseño e implementación de sistemas digitales."}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="md:w-3/5 w-full md:ml-20 pt-10"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      >
        <div className="border-b border-[#10dffd]/20 md:mr-15">
          <h1 className="md:text-3xl text-base font-light text-white">
            {languageState ? aboutContent.tag.en : aboutContent.tag.es}
          </h1>
          <p className="md:text-base text-sm md:ml-10 md:mt-10 mt-5 text-gray-400 pb-5 md:pb-15 leading-relaxed">
            {languageState ? aboutContent.description.en : aboutContent.description.es}
          </p>
        </div>
        <div>
          <h1 className="md:text-3xl text-base font-light mt-3 md:mt-5 text-center md:text-start text-white">
            {languageState ? aboutContent.contactHeader.en : aboutContent.contactHeader.es}
          </h1>
          <div className="flex md:mt-10 mt-5 h-20 md:h-35 mx-auto justify-between w-full md:w-10/12 md:mr-20">
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#10dffd]/10 text-white dark:text-white outline outline-1 outline-[#10dffd]/30 w-2/7 p-3 rounded-xl cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
            >
              <Logo_LinkedIn />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#10dffd] text-white w-2/7 p-3 rounded-xl cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
            >
              <EnvelopeIcon
                className="hover:scale-110 cursor-pointer transition-all"
                onClick={() => window.open("mailto:juanriza@rianodevz.net", "_blank")}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#10dffd]/10 text-white outline outline-1 outline-[#10dffd]/30 w-2/7 p-3 rounded-xl cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
            >
              <Logo_wha />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About_me;
