const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('🛡️  BATERÍA DE PRUEBAS DE CIBERSEGURIDAD Y HARDENING');
console.log('====================================================\n');

let passes = 0;
let warnings = 0;
let errors = 0;

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

// ---------------------------------------------------------
// 1. CABECERAS DE SEGURIDAD HTTP (VERCEL.JSON)
// ---------------------------------------------------------
console.log('1. CABECERAS DE SEGURIDAD HTTP (VERCEL.JSON):');
const vercelContent = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const globalHeaders = (vercelContent.headers.find(h => h.source === '/(.*)') || {}).headers || [];

const headerMap = {};
globalHeaders.forEach(h => { headerMap[h.key.toLowerCase()] = h.value; });

// CSP
assert(!!headerMap['content-security-policy'], 'Content-Security-Policy (CSP) presente');
if (headerMap['content-security-policy']) {
  const csp = headerMap['content-security-policy'];
  assert(csp.includes("default-src 'self'"), "CSP define default-src 'self'");
  assert(csp.includes("frame-ancestors 'none'"), "CSP define frame-ancestors 'none' (Anti-Clickjacking)");
  assert(csp.includes("base-uri 'self'"), "CSP define base-uri 'self' (Anti-Base-Injection)");
  assert(csp.includes("form-action 'self'"), "CSP restringe form-action a dominios autorizados");
}

// HSTS
assert(!!headerMap['strict-transport-security'], 'Strict-Transport-Security (HSTS) presente');
if (headerMap['strict-transport-security']) {
  assert(headerMap['strict-transport-security'].includes('max-age=63072000'), 'HSTS configurado con 2 años (63072000 segundos)');
  assert(headerMap['strict-transport-security'].includes('includeSubDomains'), 'HSTS incluye subdominios');
  assert(headerMap['strict-transport-security'].includes('preload'), 'HSTS incluye directiva preload');
}

// Otras cabeceras OWASP
assert(headerMap['x-content-type-options'] === 'nosniff', 'X-Content-Type-Options: nosniff activo (Anti-MIME-Sniffing)');
assert(headerMap['x-frame-options'] === 'DENY', 'X-Frame-Options: DENY activo (Anti-Clickjacking de respaldo)');
assert(headerMap['x-xss-protection'] === '0', 'X-XSS-Protection: 0 activo (Estándar moderno OWASP)');
assert(headerMap['referrer-policy'] === 'strict-origin-when-cross-origin', 'Referrer-Policy: strict-origin-when-cross-origin activo');
assert(headerMap['permissions-policy'] && headerMap['permissions-policy'].includes('camera=()'), 'Permissions-Policy desactiva APIs sensibles (camera, mic, geo)');
assert(headerMap['cross-origin-opener-policy'] === 'same-origin', 'Cross-Origin-Opener-Policy: same-origin activo (Aislamiento de proceso)');
assert(headerMap['cross-origin-resource-policy'] === 'same-origin', 'Cross-Origin-Resource-Policy: same-origin activo (Protección contra lectura cruzada)');

// ---------------------------------------------------------
// 2. DEPENDENCIAS FRONTEND Y SUBRESOURCE INTEGRITY (SRI)
// ---------------------------------------------------------
console.log('\n2. DEPENDENCIAS EXTERNAS Y SUBRESOURCE INTEGRITY (SRI):');
const html = fs.readFileSync('index.html', 'utf8');

const scriptRegex = /<script\b([^>]*)>/gi;
let sm;
let totalExternalScripts = 0;
let scriptsWithSri = 0;
let unpinnedScripts = 0;

while ((sm = scriptRegex.exec(html)) !== null) {
  const attrs = sm[1];
  const srcMatch = attrs.match(/src=["'](.*?)["']/i);
  if (srcMatch && srcMatch[1].startsWith('http')) {
    totalExternalScripts++;
    const src = srcMatch[1];
    const isDynamic = src.includes('cdn.tailwindcss.com');
    const hasIntegrity = /integrity=["']sha(384|512)-[^"']+["']/i.test(attrs);
    const hasCors = /crossorigin=["']anonymous["']/i.test(attrs);
    const isUnpinned = src.includes('@latest');

    if (isUnpinned) unpinnedScripts++;
    if ((hasIntegrity && hasCors) || isDynamic) scriptsWithSri++;

    console.log(`    Script externo: ${src}`);
    console.log(`      -> SRI Activo / Runtime JIT: ${(hasIntegrity && hasCors) ? 'SRI (SHA-384)' : (isDynamic ? 'Permitido por CSP (JIT compiler)' : 'false')}`);
    console.log(`      -> Versión Inmutable: ${!isUnpinned}`);
  }
}

assert(totalExternalScripts > 0, `Scripts externos identificados: ${totalExternalScripts}`);
assert(scriptsWithSri === totalExternalScripts, `Todos los scripts externos estáticos cuentan con SRI (integrity + crossorigin)`);
assert(unpinnedScripts === 0, `Ningún script utiliza etiquetas flotantes mutables como @latest`);

// ---------------------------------------------------------
// 3. SEGURIDAD DOM Y PREVENCIÓN DE XSS EN EL CLIENTE
// ---------------------------------------------------------
console.log('\n3. SEGURIDAD DOM Y PREVENCIÓN DE XSS EN CLIENTE:');

// Verificar ausencia de innerHTML en inyección de precios dinámicos
assert(!/pMantenimiento\.innerHTML\s*=/i.test(html), 'Eliminada inyección de innerHTML vulnerable en precio de mantenimiento (migrado a textContent/createElement)');
assert(/pMantenimiento\.textContent\s*=/i.test(html), 'Uso seguro de textContent para asignación de valores de texto');

// Verificar sanitización de parámetros WhatsApp
assert(/replace\(\/\[\^0-9\]\/g,\s*["']["']\)/i.test(html), 'Sanitización estricta de teléfono (solo dígitos) en constructor de WhatsApp');

// Verificar validación de protocolo y dominio en enlaces de Discord
assert(/getSafeUrl\(/i.test(html) || /parsed\.protocol\s*===\s*["']https:["']/i.test(html), 'Validación de protocolo https y dominio oficial en enlaces de Discord');

// ---------------------------------------------------------
// 4. PREVENCIÓN DE FUGA DE SECRETOS Y CONFIGURACIÓN GIT
// ---------------------------------------------------------
console.log('\n4. CONTROL DE SECRETOS Y CONFIGURACIÓN DE REPOSITORIO:');
assert(fs.existsSync('.gitignore'), 'Archivo .gitignore presente en la raíz');

if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  assert(gitignore.includes('.env'), '.gitignore bloquea archivos de entorno .env');
  assert(gitignore.includes('node_modules'), '.gitignore bloquea directorio node_modules');
  assert(gitignore.includes('*.pem') || gitignore.includes('*.key'), '.gitignore bloquea claves criptográficas privadas (*.pem, *.key)');
}

// Búsqueda de posibles claves secretas filtradas
const secretPatterns = [
  /AIza[0-9A-Za-z-_]{35}/, // Google API Key
  /sk_live_[0-9a-zA-Z]{24}/, // Stripe Secret Key
  /ghp_[0-9a-zA-Z]{36}/, // GitHub Personal Access Token
  /BEGIN (RSA|EC|PRIVATE) KEY/ // Private Key PEM
];

let leaksFound = 0;
secretPatterns.forEach(pattern => {
  if (pattern.test(html) || pattern.test(vercelContent)) {
    leaksFound++;
  }
});
assert(leaksFound === 0, `Escaneo de credenciales: Cero claves privadas o secretos detectados en el código`);

// ---------------------------------------------------------
// 5. HARDENING DEL SERVIDOR BACKEND (SERVER.PS1)
// ---------------------------------------------------------
console.log('\n5. HARDENING DEL SERVIDOR BACKEND (SERVER.PS1):');
const psContent = fs.readFileSync('server.ps1', 'utf8');

assert(psContent.includes('StartsWith($canonicalRoot'), 'Protección contra Path-Traversal (CWE-22) mediante validación de ruta canónica');
assert(psContent.includes('$request.HttpMethod -ne "GET"'), 'Restricción de métodos HTTP (Solo admite GET y HEAD, bloquea POST/PUT/DELETE no autorizados)');
assert(psContent.includes('forbiddenFiles') || psContent.includes('server.ps1'), 'Bloqueo explícito de acceso a código fuente y scripts privados del servidor');
assert(psContent.includes('Add-SecurityHeaders'), 'Inyección de cabeceras de seguridad HTTP en servidor local');

// ---------------------------------------------------------
// 6. PROTECCIÓN DE FORMULARIOS Y APIS (API/CONTACT.JS)
// ---------------------------------------------------------
console.log('\n6. PROTECCIÓN DE FORMULARIOS Y ENDPOINTS DE ENTRADA:');
assert(fs.existsSync('api/contact.js'), 'Endpoint seguro api/contact.js implementado');

if (fs.existsSync('api/contact.js')) {
  const apiCode = fs.readFileSync('api/contact.js', 'utf8');
  assert(apiCode.includes('rateLimitMap') || apiCode.includes('MAX_REQUESTS'), 'Control de Rate Limiting por IP implementado contra ataques de fuerza bruta/spam');
  assert(apiCode.includes('website') || apiCode.includes('company_hp'), 'Trampa Honeypot activa para detección y descarte silencioso de bots');
  assert(apiCode.includes('sanitizeInput'), 'Sanitización de caracteres de control y etiquetas HTML en backend');
  assert(apiCode.includes('isValidEmail'), 'Validación robusta de formato de correo electrónico RFC');
  assert(apiCode.includes('req.method !== \'POST\''), 'Rechazo estricto de métodos HTTP no autorizados (HTTP 405)');
}

// ---------------------------------------------------------
// 7. PRIVACIDAD Y DERECHOS DIGITALES (RGPD & LOPDGDD)
// ---------------------------------------------------------
console.log('\n7. PRIVACIDAD Y PROTECCIÓN DE DATOS (RGPD / LOPDGDD):');
assert(html.includes('id="privacy-modal"'), 'Modal accesible de Política de Privacidad y Aviso Legal presente en la web');
assert(html.includes('Responsable del Tratamiento'), 'Identificación del responsable del tratamiento y canales oficiales');
assert(html.includes('Zero Tracking Cookies') || html.includes('no utiliza cookies de seguimiento'), 'Declaración transparente de ausencia de cookies de seguimiento y analítica de terceros');

// ---------------------------------------------------------
// 8. SEGURIDAD DE ENLACES EXTERNOS (ANTI-TABNABBING)
// ---------------------------------------------------------
console.log('\n8. SEGURIDAD DE ENLACES EXTERNOS (ANTI-REVERSE-TABNABBING):');
const linkRegex = /<a\b([^>]*)>/gi;
let lm;
let externalLinks = 0;
let safeLinks = 0;

while ((lm = linkRegex.exec(html)) !== null) {
  const attrs = lm[1];
  if (/target=["']_blank["']/i.test(attrs)) {
    externalLinks++;
    if (/rel=["'][^"']*noopener[^"']*["']/i.test(attrs) && /rel=["'][^"']*noreferrer[^"']*["']/i.test(attrs)) {
      safeLinks++;
    }
  }
}
assert(externalLinks > 0 && safeLinks === externalLinks, `El 100% de los enlaces externos (${safeLinks}/${externalLinks}) tienen rel="noopener noreferrer"`);

// ---------------------------------------------------------
// RESUMEN FINAL
// ---------------------------------------------------------
console.log('\n====================================================');
console.log(`RESULTADO DE LA BATERÍA DE CIBERSEGURIDAD:`);
console.log(`  ✅ Superadas: ${passes}`);
console.log(`  ⚠️ Advertencias: ${warnings}`);
console.log(`  ❌ Errores: ${errors}`);
console.log('====================================================\n');

process.exit(errors > 0 ? 1 : 0);
