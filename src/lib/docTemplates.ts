import type { DocType } from "../hooks/useClientDocuments";

export const DOC_TEMPLATES: Record<DocType, { title: string; content: string }> = {
  contrato: {
    title: "Contrato de Servicios",
    content: `# CONTRATO DE SERVICIOS DIGITALES

**Cliente:** ___________________
**Fecha de inicio:** ___________________
**Vigencia:** ___________________

---

## 1. PARTES

**Prestador:** Juan Jose Riaño — RianoDev
**Cliente:** ___________________

---

## 2. OBJETO DEL CONTRATO

El Prestador se compromete a prestar los siguientes servicios:

- [ ] Desarrollo web
- [ ] Automatizaciones con IA
- [ ] Estrategia digital
- [ ] Otro: ___________________

---

## 3. ALCANCE

Descripción detallada del proyecto:

___________________

---

## 4. VALOR Y FORMA DE PAGO

| Concepto | Valor |
|----------|-------|
| Pago inicial (50%) | $ ___________________ |
| Pago final (50%) | $ ___________________ |
| **Total** | **$ ___________________** |

Forma de pago: ___________________

---

## 5. PLAZOS

- **Inicio:** ___________________
- **Entrega estimada:** ___________________

---

## 6. PROPIEDAD INTELECTUAL

El código y los entregables serán propiedad del cliente una vez completado el pago total.

---

## 7. FIRMAS

**Prestador:** ___________________ Fecha: ___________________

**Cliente:** ___________________ Fecha: ___________________
`,
  },

  factura: {
    title: "Factura",
    content: `# FACTURA N° ___

**Fecha:** ___________________
**Vencimiento:** ___________________

---

## Datos del cliente

**Nombre / Empresa:** ___________________
**NIT / Cédula:** ___________________
**Dirección:** ___________________
**Email:** ___________________

---

## Detalle de servicios

| # | Descripción | Cant. | Valor unitario | Total |
|---|-------------|-------|----------------|-------|
| 1 | ___________________ | 1 | $ ___ | $ ___ |
| 2 | ___________________ | 1 | $ ___ | $ ___ |

---

## Resumen

| | |
|---|---|
| Subtotal | $ ___________________ |
| IVA (19%) | $ ___________________ |
| **Total a pagar** | **$ ___________________** |

---

## Datos de pago

**Banco:** ___________________
**Tipo de cuenta:** ___________________
**N° de cuenta:** ___________________
**Titular:** Juan Jose Riaño

---

*Gracias por confiar en RianoDev.*
`,
  },

  preguntas: {
    title: "Cuestionario Inicial",
    content: `# CUESTIONARIO INICIAL — ONBOARDING

**Cliente:** ___________________
**Fecha:** ___________________

---

## 1. Tu negocio

**¿Cuál es el nombre de tu empresa o marca?**

___________________

**¿A qué se dedica tu negocio?**

___________________

**¿Cuál es tu propuesta de valor principal?**

___________________

**¿Quién es tu cliente ideal (buyer persona)?**

___________________

---

## 2. Presencia digital actual

**¿Tienes sitio web? ¿Cuál?**

___________________

**¿Qué redes sociales usas actualmente?**

- [ ] Instagram
- [ ] LinkedIn
- [ ] TikTok
- [ ] Facebook
- [ ] Otra: ___________________

**¿Tienes alguna automatización o flujo de ventas digital?**

___________________

---

## 3. Objetivos del proyecto

**¿Qué problema quieres resolver con este proyecto?**

___________________

**¿Cómo medirías el éxito en 3 meses?**

___________________

**¿Tienes algún referente o sitio web que te inspire?**

___________________

---

## 4. Logística

**¿Cuál es tu presupuesto aproximado?**

___________________

**¿Tienes un plazo de entrega específico?**

___________________

**¿Hay alguien más en tu equipo que deba estar en el loop?**

___________________

---

*Gracias por completar este formulario. Nos comunicaremos pronto.*
`,
  },

  welcome: {
    title: "Welcome Document",
    content: `# ¡Bienvenido/a a RianoDev! 🎉

**Cliente:** ___________________
**Fecha de inicio:** ___________________

---

## Estamos listos para comenzar

Gracias por confiar en nosotros. Este documento resume todo lo que necesitas saber para arrancar nuestro trabajo juntos.

---

## Tu punto de contacto

**Juan Jose Riaño**
📧 juanjose@rianodev.com
📱 +57 ___________________ (WhatsApp)
🌐 rianodev.com

**Horario de atención:** Lunes a Viernes, 9am – 6pm (COT)

---

## ¿Cómo trabajamos?

1. **Kickoff** — Reunión inicial para alinear expectativas y plazos
2. **Iteraciones** — Entregas parciales para feedback continuo
3. **Revisiones** — Hasta ___ rondas de cambios incluidas
4. **Entrega final** — Handoff completo con documentación

---

## Lo que necesitamos de ti

- [ ] Accesos a plataformas relevantes (hosting, redes, etc.)
- [ ] Logo y brand assets (colores, tipografías)
- [ ] Textos e imágenes para el proyecto
- [ ] Disponibilidad para reuniones semanales

---

## Tu portal de cliente

Tienes acceso a tu portal en **rianodev.com/portal** donde podrás:
- Ver el avance de tu proyecto
- Revisar documentos (como este)
- Acceder a tus automatizaciones

---

## Próximos pasos

| Paso | Responsable | Fecha límite |
|------|-------------|--------------|
| Reunión de kickoff | Ambos | ___________________ |
| Entrega de assets | Cliente | ___________________ |
| Primera entrega | RianoDev | ___________________ |

---

*¡Construyamos algo increíble juntos!*

**— Juan Jose Riaño, RianoDev**
`,
  },

  estrategia: {
    title: "Setup de Estrategia",
    content: `# SETUP DE ESTRATEGIA DIGITAL

**Cliente:** ___________________
**Fecha:** ___________________
**Período:** ___________________

---

## Diagnóstico inicial

### Situación actual

**Canales activos:**

___________________

**Métricas actuales (si aplica):**

| Métrica | Valor actual | Meta |
|---------|-------------|------|
| Visitas web / mes | ___ | ___ |
| Tasa de conversión | ___ % | ___ % |
| Leads / mes | ___ | ___ |

---

## Objetivos estratégicos

1. **Objetivo 1:** ___________________
2. **Objetivo 2:** ___________________
3. **Objetivo 3:** ___________________

---

## Stack tecnológico propuesto

| Herramienta | Uso | Estado |
|-------------|-----|--------|
| ___________ | ___________ | ⬜ Pendiente |
| ___________ | ___________ | ⬜ Pendiente |
| ___________ | ___________ | ⬜ Pendiente |

---

## Flujo de automatización

\`\`\`
[Entrada] → [Procesamiento] → [Salida]

Ej: Lead en Instagram → n8n → CRM + WhatsApp automático
\`\`\`

Descripción detallada:

___________________

---

## Roadmap

### Mes 1 — Fundamentos
- [ ] ___________________
- [ ] ___________________

### Mes 2 — Implementación
- [ ] ___________________
- [ ] ___________________

### Mes 3 — Optimización
- [ ] ___________________
- [ ] ___________________

---

## KPIs de seguimiento

| KPI | Frecuencia de revisión | Responsable |
|-----|----------------------|-------------|
| ___________________ | Semanal | ___________________ |
| ___________________ | Mensual | ___________________ |

---

## Notas adicionales

___________________

---

*Documento preparado por Juan Jose Riaño — RianoDev*
`,
  },
};
