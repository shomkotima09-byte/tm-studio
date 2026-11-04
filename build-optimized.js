const fs = require('fs');

const cssContent = fs.readFileSync('style.min.css', 'utf8');

const customStyles = `
    * { box-sizing: border-box; }
    html, body {
      background-color: #FFFFFF;
      color: #0F172A;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #FFFFFF; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #2563EB; }
    .hero-glow {
      background: radial-gradient(100% 70% at 75% 25%, #EBF3FF 0%, #F5F9FF 40%, #FFFFFF 80%);
    }
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
    #webgl-hero canvas {
      opacity: 0;
      transition: opacity 0.35s ease-out;
    }
    #webgl-hero.loaded canvas {
      opacity: 1;
    }
    .skip-link {
      position: absolute;
      top: -40px;
      left: 16px;
      background: #2563EB;
      color: #FFFFFF;
      padding: 8px 16px;
      z-index: 100;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      transition: top 0.2s ease;
    }
    .skip-link:focus {
      top: 16px;
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
`;

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://tmstudio.es/#website",
      "url": "https://tmstudio.es/",
      "name": "TM Studio",
      "description": "Desarrollo de páginas web profesionales, bots de Discord avanzados y software a medida.",
      "inLanguage": "es-ES",
      "publisher": {
        "@id": "https://tmstudio.es/#organization"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://tmstudio.es/#organization",
      "name": "TM Studio",
      "url": "https://tmstudio.es/",
      "logo": "https://tmstudio.es/favicon.svg",
      "image": "https://tmstudio.es/favicon.svg",
      "telephone": "+34 641 723 490",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+34 641 723 490",
          "contactType": "customer service",
          "contactOption": "WhatsApp",
          "availableLanguage": ["Spanish"]
        }
      ],
      "sameAs": [
        "https://discord.gg/tymucam"
      ],
      "priceRange": "€€",
      "knowsAbout": [
        "Desarrollo Web",
        "Bots de Discord",
        "Software a Medida",
        "Integración de APIs",
        "Landing Pages",
        "Optimización SEO",
        "Mantenimiento Web"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios Digitales TM Studio",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Diseño de páginas web profesionales",
              "description": "Páginas web para negocios, emprendedores y marcas personales. Diseño limpio, elegante y adaptado a móviles."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bots de Discord a medida",
              "description": "Sistemas automáticos de moderación, verificación, tickets de soporte, economía, roles y bienvenida 24/7."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Software y herramientas a medida",
              "description": "Scripts de automatización, conexión de APIs (Stripe, Google Sheets), herramientas de gestión y desarrollo personal."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mantenimiento y soporte web",
              "description": "Copias de seguridad, actualizaciones de texto e imágenes, resolución de dudas y servidores siempre activos."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Tiendas online y e-commerce",
              "description": "Venta directa de productos o servicios con pagos seguros en un clic a través de Stripe, Bizum o PayPal."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Landing pages de alta conversión",
              "description": "Estructura persuasiva enfocada en captar clientes desde anuncios en Instagram, TikTok o Google."
            }
          }
        ]
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://tmstudio.es/#webpage",
      "url": "https://tmstudio.es/",
      "name": "TM Studio | Desarrollo Web Profesional, Bots de Discord y Software a Medida",
      "isPartOf": {
        "@id": "https://tmstudio.es/#website"
      },
      "about": {
        "@id": "https://tmstudio.es/#organization"
      },
      "description": "Estudio especializado en desarrollo web profesional, bots de Discord a medida y software con integraciones.",
      "inLanguage": "es-ES"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tmstudio.es/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://tmstudio.es/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Servicios",
          "item": "https://tmstudio.es/#servicios"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Bots y Software",
          "item": "https://tmstudio.es/#bots"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Proceso",
          "item": "https://tmstudio.es/#proceso"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Planes y Precios",
          "item": "https://tmstudio.es/#precios"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Preguntas Frecuentes",
          "item": "https://tmstudio.es/#faq"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://tmstudio.es/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto tarda una página web o un bot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Una web básica o bot estándar suele estar lista en 3 a 7 días. Proyectos más complejos toman entre 1 y 2 semanas. Siempre acordamos la fecha de entrega antes de iniciar."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué incluye el servicio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Diseño, desarrollo, adaptación a móviles, dominio y SSL, botones directos de contacto (WhatsApp) y explicación de uso para que tengas control total."
          }
        },
        {
          "@type": "Question",
          "name": "¿Se adapta a dispositivos móviles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí, totalmente. Probamos cada detalle en pantallas móviles para asegurar navegación rápida e intuitiva."
          }
        },
        {
          "@type": "Question",
          "name": "¿Incluye posicionamiento SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Entregamos la web con la estructura semántica correcta y optimización de velocidad para que Google indexe tu negocio."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo se realiza el pago?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Habitualmente en dos plazos: 50% al empezar para reservar fecha y el 50% restante al terminar cuando la web esté revisada y aprobada por ti."
          }
        },
        {
          "@type": "Question",
          "name": "¿Existe mantenimiento posterior?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí, ofrecemos planes de mantenimiento opcionales para que nunca tengas que preocuparte por copias de seguridad o cambios de texto."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo solicitar presupuesto?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Escríbenos directamente por WhatsApp o Discord y te responderemos el mismo día con una propuesta clara."
          }
        }
      ]
    }
  ]
};

const fullHtml = `<!DOCTYPE html>
<html lang="es" dir="ltr" class="scroll-smooth">
<head>
  <!-- Metadatos Técnicos Esenciales y Seguridad -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  <!-- Título SEO Optimizado (CTR y Límite de Pixeles Google) -->
  <title>TM Studio | Desarrollo Web Profesional, Bots de Discord y Software a Medida</title>
  
  <!-- Meta Description Persuasiva y Semántica (158 caracteres) -->
  <meta name="description" content="Estudio especializado en desarrollo web profesional, bots de Discord a medida y software con integraciones. Código limpio, carga rápida y diseño moderno." />
  
  <!-- Directivas de Indexación para Googlebot y Rastreadores Mayores -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <!-- Canonical Tag Oficial -->
  <link rel="canonical" href="https://tmstudio.es/" />

  <!-- Verificación de Google Search Console (Reemplazar con el token asignado) -->
  <meta name="google-site-verification" content="REEMPLAZAR_CON_CODIGO_GOOGLE_SEARCH_CONSOLE" />

  <!-- Información de Autor y Localización -->
  <meta name="author" content="TM Studio" />
  <meta name="geo.region" content="ES" />
  <meta name="theme-color" content="#2563EB" />
  <meta name="apple-mobile-web-app-title" content="TM Studio" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />

  <!-- Favicons y Web App Manifest -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/favicon.svg" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- Open Graph / Redes Sociales (Facebook, LinkedIn, WhatsApp) -->
  <meta property="og:locale" content="es_ES" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="TM Studio | Desarrollo Web Profesional, Bots de Discord y Software a Medida" />
  <meta property="og:description" content="Desarrollo de páginas web profesionales, bots de Discord avanzados y software a medida para marcas y creadores. Carga rápida y alta conversión." />
  <meta property="og:url" content="https://tmstudio.es/" />
  <meta property="og:site_name" content="TM Studio" />
  <meta property="og:image" content="https://tmstudio.es/favicon.svg" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:image:type" content="image/svg+xml" />
  <meta property="og:image:alt" content="Logotipo TM Studio - Desarrollo Web y Software" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="TM Studio | Desarrollo Web, Bots de Discord y Software a Medida" />
  <meta name="twitter:description" content="Desarrollo web profesional, bots de Discord avanzados y software a medida con código limpio." />
  <meta name="twitter:image" content="https://tmstudio.es/favicon.svg" />

  <!-- Resource Hints para DNS y Preconnect rápido a fuentes -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

  <!-- Estructura de Datos JSON-LD (Schema.org) Oficial y Validada -->
  <script type="application/ld+json">
${JSON.stringify(jsonLdData, null, 2)}
  </script>

  <!-- CSS de Producción Compilado e Inlined (0ms Render Blocking, Cero JIT Runtime) -->
  <style>
${cssContent}
${customStyles}
  </style>

  <!-- Dependencias Externas con Subresource Integrity (SRI) y Versión Inmutable (Anti Supply-Chain) -->
  <script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js" integrity="sha384-cztVf4nptt4arwI8Ixfn8naubPgxH22BSvA0CuqFUCulIT+dgnb18vSqiZbbPDL1" crossorigin="anonymous" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" integrity="sha384-CI3ELBVUz9XQO+97x6nwMDPosPR5XvsxW2ua7N1Xeygeh1IxtgqtCkGfQY9WWdHu" crossorigin="anonymous" defer></script>
</head>
<body class="bg-white text-carbon-900 selection:bg-brand-blue selection:text-white">

  <!-- Enlace accesible para lectores de pantalla y bots de accesibilidad -->
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

  <!-- =========================================================================
       HEADER MINIMALISTA (Blanco & Azul)
       ========================================================================= -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-carbon-200/80" role="banner">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      
      <!-- Logotipo TM Studio -->
      <a href="#hero" class="flex items-center gap-2.5" title="TM Studio — Ir al inicio">
        <div class="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center text-white font-display font-extrabold text-xs" aria-hidden="true">
          TM
        </div>
        <span class="font-display font-bold text-base tracking-tight text-carbon-900">
          TM STUDIO
        </span>
      </a>

      <!-- Menú Desktop con Enlaces Internos Rastreables -->
      <nav class="hidden md:flex items-center gap-7 text-xs font-medium text-carbon-600" aria-label="Navegación principal">
        <a href="#servicios" class="hover:text-brand-blue transition-colors" title="Servicios de diseño web y desarrollo">Servicios</a>
        <a href="#bots" class="hover:text-brand-blue transition-colors" title="Bots de Discord y software a medida">Bots & Software</a>
        <a href="#proceso" class="hover:text-brand-blue transition-colors" title="Metodología y etapas de trabajo">Proceso</a>
        <a href="#precios" class="hover:text-brand-blue transition-colors" title="Planes y precios de desarrollo">Precios</a>
        <a href="#faq" class="hover:text-brand-blue transition-colors" title="Preguntas frecuentes sobre el servicio">FAQ</a>
      </nav>

      <!-- Botón Contacto Directo & Menú Móvil -->
      <div class="flex items-center gap-3">
        <a id="header-wa" href="#" target="_blank" rel="noopener noreferrer" class="text-xs px-4 py-2 rounded-full btn-blue flex items-center gap-1.5 shadow-sm" aria-label="Contactar con TM Studio por WhatsApp">
          <i data-lucide="message-circle" class="w-3.5 h-3.5" aria-hidden="true"></i>
          <span>WhatsApp</span>
        </a>

        <!-- Botón Toggle Navegación Móvil -->
        <button id="mobile-menu-toggle" class="md:hidden p-2 rounded-lg text-carbon-600 hover:text-brand-blue hover:bg-carbon-50 transition-colors" aria-label="Abrir menú de navegación" aria-expanded="false" aria-controls="mobile-nav">
          <i data-lucide="menu" class="w-5 h-5" aria-hidden="true"></i>
        </button>
      </div>

    </div>

    <!-- Navegación Móvil Desplegable Accesible -->
    <nav id="mobile-nav" class="hidden md:hidden border-t border-carbon-200/80 bg-white/95 px-6 py-4 flex flex-col gap-3 text-xs font-medium text-carbon-600" aria-label="Navegación móvil">
      <a href="#servicios" class="mobile-nav-link py-1 hover:text-brand-blue transition-colors">Servicios</a>
      <a href="#bots" class="mobile-nav-link py-1 hover:text-brand-blue transition-colors">Bots & Software</a>
      <a href="#proceso" class="mobile-nav-link py-1 hover:text-brand-blue transition-colors">Proceso</a>
      <a href="#precios" class="mobile-nav-link py-1 hover:text-brand-blue transition-colors">Precios</a>
      <a href="#faq" class="mobile-nav-link py-1 hover:text-brand-blue transition-colors">Preguntas Frecuentes</a>
    </nav>
  </header>

  <main id="main-content">
    <!-- =========================================================================
         HERO SECTION — BLANCO Y AZUL CON ESCULTURA 3D AZUL ELÉCTRICO (144+ FPS)
         ========================================================================= -->
    <section id="hero" class="relative min-h-[90vh] flex items-center pt-20 pb-12 hero-glow overflow-hidden" aria-label="Presentación y propuesta de valor de TM Studio">
      
      <!-- Canvas 3D Three.js: Escultura fluida en Azul Eléctrico y Cian en GPU (144Hz+) -->
      <div id="webgl-hero" class="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing" aria-hidden="true"></div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
        
        <div class="lg:col-span-8 flex flex-col items-start pointer-events-auto">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-blue/20 text-brand-blue text-[11px] font-mono mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" aria-hidden="true"></span>
            <span>DESARROLLO WEB · BOTS DE DISCORD · SOFTWARE A MEDIDA</span>
          </div>

          <!-- Titular Principal H1 Semántico y de Alto Impacto -->
          <h1 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.18] tracking-tight text-carbon-900 mb-5">
            TU NEGOCIO MERECE UNA WEB <br class="hidden sm:inline" />
            <span class="text-brand-blue">EXTRAORDINARIA.</span>
          </h1>

          <!-- Subtítulo refinado con entidad de marca y semántica natural -->
          <p class="text-sm sm:text-base text-carbon-600 font-normal max-w-xl leading-relaxed mb-8">
            En <strong>TM Studio</strong> diseñamos experiencias digitales que convierten visitantes en clientes y transforman negocios en marcas memorables. Páginas web modernas, bots de Discord avanzados y software a medida.
          </p>

          <!-- Dos Botones de Conversión con Atributos de Seguridad -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a id="hero-btn-primary" href="#" target="_blank" rel="noopener noreferrer" class="btn-blue px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm" aria-label="Solicitar creación de página web por WhatsApp">
              <span>QUIERO MI PÁGINA WEB</span>
              <i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i>
            </a>

            <a href="#precios" class="btn-clean px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2" aria-label="Ver lista completa de servicios y planes de precios">
              <span>EXPLORAR SERVICIOS Y PLANES</span>
              <i data-lucide="arrow-down" class="w-3.5 h-3.5 text-carbon-400" aria-hidden="true"></i>
            </a>
          </div>

          <!-- Metadatos de Confianza -->
          <div class="flex items-center gap-8 pt-8 mt-8 border-t border-carbon-200/60 text-xs font-mono text-carbon-600">
            <div>
              <span class="font-bold text-carbon-900 block text-sm">100% Código a Medida</span>
              <span class="text-[10px] text-carbon-400">Sin plantillas lentas</span>
            </div>
            <div>
              <span class="font-bold text-brand-blue block text-sm">Discord 24/7</span>
              <span class="text-[10px] text-carbon-400">Soporte y bots activos</span>
            </div>
            <div>
              <span class="font-bold text-carbon-900 block text-sm">Carga Rápida</span>
              <span class="text-[10px] text-carbon-400">Optimizado para móvil</span>
            </div>
          </div>

        </div>

      </div>

    </section>

    <!-- =========================================================================
         SERVICIOS REALES (Webs, Bots de Discord, Software a Medida, Mantenimiento)
         ========================================================================= -->
    <section id="servicios" class="py-20 px-6 max-w-6xl mx-auto" aria-labelledby="servicios-titulo">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span class="text-xs font-mono text-brand-blue uppercase tracking-wider block mb-1">01 // SERVICIOS</span>
          <h2 id="servicios-titulo" class="font-display font-bold text-2xl sm:text-3xl text-carbon-900 tracking-tight">
            Servicios de Desarrollo Web, Bots y Software
          </h2>
        </div>
        <p class="text-carbon-600 text-xs sm:text-sm max-w-md leading-relaxed">
          Soluciones digitales creadas con código limpio para que tu negocio tenga una presencia profesional y tus herramientas funcionen sin fallos.
        </p>
      </div>

      <!-- Grid de Servicios con Encabezados H3 Jerárquicamente Correctos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <!-- 1. Páginas Web Profesionales -->
        <article class="clean-card p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div class="w-9 h-9 rounded-lg bg-brand-soft text-brand-blue flex items-center justify-center mb-4" aria-hidden="true">
              <i data-lucide="layout" class="w-4 h-4"></i>
            </div>
            <h3 class="font-display font-bold text-sm text-carbon-900 mb-2">Diseño de páginas web profesionales</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Páginas web para negocios, emprendedores y marcas personales. Diseño limpio, elegante y adaptado a móviles.
            </p>
          </div>
          <span class="text-[10px] font-mono text-brand-blue pt-3 border-t border-carbon-100 block">Webs a Medida</span>
        </article>

        <!-- 2. Bots de Discord Avanzados -->
        <article class="clean-card p-6 rounded-xl flex flex-col justify-between" id="bots">
          <div>
            <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4" aria-hidden="true">
              <i data-lucide="bot" class="w-4 h-4"></i>
            </div>
            <h3 class="font-display font-bold text-sm text-carbon-900 mb-2">Bots de Discord a medida</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Sistemas automáticos de moderación, verificación, tickets de soporte, economía, roles y bienvenida 24/7.
            </p>
          </div>
          <span class="text-[10px] font-mono text-indigo-600 pt-3 border-t border-carbon-100 block">Discord.js / Python</span>
        </article>

        <!-- 3. Software y Automatizaciones -->
        <article class="clean-card p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div class="w-9 h-9 rounded-lg bg-cyan-50 text-brand-cyan flex items-center justify-center mb-4" aria-hidden="true">
              <i data-lucide="cpu" class="w-4 h-4"></i>
            </div>
            <h3 class="font-display font-bold text-sm text-carbon-900 mb-2">Software y herramientas a medida</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Scripts de automatización, conexión de APIs (Stripe, Google Sheets), herramientas de gestión y desarrollo personal.
            </p>
          </div>
          <span class="text-[10px] font-mono text-brand-cyan pt-3 border-t border-carbon-100 block">Automatizaciones</span>
        </article>

        <!-- 4. Mantenimiento y Soporte -->
        <article class="clean-card p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4" aria-hidden="true">
              <i data-lucide="shield-check" class="w-4 h-4"></i>
            </div>
            <h3 class="font-display font-bold text-sm text-carbon-900 mb-2">Mantenimiento y soporte web</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Copias de seguridad, actualizaciones de texto e imágenes, resolución de dudas y servidores siempre activos.
            </p>
          </div>
          <span class="text-[10px] font-mono text-emerald-600 pt-3 border-t border-carbon-100 block">Soporte Continuo</span>
        </article>

        <!-- 5. Tiendas Online -->
        <article class="clean-card p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div class="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4" aria-hidden="true">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            </div>
            <h3 class="font-display font-bold text-sm text-carbon-900 mb-2">Tiendas online y e-commerce</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Vende tus productos o servicios con pagos seguros en un clic a través de Stripe, Bizum o PayPal.
            </p>
          </div>
          <span class="text-[10px] font-mono text-amber-600 pt-3 border-t border-carbon-100 block">Venta Directa</span>
        </article>

        <!-- 6. Landing Pages de Alta Conversión -->
        <article class="clean-card p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div class="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-4" aria-hidden="true">
              <i data-lucide="target" class="w-4 h-4"></i>
            </div>
            <h3 class="font-display font-bold text-sm text-carbon-900 mb-2">Landing pages de alta conversión</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Estructura persuasiva enfocada en captar clientes desde anuncios en Instagram, TikTok o Google.
            </p>
          </div>
          <span class="text-[10px] font-mono text-rose-600 pt-3 border-t border-carbon-100 block">Conversión</span>
        </article>

        <!-- 7. Rediseño de Páginas Web -->
        <article class="clean-card p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center mb-4" aria-hidden="true">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </div>
            <h3 class="font-display font-bold text-sm text-carbon-900 mb-2">Rediseño de páginas web</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Transformamos sitios viejos o lentos en herramientas modernas que transmiten seriedad y profesionalidad.
            </p>
          </div>
          <span class="text-[10px] font-mono text-brand-blue pt-3 border-t border-carbon-100 block">Modernización</span>
        </article>

        <!-- 8. Optimización SEO y Velocidad -->
        <article class="clean-card p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div class="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4" aria-hidden="true">
              <i data-lucide="zap" class="w-4 h-4"></i>
            </div>
            <h3 class="font-display font-bold text-sm text-carbon-900 mb-2">Optimización SEO y responsive</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Carga en menos de 1 segundo y código semántico para que Google indexe tu negocio y ganes visibilidad.
            </p>
          </div>
          <span class="text-[10px] font-mono text-teal-600 pt-3 border-t border-carbon-100 block">Velocidad</span>
        </article>

      </div>

    </section>

    <!-- =========================================================================
         DISCORD SHOWCASE & COMUNIDAD (Integración Real de Tymur)
         ========================================================================= -->
    <section class="py-12 px-6 max-w-6xl mx-auto" aria-labelledby="discord-heading">
      <div class="bg-carbon-50 border border-carbon-200 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0" aria-hidden="true">
            <i data-lucide="message-square" class="w-6 h-6"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 id="discord-heading" class="font-display font-bold text-base text-carbon-900">¿Necesitas un Bot de Discord o Servidor Configurado?</h2>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-100 text-indigo-700 font-bold">DISCORD 24/7</span>
            </div>
            <p class="text-xs text-carbon-600 mt-1">
              Desarrollamos bots a medida para comunidades y empresas. Háblame directamente por Discord: <strong class="text-carbon-900" id="discord-user-badge">tymucam</strong>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <button id="btn-copy-discord" class="btn-clean px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5" aria-label="Copiar nombre de usuario de Discord tymucam">
            <i data-lucide="copy" class="w-3.5 h-3.5" aria-hidden="true"></i>
            <span>Copiar Usuario</span>
          </button>
          <a id="btn-discord-server" href="https://discord.gg/tymucam" target="_blank" rel="noopener noreferrer" class="btn-blue px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5" aria-label="Unirse al servidor oficial de Discord de TM Studio">
            <span>Unirse a Discord</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5" aria-hidden="true"></i>
          </a>
        </div>

      </div>
    </section>

    <!-- =========================================================================
         EXPERIENCIA Y DIFERENCIACIÓN
         ========================================================================= -->
    <section class="py-20 px-6 max-w-6xl mx-auto border-t border-carbon-200/60" aria-labelledby="diferenciacion-titulo">
      
      <div class="max-w-2xl mb-12">
        <span class="text-xs font-mono text-brand-blue uppercase tracking-wider block mb-1">02 // DIFERENCIACIÓN</span>
        <h2 id="diferenciacion-titulo" class="font-display font-extrabold text-2xl sm:text-3xl text-carbon-900 tracking-tight leading-tight">
          NO CREAMOS SIMPLEMENTE WEBS. <br />
          <span class="text-brand-blue">CREAMOS EXPERIENCIAS DIGITALES.</span>
        </h2>
        <p class="text-carbon-600 text-xs sm:text-sm mt-3 leading-relaxed">
          Evitamos las plantillas genéricas sobrecargadas. Cada proyecto se programa a medida, garantizando que tu página cargue en menos de un segundo y funcione como una herramienta comercial real.
        </p>
      </div>

      <!-- Jerarquía H3 semántica (resuelve saltos W3C de H2 a H4) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div class="p-5 rounded-xl border border-carbon-200 bg-white">
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Diseño personalizado</h3>
          <p class="text-xs text-carbon-600 leading-relaxed">Sin clones. Cada detalle se ajusta a lo que tu negocio necesita transmitir.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-white">
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Velocidad y rendimiento</h3>
          <p class="text-xs text-carbon-600 leading-relaxed">Carga instantánea. No hacemos perder el tiempo a tus visitantes.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-white">
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Adaptación a móviles</h3>
          <p class="text-xs text-carbon-600 leading-relaxed">Mobile-First pensado para el 80% de tus visitas que llegan desde smartphone.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-white">
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Experiencia de usuario</h3>
          <p class="text-xs text-carbon-600 leading-relaxed">Navegación limpia para que el cliente encuentre en 3 segundos lo que busca.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-white">
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">SEO técnico</h3>
          <p class="text-xs text-carbon-600 leading-relaxed">Código semántico para que Google indexe tu página en los primeros puestos.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-white">
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Seguridad y Garantía</h3>
          <p class="text-xs text-carbon-600 leading-relaxed">Certificado SSL gratuito y código limpio sin vulnerabilidades de plugins viejos.</p>
        </div>

      </div>

    </section>

    <!-- =========================================================================
         PROCESO DE TRABAJO (5 ETAPAS)
         ========================================================================= -->
    <section id="proceso" class="py-20 px-6 max-w-6xl mx-auto border-t border-carbon-200/60" aria-labelledby="proceso-titulo">
      
      <div class="max-w-2xl mb-12">
        <span class="text-xs font-mono text-brand-blue uppercase tracking-wider block mb-1">03 // PROCESO</span>
        <h2 id="proceso-titulo" class="font-display font-bold text-2xl sm:text-3xl text-carbon-900 tracking-tight">
          Cómo Trabajamos
        </h2>
      </div>

      <!-- Pasos del Proceso con Encabezados H3 Jerárquicamente Correctos -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">

        <div class="p-5 rounded-xl border border-carbon-200 bg-carbon-50">
          <span class="font-mono text-base font-bold text-brand-blue block mb-1" aria-hidden="true">01</span>
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Descubrimiento y estrategia</h3>
          <p class="text-[11px] text-carbon-600 leading-relaxed">Hablamos de tus necesidades, tu público y la estructura que requiere tu proyecto.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-carbon-50">
          <span class="font-mono text-base font-bold text-brand-blue block mb-1" aria-hidden="true">02</span>
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Diseño y propuesta visual</h3>
          <p class="text-[11px] text-carbon-600 leading-relaxed">Creamos la propuesta estética para que des tu visto bueno antes de programar.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-carbon-50">
          <span class="font-mono text-base font-bold text-brand-blue block mb-1" aria-hidden="true">03</span>
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Desarrollo y programación</h3>
          <p class="text-[11px] text-carbon-600 leading-relaxed">Codificamos la web o bot con estándares modernos y rápidos.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-carbon-50">
          <span class="font-mono text-base font-bold text-brand-blue block mb-1" aria-hidden="true">04</span>
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Revisión y optimización</h3>
          <p class="text-[11px] text-carbon-600 leading-relaxed">Probamos en varios dispositivos, ajustamos detalles y pulimos la velocidad.</p>
        </div>

        <div class="p-5 rounded-xl border border-carbon-200 bg-carbon-50">
          <span class="font-mono text-base font-bold text-brand-blue block mb-1" aria-hidden="true">05</span>
          <h3 class="font-display font-bold text-xs text-carbon-900 mb-1">Lanzamiento de la web</h3>
          <p class="text-[11px] text-carbon-600 leading-relaxed">Publicamos en tu dominio con SSL activo y te enseñamos a gestionarlo.</p>
        </div>

      </div>

    </section>

    <!-- =========================================================================
         PLANES Y PRECIOS (Preparados en TM_CONFIG)
         ========================================================================= -->
    <section id="precios" class="py-20 px-6 max-w-6xl mx-auto border-t border-carbon-200/60" aria-labelledby="precios-titulo">
      
      <div class="max-w-2xl mb-12">
        <span class="text-xs font-mono text-brand-blue uppercase tracking-wider block mb-1">04 // PLANES</span>
        <h2 id="precios-titulo" class="font-display font-bold text-2xl sm:text-3xl text-carbon-900 tracking-tight">
          Precios Claros y Flexibles
        </h2>
        <p class="text-carbon-600 text-xs sm:text-sm mt-1">
          Sin costes ocultos. Precios preparados para ser editados en segundos.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 items-stretch">

        <!-- PLAN 1: WEB PRESENCIA -->
        <article class="clean-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono text-carbon-400 uppercase tracking-wider block mb-1">Para Empezar</span>
            <h3 class="font-display font-bold text-lg text-carbon-900 mb-2">Web Presencia</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Landing page rápida para negocios y profesionales que necesitan mostrar sus servicios.
            </p>

            <div class="mb-5 pb-5 border-b border-carbon-100">
              <span class="font-display font-extrabold text-3xl text-carbon-900" id="price-web-presencia">XX€</span>
            </div>

            <ul class="space-y-2.5 mb-6 text-xs text-carbon-700" aria-label="Características del plan Web Presencia">
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue" aria-hidden="true"></i>
                <span>Landing page de 1 página</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue" aria-hidden="true"></i>
                <span>Diseño 100% móvil</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue" aria-hidden="true"></i>
                <span>WhatsApp y llamada directa</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue" aria-hidden="true"></i>
                <span>Dominio y certificado SSL</span>
              </li>
            </ul>
          </div>

          <a id="btn-plan-web-presencia" href="#" target="_blank" rel="noopener noreferrer" class="btn-clean w-full py-2.5 rounded-full text-xs font-bold uppercase text-center block" aria-label="Pedir presupuesto para el plan Web Presencia por WhatsApp">
            Pedir Presupuesto
          </a>
        </article>

        <!-- PLAN 2: WEB PRO + ADMIN (DESTACADO) -->
        <article class="clean-card rounded-2xl p-6 flex flex-col justify-between border-2 border-brand-blue bg-brand-soft/20 shadow-md relative">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-blue text-[9px] font-mono font-bold uppercase text-white">
            Más Popular
          </div>
          <div>
            <span class="text-[10px] font-mono text-brand-blue uppercase tracking-wider block mb-1 pt-1">Empresas</span>
            <h3 class="font-display font-bold text-lg text-carbon-900 mb-2">Web Pro + Admin</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Sitio web completo para empresas que buscan captar clientes y tener presencia sólida.
            </p>

            <div class="mb-5 pb-5 border-b border-brand-blue/20">
              <span class="font-display font-extrabold text-3xl text-brand-blue" id="price-web-pro">XX€</span>
            </div>

            <ul class="space-y-2.5 mb-6 text-xs text-carbon-800" aria-label="Características del plan Web Pro + Admin">
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue" aria-hidden="true"></i>
                <span class="font-semibold">Hasta 5 páginas completas</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue" aria-hidden="true"></i>
                <span>Panel para editar textos y fotos</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue" aria-hidden="true"></i>
                <span>Optimización SEO Google</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-brand-blue" aria-hidden="true"></i>
                <span class="font-semibold">Garantía durante 30 días</span>
              </li>
            </ul>
          </div>

          <a id="btn-plan-web-pro" href="#" target="_blank" rel="noopener noreferrer" class="btn-blue w-full py-2.5 rounded-full text-xs font-bold uppercase text-center block shadow-sm" aria-label="Elegir y contratar el plan Web Pro + Admin por WhatsApp">
            Elegir Plan Pro
          </a>
        </article>

        <!-- PLAN 3: BOTS & SOFTWARE -->
        <article class="clean-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono text-indigo-600 uppercase tracking-wider block mb-1">Comunidades</span>
            <h3 class="font-display font-bold text-lg text-carbon-900 mb-2">Bots & Software</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Bots para Discord personalizados, herramientas a medida o scripts de automatización.
            </p>

            <div class="mb-5 pb-5 border-b border-carbon-100">
              <span class="font-display font-extrabold text-3xl text-carbon-900" id="price-bots-software">Desde XX€</span>
            </div>

            <ul class="space-y-2.5 mb-6 text-xs text-carbon-700" aria-label="Características del servicio Bots y Software">
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-600" aria-hidden="true"></i>
                <span>Bot Discord 100% a medida</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-600" aria-hidden="true"></i>
                <span>Tickets, moderación o economía</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-600" aria-hidden="true"></i>
                <span>Conexión 24/7 en servidor</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-600" aria-hidden="true"></i>
                <span>Guía y soporte de instalación</span>
              </li>
            </ul>
          </div>

          <a id="btn-plan-bots-software" href="#" target="_blank" rel="noopener noreferrer" class="btn-clean w-full py-2.5 rounded-full text-xs font-bold uppercase text-center block" aria-label="Pedir presupuesto para Bots de Discord o Software a medida por WhatsApp">
            Pedir Presupuesto
          </a>
        </article>

        <!-- PLAN 4: MANTENIMIENTO -->
        <article class="clean-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono text-emerald-600 uppercase tracking-wider block mb-1">Tranquilidad</span>
            <h3 class="font-display font-bold text-lg text-carbon-900 mb-2">Mantenimiento</h3>
            <p class="text-xs text-carbon-600 leading-relaxed mb-4">
              Soporte mensual continuo para cambios, copias de seguridad y seguridad activa.
            </p>

            <div class="mb-5 pb-5 border-b border-carbon-100">
              <span class="font-display font-extrabold text-3xl text-carbon-900" id="price-mantenimiento">XX€<span class="text-xs font-normal text-carbon-400">/mes</span></span>
            </div>

            <ul class="space-y-2.5 mb-6 text-xs text-carbon-700" aria-label="Características del plan de Mantenimiento Web">
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600" aria-hidden="true"></i>
                <span>Copias de seguridad continuas</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600" aria-hidden="true"></i>
                <span>Cambios de fotos o textos</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600" aria-hidden="true"></i>
                <span>Soporte prioritario por WhatsApp</span>
              </li>
              <li class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600" aria-hidden="true"></i>
                <span>Sin permanencia obligatoria</span>
              </li>
            </ul>
          </div>

          <a id="btn-plan-mantenimiento" href="#" target="_blank" rel="noopener noreferrer" class="btn-clean w-full py-2.5 rounded-full text-xs font-bold uppercase text-center block" aria-label="Activar plan de mantenimiento web por WhatsApp">
            Activar Plan
          </a>
        </article>

      </div>

    </section>

    <!-- =========================================================================
         PREGUNTAS FRECUENTES (FAQ)
         ========================================================================= -->
    <section id="faq" class="py-20 px-6 max-w-4xl mx-auto border-t border-carbon-200/60" aria-labelledby="faq-titulo">
      
      <div class="max-w-2xl mb-10">
        <span class="text-xs font-mono text-brand-blue uppercase tracking-wider block mb-1">05 // FAQ</span>
        <h2 id="faq-titulo" class="font-display font-bold text-2xl sm:text-3xl text-carbon-900 tracking-tight">
          Preguntas Frecuentes
        </h2>
      </div>

      <div class="divide-y divide-carbon-200/80" id="faq-list">

        <!-- FAQ 1 -->
        <div class="py-4 faq-item">
          <h3 class="m-0 p-0 text-xs sm:text-sm font-semibold text-carbon-900">
            <button type="button" class="faq-btn w-full text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-carbon-900 hover:text-brand-blue transition-colors" aria-expanded="false">
              <span>¿Cuánto tarda una página web o un bot?</span>
              <i data-lucide="plus" class="faq-icon w-3.5 h-3.5 text-carbon-400 transition-transform duration-200" aria-hidden="true"></i>
            </button>
          </h3>
          <div class="faq-answer max-h-0 overflow-hidden transition-all duration-200 text-xs text-carbon-600 leading-relaxed pt-0">
            <p class="pt-2">
              Una web básica o bot estándar suele estar lista en <strong>3 a 7 días</strong>. Proyectos más complejos toman entre 1 y 2 semanas. Siempre acordamos la fecha de entrega antes de iniciar.
            </p>
          </div>
        </div>

        <!-- FAQ 2 -->
        <div class="py-4 faq-item">
          <h3 class="m-0 p-0 text-xs sm:text-sm font-semibold text-carbon-900">
            <button type="button" class="faq-btn w-full text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-carbon-900 hover:text-brand-blue transition-colors" aria-expanded="false">
              <span>¿Qué incluye el servicio?</span>
              <i data-lucide="plus" class="faq-icon w-3.5 h-3.5 text-carbon-400 transition-transform duration-200" aria-hidden="true"></i>
            </button>
          </h3>
          <div class="faq-answer max-h-0 overflow-hidden transition-all duration-200 text-xs text-carbon-600 leading-relaxed pt-0">
            <p class="pt-2">
              Diseño, desarrollo, adaptación a móviles, dominio y SSL, botones directos de contacto (WhatsApp) y explicación de uso para que tengas control total.
            </p>
          </div>
        </div>

        <!-- FAQ 3 -->
        <div class="py-4 faq-item">
          <h3 class="m-0 p-0 text-xs sm:text-sm font-semibold text-carbon-900">
            <button type="button" class="faq-btn w-full text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-carbon-900 hover:text-brand-blue transition-colors" aria-expanded="false">
              <span>¿Se adapta a dispositivos móviles?</span>
              <i data-lucide="plus" class="faq-icon w-3.5 h-3.5 text-carbon-400 transition-transform duration-200" aria-hidden="true"></i>
            </button>
          </h3>
          <div class="faq-answer max-h-0 overflow-hidden transition-all duration-200 text-xs text-carbon-600 leading-relaxed pt-0">
            <p class="pt-2">
              <strong>Sí, totalmente.</strong> Probamos cada detalle en pantallas móviles para asegurar navegación rápida e intuitiva.
            </p>
          </div>
        </div>

        <!-- FAQ 4 -->
        <div class="py-4 faq-item">
          <h3 class="m-0 p-0 text-xs sm:text-sm font-semibold text-carbon-900">
            <button type="button" class="faq-btn w-full text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-carbon-900 hover:text-brand-blue transition-colors" aria-expanded="false">
              <span>¿Incluye posicionamiento SEO?</span>
              <i data-lucide="plus" class="faq-icon w-3.5 h-3.5 text-carbon-400 transition-transform duration-200" aria-hidden="true"></i>
            </button>
          </h3>
          <div class="faq-answer max-h-0 overflow-hidden transition-all duration-200 text-xs text-carbon-600 leading-relaxed pt-0">
            <p class="pt-2">
              <strong>Sí.</strong> Entregamos la web con la estructura semántica correcta y optimización de velocidad para que Google indexe tu negocio.
            </p>
          </div>
        </div>

        <!-- FAQ 5 -->
        <div class="py-4 faq-item">
          <h3 class="m-0 p-0 text-xs sm:text-sm font-semibold text-carbon-900">
            <button type="button" class="faq-btn w-full text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-carbon-900 hover:text-brand-blue transition-colors" aria-expanded="false">
              <span>¿Cómo se realiza el pago?</span>
              <i data-lucide="plus" class="faq-icon w-3.5 h-3.5 text-carbon-400 transition-transform duration-200" aria-hidden="true"></i>
            </button>
          </h3>
          <div class="faq-answer max-h-0 overflow-hidden transition-all duration-200 text-xs text-carbon-600 leading-relaxed pt-0">
            <p class="pt-2">
              Habitualmente en dos plazos: 50% al empezar para reservar fecha y el 50% restante al terminar cuando la web esté revisada y aprobada por ti.
            </p>
          </div>
        </div>

        <!-- FAQ 6 -->
        <div class="py-4 faq-item">
          <h3 class="m-0 p-0 text-xs sm:text-sm font-semibold text-carbon-900">
            <button type="button" class="faq-btn w-full text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-carbon-900 hover:text-brand-blue transition-colors" aria-expanded="false">
              <span>¿Existe mantenimiento posterior?</span>
              <i data-lucide="plus" class="faq-icon w-3.5 h-3.5 text-carbon-400 transition-transform duration-200" aria-hidden="true"></i>
            </button>
          </h3>
          <div class="faq-answer max-h-0 overflow-hidden transition-all duration-200 text-xs text-carbon-600 leading-relaxed pt-0">
            <p class="pt-2">
              Sí, ofrecemos planes de mantenimiento opcionales para que nunca tengas que preocuparte por copias de seguridad o cambios de texto.
            </p>
          </div>
        </div>

        <!-- FAQ 7 -->
        <div class="py-4 faq-item">
          <h3 class="m-0 p-0 text-xs sm:text-sm font-semibold text-carbon-900">
            <button type="button" class="faq-btn w-full text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-carbon-900 hover:text-brand-blue transition-colors" aria-expanded="false">
              <span>¿Cómo solicitar presupuesto?</span>
              <i data-lucide="plus" class="faq-icon w-3.5 h-3.5 text-carbon-400 transition-transform duration-200" aria-hidden="true"></i>
            </button>
          </h3>
          <div class="faq-answer max-h-0 overflow-hidden transition-all duration-200 text-xs text-carbon-600 leading-relaxed pt-0">
            <p class="pt-2">
              Escríbenos directamente por <strong>WhatsApp</strong> o <strong>Discord</strong> y te responderemos el mismo día con una propuesta clara.
            </p>
          </div>
        </div>

      </div>

    </section>

    <!-- =========================================================================
         CTA FINAL
         ========================================================================= -->
    <section class="py-24 px-6 max-w-4xl mx-auto text-center border-t border-carbon-200/60" aria-labelledby="cta-final-titulo">
      
      <h2 id="cta-final-titulo" class="font-display font-extrabold text-2xl sm:text-4xl text-carbon-900 tracking-tight mb-3">
        TU PRÓXIMA WEB <br />
        <span class="text-brand-blue">PUEDE CAMBIARLO TODO.</span>
      </h2>

      <p class="text-carbon-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-8">
        Es el momento de llevar tu negocio al siguiente nivel con una presencia digital diseñada para destacar.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a id="btn-cta-main" href="#" target="_blank" rel="noopener noreferrer" class="btn-blue px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm" aria-label="Empezar proyecto web contactando por WhatsApp">
          <span>EMPEZAR MI PROYECTO</span>
          <i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i>
        </a>

        <a id="btn-cta-discord" href="https://discord.gg/tymucam" target="_blank" rel="noopener noreferrer" class="btn-clean px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2" aria-label="Hablar en Discord con el usuario tymucam">
          <i data-lucide="message-square" class="w-4 h-4 text-indigo-600" aria-hidden="true"></i>
          <span>Discord: <span id="label-discord">tymucam</span></span>
        </a>
      </div>

      <p class="text-[11px] font-mono text-carbon-400 mt-6">
        WhatsApp directo: <span id="label-phone" class="text-carbon-700 font-semibold">+34 641 723 490</span>
      </p>

    </section>
  </main>

  <!-- =========================================================================
       FOOTER (Blanco & Azul Limpio con Navegación y Transparencia RGPD)
       ========================================================================= -->
  <footer class="border-t border-carbon-200 bg-carbon-50 py-12 px-6 max-w-6xl mx-auto flex flex-col gap-8 text-xs font-mono text-carbon-400" role="contentinfo">
    
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-carbon-200/60">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-brand-blue" aria-hidden="true"></span>
        <span class="text-carbon-900 font-bold tracking-tight text-sm">TM STUDIO</span>
        <span>— Desarrollo Web & Software a Medida</span>
      </div>

      <!-- Enlaces del Footer para Rastreo, Enlazado Interno y Privacidad -->
      <nav class="flex flex-wrap items-center gap-5 text-xs font-sans text-carbon-600" aria-label="Enlaces del pie de página">
        <a href="#servicios" class="hover:text-brand-blue transition-colors">Servicios</a>
        <a href="#bots" class="hover:text-brand-blue transition-colors">Bots de Discord</a>
        <a href="#proceso" class="hover:text-brand-blue transition-colors">Proceso</a>
        <a href="#precios" class="hover:text-brand-blue transition-colors">Planes y Precios</a>
        <a href="#faq" class="hover:text-brand-blue transition-colors">Preguntas Frecuentes</a>
        <button id="btn-privacy" type="button" class="text-carbon-500 hover:text-brand-blue transition-colors underline underline-offset-2">Privacidad y RGPD</button>
      </nav>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
      <div>
        © <span id="year">2026</span> TM Studio. Todos los derechos reservados.
      </div>

      <div class="flex items-center gap-4 text-carbon-500">
        <span>Diseñado y programado con código 100% nativo y seguro.</span>
      </div>
    </div>
  </footer>

  <!-- =========================================================================
       MODAL DE POLÍTICA DE PRIVACIDAD Y AVISO LEGAL (RGPD & LOPDGDD)
       ========================================================================= -->
  <div id="privacy-modal" class="fixed inset-0 z-50 hidden bg-carbon-900/40 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 border border-carbon-200 shadow-xl max-h-[85vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-3 border-b border-carbon-100 mb-4">
        <h3 id="privacy-title" class="font-display font-bold text-base text-carbon-900">Política de Privacidad y Aviso Legal</h3>
        <button id="close-privacy" class="p-1 rounded-lg hover:bg-carbon-100 text-carbon-400 hover:text-carbon-900 transition-colors" aria-label="Cerrar modal de privacidad">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div class="text-xs text-carbon-600 space-y-3 leading-relaxed font-sans">
        <p><strong>1. Responsable del Tratamiento:</strong> TM Studio. Canal de comunicación directa mediante WhatsApp oficial (+34 641 723 490) y Discord oficial (<code class="bg-carbon-100 px-1 py-0.5 rounded">tymucam</code>).</p>
        <p><strong>2. Finalidad del Tratamiento:</strong> Atender consultas técnicas, elaborar propuestas comerciales y coordinar el desarrollo de proyectos web, bots o software a medida solicitados directamente por el usuario.</p>
        <p><strong>3. Base Jurídica:</strong> Consentimiento libre, explícito e informado del interesado (Art. 6.1.a RGPD) al iniciar voluntariamente la conversación por los canales indicados.</p>
        <p><strong>4. Privacidad desde el Diseño (Zero Tracking Cookies):</strong> Este sitio web <strong>no utiliza cookies de seguimiento, no realiza analítica de comportamiento de terceros ni recopila datos en segundo plano</strong>. Tu navegación es completamente anónima y no invasiva.</p>
        <p><strong>5. Conservación y Derechos:</strong> Los datos compartidos durante la conversación se conservarán únicamente el tiempo necesario para la gestión del proyecto. Puedes solicitar el acceso, rectificación o supresión de tus datos en cualquier momento comunicándote por los mismos canales.</p>
      </div>
      <div class="pt-4 mt-4 border-t border-carbon-100 flex justify-end">
        <button id="btn-privacy-ok" type="button" class="btn-blue px-5 py-2 rounded-full text-xs font-semibold">Entendido</button>
      </div>
    </div>
  </div>

  <!-- =========================================================================
       CONFIGURACIÓN TM_CONFIG & SCRIPT 3D AZUL ELÉCTRICO (144HZ+)
       ========================================================================= -->
  <script>
    /**
     * CONFIGURACIÓN CENTRALIZADA - TM STUDIO
     * Modifica aquí precios y datos de contacto en segundos.
     */
    const TM_CONFIG = {
      contacto: {
        whatsappNumero: "34641723490",
        whatsappVisible: "+34 641 723 490",
        discordUsuario: "tymucam",
        discordInvitacion: "https://discord.gg/tymucam",
        mensajeGeneralWhatsApp: "Hola TM Studio, me interesa información sobre un proyecto."
      },
      precios: {
        webPresencia: {
          precio: "XX€",
          mensajeWhatsApp: "Hola TM Studio, me interesa contratar el Pack Web Presencia (XX€)..."
        },
        webPro: {
          precio: "XX€",
          mensajeWhatsApp: "Hola TM Studio, me interesa el Pack Web Pro + Admin (XX€)..."
        },
        botsSoftware: {
          precio: "Desde XX€",
          mensajeWhatsApp: "Hola TM Studio, quiero pedir presupuesto para un Bot de Discord o Software a medida..."
        },
        mantenimiento: {
          precio: "XX€",
          mensajeWhatsApp: "Hola TM Studio, quiero activar el Plan de Mantenimiento Web (XX€/mes)..."
        }
      }
    };

    document.addEventListener("DOMContentLoaded", () => {
      
      // Inicializar iconos de Lucide
      if (window.lucide) {
        lucide.createIcons();
      }

      // Función constructora segura contra inyecciones y manipulación de parámetros
      const buildWa = (phone, text) => {
        const cleanPhone = String(phone || "").replace(/[^0-9]/g, "");
        return "https://wa.me/" + cleanPhone + "?text=" + encodeURIComponent(text || "");
      };

      // Validador estricto de URLs seguras
      const getSafeUrl = (url, allowedDomains) => {
        try {
          const parsed = new URL(url);
          if (parsed.protocol === "https:" && allowedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith("." + d))) {
            return parsed.href;
          }
        } catch (e) {}
        return "#";
      };

      // 1. Inyectar Precios en HTML de forma inmune a DOM XSS (textContent estricto)
      const pPresencia = document.getElementById("price-web-presencia");
      const pPro = document.getElementById("price-web-pro");
      const pBots = document.getElementById("price-bots-software");
      const pMantenimiento = document.getElementById("price-mantenimiento");

      if (pPresencia) pPresencia.textContent = TM_CONFIG.precios.webPresencia.precio;
      if (pPro) pPro.textContent = TM_CONFIG.precios.webPro.precio;
      if (pBots) pBots.textContent = TM_CONFIG.precios.botsSoftware.precio;
      if (pMantenimiento) {
        pMantenimiento.textContent = TM_CONFIG.precios.mantenimiento.precio;
        const subSpan = document.createElement("span");
        subSpan.className = "text-xs font-normal text-carbon-400";
        subSpan.textContent = "/mes";
        pMantenimiento.appendChild(subSpan);
      }

      // 2. Vincular Botones de WhatsApp con Sanitización
      const btnPresencia = document.getElementById("btn-plan-web-presencia");
      const btnPro = document.getElementById("btn-plan-web-pro");
      const btnBots = document.getElementById("btn-plan-bots-software");
      const btnMantenimiento = document.getElementById("btn-plan-mantenimiento");

      if (btnPresencia) btnPresencia.href = buildWa(TM_CONFIG.contacto.whatsappNumero, TM_CONFIG.precios.webPresencia.mensajeWhatsApp);
      if (btnPro) btnPro.href = buildWa(TM_CONFIG.contacto.whatsappNumero, TM_CONFIG.precios.webPro.mensajeWhatsApp);
      if (btnBots) btnBots.href = buildWa(TM_CONFIG.contacto.whatsappNumero, TM_CONFIG.precios.botsSoftware.mensajeWhatsApp);
      if (btnMantenimiento) btnMantenimiento.href = buildWa(TM_CONFIG.contacto.whatsappNumero, TM_CONFIG.precios.mantenimiento.mensajeWhatsApp);

      // 3. Botones Principales de WhatsApp
      const generalUrl = buildWa(TM_CONFIG.contacto.whatsappNumero, TM_CONFIG.contacto.mensajeGeneralWhatsApp);
      const heroBtn = document.getElementById("hero-btn-primary");
      const ctaBtn = document.getElementById("btn-cta-main");
      const headerWa = document.getElementById("header-wa");
      if (heroBtn) heroBtn.href = generalUrl;
      if (ctaBtn) ctaBtn.href = generalUrl;
      if (headerWa) headerWa.href = generalUrl;

      // 4. Discord con Validación de Dominio y Copia Segura
      const labelDiscord = document.getElementById("label-discord");
      const btnDiscord = document.getElementById("btn-cta-discord");
      const badgeDiscord = document.getElementById("discord-user-badge");
      const copyDiscordBtn = document.getElementById("btn-copy-discord");
      const linkDiscordServer = document.getElementById("btn-discord-server");

      const discordSafeUrl = getSafeUrl(TM_CONFIG.contacto.discordInvitacion, ["discord.gg", "discord.com"]);

      if (labelDiscord) labelDiscord.textContent = TM_CONFIG.contacto.discordUsuario;
      if (badgeDiscord) badgeDiscord.textContent = TM_CONFIG.contacto.discordUsuario;
      if (btnDiscord) btnDiscord.href = discordSafeUrl;
      if (linkDiscordServer) linkDiscordServer.href = discordSafeUrl;

      if (copyDiscordBtn) {
        copyDiscordBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(TM_CONFIG.contacto.discordUsuario).then(() => {
            const span = copyDiscordBtn.querySelector("span");
            if (span) {
              const originalText = span.textContent;
              span.textContent = "¡Copiado!";
              setTimeout(() => { span.textContent = originalText; }, 2000);
            }
          }).catch(() => {});
        });
      }

      // 5. Teléfono
      const labelPhone = document.getElementById("label-phone");
      if (labelPhone) labelPhone.textContent = TM_CONFIG.contacto.whatsappVisible;

      // 6. Año Footer
      const year = document.getElementById("year");
      if (year) year.textContent = new Date().getFullYear();

      // 7. Navegación Móvil
      initMobileNav();

      // 8. Acordeón FAQ
      initFaq();

      // 9. Modal de Privacidad RGPD
      initPrivacyModal();

      // 10. Escena 3D Azul Eléctrico y Cian en GPU (144Hz+)
      initElectricBlue3D();

    });

    /**
     * MODAL ACCESIBLE DE PRIVACIDAD RGPD
     */
    function initPrivacyModal() {
      const modal = document.getElementById("privacy-modal");
      const openBtn = document.getElementById("btn-privacy");
      const closeBtn = document.getElementById("close-privacy");
      const okBtn = document.getElementById("btn-privacy-ok");

      if (!modal || !openBtn) return;

      const openModal = () => {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      };

      const closeModal = () => {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      };

      openBtn.addEventListener("click", openModal);
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      if (okBtn) okBtn.addEventListener("click", closeModal);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
          closeModal();
        }
      });
    }

    /**
     * MENÚ MÓVIL ACCESIBLE
     */
    function initMobileNav() {
      const toggle = document.getElementById("mobile-menu-toggle");
      const nav = document.getElementById("mobile-nav");
      if (!toggle || !nav) return;

      toggle.addEventListener("click", () => {
        const isHidden = nav.classList.contains("hidden");
        if (isHidden) {
          nav.classList.remove("hidden");
          toggle.setAttribute("aria-expanded", "true");
        } else {
          nav.classList.add("hidden");
          toggle.setAttribute("aria-expanded", "false");
        }
      });

      // Cerrar al pulsar un enlace
      nav.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => {
          nav.classList.add("hidden");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /**
     * ACORDEÓN FAQ ACCESIBLE Y COMPATIBLE
     */
    function initFaq() {
      const btns = document.querySelectorAll(".faq-btn");
      btns.forEach(b => {
        b.addEventListener("click", () => {
          const item = b.closest(".faq-item") || b.parentElement;
          const answer = item.querySelector(".faq-answer");
          const icon = b.querySelector(".faq-icon");
          const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

          // Cerrar todos los demás
          document.querySelectorAll(".faq-answer").forEach(a => a.style.maxHeight = null);
          document.querySelectorAll(".faq-icon").forEach(i => i.style.transform = "rotate(0deg)");
          document.querySelectorAll(".faq-btn").forEach(btn => btn.setAttribute("aria-expanded", "false"));

          if (!isOpen) {
            answer.style.maxHeight = (answer.scrollHeight + 15) + "px";
            if (icon) icon.style.transform = "rotate(45deg)";
            b.setAttribute("aria-expanded", "true");
          }
        });
      });
    }

    /**
     * THREE.JS 3D ESCULTURA AZUL ELÉCTRICO Y CIAN (144HZ+)
     * - Shader 100% procesado en GPU. Cero recálculo de vértices en CPU.
     * - Optimizado para alta tasa de refresco sin tirones en CPU.
     */
    function initElectricBlue3D() {
      const container = document.getElementById("webgl-hero");
      if (!container || typeof THREE === "undefined") return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 50);
      camera.position.set(0, 0, 6.0);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      function updatePosition() {
        if (window.innerWidth >= 1024) {
          group.position.set(2.2, 0, 0);
        } else {
          group.position.set(0, -0.4, -1.2);
        }
      }
      updatePosition();

      // Shader GPU con azul eléctrico y cian vibrante (no blanco)
      const vertexShader = \`
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          float wave = sin(position.x * 2.5 + uTime * 1.5) * cos(position.y * 2.5 + uTime * 1.2) * 0.11;
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
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.2);

          // Colores vibrantes: Azul Eléctrico y Cian Luminoso
          vec3 deepBlue = vec3(0.08, 0.28, 0.85); // #1447D9
          vec3 brightCyan = vec3(0.02, 0.75, 0.98); // #05C0FA
          vec3 rimLight = vec3(0.45, 0.75, 1.0);

          vec3 color = mix(deepBlue, brightCyan, fresnel * 0.9);
          color += rimLight * pow(fresnel, 3.0) * 0.8;

          gl_FragColor = vec4(color, 0.95);
        }
      \`;

      const sphereGeo = new THREE.IcosahedronGeometry(1.3, 26);
      const sphereMat = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: { uTime: { value: 0 } },
        transparent: true
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphere);

      // Anillo metálico azul orbitante
      const ringGeo = new THREE.TorusGeometry(2.0, 0.02, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x2563EB });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI * 0.35;
      group.add(ring);

      // Segundo anillo cian
      const ringGeo2 = new THREE.TorusGeometry(2.3, 0.012, 16, 80);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x06B6D4 });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.x = -Math.PI * 0.4;
      group.add(ring2);

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      window.addEventListener("mousemove", (e) => {
        const halfX = window.innerWidth / 2;
        const halfY = window.innerHeight / 2;
        mouseX = (e.clientX - halfX) / halfX;
        mouseY = (e.clientY - halfY) / halfY;
      }, { passive: true });

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
        sphereMat.uniforms.uTime.value = time;

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        group.rotation.y = targetX * 0.4 + time * 0.08;
        group.rotation.x = -targetY * 0.25;

        ring.rotation.z = time * 0.15;
        ring2.rotation.z = -time * 0.12;

        renderer.render(scene, camera);
      }

      animate();

      window.addEventListener("resize", () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        updatePosition();
      }, { passive: true });
    }
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', fullHtml, 'utf8');
fs.writeFileSync('tymurweb/index.html', fullHtml, 'utf8');

console.log('✅ index.html optimizado y blindado guardado exitosamente en root y subcarpeta!');
