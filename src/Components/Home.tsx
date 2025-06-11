import { ArrowDownRightIcon } from "@heroicons/react/24/solid";
const Home = () => {
  return (
    <div className="md:flex  w-3/4 mx-auto items-end">
      <div className="md:w-2/5 md:flex flex-col hidden w-full text-gray-400 pb-10">
        <div className="flex justify-end pr-20">
          <ArrowDownRightIcon className="w-50 text-black" />
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300 w-5/6 gap-10 pr-5">
          <span>#3D Modeling</span>
          <span>#Code Review</span>
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300 w-5/6 gap-10 pr-5">
          <span>#Web Development</span>
          <span>#App Development</span>
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300 w-5/6 gap-10 pr-5">
          <span>#3D Animation</span>
          <span>#DataBase Review</span>
        </div>
      </div>
      <div className="md:w-3/5 w-full md:h-[38vw] h-[60vw] rounded-2xl bg-[#111BFF] flex items-end p-5">
        <div className="md:text-4xl text-xl font-black text-white ">2025</div>
        <div className="relative w-full aspect-[3/1] font-banner font-black text-white">
          <span className="absolute text-[15vw] md:text-[12vw] top-[-100%]  left-[40%]      -rotate-[85deg]">P</span>
          <span className="absolute text-[15vw] md:text-[12vw] top-[-135%]  left-[51%]      ">O</span>
          <span className="absolute text-[15vw] md:text-[12vw] top-[-148%]  left-[75%]       -rotate-[10deg]">R</span>
          <span className="absolute text-[15vw] md:text-[12vw] top-[-75%]   left-[80%]       -rotate-[20deg]">T</span>
          <span className="absolute text-[15vw] md:text-[12vw] top-[-34%]   left-[37%]        rotate-[20deg]">F</span>
          <span className="absolute text-[15vw] md:text-[12vw] top-[-65%]   left-[55%]       ">O</span>
          <span className="absolute text-[15vw] md:text-[12vw] top-[-5%]    left-[52%]        -rotate-[225deg]">L</span>
          <span className="absolute text-[15vw] md:text-[12vw] top-[10%]    left-[40%]          rotate-[90deg]">I</span>
          <span className="absolute text-[15vw] md:text-[12vw] top-[-10%]   left-[70%]        ">O</span>
        </div>
      </div>
      <div className="md:w-2/5 flex md:hidden w-full text-gray-400 pb-10">
        <div className="flex justify-end mr-2">
          <ArrowDownRightIcon className="w-12 text-black" />
        </div>
        <div className="flex-col text-[9px] w-full pt-5">
        <div className="flex mt-5 justify-end border-b-2 border-gray-300  md:gap-10 gap-2 pr-5">
          <span>#3D Modeling</span>
          <span>#Code Review</span>
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300  md:gap-10 gap-2 pr-5">
          <span>#Web Development</span>
          <span>#App Development</span>
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300  md:gap-10 gap-2 pr-5">
          <span>#3D Animation</span>
          <span>#DataBase Review</span>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
