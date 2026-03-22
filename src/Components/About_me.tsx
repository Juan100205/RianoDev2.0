import Logo_LinkedIn from "./Logos_comp/Logo_LinkedIn";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Logo_wha from "./Logos_comp/Logo_whatsapp";

interface Props {
  languageState: boolean;
}

const About_me = ({ languageState }: Props) => {
  const aboutContent = {
    tag: {
      en: "About RIANODEV",
      es: "Sobre RIANODEV",
    },
    description: {
      en: "RIANODEV is a team focused on the design and implementation of digital systems oriented to marketing and operations. We integrate web development, automation and analytics to build functional and scalable technical infrastructures. Led by Juan José Riaño, with a focus on software engineering and systems.",
      es: "RIANODEV es un equipo enfocado en el diseño e implementación de sistemas digitales orientados a marketing y operaciones. Integramos desarrollo web, automatización y analítica para construir infraestructuras técnicas funcionales y escalables. Liderado por Juan José Riaño, con enfoque en ingeniería de software y sistemas.",
    },
    contactHeader: {
      en: "Get in touch",
      es: "Contacto",
    },
  };

  return (
    <div className="w-4/5 mx-auto md:flex md:flex-row flex-col">
      <div className="relative bg-[url('/src/assets/About_me.jpg')] bg-cover bg-top rounded-xl md:w-2/6 w-full md:h-130 h-90">
        <div className="absolute inset-0 bg-black h-full w-full rounded-xl opacity-20"></div>
        <div className="relative z-10 p-5 flex h-full flex-col justify-between">
          <div>
            <span className="block text-white text-sm">RIANODEV S.A.S.</span>
            <span className="block font-light text-3xl text-[#10dffd]">rianodev</span>
          </div>
          <span className="block w-4/5 text-white opacity-100 md:text-base text-sm">
            {languageState
              ? "Design and implementation of digital systems."
              : "Diseño e implementación de sistemas digitales."}
          </span>
        </div>
      </div>
      <div className="md:w-3/5 w-full md:ml-20 pt-10">
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
            <div className="bg-[#10dffd]/10 text-white dark:text-white outline outline-1 outline-[#10dffd]/30 w-2/7 pr-[20%] pl-[1%] pt-[1%] rounded-xl cursor-pointer hover:opacity-80 transition-opacity">
              <Logo_LinkedIn />
            </div>
            <div className="bg-[#10dffd] text-white w-2/7 pr-[20%] pl-[1%] pt-[1%] rounded-xl cursor-pointer hover:opacity-80 transition-opacity">
              <EnvelopeIcon
                className="hover:scale-110 cursor-pointer transition-all"
                onClick={() => window.open("mailto:juanriza@rianodevz.net", "_blank")}
              />
            </div>
            <div className="bg-[#10dffd]/10 text-white outline outline-1 outline-[#10dffd]/30 w-2/7 pr-[20%] pl-[1%] pt-[1%] rounded-xl cursor-pointer hover:opacity-80 transition-opacity">
              <Logo_wha />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_me;
