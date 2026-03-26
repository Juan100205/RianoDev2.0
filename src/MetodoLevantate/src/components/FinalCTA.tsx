import { motion } from "framer-motion"
import flowerImg from '../assets/Tablero de Marca (8).png'
import crossImg from '../assets/Tablero de Marca (5).png'
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp } from "../lib/animations"

export default function FinalCTA() {
    const { ref, isActive } = useSnapSection('final-cta')

    return (
        <section
            id="final-cta"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full relative flex flex-col items-center justify-center text-center px-6 py-16 md:py-32"
            style={{ overflow: 'clip' }}
        >
            {/* Degradado invertido: blanco afuera, beige al centro */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, #FBF4EB 0%, #FFFFFF 70%)' }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
            <img src={flowerImg} alt="" className="absolute top-10 left-4 md:left-20 w-28 md:w-72 opacity-60 rotate-12 pointer-events-none select-none" />
            <img src={crossImg}  alt="" className="absolute top-20 right-4 md:right-32 w-20 md:w-56 opacity-60 -rotate-12 pointer-events-none select-none" />
            <img src={crossImg}  alt="" className="absolute bottom-20 left-4 md:left-24 w-20 md:w-56 opacity-60 rotate-6 pointer-events-none select-none" />
            <img src={flowerImg} alt="" className="absolute bottom-10 right-4 md:right-20 w-28 md:w-72 opacity-60 -rotate-6 pointer-events-none select-none" />

            <motion.div
                className="max-w-2xl flex flex-col items-center z-10"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.2rem, 8vw, 7rem)' }} className="font-bold font-playfair text-[#1a1a1a] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] mb-8">
                    Levántate
                </motion.h1>

                <motion.p variants={fadeUp} className="font-cormorant text-[1.4rem] md:text-[1.6rem] text-neutral-800 leading-relaxed mb-12 max-w-xl">
                    Por menos de lo que cuesta un café, tienes en tus manos un sistema completo para volverte a elegir. La versión de ti que sueña, que tiene energía, que se levanta con propósito — ya existe. Solo necesita este primer paso.
                </motion.p>

                <motion.a
                    variants={fadeUp}
                    href="https://building-empiress.systeme.io/checkout-levantate"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -3, boxShadow: '0 16px 36px -4px rgba(251,111,146,0.55)' }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#FB6F92] hover:bg-[#e65a7c] text-white font-bold tracking-widest py-4 px-12 md:py-5 md:px-14 rounded-full shadow-[0_8px_20px_-6px_rgba(251,111,146,0.6)] transition-colors duration-200 text-lg md:text-xl cursor-pointer"
                >
                    QUIERO LEVANTARME
                </motion.a>
            </motion.div>
        </section>
    )
}
