import Edu from "./Edu";
import Education_resp from "./Education_responsive";
interface Props {
  languageState:boolean;
}

function Education({languageState}:Props) {
const education_i18n = {
  title: {
    en: "<Education>",
    es: "<Educación>",
  },
  items: [
    {
      place: {
        en: "Universidad de La Sabana",
        es: "Universidad de La Sabana",
      },
      certification: {
        en: "Double Bachelor's Degree in Mechanical Engineering and Computer Engineering",
        es: "Doble titulación en Ingeniería Mecánica e Ingeniería Informática",
      },
      date_init: "2022",
      date_finish: "2027",
    },
    {
      place: {
        en: "Coursera (Self‑Paced)",
        es: "Coursera (Autoaprendizaje)",
      },
      certification: {
        en: "Tailwind CSS",
        es: "Tailwind CSS",
      },
      date_init: "April 21, 2025",
      date_finish: "April 23, 2025",
    },
    {
      place: {
        en: "Tailwind Labs",
        es: "Tailwind Labs",
      },
      certification: {
        en: "Tailwind Setup and PostCSS",
        es: "Configuración de Tailwind y PostCSS",
      },
      date_init: "April 21, 2025",
      date_finish: "April 23, 2025",
    },
    {
      place: {
        en: "Great Learning",
        es: "Great Learning",
      },
      certification: {
        en: "React.js",
        es: "React.js",
      },
      date_init: "April 24, 2025",
      date_finish: "April 25, 2025",
    },
    {
      place: {
        en: "Codecademy",
        es: "Codecademy",
      },
      certification: {
        en: "React.js",
        es: "React.js",
      },
      date_init: "April 24, 2025",
      date_finish: "April 25, 2025",
    },
    {
      place: {
        en: "University of Helsinki",
        es: "Universidad de Helsinki",
      },
      certification: {
        en: "Full Stack Open",
        es: "Full Stack Open",
      },
      date_init: "April 28, 2025",
      date_finish: "May 2, 2025",
    },
    {
      place: {
        en: "The Odin Project",
        es: "The Odin Project",
      },
      certification: {
        en: "Foundations + Full Stack JS Path",
        es: "Fundamentos + Ruta Full Stack JS",
      },
      date_init: "May 5, 2025",
      date_finish: "May 7, 2025",
    },
    {
      place: {
        en: "AWS Skill Builder",
        es: "AWS Skill Builder",
      },
      certification: {
        en: "AWS Skill Builder",
        es: "AWS Skill Builder",
      },
      date_init: "May 1, 2025",
      date_finish: "May 2, 2025",
    },
    {
      place: {
        en: "Coursera (Self‑Paced)",
        es: "Coursera (Autoaprendizaje)",
      },
      certification: {
        en: "AI for Everyone",
        es: "IA para Todos",
      },
      date_init: "May 12, 2025",
      date_finish: "May 12, 2025",
    },
    {
      place: {
        en: "Coursera (Self‑Paced)",
        es: "Coursera (Autoaprendizaje)",
      },
      certification: {
        en: "Prompt Engineering for Everyone",
        es: "Ingeniería de Prompts para Todos",
      },
      date_init: "May 13, 2025",
      date_finish: "May 13, 2025",
    },
    {
      place: {
        en: "Coursera (Self‑Paced)",
        es: "Coursera (Autoaprendizaje)",
      },
      certification: {
        en: "Data Analysis with Python",
        es: "Análisis de Datos con Python",
      },
      date_init: "May 14, 2025",
      date_finish: "May 15, 2025",
    },
    {
      place: {
        en: "Microsoft",
        es: "Microsoft",
      },
      certification: {
        en: "DEVOPS",
        es: "DEVOPS",
      },
      date_init: "May 16, 2025",
      date_finish: "May 16, 2025",
    },
  ],
};

  const linesPerBlock = 10;
  return (
<>
  <div className="md:w-[80%] w-full mx-auto anim_block md:flex flex-col hidden">
    <h1 className="text-3xl font-black ">
      {languageState ? "<Educación>" : "<Education>"}
    </h1>

    <div className="mt-10 bg-[#D9D9D9] rounded-3xl w-full overflow-y-auto md:overflow-x-auto h-[500px] transition scrollbar_exp">
      {/* Botones tipo ventana con animación de entrada */}
      <div className="relative rounded-full bg-red-600 w-4 h-4 left-8 top-6 button-popup hover:cursor-pointer hover:scale-110"></div>
      <div className="relative rounded-full bg-yellow-300 w-4 h-4 left-15 top-2 button-popup hover:cursor-pointer hover:scale-110"></div>
      <div className="relative rounded-full bg-green-600 w-4 h-4 left-22 -top-2 button-popup hover:cursor-pointer hover:scale-110"></div>

      <div className="py-5 flex-warp">
        {education_i18n.items.map((edu, index) => (
          <Edu
            key={index}
            place={languageState ? edu.place.es : edu.place.en}
            certification={languageState ? edu.certification.es : edu.certification.en}
            date_init={edu.date_init}
            date_finish={edu.date_finish}
            initialLine={index * linesPerBlock + 1}
          />
        ))}
      </div>
    </div>
  </div>

  <div className="w-[98%] flex md:hidden flex-col mx-auto border-b-2 border-gray-300 pl-8">
    <h1 className="text-xl md:text-3xl text-center font-bold">
      {languageState ? "<Educación>" : "<Education>"}
    </h1>
    <div className="w-full border-gray-300 h-170 pr-2">
      <div className="mt-2 overflow-y-auto pt-10 h-140 scrollbar_exp pr-2 transition-all">
        {education_i18n.items.map((edu, index) => (
          <Education_resp
            key={index}
            place={languageState ? edu.place.es : edu.place.en}
            occ={languageState ? edu.certification.es : edu.certification.en}
            date={edu.date_init}
          />
        ))}
      </div>
    </div>
  </div>
</>


  );
}
export default Education;
