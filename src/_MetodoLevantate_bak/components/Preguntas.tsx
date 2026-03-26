import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { useSnapSection } from "../hooks/useSnapSection"
import { staggerContainer, fadeUp } from "../lib/animations"

const faqs = [
    { question: "¿Cómo recibo el producto después de comprar?", answer: <>Inmediatamente después de confirmar tu pago <span className="text-[#FB6F92] font-bold">recibirás acceso</span> a todos los archivos del kit, el eBook y las 5 plantillas. <span className="text-[#FB6F92] font-bold">Es todo digital</span>, nada físico que esperar.</> },
    { question: "¿Necesito experiencia previa o conocimientos especiales?", answer: "No, el método está diseñado para llevarte paso a paso desde cero. Todas las herramientas y plantillas son intuitivas y fáciles de aplicar en tu día a día." },
    { question: "¿En cuánto tiempo voy a ver resultados?", answer: "Los cambios internos comienzan desde el primer día que aplicas el método. Los resultados tangibles dependen de tu constancia, pero muchas mujeres ven una diferencia enorme en sus primeras semanas." },
    { question: "¿Funciona si ya lo he intentado todo y no he podido?", answer: "Sí. Este método es diferente porque no se basa solo en motivación temporal, sino en construir sistemas reales y sostenibles que cambian de raíz tu manera de actuar." },
    { question: "¿Puedo imprimir las plantillas?", answer: "¡Por supuesto! Todas las plantillas vienen diseñadas en alta calidad, listas para que las imprimas y las uses físicamente si prefieres escribir a mano." },
]

export default function Preguntas() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const { ref, isActive } = useSnapSection('preguntas')

    return (
        <section
            id="preguntas"
            ref={ref as React.RefObject<HTMLElement>}
            className="w-full flex flex-col items-center justify-center text-center px-6 py-12 md:py-20"
        >
            <motion.div
                className="max-w-4xl flex flex-col items-center w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
            >
                <motion.p variants={fadeUp} className="font-cormorant text-[#3F4321] uppercase tracking-[0.2em] font-medium mb-2 text-xs md:text-sm">
                    Tus preguntas
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-bold font-playfair max-w-2xl text-[#1a1a1a] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] mb-8 md:mb-12 text-2xl md:text-[3rem]">
                    Lo que necesitas{' '}
                    <span className="font-amoresa font-light text-[#FB6F92] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">saber antes de comprar</span>
                </motion.h2>

                <motion.div variants={staggerContainer} className="w-full flex flex-col gap-4">
                    {faqs.map((faq, i) => (
                        <motion.div key={i} variants={fadeUp} className="bg-[#FADADD] rounded-2xl shadow-sm overflow-hidden text-left">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center px-5 py-4 md:px-8 md:py-6 cursor-pointer focus:outline-none group"
                            >
                                <span className="font-cormorant text-[1.2rem] text-neutral-800 group-hover:text-[#1a1a1a] transition-colors">
                                    {faq.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    className="text-[#FB6F92] text-xs ml-4 flex-shrink-0"
                                >
                                    ▼
                                </motion.span>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div className="px-5 pb-4 md:px-8 md:pb-6">
                                            <div className="border-t border-pink-300/60 mb-5" />
                                            <p className="font-cormorant text-[1.15rem] leading-relaxed text-neutral-800">{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}
