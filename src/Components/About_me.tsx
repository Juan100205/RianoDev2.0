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
      en: "</Innovation Engineer & Technology>",
      es: "</Ingeniero en Innovación y tecnológia>",
    },
introduction: {
  en: "I guide entrepreneurs in strategically implementing technology to elevate their projects.",
  es: "Guío a emprendedores en la implementación estratégica de tecnología para potenciar sus proyectos.",
},

    description: {
      en: "With a background in software and mechanical engineering, I bridge creativity and strategy to design scalable, human-centered solutions. My focus is on innovation, digital transformation, and the practical application of technology to empower early-stage ventures and educational projects.",
      es: "Con una formación en ingeniería de software y mecánica, conecto creatividad y estrategia para diseñar soluciones escalables y centradas en las personas. Mi enfoque está en la innovación, la transformación digital y la aplicación práctica de la tecnología para potenciar emprendimientos iniciales y proyectos educativos.",
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
            <span className="block text-white ">Hello World; I’m</span>
            <span className="block font-black text-3xl text-[#10dffd]">
              Juan José Riaño 
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
