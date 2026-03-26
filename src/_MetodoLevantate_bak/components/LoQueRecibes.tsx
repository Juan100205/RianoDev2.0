import { motion } from "framer-motion"
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp, cardVariant } from "../lib/animations"

const plantillas = [
    { title: "Tracker de Hábitos,",  normal: " construye rachas y ",       bold: "celebra avances" },
    { title: "Organizador Diario,",  normal: " arranca cada día ",         bold: "con propósito" },
    { title: "Mi Mejor Versión,",    normal: " visualiza y afirma quién ", bold: "eres" },
    { title: "Mis Metas,",           normal: " define y ",                  bold: "traza tu camino",  normal2: " hacia ellas" },
    { title: "Weekly Meal Planner,", normal: " ",                           bold: "nutre tu cuerpo",  normal2: " con intención" },
]

export default function LoQueRecibes() {
    const { ref, isActive } = useSnapSection('lo-que-recibes')

    return (
        <section
            id="lo-que-recibes"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full flex flex-col items-center justify-center text-center px-6 py-12 md:py-20"
        >
            <motion.div
                className="max-w-5xl flex flex-col items-center w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.p variants={fadeUp} className="font-cormorant text-[#3F4321] uppercase tracking-[0.2em] font-medium text-xs md:text-sm">
                    Lo que recibes hoy
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-bold font-playfair max-w-2xl text-[#1a1a1a] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] mt-2 text-2xl md:text-[3rem]">
                    Todo lo que necesitas para{' '}
                    <span className="font-amoresa font-light text-[#FB6F92] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">levantarte de verdad</span>
                </motion.h2>

                <div className="flex flex-col md:flex-row items-stretch gap-6 w-full pt-8 md:pt-16">
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(251,111,146,0.2)' }}
                        className="flex-1 flex flex-col items-center justify-start bg-[#FADADD] rounded-[2rem] p-6 md:p-10 shadow-md transition-shadow duration-300"
                    >
                        <h3 className="font-playfair text-2xl font-bold text-[#1a1a1a] mb-1">eBook Método Levántate</h3>
                        <p className="font-cormorant text-lg text-neutral-800 mb-6">Tu guía de transformación completa</p>
                        <div className="text-left flex flex-col gap-4 font-cormorant text-neutral-800 leading-relaxed text-[1.1rem]">
                            <p>La <span className="text-[#FB6F92] font-bold">base de todo el método</span>. Aquí está el conocimiento, la filosofía y el sistema detrás de cada paso de tu transformación.</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-[#FB6F92]">
                                <li>Los 4 pilares de la <span className="text-[#FB6F92] font-bold">transformación</span> integral explicados a fondo</li>
                                <li>Estrategias concretas para <span className="text-[#FB6F92] font-bold">salir del ciclo</span> de inercia</li>
                                <li>Cómo <span className="text-[#FB6F92] font-bold">reconstruir tu identidad</span> y visión de vida</li>
                                <li>El sistema para <span className="text-[#FB6F92] font-bold">crear hábitos</span> que realmente duran</li>
                                <li>Herramientas para <span className="text-[#FB6F92] font-bold">sanar y avanzar</span> al mismo tiempo</li>
                            </ul>
                        </div>
                    </motion.div>

                    <div className="flex-1 flex flex-col">
                        <motion.h3 variants={fadeUp} className="font-playfair text-2xl font-bold text-[#1a1a1a] mb-8 text-center">
                            5 Plantillas en acción
                        </motion.h3>
                        <motion.div variants={staggerContainer} className="flex flex-col justify-between h-full gap-4">
                            {plantillas.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={cardVariant}
                                    whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(251,111,146,0.2)' }}
                                    className="bg-[#FADADD] rounded-2xl py-4 px-6 shadow-md flex-1 flex items-center justify-center text-center transition-shadow duration-300"
                                >
                                    <p className="font-cormorant text-[1.1rem] leading-snug text-neutral-800">
                                        {item.title}{item.normal}<span className="text-[#FB6F92] font-bold">{item.bold}</span>{item.normal2 && <span>{item.normal2}</span>}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
