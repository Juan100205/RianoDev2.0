import Logo_A3D from "./Logos_comp/Logo_A3D";
import Logo_Figma from "./Logos_comp/Logo_Figma";
import Logo_Maya from "./Logos_comp/Logo_Maya";
import Logo_SQL from "./Logos_comp/Logo_MySql";
import Logo_React from "./Logos_comp/Logo_react";
import Logo_UE from "./Logos_comp/Logo_UE";
import Logo_Unity from "./Logos_comp/Logo_Unity";
import Project_card from "./Project_card";

interface Props {
  languageState: boolean;
}

const Projects = ({ languageState }: Props) => {
  const projectTexts = [
    {
      name: {
        eng: "Pathology Museum",
        esp: "Museo de Patología",
      },
      description: {
        eng: `Problem: A medical school needed to modernize anatomy education — physical models were limited and costly to scale. We built an immersive XR solution with real-time 3D pathology visualization for VR environments. Result: Students can now interact with high-fidelity anatomical models on demand, reducing dependency on physical resources.`,
        esp: `Problema: Una facultad de medicina necesitaba modernizar la educación anatómica — los modelos físicos eran limitados y costosos de escalar. Construimos una solución XR inmersiva con visualización 3D de patología en tiempo real para entornos VR. Resultado: Los estudiantes interactúan con modelos anatómicos de alta fidelidad a demanda, reduciendo la dependencia de recursos físicos.`,
      },
    },
    {
      name: {
        eng: "ArcovXR",
        esp: "ArcovXR",
      },
      description: {
        eng: "Problem: An emerging XR consulting firm had no digital presence that matched their technical positioning. We built a web platform with immersive 3D visualization and premium UX patterns. Result: A differentiated digital experience that communicates the firm's capabilities at first glance.",
        esp: "Problema: Una consultora XR emergente no tenía presencia digital que reflejara su posicionamiento técnico. Construimos una plataforma web con visualización 3D inmersiva y patrones UX premium. Resultado: Una experiencia digital diferenciada que comunica las capacidades de la firma desde el primer vistazo.",
      },
    },
    {
      name: {
        eng: "TikTok Clone",
        esp: "Clon de TikTok",
      },
      description: {
        eng: "Problem: A client needed to validate the technical architecture for a short-video social platform before committing to full development. We built a mobile-first platform with real-time video streaming, concurrent user sessions and content distribution. Result: A working prototype that validated the architecture and reduced development risk.",
        esp: "Problema: Un cliente necesitaba validar la arquitectura técnica para una plataforma de video corto antes de comprometerse con el desarrollo completo. Construimos una plataforma mobile-first con streaming de video en tiempo real, sesiones concurrentes y distribución de contenido. Resultado: Un prototipo funcional que validó la arquitectura y redujo el riesgo de desarrollo.",
      },
    },
  ];

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="md:text-3xl text-xl md:text-start text-center font-light mb-10 text-white">
        {languageState ? "Case Studies" : "Estudios de Caso"}
      </h1>
      <div className="mt-10">
        <div className="mt-30">
          <Project_card
            Index="01"
            Name={languageState ? projectTexts[0].name.eng : projectTexts[0].name.esp}
            Description={languageState ? projectTexts[0].description.eng : projectTexts[0].description.esp}
            Image={
              <div className="w-full h-full relative">
                <div className="absolute inset-0 w-[90%] h-full bg-[url('https://i.pinimg.com/736x/f6/2d/a0/f62da0329b47fefaa34bed8f0297575f.jpg')] bg-cover bg-center rounded-2xl" />
                <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50" />
              </div>
            }
            Technologies={
              <>
                <div className="bg-[#10dffd] rounded-2xl md:w-20 w-15 p-2"><Logo_UE /></div>
                <div className="bg-black rounded-2xl md:w-20 w-15 p-2"><Logo_Maya /></div>
                <div className="bg-[#D9D9D9] dark:bg-gray-600 rounded-2xl md:w-20 w-15 p-2 text-black"><Logo_A3D /></div>
                <div className="bg-white rounded-2xl md:w-20 w-15 p-2 text-black"><Logo_Unity /></div>
              </>
            }
            link_project="https://github.com/Juan100205/Museo-de-Patologias"
            link_live="https://youtu.be/sHS1-akv_OE"
          />
        </div>
        <div className="mt-30">
          <Project_card
            Index="02"
            Name={languageState ? projectTexts[1].name.eng : projectTexts[1].name.esp}
            Description={languageState ? projectTexts[1].description.eng : projectTexts[1].description.esp}
            Image={
              <div className="w-full h-full relative">
                <div className="absolute inset-0 w-[90%] h-full bg-[url('/src/assets/ArcovXr.png')] bg-cover bg-center rounded-2xl" />
                <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50" />
              </div>
            }
            Technologies={
              <>
                <div className="bg-[#10dffd] rounded-2xl md:w-20 w-15 p-2 fill-white"><Logo_React /></div>
                <div className="bg-black rounded-2xl md:w-20 w-15 p-2"><Logo_Maya /></div>
                <div className="bg-[#D9D9D9] dark:bg-gray-600 rounded-2xl md:w-20 w-15 p-2 text-black"><Logo_Figma /></div>
              </>
            }
            link_project="https://github.com/ArcovXr/ArcovXr"
            link_live="https://arcovxr.github.io/ArcovXr/#/Home_Main"
          />
          <div className="mt-30">
            <Project_card
              Index="03"
              Name={languageState ? projectTexts[2].name.eng : projectTexts[2].name.esp}
              Description={languageState ? projectTexts[2].description.eng : projectTexts[2].description.esp}
              Image={
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 w-[90%] h-full bg-[url('https://i.pinimg.com/1200x/17/05/a3/1705a3f4adb05e8b8e6e8814feb18bf0.jpg')] bg-cover bg-center rounded-2xl" />
                  <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50" />
                </div>
              }
              Technologies={
                <>
                  <div className="bg-[#10dffd] rounded-2xl md:w-20 w-15 p-2"><Logo_React /></div>
                  <div className="bg-black rounded-2xl md:w-20 w-15 p-2"><Logo_Figma /></div>
                  <div className="bg-[#D9D9D9] dark:bg-gray-600 rounded-2xl md:w-20 w-15 p-2"><Logo_SQL /></div>
                </>
              }
              link_project="https://github.com/Juan100205/tiktok"
              link_live="https://youtube.com/shorts/Us2YwgymK8E"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
