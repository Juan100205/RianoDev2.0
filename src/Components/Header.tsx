import { useState, useEffect } from "react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Logo_GitHub_nav from "./Logos_comp/Logo_GitHub copy";
interface Props {
  languageState: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  setLanguageState: (val: boolean) => void;
}
function Header({ languageState, scrollRef, setLanguageState }: Props) {
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
  const changeLanguage = () => {
    setLanguageState(!languageState);
  };
  const [isHover, setisHover] = useState(false);

  const headerContent = {
    name: "Juan Jose Riaño",
    title: {
      en: "</Software and Mechanical Engineer>",
      es: "</Ingeniero de Software y Mecánico>",
    },
    menuItems: [
      { id: "home", en: "</Home>", es: "</Inicio>" },
      { id: "about_me", en: "</About me>", es: "</Sobre mí>" },
      { id: "resume", en: "</Resume>", es: "</Currículum>" },
      { id: "projects", en: "</Projects>", es: "</Proyectos>" },
      { id: "services", en: "</Services>", es: "</Servicios>" },
    ],
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
              {headerContent.name}
            </span>
            <span className="md:hidden flex text-[9px]">
              {languageState ? headerContent.title.en : headerContent.title.es}
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
              {headerContent.menuItems.map((item) => (
                <a
                  key={item.id}
                  onClick={() => scrollToSelection(item.id)}
                  className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer mb-2"
                >
                  {languageState ? item.en : item.es}
                  <span
                    className="absolute -bottom-0 left-0 w-0 h-0.5 
                             bg-gray-500 group-hover:w-full transition-all "
                  ></span>
                </a>
              ))}
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
          <div className="w-50 fill-black flex justify-end gap-5">
            <div className="w-10">
              <Logo_GitHub_nav />
            </div>
            <button
              className="w-5 cursor-pointer"
              onClick={() => {
                changeLanguage();
                setisHover(false);
              }}
              onMouseEnter={() => setisHover(true)}
              onMouseLeave={() => setisHover(false)}
            >
              <span
                className={`absolute top-3 transition-all duration-500 ease-in-out font-bold ${
                  isHover ? "translate-x-7 opacity-0" : "translate-x-0"
                }`}
              >
                {languageState ? "eng" : "esp"}
              </span>
              <span
                className={`absolute top-3 transition-all duration-500 ease-in-out ${
                  isHover ? "translate-x-0" : "-translate-x-7 opacity-0"
                }`}
              >
                {languageState ? "esp" : "eng"}
              </span>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="flex flex-col justify-center text-sm w-full items-center py-10">
            <>
              {headerContent.menuItems.map((item) => (
                <a
                  key={item.id}
                  onClick={() => scrollToSelection(item.id)}
                  className="relative group transition-transform duration-300 
                        ease-in-out cursor-pointer mb-2"
                >
                  {languageState ? item.en : item.es}
                  <span
                    className="absolute -bottom-0 left-0 w-0 h-0.5 
                             bg-gray-500 group-hover:w-full transition-all "
                  ></span>
                </a>
              ))}
            </>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
