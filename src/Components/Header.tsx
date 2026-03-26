import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import isotipoBlack from "../assets/IsotipoNoBgBlack.png";
import isotipoWhite from "../assets/IsotipoNoBgWhite.png";
import Logo_GitHub_nav from "./Logos_comp/Logo_GitHub copy";
interface Props {
  languageState: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  setLanguageState: (val: boolean) => void;
}
function Header({ languageState, scrollRef, setLanguageState }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      setScrolled(element.scrollTop > 100);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  const isHome = location.pathname === "/";
  const showNav = scrolled || !isHome;

  const [isOpen, setisOpen] = useState(false);
  const toggleNavbar = () => {
    setisOpen(!isOpen);
  };
  const changeLanguage = () => {
    setLanguageState(!languageState);
  };
  const [isHover, setisHover] = useState(false);

  const headerContent = {
    name: "rianodevz",
    title: {
      en: "Innovation Architect & Digital Transformation",
      es: "Arquitecto de Innovación y Transformación Digital",
    },
    menuItems: [
      { path: "/", en: "Home", es: "Inicio" },
      { path: "/servicios", en: "Services", es: "Servicios" },
      { path: "/clientes", en: "Case Studies", es: "Casos de Uso" },
      { path: "/sobre", en: "About", es: "Sobre" },
      { path: "/blog", en: "Blog", es: "Blog" },
      { path: "/portal", en: "Client Portal", es: "Portal" },
    ],
  };
  return (
    <header
      className="sticky top-0 border-b border-[#10dffd]/20
                 flex w-full z-50 justify-between items-center
                 bg-white dark:bg-black transition-all duration-500 min-h-[5rem] flex-wrap"
    >
      <div
        className={`absolute inset-0 md:flex flex justify-between px-4 md:px-10
                w-full items-center transition-all duration-500 ease-in-out
                    ${showNav
            ? "opacity-0 -translate-y-10 pointer-events-none"
            : " opacity-100 translate-x-0"
          }
                    `}
      >
        <Link to="/" className="flex items-center gap-5 cursor-pointer">
          <img src={isotipoBlack} alt="RianoDevz" className="w-10 dark:hidden" />
          <img src={isotipoWhite} alt="RianoDevz" className="w-10 hidden dark:block" />
          <div className="md:flex flex-col justify center">
            <span className="md:text-3xl text-xl text-gray-400">
            </span>
            <span className="md:hidden flex text-[9px] text-white">
              {languageState ? headerContent.title.en : headerContent.title.es}
            </span>
          </div>
        </Link>
        <span className="text-xs md:flex hidden text-white">
          {languageState ? headerContent.title.en : headerContent.title.es}
        </span>
      </div>

      <div
        className={`absolute inset-0 transition-all px-4 md:px-10
                                duration-500 ease-in-out flex justify-between w-full items-center
                                bg-white dark:bg-black border-b border-[#10dffd]/20 flex-wrap
                                    ${showNav
            ? " opacity-100 translate-x-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
          }
                                `}
      >
        <div className="w-4/10 ">
          <div className="md:flex hidden text-sm justify-between gap-6">
            {headerContent.menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group transition-transform duration-300
                      ease-in-out cursor-pointer mb-2 font-display text-white"
              >
                {languageState ? item.en : item.es}
                <span
                  className="absolute -bottom-0 left-0 w-0 h-0.5
                           bg-[#10dffd] group-hover:w-full transition-all"
                ></span>
              </Link>
            ))}
          </div>
          <button onClick={toggleNavbar} className="w-full md:hidden flex text-white">
            {isOpen ? (
              <XMarkIcon className="w-10 cursor-pointer" />
            ) : (
              <Bars3Icon className="w-10 cursor-pointer" />
            )}
          </button>
        </div>
        <div className="w-6/10 flex justify-end mb-1">
          <div className="w-50 text-white flex justify-end gap-5 items-center">
            <div className="w-10">
              <Logo_GitHub_nav />
            </div>
            <button
              className="w-5 cursor-pointer border-none bg-transparent text-white relative overflow-hidden"
              onClick={() => {
                changeLanguage();
                setisHover(false);
              }}
              onMouseEnter={() => setisHover(true)}
              onMouseLeave={() => setisHover(false)}
            >
              <span
                className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out  ${isHover ? "translate-x-7 opacity-0" : "translate-x-0"
                  }`}
              >
                {languageState ? "eng" : "esp"}
              </span>
              <span
                className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${isHover ? "translate-x-0" : "-translate-x-7 opacity-0"
                  }`}
              >
                {languageState ? "esp" : "eng"}
              </span>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col text-sm w-full items-center pb-8 pt-4 mt-[5rem] md:hidden">
          {headerContent.menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setisOpen(false)}
              className="relative group transition-transform duration-300
                    ease-in-out cursor-pointer py-3 font-display text-white w-full text-center"
            >
              {languageState ? item.en : item.es}
              <span
                className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5
                         bg-[#10dffd] group-hover:w-1/4 transition-all"
              ></span>
            </Link>
          ))}
          <button
            onClick={changeLanguage}
            className="mt-4 px-5 py-2 rounded-full border border-[#10dffd]/40 text-[#10dffd] text-xs tracking-widest uppercase cursor-pointer hover:bg-[#10dffd]/10 transition-colors"
          >
            {languageState ? "Español" : "English"}
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

