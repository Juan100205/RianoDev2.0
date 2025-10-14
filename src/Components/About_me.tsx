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
      en: "</Software and mechanical engineer>",
      es: "</Ingeniero de software y mecánico>",
    },
    introduction: {
      en: "I create innovative user experiences that blend functionality and creativity.",
      es: "Creo experiencias de usuario innovadoras que combinan funcionalidad y creatividad.",
    },
    description: {
      en: "Experienced in leading the development of innovative 3D applications, websites, and web apps. Skilled at identifying and applying the right technologies to solve real-world problems with functional, visually engaging solutions.",
      es: "Experto en liderar el desarrollo de aplicaciones 3D, sitios web y aplicaciones web innovadoras. Capaz de identificar y aplicar las tecnologías adecuadas para resolver problemas reales con soluciones funcionales y visualmente atractivas.",
    },
    contactHeader: {
      en: "</Get in touch>",
      es: "</Contáctame>",
    },
  };

  return (
    <div className="w-4/5 mx-auto md:flex md:flex-row flex-col">
      <div className="relative bg-[url('/src/assets/About_me.jpg')] bg-cover bg-top rounded-xl md:w-2/6 w-full md:h-130 h-90">
        <div className="absolute inset-0 bg-black h-full w-full rounded-xl opacity-20 "></div>
        <div className="relative z-10 p-5 flex h-full flex-col justify-between">
          <div>
            <span className="block text-white ">Hello World; I’m</span>
            <span className="block font-black text-3xl text-[#10dffd]">
              Juan José Riaño 
            </span>
          </div>
          <span className="block w-4/5 text-gray-300 opacity-80 md:text-base text-sm">
            {" "}
            {languageState
              ? aboutContent.introduction.en
              : aboutContent.introduction.es}
          </span>
        </div>
      </div>
      <div className=" md:w-3/5 w-full md:ml-20 pt-10">
        <div className="border-b-2 border-gray-300 md:mr-15">
          <h1 className="md:text-3xl text-base font-bold">
            {languageState
              ? aboutContent.roleTitle.en
              : aboutContent.roleTitle.es}
          </h1>
          <p className="md:text-1xl text-xs md:ml-10 md:mt-10 mt-5  text-gray-500 pb-5 md:pb-15">
            {languageState
              ? aboutContent.description.en
              : aboutContent.description.es}
          </p>
        </div>
        <div>
          <h1 className="md:text-3xl text-base font-bold mt-3 md:mt-5 text-center md:text-start">
            {languageState
              ? aboutContent.contactHeader.en
              : aboutContent.contactHeader.es}
          </h1>
          <div className="flex md:mt-10 mt-5 h-20 md:h-35 mx-auto justify-between w-full md:w-10/12 md:mr-20">
            <div className="bg-black fill-white w-2/7 pr-[20%] pl-[1%] pt-[1%] rounded-xl">
              <Logo_LinkedIn />
            </div>
            <div className="bg-[#10dffd] text-white w-2/7 pr-[20%] pl-[1%] pt-[1%] rounded-xl">
              <EnvelopeIcon
                className="hover:scale-110 cursor-pointer transition-all"
                onClick={() =>
                  window.open("mailto:juanjorianozabaleta@gmail.com", "_blank")
                }
              />
            </div>
            <div className="bg-gray-300 fill-white w-2/7 pr-[20%] pl-[1%] pt-[1%] rounded-xl">
              <Logo_wha />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_me;
