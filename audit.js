const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('=== AUDITORÍA POST-OPTIMIZACIÓN EN VIVO ===\n');

// 1. Tamaño
const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(2);
console.log('1. TAMAÑO DEL DOCUMENTO:');
console.log(`  - Tamaño HTML (con CSS de producción inlined): ${sizeKB} KB`);
console.log(`  - Total líneas: ${html.split('\n').length}`);

// 2. Scripts y Parser Blocking
console.log('\n2. ANÁLISIS DE RECURSOS EN <HEAD>:');
const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
const head = headMatch ? headMatch[0] : '';

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let sm;
let blockingCount = 0;
while ((sm = scriptRegex.exec(head)) !== null) {
  const attrs = sm[1];
  const src = attrs.match(/src=["'](.*?)["']/);
  const isDefer = attrs.includes('defer');
  const isAsync = attrs.includes('async');
  const isBlocking = src && !isDefer && !isAsync;
  if (isBlocking) blockingCount++;
  console.log(`  - Script: ${src ? src[1] : 'Inline'}`);
  console.log(`    Bloqueante: ${isBlocking} | defer: ${isDefer} | async: ${isAsync}`);
}
console.log(`  -> TOTAL SCRIPTS BLOQUEANTES EN <HEAD>: ${blockingCount} (Objetivo: 0)`);

// 3. DNS Prefetch y Preconnect
console.log('\n3. RESOURCE HINTS & FUENTES:');
console.log('  - dns-prefetch fonts.googleapis.com:', html.includes('rel="dns-prefetch" href="https://fonts.googleapis.com"'));
console.log('  - preconnect fonts.gstatic.com:', html.includes('rel="preconnect" href="https://fonts.gstatic.com"'));
console.log('  - display=swap activo:', html.includes('display=swap'));

// 4. Three.js & WebGL
console.log('\n4. THREE.JS & MOTOR WEBGL:');
const icosa = html.match(/IcosahedronGeometry\((.*?)\)/);
console.log('  - IcosahedronGeometry:', icosa ? icosa[0] : 'N/A');
const torus = html.match(/TorusGeometry\((.*?)\)/g);
console.log('  - Torus rings:', torus);
console.log('  - DPR inteligente (isMobile / lowPower):', html.includes('isMobile ? 1.25'));
console.log('  - Tab visibilitychange pause:', html.includes('visibilitychange'));
console.log('  - prefers-reduced-motion accessibility:', html.includes('prefersReducedMotion'));
console.log('  - webglcontextlost handling:', html.includes('webglcontextlost'));
console.log('  - IntersectionObserver activo:', html.includes('IntersectionObserver'));

// 5. Tailwind JIT Runtime Eliminado
console.log('\n5. ESTADO DE DEPENDENCIAS PESADAS:');
console.log('  - cdn.tailwindcss.com eliminado del head:', !html.includes('cdn.tailwindcss.com'));
console.log('  - CSS 100% pre-compilado en el HTML:', html.includes('style.min.css') || html.includes('@media'));
