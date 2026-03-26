import { useEffect, useRef, useState } from 'react'

/**
 * Detecta si una sección cubre ≥40% del viewport (no del elemento).
 * Esto funciona correctamente incluso para secciones más altas que la pantalla.
 * Incluye histeresis: se activa rápido, se desactiva con 300ms de delay.
 * También registra analytics la primera vez que se ve.
 */
export function useSnapSection(sectionName: string) {
    const ref = useRef<HTMLElement>(null)
    const [isActive, setIsActive] = useState(false)
    const deactivateTimer = useRef<ReturnType<typeof setTimeout>>()
    const tracked = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const obs = new IntersectionObserver(
            ([entry]) => {
                const viewportH = window.innerHeight || 1
                const coverage = entry.intersectionRect.height / viewportH

                if (coverage >= 0.4) {
                    clearTimeout(deactivateTimer.current)
                    setIsActive(true)

                    if (!tracked.current) {
                        tracked.current = true
                        const key = 'levantate_sections_viewed'
                        const viewed: string[] = JSON.parse(sessionStorage.getItem(key) ?? '[]')
                        if (!viewed.includes(sectionName)) {
                            viewed.push(sectionName)
                            sessionStorage.setItem(key, JSON.stringify(viewed))
                            window.dispatchEvent(new CustomEvent('section_view', {
                                detail: { section: sectionName, timestamp: Date.now() }
                            }))
                            const w = window as Window & { gtag?: (...args: unknown[]) => void }
                            w.gtag?.('event', 'section_view', { section_name: sectionName })
                        }
                    }
                } else if (entry.intersectionRatio === 0) {
                    // Solo resetear cuando la sección está 100% fuera del viewport
                    clearTimeout(deactivateTimer.current)
                    setIsActive(false)
                }
            },
            { threshold: [0, ...Array.from({ length: 20 }, (_, i) => (i + 1) / 20)] }
        )

        obs.observe(el)
        return () => {
            obs.disconnect()
            clearTimeout(deactivateTimer.current)
        }
    }, [sectionName])

    return { ref, isActive }
}
