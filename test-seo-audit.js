const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('🔍 INICIANDO BATERÍA DE PRUEBAS TÉCNICAS Y SEO');
console.log('====================================================\n');

let errors = 0;
let warnings = 0;
let passes = 0;

function assert(condition, message, isWarning = false) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passes++;
  } else {
    if (isWarning) {
      console.log(`  ⚠️ [WARN] ${message}`);
      warnings++;
    } else {
      console.log(`  ❌ [FAIL] ${message}`);
      errors++;
    }
  }
}

// 1. Comprobación de Archivos Esenciales
console.log('1. ARCHIVOS TÉCNICOS Y RECURSOS SEO:');
const requiredFiles = [
  'index.html',
  'robots.txt',
  'sitemap.xml',
  '404.html',
  'favicon.svg',
  'site.webmanifest',
  'vercel.json',
  'server.ps1'
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  assert(exists, `Archivo presente: ${file}`);
});

// 2. Análisis del documento HTML
const html = fs.readFileSync('index.html', 'utf8');

console.log('\n2. ESTRUCTURA Y METADATOS EN INDEX.HTML:');

// Lang y Dir
assert(/<html[^>]*lang=["']es["']/i.test(html), 'Atributo lang="es" presente');
assert(/<html[^>]*dir=["']ltr["']/i.test(html), 'Atributo dir="ltr" presente');

// Title
const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
const titleText = titleMatch ? titleMatch[1].trim() : '';
assert(titleText.length > 0, `Title tag presente: "${titleText}"`);
assert(titleText.length >= 30 && titleText.length <= 75, `Longitud de Title óptima (${titleText.length} caracteres, ideal 30-70)`);

// Meta Description
const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
const descText = descMatch ? descMatch[1].trim() : '';
assert(descText.length > 0, `Meta description presente: "${descText}"`);
assert(descText.length >= 120 && descText.length <= 165, `Longitud de Meta description óptima (${descText.length} caracteres, ideal 120-160)`);

// Canonical
const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i);
assert(canonicalMatch && canonicalMatch[1].startsWith('https://'), `Canonical URL absoluta y segura: ${canonicalMatch ? canonicalMatch[1] : 'Falta'}`);

// Meta Robots
assert(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*index,\s*follow[^"']*["']/i.test(html), 'Meta robots configurado con "index, follow"');

// Google Search Console Meta Verification Tag
assert(/<meta[^>]*name=["']google-site-verification["']/i.test(html), 'Tag de verificación de Google Search Console configurado');

// Open Graph y Twitter Cards
assert(/<meta[^>]*property=["']og:title["']/i.test(html), 'og:title presente');
assert(/<meta[^>]*property=["']og:description["']/i.test(html), 'og:description presente');
assert(/<meta[^>]*property=["']og:url["']/i.test(html), 'og:url presente');
assert(/<meta[^>]*property=["']og:image["']/i.test(html), 'og:image presente');
assert(/<meta[^>]*name=["']twitter:card["']/i.test(html), 'twitter:card presente');

// Favicons y Manifest
assert(/<link[^>]*rel=["']icon["']/i.test(html), 'Favicon SVG vinculado');
assert(/<link[^>]*rel=["']manifest["']/i.test(html), 'Web App Manifest vinculado');

// 3. Jerarquía Semántica de Encabezados (H1-H6)
console.log('\n3. JERARQUÍA DE ENCABEZADOS (W3C HEADING OUTLINE):');
const headingRegex = /<(h[1-6])\b([^>]*)>([\s\S]*?)<\/\1>/gi;
const headings = [];
let hm;
while ((hm = headingRegex.exec(html)) !== null) {
  const level = parseInt(hm[1].substring(1), 10);
  const text = hm[3].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ');
  headings.push({ level, tag: hm[1], text });
}

console.log(`  Total encabezados encontrados: ${headings.length}`);
const h1s = headings.filter(h => h.level === 1);
assert(h1s.length === 1, `Debe existir exactamente 1 H1 (Encontrados: ${h1s.length})`);
if (h1s.length === 1) {
  console.log(`    -> H1: "${h1s[0].text}"`);
}

// Comprobación de saltos de jerarquía (ej. H2 -> H4 sin pasar por H3)
let hierarchyErrors = 0;
let prevLevel = 0;
headings.forEach((h, idx) => {
  if (idx === 0) {
    if (h.level !== 1) {
      console.log(`    ❌ El primer encabezado no es H1 (es ${h.tag})`);
      hierarchyErrors++;
    }
  } else {
    if (h.level > prevLevel + 1) {
      console.log(`    ❌ Salto no semántico en [${idx}] ${h.tag} "${h.text}" (previo era H${prevLevel})`);
      hierarchyErrors++;
    }
  }
  prevLevel = h.level;
});
assert(hierarchyErrors === 0, `Jerarquía sin saltos ilegales de nivel (Errores detectados: ${hierarchyErrors})`);

// 4. Enlaces y Seguridad (target="_blank" sin rel="noopener noreferrer")
console.log('\n4. ENLACES Y SEGURIDAD (TABNABBING & CRAWLABILITY):');
const linkRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
let unsafeLinks = 0;
let totalLinks = 0;
let lm;
while ((lm = linkRegex.exec(html)) !== null) {
  totalLinks++;
  const attrs = lm[1];
  if (/target=["']_blank["']/i.test(attrs)) {
    if (!/rel=["'][^"']*noopener[^"']*["']/i.test(attrs) || !/rel=["'][^"']*noreferrer[^"']*["']/i.test(attrs)) {
      unsafeLinks++;
      console.log(`    ⚠️ Enlace con target="_blank" sin noopener noreferrer: ${attrs}`);
    }
  }
}
console.log(`  Total enlaces inspeccionados: ${totalLinks}`);
assert(unsafeLinks === 0, `Todos los enlaces externos con target="_blank" tienen rel="noopener noreferrer"`);

// 5. Validación de Datos Estructurados JSON-LD
console.log('\n5. DATOS ESTRUCTURADOS (SCHEMA.ORG JSON-LD):');
const jsonLdMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
assert(!!jsonLdMatch, 'Bloque script JSON-LD presente en index.html');

if (jsonLdMatch) {
  try {
    const jsonLd = JSON.parse(jsonLdMatch[1]);
    console.log('  ✅ JSON-LD es sintácticamente válido (JSON.parse exitoso)');
    passes++;

    const graph = jsonLd['@graph'];
    assert(Array.isArray(graph) && graph.length > 0, `Contiene @graph con múltiples entidades (${graph ? graph.length : 0})`);

    const types = graph.map(g => g['@type']);
    console.log('    Entidades Schema detectadas:', types.join(', '));

    assert(types.includes('WebSite'), 'Entidad Schema "WebSite" presente');
    assert(types.includes('ProfessionalService') || types.includes('Organization'), 'Entidad Schema "ProfessionalService / Organization" presente');
    assert(types.includes('WebPage'), 'Entidad Schema "WebPage" presente');
    assert(types.includes('BreadcrumbList'), 'Entidad Schema "BreadcrumbList" presente');
    assert(types.includes('FAQPage'), 'Entidad Schema "FAQPage" presente');

    const faqEntity = graph.find(g => g['@type'] === 'FAQPage');
    if (faqEntity && Array.isArray(faqEntity.mainEntity)) {
      assert(faqEntity.mainEntity.length === 7, `FAQPage contiene exactamente las 7 preguntas reales (${faqEntity.mainEntity.length})`);
    }

  } catch (e) {
    console.log(`  ❌ Error de parseo en JSON-LD: ${e.message}`);
    errors++;
  }
}

// 6. Validación de robots.txt
console.log('\n6. VALIDACIÓN DE ROBOTS.TXT:');
const robotsContent = fs.readFileSync('robots.txt', 'utf8');
assert(robotsContent.includes('User-agent: *'), 'robots.txt define User-agent: *');
assert(robotsContent.includes('Allow: /'), 'robots.txt permite indexación general');
assert(robotsContent.includes('Sitemap: https://'), 'robots.txt referencia el sitemap XML absoluto');
assert(!robotsContent.includes('Disallow: /*.css'), 'robots.txt NO bloquea archivos CSS');
assert(!robotsContent.includes('Disallow: /*.js'), 'robots.txt NO bloquea archivos JS');

// 7. Validación de sitemap.xml
console.log('\n7. VALIDACIÓN DE SITEMAP.XML:');
const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
assert(sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>'), 'sitemap.xml tiene declaración XML');
assert(sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap.xml define namespace estándar sitemaps.org');
assert(sitemapContent.includes('<loc>https://tmstudio.es/</loc>'), 'sitemap.xml define URL canónica <loc>');
assert(sitemapContent.includes('<priority>1.0</priority>'), 'sitemap.xml define prioridad');

// 8. Validación de 404.html
console.log('\n8. VALIDACIÓN DE 404.HTML:');
const notFoundContent = fs.readFileSync('404.html', 'utf8');
assert(notFoundContent.includes('<meta name="robots" content="noindex, follow" />'), '404.html tiene meta tag noindex, follow para proteger el índice');
assert(notFoundContent.includes('href="/"'), '404.html tiene botón de regreso al inicio');

// Resumen Final
console.log('\n====================================================');
console.log(`RESULTADO DE LA BATERÍA DE PRUEBAS:`);
console.log(`  ✅ Superadas: ${passes}`);
console.log(`  ⚠️ Advertencias: ${warnings}`);
console.log(`  ❌ Errores: ${errors}`);
console.log('====================================================\n');

process.exit(errors > 0 ? 1 : 0);
