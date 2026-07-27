// Configuración de enlaces externos de Mi Refugio.

// Chat directo con un especialista del Programa Quédate
// (Servicio de Salud Metropolitano Oriente, prevención del suicidio).
// Es la URL de chat directo de LiveChat (license_id 19090748), que abre
// la conversación con un psicólogo sin pasar por la home del sitio.
// Si el programa cambia de proveedor, actualizar solo esta constante.
export const PSYCHOLOGIST_CHAT_URL = "https://direct.lc.chat/19090748/";

// Abre el chat en una pestaña nueva sin perder Mi Refugio.
export function openPsychologistChat() {
  window.open(PSYCHOLOGIST_CHAT_URL, "_blank", "noopener,noreferrer");
}
