import Edu from "./Edu";
import Education_resp from "./Education_responsive";
import Experience from "./Experience";
function Education() {
  const eduBlocks = [
    {
      place: "Universidad de La Sabana",
      certification:
        "Double Bachelor's Degree in Mechanical Engineering and Computer Engineering",
      date_init: "2022",
      date_finish: "2027",
    },
    // Certificates
    {
      place: "Coursera (Self‑Paced)",
      certification: "Tailwind CSS",
      date_init: "April 21, 2025",
      date_finish: "April 23, 2025",
    },
    {
      place: "Tailwind Labs",
      certification: "Tailwind Setup and PostCSS",
      date_init: "April 21, 2025",
      date_finish: "April 23, 2025",
    },
    {
      place: "Great Learning",
      certification: "React.js",
      date_init: "April 24, 2025",
      date_finish: "April 25, 2025",
    },
    {
      place: "Codecademy",
      certification: "React.js",
      date_init: "April 24, 2025",
      date_finish: "April 25, 2025",
    },
    {
      place: "University of Helsinki",
      certification: "Full Stack Open",
      date_init: "April 28, 2025",
      date_finish: "May 2, 2025",
    },
    {
      place: "The Odin Project",
      certification: "Foundations + Full Stack JS Path",
      date_init: "May 5, 2025",
      date_finish: "May 7, 2025",
    },
    {
      place: "AWS Skill Builder",
      certification: "AWS Skill Builder",
      date_init: "May 1, 2025",
      date_finish: "May 2, 2025",
    },
    {
      place: "Coursera (Self‑Paced)",
      certification: "AI for Everyone",
      date_init: "May 12, 2025",
      date_finish: "May 12, 2025",
    },
    {
      place: "Coursera (Self‑Paced)",
      certification: "Prompt Engineering for Everyone",
      date_init: "May 13, 2025",
      date_finish: "May 13, 2025",
    },
    {
      place: "Coursera (Self‑Paced)",
      certification: "Data Analysis with Python",
      date_init: "May 14, 2025",
      date_finish: "May 15, 2025",
    },
    {
      place: "Microsoft",
      certification: "DEVOPS",
      date_init: "May 16, 2025",
      date_finish: "May 16, 2025",
    },
  ];
  const linesPerBlock = 10;
  return (
    <>
      <div className="md:w-[80%] w-full mx-auto anim_block md:flex flex-col hidden">
        <h1 className="text-3xl font-black ">&lt;Education&gt;</h1>

        <div className="mt-10 bg-[#D9D9D9] rounded-3xl w-full overflow-y-auto md:overflow-x-auto  h-[500px] transition scrollbar_exp">
          {/* Botones tipo ventana con animación de entrada */}
          <div className="relative rounded-full bg-red-600 w-4 h-4 left-8 top-6 button-popup hover:cursor-pointer hover:scale-110"></div>
          <div className="relative rounded-full bg-yellow-300 w-4 h-4 left-15 top-2 button-popup hover:cursor-pointer hover:scale-110"></div>
          <div className="relative rounded-full bg-green-600 w-4 h-4 left-22 -top-2 button-popup hover:cursor-pointer hover:scale-110"></div>

          <div className=" py-5 flex-warp">
            {eduBlocks.map((edu, index) => (
              <Edu
                key={index}
                place={edu.place}
                certification={edu.certification}
                date_init={edu.date_init}
                date_finish={edu.date_finish}
                initialLine={index * linesPerBlock + 1}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[98%] flex md:hidden flex-col mx-auto border-b-2 border-gray-300 pl-8 ">
        <h1 className="text-xl md:text-3xl text-center font-bold">
          &lt;/Education&gt;
        </h1>
        <div className="w-full   border-gray-300 h-170  pr-2">
          <div className=" mt-2 overflow-y-auto pt-10 h-140 scrollbar_exp pr-2 transition-all">
            {eduBlocks.map((edu) => (
              <Education_resp
                place={edu.place}
                occ={edu.certification}
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
