import { motion } from "framer-motion"
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp } from "../lib/animations"

export default function Hero() {
    const { ref, isActive } = useSnapSection('hero')

    return (
        <section
            id="inicio"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full min-h-screen flex flex-col items-center justify-center text-center px-5 md:px-6 relative"
        >
            {/* Degradado invertido: blanco afuera, beige al centro */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, #FBF4EB 0%, #FFFFFF 70%)' }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.div
                className="w-full max-w-5xl flex flex-col items-center gap-5 md:gap-6 pt-32 md:pt-40 relative z-10"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.h1
                    variants={fadeUp}
                    className="w-full md:w-7/10 font-bold font-playfair text-4xl md:text-7xl text-[#372212] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                >
                    Después de esta temporada <span className="text-[#FB6F92]">difícil</span>,<br />
                    todavía puedes
                </motion.h1>

                <motion.h2
                    variants={fadeUp}
                    className="font-amoresa text-4xl md:text-8xl text-[#FB6F92] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                >
                    levantarte con Dios
                </motion.h2>

                <motion.p
                    variants={fadeUp}
                    className="font-cormorant text-lg md:text-2xl text-[#1a1a1a] max-w-xl"
                >
                    No tienes que fingir que estás bien para empezar. El Método LEVÁNTATE te acompaña desde donde estás, hasta donde Él quiere llevarte.
                </motion.p>

                <motion.a
                    variants={fadeUp}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://building-empiress.systeme.io/checkout-levantate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-8 py-3 md:py-2 bg-[#FB6F92] text-white font-cormorant font-bold text-lg md:text-xl rounded-full cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(251,111,146,0.45)] transition-shadow duration-300"
                >
                    QUIERO LEVANTARME
                </motion.a>
            </motion.div>
        </section>
    )
}
