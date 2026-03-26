import type { Variants } from "framer-motion"

const ease = [0.4, 0, 0.2, 1] as const

// Reset instantáneo al salir → anima limpio al volver
export const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 18,  transition: { duration: 0 } },
    visible: { opacity: 1, y: 0,   transition: { duration: 0.35, ease } },
}

export const fadeIn: Variants = {
    hidden:  { opacity: 0,         transition: { duration: 0 } },
    visible: { opacity: 1,         transition: { duration: 0.35, ease } },
}

export const fadeRight: Variants = {
    hidden:  { opacity: 0, x: 24,  transition: { duration: 0 } },
    visible: { opacity: 1, x: 0,   transition: { duration: 0.38, ease } },
}

export const staggerContainer: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

export const cardVariant: Variants = {
    hidden:  { opacity: 0, y: 14,  transition: { duration: 0 } },
    visible: { opacity: 1, y: 0,   transition: { duration: 0.28, ease } },
}
