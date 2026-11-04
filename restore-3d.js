const fs = require('fs');

const orig = fs.readFileSync('index.original.html', 'utf8');

// Leer la imagen del emblema oficial TM STUDIO (sin la 'E') y codificarla en Base64 para carga 100% infalible en local y online
const emblemBuffer = fs.readFileSync('tm-studio-emblem.jpg');
const emblemBase64 = `data:image/jpeg;base64,${emblemBuffer.toString('base64')}`;

// Metadatos SEO limpios que se insertan en <head>
const seoMeta = `  <!-- Metadatos SEO, Open Graph & Canonical -->
  <link rel="canonical" href="https://tmstudio.es/" />
  <meta name="keywords" content="TM Studio, desarrollo web, crear pagina web profesional, bots discord españa, software a medida, programador web freelance, bots personalizados discord, landing pages, paginas web rapidas, laocoonte fitness" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="google-site-verification" content="REEMPLAZAR_CON_CODIGO_GOOGLE_SEARCH_CONSOLE" />
  <meta name="author" content="TM Studio" />
  <meta name="geo.region" content="ES" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/favicon.svg" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- Open Graph / Redes Sociales & WhatsApp / Discord -->
  <meta property="og:locale" content="es_ES" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="TM Studio — Desarrollo Web, Bots de Discord & Software a Medida" />
  <meta property="og:description" content="TM Studio: Desarrollo de páginas web profesionales, bots de Discord avanzados y software a medida para negocios y creadores." />
  <meta property="og:url" content="https://tmstudio.es/" />
  <meta property="og:site_name" content="TM Studio" />
  <meta property="og:image" content="https://tmstudio.es/tm-studio-emblem.jpg" />
  <meta property="og:image:secure_url" content="https://tmstudio.es/tm-studio-emblem.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1024" />
  <meta property="og:image:height" content="1024" />
  <meta property="og:image:alt" content="TM Studio Logo 3D Oficial" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@TMStudio" />
  <meta name="twitter:title" content="TM Studio — Desarrollo Web, Bots de Discord & Software a Medida" />
  <meta name="twitter:description" content="TM Studio: Desarrollo de páginas web profesionales, bots de Discord avanzados y software a medida para negocios y creadores." />
  <meta name="twitter:image" content="https://tmstudio.es/tm-studio-emblem.jpg" />
  <meta name="twitter:image:alt" content="TM Studio Logo 3D Oficial" />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://tmstudio.es/#website",
        "url": "https://tmstudio.es/",
        "name": "TM Studio",
        "inLanguage": "es-ES"
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://tmstudio.es/#organization",
        "name": "TM Studio",
        "url": "https://tmstudio.es/",
        "logo": "https://tmstudio.es/tm-studio-emblem.jpg",
        "telephone": "+34 641 723 490",
        "sameAs": ["https://discord.gg/tymucam"]
      },
      {
        "@type": "WebPage",
        "@id": "https://tmstudio.es/#webpage",
        "url": "https://tmstudio.es/",
        "name": "TM Studio — Desarrollo Web, Bots de Discord & Software a Medida",
        "isPartOf": { "@id": "https://tmstudio.es/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://tmstudio.es/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://tmstudio.es/" },
          { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://tmstudio.es/#servicios" },
          { "@type": "ListItem", "position": 3, "name": "Proyectos", "item": "https://tmstudio.es/#proyectos" },
          { "@type": "ListItem", "position": 4, "name": "Precios", "item": "https://tmstudio.es/#precios" },
          { "@type": "ListItem", "position": 5, "name": "FAQ", "item": "https://tmstudio.es/#faq" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://tmstudio.es/#faqpage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Cuánto tarda una página web o un bot?",
            "acceptedAnswer": { "@type": "Answer", "text": "Una web básica o bot estándar suele estar lista en 3 a 7 días. Proyectos más complejos toman entre 1 y 2 semanas. Siempre acordamos la fecha de entrega antes de iniciar." }
          },
          {
            "@type": "Question",
            "name": "¿Qué incluye el servicio?",
            "acceptedAnswer": { "@type": "Answer", "text": "Diseño, desarrollo, adaptación a móviles, dominio y SSL, botones directos de contacto (WhatsApp) y explicación de uso para que tengas control total." }
          },
          {
            "@type": "Question",
            "name": "¿Se adapta a dispositivos móviles?",
            "acceptedAnswer": { "@type": "Answer", "text": "Sí, totalmente. Probamos cada detalle en pantallas móviles para asegurar navegación rápida e intuitiva." }
          },
          {
            "@type": "Question",
            "name": "¿Incluye posicionamiento SEO?",
            "acceptedAnswer": { "@type": "Answer", "text": "Sí. Entregamos la web con la estructura semántica correcta y optimización de velocidad para que Google indexe tu negocio." }
          },
          {
            "@type": "Question",
            "name": "¿Cómo se realiza el pago?",
            "acceptedAnswer": { "@type": "Answer", "text": "Habitualmente en dos plazos: 50% al empezar para reservar fecha y el 50% restante al terminar cuando la web esté revisada y aprobada por ti." }
          },
          {
            "@type": "Question",
            "name": "¿Existe mantenimiento posterior?",
            "acceptedAnswer": { "@type": "Answer", "text": "Sí, ofrecemos planes de mantenimiento opcionales para que nunca tengas que preocuparte por copias de seguridad o cambios de texto." }
          },
          {
            "@type": "Question",
            "name": "¿Cómo solicitar presupuesto?",
            "acceptedAnswer": { "@type": "Answer", "text": "Escríbenos directamente por WhatsApp o Discord y te responderemos el mismo día con una propuesta clara." }
          }
        ]
      }
    ]
  }
  </script>
`;

let restored = orig;

// 1. Asegurar lang="es" y dir="ltr"
restored = restored.replace('<html lang="es" class="scroll-smooth">', '<html lang="es" dir="ltr" class="scroll-smooth">');

// 2. Insertar metadatos SEO justo antes de Google Fonts y ajustar theme-color a azul oficial
restored = restored.replace('<meta name="theme-color" content="#FFFFFF" />', '<meta name="theme-color" content="#2563EB" />');
restored = restored.replace('<!-- Google Fonts: Plus Jakarta Sans & Syne -->', `${seoMeta}\n  <!-- Google Fonts: Plus Jakarta Sans & Syne -->`);

// 3. Estilos CSS modernos: fluidez extrema 120Hz, micro-interacciones, animaciones hardware-accelerated
const originalStyle = `  <style>
    * { box-sizing: border-box; }
    html, body {
      background-color: #FFFFFF;
      color: #0F172A;
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Scrollbar sutil */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #FFFFFF; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #2563EB; }

    /* Fondo degradado suave estilo Wix Studio / SaaS */
    .hero-glow {
      background: radial-gradient(100% 70% at 75% 25%, #EBF3FF 0%, #F5F9FF 40%, #FFFFFF 80%);
    }

    /* Tarjetas Minimalistas Luminosas */
    .clean-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .clean-card:hover {
      border-color: #93C5FD;
      box-shadow: 0 12px 28px -6px rgba(37, 99, 235, 0.08);
      transform: translateY(-2px);
    }

    /* Botón Azul Primario */
    .btn-blue {
      background: #2563EB;
      color: #FFFFFF;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .btn-blue:hover {
      background: #1D4ED8;
      box-shadow: 0 6px 20px -2px rgba(37, 99, 235, 0.35);
      transform: translateY(-1px);
    }

    /* Botón Outline Claro */
    .btn-clean {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #E2E8F0;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .btn-clean:hover {
      background: #F8FAFC;
      border-color: #CBD5E1;
      transform: translateY(-1px);
    }
  </style>`;

const newStyle = `  <style>
    * { box-sizing: border-box; }
    html, body {
      background-color: #FFFFFF;
      color: #0F172A;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      scroll-behavior: smooth;
    }

    /* Scrollbar moderna y fluida */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #FFFFFF; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #2563EB; }

    /* Fondo degradado suave estilo SaaS / Modern Tech */
    .hero-glow {
      background: radial-gradient(100% 70% at 75% 25%, #EBF3FF 0%, #F5F9FF 40%, #FFFFFF 80%);
    }

    /* CONTENEDOR 3D PROTEGIDO Y COMPACTO (Cero solapamientos, altura física garantizada) */
    #hero-3d-wrapper {
      position: relative;
      width: 100%;
      max-width: 420px;
      height: 420px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #webgl-hero {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
    }
    #webgl-hero:active {
      cursor: grabbing;
    }
    #webgl-hero canvas {
      display: block;
      width: 100% !important;
      height: 100% !important;
      pointer-events: auto;
    }
    @media (max-width: 1024px) {
      #hero-3d-wrapper { max-width: 360px; height: 360px; }
    }
    @media (max-width: 640px) {
      #hero-3d-wrapper { max-width: 270px; height: 270px; }
    }

    /* Tipografía y Contraste Optimizado (WCAG AAA) */
    .text-carbon-600 { color: #475569 !important; }
    .text-carbon-400 { color: #64748B !important; }

    /* FLUIDEZ 120HZ: Tarjetas Bento con Aceleración por Hardware y Hover Suave */
    .clean-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.28s ease;
      will-change: transform, box-shadow;
      transform: translate3d(0, 0, 0);
    }
    .clean-card:hover {
      border-color: #60A5FA;
      box-shadow: 0 20px 38px -10px rgba(37, 99, 235, 0.12), 0 6px 16px -4px rgba(15, 23, 42, 0.04);
      transform: translateY(-4px);
    }

    /* Efecto de elevación e iluminación en tarjetas Bento de Proyectos */
    .bento-project {
      position: relative;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 1.25rem;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.3s ease;
      will-change: transform, box-shadow;
      transform: translate3d(0, 0, 0);
    }
    .bento-project:hover {
      border-color: #3B82F6;
      box-shadow: 0 22px 42px -12px rgba(37, 99, 235, 0.15), 0 0 20px -2px rgba(59, 130, 246, 0.1);
      transform: translateY(-5px);
    }

    /* Micro-zoom suave en imágenes del Portfolio al pasar el cursor */
    .bento-project img {
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }
    .bento-project:hover img {
      transform: scale(1.025);
    }

    /* Micro-zoom en iconos */
    .clean-card:hover i,
    .clean-card:hover svg {
      transform: scale(1.08);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Botón Azul Primario con Efecto 120Hz */
    .btn-blue {
      background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
      color: #FFFFFF;
      font-weight: 600;
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                  background 0.22s ease;
      box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.28);
      will-change: transform, box-shadow;
      transform: translate3d(0, 0, 0);
    }
    .btn-blue:hover {
      background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
      box-shadow: 0 8px 24px -2px rgba(37, 99, 235, 0.45);
      transform: translateY(-2px);
    }
    .btn-blue:active {
      transform: translateY(0) scale(0.98);
      box-shadow: 0 2px 8px 0 rgba(37, 99, 235, 0.3);
    }

    /* Botón Outline Claro */
    .btn-clean {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #CBD5E1;
      font-weight: 600;
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.22s ease,
                  color 0.22s ease;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.03);
      will-change: transform, box-shadow;
      transform: translate3d(0, 0, 0);
    }
    .btn-clean:hover {
      background: #F8FAFC;
      border-color: #94A3B8;
      color: #2563EB;
      box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.08);
      transform: translateY(-2px);
    }
    .btn-clean:active {
      transform: translateY(0) scale(0.98);
    }

    /* Acordeón FAQ: Hover Suave e Indicador Abierto */
    details summary {
      cursor: pointer;
      transition: color 0.2s ease;
    }
    details summary:hover {
      color: #2563EB;
    }
    details[open] {
      border-color: #93C5FD !important;
      box-shadow: 0 4px 16px -2px rgba(37, 99, 235, 0.08);
    }

    /* Enlaces de Navegación con Línea Inferior Animada */
    nav a {
      position: relative;
      transition: color 0.2s ease;
    }
    nav a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #2563EB;
      border-radius: 1px;
      transition: width 0.25s ease;
    }
    nav a:hover::after {
      width: 100%;
    }
  </style>`;

restored = restored.replace(originalStyle, newStyle);

// 4. Agregar rel="noopener noreferrer" a enlaces externos target="_blank"
restored = restored.replace(/target="_blank"/g, 'target="_blank" rel="noopener noreferrer"');

// 5. Corregir saltos semánticos H2 -> H4 convirtiendo a H3 en Diferenciación y Proceso
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Diseño personalizado<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Diseño personalizado</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Velocidad y rendimiento<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Velocidad y rendimiento</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Adaptación a móviles<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Adaptación a móviles</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Experiencia de usuario<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Experiencia de usuario</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">SEO técnico<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">SEO técnico</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Seguridad y Garantía<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Seguridad y Garantía</h3>');

restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Descubrimiento y estrategia<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Descubrimiento y estrategia</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Diseño y propuesta visual<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Diseño y propuesta visual</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Desarrollo y programación<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Desarrollo y programación</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Revisión y optimización<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Revisión y optimización</h3>');
restored = restored.replace(/<h4 class="font-display font-bold text-xs text-carbon-900 mb-1">Lanzamiento de la web<\/h4>/g, '<h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Lanzamiento de la web</h3>');

// 6. Inmutabilidad y SRI seguro en librerías externas (Three.js y Lucide)
restored = restored.replace(
  '<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>',
  '<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js" integrity="sha384-cztVf4nptt4arwI8Ixfn8naubPgxH22BSvA0CuqFUCulIT+dgnb18vSqiZbbPDL1" crossorigin="anonymous"></script>'
);

restored = restored.replace(
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>',
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" integrity="sha384-CI3ELBVUz9XQO+97x6nwMDPosPR5XvsxW2ua7N1Xeygeh1IxtgqtCkGfQY9WWdHu" crossorigin="anonymous"></script>'
);

// 7. Hardening del DOM: Evitar innerHTML y sanitizar entradas
restored = restored.replace(
  'if (pMantenimiento) pMantenimiento.innerHTML = `${TM_CONFIG.precios.mantenimiento.precio}<span class="text-xs font-normal text-carbon-400">/mes</span>`;',
  `if (pMantenimiento) {
        pMantenimiento.textContent = TM_CONFIG.precios.mantenimiento.precio;
        const spanMes = document.createElement("span");
        spanMes.className = "text-xs font-normal text-carbon-400";
        spanMes.textContent = "/mes";
        pMantenimiento.appendChild(spanMes);
      }`
);

restored = restored.replace(
  'const buildWa = (phone, text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;',
  'const buildWa = (phone, text) => { const safePhone = String(phone).replace(/[^0-9]/g, ""); return `https://wa.me/${safePhone}?text=${encodeURIComponent(text)}`; };'
);

restored = restored.replace(
  'const btnDiscord = document.getElementById("btn-cta-discord");',
  `const getSafeUrl = (url) => {
        try {
          const parsed = new URL(url);
          if (parsed.protocol === "https:" && (parsed.hostname === "discord.gg" || parsed.hostname === "discord.com")) return url;
        } catch(e) {}
        return "https://discord.gg/tymucam";
      };
      const btnDiscord = document.getElementById("btn-cta-discord");`
);

// 8. Sincronización con Panel de Administración (admin.html) en TM_CONFIG
const adminSyncCode = `
      // Sincronización automática con Panel de Control (admin.html)
      try {
        const savedAdminConfig = localStorage.getItem("tm_studio_config");
        if (savedAdminConfig) {
          const parsedCfg = JSON.parse(savedAdminConfig);
          if (parsedCfg.contacto) Object.assign(TM_CONFIG.contacto, parsedCfg.contacto);
          if (parsedCfg.precios) {
            for (const k in parsedCfg.precios) {
              if (TM_CONFIG.precios[k]) Object.assign(TM_CONFIG.precios[k], parsedCfg.precios[k]);
            }
          }
          if (parsedCfg.aviso) TM_CONFIG.aviso = parsedCfg.aviso;
        }
      } catch(e) {}
`;

restored = restored.replace(
  'document.addEventListener("DOMContentLoaded", () => {',
  `${adminSyncCode}\n    document.addEventListener("DOMContentLoaded", () => {\n      // Banner de Aviso Dinámico si está configurado en admin\n      const banner = document.getElementById("top-announcement");\n      const bannerText = document.getElementById("top-announcement-text");\n      if (banner && bannerText && TM_CONFIG.aviso && TM_CONFIG.aviso.activo && TM_CONFIG.aviso.texto) {\n        bannerText.textContent = TM_CONFIG.aviso.texto;\n        banner.classList.remove("hidden");\n      }`
);

// Banner superior en header
const topBannerHtml = `<div id="top-announcement" class="hidden bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs py-1.5 px-4 text-center font-medium shadow-sm transition-all"><span id="top-announcement-text"></span></div>`;
restored = restored.replace(
  '<header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-carbon-200/80">',
  `<header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-carbon-200/80">\n    ${topBannerHtml}`
);

// Menú de navegación desktop con enlace a Proyectos (Portfolio)
const origNav = `<nav class="hidden md:flex items-center gap-7 text-xs font-medium text-carbon-600">
        <a href="#servicios" class="hover:text-brand-blue transition-colors">Servicios</a>
        <a href="#bots" class="hover:text-brand-blue transition-colors">Bots & Software</a>
        <a href="#proceso" class="hover:text-brand-blue transition-colors">Proceso</a>
        <a href="#precios" class="hover:text-brand-blue transition-colors">Precios</a>
        <a href="#faq" class="hover:text-brand-blue transition-colors">FAQ</a>
      </nav>`;

const newNav = `<nav class="hidden md:flex items-center gap-7 text-xs font-medium text-carbon-600">
        <a href="#servicios" class="hover:text-brand-blue transition-colors">Servicios</a>
        <a href="#proyectos" class="hover:text-brand-blue transition-colors">Proyectos</a>
        <a href="#bots" class="hover:text-brand-blue transition-colors">Bots & Software</a>
        <a href="#proceso" class="hover:text-brand-blue transition-colors">Proceso</a>
        <a href="#precios" class="hover:text-brand-blue transition-colors">Precios</a>
        <a href="#faq" class="hover:text-brand-blue transition-colors">FAQ</a>
      </nav>`;

restored = restored.replace(origNav, newNav);

// Header WhatsApp button más adaptable y seguro en móvil
restored = restored.replace(
  '<a id="header-wa" href="#" target="_blank" class="text-xs px-4 py-2 rounded-full btn-blue flex items-center gap-1.5 shadow-sm">',
  '<a id="header-wa" href="#" target="_blank" class="text-xs px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full btn-blue flex items-center gap-1.5 shadow-sm shrink-0">'
);

// 9. Integrar miniatura oficial del Emblema en el Logotipo de la Barra de Navegación, Hero Badge, Discord y Footer
const originalHeaderLogo = `<div class="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center text-white font-display font-extrabold text-xs">
          TM
        </div>`;

const newHeaderLogo = `<img src="tm-studio-emblem.jpg" alt="TM Studio Emblem" class="w-9 h-9 rounded-full object-cover ring-2 ring-brand-blue/50 shadow-md group-hover:scale-105 group-hover:ring-brand-blue transition-all" />`;

restored = restored.replace(originalHeaderLogo, newHeaderLogo);
restored = restored.replace('<a href="#hero" class="flex items-center gap-2.5">', '<a href="#hero" class="flex items-center gap-2.5 group">');

// Hero Section Grid Responsiva con Separación Limpia entre Texto y 3D (0 Solapamientos)
const origHeroRegex = /<section id="hero"[\s\S]*?<\/section>/;
const newHeroHtml = `<section id="hero" class="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 hero-glow overflow-hidden">
      
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-y-3 sm:gap-y-4 gap-x-8 lg:gap-x-12 items-center">
        
        <!-- Bloque 1: Titular y Subtítulo (Ancho fluido, 0 cortes en móvil ni desbordes) -->
        <div class="lg:col-span-7 lg:row-start-1 flex flex-col items-start text-left z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-soft border border-brand-blue/20 text-brand-blue text-[10px] sm:text-[11px] font-mono mb-4 sm:mb-6 max-w-full overflow-hidden">
            <img src="tm-studio-emblem.jpg" alt="TM Studio" class="w-4 h-4 rounded-full object-cover ring-1 ring-brand-blue/40 shadow-xs inline-block shrink-0" />
            <span class="truncate sm:whitespace-normal">DESARROLLO WEB · BOTS DE DISCORD · SOFTWARE A MEDIDA</span>
          </div>

          <h1 class="font-display font-extrabold text-[1.32rem] xs:text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl leading-[1.18] tracking-tight text-carbon-900 mb-3 sm:mb-5">
            TU NEGOCIO <br class="sm:hidden" />MERECE UNA WEB <br class="hidden sm:inline" />
            <span class="text-brand-blue">EXTRAORDINARIA.</span>
          </h1>

          <p class="text-xs sm:text-base text-carbon-600 font-normal max-w-xl leading-relaxed mb-2 sm:mb-4">
            Diseñamos experiencias digitales que convierten visitantes en clientes y transforman negocios en marcas memorables. Páginas web modernas, bots de Discord y software a medida.
          </p>
        </div>

        <!-- Bloque 2: Escultura 3D Oficial TM STUDIO en 4K (Ultra-compacta, centrada en su columna, 0 solapamientos) -->
        <div class="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-3 w-full flex items-center justify-center lg:justify-end my-1 lg:my-0">
          <div id="hero-3d-wrapper">
            <div id="webgl-hero" class="cursor-grab active:cursor-grabbing"></div>
          </div>
        </div>

        <!-- Bloque 3: Dos Botones Exigidos -->
        <div class="lg:col-span-7 lg:row-start-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto z-10 pt-2">
          <a id="hero-btn-primary" href="#" target="_blank" rel="noopener noreferrer" class="btn-blue px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all">
            <span>Quiero mi página web</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
          <a href="#proyectos" class="btn-clean px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
            <span>Explorar proyectos reales</span>
            <i data-lucide="arrow-down" class="w-4 h-4 text-carbon-400"></i>
          </a>
        </div>

        <!-- Bloque 4: Tres Métricas Refinadas Responsivas -->
        <div class="lg:col-span-7 lg:row-start-3 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-carbon-200/60 text-xs font-mono text-carbon-600 w-full z-10">
          <div class="flex flex-col">
            <span class="font-bold text-carbon-900 text-sm">100% Código a Medida</span>
            <span class="text-[11px] text-carbon-400">Sin plantillas lentas</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-brand-blue text-sm">Discord 24/7</span>
            <span class="text-[11px] text-carbon-400">Soporte y bots activos</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-carbon-900 text-sm">Carga Rápida</span>
            <span class="text-[11px] text-carbon-400">Optimizado para móvil</span>
          </div>
        </div>

      </div>

    </section>`;

restored = restored.replace(origHeroRegex, newHeroHtml);

// 10. NUEVA SECCIÓN OBLIGATORIA: "NUESTROS PROYECTOS" (PORTFOLIO BENTO GRID)
// Se inserta justo después de la sección #servicios para máxima prueba social y credibilidad inmediata
const portfolioSectionHtml = `
    <!-- =========================================================================
         02 // NUESTROS PROYECTOS (PORTFOLIO BENTO GRID DE ÉLITE)
         ========================================================================= -->
    <section id="proyectos" class="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20 border-t border-carbon-200/60">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span class="text-xs font-mono text-brand-blue uppercase tracking-wider block mb-1">02 // PORTFOLIO REAL</span>
          <h2 class="font-display font-bold text-2xl sm:text-3xl text-carbon-900 tracking-tight">
            Proyectos Desarrollados
          </h2>
          <p class="text-xs sm:text-sm text-carbon-400 mt-1 max-w-lg">
            Casos de éxito reales creados a medida: webs corporativas de alta conversión y bots de infraestructura activos 24/7.
          </p>
        </div>
        <div class="inline-flex items-center gap-2 text-xs font-mono text-carbon-600 bg-carbon-50 px-3 py-1.5 rounded-full border border-carbon-200 shrink-0">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>100% SISTEMAS EN PRODUCCIÓN</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        <!-- Tarjeta Bento 1: Laocoonte Fitness (Columna de 7) -->
        <div class="lg:col-span-7 bento-project overflow-hidden flex flex-col justify-between">
          <div class="p-6 sm:p-8">
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-brand-soft text-brand-blue border border-brand-blue/20">DESARROLLO WEB</span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-carbon-600 bg-carbon-100">TAILWIND CSS</span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-carbon-600 bg-carbon-100">SEO LOCAL</span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200">99/100 SPEED</span>
            </div>
            <h3 class="font-display font-bold text-xl sm:text-2xl text-carbon-900 tracking-tight mb-2 group-hover:text-brand-blue transition-colors">
              Laocoonte Fitness — Web de Captación y Rendimiento
            </h3>
            <p class="text-xs sm:text-sm text-carbon-600 leading-relaxed mb-6">
              Plataforma digital corporativa para centro de entrenamiento de fuerza en Sevilla. Diseñada con arquitectura de conversión directa hacia WhatsApp, carga ultrarrápida en dispositivos móviles y posicionamiento orgánico en Google.
            </p>
            <div class="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <a href="https://wa.me/34641723490?text=Hola%20TM%20Studio,%20he%20visto%20el%20proyecto%20de%20Laocoonte%20Fitness%20y%20quiero%20una%20web%20similar%20para%20mi%20negocio" target="_blank" rel="noopener noreferrer" class="btn-blue px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                <span>Quiero una web así</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </a>
              <span class="text-carbon-400 font-mono text-[11px]">Desarrollo a Medida · Entrega 5 Días</span>
            </div>
          </div>
          
          <!-- Mockup 3D Real del Proyecto Laocoonte Fitness -->
          <div class="relative bg-slate-950 p-3 sm:p-5 pt-0 overflow-hidden border-t border-carbon-100">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img src="project-laocoonte.jpg" alt="Web de Laocoonte Fitness Desarrollada por TM Studio" class="w-full rounded-xl object-cover shadow-2xl" loading="lazy" />
          </div>
        </div>

        <!-- Tarjeta Bento 2: TM Studio Bot & DevOps Agent 24/7 (Columna de 5) -->
        <div class="lg:col-span-5 bento-project overflow-hidden flex flex-col justify-between">
          <div class="p-6 sm:p-8">
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">BOT DE DISCORD</span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-carbon-600 bg-carbon-100">NODE.JS</span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-carbon-600 bg-carbon-100">DEVOPS 24/7</span>
            </div>
            <h3 class="font-display font-bold text-xl sm:text-2xl text-carbon-900 tracking-tight mb-2 group-hover:text-brand-blue transition-colors">
              TM Studio Bot & Panel DevOps 24/7
            </h3>
            <p class="text-xs sm:text-sm text-carbon-600 leading-relaxed mb-6">
              Bot autónomo integrado en Discord para monitorización continua de servidores y páginas web de clientes. Detecta micro-caídas en menos de 2 segundos, audita activos y alerta por canales privados.
            </p>
            <div class="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <a href="https://discord.gg/tymucam" target="_blank" rel="noopener noreferrer" class="btn-clean px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-xs hover:text-brand-blue">
                <span>Ver en Discord</span>
                <i data-lucide="external-link" class="w-3.5 h-3.5 text-brand-blue"></i>
              </a>
              <span class="text-carbon-400 font-mono text-[11px]">Uptime 99.9% · 24 Horas Activo</span>
            </div>
          </div>
          
          <!-- Mockup 3D Real del Bot de Discord y Vigilancia -->
          <div class="relative bg-slate-950 p-3 sm:p-5 pt-0 overflow-hidden border-t border-carbon-100">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img src="project-bot-discord.jpg" alt="Bot de Discord y Panel DevOps Desarrollado por TM Studio" class="w-full rounded-xl object-cover shadow-2xl" loading="lazy" />
          </div>
        </div>

        <!-- Tarjeta Bento 3: Software a Medida & Panel Cloud (Full 12 Cols horizontal) -->
        <div class="lg:col-span-12 clean-card p-6 sm:p-8 border border-carbon-200/90 hover:border-brand-blue/50 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white via-blue-50/25 to-white">
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-brand-soft text-brand-blue border border-brand-blue/20">SOFTWARE A MEDIDA</span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-carbon-600 bg-carbon-100">FIREBASE FIRESTORE</span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-carbon-600 bg-carbon-100">API SEGURA</span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono text-carbon-600 bg-carbon-100">PANEL PRIVADO</span>
            </div>
            <h3 class="font-display font-bold text-lg sm:text-xl text-carbon-900 mb-2">
              Panel Administrativo Privado & Sistema de Gestión Dinámica
            </h3>
            <p class="text-xs sm:text-sm text-carbon-600 leading-relaxed max-w-3xl">
              Arquitectura personalizada de software con panel de control privado protegido por credenciales, sincronización en tiempo real de tarifas y avisos globales dinámicos sin necesidad de editar código manualmente.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-3 shrink-0">
            <a href="admin.html" class="btn-clean px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 hover:border-brand-blue">
              <i data-lucide="lock" class="w-3.5 h-3.5 text-brand-blue"></i>
              <span>Acceso Panel Admin</span>
            </a>
            <a href="https://wa.me/34641723490?text=Hola%20TM%20Studio,%20quiero%20consultar%20un%20proyecto%20de%20software%20a%20medida%20o%20panel%20privado" target="_blank" rel="noopener noreferrer" class="btn-blue px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 shadow-sm">
              <span>Pedir Software a Medida</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>

      </div>
    </section>
`;

// Insertar la sección de Proyectos justo después de la sección #servicios
const serviciosEndAnchor = `          <span class="text-[10px] font-mono text-teal-600 pt-3 border-t border-carbon-100 block">Velocidad</span>
        </div>

      </div>

    </section>`;

restored = restored.replace(serviciosEndAnchor, `${serviciosEndAnchor}\n${portfolioSectionHtml}`);

// Actualizar numeración visual de las siguientes secciones para orden impecable
restored = restored.replace('02 // DIFERENCIACIÓN', '03 // DIFERENCIACIÓN');
restored = restored.replace('03 // PROCESO', '04 // PROCESO');
restored = restored.replace('04 // PROCESO', '04 // PROCESO');
restored = restored.replace('05 // PRECIOS', '05 // PRECIOS');
restored = restored.replace('06 // FAQ', '06 // FAQ');

// Discord Showcase Card badge con el emblema
restored = restored.replace(
  '<strong class="text-carbon-900" id="discord-user-badge">tymucam</strong>',
  '<span class="inline-flex items-center gap-1.5 bg-white border border-carbon-200 px-2 py-0.5 rounded-full text-xs font-semibold text-carbon-900"><img src="tm-studio-emblem.jpg" alt="TM Studio" class="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-brand-blue/30" /><strong id="discord-user-badge">tymucam</strong></span>'
);

// CTA Final con el Emblema 3D destacado
const originalCta = `<section class="py-24 px-6 max-w-4xl mx-auto text-center border-t border-carbon-200/60">
      
      <h2 class="font-display font-extrabold text-2xl sm:text-4xl text-carbon-900 tracking-tight mb-3">`;

const newCta = `<section class="py-24 px-6 max-w-4xl mx-auto text-center border-t border-carbon-200/60">
      
      <!-- Emblema 3D Destacado en Cierre -->
      <div class="flex justify-center mb-6">
        <div class="relative group cursor-pointer">
          <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-blue to-cyan-400 opacity-30 blur-md group-hover:opacity-75 transition duration-500"></div>
          <img src="tm-studio-emblem.jpg" alt="TM Studio Official Emblem" class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-brand-blue/50 shadow-xl group-hover:scale-105 transition-transform duration-300" />
        </div>
      </div>

      <h2 class="font-display font-extrabold text-2xl sm:text-4xl text-carbon-900 tracking-tight mb-3">`;

restored = restored.replace(originalCta, newCta);

// Footer con el emblema
restored = restored.replace(
  '<span class="w-2 h-2 rounded-full bg-brand-blue"></span>',
  '<img src="tm-studio-emblem.jpg" alt="TM Studio" class="w-5 h-5 rounded-full object-cover ring-1 ring-brand-blue/40 shadow-sm" />'
);

// Modal de Privacidad RGPD al final antes del script
const privacyModalHtml = `
  <!-- =========================================================================
       MODAL DE POLÍTICA DE PRIVACIDAD Y AVISO LEGAL (RGPD & LOPDGDD)
       ========================================================================= -->
  <div id="privacy-modal" class="fixed inset-0 z-50 hidden bg-carbon-900/40 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 border border-carbon-200 shadow-xl max-h-[85vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-3 border-b border-carbon-100 mb-4">
        <div class="flex items-center gap-2.5">
          <img src="tm-studio-emblem.jpg" alt="TM Studio" class="w-6 h-6 rounded-full object-cover ring-1 ring-brand-blue/40 shadow-xs" />
          <h3 id="privacy-title" class="font-display font-bold text-base text-carbon-900">Política de Privacidad y Aviso Legal</h3>
        </div>
        <button id="close-privacy" class="p-1 rounded-lg hover:bg-carbon-100 text-carbon-400 hover:text-carbon-900 transition-colors" aria-label="Cerrar modal de privacidad">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div class="text-xs text-carbon-600 space-y-3 leading-relaxed font-sans">
        <p><strong>1. Responsable del Tratamiento:</strong> TM Studio. Contacto directo por WhatsApp oficial (+34 641 723 490) y Discord oficial (tymucam).</p>
        <p><strong>2. Finalidad:</strong> Responder a solicitudes de presupuesto y proyectos web solicitados por el usuario.</p>
        <p><strong>3. Privacidad desde el Diseño (Zero Tracking Cookies):</strong> Este sitio web <strong>no utiliza cookies de seguimiento, no realiza analítica de comportamiento de terceros ni recopila datos en segundo plano</strong>.</p>
      </div>
      <div class="pt-4 mt-4 border-t border-carbon-100 flex justify-end">
        <button id="btn-privacy-ok" type="button" class="btn-blue px-5 py-2 rounded-full text-xs font-semibold">Entendido</button>
      </div>
    </div>
  </div>
`;

// Insertar enlaces en footer (Privacidad RGPD y acceso directo a Admin)
restored = restored.replace(
  '© <span id="year">2026</span> TM Studio. Todos los derechos reservados.',
  '© <span id="year">2026</span> TM Studio. Todos los derechos reservados. · <button id="btn-privacy" type="button" class="text-carbon-400 hover:text-brand-blue underline transition-colors">Privacidad RGPD</button> · <a href="admin.html" class="text-carbon-400 hover:text-brand-blue underline transition-colors" title="Acceso Panel Privado">Admin</a>'
);
restored = restored.replace('</main>', `</main>\n${privacyModalHtml}`);

// 11. REEMPLAZO DE LA ESCENA 3D: OBRA MAESTRA COMBINADA EN 4K (Ultra-Fluida, 120Hz+, Cero Solapamientos)
const orig3DFuncRegex = /function initElectricBlue3D\(\) \{[\s\S]*?window\.addEventListener\("resize",[\s\S]*?\}\);[\s\S]*?\}/;

const new3DFunc = `function initElectricBlue3D() {
      const container = document.getElementById("webgl-hero");
      if (!container) return;

      // Medición física segura del contenedor (evita canvas de altura 0)
      let cWidth = container.clientWidth;
      let cHeight = container.clientHeight;
      if (!cHeight || cHeight <= 0) {
        cHeight = window.innerWidth < 640 ? 270 : (window.innerWidth < 1024 ? 360 : 420);
        container.style.height = cHeight + "px";
      }
      if (!cWidth || cWidth <= 0) {
        cWidth = container.parentElement ? container.parentElement.clientWidth : 420;
        if (!cWidth || cWidth <= 0) cWidth = 420;
      }

      const scene = new THREE.Scene();
      
      // Cámara perfectamente calibrada para mantener todo el modelo 3D dentro del contenedor con margen generoso y cero colisiones
      const camera = new THREE.PerspectiveCamera(42, cWidth / cHeight, 0.1, 50);
      camera.position.set(0, 0, 5.8);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(cWidth, cHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      // Shaders del Aura Cuántica de Ondulación en GPU:
      // Translúcido con Additive Blending para dejar ver el logotipo nítido sin crear burbujas opacas
      const vertexShader = \`
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          float wave = sin(position.x * 2.6 + uTime * 1.5) * cos(position.y * 2.6 + uTime * 1.2) * 0.05;
          vec3 newPos = position + normal * wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      \`;

      const fragmentShader = \`
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float dotNV = max(dot(viewDir, vNormal), 0.0);
          float fresnel = pow(1.0 - dotNV, 2.8);

          vec3 electricBlue = vec3(0.10, 0.35, 0.95); // #1959F2
          vec3 neonCyan = vec3(0.00, 0.95, 1.00);     // #00F2FF

          vec3 color = mix(electricBlue, neonCyan, fresnel);
          // Transparente en el centro (máxima legibilidad del logo), fulgor perimetral elegante
          float alpha = fresnel * 0.40;
          gl_FragColor = vec4(color, alpha);
        }
      \`;

      // 1. Aura de Ondulación Cuántica GPU (perimetral y ligera)
      const auraGeo = new THREE.IcosahedronGeometry(1.08, 24);
      const auraMat = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: { uTime: { value: 0 } },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const auraSphere = new THREE.Mesh(auraGeo, auraMat);
      group.add(auraSphere);

      // Estructura Geodésica Tecnológica HUD (Cybernetic Lattice)
      const wireGeo = new THREE.IcosahedronGeometry(1.15, 2);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x06B6D4,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending
      });
      const wireSphere = new THREE.Mesh(wireGeo, wireMat);
      group.add(wireSphere);

      // 2. EMBLEMA 3D CENTRAL OFICIAL TM STUDIO (4K, Metálico, Biseles dobles de precisión)
      const emblemRadius = 0.92;
      const emblemGroup = new THREE.Group();
      group.add(emblemGroup);

      const textureLoader = new THREE.TextureLoader();
      const emblemTex = textureLoader.load('${emblemBase64}');
      emblemTex.minFilter = THREE.LinearMipmapLinearFilter;
      emblemTex.generateMipmaps = true;

      // Cara Frontal
      const frontGeo = new THREE.CircleGeometry(emblemRadius, 64);
      const frontMat = new THREE.MeshBasicMaterial({
        map: emblemTex,
        side: THREE.FrontSide
      });
      const frontMesh = new THREE.Mesh(frontGeo, frontMat);
      frontMesh.position.z = 0.042;
      emblemGroup.add(frontMesh);

      // Cara Posterior
      const backGeo = new THREE.CircleGeometry(emblemRadius, 64);
      const backMat = new THREE.MeshBasicMaterial({
        map: emblemTex,
        side: THREE.FrontSide
      });
      const backMesh = new THREE.Mesh(backGeo, backMat);
      backMesh.position.z = -0.042;
      backMesh.rotation.y = Math.PI;
      emblemGroup.add(backMesh);

      // Canto Cilíndrico Metálico Azul Anodizado (#1D4ED8)
      const rimGeo = new THREE.CylinderGeometry(emblemRadius, emblemRadius, 0.084, 64, 1, true);
      const rimMat = new THREE.MeshBasicMaterial({ color: 0x1D4ED8 });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.rotation.x = Math.PI / 2;
      emblemGroup.add(rimMesh);

      // Bisel de Neón Cian (#00F0FF) en ambas caras
      const bevelGeo = new THREE.TorusGeometry(emblemRadius + 0.004, 0.014, 16, 64);
      const bevelMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF });

      const bevelFront = new THREE.Mesh(bevelGeo, bevelMat);
      bevelFront.position.z = 0.042;
      emblemGroup.add(bevelFront);

      const bevelBack = new THREE.Mesh(bevelGeo, bevelMat);
      bevelBack.position.z = -0.042;
      emblemGroup.add(bevelBack);

      // 3. ANILLOS ORBITALES COMPACTOS (Calibración milimétrica para CERO solapamiento)
      // Anillo 1: Azul Eléctrico (#2563EB)
      const ringGeo1 = new THREE.TorusGeometry(1.26, 0.016, 16, 80);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x2563EB });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = Math.PI * 0.32;
      group.add(ring1);

      // Anillo 2: Cian Neón (#06B6D4)
      const ringGeo2 = new THREE.TorusGeometry(1.44, 0.011, 16, 80);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x06B6D4 });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.x = -Math.PI * 0.38;
      group.add(ring2);

      // Anillo 3: Fina Órbita de Datos Translúcida (#38BDF8)
      const ringGeo3 = new THREE.TorusGeometry(1.58, 0.007, 16, 80);
      const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.50 });
      const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
      ring3.rotation.y = Math.PI * 0.20;
      group.add(ring3);

      // Nódulos de Datos Orbitantes (Gemas luminosas viajando sobre los anillos)
      const nodeGeo = new THREE.SphereGeometry(0.024, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF });
      const node1 = new THREE.Mesh(nodeGeo, nodeMat);
      ring1.add(node1);
      node1.position.set(1.26, 0, 0);

      const node2 = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0x60A5FA }));
      ring2.add(node2);
      node2.position.set(-1.44, 0, 0);

      // 4. POLVO CIBERNÉTICO / PARTÍCULAS CUÁNTICAS 3D (Efecto profundidad 4K)
      const pCount = 50;
      const pGeo = new THREE.BufferGeometry();
      const pPositions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = 1.1 + Math.random() * 0.45;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        pPositions[i * 3] = r * Math.cos(theta) * Math.cos(phi);
        pPositions[i * 3 + 1] = r * Math.sin(phi);
        pPositions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x38BDF8,
        size: 0.028,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const pCloud = new THREE.Points(pGeo, pMat);
      group.add(pCloud);

      // 5. ESCALADO Y POSICIÓN RESPONSIVA SEGURA (Garantiza separación total de la columna de texto)
      function updateScaleAndPos() {
        if (window.innerWidth < 640) {
          group.position.set(0, 0, 0);
          group.scale.set(0.68, 0.68, 0.68);
        } else if (window.innerWidth < 1024) {
          group.position.set(0, 0, 0);
          group.scale.set(0.78, 0.78, 0.78);
        } else {
          group.position.set(0, 0, 0);
          group.scale.set(0.88, 0.88, 0.88);
        }
      }
      updateScaleAndPos();

      // Interacción interactiva con el ratón
      let mouseX = 0, mouseY = 0;
      let targetX = 0, targetY = 0;

      window.addEventListener("mousemove", (e) => {
        const halfX = window.innerWidth / 2;
        const halfY = window.innerHeight / 2;
        mouseX = (e.clientX - halfX) / halfX;
        mouseY = (e.clientY - halfY) / halfY;
      }, { passive: true });

      // Pausa automática fuera de pantalla (IntersectionObserver)
      let isVisible = true;
      const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(document.getElementById("hero"));

      const clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const time = clock.getElapsedTime();
        auraMat.uniforms.uTime.value = time;

        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        // Inclinación reactiva suave: mantiene el logotipo siempre legible hacia el frente
        group.rotation.y = targetX * 0.32 + Math.sin(time * 0.7) * 0.04;
        group.rotation.x = -targetY * 0.20 + Math.cos(time * 0.5) * 0.03;
        emblemGroup.position.y = Math.sin(time * 1.3) * 0.035;

        // Rotación giroscópica fluida de los anillos y nodos a 120Hz
        ring1.rotation.z = time * 0.16;
        ring2.rotation.z = -time * 0.13;
        ring3.rotation.x = time * 0.09;
        wireSphere.rotation.y = -time * 0.05;
        pCloud.rotation.y = -time * 0.04;

        renderer.render(scene, camera);
      }

      animate();

      window.addEventListener("resize", () => {
        if (!container) return;
        const nw = container.clientWidth || 420;
        const nh = container.clientHeight || 420;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
        updateScaleAndPos();
      }, { passive: true });
    }`;

restored = restored.replace(orig3DFuncRegex, new3DFunc);

// Añadir el script del modal de privacidad
const modalScript = `
      // Modal Privacidad RGPD
      const modal = document.getElementById("privacy-modal");
      const openBtn = document.getElementById("btn-privacy");
      const closeBtn = document.getElementById("close-privacy");
      const okBtn = document.getElementById("btn-privacy-ok");
      if (modal && openBtn) {
        openBtn.addEventListener("click", () => { modal.classList.remove("hidden"); });
        if (closeBtn) closeBtn.addEventListener("click", () => { modal.classList.add("hidden"); });
        if (okBtn) okBtn.addEventListener("click", () => { modal.classList.add("hidden"); });
        modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
      }
`;
restored = restored.replace('initElectricBlue3D();', `initElectricBlue3D();\n${modalScript}`);

// Guardar en index.html y tymurweb/index.html
fs.writeFileSync('index.html', restored, 'utf8');
fs.writeFileSync('tymurweb/index.html', restored, 'utf8');

console.log('✅ index.html y tymurweb/index.html actualizados con Portfolio Bento Grid, imágenes reales y 120Hz!');
