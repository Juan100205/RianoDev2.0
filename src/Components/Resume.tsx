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

const Resume = () => {
  return (
    <div className="w-[98%] flex md:flex-row flex-col mx-auto border-b-2 border-gray-300 pl-8 md:px-35">
      <div className="md:w-3/7 w-full pt-10 md:border-r-2 border-gray-300 h-170 md:pr-0 pr-2">
        <h1 className="text-xl md:text-3xl md:text-start text-center font-bold">
          &lt;/Experience&gt;
        </h1>
        <div className="md:mt-10 mt-5 overflow-y-auto pt-10 h-140 scrollbar_exp md:pr-20 transition-all">
          <Experience
            place={
              <>
                <p className="block ">Universidad de La Sabana</p>
                <p className="block">- Living Lab</p>
              </>
            }
            occ="Software Developer"
            date="06/2023 - 06/2024"
            s_skills={
              <>
                <p>
                  Collaborative work, effective time management, problem-solving
                  with impactful solutions, self-taught training, and continuous
                  tech research.
                </p>
              </>
            }
          />
          <Experience
            place="Alcala Comunicaciones"
            occ="Operations Executive"
            date="06/2024 - 11/2024"
            s_skills={
              <ul>
                <li>Effective time and task management independently.</li>
                <li>
                  Identifying business needs and opportunities through
                  consulting.
                </li>
                <li>
                  Continuous and self-directed learning of the latest
                  technologies.
                </li>
              </ul>
            }
          />
          <Experience
            place="Freelancer"
            occ=""
            date="06/2024 - Present"
            s_skills={
              <ul>
                <li>Effective and empathetic human resource management.</li>
                <li>
                  Using cutting-edge technologies to drive innovation and solve
                  impactful business challenges.
                </li>
                <li>Timely project management to ensure on-time delivery.</li>
                <li>
                  Fair task delegation, leveraging team strengths to maximize
                  performance.
                </li>
                <li>
                  Crafting and presenting persuasive and compelling pitches.
                </li>
                <li>Training in the latest technologies.</li>
              </ul>
            }
          />
          <Experience
            place="Universidad de La Sabana Living Lab"
            occ="Project Manager"
            date="06/2024 - Present"
            s_skills={
              <ul>
                <li>Effective and empathetic human resource management.</li>
                <li>
                  Using cutting-edge technologies to drive innovation and solve
                  impactful business challenges.
                </li>
                <li>Timely project management to ensure on-time delivery.</li>
                <li>
                  Fair task delegation, leveraging team strengths to maximize
                  performance.
                </li>
                <li>
                  Crafting and presenting persuasive and compelling pitches.
                </li>
                <li>Training in the latest technologies.</li>
              </ul>
            }
          />
        </div>
      </div>
      <div className="md:w-4/7 md:pt-10 pt-5 md:pl-10 w-15/16">
        <div className="border-t-2 md:border-t-0 border-b-2 border-gray-300 md:pt-0 pt-5 md:px-10 px-1">
          <h1 className="md:text-3xl text-xl font-bold md:text-start text-center">
            &lt;/Expertise&gt;
          </h1>
          <p className="text-gray-500 py-5 px-5 md:text-md text-sm">
            3D Applications, Web Development, Web Apps, Problem-Solving,
            Technology Research, UI Functionality, Visual Design, Fast-Paced
            Execution, Team Collaboration
          </p>
        </div>
        <div className="md:border-b-2 border-gray-300 md:px-10 mt-5 md:pb-0 pb-30">
          <h1 className="text-xl text-center md:text-start md:text-3xl font-bold">
            &lt;/Hardskills&gt;
          </h1>
          <div className="fill-white md:pb-5 overflow-x-auto scrollbar_exp flex w-full transition-all md:pt-10 overflow-y-hidden pt-20">
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
            &lt;/Softskills&gt;
          </h1>
          <div className="text-xs md:text-sm">
            <div className="flex gap-5 mt-5">
              <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
                #Innovation
              </span>
              <span className="bg-gray-300 rounded-full p-2 px-3">
                #Problem - Solving
              </span>
            </div>
            <div className="mt-4">
              <span className="bg-gray-300 rounded-full p-2 px-3">
                #Effective - Communication
              </span>
            </div>
            <div className="flex gap-5 mt-4">
              <span className="bg-gray-300 rounded-full p-2 px-3">
                #Adaptability
              </span>
              <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
                #Proactive - Leadership
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Resume;
