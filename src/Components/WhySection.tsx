interface Props {
  languageState: boolean;
}

const WhySection = ({ languageState }: Props) => {
  const problems = [
    {
      en: { title: "Inconsistent tracking", body: "Badly implemented or incomplete events generate unreliable data." },
      es: { title: "Tracking inconsistente", body: "Eventos mal implementados o incompletos generan datos poco confiables." },
    },
    {
      en: { title: "Non-integrated systems", body: "Tools operating in isolation without unified data flow." },
      es: { title: "Sistemas no integrados", body: "Herramientas que operan de forma aislada sin flujo de datos unificado." },
    },
    {
      en: { title: "Manual processes", body: "Repetitive operations that affect efficiency and scalability." },
      es: { title: "Procesos manuales", body: "Operaciones repetitivas que afectan eficiencia y escalabilidad." },
    },
  ];

  return (
    <section className="w-full min-h-screen flex items-center relative overflow-hidden px-6 md:px-16 py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-[#10dffd]/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#10dffd] opacity-[0.04] blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-8 h-[2px] bg-[#10dffd]" />
          <span className="font-display text-[#10dffd] text-xs tracking-[0.3em] uppercase">
            {languageState ? "Structural problems" : "Problemas estructurales"}
          </span>
        </div>

        <div className="md:flex gap-16 items-start">
          {/* Left: title + close */}
          <div className="md:w-1/2 mb-12 md:mb-0 flex flex-col justify-between md:min-h-[300px]">
            <h2 className="text-2xl md:text-4xl font-light text-white leading-tight">
              {languageState
                ? "Structural problems in marketing systems"
                : "Problemas estructurales en sistemas de marketing"}
            </h2>
            <p className="text-[#10dffd] text-base md:text-lg font-light mt-8 md:mt-auto pt-8">
              {languageState
                ? "These are not strategy problems. They are technical implementation problems."
                : "Estos problemas no son de estrategia. Son de implementación técnica."}
            </p>
          </div>

          {/* Right: problems */}
          <div className="md:w-1/2 flex flex-col gap-8">
            {problems.map((item, i) => (
              <div key={i} className="flex gap-4 items-start border-l-2 border-[#10dffd]/20 pl-5 hover:border-[#10dffd]/60 transition-colors">
                <div>
                  <h4 className="text-white text-base font-light mb-1">
                    {languageState ? item.en.title : item.es.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {languageState ? item.en.body : item.es.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
