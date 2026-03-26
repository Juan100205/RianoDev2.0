import { motion } from "framer-motion"
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp, cardVariant } from "../lib/animations"

const testimonios = [
    { initial: "A", text: <>Llevaba casi un año viviendo en modo supervivencia después de mi <span className="text-[#FB6F92] font-bold">divorcio</span>. El Método Levántate me dio estructura cuando mi vida no tenía ninguna. Lloraba leyendo el eBook porque sentía que <span className="text-[#FB6F92] font-bold">alguien por fin me entendía</span>.</>, name: "Ana P.", info: "34 años - México" },
    { initial: "M", text: <>Compré esto sin esperar mucho, lo había intentado todo. Pero algo en este método <span className="text-[#FB6F92] font-bold">es diferente</span>. No te pide que seas perfecta, te pide que empieces. Y eso fue lo que necesitaba escuchar.</>, name: "María J.", info: "29 años - Colombia" },
    { initial: "V", text: <>Las plantillas son un regalo. El tracker de hábitos <span className="text-[#FB6F92] font-bold">me cambió la vida</span> porque finalmente puedo ver mis avances. Ya van 3 semanas sin fallar y eso para mí es un milagro.</>, name: "Valentina R.", info: "27 años - Venezuela" },
]

const Star = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FB6F92]">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
)

export default function Testimonios() {
    const { ref, isActive } = useSnapSection('testimonios')

    return (
        <section
            id="testimonios"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full flex flex-col items-center justify-center text-center px-6 py-20"
        >
            <motion.div
                className="max-w-6xl flex flex-col items-center w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.p variants={fadeUp} className="font-cormorant text-[#3F4321] uppercase tracking-[0.2em] font-medium text-xs md:text-sm">
                    Ellas ya se levantaron
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-bold font-playfair max-w-2xl text-[#1a1a1a] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] text-2xl md:text-[3rem]">
                    Lo que dicen las mujeres{' '}
                    <span className="font-amoresa font-light text-[#FB6F92] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">que ya lo vivieron</span>
                </motion.h2>

                <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full pt-10">
                    {testimonios.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariant}
                            whileHover={{ y: -6, backgroundColor: '#FADADD', boxShadow: '0 16px 36px rgba(251,111,146,0.2)' }}
                            className="bg-white rounded-[2rem] p-10 shadow-md flex flex-col text-left transition-colors duration-300"
                        >
                            <div className="flex gap-1 mb-6">{[...Array(5)].map((_, j) => <Star key={j} />)}</div>
                            <p className="font-cormorant text-[1.15rem] leading-relaxed text-neutral-800 mb-8 flex-grow">{t.text}</p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-[#FB6F92] flex items-center justify-center shadow-inner flex-shrink-0">
                                    <span className="font-amoresa text-2xl text-white mt-1">{t.initial}</span>
                                </div>
                                <div>
                                    <h4 className="font-playfair text-lg font-bold text-[#1a1a1a] leading-none">{t.name}</h4>
                                    <p className="font-cormorant text-sm text-neutral-500 mt-1">{t.info}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}
