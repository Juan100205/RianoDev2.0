import { motion } from "framer-motion"
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp } from "../lib/animations"

const items = [
    { name: "eBook — Método Levántate", value: "$25" },
    { name: "Tracker de Hábitos",        value: "$7"  },
    { name: "Weekly Meal Planner",       value: "$7"  },
    { name: "Organizador Diario",        value: "$7"  },
    { name: "Mi Mejor Versión + Metas",  value: "$9"  },
]

export default function Oferta() {
    const { ref, isActive } = useSnapSection('oferta')

    return (
        <section
            id="oferta"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full flex flex-col items-center justify-center text-center px-6 py-16"
        >
            <motion.div
                className="max-w-5xl flex flex-col items-center w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.p variants={fadeUp} className="font-cormorant text-[#3F4321] uppercase tracking-[0.2em] font-medium text-xs md:text-sm">
                    Tu inversión de hoy
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-bold font-playfair max-w-2xl text-[#1a1a1a] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] mb-3 text-2xl md:text-[3rem]">
                    Todo lo que necesitas para{' '}
                    <span className="font-amoresa font-light text-[#FB6F92] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">empezar hoy mismo</span>
                </motion.h2>

                <motion.div variants={fadeUp} className="bg-[#FADADD] rounded-[2rem] px-2 py-3 shadow-xl flex flex-col w-full max-w-2xl">
                    <div className="flex flex-col gap-1 mb-6">
                        {items.map((item, i) => (
                            <div key={i} className={`flex justify-between items-center px-6 py-3 rounded-xl ${i % 2 === 0 ? 'bg-white shadow-sm' : ''}`}>
                                <span className="font-cormorant text-lg text-neutral-800">{item.name}</span>
                                <span className="font-cormorant text-base text-neutral-400 line-through decoration-1">{item.value} valor</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <p className="font-cormorant text-xl text-neutral-800 mb-2">
                            Valor total: <span className="line-through opacity-70">$55</span> Tú pagas hoy
                        </p>
                        <div className="font-playfair text-[#1a1a1a] flex items-start justify-center mb-2">
                            <span className="text-3xl mt-2 font-medium">$</span>
                            <span className="text-[3rem] font-bold leading-none tracking-tighter">12</span>
                            <span className="text-3xl mt-auto mb-2 font-medium">.99</span>
                        </div>
                        <p className="font-cormorant text-[1.15rem] text-neutral-800 mb-6">
                            Ahorras más de $40 <span className="opacity-75">Solo por tiempo limitado</span>
                        </p>
                        <motion.a
                            href="https://building-empiress.systeme.io/checkout-levantate"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03, y: -2, boxShadow: '0 14px 32px -4px rgba(251,111,146,0.5)' }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-[#FB6F92] hover:bg-[#e65a7c] text-white font-bold tracking-widest py-3 px-12 rounded-full shadow-[0_8px_20px_-6px_rgba(251,111,146,0.6)] transition-colors duration-200 mb-4 text-lg cursor-pointer"
                        >
                            QUIERO LEVANTARME
                        </motion.a>
                        <div className="flex justify-center gap-6 md:gap-14 w-full text-neutral-500 font-cormorant text-sm pt-2">
                            <span>Pago seguro</span><span>Acceso inmediato</span><span>Todas las tarjetas</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
