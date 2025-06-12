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
    en: "Custom Software Development & AI",
    es: "Desarrollo de Software a Medida e IA"
  },
  {
    icon: <CubeIcon className="w-15 text-gray-400 mx-auto" />,
    en: "3D, VR/AR & Immersive Experiences",
    es: "Experiencias Inmersivas en 3D, RV/RA"
  },
  {
    icon: <Cog8ToothIcon className="w-15 text-gray-400 mx-auto" />,
    en: "Tech Strategy & DevOps Optimization",
    es: "Estrategia Tecnológica y Optimización DevOps"
  }
];
  const hashtagList = [
  { en: "#3D - Modeling", es: "#Modelado - 3D" },
  { en: "#DevOps - OperationsDevelopment", es: "#DevOps - Desarrollo de Operaciones" },
  { en: "#Chatbot - Development", es: "#Desarrollo - Chatbot" },
  { en: "#Web - Design", es: "#Diseño - Web" },
  { en: "#Immersive - Virtual - Environments", es: "#Entornos - Virtuales - Inmersivos" },
  { en: "#3D - Animation", es: "#Animación - 3D" },
  { en: "#VR/AR - Development", es: "#Desarrollo - RV/RA" },
  { en: "#Web - Development", es: "#Desarrollo - Web" },
  { en: "#Adaptability", es: "#Adaptabilidad" },
  { en: "#Gamified - Experience", es: "#Experiencia - Gamificada" }
];
  return (
    <div className=" w-[80%] mx-auto text-center">
      <div>
        <div className="md:w-20 w-15 bg-[#D9D9D9] text-[#111BFF] rounded-full outline-2 outline-[#111BFF] mx-auto p-3">
          <GlobeAltIcon />
        </div>
        <h1 className="md:text-3xl text-xl font-bold text-center mt-5">
          {languageState ? '</Services>' : '</Servicios>'}
        </h1>
        {languageState ? (
  <p className="text-gray-500 text-center mt-15 md:px-40 md:text-base text-sm">
    I offer a diverse range of technology services. My expertise includes{" "}
    <span className="text-[#111BFF]">3D modeling</span>,{" "}
    <span className="text-[#111BFF]">animation</span>, and{" "}
    <span className="text-[#111BFF]">VR/AR</span> development for immersive applications; 
    custom mobile and web app development using Python and modern frameworks;{" "}
    <span className="text-[#111BFF]">AI and data analytics</span> for intelligent automation;
    game and gamified experience design; strategic consulting to implement creative tech solutions;{" "}
    <span className="text-[#111BFF]">DevOps</span> and operations development.
  </p>
) : (
  <p className="text-gray-500 text-center mt-15 md:px-40 md:text-base text-sm">
    Ofrezco una amplia gama de servicios tecnológicos. Mi experiencia incluye{" "}
    <span className="text-[#111BFF]">modelado 3D</span>,{" "}
    <span className="text-[#111BFF]">animación</span> y desarrollo de{" "}
    <span className="text-[#111BFF]">realidad virtual/aumentada</span> para aplicaciones inmersivas;
    desarrollo personalizado de aplicaciones móviles y web usando Python y frameworks modernos;{" "}
    <span className="text-[#111BFF]">IA y análisis de datos</span> para automatización inteligente;
    diseño de experiencias lúdicas y gamificadas; consultoría estratégica para implementar soluciones tecnológicas creativas;{" "}
    <span className="text-[#111BFF]">DevOps</span> y desarrollo de operaciones.
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
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[0].en : hashtagList[0].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[1].en : hashtagList[1].es}
    </span>
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
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
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[5].en : hashtagList[5].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[6].en : hashtagList[6].es}
    </span>
  </div>
  <div className="flex gap-5 justify-center mt-4">
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[7].en : hashtagList[7].es}
    </span>
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[8].en : hashtagList[8].es}
    </span>
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[9].en : hashtagList[9].es}
    </span>
  </div>
</div>

<div className="text-xs md:hidden flex-col flex mt-15">
  <div className="flex gap-5 mt-5 justify-center">
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
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
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[9].en : hashtagList[9].es}
    </span>
  </div>
  <div className="flex gap-5 mt-2 justify-center">
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
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
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[1].en : hashtagList[1].es}
    </span>
  </div>
  <div className="flex gap-5 mt-2 justify-center">
    <span className="bg-gray-300 rounded-full p-2 px-3">
      {languageState ? hashtagList[2].en : hashtagList[2].es}
    </span>
  </div>
  <div className="flex gap-5 mt-2 justify-center">
    <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
      {languageState ? hashtagList[5].en : hashtagList[5].es}
    </span>
  </div>
</div>

    </div>
  );
};

export default Services;
