import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface Props {
  languageState: boolean;
}

const Footer = ({ languageState }: Props) => {
  const col = {
    services: {
      title: { en: "Services", es: "Servicios" },
      items: [
        { en: "Web Infrastructure", es: "Infraestructura Web", path: "/servicios" },
        { en: "Automation & AI", es: "Automatización & IA", path: "/servicios" },
        { en: "Data & Tracking", es: "Data & Tracking", path: "/servicios" },
        { en: "Systems Integration", es: "Integración de Sistemas", path: "/servicios" },
      ],
    },
    company: {
      title: { en: "Company", es: "Empresa" },
      items: [
        { en: "About RIANODEVZ", es: "Sobre RIANODEVZ", path: "/sobre" },
        { en: "Case Studies", es: "Casos de Uso", path: "/clientes" },
        { en: "Implementation Model", es: "Modelo de Implementación", path: "/servicios" },
      ],
    },
    help: {
      title: { en: "Help & Support", es: "Ayuda y Soporte" },
      links: [
        { en: "FAQ", es: "Preguntas Frecuentes", path: "/faq" },
        { en: "Schedule a consultation", es: "Agendar consultoría", path: "/schedule" },
        { en: "Request a quote", es: "Solicitar cotización", path: "/quote" },
      ],
      actions: [
        {
          en: "Technical support",
          es: "Soporte técnico",
          action: () => window.open("mailto:juanriza@rianodevz.net?subject=Soporte%20Técnico", "_blank"),
        },
        {
          en: "WhatsApp",
          es: "WhatsApp",
          action: () => window.open("https://wa.me/3124508591?text=Hola%20me%20gustar%C3%ADa%20saber%20sobre%20ustedes", "_blank"),
        },
      ],
    },
    legal: {
      title: { en: "Policies", es: "Políticas" },
      items: [
        { en: "Privacy Policy", es: "Política de Privacidad", path: "/privacy" },
        { en: "Terms of Service", es: "Condiciones del Servicio", path: "/terms" },
        {
          en: "Data processing",
          es: "Tratamiento de datos",
          path: "/privacy",
        },
        {
          en: "Cookies",
          es: "Cookies",
          path: "/privacy",
        },
      ],
    },
  };

  return (
    <div className="w-full bg-black dark:bg-black relative">
      {/* Neon top border */}
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10dffd] to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10dffd] to-transparent blur-sm opacity-80" />
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1/2 h-5 bg-[#10dffd] opacity-10 blur-xl rounded-full" />
      </div>

      {/* Main footer columns */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">

        {/* Brand column */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
          <span className="text-[#10dffd] font-light text-lg tracking-wide">rianodevz</span>
          <p className="text-gray-500 text-xs leading-relaxed max-w-[180px]">
            {languageState
              ? "Design and implementation of digital systems for marketing and operations."
              : "Diseño e implementación de sistemas digitales para marketing y operaciones."}
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => window.open("callto:+573124508591", "_blank")}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs cursor-pointer"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              +57 312 450 8591
            </button>
            <button
              onClick={() => window.open("mailto:juanriza@rianodevz.net", "_blank")}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs cursor-pointer"
            >
              <EnvelopeIcon className="w-3.5 h-3.5" />
              <span className="md:hidden">juanriza@rianodevz.net</span>
              <span className="hidden md:inline">juanriza@rianodevz.net</span>
            </button>
          </div>
        </div>

        {/* Services column */}
        <div className="flex flex-col gap-3">
          <span className="text-white text-xs font-light tracking-widest uppercase">
            {languageState ? col.services.title.en : col.services.title.es}
          </span>
          {col.services.items.map((item, i) => (
            <Link key={i} to={item.path} className="text-gray-500 hover:text-white transition-colors text-xs">
              {languageState ? item.en : item.es}
            </Link>
          ))}
        </div>

        {/* Company column */}
        <div className="flex flex-col gap-3">
          <span className="text-white text-xs font-light tracking-widest uppercase">
            {languageState ? col.company.title.en : col.company.title.es}
          </span>
          {col.company.items.map((item, i) => (
            <Link key={i} to={item.path} className="text-gray-500 hover:text-white transition-colors text-xs">
              {languageState ? item.en : item.es}
            </Link>
          ))}
        </div>

        {/* Help & Support column */}
        <div className="flex flex-col gap-3">
          <span className="text-white text-xs font-light tracking-widest uppercase">
            {languageState ? col.help.title.en : col.help.title.es}
          </span>
          {col.help.links.map((item, i) => (
            <Link key={i} to={item.path} className="text-gray-500 hover:text-white transition-colors text-xs">
              {languageState ? item.en : item.es}
            </Link>
          ))}
          {col.help.actions.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="text-gray-500 hover:text-white transition-colors text-xs text-left cursor-pointer"
            >
              {languageState ? item.en : item.es}
            </button>
          ))}
        </div>

        {/* Legal column */}
        <div className="flex flex-col gap-3">
          <span className="text-white text-xs font-light tracking-widest uppercase">
            {languageState ? col.legal.title.en : col.legal.title.es}
          </span>
          {col.legal.items.map((item, i) => (
            <Link key={i} to={item.path} className="text-gray-500 hover:text-white transition-colors text-xs">
              {languageState ? item.en : item.es}
            </Link>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#10dffd]/10 w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row md:justify-between items-center gap-2 text-xs font-light text-gray-600">
          <span>Isaías 43:19</span>
          <span>
            © 2026 RIANODEVZ S.A.S.{" "}
            {languageState ? "All rights reserved." : "Todos los derechos reservados."}
          </span>
          <span>
            {languageState ? "Made with React & Vite" : "Hecho con React & Vite"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
