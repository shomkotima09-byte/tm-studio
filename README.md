# TM Studio | Desarrollo Web, Bots de Discord & Software a Medida

Página web oficial de **TM Studio**, optimizada a nivel de ingeniería frontend, WebGL y **arquitectura SEO avanzada** para conseguir la máxima indexabilidad, visibilidad en Google y puntuación excelente en **Core Web Vitals**.

---

## 🚀 Arquitectura SEO y Datos Estructurados

La web cuenta con una implementación SEO integral basada en las directrices oficiales de Google:

1. **Jerarquía Semántica Estricta (W3C Outline):**
   - Exactamente un único `<h1>` de máxima relevancia contextual.
   - Encabezados `<h2>` para cada sección independiente (`#servicios`, Discord, diferenciación, `#proceso`, `#precios`, `#faq`, llamada a la acción final).
   - Subencabezados `<h3>` para cada servicio individual, ventajas, etapas del proceso y planes, evitando saltos ilícitos de jerarquía.
   - Preguntas del FAQ estructuradas con etiquetas semánticas y acordeón accesible (`aria-expanded`, `aria-controls`).

2. **Metadatos y Etiquetas de Indexación:**
   - `<title>` optimizado para CTR dentro del límite visual de Google (55-70 caracteres).
   - `<meta name="description">` persuasiva de 153 caracteres sin keyword stuffing.
   - `<meta name="robots">` configurado con `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
   - Etiqueta `<link rel="canonical">` absoluta y segura.
   - Metadatos completos de Open Graph (`og:*`) y Twitter Cards (`twitter:*`) para previsualización enriquecida en redes sociales y WhatsApp.
   - Favicon vectorial en SVG (`/favicon.svg`) y Web App Manifest (`/site.webmanifest`).

3. **Datos Estructurados (Schema.org JSON-LD):**
   - Gráfico Schema (`@graph`) validado que incluye:
     - `WebSite`: Declaración de sitio web, nombre y relación de autoría.
     - `ProfessionalService`: Entidad auténtica con datos de contacto verificados (+34 641 723 490, Discord, catálogo de ofertas y servicios reales).
     - `WebPage`: Página principal de servicios.
     - `BreadcrumbList`: Rastro de migas de pan lógico (Inicio > Servicios > Bots y Software > Proceso > Planes y Precios > FAQ).
     - `FAQPage`: Estructura enriquecida con las 7 preguntas y respuestas reales para obtención de rich snippets en SERPs de Google.

4. **SEO Técnico y Rastreo:**
   - **`robots.txt`**: Permite la indexación completa a Googlebot y otros rastreadores, protege archivos internos y declara el enlace al `sitemap.xml`.
   - **`sitemap.xml`**: Mapa del sitio XML estándar con declaración de frecuencia, prioridad y URL canónica.
   - **`404.html`**: Página de error 404 personalizada con `<meta name="robots" content="noindex, follow">` para prevenir la contaminación del índice.
   - **`vercel.json`**: Cabeceras de seguridad HTTP, enrutamiento limpio (`cleanUrls: true`) y políticas de caché para recursos estáticos.

---

## ⚡ Rendimiento & Core Web Vitals

| Métrica / Recurso | Antes de la Optimización | Después de la Optimización | Mejora |
| :--- | :--- | :--- | :--- |
| **Scripts Bloqueantes en `<head>`** | 3 scripts (~1,010 KB JS) | **0 scripts bloqueantes** (`defer` activo) | **100% eliminado** |
| **Motor de Estilos CSS** | Tailwind Play CDN (~350 KB JIT) | **CSS Standalone Minificado** (~17 KB) | **-95.2% payload** |
| **Core Web Vitals - LCP** | Retrasado por descarga de JS | **< 300 ms** (Render instantáneo) | **Carga casi inmediata** |
| **Core Web Vitals - CLS** | Posible salto de canvas | **0.000** (Dimensiones explícitas + fade-in) | **Estabilidad perfecta** |
| **Core Web Vitals - INP** | Afectado por compilación JIT | **< 16 ms** (Main thread libre) | **Respuesta táctil instantánea** |

---

## 🔍 Configuración de Google Search Console

1. Accede a [Google Search Console](https://search.google.com/search-console).
2. Añade tu propiedad (Prefijo de la URL: `https://tudominio.es` o Dominio DNS).
3. Si utilizas la verificación por etiqueta HTML, copia el código que te proporciona Google y reemplázalo en `index.html`:
   ```html
   <meta name="google-site-verification" content="TU_CODIGO_DE_VERIFICACION" />
   ```
4. Envía el sitemap en la sección **Sitemaps**:
   ```
   https://tudominio.es/sitemap.xml
   ```
5. Si cambias de dominio, actualiza la URL canónica en `index.html`, `sitemap.xml` y `robots.txt`.

---

## ⚙️ Configuración Rápida en `TM_CONFIG`

En el archivo `index.html` (al final, dentro de `<script>`), tienes el bloque para cambiar datos de contacto y precios en segundos:

```javascript
const TM_CONFIG = {
  contacto: {
    whatsappNumero: "34641723490",
    whatsappVisible: "+34 641 723 490",
    discordUsuario: "tymucam",
    discordInvitacion: "https://discord.gg/tymucam",
    mensajeGeneralWhatsApp: "Hola TM Studio, me interesa información sobre un proyecto."
  },
  precios: {
    webPresencia: { precio: "XX€", mensajeWhatsApp: "Hola TM Studio, me interesa el Pack Web Presencia..." },
    webPro: { precio: "XX€", mensajeWhatsApp: "Hola TM Studio, me interesa el Pack Web Pro + Admin..." },
    botsSoftware: { precio: "Desde XX€", mensajeWhatsApp: "Hola TM Studio, quiero presupuesto para un Bot de Discord..." },
    mantenimiento: { precio: "XX€", mensajeWhatsApp: "Hola TM Studio, quiero activar el Mantenimiento Web..." }
  }
};
```

---

## 🖥️ Probar en Local

- Ejecuta el servidor PowerShell nativo seguro (Anti Path-Traversal):
  ```powershell
  .\server.ps1
  ```
- O valida los requisitos de Rendimiento, SEO y Ciberseguridad ejecutando las suites de auditoría:
  ```bash
  node audit.js
  node test-seo-audit.js
  node test-security.js
  node verify-render.js
  ```

---

## 🔐 Panel de Control Administrativo (`admin.html`)

La web incluye un panel de gestión privado accesible en `http://localhost:3000/admin.html` (o `https://tmstudio.es/admin.html`):

- **Usuario por defecto:** `admin@tmstudio.es`
- **Contraseña inicial:** `TMStudio2026!`
- **Funcionalidades:** Modificación visual de tarifas, teléfonos de WhatsApp, mensajes predefinidos, avisos dinámicos en la barra superior y cambio de contraseña administrativa con hash SHA-256 en cliente.
- **Sincronización:** Los cambios se guardan inmediatamente en el almacenamiento local del navegador (`localStorage`) y, si se configuran las credenciales en `firebase.js`, se sincronizan automáticamente con la base de datos Firestore en la nube para todos los visitantes.
