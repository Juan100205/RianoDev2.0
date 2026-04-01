import type { DocType } from "../hooks/useClientDocuments";

export const DOC_TEMPLATES: Record<DocType, { title: string; content: string }> = {

  // ─────────────────────────────────────────────────────────────────────────────
  contrato: {
    title: "Contrato de Servicios Digitales",
    content: `> **Documento confidencial** · Versión 1.0 · ${new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })}

---

## PARTES DEL CONTRATO

| | Prestador | Cliente |
|---|---|---|
| **Nombre** | Juan Jose Riaño | __________________ |
| **Empresa** | RianoDev | __________________ |
| **NIT / C.C.** | __________________ | __________________ |
| **Email** | juanjose@rianodev.com | __________________ |
| **Teléfono** | __________________ | __________________ |
| **Ciudad** | Bogotá, Colombia | __________________ |

---

## 1. OBJETO DEL CONTRATO

El Prestador se obliga a prestar al Cliente los siguientes servicios:

- [ ] Diseño y desarrollo de sitio web
- [ ] Automatizaciones con inteligencia artificial
- [ ] Estrategia de marketing digital
- [ ] Integración de herramientas digitales
- [ ] Otro: __________________

**Descripción detallada del alcance:**

__________________

---

## 2. ALCANCE Y ENTREGABLES

| # | Entregable | Descripción | Fecha estimada |
|---|-----------|-------------|----------------|
| 1 | __________________ | __________________ | __________________ |
| 2 | __________________ | __________________ | __________________ |
| 3 | __________________ | __________________ | __________________ |

**No incluye** (fuera de alcance):

- __________________
- __________________

---

## 3. VALOR Y FORMA DE PAGO

| Concepto | Valor (COP) |
|----------|------------|
| Pago inicial — 50% al firmar | $ __________________ |
| Pago final — 50% al entregar | $ __________________ |
| **Valor total del contrato** | **$ __________________** |

**Forma de pago:** Transferencia bancaria / Nequi / Bancolombia
**Cuenta:** __________________ · **Titular:** Juan Jose Riaño

> Los precios son en pesos colombianos (COP) e incluyen / excluyen IVA según aplique.

---

## 4. PLAZOS

| Hito | Fecha |
|------|-------|
| Firma del contrato | __________________ |
| Inicio del proyecto | __________________ |
| Primera entrega (avance) | __________________ |
| Entrega final | __________________ |

**Rondas de revisión incluidas:** ____

---

## 5. OBLIGACIONES DE LAS PARTES

### El Prestador se compromete a:

- Ejecutar el proyecto con estándares de calidad profesional
- Mantener comunicación activa durante el proceso
- Entregar avances en los plazos acordados
- Mantener confidencialidad sobre la información del cliente

### El Cliente se compromete a:

- Entregar los materiales necesarios (logos, textos, accesos) en los plazos definidos
- Responder feedback y revisiones en un máximo de ____ días hábiles
- Realizar los pagos en las fechas acordadas
- No compartir información confidencial del proyecto con terceros

---

## 6. PROPIEDAD INTELECTUAL

El código fuente, diseños y entregables serán **propiedad exclusiva del Cliente** una vez completado el pago total del contrato.

Durante el proceso, el Prestador podrá mencionar al Cliente como referencia en su portafolio, salvo indicación contraria expresa.

---

## 7. MODIFICACIONES AL ALCANCE

Cualquier cambio al alcance original deberá acordarse por escrito entre las partes. Los cambios mayores pueden implicar ajuste en el valor y los plazos.

---

## 8. TERMINACIÓN ANTICIPADA

- **Por el Cliente:** Pago de los servicios ejecutados hasta la fecha más un 20% del valor pendiente.
- **Por el Prestador:** Devolución proporcional del valor no ejecutado.

---

## 9. RESOLUCIÓN DE CONFLICTOS

Las partes acuerdan resolver cualquier conflicto de manera amistosa. En caso de no llegar a un acuerdo, se someterán a las leyes de la República de Colombia.

---

## 10. VIGENCIA

Este contrato entra en vigencia a partir de la fecha de firma y se extiende hasta la entrega final aprobada por el Cliente.

---

## FIRMAS

*Al firmar este documento, ambas partes declaran haber leído, entendido y aceptado todos los términos.*

&nbsp;

| Prestador | Cliente |
|-----------|---------|
| | |
| **Juan Jose Riaño** | **__________________** |
| RianoDev | __________________ |
| C.C. __________________ | C.C. / NIT __________________ |
| Fecha: __________________ | Fecha: __________________ |
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  factura: {
    title: "Factura de Servicios",
    content: `> **FACTURA N°** ___ · Fecha: ${new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })} · Vencimiento: __________________

---

## Datos del emisor

| | |
|---|---|
| **Nombre** | Juan Jose Riaño |
| **Empresa** | RianoDev |
| **NIT / C.C.** | __________________ |
| **Email** | juanjose@rianodev.com |
| **Teléfono** | __________________ |
| **Ciudad** | Bogotá, Colombia |
| **Régimen** | Simplificado / Común |

---

## Datos del cliente

| | |
|---|---|
| **Nombre / Empresa** | __________________ |
| **NIT / C.C.** | __________________ |
| **Dirección** | __________________ |
| **Ciudad** | __________________ |
| **Email** | __________________ |
| **Teléfono** | __________________ |

---

## Detalle de servicios

| # | Descripción del servicio | Cant. | Valor unitario | Total |
|---|--------------------------|:-----:|---------------:|------:|
| 1 | __________________ | 1 | $ __________________ | $ __________________ |
| 2 | __________________ | 1 | $ __________________ | $ __________________ |
| 3 | __________________ | 1 | $ __________________ | $ __________________ |

---

## Resumen de cobro

| Concepto | Valor |
|----------|------:|
| Subtotal | $ __________________ |
| Descuento | $ __________________ |
| IVA (19%) | $ __________________ |
| **Total a pagar** | **$ __________________** |

---

## Información de pago

| | |
|---|---|
| **Banco** | __________________ |
| **Tipo de cuenta** | Ahorros / Corriente |
| **Número de cuenta** | __________________ |
| **Titular** | Juan Jose Riaño |
| **Nequi / Daviplata** | __________________ |

> Transferir exactamente el valor indicado y enviar comprobante a juanjose@rianodev.com

---

## Condiciones

- Pago máximo **__________________ días** después de recibida esta factura
- En caso de mora se aplicará un interés del ____% mensual
- Este documento es válido como soporte de pago

---

*Gracias por confiar en RianoDev.*
*Para consultas sobre esta factura: juanjose@rianodev.com*
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  preguntas: {
    title: "Cuestionario de Onboarding",
    content: `> **Confidencial** · Por favor completa este formulario antes de nuestra primera reunión.
> Fecha de entrega: __________________

---

## Sobre ti y tu negocio

**1. ¿Cuál es el nombre de tu empresa o marca?**

__________________

**2. ¿A qué se dedica tu negocio? Descríbelo en 2–3 oraciones.**

__________________

**3. ¿Cuánto tiempo llevas en el mercado?**

__________________

**4. ¿Cuál es tu propuesta de valor diferencial? ¿Por qué te eligen a ti y no a la competencia?**

__________________

**5. ¿Quién es tu cliente ideal? Descríbelo (edad, profesión, problemas, deseos).**

__________________

---

## Tu presencia digital actual

**6. ¿Tienes sitio web? Si sí, ¿cuál?**

__________________

**7. ¿Qué redes sociales usas actualmente?**

- [ ] Instagram → @__________________
- [ ] LinkedIn → __________________
- [ ] TikTok → @__________________
- [ ] Facebook → __________________
- [ ] YouTube → __________________
- [ ] Otra: __________________

**8. ¿Tienes alguna herramienta de CRM, email marketing o automatización activa?**

__________________

**9. ¿Cuántos leads o clientes nuevos consigues al mes actualmente?**

__________________

**10. ¿Cuál es tu ticket promedio de venta?**

__________________

---

## Objetivos del proyecto

**11. ¿Cuál es el problema principal que quieres resolver con este proyecto?**

__________________

**12. ¿Cómo medirías el éxito en 3 meses? (métricas, ventas, leads, etc.)**

__________________

**13. ¿Cuál es el resultado más importante para ti en los próximos 6 meses?**

__________________

**14. ¿Tienes algún referente, competidor o sitio web que te inspire? ¿Por qué?**

| Referente / URL | ¿Qué te gusta de él? |
|-----------------|----------------------|
| __________________ | __________________ |
| __________________ | __________________ |

---

## Logística y recursos

**15. ¿Tienes un presupuesto definido para este proyecto?**

- [ ] Menos de $2.000.000 COP
- [ ] $2.000.000 – $5.000.000 COP
- [ ] $5.000.000 – $10.000.000 COP
- [ ] Más de $10.000.000 COP
- [ ] Por definir

**16. ¿Hay un plazo de entrega específico que debamos cumplir?**

__________________

**17. ¿Tienes equipo de trabajo (diseñador, redactor, etc.) o trabajas solo?**

__________________

**18. ¿Hay alguien más en tu equipo que deba estar en el proceso de decisión?**

__________________

**19. ¿Qué materiales tienes disponibles ya? (logo, fotos, textos, paleta de colores)**

- [ ] Logo en alta resolución
- [ ] Paleta de colores / Brand guidelines
- [ ] Fotografías propias
- [ ] Textos / Copywriting
- [ ] Dominio web registrado
- [ ] Hosting contratado
- [ ] Ninguno aún

**20. ¿Hay algo más que quieras compartir antes de arrancar?**

__________________

---

*Gracias por tomarte el tiempo de completar esto — nos permite empezar con el pie derecho.*
*Envía este documento a: juanjose@rianodev.com*
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  welcome: {
    title: "Welcome Document",
    content: `> **Bienvenido/a al equipo RianoDev** · Fecha de inicio: __________________

---

## ¡Estamos listos para empezar!

Hola **__________________**,

Es un placer tenerte como cliente. Este documento es tu guía de inicio rápido: todo lo que necesitas saber para que trabajemos juntos de manera fluida, eficiente y sin sorpresas.

Estamos emocionados de construir algo grande contigo.

---

## Tu punto de contacto principal

| | |
|---|---|
| **Nombre** | Juan Jose Riaño |
| **Rol** | Founder & Lead Developer · RianoDev |
| **Email** | juanjose@rianodev.com |
| **WhatsApp** | __________________ |
| **Horario de atención** | Lunes – Viernes · 9:00 am – 6:00 pm (COT) |
| **Respuesta máxima** | 24 horas hábiles |

> Para urgencias fuera de horario, usa WhatsApp con el prefijo **[URGENTE]**.

---

## Cómo trabajamos

### Nuestra metodología

1. **Kickoff** — Reunión inicial para alinear expectativas, plazos y entregables
2. **Sprints de trabajo** — Ciclos de ____ semanas con avances concretos
3. **Revisiones** — Presentamos, tú das feedback, ajustamos
4. **Entrega** — Handoff completo con documentación y capacitación

### Canales de comunicación

| Canal | Uso | Tiempo de respuesta |
|-------|-----|---------------------|
| **Email** | Documentos, contratos, facturas | 24h hábiles |
| **WhatsApp** | Consultas rápidas, avances | 4h hábiles |
| **Reuniones Zoom/Meet** | Reviews, estrategia | Agendadas |
| **Portal** | Documentos, proyectos | Siempre disponible |

### Reuniones

- **Frecuencia:** __________________ (semanal / quincenal)
- **Duración estimada:** __________________
- **Plataforma:** Google Meet / Zoom
- **Link fijo:** __________________

---

## Lo que necesitamos de ti (checklist de inicio)

Por favor ten listo lo siguiente antes del kickoff:

- [ ] Logo en alta resolución (PNG con fondo transparente, SVG)
- [ ] Paleta de colores y tipografías (si tienes brand guidelines)
- [ ] Fotografías propias o banco de imágenes preferido
- [ ] Textos e información del negocio
- [ ] Accesos a plataformas (hosting, dominio, redes, CRM)
- [ ] Disponibilidad para ____ reuniones por mes

---

## Tu portal de cliente

Tienes acceso a **rianodev.com/portal** donde puedes:

| Sección | Qué encontrarás |
|---------|----------------|
| **Documentos** | Contrato, facturas, estrategia y más |
| **Proyectos** | Links a tus páginas web en desarrollo |
| **Automatizaciones** | Tus flujos de IA activos |

Credenciales de acceso: usa el email con el que te registraste.

---

## Próximos pasos

| # | Acción | Responsable | Fecha límite |
|---|--------|-------------|--------------|
| 1 | Firma del contrato | Cliente | __________________ |
| 2 | Pago inicial (50%) | Cliente | __________________ |
| 3 | Envío de materiales | Cliente | __________________ |
| 4 | Reunión de kickoff | Ambos | __________________ |
| 5 | Inicio del desarrollo | RianoDev | __________________ |

---

## Preguntas frecuentes

**¿Qué pasa si quiero cambiar algo del alcance?**
Conversamos, definimos el impacto en tiempo y costo, y lo formalizamos por escrito.

**¿Cuántas revisiones están incluidas?**
____ rondas de revisión. Cambios adicionales se cotizan por separado.

**¿Quién tiene el código al final?**
Tú. Una vez completado el pago, todos los entregables son 100% tuyos.

**¿Qué tecnologías usas?**
React, TypeScript, Tailwind, Supabase, n8n, y las que mejor se adapten a tu caso.

---

*Si tienes cualquier duda antes de empezar, escríbeme sin pensarlo.*

**¡Construyamos algo que marque la diferencia!**

— **Juan Jose Riaño**
Founder · RianoDev · rianodev.com
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  estrategia: {
    title: "Setup de Estrategia Digital",
    content: `> **Documento estratégico confidencial** · Cliente: __________________ · Fecha: ${new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })}

---

## 1. DIAGNÓSTICO INICIAL

### Situación actual del negocio

| Aspecto | Estado actual | Oportunidad |
|---------|--------------|-------------|
| Sitio web | __________________ | __________________ |
| Redes sociales | __________________ | __________________ |
| Email marketing | __________________ | __________________ |
| CRM / Ventas | __________________ | __________________ |
| Automatizaciones | __________________ | __________________ |

### Métricas de partida (baseline)

| Métrica | Valor actual | Meta a 3 meses | Meta a 6 meses |
|---------|:-----------:|:--------------:|:--------------:|
| Visitas web / mes | ___ | ___ | ___ |
| Tasa de conversión | ___% | ___% | ___% |
| Leads / mes | ___ | ___ | ___ |
| Ventas / mes | ___ | ___ | ___ |
| Ticket promedio | $ ___ | $ ___ | $ ___ |

---

## 2. OBJETIVOS ESTRATÉGICOS

### OKR (Objetivos y Resultados Clave)

**Objetivo 1:** __________________
- KR 1.1: __________________
- KR 1.2: __________________

**Objetivo 2:** __________________
- KR 2.1: __________________
- KR 2.2: __________________

**Objetivo 3:** __________________
- KR 3.1: __________________
- KR 3.2: __________________

---

## 3. AUDIENCIA Y POSICIONAMIENTO

### Buyer Persona Principal

| | |
|---|---|
| **Nombre ficticio** | __________________ |
| **Edad** | __________________ |
| **Ocupación** | __________________ |
| **Problema principal** | __________________ |
| **Deseo / Aspiración** | __________________ |
| **Canales donde está** | __________________ |
| **Objeción principal** | __________________ |

### Propuesta de valor diferencial

> __________________

---

## 4. STACK TECNOLÓGICO

### Herramientas propuestas

| Categoría | Herramienta | Función | Prioridad |
|-----------|-------------|---------|:---------:|
| Web | __________________ | __________________ | Alta |
| CRM | __________________ | __________________ | Alta |
| Email | __________________ | __________________ | Media |
| Automatización | n8n | Flujos IA | Alta |
| Analytics | __________________ | __________________ | Media |
| Pagos | __________________ | __________________ | Alta |

---

## 5. FLUJOS DE AUTOMATIZACIÓN

### Flujo principal

\`\`\`
[Punto de entrada]
    → Lead llega por __________________ (Instagram / Web / Referido)
    ↓
[Captura]
    → Formulario / DM / Landing page
    ↓
[Automatización n8n]
    → Notificación inmediata por WhatsApp / Email
    → Registro en CRM
    → Email de bienvenida automático
    ↓
[Seguimiento]
    → Secuencia de emails / WhatsApp → ____ días
    ↓
[Conversión]
    → Agendamiento de llamada / Compra directa
\`\`\`

**Descripción del flujo:**

__________________

### Flujos adicionales

| Flujo | Disparador | Acción | Estado |
|-------|-----------|--------|:------:|
| __________________ | __________________ | __________________ | ⬜ |
| __________________ | __________________ | __________________ | ⬜ |
| __________________ | __________________ | __________________ | ⬜ |

---

## 6. PLAN DE CONTENIDOS

### Canales activos

| Canal | Frecuencia | Tipo de contenido | Responsable |
|-------|:----------:|-------------------|:-----------:|
| Instagram | ___ / semana | __________________ | __________________ |
| LinkedIn | ___ / semana | __________________ | __________________ |
| Email | ___ / mes | __________________ | __________________ |
| Blog / SEO | ___ / mes | __________________ | __________________ |

---

## 7. ROADMAP DE IMPLEMENTACIÓN

### Mes 1 — Fundamentos

- [ ] __________________
- [ ] __________________
- [ ] __________________
- [ ] __________________

### Mes 2 — Implementación

- [ ] __________________
- [ ] __________________
- [ ] __________________
- [ ] __________________

### Mes 3 — Optimización

- [ ] __________________
- [ ] __________________
- [ ] __________________
- [ ] __________________

---

## 8. SEGUIMIENTO Y REPORTES

| Reporte | Frecuencia | Canal | Responsable |
|---------|:----------:|-------|:-----------:|
| Métricas de tráfico | Semanal | WhatsApp | RianoDev |
| Reporte mensual completo | Mensual | Email / Portal | RianoDev |
| Review de estrategia | Trimestral | Reunión | Ambos |

---

## 9. INVERSIÓN Y ROI ESPERADO

| | Mes 1 | Mes 3 | Mes 6 |
|---|:---:|:---:|:---:|
| Inversión RianoDev | $ ___ | $ ___ | $ ___ |
| Inversión en pauta | $ ___ | $ ___ | $ ___ |
| Ingresos proyectados | $ ___ | $ ___ | $ ___ |
| ROI estimado | ___% | ___% | ___% |

---

## 10. NOTAS Y ACUERDOS ADICIONALES

__________________

---

*Documento preparado por Juan Jose Riaño — RianoDev*
*Este documento es confidencial y exclusivo para el cliente indicado.*
`,
  },
};
