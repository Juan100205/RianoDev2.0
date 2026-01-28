import type { RefObject } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface TermsOfServiceProps {
    languageState: boolean;
    setLanguageState: (val: boolean) => void;
    scrollRef: RefObject<HTMLDivElement | null>;
}

const TermsOfService = ({ languageState, setLanguageState, scrollRef }: TermsOfServiceProps) => {
    const content = {
        title: {
            en: "Terms of Service",
            es: "Condiciones del Servicio",
        },
        sections: [
            {
                title: { en: "1. Acceptance of Terms", es: "1. Aceptación de los Términos" },
                text: {
                    en: "By accessing and using this portfolio and the services described herein, you agree to be bound by these Terms of Service. If you do not agree, please do not use this site.",
                    es: "Al acceder y utilizar este portafolio y los servicios aquí descritos, usted acepta estar sujeto a estas Condiciones del Servicio. Si no está de acuerdo, le pedimos que no utilice este sitio.",
                },
            },
            {
                title: { en: "2. Services and Consultation", es: "2. Servicios y Consultoría" },
                text: {
                    en: "The services listed (Technology Consulting, Innovation Strategy, etc.) are descriptions of professional capabilities. Specific engagements require a separate signed agreement detailing scope, timelines, and compensation.",
                    es: "Los servicios enumerados (Consultoría Tecnológica, Estrategia de Innovación, etc.) son descripciones de capacidades profesionales. Los contratos específicos requieren un acuerdo firmado por separado que detalle el alcance, los plazos y la compensación.",
                },
            },
            {
                title: { en: "3. Intellectual Property", es: "3. Propiedad Intelectual" },
                text: {
                    en: "All code, designs, and content on this site are the property of Juan Jose Riaño unless otherwise noted. Unauthorized reproduction or distribution is prohibited.",
                    es: "Todo el código, diseños y contenido en este sitio son propiedad de Juan Jose Riaño a menos que se indique lo contrario. Se prohíbe la reproducción o distribución no autorizada.",
                },
            },
            {
                title: { en: "4. Limitation of Liability", es: "4. Limitación de Responsabilidad" },
                text: {
                    en: "Information on this site is provided 'as is'. I am not liable for any damages arising from the use or inability to use the information or services described on this site.",
                    es: "La información en este sitio se proporciona 'tal cual'. No me hago responsable de ningún daño derivado del uso o la imposibilidad de usar la información o los servicios descritos en este sitio.",
                },
            },
        ],
    };

    return (
        <div className="bg-[#F2F2F2] min-h-screen font-display">
            <Header
                languageState={languageState}
                setLanguageState={setLanguageState}
                scrollRef={scrollRef}
            />
            <div className="max-w-4xl mx-auto pt-40 pb-20 px-10">
                <h1 className="text-4xl font-bold mb-10 text-gray-800">
                    {languageState ? content.title.en : content.title.es}
                </h1>
                <div className="space-y-8">
                    {content.sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold text-gray-700 mb-3">
                                {languageState ? section.title.en : section.title.es}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {languageState ? section.text.en : section.text.es}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer languageState={languageState} />
        </div>
    );
};

export default TermsOfService;
