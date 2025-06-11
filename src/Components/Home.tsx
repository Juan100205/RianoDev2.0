import { ArrowDownRightIcon } from "@heroicons/react/24/solid";
const Home = () => {
  return (
    <div className="md:flex  w-3/4 mx-auto items-end">
      <div className="md:w-2/5 md:flex flex-col hidden w-full text-gray-400 pb-10 text-[1vw]">
        <div className="flex justify-end pr-[4vw]">
          <ArrowDownRightIcon className="w-[15vw] text-black" />
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300 w-5/6 gap-[3vw] pr-[1vw]">
          <span>#3D Modeling</span>
          <span>#Code Review</span>
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300 w-5/6 gap-[3vw] pr-[1vw]">
          <span>#Web Development</span>
          <span>#App Development</span>
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300 w-5/6 gap-[3vw] pr-[1vw]">
          <span>#3D Animation</span>
          <span>#DataBase Review</span>
        </div>
      </div>
      <div className="md:w-3/5 w-full md:h-[38vw] h-[60vw] rounded-2xl bg-[#111BFF] flex items-end p-5">
        <div className="md:text-4xl text-xl font-black text-white ">2025</div>
        <div className="relative w-full aspect-[3/1] font-banner font-black text-white">
          <span className="absolute text-[17vw] md:text-[11vw] top-[-100%]  left-[40%]     -rotate-[85deg]">P</span>
          <span className="absolute text-[17vw] md:text-[11vw] top-[-130%]  left-[53%]     ">O</span>
          <span className="absolute text-[17vw] md:text-[11vw] top-[-148%]  left-[75%]      -rotate-[10deg]">R</span>
          <span className="absolute text-[17vw] md:text-[11vw] top-[-75%]   left-[80%]      -rotate-[20deg]">T</span>
          <span className="absolute text-[17vw] md:text-[11vw] top-[-34%]   left-[38%]       rotate-[20deg]">F</span>
          <span className="absolute text-[17vw] md:text-[11vw] top-[-64%]   left-[57%]      ">O</span>
          <span className="absolute text-[17vw] md:text-[11vw] top-[-5%]    left-[53%]       -rotate-[225deg]">L</span>
          <span className="absolute text-[17vw] md:text-[11vw] top-[10%]    left-[40%]         rotate-[90deg]">I</span>
          <span className="absolute text-[17vw] md:text-[11vw] top-[-10%]   left-[70%]       ">O</span>
        </div>
      </div>
      <div className="md:w-2/5 flex md:hidden w-full text-gray-400 pb-10">
        <div className="flex justify-end mr-5">
          <ArrowDownRightIcon className="w-[15vw] text-black" />
        </div>
        <div className="flex-col text-[2vw] w-full pt-5">
        <div className="flex mt-5 justify-end border-b-2 border-gray-300  gap-[3vw] pr-[1vw]">
          <span>#3D Modeling</span>
          <span>#Code Review</span>
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300  gap-[3vw] pr-[1vw]">
          <span>#Web Development</span>
          <span>#App Development</span>
        </div>
        <div className="flex mt-5 justify-end border-b-2 border-gray-300  gap-[3vw] pr-[1vw]">
          <span>#3D Animation</span>
          <span>#DataBase Review</span>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
