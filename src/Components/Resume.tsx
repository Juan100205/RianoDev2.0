import Experience from "./Experience";
import Logo_Figma from "./Logos_comp/Logo_Figma";
import Tech_card from "./Tech_Card";
import Logo_A3D from "./Logos_comp/Logo_A3D";
import Logo_Angular from "./Logos_comp/Logo_Angular";
import Logo_Astro from "./Logos_comp/Logo_Astro";
import Logo_Blender from "./Logos_comp/Logo_Blender";
import Logo_Css from "./Logos_comp/Logo_Css";
import Logo_DVR from "./Logos_comp/Logo_DVR";
import Logo_Html from "./Logos_comp/Logo_Html";
import Logo_Java from "./Logos_comp/Logo_Java";
import Logo_JS from "./Logos_comp/Logo_JS";
import Logo_Maya from "./Logos_comp/Logo_Maya";
import Logo_Py from "./Logos_comp/Logo_Py";
import Logo_React from "./Logos_comp/Logo_react";
import Logo_Tailwind from "./Logos_comp/Logo_Tailwind";
import Logo_TS from "./Logos_comp/Logo_TS";
import Logo_UE from "./Logos_comp/Logo_UE";
import Logo_Unity from "./Logos_comp/Logo_Unity";
import Logo_SQL from "./Logos_comp/Logo_MySql";
interface Props{
  languageState:boolean;
}
const Resume = ({languageState}:Props) => {
const resume = [
  { en: "<Expertise>", es: "<Experiencia Técnica>" },
  {
    en: "3D Applications, Web Development, Web Apps, Problem-Solving, Technology Research, UI Functionality, Visual Design, Fast-Paced Execution, Team Collaboration",
    es: "Aplicaciones 3D, Desarrollo Web, Aplicaciones Web, Resolución de Problemas, Investigación Tecnológica, Funcionalidad de UI, Diseño Visual, Ejecución Rápida, Colaboración en Equipo"
  },
  { en: "<Hardskills>", es: "<Habilidades Técnicas>" },
  { en: "<Softskills>", es: "<Habilidades Blandas>" },
  { en: "#Innovation", es: "#Innovación" },
  { en: "#Problem - Solving", es: "#Resolución de Problemas" },
  { en: "#Effective - Communication", es: "#Comunicación Efectiva" },
  { en: "#Adaptability", es: "#Adaptabilidad" },
  { en: "#Proactive - Leadership", es: "#Liderazgo Proactivo" }
];

const experiences = [
  {
    place: [{ en: "Universidad de La Sabana" }, { es: "- Living Lab" }],
    occ: { en: "Software Developer", es: "Desarrollador de Software" },
    date: { en: "06/2023 - 06/2024", es: "06/2023 - 06/2024" },
    s_skills: [
      {
        en: "Collaborative work, effective time management, problem-solving with impactful solutions, self-taught training, and continuous tech research.",
        es: "Trabajo colaborativo, gestión efectiva del tiempo, resolución de problemas con soluciones impactantes, formación autodidacta e investigación tecnológica continua."
      }
    ]
  },
  {
    place: [{ en: "Alcala Comunicaciones", es: "Alcalá Comunicaciones" }],
    occ: { en: "Operations Executive", es: "Ejecutivo de Operaciones" },
    date: { en: "06/2024 - 11/2024", es: "06/2024 - 11/2024" },
    s_skills: [
      {
        en: "Effective time and task management independently.",
        es: "Gestión efectiva del tiempo y tareas de forma independiente."
      },
      {
        en: "Identifying business needs and opportunities through consulting.",
        es: "Identificación de necesidades y oportunidades de negocio mediante consultoría."
      },
      {
        en: "Continuous and self-directed learning of the latest technologies.",
        es: "Aprendizaje continuo y autodirigido de las tecnologías más recientes."
      }
    ]
  },
  {
    place: [{ en: "Freelancer", es: "Freelancer" }],
    occ: { en: "Project Manager", es: "Gerente de Proyecto" },
    date: { en: "06/2024 - Present", es: "06/2024 - Actualidad" },
    s_skills: [
      {
        en: "Effective and empathetic human resource management.",
        es: "Gestión efectiva y empática del talento humano."
      },
      {
        en: "Using cutting-edge technologies to drive innovation and solve impactful business challenges.",
        es: "Uso de tecnologías de vanguardia para impulsar la innovación y resolver desafíos empresariales relevantes."
      },
      {
        en: "Timely project management to ensure on-time delivery.",
        es: "Gestión puntual de proyectos para garantizar entregas a tiempo."
      },
      {
        en: "Fair task delegation, leveraging team strengths to maximize performance.",
        es: "Delegación justa de tareas, aprovechando las fortalezas del equipo para maximizar el rendimiento."
      },
      {
        en: "Crafting and presenting persuasive and compelling pitches.",
        es: "Elaboración y presentación de propuestas persuasivas y convincentes."
      },
      {
        en: "Training in the latest technologies.",
        es: "Formación en las tecnologías más recientes."
      }
    ]
  }
];

  return (
    <div className="w-[98%] flex md:flex-row flex-col mx-auto border-b-2 border-gray-300 pl-8 md:px-35">
      <div className="md:w-3/7 w-full pt-10 md:border-r-2 border-gray-300 h-170 md:pr-0 pr-2">
        <h1 className="text-xl md:text-3xl md:text-start text-center font-bold">
          {languageState ? "<Experience/>":"<Experiencia/>"}
        </h1>
        <div className="md:mt-10 mt-5 overflow-y-auto pt-10 h-140 scrollbar_exp md:pr-20 transition-all">
          {experiences.map((exp, index) => (
  <Experience
    key={index}
    place={
      <>{exp.place.map((p, i) => <p key={i}>{languageState ? p.en : p.es || p.en}</p>)}</>
    }
    occ={languageState ? exp.occ.en : exp.occ.es || exp.occ.en}
    date={languageState ? exp.date.en : exp.date.es || exp.date.en}
    s_skills={
      <ul>
        {exp.s_skills.map((s, i) => (
          <li key={i}>{languageState ? s.en : s.es}</li>
        ))}
      </ul>
    }
  />
))}

        </div>
      </div>
      <div className="md:w-4/7 md:pt-10 pt-5 md:pl-10 w-15/16">
        <div className="border-t-2 md:border-t-0 border-b-2 border-gray-300 md:pt-0 pt-5 md:px-10 px-1">
          <h1 className="md:text-3xl text-xl font-bold md:text-start text-center">
            {languageState ? resume[0].en:resume[0].es}
          </h1>
          <p className="text-gray-500 py-5 px-5 md:text-md text-sm">
            {languageState ? resume[1].en:resume[1].es}
          </p>
        </div>
        <div className="md:border-b-2 border-gray-300 md:px-10 mt-5 md:pb-0 pb-30">
          <h1 className="text-xl text-center md:text-start md:text-3xl font-bold">
            {languageState ? resume[2].en:resume[2].es}
          </h1>
          <div className="fill-white md:pb-5 pb-2 overflow-x-auto scrollbar_exp flex w-full transition-all md:pt-10 overflow-y-hidden pt-20">
            <Tech_card name="Figma" icon={<Logo_Figma />} />
            <Tech_card name="React" icon={<Logo_React />} />
            <Tech_card name="Tailwind" icon={<Logo_Tailwind />} />
            <Tech_card name="TypeScript" icon={<Logo_TS />} />
            <Tech_card name="JavaScript" icon={<Logo_JS />} />
            <Tech_card name="Python" icon={<Logo_Py />} />
            <Tech_card name="Java" icon={<Logo_Java />} />
            <Tech_card name="Maya" icon={<Logo_Maya />} />
            <Tech_card name="Blender" icon={<Logo_Blender />} />
            <Tech_card name="Unreal Engine" icon={<Logo_UE />} />
            <Tech_card name="Unity" icon={<Logo_Unity />} />
            <Tech_card name="Adobe 3D suite" icon={<Logo_A3D />} />
            <Tech_card name="Angular" icon={<Logo_Angular />} />
            <Tech_card name="Astro" icon={<Logo_Astro />} />
            <Tech_card name="Html" icon={<Logo_Html />} />
            <Tech_card name="Css" icon={<Logo_Css />} />
            <Tech_card name="DaVinci" icon={<Logo_DVR />} />
            <Tech_card name="MySQLServer" icon={<Logo_SQL />} />
          </div>
        </div>
        <div className="md:px-10 md:pb-0 pb-30">
          <h1 className="text-xl text-center md:text-start md:text-3xl font-bold pt-5">
            {languageState ? resume[3].en:resume[3].es}
          </h1>
          <div className="text-xs md:text-sm">
            <div className="flex gap-5 mt-5">
              <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
                {languageState ? resume[4].en:resume[4].es}
              </span>
              <span className="bg-gray-300 rounded-full p-2 px-3">
                {languageState ? resume[5].en:resume[5].es}
              </span>
            </div>
            <div className="mt-4">
              <span className="bg-gray-300 rounded-full p-2 px-3">
                {languageState ? resume[6].en:resume[6].es}
              </span>
            </div>
            <div className="flex gap-5 mt-4">
              <span className="bg-gray-300 rounded-full p-2 px-3">
                {languageState ? resume[7].en:resume[7].es}
              </span>
              <span className="bg-[#10dffd] text-white rounded-full p-2 px-3">
                {languageState ? resume[8].en:resume[8].es}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Resume;
