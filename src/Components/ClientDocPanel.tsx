import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  PlusIcon, PencilSquareIcon, TrashIcon, EyeIcon,
  XMarkIcon, CheckIcon, DocumentTextIcon, ArrowLeftIcon,
  PrinterIcon, SwatchIcon,
} from "@heroicons/react/24/solid";
import {
  DocumentCheckIcon, ReceiptPercentIcon,
  QuestionMarkCircleIcon, StarIcon, ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useClientDocuments, type DocType, type ClientDocument } from "../hooks/useClientDocuments";
import { DOC_TEMPLATES } from "../lib/docTemplates";
import type { Profile } from "../hooks/useAdminPanel";
import IsotipoBlack from "../assets/IsotipoNoBgBlack.png";

// ── Theme ─────────────────────────────────────────────────────────────────────

interface DocTheme {
  id: string; label: string;
  accent: string; accentMid: string; accentLight: string; accentText: string; dot: string;
}

const DOC_THEMES: DocTheme[] = [
  { id: "clasico",    label: "Clásico",    accent: "#1a1a1a", accentMid: "#f0f0f0", accentLight: "#fafafa", accentText: "#1a1a1a", dot: "#1a1a1a" },
  { id: "navy",       label: "Navy",       accent: "#1e3a5f", accentMid: "#dde9f5", accentLight: "#f0f6fb", accentText: "#1e3a5f", dot: "#1e3a5f" },
  { id: "esmeralda",  label: "Esmeralda",  accent: "#1a4731", accentMid: "#d6ebe0", accentLight: "#eef7f1", accentText: "#1a4731", dot: "#1a4731" },
  { id: "borgona",    label: "Borgoña",    accent: "#7a1a2e", accentMid: "#f0d9de", accentLight: "#faf2f3", accentText: "#7a1a2e", dot: "#7a1a2e" },
  { id: "slate",      label: "Slate",      accent: "#334155", accentMid: "#e2e8f0", accentLight: "#f8fafc", accentText: "#334155", dot: "#334155" },
];

// ── Doc types ─────────────────────────────────────────────────────────────────

const DOC_TYPES: { id: DocType; label: { es: string; en: string }; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "contrato",   label: { es: "Contrato",           en: "Contract"         }, Icon: DocumentCheckIcon     },
  { id: "factura",    label: { es: "Factura",             en: "Invoice"          }, Icon: ReceiptPercentIcon    },
  { id: "preguntas",  label: { es: "Preguntas",           en: "Questions"        }, Icon: QuestionMarkCircleIcon },
  { id: "welcome",    label: { es: "Welcome Document",    en: "Welcome Document" }, Icon: StarIcon              },
  { id: "estrategia", label: { es: "Setup de Estrategia", en: "Strategy Setup"   }, Icon: ChartBarIcon          },
];

interface Props { client: Profile; l: boolean; }
type EditorMode = "edit" | "preview";
interface EditorState { mode: EditorMode; doc: ClientDocument | null; type: DocType; title: string; content: string; }

// ── Shared markdown renderer ──────────────────────────────────────────────────

function DocMarkdown({ content, theme }: { content: string; theme: DocTheme }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 17, fontWeight: 400, color: theme.accent, marginTop: 32, marginBottom: 10, paddingBottom: 5, borderBottom: `0.75px solid ${theme.accent}28`, lineHeight: 1.3 }}>{children}</h2>
        ),
        h2: ({ children }) => (
          <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 13.5, fontWeight: 400, color: theme.accent, marginTop: 26, marginBottom: 8, paddingBottom: 4, borderBottom: `0.5px solid ${theme.accent}22`, lineHeight: 1.3 }}>{children}</h3>
        ),
        h3: ({ children }) => (
          <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: theme.accent, marginTop: 18, marginBottom: 5, lineHeight: 1.4 }}>{children}</h4>
        ),
        p: ({ children }) => (
          <p style={{ margin: "7px 0", lineHeight: 1.9, fontSize: 10.5, color: "#2a2a2a", fontFamily: "'DM Sans',sans-serif" }}>{children}</p>
        ),
        strong: ({ children }) => <strong style={{ fontWeight: 600, color: "#111" }}>{children}</strong>,
        em: ({ children }) => <em style={{ fontStyle: "italic", color: "#555" }}>{children}</em>,
        hr: () => <hr style={{ border: "none", borderTop: "0.5px solid #ddd", margin: "18px 0" }} />,
        blockquote: ({ children }) => (
          <blockquote style={{ borderLeft: `2.5px solid ${theme.accent}55`, paddingLeft: 14, paddingTop: 6, paddingBottom: 6, margin: "12px 0", color: "#666", fontStyle: "italic", background: theme.accentLight, borderRadius: "0 4px 4px 0" }}>{children}</blockquote>
        ),
        ul: ({ children }) => <ul style={{ paddingLeft: 20, margin: "6px 0", lineHeight: 1.85 }}>{children}</ul>,
        ol: ({ children }) => <ol style={{ paddingLeft: 20, margin: "6px 0", lineHeight: 1.85 }}>{children}</ol>,
        li: ({ children }) => <li style={{ margin: "3px 0", lineHeight: 1.85, fontSize: 10.5, color: "#2a2a2a", fontFamily: "'DM Sans',sans-serif" }}>{children}</li>,
        table: ({ children }) => (
          <table style={{ width: "100%", borderCollapse: "collapse", margin: "14px 0", fontSize: 9.5, fontFamily: "'DM Sans',sans-serif" }}>{children}</table>
        ),
        thead: ({ children }) => <thead style={{ background: theme.accentMid }}>{children}</thead>,
        th: ({ children }) => (
          <th style={{ border: `0.75px solid ${theme.accent}44`, padding: "6px 10px", textAlign: "left", fontWeight: 600, color: theme.accentText, fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase" }}>{children}</th>
        ),
        td: ({ children }) => (
          <td style={{ border: "0.75px solid #e2e2e2", padding: "5.5px 10px", verticalAlign: "top", lineHeight: 1.65, color: "#333" }}>{children}</td>
        ),
        code: ({ children }) => (
          <code style={{ fontFamily: "'Courier New',monospace", fontSize: 9, background: theme.accentLight, color: theme.accentText, padding: "1px 5px", borderRadius: 3 }}>{children}</code>
        ),
        pre: ({ children }) => (
          <pre style={{ background: theme.accentLight, border: `0.75px solid ${theme.accent}20`, padding: "10px 14px", borderRadius: 5, fontSize: 8.5, overflowX: "auto", margin: "10px 0", lineHeight: 1.65 }}>{children}</pre>
        ),
        input: ({ ...props }) => (
          <input {...props} style={{ width: 13, height: 13, marginRight: 6, accentColor: theme.accent, verticalAlign: "middle" }} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ── Doc footer ────────────────────────────────────────────────────────────────

function DocFooter({ theme }: { theme: DocTheme }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 56px", borderTop: "0.5px solid #e0e0e0", fontFamily: "'DM Sans',sans-serif", fontSize: 7.5, color: "#bbb", marginTop: 20 }}>
      <span>RianoDev · rianodev.com · juanjose@rianodev.com</span>
      <span style={{ color: theme.accent + "88" }}>{new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })}</span>
    </div>
  );
}

// ── Header shells per doc type ────────────────────────────────────────────────

// CONTRATO — "/" decoration, centered title, tracking separators
function ContratoHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <div style={{ position: "relative", padding: "52px 56px 32px", textAlign: "center" }}>
      {/* Decorative "/" mark */}
      <span style={{
        position: "absolute", top: 28, left: 40,
        fontFamily: "'Playfair Display',Georgia,serif",
        fontSize: 72, fontWeight: 400, color: theme.accent, opacity: 0.08, lineHeight: 1,
        userSelect: "none",
      }}>
        /
      </span>
      {/* Logo + brand */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
        <img src={IsotipoBlack} alt="RianoDev" style={{ height: 28, filter: "opacity(0.7)" }} />
        <div style={{ textAlign: "right", fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: "#999", lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600, color: "#444", fontSize: 9 }}>RianoDev — Juan Jose Riaño</div>
          <div>juanjose@rianodev.com · rianodev.com</div>
        </div>
      </div>
      {/* Title */}
      <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 30, fontWeight: 700, color: theme.accent, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px", lineHeight: 1.1 }}>
        Contrato
      </h1>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
        {title}
      </p>
      {/* Separator */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 8px" }}>
        <div style={{ flex: 1, height: "0.75px", background: theme.accent + "30" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: theme.accent + "80", letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          Acuerdo de Servicios Digitales
        </span>
        <div style={{ flex: 1, height: "0.75px", background: theme.accent + "30" }} />
      </div>
    </div>
  );
}

// FACTURA — top band with accent color, logo + FACTURA
function FacturaHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <>
      {/* Accent band */}
      <div style={{ background: theme.accent, padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <img src={IsotipoBlack} alt="RianoDev" style={{ height: 30, filter: "invert(1) brightness(2)" }} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.65)", marginTop: 6, lineHeight: 1.6 }}>
            <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500, fontSize: 9 }}>RianoDev — Juan Jose Riaño</div>
            <div>juanjose@rianodev.com · rianodev.com</div>
            <div>Bogotá, Colombia</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 38, fontWeight: 700, color: "white", letterSpacing: "0.04em", lineHeight: 1 }}>
            FACTURA
          </div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {title}
          </div>
        </div>
      </div>
      {/* Thin accent stripe */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}44)` }} />
    </>
  );
}

// WELCOME — centered logo, large serif welcome, minimal
function WelcomeHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <div style={{ textAlign: "center", padding: "56px 56px 32px" }}>
      {/* Logo + name */}
      <img src={IsotipoBlack} alt="RianoDev" style={{ height: 28, margin: "0 auto 6px" }} />
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: "#aaa", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28 }}>
        RianoDev
      </div>
      {/* Thin line */}
      <div style={{ width: 48, height: "0.75px", background: theme.accent + "40", margin: "0 auto 28px" }} />
      {/* Big welcome */}
      <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 44, fontWeight: 400, fontStyle: "italic", color: theme.accent, margin: "0 0 6px", lineHeight: 1.1 }}>
        Bienvenido/a
      </h1>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 32px" }}>
        {title}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
        <div style={{ width: 48, height: "0.5px", background: "#ddd" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 7.5, color: theme.accent + "70", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          RianoDev · Portal del Cliente
        </span>
        <div style={{ width: 48, height: "0.5px", background: "#ddd" }} />
      </div>
    </div>
  );
}

// PREGUNTAS — clean header, tracking label, structured
function PreguntasHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <div style={{ padding: "44px 56px 28px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: theme.accent, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>
            RianoDev · Onboarding
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 700, color: theme.accent, margin: 0, lineHeight: 1.2 }}>
            {title}
          </h1>
        </div>
        <img src={IsotipoBlack} alt="RianoDev" style={{ height: 26, opacity: 0.5, marginTop: 4 }} />
      </div>
      {/* Full-width separator */}
      <div style={{ height: "1px", background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}00)`, marginBottom: 4 }} />
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 7.5, color: "#bbb", letterSpacing: "0.15em", textTransform: "uppercase", paddingTop: 5 }}>
        Documento confidencial · Por favor completar antes del kickoff
      </div>
    </div>
  );
}

// ESTRATEGIA — left accent bar, bold header
function EstrategiaHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <div style={{ display: "flex", borderBottom: `0.75px solid ${theme.accent}20`, marginBottom: 0 }}>
      {/* Left accent bar */}
      <div style={{ width: 5, background: theme.accent, flexShrink: 0 }} />
      {/* Header content */}
      <div style={{ flex: 1, padding: "40px 48px 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: theme.accent, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>
              Documento Estratégico · Confidencial
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 700, color: theme.accent, margin: "0 0 6px", lineHeight: 1.15 }}>
              {title}
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: "#999", margin: 0 }}>
              RianoDev — juanjose@rianodev.com · rianodev.com
            </p>
          </div>
          <img src={IsotipoBlack} alt="RianoDev" style={{ height: 28, opacity: 0.6, marginTop: 4 }} />
        </div>
      </div>
    </div>
  );
}

// ── Print HTML builders per type ──────────────────────────────────────────────

function buildHeaderHtml(type: DocType, title: string, theme: DocTheme, logoUrl: string): string {
  const brandInfo = `<div style="font-family:'DM Sans',sans-serif;font-size:8pt;color:rgba(255,255,255,0.65);margin-top:6pt;line-height:1.6"><div style="color:rgba(255,255,255,0.9);font-weight:500;font-size:9pt">RianoDev — Juan Jose Riaño</div><div>juanjose@rianodev.com · rianodev.com · Bogotá, Colombia</div></div>`;

  if (type === "contrato") return `
    <div style="position:relative;padding:48pt 0 28pt;text-align:center;border-bottom:0.5pt solid ${theme.accent}22;margin-bottom:24pt">
      <span style="position:absolute;top:22pt;left:0;font-family:'Playfair Display',Georgia,serif;font-size:72pt;color:${theme.accent};opacity:0.07;line-height:1">/ </span>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32pt">
        ${logoUrl ? `<img src="${logoUrl}" style="height:26pt;opacity:0.7">` : '<span style="font-family:DM Serif Display,serif;font-size:16pt">RDZ</span>'}
        <div style="text-align:right;font-family:DM Sans,sans-serif;font-size:7.5pt;color:#999;line-height:1.6"><div style="font-weight:600;color:#444;font-size:8.5pt">RianoDev — Juan Jose Riaño</div><div>juanjose@rianodev.com · rianodev.com</div></div>
      </div>
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:28pt;font-weight:700;color:${theme.accent};letter-spacing:0.06em;text-transform:uppercase;margin:0 0 4pt;line-height:1.1">Contrato</h1>
      <p style="font-family:DM Sans,sans-serif;font-size:9pt;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 20pt">${title}</p>
      <div style="display:flex;align-items:center;gap:12pt"><div style="flex:1;height:0.5pt;background:${theme.accent}30"></div><span style="font-family:DM Sans,sans-serif;font-size:7pt;color:${theme.accent}80;letter-spacing:0.18em;text-transform:uppercase;white-space:nowrap">Acuerdo de Servicios Digitales</span><div style="flex:1;height:0.5pt;background:${theme.accent}30"></div></div>
    </div>`;

  if (type === "factura") return `
    <div style="background:${theme.accent};padding:24pt 40pt;display:flex;align-items:center;justify-content:space-between;margin-bottom:0">
      <div>${logoUrl ? `<img src="${logoUrl}" style="height:26pt;filter:invert(1) brightness(2)">` : ''}${brandInfo}</div>
      <div style="text-align:right"><div style="font-family:'Playfair Display',Georgia,serif;font-size:32pt;font-weight:700;color:white;letter-spacing:0.04em;line-height:1">FACTURA</div><div style="font-family:DM Sans,sans-serif;font-size:8pt;color:rgba(255,255,255,0.6);margin-top:4pt;letter-spacing:0.08em;text-transform:uppercase">${title}</div></div>
    </div>
    <div style="height:2.5pt;background:linear-gradient(90deg,${theme.accent},${theme.accent}44);margin-bottom:22pt"></div>`;

  if (type === "welcome") return `
    <div style="text-align:center;padding:48pt 0 28pt;border-bottom:0.5pt solid #eee;margin-bottom:24pt">
      ${logoUrl ? `<img src="${logoUrl}" style="height:24pt;margin:0 auto 5pt;display:block">` : ''}
      <div style="font-family:DM Sans,sans-serif;font-size:7pt;color:#bbb;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:22pt">RianoDev</div>
      <div style="width:40pt;height:0.5pt;background:${theme.accent}40;margin:0 auto 22pt"></div>
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:38pt;font-weight:400;font-style:italic;color:${theme.accent};margin:0 0 5pt;line-height:1.1">Bienvenido/a</h1>
      <p style="font-family:DM Sans,sans-serif;font-size:9pt;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 22pt">${title}</p>
      <div style="font-family:DM Sans,sans-serif;font-size:7pt;color:${theme.accent}70;letter-spacing:0.18em;text-transform:uppercase">RianoDev · Portal del Cliente</div>
    </div>`;

  if (type === "preguntas") return `
    <div style="padding:36pt 0 24pt;border-bottom:0.75pt solid ${theme.accent};margin-bottom:22pt">
      <div style="display:flex;align-items:flex-start;justify-content:space-between">
        <div><div style="font-family:DM Sans,sans-serif;font-size:7.5pt;color:${theme.accent};letter-spacing:0.22em;text-transform:uppercase;margin-bottom:7pt">RianoDev · Onboarding</div><h1 style="font-family:'Playfair Display',Georgia,serif;font-size:22pt;font-weight:700;color:${theme.accent};margin:0;line-height:1.2">${title}</h1></div>
        ${logoUrl ? `<img src="${logoUrl}" style="height:22pt;opacity:0.5">` : ''}
      </div>
    </div>`;

  // estrategia
  return `
    <div style="display:flex;border-bottom:0.5pt solid ${theme.accent}22;margin-bottom:22pt">
      <div style="width:4pt;background:${theme.accent};flex-shrink:0"></div>
      <div style="flex:1;padding:36pt 40pt 28pt">
        <div style="display:flex;align-items:flex-start;justify-content:space-between">
          <div><div style="font-family:DM Sans,sans-serif;font-size:7.5pt;color:${theme.accent};letter-spacing:0.22em;text-transform:uppercase;margin-bottom:8pt">Documento Estratégico · Confidencial</div><h1 style="font-family:'Playfair Display',Georgia,serif;font-size:22pt;font-weight:700;color:${theme.accent};margin:0 0 5pt;line-height:1.15">${title}</h1><p style="font-family:DM Sans,sans-serif;font-size:8.5pt;color:#999;margin:0">RianoDev — juanjose@rianodev.com · rianodev.com</p></div>
          ${logoUrl ? `<img src="${logoUrl}" style="height:24pt;opacity:0.55">` : ''}
        </div>
      </div>
    </div>`;
}

// ── Print window ──────────────────────────────────────────────────────────────

function printDocument(type: DocType, title: string, bodyHtml: string, logoUrl: string, theme: DocTheme) {
  const win = window.open("", "_blank", "width=920,height=780");
  if (!win) return;
  const headerHtml = buildHeaderHtml(type, title, theme, logoUrl);

  win.document.write(`<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"/><title>${title}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
@page{size:A4;margin:${type==="factura"?"14mm 0 18mm":"16mm 22mm 20mm"}}
body{font-family:'DM Sans','Helvetica Neue',Arial,sans-serif;font-size:10.5pt;color:#1a1a1a;line-height:1.85;background:#fff}
h1{font-family:'Playfair Display',Georgia,serif;font-size:22pt;font-weight:700;color:${theme.accent};margin:0 0 16pt;line-height:1.2}
h2{font-family:'DM Serif Display',Georgia,serif;font-size:13pt;font-weight:400;color:${theme.accent};margin:22pt 0 8pt;padding-bottom:5pt;border-bottom:0.75pt solid ${theme.accent}28;line-height:1.3}
h3{font-family:'DM Sans',sans-serif;font-size:10.5pt;font-weight:600;color:${theme.accent};margin:16pt 0 5pt}
p{margin:6pt 0;line-height:1.85}
ul,ol{padding-left:16pt;margin:5pt 0}
li{margin:3pt 0;line-height:1.8}
strong{font-weight:600;color:#111}
em{font-style:italic;color:#555}
a{color:${theme.accent}}
hr{border:none;border-top:0.5pt solid #ddd;margin:16pt 0}
blockquote{border-left:2.5pt solid ${theme.accent}55;padding:5pt 12pt;margin:10pt 0;color:#666;font-style:italic;background:${theme.accentLight};border-radius:0 3pt 3pt 0}
table{width:100%;border-collapse:collapse;margin:12pt 0;font-size:9pt}
thead{background:${theme.accentMid}}
th{border:0.75pt solid ${theme.accent}44;padding:6pt 10pt;font-weight:600;color:${theme.accentText};font-size:8pt;letter-spacing:0.06em;text-transform:uppercase}
td{border:0.75pt solid #e2e2e2;padding:5pt 10pt;vertical-align:top;line-height:1.65}
tr:nth-child(even) td{background:${theme.accentLight}}
input[type="checkbox"]{margin-right:5pt;accent-color:${theme.accent}}
code{font-family:'Courier New',monospace;font-size:8.5pt;background:${theme.accentLight};color:${theme.accentText};padding:1pt 4pt;border-radius:2pt}
pre{background:${theme.accentLight};border:0.5pt solid ${theme.accent}20;padding:9pt;border-radius:3pt;font-size:8pt;margin:8pt 0;line-height:1.6}
.body-wrap{padding:${type==="factura"?"20pt 44pt 0":"0 0 0"}}
.doc-footer{margin-top:28pt;padding-top:7pt;border-top:0.5pt solid #ccc;font-size:7pt;color:#bbb;display:flex;justify-content:space-between}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
${headerHtml}
<div class="body-wrap">${bodyHtml}</div>
<div style="padding:0 ${type==="factura"?"44pt":"0"}"><div class="doc-footer"><span>RianoDev · rianodev.com · juanjose@rianodev.com</span><span style="color:${theme.accent}88">${new Date().toLocaleDateString("es-CO",{day:"2-digit",month:"long",year:"numeric"})}</span></div></div>
<script>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\/script>
</body></html>`);
  win.document.close();
}

// ── DocPaper (in-app) ─────────────────────────────────────────────────────────

const PADDING = { contrato: "0 56px", factura: "22px 48px 0", welcome: "0 56px", preguntas: "4px 56px", estrategia: "20px 52px" };

function DocPaper({ title, content, theme, type, onPrint }: { title: string; content: string; theme: DocTheme; type: DocType; onPrint: () => void }) {
  const Header = { contrato: ContratoHeader, factura: FacturaHeader, welcome: WelcomeHeader, preguntas: PreguntasHeader, estrategia: EstrategiaHeader }[type];
  return (
    <div className="rounded-2xl p-6 overflow-auto max-h-[74vh] scrollbar_exp" style={{ background: "#e5e7eb" }}>
      <div className="mx-auto bg-white shadow-2xl" style={{ maxWidth: 740, minHeight: 960 }}>
        <Header title={title} theme={theme} />
        <div style={{ padding: PADDING[type], paddingBottom: 0 }}>
          <DocMarkdown content={content} theme={theme} />
        </div>
        <DocFooter theme={theme} />
      </div>
      <div className="flex justify-center mt-5">
        <button onClick={onPrint} className="flex items-center gap-2 text-xs tracking-widest uppercase text-black bg-[#10dffd] px-5 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer">
          <PrinterIcon className="w-3.5 h-3.5" />
          Descargar / Imprimir PDF
        </button>
      </div>
    </div>
  );
}

// ── ThemePicker ───────────────────────────────────────────────────────────────

function ThemePicker({ current, onChange }: { current: DocTheme; onChange: (t: DocTheme) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all cursor-pointer">
        <SwatchIcon className="w-3 h-3" />
        {current.label}
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: current.dot }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="absolute right-0 top-full mt-2 z-20 bg-black border border-white/10 rounded-xl p-2 flex flex-col gap-1 min-w-[140px] shadow-xl">
            {DOC_THEMES.map(t => (
              <button key={t.id} onClick={() => { onChange(t); setOpen(false); }} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer text-left ${current.id === t.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                <span className="w-3 h-3 rounded-full shrink-0 border border-white/10" style={{ background: t.dot }} />
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function ClientDocPanel({ client, l }: Props) {
  const { loading, saving, error, create, update, remove, docsForType } = useClientDocuments(client.id);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [theme, setTheme] = useState<DocTheme>(DOC_THEMES[0]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const proseRef = useRef<HTMLDivElement>(null);

  const openNew = (type: DocType) => { const tpl = DOC_TEMPLATES[type]; setEditor({ mode: "edit", doc: null, type, title: tpl.title, content: tpl.content }); };
  const openEdit = (doc: ClientDocument) => setEditor({ mode: "edit", doc, type: doc.type, title: doc.title, content: doc.content });
  const openPreview = (doc: ClientDocument) => setEditor({ mode: "preview", doc, type: doc.type, title: doc.title, content: doc.content });

  const handleSave = async () => {
    if (!editor) return;
    if (editor.doc) await update(editor.doc.id, editor.title, editor.content);
    else await create(editor.type, editor.title, editor.content);
    setEditor(null);
  };

  const handleDelete = async (id: string) => { await remove(id); setConfirmDeleteId(null); };

  const getLogoDataUrl = (): Promise<string> => new Promise(resolve => {
    const img = new Image(); img.crossOrigin = "anonymous";
    img.onload = () => { const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; c.getContext("2d")!.drawImage(img, 0, 0); resolve(c.toDataURL("image/png")); };
    img.onerror = () => resolve(""); img.src = IsotipoBlack;
  });

  const handlePrint = async () => {
    if (!editor) return;
    const logoUrl = await getLogoDataUrl();
    const bodyHtml = proseRef.current?.innerHTML ?? "";
    printDocument(editor.type, editor.title, bodyHtml, logoUrl, theme);
  };

  // ── Editor ──────────────────────────────────────────────────────────────────

  if (editor) {
    const typeLabel = DOC_TYPES.find(t => t.id === editor.type);
    return (
      <motion.div key="editor" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex flex-col gap-4">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button onClick={() => setEditor(null)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors cursor-pointer">
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            {l ? "Back" : "Volver"}
          </button>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <ThemePicker current={theme} onChange={setTheme} />
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
              <button onClick={() => setEditor(s => s && { ...s, mode: "edit" })} className={`flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full transition-all cursor-pointer ${editor.mode === "edit" ? "bg-[#10dffd] text-black font-medium" : "text-white/50 hover:text-white"}`}>
                <PencilSquareIcon className="w-3 h-3" /> {l ? "Edit" : "Editar"}
              </button>
              <button onClick={() => setEditor(s => s && { ...s, mode: "preview" })} className={`flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full transition-all cursor-pointer ${editor.mode === "preview" ? "bg-[#10dffd] text-black font-medium" : "text-white/50 hover:text-white"}`}>
                <EyeIcon className="w-3 h-3" /> Preview
              </button>
            </div>
            {editor.mode === "edit" && (
              <button onClick={handleSave} disabled={saving || !editor.title.trim()} className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-4 py-1.5 rounded-full hover:opacity-90 disabled:opacity-50 cursor-pointer">
                {saving ? <div className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" /> : <CheckIcon className="w-3 h-3" />}
                {saving ? (l ? "Saving…" : "Guardando…") : (l ? "Save" : "Guardar")}
              </button>
            )}
            {editor.mode === "preview" && (
              <button onClick={handlePrint} className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-4 py-1.5 rounded-full hover:opacity-90 cursor-pointer">
                <PrinterIcon className="w-3 h-3" /> PDF
              </button>
            )}
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2">
          {typeLabel && <typeLabel.Icon className="w-4 h-4 text-[#10dffd]/50" />}
          <span className="text-[10px] tracking-widest uppercase text-[#10dffd]/50">{l ? typeLabel?.label.en : typeLabel?.label.es}</span>
          {editor.mode === "preview" && <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${theme.accent}20`, color: theme.accent }}>{theme.label}</span>}
        </div>

        {error && <div className="border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">{error}</div>}

        {/* Edit */}
        {editor.mode === "edit" && (
          <div className="flex flex-col gap-3">
            <input type="text" value={editor.title} onChange={e => setEditor(s => s && { ...s, title: e.target.value })} placeholder={l ? "Document title…" : "Título…"} className="w-full bg-white/[0.04] border border-[#10dffd]/15 rounded-xl px-4 py-2.5 text-white text-sm font-light placeholder-gray-600 focus:outline-none focus:border-[#10dffd]/40 transition-colors" />
            <textarea value={editor.content} onChange={e => setEditor(s => s && { ...s, content: e.target.value })} rows={32} className="w-full bg-white/[0.03] border border-[#10dffd]/10 rounded-xl px-5 py-4 text-gray-300 text-xs font-mono leading-loose placeholder-gray-700 focus:outline-none focus:border-[#10dffd]/30 resize-none scrollbar_exp" />
            <p className="text-gray-700 text-[10px]">Markdown: <code className="text-[#10dffd]/50">**negrita**</code> <code className="text-[#10dffd]/50"># Título</code> <code className="text-[#10dffd]/50">| tabla |</code> <code className="text-[#10dffd]/50">- [ ] checkbox</code></p>
          </div>
        )}

        {/* Preview */}
        {editor.mode === "preview" && (
          <>
            {/* Hidden prose for print */}
            <div ref={proseRef} className="hidden">
              <DocMarkdown content={editor.content} theme={theme} />
            </div>
            <DocPaper title={editor.title} content={editor.content} theme={theme} type={editor.type} onPrint={handlePrint} />
          </>
        )}
      </motion.div>
    );
  }

  // ── List ────────────────────────────────────────────────────────────────────

  if (loading) return <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#10dffd]" /></div>;

  return (
    <div className="flex flex-col gap-4">
      {error && <div className="border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">{error}</div>}
      {DOC_TYPES.map(({ id, label, Icon }) => {
        const typeDocs = docsForType(id);
        return (
          <motion.div key={id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="border border-[#10dffd]/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#10dffd]/8 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-[#10dffd]/60" />
                <span className="text-white text-sm font-light">{l ? label.en : label.es}</span>
                {typeDocs.length > 0 && <span className="text-[10px] text-[#10dffd]/50 bg-[#10dffd]/8 rounded-full px-2 py-0.5">{typeDocs.length}</span>}
              </div>
              <button onClick={() => openNew(id)} className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-3 py-1.5 rounded-full hover:opacity-90 cursor-pointer">
                <PlusIcon className="w-3 h-3" />{l ? "New" : "Crear"}
              </button>
            </div>
            {typeDocs.length === 0 ? (
              <div className="flex items-center gap-2 px-5 py-4">
                <DocumentTextIcon className="w-3.5 h-3.5 text-white/10 shrink-0" />
                <p className="text-gray-700 text-xs">{l ? "No documents yet. Click 'New' to create from template." : "Sin documentos. Haz clic en 'Crear' para usar la plantilla."}</p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.04]">
                {typeDocs.map(doc => (
                  <li key={doc.id} className="flex items-center justify-between px-5 py-3 gap-3">
                    <button onClick={() => openPreview(doc)} className="flex items-center gap-2.5 min-w-0 text-left group">
                      <DocumentTextIcon className="w-3.5 h-3.5 text-[#10dffd]/40 shrink-0 group-hover:text-[#10dffd]/70 transition-colors" />
                      <div className="min-w-0">
                        <span className="text-xs text-gray-300 font-light group-hover:text-white transition-colors truncate block">{doc.title}</span>
                        <span className="text-[10px] text-gray-700">{new Date(doc.updated_at).toLocaleDateString(l ? "en-US" : "es-CO", { day: "2-digit", month: "short", year: "numeric" })}</span>
                      </div>
                    </button>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => openPreview(doc)} className="p-1.5 rounded-lg text-gray-600 hover:text-[#10dffd] transition-colors cursor-pointer"><EyeIcon className="w-3.5 h-3.5" /></button>
                      <button onClick={() => openEdit(doc)} className="p-1.5 rounded-lg text-gray-600 hover:text-white transition-colors cursor-pointer"><PencilSquareIcon className="w-3.5 h-3.5" /></button>
                      <AnimatePresence mode="wait">
                        {confirmDeleteId === doc.id ? (
                          <motion.div key="confirm" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center gap-1">
                            <button onClick={() => handleDelete(doc.id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-300 cursor-pointer"><CheckIcon className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setConfirmDeleteId(null)} className="p-1.5 rounded-lg text-gray-600 hover:text-white cursor-pointer"><XMarkIcon className="w-3.5 h-3.5" /></button>
                          </motion.div>
                        ) : (
                          <motion.button key="del" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmDeleteId(doc.id)} className="p-1.5 rounded-lg text-gray-700 hover:text-red-400 transition-colors cursor-pointer"><TrashIcon className="w-3.5 h-3.5" /></motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
