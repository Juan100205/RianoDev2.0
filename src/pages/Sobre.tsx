import type { RefObject } from "react";
import LogoSinBgBlack from "../assets/LogoSinBgBlack.png";
import LogoSinBgWhite from "../assets/LogoSinBgWhite.png";
import { EnvelopeIcon, BoltIcon, CodeBracketIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Logo_LinkedIn from "../Components/Logos_comp/Logo_LinkedIn";
import Logo_wha from "../Components/Logos_comp/Logo_whatsapp";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

const Sobre = ({ languageState, setLanguageState, scrollRef }: Props) => {
  const content = {
    tag: { en: "About RIANODEV", es: "Sobre RIANODEV" },
    intro: {
      en: "RIANODEV is a team focused on building digital systems that integrate web, automation and data. Led by Juan José Riaño, we combine engineering, development and emerging technologies to build solutions that actually work in practice.",
      es: "RIANODEV es un equipo enfocado en el desarrollo de sistemas digitales que integran web, automatización y datos. Liderado por Juan José Riaño, combinamos ingeniería, desarrollo y tecnologías emergentes para construir soluciones que funcionan en la práctica.",
    },
    positioning: {
      en: "We're the technical team that converts marketing strategies into functional, measurable and scalable digital systems.",
      es: "Somos el equipo técnico que convierte estrategias de marketing en sistemas digitales funcionales, medibles y escalables.",
    },
    whoFor: {
      en: "Who we work with",
      es: "Con quién trabajamos",
    },
    whoForItems: [
      { en: "Marketing agencies that need a reliable technical partner", es: "Agencias de marketing que necesitan un socio técnico confiable" },
      { en: "Companies with internal marketing teams and manual processes", es: "Empresas con equipo de marketing interno y procesos manuales" },
      { en: "Entrepreneurs validating digital products", es: "Emprendedores validando productos digitales" },
    ],
    connect: { en: "Get in touch", es: "Contáctanos" },
    tagline: {
      en: "We build digital systems that convert, automate and scale.",
      es: "Construimos sistemas digitales que convierten, automatizan y escalan.",
    },
  };

  const capabilities = [
    { icon: <CodeBracketIcon className="w-5 h-5 text-[#10dffd]" />, en: "Web development & infrastructure", es: "Desarrollo web e infraestructura" },
    { icon: <BoltIcon className="w-5 h-5 text-[#10dffd]" />, en: "AI automation & workflows", es: "Automatización con IA y workflows" },
    { icon: <ChartBarIcon className="w-5 h-5 text-[#10dffd]" />, en: "Data, tracking & analytics", es: "Data, tracking y analítica" },
  ];

  return (
    <>
      <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
      <div ref={scrollRef} className="page_scroll scrollbar_exp">
      <div className="w-4/5 mx-auto py-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1">
            <img src={LogoSinBgBlack} alt="RIANODEV" className="h-20 dark:hidden object-contain" />
            <img src={LogoSinBgWhite} alt="RIANODEV" className="h-20 hidden dark:block object-contain" />
            <span className="text-xs text-gray-400 dark:text-gray-500">S.A.S.</span>
          </span>
        </div>
        <h1 className="md:text-5xl text-3xl font-light text-white mb-12">
          {languageState ? content.tag.en : content.tag.es}
        </h1>

        <div className="md:flex gap-16">
          {/* Left: photo card */}
          <div className="relative bg-[url('/src/assets/About_me.jpg')] bg-cover bg-top rounded-2xl md:w-80 w-full md:h-96 h-64 shrink-0 mb-10 md:mb-0">
            <div className="absolute inset-0 bg-black rounded-2xl opacity-25"></div>
            <div className="relative z-10 p-6 flex h-full flex-col justify-between">
              <div>
                <span className="flex items-center gap-1">
                  <img src={LogoSinBgWhite} alt="RIANODEV" className="h-4 object-contain" />
                  <span className="text-white text-sm">S.A.S.</span>
                </span>
                <span className="block font-light text-2xl text-[#10dffd]">Juan José Riaño</span>
              </div>
              <span className="block text-white text-sm opacity-90 italic">
                "{languageState ? content.tagline.en : content.tagline.es}"
              </span>
            </div>
          </div>

          {/* Right: content */}
          <div className="flex flex-col gap-8 flex-1">
            {/* Intro */}
            <div className="border-b border-[#10dffd]/20 pb-8">
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {languageState ? content.intro.en : content.intro.es}
              </p>
              <p className="text-white text-sm leading-relaxed font-light">
                {languageState ? content.positioning.en : content.positioning.es}
              </p>
            </div>

            {/* Capabilities */}
            <div>
              <h3 className="text-xs font-light text-gray-400 mb-4 tracking-widest uppercase">
                {languageState ? "What we do" : "Qué hacemos"}
              </h3>
              <div className="flex flex-col gap-3">
                {capabilities.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {c.icon}
                    <span className="text-sm text-gray-300">{languageState ? c.en : c.es}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who we work with */}
            <div>
              <h3 className="text-xs font-light text-gray-400 mb-4 tracking-widest uppercase">
                {languageState ? content.whoFor.en : content.whoFor.es}
              </h3>
              <ul className="flex flex-col gap-2">
                {content.whoForItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10dffd] shrink-0 mt-1.5" />
                    {languageState ? item.en : item.es}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="border-t border-[#10dffd]/20 pt-6">
              <h3 className="font-light text-white mb-4">
                {languageState ? content.connect.en : content.connect.es}
              </h3>
              <div className="flex gap-4 items-center">
                <a
                  href="mailto:juanriza@rianodevz.net"
                  className="flex items-center gap-2 bg-[#10dffd] text-black text-xs font-light px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  Email
                </a>
                <a href="https://www.linkedin.com/in/juan-jose-riano/" target="_blank" rel="noopener noreferrer" className="w-8 fill-white hover:opacity-70 transition-opacity">
                  <Logo_LinkedIn />
                </a>
                <a href="https://wa.me/3124508591?text=Hola%20me%20gustar%C3%ADa%20saber%20sobre%20ustedes" target="_blank" rel="noopener noreferrer" className="w-8 fill-white hover:opacity-70 transition-opacity">
                  <Logo_wha />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer languageState={languageState} />
      </div>
    </>
  );
};

export default Sobre;
