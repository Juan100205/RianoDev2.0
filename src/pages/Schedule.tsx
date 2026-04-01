import type { RefObject } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

// 👉 Reemplaza esta URL con tu enlace de Calendly real
const CALENDLY_URL = "https://calendly.com/juanriza-rianodevz";

const Schedule = ({ languageState, setLanguageState, scrollRef }: Props) => {
  const l = languageState;

  return (
    <>
      <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
      <div ref={scrollRef} className="page_scroll scrollbar_exp">
        <div className="max-w-4xl mx-auto px-6 py-16">

          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#10dffd]/10 text-[#10dffd] rounded-xl p-2">
              <CalendarDaysIcon className="w-5 h-5" />
            </div>
            <span className="text-[#10dffd] text-xs tracking-[0.3em] uppercase">
              {l ? "Schedule" : "Agendar"}
            </span>
          </div>

          <h1 className="md:text-4xl text-2xl font-light text-white mb-2">
            {l ? "Schedule a consultation" : "Agendar una consultoría"}
          </h1>
          <p className="text-gray-500 text-sm mb-10 max-w-lg">
            {l
              ? "Select a time that works for you. We'll review your context and come prepared with a technical perspective."
              : "Selecciona el horario que más te convenga. Revisaremos tu contexto y llegamos preparados con una perspectiva técnica."}
          </p>

          {/* Calendly inline embed */}
          <div className="border border-[#10dffd]/30 rounded-2xl overflow-x-hidden">
            <iframe
              src={`${CALENDLY_URL}?embed_type=inline&hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=10dffd`}
              width="100%"
              height="650"
              frameBorder="0"
              title={l ? "Schedule a consultation" : "Agendar consultoría"}
              className="block"
            />
          </div>

          <p className="text-gray-600 text-xs text-center mt-6">
            {l
              ? "Prefer another channel? Write to us at juanriza@rianodevz.net or via WhatsApp."
              : "¿Prefieres otro canal? Escríbenos a juanriza@rianodevz.net o por WhatsApp."}
          </p>

        </div>
        <Footer languageState={languageState} />
      </div>
    </>
  );
};

export default Schedule;
