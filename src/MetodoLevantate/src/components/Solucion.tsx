import { motion } from "framer-motion"
import solucionImg from "../assets/Howto.png"
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp, fadeRight } from "../lib/animations"

export default function Solucion() {
    const { ref, isActive } = useSnapSection('solucion')

    return (
        <section
            id="resultados"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full min-h-screen flex flex-col items-center justify-center text-center px-5 md:px-6 py-20"
        >
            <motion.div
                className="max-w-4xl flex flex-col items-center gap-6 w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.p variants={fadeUp} className="font-cormorant text-[#3F4321] uppercase tracking-[0.2em] font-medium text-xs md:text-sm">
                    La Solución
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-bold font-playfair max-w-2xl text-[#1a1a1a] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] text-2xl md:text-[2.5rem]">
                    Un sistema completo para{' '}
                    <span className="font-amoresa font-light text-[#FB6F92] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">reconstruirte</span>{' '}
                    desde adentro
                </motion.h2>

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 w-full pt-4">
                    <motion.div className="flex flex-col gap-5 text-left flex-1 w-full" variants={staggerContainer}>
                        {[
                            <>El <span className="text-[#FB6F92] font-bold">Método Levántate</span> es una metodología de transformación integral creada específicamente para la mujer que pasó por algo difícil y está lista, aunque sea con miedo, para elegirse a sí misma otra vez.</>,
                            <>No es motivación vacía. No son frases bonitas.{' '}<span className="text-[#FB6F92] font-bold">Es un sistema probado</span> que trabaja los cuatro pilares de tu vida al mismo tiempo: tu cuerpo, tu mente, tus hábitos y tu propósito.</>,
                            <>Porque levantarse de verdad no se trata de un día de inspiración — se trata de{' '}<span className="text-[#FB6F92] font-bold">construir una nueva versión de ti</span>, paso a paso, con herramientas reales.</>,
                        ].map((text, i) => (
                            <motion.p key={i} variants={fadeUp} className="font-cormorant text-neutral-700 leading-relaxed text-[0.95rem] md:text-[1.05rem]">
                                {text}
                            </motion.p>
                        ))}
                    </motion.div>

                    <motion.img
                        variants={fadeRight}
                        src={solucionImg}
                        alt="La Solución"
                        className="w-full max-w-xs md:max-w-none md:w-1/2 object-contain rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                    />
                </div>
            </motion.div>
        </section>
    )
}
