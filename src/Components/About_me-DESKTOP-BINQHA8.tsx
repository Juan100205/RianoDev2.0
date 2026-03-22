import Logo_LinkedIn from "./Logos_comp/Logo_LinkedIn";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Logo_wha from "./Logos_comp/Logo_whatsapp";
interface Props {
  languageState: boolean;
}
const About_me = ({ languageState }: Props) => {
  const aboutContent = {
    name: "Juan Jose Riaño",
    headerGreeting: {
      en: "Hello World; I’m",
      es: "Hola Mundo; Soy",
    },
    roleTitle: {
      en: "</Innovation Architect & Digital Transformation>",
      es: "</Arquitecto de Innovación y Transformación Digital>",
    },
introduction: {
  en: "RIANODEVZ partners with organizations to architect transformative solutions that scale impact and drive competitive advantage.",
  es: "RIANODEVZ colabora con organizaciones para arquitectar soluciones transformadoras que escalen el impacto y generen ventaja competitiva.",
},

    description: {
      en: "With deep expertise in software engineering, mechanical systems, and emerging technologies, RIANODEVZ synthesizes technical excellence with strategic vision to architect scalable, impact-driven solutions. The firm's approach integrates innovation strategy, XR/AI integration, and digital transformation to unlock new value streams and competitive advantages for forward-thinking organizations.",
      es: "Con experiencia profunda en ingeniería de software, sistemas mecánicos y tecnologías emergentes, RIANODEVZ sintetiza excelencia técnica con visión estratégica para arquitectar soluciones escalables orientadas al impacto. El enfoque de la firma integra estrategia de innovación, integración de XR/IA y transformación digital para desbloquear nuevas fuentes de valor y ventajas competitivas en organizaciones visionarias.",
    },
    contactHeader: {
      en: "</Let’s connect>",
      es: "</Conectemos>",
    },
  };

  return (
    <div className="w-4/5 mx-auto md:flex md:flex-row flex-col">
      <div className="relative bg-[url('/src/assets/About_me.jpg')] bg-cover bg-top rounded-xl md:w-2/6 w-full md:h-130 h-90">
        <div className="absolute inset-0 bg-black h-full w-full rounded-xl opacity-20 "></div>
        <div className="relative z-10 p-5 flex h-full flex-col justify-between">
          <div>
            <span className="block text-white ">Hello World; We're</span>
            <span className="block font-light text-3xl text-[#10dffd]">
              rianodevz
            </span>
          </div>
          <span className="block w-4/5 text-white opacity-100 md:text-base text-sm">
            {" "}
            {languageState
              ? aboutContent.introduction.en
              : aboutContent.introduction.es}
          </span>
        </div>
      </div>
      <div className=" md:w-3/5 w-full md:ml-20 pt-10">
        <div className="border-b border-[#10dffd]/20 md:mr-15">
          <h1 className="md:text-3xl text-base font-light text-white">
            {languageState
              ? aboutContent.roleTitle.en
              : aboutContent.roleTitle.es}
          </h1>
          <p className="md:text-1xl text-sm md:ml-10 md:mt-10 mt-5  text-gray-400 pb-5 md:pb-15">
            {languageState
              ? aboutContent.description.en
              : aboutContent.description.es}
          </p>
        </div>
        <div>
          <h1 className="md:text-3xl text-base font-light mt-3 md:mt-5 text-center md:text-start text-white">
            {languageState
              ? aboutContent.contactHeader.en
              : aboutContent.contactHeader.es}
          </h1>
          <div className="flex md:mt-10 mt-5 h-20 md:h-35 mx-auto justify-between w-full md:w-10/12 md:mr-20">
            <div className="bg-[#10dffd]/10 text-white dark:text-white outline outline-1 outline-[#10dffd]/30 w-2/7 pr-[20%] pl-[1%] pt-[1%] rounded-xl cursor-pointer hover:opacity-80 transition-opacity">
              <Logo_LinkedIn />
            </div>
            <div className="bg-[#10dffd] text-white w-2/7 pr-[20%] pl-[1%] pt-[1%] rounded-xl cursor-pointer hover:opacity-80 transition-opacity">
              <EnvelopeIcon
                className="hover:scale-110 cursor-pointer transition-all"
                onClick={() =>
                  window.open("mailto:juanjorianozabaleta@gmail.com", "_blank")
                }
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
