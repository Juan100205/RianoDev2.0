import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
interface Props {
  languageState:boolean;
}
const Footer = ({languageState}:Props) => {
  return (
    <div className="w-full bg-[#D9D9D9]">
      <div className="border-b-1 h-75 border-gray-400 md:mx-5 flex justify-between items-center px-2 md:px-100">
        <div className="md:w-full w-1/2 text-center">
          <h1 className="font-bold text-center">
            {languageState ? "Attachments" : "Adjuntos"}
          </h1>
          <a
            onClick={() =>
              window.open(
                "https://drive.google.com/drive/folders/1OKmfIBey0vfV6QiR2QMvXtKVe1u2qP_7?usp=sharing",
                "_blank"
              )
            }
            className="transition-all text-gray-500 block mt-5 hover:text-black cursor-pointer"
          >
            {languageState ? "Certificates" : "Certificados"}
          </a>
          <a
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/17ugZAIEIP7au6lPodQTcukQvqu5n3M3d/view",
                "_blank"
              )
            }
            className="transition-all text-gray-500 block mt-5 hover:text-black cursor-pointer"
          >
            {languageState ? "Resume" : "Hoja de Vida"}
          </a>
          <a
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1ODM0-GfPv1NyTh7SWEO-2XOLCASJuKT3/view?usp=sharing",
                "_blank"
              )
            }
            className="transition-all text-gray-500 block mt-5 hover:text-black cursor-pointer"
          >
            {languageState ? "CV" : "CV"}
          </a>
        </div>

        <div className="md:w-full w-1/2 text-center">
          <h1 className="font-bold text-center">
            {languageState ? "Contact me" : "Contáctame"}
          </h1>
          <div className="flex justify-start mt-5">
            <PhoneIcon className="w-5" />
            <p
              onClick={() => window.open("callto:+573124508591", "_blank")}
              className="transition-all text-gray-500 block ml-5 hover:text-black cursor-pointer"
            >
              +57 312 450 8591
            </p>
          </div>
          <div className="flex mt-10 justify-start">
            <EnvelopeIcon className="w-5" />
            <p
              onClick={() =>
                window.open("mailto:juanjorianozabaleta@gmail.com", "_blank")
              }
              className="md:hidden flex transition-all text-gray-500 block ml-5 hover:text-black cursor-pointer"
            >
              juan..@gmail.com
            </p>
            <p
              onClick={() =>
                window.open("mailto:juanjorianozabaleta@gmail.com", "_blank")
              }
              className="md:flex hidden transition-all text-gray-500 block ml-5 hover:text-black cursor-pointer"
            >
              juanjorianozabaleta@gmail.com
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between px-15 md:text-sm text-xs font-light text-gray-500">
        <span className="w-50 md:flex hidden">
          Isaías 43:19
        </span>
        <span>
          © 2025 Juan Jose Riaño.{" "}
          {languageState
            ? "All rights reserved."
            : "Todos los derechos reservados."}
        </span>
        <span>
          {languageState
            ? "Made with React & Three.js"
            : "Hecho con React & Three.js"}
        </span>
      </div>
    </div>
  );
};

export default Footer;
