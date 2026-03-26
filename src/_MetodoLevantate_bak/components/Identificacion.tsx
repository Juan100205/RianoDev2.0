import { motion } from "framer-motion"
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp, cardVariant } from "../lib/animations"

const cards = [
    <>Te levantas cada día sin <span className="font-bold text-[#FB6F92]">propósito claro</span>, solo cumpliendo con lo que toca.</>,
    <>El <span className="font-bold text-[#FB6F92]">desánimo se instaló</span> y ya ni recuerdas cómo era sentirte bien contigo misma.</>,
    <>Sabes que quieres más, pero la <span className="font-bold text-[#FB6F92]">desesperanza</span> te paraliza antes de empezar.</>,
    <>Empiezas cosas con emoción pero <span className="font-bold text-[#FB6F92]">no logras mantener ningún hábito</span> por más de una semana.</>,
    <>Sientes que <span className="font-bold text-[#FB6F92]">perdiste</span> tu visión — los sueños que tenías ya no se sienten posibles.</>,
    <>Quieres un <span className="font-bold text-[#FB6F92]">cambio real</span>, pero no sabes por dónde empezar sin agotarte en el intento.</>,
]

export default function Identificacion() {
    const { ref, isActive } = useSnapSection('identificacion')

    return (
        <section
            id="metodo"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full flex flex-col items-center justify-center text-center px-5 md:px-6 pt-20 pb-16"
        >
            <motion.div
                className="w-full max-w-4xl flex flex-col items-center"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.p variants={fadeUp} className="font-cormorant text-[#3F4321] uppercase tracking-[0.2em] font-medium text-xs md:text-sm">
                    ¿Te identificas con esto?
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-bold font-playfair text-[#1a1a1a] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] text-xl md:text-[2rem]">
                    Cuando la vida te rompe,{' '}
                </motion.h2>

                <motion.span variants={fadeUp} className="font-amoresa text-[#FB6F92] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] text-2xl md:text-[3.5rem]">
                    quedarse en el piso no es opción
                </motion.span>

                <motion.p variants={fadeUp} className="font-cormorant text-neutral-700 max-w-4xl mt-4 text-[0.95rem] md:text-[1.25rem]">
                    Pasaste por algo que te sacudió, una ruptura, una pérdida, una decepción, una temporada oscura que duró demasiado. Y aunque sigues de pie, por dentro sientes que llevas tiempo sobreviviendo, no viviendo.
                </motion.p>

                <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full pt-5 [grid-auto-rows:1fr]">
                    {cards.map((text, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariant}
                            whileHover={{ y: -4, boxShadow: '0 10px 28px rgba(251,111,146,0.25)' }}
                            className="bg-[#FADADD] rounded-2xl text-center font-cormorant text-[#573922] border border-[#FADADD]/60 flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-shadow duration-300 p-4 md:p-6"
                        >
                            <p className="leading-snug text-[0.85rem] md:text-[1.1rem]">{text}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p variants={fadeUp} className="max-w-xl font-cormorant text-neutral-800 italic mt-8 text-[0.95rem] md:text-[1.2rem]">
                    Si dijiste que sí a cualquiera de estas <span className="font-bold">no estás sola.</span> Y tiene solución.{' '}
                    <span>Lo que necesitas no es más fuerza de voluntad.</span>{' '}
                    <span className="font-amoresa text-[#FB6F92] not-italic ml-1 text-xl md:text-[1.8rem]">Necesitas un método.</span>
                </motion.p>
            </motion.div>
        </section>
    )
}
