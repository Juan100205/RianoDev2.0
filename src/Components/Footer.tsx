import { EnvelopeIcon, PhoneIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        { en: "Data processing", es: "Tratamiento de datos", path: "/privacy" },
        { en: "Cookies", es: "Cookies", path: "/privacy" },
      ],
    },
  };

  return (
    <div className="w-full bg-black relative overflow-hidden">
      {/* CTA strip */}
      <div className="relative border-y border-[#10dffd]/22">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10dffd]/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white font-light text-lg md:text-xl">
              {languageState ? "Ready to build your system?" : "¿Listo para construir tu sistema?"}
            </p>
            <p className="text-white/35 text-sm mt-1">
              {languageState
                ? "Let's define the technical architecture together."
                : "Definamos juntos la arquitectura técnica."}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 bg-[#10dffd] text-black text-xs
                tracking-[0.25em] uppercase px-7 py-3.5 rounded-full hover:opacity-90
                transition-opacity shadow-[0_0_24px_rgba(16,223,253,0.2)] font-display"
            >
              {languageState ? "Schedule a call" : "Agendar llamada"}
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Neon top divider for main footer */}
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10dffd] to-transparent opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10dffd] to-transparent blur-sm opacity-30" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-[#10dffd] opacity-[0.06] blur-2xl rounded-full" />
      </div>

      {/* Main columns */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
          <span className="text-[#10dffd] font-banner font-light text-lg tracking-wide">rianodevz</span>
          <p className="text-white/30 text-xs leading-relaxed max-w-[180px]">
            {languageState
              ? "Design and implementation of digital systems for marketing and operations."
              : "Diseño e implementación de sistemas digitales para marketing y operaciones."}
          </p>
          <div className="flex flex-col gap-2.5 mt-3">
            <button
              onClick={() => window.open("callto:+573124508591", "_blank")}
              className="flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-xs cursor-pointer"
            >
              <PhoneIcon className="w-3 h-3 text-[#10dffd]/50" />
              +57 312 450 8591
            </button>
            <button
              onClick={() => window.open("mailto:juanriza@rianodevz.net", "_blank")}
              className="flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-xs cursor-pointer"
            >
              <EnvelopeIcon className="w-3 h-3 text-[#10dffd]/50" />
              juanriza@rianodevz.net
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-display">
            {languageState ? col.services.title.en : col.services.title.es}
          </span>
          {col.services.items.map((item, i) => (
            <Link key={i} to={item.path} className="text-white/25 hover:text-white/70 transition-colors text-xs">
              {languageState ? item.en : item.es}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-display">
            {languageState ? col.company.title.en : col.company.title.es}
          </span>
          {col.company.items.map((item, i) => (
            <Link key={i} to={item.path} className="text-white/25 hover:text-white/70 transition-colors text-xs">
              {languageState ? item.en : item.es}
            </Link>
          ))}
        </div>

        {/* Help */}
        <div className="flex flex-col gap-3">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-display">
            {languageState ? col.help.title.en : col.help.title.es}
          </span>
          {col.help.links.map((item, i) => (
            <Link key={i} to={item.path} className="text-white/25 hover:text-white/70 transition-colors text-xs">
              {languageState ? item.en : item.es}
            </Link>
          ))}
          {col.help.actions.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="text-white/25 hover:text-white/70 transition-colors text-xs text-left cursor-pointer"
            >
              {languageState ? item.en : item.es}
            </button>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-display">
            {languageState ? col.legal.title.en : col.legal.title.es}
          </span>
          {col.legal.items.map((item, i) => (
            <Link key={i} to={item.path} className="text-white/25 hover:text-white/70 transition-colors text-xs">
              {languageState ? item.en : item.es}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#10dffd]/18">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row md:justify-between items-center gap-2 text-[10px] font-display text-white/20 tracking-wide">
          <span className="text-[#10dffd]/30 italic">Isaías 43:19</span>
          <span>© 2026 RIANODEVZ S.A.S. {languageState ? "All rights reserved." : "Todos los derechos reservados."}</span>
          <span>{languageState ? "Built with React & Vite" : "Construido con React & Vite"}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
