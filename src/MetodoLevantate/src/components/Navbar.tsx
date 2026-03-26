import { useEffect, useState } from "react"
import Logo from "../assets/Logo1.png"
import isotipo from "../assets/isotipo.png"

const links = [
    { label: "Inicio",       id: "inicio" },
    { label: "Método",       id: "metodo" },
    { label: "Resultados",   id: "resultados" },
    { label: "Testimonios",  id: "testimonios" },
    { label: "Oferta",       id: "oferta" },
    { label: "Preguntas",    id: "preguntas" },
]

const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const btnClass = "font-cormorant text-[#1a1a1a] hover:text-[#FB6F92] transition-colors duration-200 cursor-pointer"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <>
        <nav
            className="fixed top-0 left-0 w-full z-50 bg-[#FADADD] overflow-hidden"
            style={{ height: scrolled ? "56px" : "110px", transition: 'height 500ms cubic-bezier(0.4,0,0.2,1)' }}
        >
            {/* Layout TOP */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4"
                style={{
                    opacity: scrolled ? 0 : 1,
                    transform: scrolled ? 'translateY(-12px)' : 'translateY(0)',
                    transition: 'opacity 350ms cubic-bezier(0.4,0,0.2,1), transform 350ms cubic-bezier(0.4,0,0.2,1)',
                    pointerEvents: scrolled ? 'none' : 'auto',
                }}
            >
                <img src={Logo} alt="Levántate" className="h-14 md:h-20 object-contain" />
                {/* Links — ocultos en móvil muy pequeño */}
                <div className="hidden sm:flex items-center gap-4 md:gap-6">
                    {links.map(({ label, id }) => (
                        <button key={id} onClick={() => scrollTo(id)} className={`${btnClass} text-base md:text-xl`}>{label}</button>
                    ))}
                </div>
            </div>

            {/* Layout SCROLLED */}
            <div
                className="absolute inset-0 flex items-center justify-center gap-3 md:gap-6 px-4 md:px-8"
                style={{
                    opacity: scrolled ? 1 : 0,
                    transform: scrolled ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 350ms cubic-bezier(0.4,0,0.2,1), transform 350ms cubic-bezier(0.4,0,0.2,1)',
                    pointerEvents: scrolled ? 'auto' : 'none',
                }}
            >
                {/* En móvil solo isotipo; en desktop los links */}
                <div className="hidden sm:flex items-center gap-3 md:gap-6">
                    {links.slice(0, 3).map(({ label, id }) => (
                        <button key={id} onClick={() => scrollTo(id)} className={`${btnClass} text-sm md:text-xl`}>{label}</button>
                    ))}
                </div>
                <img src={isotipo} alt="Levántate" className="h-8 md:h-10 object-contain" />
                <div className="hidden sm:flex items-center gap-3 md:gap-6">
                    {links.slice(3).map(({ label, id }) => (
                        <button key={id} onClick={() => scrollTo(id)} className={`${btnClass} text-sm md:text-xl`}>{label}</button>
                    ))}
                </div>
            </div>
        </nav>

        {/* Degradado difuminado bajo el navbar — solo en top */}
        <div
            className="fixed left-0 w-full h-14 pointer-events-none z-40"
            style={{
                top: scrolled ? "56px" : "110px",
                opacity: scrolled ? 0 : 1,
                background: 'linear-gradient(to bottom, #FADADD, transparent)',
                transition: 'top 500ms cubic-bezier(0.4,0,0.2,1), opacity 350ms cubic-bezier(0.4,0,0.2,1)',
            }}
        />
        </>
    )
}
