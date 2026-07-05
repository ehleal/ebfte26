/**
 * DICCIONARIO DE CONTENIDOS BILINGUES (ESTRICTAMENTE ASCII BASICO)
 */
const dictionary = {
  en: {
    title: "Edgar Leal | Digital Card",
    location: "Monterrey, Mexico",
    bio: "Vegan pet friendly",
    vcardBtn: "Save Contact Info",
    emailBtn: "Email Me",
    footer: "Private Networking Card | Indexing Restricted"
  },
  es: {
    title: "Edgar Leal | Tarjeta Digital",
    location: "Monterrey, Mexico",
    bio: "Vegan pet friendly",
    vcardBtn: "Guardar Contacto",
    emailBtn: "Enviar Correo",
    footer: "Tarjeta de Red Privada | Indexacion Restringida"
  }
};

/**
 * CONTROL DE ESTADO DE IDIOMA INTERNO
 */
let currentLang = 'en';

function setLanguage(lang) {
  if (!dictionary[lang]) return;
  currentLang = lang;

  // Actualizacion de elementos del DOM
  document.title = dictionary[lang].title;
  document.getElementById('txt-location').textContent = dictionary[lang].location;
  document.getElementById('txt-bio').textContent = dictionary[lang].bio;
  document.getElementById('txt-vcard-btn').textContent = dictionary[lang].vcardBtn;
  document.getElementById('txt-email-btn').textContent = dictionary[lang].emailBtn;
  document.getElementById('txt-footer').textContent = dictionary[lang].footer;

  // Actualizacion de clases visuales en los botones selectores
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
}

/**
 * GENERADOR DINAMICO DE ARCHIVO UNIVERSAL VCARD (VCF)
 * Incorpora codificacion limpia y los metadatos de FTE Alumni requeridos.
 */
function downloadVCard() {
  // Estructuracion del contenido del standard vCard v3.0
  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Leal;Edgar;;;",
    "FN:Edgar Leal",
    "TEL;TYPE=CELL;TYPE=PREF:+528111770317",
    "EMAIL;TYPE=PREF;TYPE=INTERNET:edgarhlealb@gmail.com",
    "X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/_edgar.leal_/",
    "X-SOCIALPROFILE;TYPE=tiktok:https://www.tiktok.com/@edgar.leal81",
    "NOTE:FTE Alumni Leadership Academy Washington 2026 - Vegan pet friendly",
    "ADR;TYPE=HOME:;;Monterrey;Nuevo Leon;;Mexico",
    "END:VCARD"
  ].join("\r\n");

  // Creacion del archivo binario virtual en memoria (Blob)
  const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  
  // Elemento de anclaje temporal oculto para forzar ejecucion de un solo clic
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "Edgar_Leal_Contact.vcf";
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  
  // Limpieza de recursos de memoria asignados
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(url);
}