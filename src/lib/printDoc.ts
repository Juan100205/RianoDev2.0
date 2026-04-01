import type { DocType } from "../hooks/useClientDocuments";

interface DocTheme {
  accent: string; accentMid: string; accentLight: string; accentText: string;
}

function buildHeaderHtml(type: DocType, title: string, theme: DocTheme, logoUrl: string): string {
  const logoImg = logoUrl ? `<img src="${logoUrl}" style="height:26pt">` : "";
  const logoInv = logoUrl ? `<img src="${logoUrl}" style="height:26pt;filter:invert(1) brightness(2)">` : "";

  if (type === "contrato") return `
    <div style="position:relative;padding:48pt 0 28pt;text-align:center;border-bottom:0.5pt solid ${theme.accent}22;margin-bottom:24pt">
      <span style="position:absolute;top:22pt;left:0;font-family:'Playfair Display',Georgia,serif;font-size:72pt;color:${theme.accent};opacity:0.07;line-height:1">/</span>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32pt">
        ${logoImg}
        <div style="text-align:right;font-family:DM Sans,sans-serif;font-size:7.5pt;color:#999;line-height:1.6"><div style="font-weight:600;color:#444;font-size:8.5pt">RianoDev — Juan Jose Riaño</div><div>juanjose@rianodev.com · rianodev.com</div></div>
      </div>
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:28pt;font-weight:700;color:${theme.accent};letter-spacing:0.06em;text-transform:uppercase;margin:0 0 4pt;line-height:1.1">Contrato</h1>
      <p style="font-family:DM Sans,sans-serif;font-size:9pt;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 20pt">${title}</p>
      <div style="display:flex;align-items:center;gap:12pt"><div style="flex:1;height:0.5pt;background:${theme.accent}30"></div><span style="font-family:DM Sans,sans-serif;font-size:7pt;color:${theme.accent}80;letter-spacing:0.18em;text-transform:uppercase">Acuerdo de Servicios Digitales</span><div style="flex:1;height:0.5pt;background:${theme.accent}30"></div></div>
    </div>`;

  if (type === "factura") return `
    <div style="background:${theme.accent};padding:24pt 40pt;display:flex;align-items:center;justify-content:space-between">
      <div>${logoInv}<div style="font-family:DM Sans,sans-serif;font-size:8pt;color:rgba(255,255,255,0.65);margin-top:6pt;line-height:1.6"><div style="color:rgba(255,255,255,0.9);font-weight:500;font-size:9pt">RianoDev — Juan Jose Riaño</div><div>juanjose@rianodev.com · rianodev.com</div></div></div>
      <div style="text-align:right"><div style="font-family:'Playfair Display',Georgia,serif;font-size:32pt;font-weight:700;color:white;letter-spacing:0.04em;line-height:1">FACTURA</div><div style="font-family:DM Sans,sans-serif;font-size:8pt;color:rgba(255,255,255,0.6);margin-top:4pt;letter-spacing:0.08em;text-transform:uppercase">${title}</div></div>
    </div>
    <div style="height:2.5pt;background:linear-gradient(90deg,${theme.accent},${theme.accent}44);margin-bottom:22pt"></div>`;

  if (type === "welcome") return `
    <div style="text-align:center;padding:48pt 0 28pt;border-bottom:0.5pt solid #eee;margin-bottom:24pt">
      ${logoImg ? logoImg.replace("height:26pt", "height:24pt;margin:0 auto 5pt;display:block") : ""}
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
        ${logoImg ? logoImg.replace("height:26pt", "height:22pt;opacity:0.5") : ""}
      </div>
    </div>`;

  return `
    <div style="display:flex;border-bottom:0.5pt solid ${theme.accent}22;margin-bottom:22pt">
      <div style="width:4pt;background:${theme.accent};flex-shrink:0"></div>
      <div style="flex:1;padding:36pt 40pt 28pt">
        <div style="display:flex;align-items:flex-start;justify-content:space-between">
          <div><div style="font-family:DM Sans,sans-serif;font-size:7.5pt;color:${theme.accent};letter-spacing:0.22em;text-transform:uppercase;margin-bottom:8pt">Documento Estratégico · Confidencial</div><h1 style="font-family:'Playfair Display',Georgia,serif;font-size:22pt;font-weight:700;color:${theme.accent};margin:0 0 5pt;line-height:1.15">${title}</h1><p style="font-family:DM Sans,sans-serif;font-size:8.5pt;color:#999;margin:0">RianoDev — juanjose@rianodev.com · rianodev.com</p></div>
          ${logoImg ? logoImg.replace("height:26pt", "height:24pt;opacity:0.55") : ""}
        </div>
      </div>
    </div>`;
}

export function printClientDoc(
  type: DocType,
  title: string,
  bodyHtml: string,
  logoUrl: string,
  theme: DocTheme
) {
  const win = window.open("", "_blank", "width=920,height=780");
  if (!win) return;
  const headerHtml = buildHeaderHtml(type, title, theme, logoUrl);
  const bodyPad = type === "factura" ? "20pt 44pt 0" : "0";

  win.document.write(`<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"/><title>${title}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
@page{size:A4;margin:${type==="factura"?"14mm 0 18mm":"16mm 22mm 20mm"}}
body{font-family:'DM Sans','Helvetica Neue',Arial,sans-serif;font-size:10.5pt;color:#1a1a1a;line-height:1.85;background:#fff}
h2{font-family:'DM Serif Display',Georgia,serif;font-size:13pt;font-weight:400;color:${theme.accent};margin:22pt 0 8pt;padding-bottom:5pt;border-bottom:0.75pt solid ${theme.accent}28;line-height:1.3}
h3{font-family:'DM Serif Display',Georgia,serif;font-size:11pt;font-weight:400;color:${theme.accent};margin:18pt 0 6pt;padding-bottom:4pt;border-bottom:0.5pt solid ${theme.accent}22;line-height:1.3}
h4{font-family:'DM Sans',sans-serif;font-size:10.5pt;font-weight:600;color:${theme.accent};margin:14pt 0 4pt}
p{margin:6pt 0;line-height:1.85}
ul,ol{padding-left:16pt;margin:5pt 0}
li{margin:3pt 0;line-height:1.8}
strong{font-weight:600;color:#111}
em{font-style:italic;color:#555}
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
.doc-footer{margin-top:28pt;padding-top:7pt;border-top:0.5pt solid #ccc;font-size:7pt;color:#bbb;display:flex;justify-content:space-between}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
${headerHtml}
<div style="padding:${bodyPad}">${bodyHtml}</div>
<div style="padding:0 ${type==="factura"?"44pt":"0"}"><div class="doc-footer"><span>RianoDev · rianodev.com</span><span style="color:${theme.accent}88">${new Date().toLocaleDateString("es-CO",{day:"2-digit",month:"long",year:"numeric"})}</span></div></div>
<script>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\/script>
</body></html>`);
  win.document.close();
}
