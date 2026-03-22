import LandingImg from "../assets/Landing.jpg";
import LogoSinBgWhite from "../assets/LogoSinBgWhite.png";
import { Link } from "react-router-dom";

interface Props {
  languageState: boolean;
}

const Home = ({ languageState }: Props) => {
  const homeContent = {
    year: "2026",
    tags: [
      { en: "#WebDevelopment", es: "#DesarrolloWeb" },
      { en: "#AIAutomation", es: "#AutomatizaciónIA" },
      { en: "#DataTracking", es: "#TrackingDeDatos" },
      { en: "#ConversionOptimization", es: "#OptimizaciónDeConversión" },
      { en: "#MarketingTech", es: "#MarketingTech" },
      { en: "#SystemsIntegration", es: "#IntegraciónDeSistemas" },
    ],
    en: {
      title: "Technical infrastructure",
      subtitle: "for marketing systems",
      description:
        "Design and implementation of digital systems that integrate web, automation and data for measurable and scalable marketing operations.",
      bullets: [
        "Web development focused on performance and conversion",
        "Process and operational workflow automation",
        "Tracking and advanced analytics implementation",
      ],
      cta: "View implementation",
      ctaSecondary: "Start a conversation",
    },
    es: {
      title: "Infraestructura técnica",
      subtitle: "para sistemas de marketing",
      description:
        "Diseño e implementación de sistemas digitales que integran web, automatización y datos para operaciones de marketing medibles y escalables.",
      bullets: [
        "Desarrollo web orientado a rendimiento y conversión",
        "Automatización de procesos y flujos operativos",
        "Implementación de tracking y analítica avanzada",
      ],
      cta: "Ver implementación",
      ctaSecondary: "Iniciar conversación",
    },
  };

  const content = languageState ? homeContent.en : homeContent.es;

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <img
        src={LandingImg}
        alt="RIANODEV hero background"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-90"
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-25 dark:opacity-65 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-20 dark:opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent opacity-15 dark:opacity-40 pointer-events-none" />

      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#10dffd] opacity-20 blur-[120px] pointer-events-none select-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] rounded-full bg-[#10dffd] opacity-15 blur-[140px] pointer-events-none select-none" aria-hidden="true" />
      <div className="absolute bottom-[-80px] left-1/3 w-[350px] h-[350px] rounded-full bg-[#10dffd] opacity-20 blur-[100px] pointer-events-none select-none" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-10" />

      <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 py-10 md:px-16 md:pt-5 md:pb-30">

        <div className="flex items-center justify-between w-full">
          <img src={LogoSinBgWhite} alt="RIANODEV" className="h-7 md:h-30 object-contain select-none" draggable={false} />
          <span className="font-display text-white text-xs md:text-sm tracking-[0.3em] uppercase">{homeContent.year}</span>
        </div>

        <div className="h-16 md:h-10" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

          <div className="max-w-2xl flex flex-col gap-5">
            <div>
              <h1 className="font-banner font-light text-white leading-none text-[clamp(1.6rem,3.5vw,3rem)]">{content.title}</h1>
              <h2 className="font-banner font-light text-[#10dffd] leading-none text-[clamp(1.4rem,3vw,2.6rem)]">{content.subtitle}</h2>
            </div>

            <p className="font-display text-white/70 text-sm md:text-base leading-relaxed max-w-lg">{content.description}</p>

            <ul className="flex flex-col gap-2">
              {content.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 font-display text-sm text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10dffd] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex gap-3 flex-wrap">
              <Link to="/servicios" className="font-display text-black bg-[#10dffd] text-sm tracking-widest uppercase hover:opacity-90 transition-all duration-300 px-7 py-3 rounded-full cursor-pointer">
                {content.cta}
              </Link>
              <Link to="/schedule" className="font-display text-white text-sm tracking-widest uppercase border border-white/40 hover:border-white/80 hover:bg-white/5 transition-all duration-300 px-7 py-3 rounded-full cursor-pointer">
                {content.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 md:items-end md:max-w-xs">
            {homeContent.tags.map((tag, index) => (
              <span key={index} className="font-display text-xs text-white/60 border border-white/15 hover:border-[#10dffd]/50 hover:text-[#10dffd] transition-all duration-200 px-3 py-1 rounded-full backdrop-blur-sm whitespace-nowrap">
                {languageState ? tag.en : tag.es}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Home;
