import {
  CodeBracketIcon,
  Cog8ToothIcon,
  CubeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

const Services = () => {
  return (
    <div className=" w-[80%] mx-auto text-center">
      <div>
        <div className="md:w-20 w-15 bg-[#D9D9D9] text-[#111BFF] rounded-full outline-2 outline-[#111BFF] mx-auto p-3">
          <GlobeAltIcon />
        </div>
        <h1 className="md:text-3xl text-xl font-bold text-center mt-5">
          &lt;/Services&gt;
        </h1>
        <p className="text-gray-500 text-center mt-15 md:px-40 md:text-base text-sm">
          I offer a diverse range of technology services. My expertise includes{" "}
          <span className="text-[#111BFF]">3D modeling</span>,{" "}
          <span className="text-[#111BFF]">animation</span>, and{" "}
          <span className="text-[#111BFF]">VR/AR</span> development for
          immersive applications; custom mobile and web app development using
          Python and modern frameworks;{" "}
          <span className="text-[#111BFF]">AI and data analytics</span> for
          intelligent automation ; game and gamified experience design ;
          strategic consulting to implement creative tech solutions;{" "}
          <span className="text-[#111BFF]">DevOps</span> and operations
          development .
        </p>
      </div>
      <div className="flex md:flex-row flex-col md:w-full  justify-center gap-5 mt-20 text-gray-500">
        <div className="md:h-50 h-45 md:w-80 w-70 mx-auto outline-1 outline-gray-400 rounded-2xl flex flex-col justify-center">
          <CodeBracketIcon className="w-15 text-gray-400 mx-auto" />
          <span className="mt-2 px-15 text-sm">
            Custom Software Development & AI
          </span>
        </div>
        <div className="md:h-50 h-45 md:w-80 w-70 mx-auto outline-1 outline-gray-400 rounded-2xl flex flex-col justify-center">
          <CubeIcon className="w-15 text-gray-400 mx-auto" />
          <span className="mt-2 px-10 text-sm">
            3D, VR/AR & Immersive Experiences
          </span>
        </div>
        <div className="md:h-50 h-45 md:w-80 w-70 mx-auto outline-1 outline-gray-400 rounded-2xl flex flex-col justify-center">
          <Cog8ToothIcon className="w-15 text-gray-400 mx-auto" />
          <span className="mt-2 px-15 text-sm">
            Tech Strategy & DevOps Optimization
          </span>
        </div>
      </div>

      <div className="text-sm md:flex flex-col hidden mt-15">
        <div className="flex gap-5 mt-5 justify-center">
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #3D - Modeling
          </span>
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #DevOps - OperationsDevelopment
          </span>
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #Chatbot - Development
          </span>
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #Web - Design
          </span>
        </div>
        <div className="mt-4 flex gap-5 justify-center">
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #Immersive - Virtual - Environments
          </span>
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #3D - Animation
          </span>
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #VR/AR - Development
          </span>
        </div>
        <div className="flex gap-5 justify-center mt-4">
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #Web - Development
          </span>
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #Adaptability
          </span>
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #Gamified - Experience{" "}
          </span>
        </div>
      </div>
      <div className="text-xs md:hidden flex-col flex mt-15">
        <div className="flex gap-5 mt-5 justify-center">
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #3D - Modeling
          </span>
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #VR/AR - Development
          </span>
        </div>
        <div className="mt-2 flex gap-3 justify-center">
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #Web - Design
          </span>
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #Gamified - Experience{" "}
          </span>
        </div>
        <div className="flex gap-5 mt-2 justify-center">
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #Web - Development
          </span>
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #Adaptability
          </span>
        </div>
        <div className="flex gap-5 justify-center mt-2">
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #Immersive - Virtual - Environments
          </span>
        </div>
        <div className="flex gap-5 mt-2 justify-center">
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #DevOps - OperationsDevelopment
          </span>
        </div>
        <div className="flex gap-5 mt-2 justify-center">
          <span className="bg-gray-300 rounded-full p-2 px-3">
            #Chatbot - Development
          </span>
        </div>
        <div className="flex gap-5 mt-2 justify-center">
          <span className="bg-[#111BFF] text-white rounded-full p-2 px-3">
            #3D - Animation
          </span>
        </div>
      </div>
    </div>
  );
};

export default Services;
