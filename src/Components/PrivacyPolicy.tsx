import type { RefObject } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PrivacyPolicyProps {
    languageState: boolean;
    setLanguageState: (val: boolean) => void;
    scrollRef: RefObject<HTMLDivElement | null>;
}

const PrivacyPolicy = ({ languageState, setLanguageState, scrollRef }: PrivacyPolicyProps) => {
    const content = {
        title: {
            en: "Privacy Policy",
            es: "Política de Privacidad",
        },
        sections: [
            {
                title: { en: "1. Data Collection", es: "1. Recolección de Datos" },
                text: {
                    en: "This portfolio does not actively collect personal data from visitors. If you contact me via email or phone, I will only use that information to respond to your inquiry.",
                    es: "Este portafolio no recolecta activamente datos personales de los visitantes. Si se pone en contacto conmigo por correo electrónico o teléfono, solo utilizaré esa información para responder a su consulta.",
                },
            },
            {
                title: { en: "2. Cookies", es: "2. Cookies" },
                text: {
                    en: "This site may use basic technical cookies necessary for the operation of the website. No tracking or advertising cookies are used.",
                    es: "Este sitio puede utilizar cookies técnicas básicas necesarias para el funcionamiento del sitio web. No se utilizan cookies de seguimiento o publicidad.",
                },
            },
            {
                title: { en: "3. Third-Party Links", es: "3. Enlaces de Terceros" },
                text: {
                    en: "This site contains links to third-party platforms like GitHub, Google Drive, and LinkedIn. Their respective privacy policies govern your interactions with those sites.",
                    es: "Este sitio contiene enlaces a plataformas de terceros como GitHub, Google Drive y LinkedIn. Sus respectivas políticas de privacidad rigen sus interacciones con esos sitios.",
                },
            },
            {
                title: { en: "4. Contact Information", es: "4. Información de Contacto" },
                text: {
                    en: "If you have any questions about this Privacy Policy, please contact me at juanjorianozabaleta@gmail.com.",
                    es: "Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contácteme en juanjorianozabaleta@gmail.com.",
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

export default PrivacyPolicy;
