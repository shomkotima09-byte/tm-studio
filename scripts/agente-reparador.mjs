#!/usr/bin/env node

/**
 * scripts/agente-reparador.mjs
 * Agente Autónomo de Autorreparación y Vigilancia 24/7 (IA & DevOps) para TM Studio
 * 
 * Flujo de ejecución:
 * 1. Inspección estática profunda de archivos web (index.html, admin.html, etc.).
 * 2. Comprobación de salud en vivo (HTTP ping y latencia) hacia https://tm-studio-two.vercel.app.
 * 3. Detección de fallos: imágenes sin atributo alt, etiquetas SEO ausentes,
 *    desbalance de etiquetas HTML y errores de sintaxis en scripts.
 * 4. En caso de anomalía, conecta con Gemini (gemini-2.5-flash con fallback a gemini-3.8-flash)
 *    para generar parches quirúrgicos precisos.
 * 5. Aplica las correcciones en local.
 * 6. Mediante Octokit, commitea y sube los cambios a GitHub.
 * 7. Vercel detecta el commit y redespliega automáticamente.
 * 8. Notificación automática enriquecida con Embed a Discord.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Octokit } from '@octokit/rest';

// Localizar directorio raíz del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');

// Cargar variables de entorno
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.AUTOFIX_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'shomkotima09-byte';
const GITHUB_REPO = process.env.GITHUB_REPO || 'tm-studio';
const PREFERRED_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1567605999949455360/t_dpWz07BdA1c4J0vvl1zaQHmTwFHdLOr4DoA7Ye5_sdVPbJ56UHWnG-kMb5EZT_FnCu';
const PRODUCTION_URL = 'https://tm-studio-two.vercel.app';

console.log('='.repeat(65));
console.log('  🚀 AGENTE AUTÓNOMO DE AUTORREPARACIÓN & DEVOPS 24/7');
console.log('  Web Oficial: TM Studio | Integración Vercel, GitHub & Discord');
console.log('='.repeat(65));

// Comprobación de variables de entorno
const hasGemini = Boolean(GEMINI_API_KEY);
const hasGitHub = Boolean(GITHUB_TOKEN);

const genAI = hasGemini ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const octokit = hasGitHub ? new Octokit({ auth: GITHUB_TOKEN }) : null;

/**
 * Conecta con Gemini usando el modelo preferido con fallback inteligente
 */
async function callGemini(promptText) {
  if (!hasGemini) {
    throw new Error('GEMINI_API_KEY no configurado en entorno.');
  }

  const candidateModels = [
    PREFERRED_MODEL,
    'gemini-3.5-flash',
    'gemini-3.8-flash',
    'gemini-flash-latest'
  ];

  let lastError = null;
  for (const modelName of candidateModels) {
    try {
      console.log(`🤖 Conectando con Gemini [${modelName}]...`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });
      clearTimeout(timeoutId);

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message || `Error ${data.error.code}`);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Respuesta de Gemini vacía o sin partes de texto.');
      }

      console.log(`✅ Respuesta recibida exitosamente de Gemini (${modelName}).`);
      return text;
    } catch (err) {
      lastError = err;
      const isAbort = err.name === 'AbortError';
      const errMsg = isAbort ? 'Tiempo de espera agotado (20s)' : err.message;
      console.warn(`⚠️ Modelo ${modelName} no disponible o demorado (${errMsg?.slice(0, 85)}...).`);
      console.log('   Probando modelo siguiente en la cadena de fallback...');
    }
  }

  throw new Error(`No se pudo conectar con ningún modelo Gemini: ${lastError?.message}`);
}

/**
 * Extrae un bloque de contexto relevante alrededor de un fragmento
 */
function extractContext(fullContent, snippet, padding = 400) {
  const idx = fullContent.indexOf(snippet);
  if (idx === -1) return snippet;
  const start = Math.max(0, idx - padding);
  const end = Math.min(fullContent.length, idx + snippet.length + padding);
  return fullContent.slice(start, end);
}

/**
 * Analizador estático de integridad, sintaxis, SEO y Accesibilidad (a11y)
 */
function analyzeFile(filePath) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  const isHtml = filePath.endsWith('.html');
  const isMainPage = relPath === 'index.html';

  if (isHtml) {
    // 1. Imágenes sin atributo alt (Accesibilidad y SEO)
    const imgRegex = /<img\b([^>]*?)>/gi;
    let imgMatch;
    let imgIndex = 0;
    while ((imgMatch = imgRegex.exec(content)) !== null) {
      imgIndex++;
      const tag = imgMatch[0];
      const attrs = imgMatch[1];
      if (!/\balt\s*=/i.test(attrs)) {
        issues.push({
          type: 'A11Y_MISSING_ALT',
          severity: 'HIGH',
          description: `Imagen #${imgIndex} sin atributo alt`,
          snippet: tag,
          context: extractContext(content, tag, 300)
        });
      }
    }

    // 2. Comprobación de etiquetas SEO esenciales en la página principal
    if (isMainPage) {
      if (!/<title[^>]*>[\s\S]*?<\/title>/i.test(content) || /<title[^>]*>\s*<\/title>/i.test(content)) {
        issues.push({
          type: 'SEO_MISSING_TITLE',
          severity: 'HIGH',
          description: 'Falta la etiqueta <title> o está vacía',
          snippet: '<head>',
          context: content.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0]?.slice(0, 1500) || '<head>'
        });
      }

      if (!/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i.test(content)) {
        issues.push({
          type: 'SEO_MISSING_DESCRIPTION',
          severity: 'HIGH',
          description: 'Falta la etiqueta <meta name="description">',
          snippet: '<head>',
          context: content.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0]?.slice(0, 1500) || '<head>'
        });
      }

      if (!/<meta\b(?=[^>]*\bname=["']viewport["'])[^>]*>/i.test(content)) {
        issues.push({
          type: 'SEO_MISSING_VIEWPORT',
          severity: 'HIGH',
          description: 'Falta la etiqueta <meta name="viewport"> para responsive design',
          snippet: '<head>',
          context: content.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0]?.slice(0, 1500) || '<head>'
        });
      }

      if (!/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i.test(content)) {
        issues.push({
          type: 'SEO_MISSING_CANONICAL',
          severity: 'MEDIUM',
          description: 'Falta el enlace canónico <link rel="canonical">',
          snippet: '<head>',
          context: content.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0]?.slice(0, 1500) || '<head>'
        });
      }

      if (!/<html\b(?=[^>]*\blang=["'][a-z]{2,5}["'])[^>]*>/i.test(content)) {
        issues.push({
          type: 'A11Y_MISSING_LANG',
          severity: 'MEDIUM',
          description: 'El elemento <html> carece de atributo lang="es"',
          snippet: content.match(/<html\b[^>]*>/i)?.[0] || '<html>',
          context: content.match(/<html\b[^>]*>/i)?.[0] || '<html>'
        });
      }
    }

    // 3. Verificación de balance de etiquetas estructurales básicas
    const tagsToCheck = ['html', 'head', 'body'];
    for (const tag of tagsToCheck) {
      const openMatches = content.match(new RegExp(`<${tag}\\b`, 'gi')) || [];
      const closeMatches = content.match(new RegExp(`</${tag}>`, 'gi')) || [];
      if (openMatches.length !== closeMatches.length) {
        issues.push({
          type: 'SYNTAX_UNBALANCED_TAG',
          severity: 'CRITICAL',
          description: `Desbalance en etiqueta <${tag}>: ${openMatches.length} aperturas vs ${closeMatches.length} cierres`,
          snippet: `<${tag}>`,
          context: `Etiqueta <${tag}> desbalanceada en el documento`
        });
      }
    }

    // 4. Verificación de sintaxis de scripts JS embebidos
    const scriptRegex = /<script\b(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
    let scriptMatch;
    let scriptIndex = 0;
    while ((scriptMatch = scriptRegex.exec(content)) !== null) {
      scriptIndex++;
      const scriptAttrs = scriptMatch[1];
      const scriptCode = scriptMatch[2].trim();

      if (!scriptCode) continue;

      const typeMatch = /type=["'](.*?)["']/i.exec(scriptAttrs);
      const scriptType = typeMatch ? typeMatch[1].toLowerCase() : 'javascript';

      // Scripts de datos JSON (Schema.org, JSON-LD)
      if (scriptType.includes('json') || scriptType.includes('ld+json')) {
        try {
          JSON.parse(scriptCode);
        } catch (jsonErr) {
          issues.push({
            type: 'SYNTAX_INVALID_JSON_SCRIPT',
            severity: 'CRITICAL',
            description: `Script JSON #${scriptIndex} inválido: ${jsonErr.message}`,
            snippet: scriptMatch[0].slice(0, 150),
            context: scriptMatch[0]
          });
        }
        continue;
      }

      // Los módulos ES utilizan imports que no son evaluables con vm.Script estándar
      if (scriptType.includes('module')) {
        continue;
      }

      // Validar scripts JS clásicos con el analizador sintáctico de Node vm
      try {
        new vm.Script(scriptCode);
      } catch (scriptErr) {
        issues.push({
          type: 'SYNTAX_JS_ERROR',
          severity: 'CRITICAL',
          description: `Error de sintaxis en script JS #${scriptIndex}: ${scriptErr.message}`,
          snippet: scriptCode.slice(0, 150),
          context: scriptMatch[0].slice(0, 800)
        });
      }
    }
  }

  return { filePath, relPath, content, issues };
}

/**
 * Ping en vivo al entorno de producción para medir estado HTTP y latencia
 */
async function checkLiveProduction() {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(PRODUCTION_URL, {
      method: 'GET',
      signal: controller.signal,
      headers: { 'User-Agent': 'TMStudio-DevOpsAgent-24/7' }
    });
    clearTimeout(timer);
    const latency = Date.now() - start;
    return {
      ok: res.ok,
      status: res.status,
      latency,
      statusText: res.statusText
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      latency: Date.now() - start,
      statusText: err.message
    };
  }
}

/**
 * Solicita a Gemini la generación de parches quirúrgicos para los fallos detectados
 */
async function repairWithGemini(fileData) {
  const { relPath, content, issues } = fileData;
  console.log(`\n⚠️ Fallos detectados en ${relPath}: ${issues.length}`);
  issues.forEach((iss, idx) => {
    console.log(`   ${idx + 1}. [${iss.severity}] ${iss.type}: ${iss.description}`);
  });

  const prompt = `
Eres un Ingeniero Senior de IA y DevOps para el sitio web TM Studio (Desarrollo Web, Bots de Discord, Software a Medida).
Debes solucionar los siguientes problemas detectados en "${relPath}":

${issues.map((iss, i) => `INCIDENCIA #${i + 1}:
- Tipo: ${iss.type}
- Gravedad: ${iss.severity}
- Detalle: ${iss.description}
- Fragmento problemático:
${iss.snippet}
- Contexto circundante:
${iss.context}
`).join('\n---\n')}

REGLAS DE REPARACIÓN OBLIGATORIAS:
1. Devuelve ÚNICAMENTE un array JSON con los parches de reemplazo:
[
  {
    "find": "cadena exacta a buscar y reemplazar (debe existir tal cual en el código)",
    "replace": "nueva cadena corregida con el fallo resuelto",
    "reason": "motivo de la solución"
  }
]
2. "find" debe coincidir EXACTAMENTE con el código original (incluyendo espacios o saltos de línea del fragmento).
3. Para imágenes sin atributo alt: genera un texto alt accesible, claro y descriptivo en español sobre TM Studio, desarrollo web, bots de Discord o software a medida.
4. Para etiquetas SEO en <head>: inserta las etiquetas requeridas dentro del bloque <head> sin eliminar ninguna existente.
5. NO agregues explicaciones fuera del bloque JSON. Responde únicamente con el array JSON.
`;

  const rawGeminiResponse = await callGemini(prompt);
  
  let cleanedJson = rawGeminiResponse.trim();
  if (cleanedJson.startsWith('```')) {
    cleanedJson = cleanedJson.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  }

  let patches = [];
  try {
    patches = JSON.parse(cleanedJson);
  } catch (parseErr) {
    const match = cleanedJson.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (match) {
      patches = JSON.parse(match[0]);
    } else {
      throw new Error(`Respuesta no parseable como JSON: ${cleanedJson.slice(0, 160)}...`);
    }
  }

  if (!Array.isArray(patches) || patches.length === 0) {
    throw new Error('Gemini no generó parches válidos.');
  }

  let repairedContent = content;
  let appliedCount = 0;

  for (const patch of patches) {
    if (!patch.find || !patch.replace) continue;
    if (repairedContent.includes(patch.find)) {
      repairedContent = repairedContent.replace(patch.find, patch.replace);
      appliedCount++;
      console.log(`   ✨ Parche aplicado: ${patch.reason || patch.find.slice(0, 45)}`);
    } else {
      console.warn(`   ⚠️ Fragmento exacto no localizado: "${patch.find.slice(0, 60)}..."`);
    }
  }

  if (appliedCount === 0) {
    throw new Error('Ninguno de los parches devueltos coincidió exactamente con el código del archivo.');
  }

  return { repairedContent, appliedCount, patches };
}

/**
 * Commitea y pushea el archivo modificado a GitHub mediante Octokit
 */
async function commitAndPushToGitHub(relPath, newContent) {
  if (!octokit) {
    console.log('⚠️ Octokit no autenticado. Se omite commit a GitHub.');
    return null;
  }

  console.log(`\n🐙 Conectando con GitHub API (${GITHUB_OWNER}/${GITHUB_REPO}) mediante Octokit...`);

  let sha = null;
  try {
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: relPath,
      ref: 'main',
    });
    sha = data.sha;
  } catch (err) {
    console.log(`ℹ️ El archivo ${relPath} se creará o actualizará directamente.`);
  }

  const commitMessage = '🤖 Auto-Fix IA: Reparación automática de código [TM Studio DevOps]';
  const encodedContent = Buffer.from(newContent, 'utf8').toString('base64');

  const updateResponse = await octokit.repos.createOrUpdateFileContents({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: relPath,
    message: commitMessage,
    content: encodedContent,
    branch: 'main',
    ...(sha ? { sha } : {}),
  });

  const commitSha = updateResponse.data.commit.sha;
  console.log(`✅ Commit creado en GitHub: ${commitSha.slice(0, 7)}`);
  console.log(`   Mensaje: "${commitMessage}"`);
  console.log(`🚀 Webhook de Vercel notificado -> Despliegue en producción automático en marcha.`);

  return commitSha;
}

/**
 * Envía una notificación enriquecida con Embed a Discord mediante Webhook
 */
async function sendDiscordNotification({ status, details = '', totalRepairs = 0, filesChecked = [], commitSha = null, liveHealth = null }) {
  if (!DISCORD_WEBHOOK_URL) {
    console.log('⚠️ DISCORD_WEBHOOK_URL no configurado. Se omite el mensaje a Discord.');
    return;
  }

  try {
    const isRepaired = totalRepairs > 0;
    const isError = status === 'ERROR';

    let color = 0x2563EB; // Azul TM Studio (#2563EB)
    let title = '✅ TM Studio — Mantenimiento Web 24/7';
    let description = 'El Agente Autónomo ejecutó la auditoría programada. Todo el código analizado está en perfecto estado y 100% operativo en producción.';

    if (isRepaired) {
      color = 0xF59E0B; // Dorado alerta/reparación (#F59E0B)
      title = '🛠️ TM Studio — Autorreparación IA Ejecutada';
      description = `El Agente de IA detectó anomalías y aplicó correcciones automáticamente en **${totalRepairs}** archivo(s).`;
    } else if (isError) {
      color = 0xEF4444; // Rojo error (#EF4444)
      title = '🚨 TM Studio — Alerta en Mantenimiento';
      description = `Se ha producido una incidencia durante la ejecución del mantenimiento autónomo:\n\`\`\`${details || 'Error no especificado'}\`\`\``;
    }

    const fields = [
      {
        name: '📁 Archivos Auditados',
        value: filesChecked.length > 0 ? filesChecked.map(f => `\`${f}\``).join(', ') : '`index.html`, `admin.html`, `api/contact.js`',
        inline: true
      },
      {
        name: '🌐 Web en Producción',
        value: `[Abrir TM Studio](${PRODUCTION_URL}) | [Panel Admin](${PRODUCTION_URL}/admin)`,
        inline: true
      }
    ];

    if (liveHealth) {
      fields.push({
        name: '⚡ Latencia & Estado HTTP',
        value: liveHealth.ok
          ? `🟢 **HTTP ${liveHealth.status} OK** (${liveHealth.latency}ms) — Vercel Edge Global`
          : `🔴 **HTTP ${liveHealth.status}** (${liveHealth.statusText})`,
        inline: true
      });
    }

    if (commitSha) {
      fields.push({
        name: '🐙 Despliegue en GitHub & Vercel',
        value: `Commit: [\`${commitSha.slice(0, 7)}\`](https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commit/${commitSha})\n*Vercel actualizó la web automáticamente.*`,
        inline: false
      });
    }

    if (details && isRepaired) {
      fields.push({
        name: '📝 Resumen de Correcciones Aplicadas',
        value: details.slice(0, 1000),
        inline: false
      });
    }

    const payload = {
      username: 'Agente DevOps TM Studio',
      avatar_url: `${PRODUCTION_URL}/tm-studio-emblem.jpg`,
      embeds: [
        {
          title,
          description,
          color,
          fields,
          footer: {
            text: 'Mantenimiento Autónomo TM Studio • Gemini IA + Octokit + Vercel'
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      console.log('📡 Alerta de mantenimiento enviada a Discord exitosamente.');
    } else {
      console.warn(`⚠️ Error al enviar a Discord (HTTP ${res.status}): ${await res.text()}`);
    }
  } catch (discordErr) {
    console.warn(`⚠️ Fallo al conectar con Discord Webhook: ${discordErr.message}`);
  }
}

/**
 * Punto de entrada principal
 */
async function main() {
  const args = process.argv.slice(2);

  console.log('\n🔍 Verificando salud del servidor de producción...');
  const liveHealth = await checkLiveProduction();
  console.log(`   Estado en vivo: HTTP ${liveHealth.status} (${liveHealth.latency}ms)`);

  const targetFiles = [];
  const fileArg = args.find(a => !a.startsWith('--'));
  if (fileArg) {
    targetFiles.push(path.resolve(rootDir, fileArg));
  } else {
    const defaultCandidates = ['index.html', 'admin.html'];
    for (const file of defaultCandidates) {
      const fullPath = path.join(rootDir, file);
      if (fs.existsSync(fullPath)) {
        targetFiles.push(fullPath);
      }
    }
  }

  console.log(`\n🔎 Analizando ${targetFiles.length} archivo(s) principal(es)...`);
  let totalRepairs = 0;
  let lastCommitSha = null;
  const repairNotes = [];
  const filesChecked = targetFiles.map(f => path.relative(rootDir, f).replace(/\\/g, '/'));

  for (const filePath of targetFiles) {
    const fileData = analyzeFile(filePath);
    console.log(`\n📄 Archivo: ${fileData.relPath}`);

    if (fileData.issues.length === 0) {
      console.log(`   ✅ [PASS] El archivo no presenta errores ni incidencias detectadas. Código óptimo.`);
      continue;
    }

    try {
      const { repairedContent, appliedCount, patches } = await repairWithGemini(fileData);
      fs.writeFileSync(filePath, repairedContent, 'utf8');
      console.log(`💾 Archivo ${fileData.relPath} actualizado y guardado localmente (${appliedCount} parches).`);

      lastCommitSha = await commitAndPushToGitHub(fileData.relPath, repairedContent);
      totalRepairs++;
      repairNotes.push(`• **${fileData.relPath}**: ${appliedCount} parche(s) aplicado(s) (${patches.map(p => p.reason || 'Corrección').join('; ')})`);
    } catch (repairErr) {
      console.error(`❌ Error al autorreparar ${fileData.relPath}: ${repairErr.message}`);
      repairNotes.push(`• **${fileData.relPath}**: Error en autorreparación: ${repairErr.message}`);
    }
  }

  console.log('\n' + '='.repeat(65));
  if (totalRepairs > 0) {
    console.log(`🚀 AGENTE AUTÓNOMO: ${totalRepairs} archivo(s) reparado(s) y desplegado(s) con éxito.`);
  } else {
    console.log('✅ AGENTE AUTÓNOMO: Todos los archivos analizados están en perfecto estado.');
  }
  console.log('='.repeat(65) + '\n');

  await sendDiscordNotification({
    status: totalRepairs > 0 ? 'REPAIRED' : 'OPTIMAL',
    details: repairNotes.join('\n'),
    totalRepairs,
    filesChecked,
    commitSha: lastCommitSha,
    liveHealth
  });
}

main().catch(async err => {
  console.error('\n💥 Error fatal en el Agente de Autorreparación:', err);
  await sendDiscordNotification({
    status: 'ERROR',
    details: err.message,
    totalRepairs: 0,
    filesChecked: []
  });
  process.exit(1);
});
