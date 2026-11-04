/**
 * TM STUDIO — API SEGURA DE CONTACTO (SERVERLESS / VERCEL FUNCTION)
 * Arquitectura de Defensa en Profundidad:
 * - Rate Limiting por IP (Anti-Brute Force / Anti-Spam)
 * - Trampa Honeypot contra bots automáticos
 * - Validación y Sanitización estricta de entradas (Anti-XSS / Anti-Injection)
 * - Límites estrictos de tamaño de payload
 * - Cabeceras de seguridad HTTP
 */

// Memoria volátil para Rate Limiting (en entornos distribuidos se recomienda Upstash / Redis)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS_PER_WINDOW = 5;

// Limpieza periódica de IPs expiradas para prevenir fugas de memoria
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);
if (cleanupTimer.unref) {
  cleanupTimer.unref();
}

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Eliminar caracteres peligrosos HTML
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Eliminar caracteres de control
    .trim();
}

function isValidEmail(email) {
  if (typeof email !== 'string' || email.length > 254) return false;
  // RFC 5322 regex estándar simplificado
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

module.exports = async function handler(req, res) {
  // 1. Cabeceras de Seguridad para Respuestas de API
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  // 2. Control estricto de Método HTTP
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Solo se admiten solicitudes POST.'
    });
  }

  // 3. Control de Tipo de Contenido
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return res.status(415).json({
      error: 'Unsupported Media Type',
      message: 'El contenido debe enviarse en formato application/json.'
    });
  }

  // 4. Rate Limiting por Dirección IP
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const rateData = rateLimitMap.get(clientIp) || { count: 0, startTime: now };

  if (now - rateData.startTime > RATE_LIMIT_WINDOW_MS) {
    rateData.count = 1;
    rateData.startTime = now;
  } else {
    rateData.count++;
  }
  rateLimitMap.set(clientIp, rateData);

  if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Has superado el límite de solicitudes. Inténtalo de nuevo más tarde.'
    });
  }

  try {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Bad Request', message: 'Cuerpo de solicitud inválido.' });
    }

    // 5. Trampa Honeypot Anti-Spam
    // Si el campo invisible 'website' o 'company_hp' tiene contenido, es un bot automatizado
    if (body.website || body.company_hp) {
      // Simular éxito para engañar al bot sin procesar nada
      return res.status(200).json({ success: true, message: 'Solicitud procesada correctamente.' });
    }

    // 6. Sanitización y Validación de Campos
    const nombre = sanitizeInput(body.nombre || '');
    const email = String(body.email || '').trim().toLowerCase();
    const mensaje = sanitizeInput(body.mensaje || '');
    const servicio = sanitizeInput(body.servicio || 'General');

    // Validación de Límites de Tamaño y Formato
    if (!nombre || nombre.length < 2 || nombre.length > 80) {
      return res.status(422).json({
        error: 'Unprocessable Entity',
        field: 'nombre',
        message: 'El nombre debe tener entre 2 y 80 caracteres.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(422).json({
        error: 'Unprocessable Entity',
        field: 'email',
        message: 'Por favor, introduce una dirección de correo electrónico válida.'
      });
    }

    if (!mensaje || mensaje.length < 10 || mensaje.length > 2000) {
      return res.status(422).json({
        error: 'Unprocessable Entity',
        field: 'mensaje',
        message: 'El mensaje debe tener entre 10 y 2000 caracteres.'
      });
    }

    // 7. Notificación Automática al Servidor de Discord de TM Studio
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1567605999949455360/t_dpWz07BdA1c4J0vvl1zaQHmTwFHdLOr4DoA7Ye5_sdVPbJ56UHWnG-kMb5EZT_FnCu';

    try {
      const https = require('https');
      const urlObj = new URL(discordWebhookUrl);
      const discordPayload = JSON.stringify({
        username: 'TM Studio Lead Notifier',
        avatar_url: 'https://tmstudio.es/tm-studio-emblem.jpg',
        embeds: [{
          title: '📩 ¡Nuevo Cliente / Solicitud de Presupuesto!',
          description: 'Se ha recibido un nuevo contacto desde el sitio web de **TM Studio**.',
          color: 2450411,
          fields: [
            { name: '👤 Nombre', value: nombre, inline: true },
            { name: '📧 Correo', value: email, inline: true },
            { name: '🛠️ Servicio', value: servicio, inline: true },
            { name: '💬 Mensaje', value: mensaje.length > 950 ? mensaje.substring(0, 950) + '...' : mensaje, inline: false }
          ],
          footer: { text: 'TM Studio Autonomous DevOps · 2026' },
          timestamp: new Date().toISOString()
        }]
      });

      const dReq = https.request({
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(discordPayload)
        }
      });
      dReq.on('error', (err) => console.error('Discord Webhook error:', err.message));
      dReq.write(discordPayload);
      dReq.end();
    } catch (e) {
      console.error('Error al despachar notificación a Discord:', e.message);
    }

    console.log(`[CONTACTO RECIBIDO] IP: ${clientIp} | Asunto: ${servicio} | Email válido: Sí`);

    return res.status(200).json({
      success: true,
      message: 'Mensaje recibido correctamente. Te responderemos en menos de 24 horas.'
    });

  } catch (error) {
    // Gestión segura de errores: no filtrar stack traces ni rutas internas al cliente
    console.error('Error interno en procesamiento de contacto:', error.message);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Ha ocurrido un error inesperado al procesar tu solicitud.'
    });
  }
};
