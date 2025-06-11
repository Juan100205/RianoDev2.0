import { useState, useEffect } from "react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Logo_GitHub_nav from "./Logos_comp/Logo_GitHub copy";

const Header = ({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      setScrolled(element.scrollTop > 100);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);
  const scrollToSelection = (id: string) => {
    const element = document.getElementById(id);
    const container = scrollRef.current;

    if (element && container) {
      const offset =
        id === "resume" ? element.offsetTop - 60 : element.offsetTop - 130;
      container.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };
  const [isOpen, setisOpen] = useState(false);
  const toggleNavbar = () => {
    setisOpen(!isOpen);
  };
  return (
    <header
      className="sticky top-0 transform transform-all border-b-2 border-gray-300 
                 flex w-49/50 mx-auto z-50 justify-between  items-center
                 bg-[#F2F2F2] transition-all duration-500 h-15 flex-wrap"
    >
      <div
        className={`absolute top-2.5 left-0 md:flex flex justify-between px-10 
                w-full items-center transition-all duration-500 ease-in-out
                    ${
                      scrolled
                        ? "opacity-0 -translate-y-10 pointer-events-none"
                        : " opacity-100 translate-x-0"
                    }
                    `}
      >
        <div className="flex items-center gap-5 ">
          <UserCircleIcon className="w-10" />
          <div className="md:flex flex-col justify center">
            <span className="md:text-3xl text-xl text-gray-500 ">
              Juan Jose Riaño
            </span>
            <span className="md:hidden flex text-[9px]">
              &lt;/Software and Mechanical Engineer&gt;
            </span>
          </div>
        </div>
        <span className="text-xs md:flex hidden">
          &lt;/Software and Mechanical Engineer&gt;
        </span>
      </div>

      <div
        className={`absolute top-2.5 left-0 transition-all px-10 
                                duration-500 ease-in-out flex justify-between w-full items-center
                                bg-[#F2F2F2] border-b-2 border-gray-300 flex-wrap pt-1
                                    ${
                                      scrolled
                                        ? " opacity-100 translate-x-0"
                                        : "opacity-0 -translate-y-10 pointer-events-none"
                                    }
                                `}
      >
        <div className="w-4/10 ">
          <div className="md:flex hidden text-sm justify-between ">
            <>
              <a
                onClick={() => scrollToSelection("home")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer "
              >
                &lt;/Home&gt;
                <span
                  className="absolute -bottom-3.5 left-0 w-0 h-0.75 
                             bg-gray-500 group-hover:w-full transition-all "
                ></span>
              </a>
              <a
                onClick={() => scrollToSelection("about_me")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer "
              >
                &lt;/About me&gt;
                <span
                  className="absolute -bottom-3.5 left-0 w-0 h-0.75 
                             bg-gray-500 group-hover:w-full transition-all"
                ></span>
              </a>
              <a
                onClick={() => scrollToSelection("resume")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer "
              >
                &lt;/Resume&gt;
                <span
                  className="absolute -bottom-3.5 left-0 w-0 h-0.75 
                             bg-gray-500 group-hover:w-full transition-all"
                ></span>
              </a>
              <a
                onClick={() => scrollToSelection("projects")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer "
              >
                &lt;/Projects&gt;
                <span
                  className="absolute -bottom-3.5 left-0 w-0 h-0.75  
                            bg-gray-500 group-hover:w-full transition-all"
                ></span>
              </a>
              <a
                onClick={() => scrollToSelection("services")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer "
              >
                &lt;/Services&gt;
                <span
                  className="absolute -bottom-3.5 left-0 w-0 h-0.75 
                             bg-gray-500 group-hover:w-full transition-all"
                ></span>
              </a>
            </>
          </div>
          <button onClick={toggleNavbar} className="w-full md:hidden flex ">
            {isOpen ? (
              <XMarkIcon className="w-10 cursor-pointer" />
            ) : (
              <Bars3Icon className="w-10 cursor-pointer" />
            )}
          </button>
        </div>
        <div className="w-6/10 flex justify-end mb-1">
          <div className="w-10 fill-black">
            <Logo_GitHub_nav />
          </div>
        </div>
        {isOpen && (
          <div className="flex flex-col justify-center text-sm w-full items-center py-10">
            <>
              <a
                onClick={() => scrollToSelection("home")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer mb-2"
              >
                &lt;/Home&gt;
                <span
                  className="absolute -bottom-0 left-0 w-0 h-0.5 
                             bg-gray-500 group-hover:w-full transition-all "
                ></span>
              </a>
              <a
                onClick={() => scrollToSelection("about_me")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer mb-2"
              >
                &lt;/About me&gt;
                <span
                  className="absolute -bottom-0 left-0 w-0 h-0.5 
                             bg-gray-500 group-hover:w-full transition-all"
                ></span>
              </a>
              <a
                onClick={() => scrollToSelection("resume")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer mb-2"
              >
                &lt;/Resume&gt;
                <span
                  className="absolute -bottom-0 left-0 w-0 h-0.5 
                             bg-gray-500 group-hover:w-full transition-all"
                ></span>
              </a>
              <a
                onClick={() => scrollToSelection("projects")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer mb-2"
              >
                &lt;/Projects&gt;
                <span
                  className="absolute -bottom-0 left-0 w-0 h-0.5  
                            bg-gray-500 group-hover:w-full transition-all"
                ></span>
              </a>
              <a
                onClick={() => scrollToSelection("services")}
                className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer "
              >
                &lt;/Services&gt;
                <span
                  className="absolute -bottom-0 left-0 w-0 h-0.5 
                             bg-gray-500 group-hover:w-full transition-all"
                ></span>
              </a>
            </>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
