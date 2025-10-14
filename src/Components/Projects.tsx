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
        eng: "Patology Museum",
        esp: "Museo de Patología",
      },
      description: {
        eng: `A fully custom 3D VR application that offers 
immersive visualization of anatomical models with various 
pathologies. This virtual museum lets users explore 
interactive metaverse environments, featuring original 
models designed, sculpted, and textured from scratch.`,
        esp: `Una aplicación de realidad virtual 3D completamente personalizada que ofrece visualización inmersiva de modelos anatómicos con diversas patologías. Este museo virtual permite a los usuarios explorar entornos interactivos del metaverso, con modelos originales diseñados, esculpidos y texturizados desde cero.`,
      },
    },
    {
      "name": {
        "eng": "ArcovXR",
        "esp": "ArcovXR"
      },
      "description": {
        "eng": "A deep web page for a consulting firm in emerging technologies, showcasing the use of state management, visual effects, and dynamic window routing. It also integrates cutting-edge technologies such as 3D model visualization, designed from scratch for interactive web experiences.",
        "esp": "Página web avanzada de una consultora en tecnologías emergentes, donde se evidencia el uso de manejo de estados, efectos visuales y enrutamiento dinámico de ventanas. Además, integra tecnologías de última generación como la visualización de modelos 3D diseñados desde cero para experiencias web interactivas."
      }
    }
    ,
    {
      name: {
        eng: "TiktokClone",
        esp: "Clon de TikTok"
      },
      description: {
        eng: "Mobile application inspired by TikTok, featuring dynamic and interactive video visualization, integrated with Supabase for real-time functionality and updates. Developed using React Native.",
        esp: "Aplicación móvil inspirada en TikTok, con visualización dinámica e interactiva de videos, integrada con Supabase para su respectiva funcionalidad y actualizaciones en tiempo real. Desarrollada con React Native."
      }
    }
    ,
  ];

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="md:text-3xl text-xl md:text-start text-center font-bold mb-10">
        {languageState ? "</Projects/>" : "</Proyectos>"}
      </h1>
      <div className="mt-10 ">
        <div className="mt-30">
          <Project_card
            Index="01"
            Name={languageState ? projectTexts[0].name.eng : projectTexts[0].name.esp}
            Description={languageState ? projectTexts[0].description.eng : projectTexts[0].description.esp}
            Image={
              <div className="w-full h-full relative">
                <div
                  className="absolute inset-0 w-[90%] h-full 
                    bg-[url('https://i.pinimg.com/736x/f6/2d/a0/f62da0329b47fefaa34bed8f0297575f.jpg')] 
                    bg-cover bg-center rounded-2xl "
                />
                <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50" />
              </div>
            }
            Technologies={
              <>
                <div className="bg-[#10dffd] rounded-2xl md:w-20 w-15 p-2">
                  <Logo_UE />
                </div>
                <div className="bg-black rounded-2xl md:w-20 w-15 p-2">
                  <Logo_Maya />
                </div>
                <div className="bg-[#D9D9D9] rounded-2xl md:w-20 w-15 p-2 text-black">
                  <Logo_A3D />
                </div>
                <div className="bg-white rounded-2xl md:w-20 w-15 p-2 text-black">
                  <Logo_Unity />
                </div>
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
                <div
                  className="absolute inset-0 w-[90%] h-full 
                    bg-[url('/src/assets/ArcovXr.png')] 
                    bg-cover bg-center rounded-2xl  "
                />
                <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50" />
              </div>
            }
            Technologies={
              <>
                <div className="bg-[#10dffd] rounded-2xl md:w-20 w-15 p-2 fill-white">
                  <Logo_React />
                </div>
                <div className="bg-black rounded-2xl md:w-20 w-15 p-2">
                  <Logo_Maya />
                </div>
                <div className="bg-[#D9D9D9] rounded-2xl md:w-20 w-15 p-2 text-black">
                  <Logo_Figma />
                </div>
              </>
            }
            link_project="https://github.com/ArcovXr/ArcovXr"
            link_live="https://arcovxr.github.io/ArcovXr/#/Home_Main"
          />
          <div className="mt-30">
            <Project_card
              Index="04"
              Name={languageState ? projectTexts[2].name.eng : projectTexts[2].name.esp}
              Description={languageState ? projectTexts[2].description.eng : projectTexts[2].description.esp}
              Image={
                <div className="w-full h-full relative">
                  <div
                    className="absolute inset-0 w-[90%] h-full 
                    bg-[url('https://i.pinimg.com/1200x/17/05/a3/1705a3f4adb05e8b8e6e8814feb18bf0.jpg')] 
                    bg-cover bg-center rounded-2xl "
                  />
                  <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50" />
                </div>
              }
              Technologies={
                <>
                  <div className="bg-[#10dffd] rounded-2xl md:w-20 w-15 p-2">
                    <Logo_React/>
                  </div>
                  <div className="bg-black rounded-2xl md:w-20 w-15 p-2">
                    <Logo_Figma/>
                  </div>
                  <div className="bg-[#D9D9D9] rounded-2xl md:w-20 w-15 p-2">
                    <Logo_SQL/>
                  </div>
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
