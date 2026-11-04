// =============================================================================
// TM STUDIO — Conexión Fácil y Segura con Firebase & Firestore (Modular v10+)
// =============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =============================================================================
// 1. CONFIGURACIÓN: Pega aquí los datos de tu consola de Firebase
// (Firebase Console -> Configuración del Proyecto -> General -> Tus apps -> SDK de configuración)
// =============================================================================
export const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// =============================================================================
// 2. INICIALIZACIÓN DE FIREBASE Y FIRESTORE
// =============================================================================
export let app = null;
export let db = null;
export let isFirebaseReady = false;

// Verificamos de forma segura si ya colocaste tus credenciales
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "TU_API_KEY") {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirebaseReady = true;
    console.log("🔥 [Firebase] Inicializado con éxito. Conectado al proyecto:", firebaseConfig.projectId);
  } catch (error) {
    console.error("❌ [Firebase] Error al iniciar la aplicación Firebase:", error);
  }
} else {
  console.log("ℹ️ [Firebase] Modo plantilla: Cuando pegues tus credenciales en 'firebase.js', Firestore se activará automáticamente.");
}

// =============================================================================
// 3. SEGURIDAD BÁSICA: SANITIZACIÓN Y VALIDACIÓN (Anti-XSS / Anti-Inyección)
// =============================================================================

/**
 * Limpia el texto para evitar inyecciones de código HTML, JavaScript o caracteres maliciosos.
 * @param {string} str - Texto a limpiar.
 * @param {number} maxLen - Longitud máxima permitida (por defecto 1500 caracteres).
 * @returns {string} Texto limpio y seguro.
 */
export function sanitizarTexto(str, maxLen = 1500) {
  if (typeof str !== "string") return "";
  return str
    .replace(/[<>]/g, "") // Elimina etiquetas HTML y caracteres < >
    .replace(/javascript:/gi, "") // Elimina protocolos javascript:
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Elimina caracteres invisibles de control
    .trim()
    .slice(0, maxLen);
}

/**
 * Valida un correo electrónico básico.
 * @param {string} email
 * @returns {boolean}
 */
export function validarEmail(email) {
  if (typeof email !== "string" || email.length > 254) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

// =============================================================================
// 4. SEGURIDAD BÁSICA: LÍMITE ANTI-SPAM (Cooldown de botones)
// =============================================================================

/**
 * Deshabilita temporalmente un botón para evitar que alguien pulse 50 veces seguidas.
 * @param {HTMLElement|string} boton - Elemento botón o su selector (ej: "#btn-enviar")
 * @param {number} segundos - Segundos que permanecerá bloqueado (por defecto 5 segundos)
 * @param {string} textoEspera - Texto temporal mientras está bloqueado
 * @returns {boolean} True si se pudo bloquear, False si ya estaba bloqueado.
 */
export function bloquearBotonTemporalmente(boton, segundos = 5, textoEspera = "Enviando...") {
  const el = typeof boton === "string" ? document.querySelector(boton) : boton;
  if (!el) return false;

  // Si ya está bloqueado, no permitir otro envío
  if (el.disabled || el.dataset.bloqueado === "true") {
    return false;
  }

  el.dataset.bloqueado = "true";
  el.disabled = true;
  el.style.cursor = "not-allowed";
  el.style.opacity = "0.6";

  const textoOriginal = el.innerHTML;
  if (textoEspera) {
    el.innerText = textoEspera;
  }

  let tiempoRestante = segundos;
  const timer = setInterval(() => {
    tiempoRestante--;
    if (tiempoRestante > 0 && textoEspera) {
      el.innerText = `${textoEspera} (${tiempoRestante}s)`;
    } else {
      clearInterval(timer);
      el.disabled = false;
      el.dataset.bloqueado = "false";
      el.style.cursor = "";
      el.style.opacity = "";
      el.innerHTML = textoOriginal;
    }
  }, 1000);

  return true;
}

// =============================================================================
// 5. ENVÍO SEGURO A FIRESTORE CON PROTECCIÓN Y VALIDACIÓN
// =============================================================================

/**
 * Guarda datos en cualquier colección de Firestore con validación, sanitización y anti-spam.
 * @param {string} coleccion - Nombre de la colección (ej: 'contactos', 'mensajes')
 * @param {object} datos - Objeto con los datos a guardar { nombre, email, mensaje, etc. }
 * @param {HTMLElement|string} [boton] - Botón que disparó el envío (opcional, para bloquearlo)
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
export async function guardarDatosSeguros(coleccion, datos, boton = null) {
  if (!isFirebaseReady || !db) {
    alert("⚠️ Firebase aún no está conectado. Revisa tu configuración en firebase.js.");
    return { success: false, error: "Firebase no inicializado" };
  }

  // 1. Anti-spam: si se pasó un botón, bloquearlo durante 5 segundos
  if (boton) {
    const sePudoBloquear = bloquearBotonTemporalmente(boton, 5, "Enviando...");
    if (!sePudoBloquear) {
      console.warn("⚠️ [Anti-Spam] Por favor, espera unos segundos antes de volver a enviar.");
      return { success: false, error: "Envío bloqueado por anti-spam" };
    }
  }

  // 2. Validación: verificar que no vengan campos vacíos
  if (!datos || typeof datos !== "object" || Object.keys(datos).length === 0) {
    alert("⚠️ No puedes enviar un formulario vacío.");
    return { success: false, error: "Datos vacíos" };
  }

  // 3. Sanitización estricta de todos los campos de texto
  const datosLimpios = {};
  for (const [clave, valor] of Object.entries(datos)) {
    if (typeof valor === "string") {
      const limpio = sanitizarTexto(valor);
      datosLimpios[clave] = limpio;
    } else {
      datosLimpios[clave] = valor;
    }
  }

  // Comprobar que al menos un campo tenga contenido real
  const tieneContenido = Object.values(datosLimpios).some(val => 
    typeof val === "string" ? val.length > 0 : val !== null && val !== undefined
  );

  if (!tieneContenido) {
    alert("⚠️ Por favor, rellena los campos requeridos antes de enviar.");
    return { success: false, error: "Campos requeridos vacíos" };
  }

  try {
    // Añadir timestamp del servidor para auditoría
    datosLimpios.timestamp = serverTimestamp();
    datosLimpios.fechaEnvio = new Date().toISOString();

    const docRef = await addDoc(collection(db, coleccion), datosLimpios);
    console.log(`✅ [Firestore] Datos guardados con seguridad en '${coleccion}'. ID:`, docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ [Firestore] Error al guardar datos:", error);
    alert("❌ Error al enviar datos: " + error.message);
    return { success: false, error: error.message };
  }
}

// =============================================================================
// 6. FUNCIÓN DE PRUEBA RÁPIDA (Con límite anti-spam incluido)
// =============================================================================
export async function probarFirebase(boton = null) {
  if (boton) {
    const sePudoBloquear = bloquearBotonTemporalmente(boton, 4, "Probando...");
    if (!sePudoBloquear) return false;
  }

  if (!isFirebaseReady || !db) {
    const advertencia = "⚠️ [Firebase] Aún no has configurado tus credenciales.\nAbre 'firebase.js' y reemplaza 'TU_API_KEY', 'TU_PROJECT_ID', etc. por los tuyos.";
    console.warn(advertencia);
    alert(advertencia);
    return false;
  }

  try {
    console.log("⏳ [Firebase] Enviando prueba a Firestore en la colección 'pruebas_conexion'...");
    const docRef = await addDoc(collection(db, "pruebas_conexion"), {
      mensaje: "¡Conexión exitosa desde TM Studio!",
      fecha: new Date().toISOString(),
      timestamp: serverTimestamp(),
      plataforma: "TM Studio Web"
    });

    const exitoTexto = `🎉 ¡CONEXIÓN EXITOSA CON FIRESTORE!\nSe ha guardado un documento de prueba con ID:\n${docRef.id}`;
    console.log("✅", exitoTexto);
    alert(exitoTexto);
    return true;
  } catch (error) {
    console.error("❌ [Firebase] Error al conectar con Firestore:", error);
    alert("❌ Error al guardar en Firestore:\n" + error.message + "\n\n💡 Pista: Comprueba que en la consola de Firebase hayas creado la base de datos Firestore y publicado las reglas de REGLAS_FIREBASE.txt.");
    return false;
  }
}

// Hacer utilidades accesibles en la consola del navegador
if (typeof window !== "undefined") {
  window.db = db;
  window.app = app;
  window.probarFirebase = probarFirebase;
  window.firebaseConfig = firebaseConfig;
  window.TM_FIREBASE = {
    sanitizarTexto,
    validarEmail,
    bloquearBotonTemporalmente,
    guardarDatosSeguros,
    probarFirebase
  };
}
