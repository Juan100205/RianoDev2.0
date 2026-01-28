import {
  CodeBracketIcon,
  Cog8ToothIcon,
  CubeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
interface Props {
  languageState:boolean;
}
const Services = ({languageState}:Props) => {
  const serviceCards = [
    {
      icon: <CodeBracketIcon className="w-15 text-gray-400 mx-auto" />,
      en: "Tech Consulting & Implementation",
      es: "Consultoría e Implementación Tecnológica"
    },
    {
      icon: <CubeIcon className="w-15 text-gray-400 mx-auto" />,
      en: "Immersive & Emerging Technologies (XR / AI / 3D)",
      es: "Tecnologías Inmersivas y Emergentes (XR / IA / 3D)"
    },
    {
      icon: <Cog8ToothIcon className="w-15 text-gray-400 mx-auto" />,
      en: "Digital Strategy & Innovation Systems",
      es: "Estrategia Digital y Sistemas de Innovación"
    }
  ];

  const hashtagList = [
    { en: "#TechInnovation", es: "#InnovaciónTecnológica" },
    { en: "#EmergingTech", es: "#TecnologíasEmergentes" },
    { en: "#DigitalTransformation", es: "#TransformaciónDigital" },
    { en: "#ImmersiveDesign", es: "#DiseñoInmersivo" },
    { en: "#AIIntegration", es: "#IntegraciónIA" },
    { en: "#3DModeling", es: "#Modelado3D" },
    { en: "#Entrepreneurship", es: "#Emprendimiento" },
    { en: "#WebDevelopment", es: "#DesarrolloWeb" },
    { en: "#InnovationConsulting", es: "#ConsultoríaEnInnovación" },
    { en: "#GamifiedExperience", es: "#ExperienciasGamificadas" }
  ];

  return (
    <div className="w-[80%] mx-auto text-center">
      <div>
        <div className="md:w-20 w-15 bg-[#D9D9D9] text-[#10dffd] rounded-full outline-2 outline-[#10dffd] mx-auto p-3">
          <GlobeAltIcon />
        </div>
        <h1 className="md:text-3xl text-xl font-bold text-center mt-5">
          {languageState ? '</Services>' : '</Servicios>'}
        </h1>

        {languageState ? (
          <p className="text-gray-500 text-center mt-15 md:px-40 md:text-base text-sm">
            I provide strategic and technical consulting to help entrepreneurs and organizations 
            implement <span className="text-[#10dffd]">emerging</span>,{" "}
            <span className="text-[#10dffd]">immersive</span>, and{" "}
            <span className="text-[#10dffd]">conventional</span> technologies effectively.  
            My services combine innovation strategy,{" "}
            <span className="text-[#10dffd]">AI integration</span>,{" "}
            <span className="text-[#10dffd]">3D & XR development</span>, and{" "}
            <span className="text-[#10dffd]">digital transformation</span> to 
            accelerate growth and create meaningful impact.
          </p>
        ) : (
          <p className="text-gray-500 text-center mt-15 md:px-40 md:text-base text-sm">
            Brindo consultoría estratégica y técnica para ayudar a emprendedores y organizaciones 
            a implementar tecnologías <span className="text-[#10dffd]">emergentes</span>,{" "}
            <span className="text-[#10dffd]">inmersivas</span> y{" "}
            <span className="text-[#10dffd]">convencionales</span> de forma efectiva.  
            Mis servicios combinan estrategia de innovación,{" "}
            <span className="text-[#10dffd]">integración de IA</span>,{" "}
            <span className="text-[#10dffd]">desarrollo 3D y XR</span> y{" "}
            <span className="text-[#10dffd]">transformación digital</span> para 
            acelerar el crecimiento y generar impacto real.
          </p>
        )}
      </div>

      <div className="flex md:flex-row flex-col md:w-full justify-center gap-5 mt-20 text-gray-500">
  <div className="md:h-50 h-45 md:w-80 w-70 mx-auto outline-1 outline-gray-400 rounded-2xl flex flex-col justify-center">
    <CodeBracketIcon className="w-15 text-gray-400 mx-auto" />
    <span className="mt-2 px-15 text-sm">
      {languageState ? serviceCards[0].en : serviceCards[0].es}
    </span>
  </div>
  <div className="md:h-50 h-45 md:w-80 w-70 mx-auto outline-1 outline-gray-400 rounded-2xl flex flex-col justify-center">
    <CubeIcon className="w-15 text-gray-400 mx-auto" />
    <span className="mt-2 px-10 text-sm">
      {languageState ? serviceCards[1].en : serviceCards[1].es}
    </span>
  </div>
  <div className="md:h-50 h-45 md:w-80 w-70 mx-auto outline-1 outline-gray-400 rounded-2xl flex flex-col justify-center">
    <Cog8ToothIcon className="w-15 text-gray-400 mx-auto" />
    <span className="mt-2 px-15 text-sm">
      {languageState ? serviceCards[2].en : serviceCards[2].es}
    </span>
  </div>
</div>

<div className="text-sm md:flex flex-col hidden mt-15">
  <div className="flex gap-5 mt-5 justify-center">
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[0].en : hashtagList[0].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[1].en : hashtagList[1].es}
    </span>
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[2].en : hashtagList[2].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[3].en : hashtagList[3].es}
    </span>
  </div>
  <div className="mt-4 flex gap-5 justify-center">
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[4].en : hashtagList[4].es}
    </span>
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[5].en : hashtagList[5].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[6].en : hashtagList[6].es}
    </span>
  </div>
  <div className="flex gap-5 justify-center mt-4">
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[7].en : hashtagList[7].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[8].en : hashtagList[8].es}
    </span>
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[9].en : hashtagList[9].es}
    </span>
  </div>
</div>

<div className="text-xs md:hidden flex-col flex mt-15">
  <div className="flex gap-5 mt-5 justify-center">
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[0].en : hashtagList[0].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[6].en : hashtagList[6].es}
    </span>
  </div>
  <div className="mt-2 flex gap-3 justify-center">
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[3].en : hashtagList[3].es}
    </span>
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[9].en : hashtagList[9].es}
    </span>
  </div>
  <div className="flex gap-5 mt-2 justify-center">
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[7].en : hashtagList[7].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[8].en : hashtagList[8].es}
    </span>
  </div>
  <div className="flex gap-5 justify-center mt-2">
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[4].en : hashtagList[4].es}
    </span>
  </div>
  <div className="flex gap-5 mt-2 justify-center">
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[1].en : hashtagList[1].es}
    </span>
  </div>
  <div className="flex gap-5 mt-2 justify-center">
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[2].en : hashtagList[2].es}
    </span>
  </div>
  <div className="flex gap-5 mt-2 justify-center">
    <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[5].en : hashtagList[5].es}
    </span>
  </div>
</div>

    </div>
  );
};

export default Services;
