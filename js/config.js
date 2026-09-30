/* =====================================================================
   CONFIGURACIÓN CENTRAL DE LA INVITACIÓN
   ---------------------------------------------------------------------
   Modifica aquí TODOS los datos de la boda. No necesitas tocar el resto
   del código. Cada bloque está comentado para que sepas qué cambiar.
   ===================================================================== */

const weddingConfig = {

  /* --- Pareja --------------------------------------------------------
     Nombres cortos (para títulos) y completos (para el sobre / firma). */
  couple: {
    bride: "Diana Mongui",
    groom: "Fernando Morales",
    shortBride: "Diana",
    shortGroom: "Fernando",
    initials: "F & D"
  },

  /* --- Foto de portada -----------------------------------------------
     Foto grande que aparece arriba en la portada, tras abrir el sobre.
     Coloca tu foto en assets/images/ y pon la ruta en image.
     Ej: image: "assets/images/portada.jpg"
     Si la dejas vacía ("") se muestra un marco elegante de reemplazo. */
  cover: {
    image: "assets/images/imagen1.jpeg", // ruta de la foto de portada
    alt: "Fernando y Diana",              // texto alternativo (accesibilidad)
    focus: "center 35%"                   // encuadre: qué parte de la foto priorizar
  },

  /* --- Fecha y hora de la ceremonia ----------------------------------
     Formato de fecha: AAAA-MM-DD. Hora en 24h: "HH:MM".
     Se usan tanto para la cuenta regresiva como para los textos. */
  date: "2026-11-15",
  ceremonyTime: "15:00",
  timeLabel: "3:00 p. m.",
  // Partes de la fecha para la composición elegante (día grande al centro).
  dateParts: {
    weekday: "Domingo",
    day: "15",
    month: "Noviembre",
    year: "2026"
  },
  // Texto largo alternativo (por si se necesita en una sola línea).
  dateLabelLong: "Domingo 15 de noviembre de 2026",

  /* --- Texto de invitación -------------------------------------------
     El mensaje con el que formalmente invitan a la boda. */
  invitation: {
    eyebrow: "Con la bendición de Dios y de nuestras familias",
    text: "Queremos invitarte a celebrar el día en que uniremos nuestras vidas en matrimonio. Será una alegría inmensa contar contigo para ser testigo de esta promesa de amor que hacemos ante Dios.",
    image: "assets/images/imagen2.jpeg",  // foto de esta sección (deja "" para ocultarla)
    imageAlt: "Fernando y Diana"
  },

  /* --- Ceremonia -----------------------------------------------------
     Pega en mapsUrl el enlace de Google Maps del lugar. */
  ceremony: {
    // Cada línea de venueLines se muestra en un renglón distinto.
    venueLines: [
      "Iglesia Cristiana Pentecostés de Colombia",
      "Movimiento Misionero Mundial",
      "Sede Olímpico"
    ],
    address: "Carrera 13A #21-09, Barrio Olímpico, Villavicencio, Meta",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Carrera%2013A%20%2321-09%2C%20Villavicencio%2C%20Meta"
  },

  /* --- Versículo -----------------------------------------------------
     Referencia y texto bíblico que se muestran en su sección. */
  verse: {
    reference: "Eclesiastés 4:12",
    text: "Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto."
  },

  /* --- WhatsApp (confirmación de asistencia) -------------------------
     number: solo dígitos, con indicativo país y sin signos ni espacios.
     message: el texto que se autocompleta en el chat. */
  whatsapp: {
    number: "573124415817",
    message: "Hola Fernando y Diana, quiero confirmar mi asistencia a su matrimonio del 15 de noviembre de 2026. ¡Muchas gracias por la invitación!"
  },

  /* --- Código de vestimenta ------------------------------------------ */
  dressCode: {
    title: "Elegante",
    whiteReserved: true
  },

  /* --- Recepción -----------------------------------------------------
     Cambia enabled a true y completa los campos cuando esté definida. */
  reception: {
    enabled: true,
    venue: "Residencia de la madre de la novia",
    time: "5:30 p. m.",
    address: "Calle 20 #15-61, Barrio El Remanso, Villavicencio, Meta",
    note: "",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Calle%2020%20%2315-61%2C%20Villavicencio%2C%20Meta"
  },

  /* --- Galería de fotografías ----------------------------------------
     Cambia enabled a true y agrega rutas dentro de images cuando tengas
     las fotos. Ej: { src: "assets/images/foto1.jpg", alt: "Diana y Fernando" } */
  gallery: {
    enabled: true,
    images: [
      { src: "assets/images/momento1.jpeg", alt: "Fernando y Diana" },
      { src: "assets/images/momento2.jpeg", alt: "Fernando y Diana" },
      { src: "assets/images/momento3.jpeg", alt: "Fernando y Diana" },
      { src: "assets/images/momento4.jpeg", alt: "Fernando y Diana" },
      { src: "assets/images/momento5.jpeg", alt: "Fernando y Diana" },
      { src: "assets/images/momento6.jpeg", alt: "Fernando y Diana" }
    ],
    placeholderCount: 6 // cuadros de muestra mientras no haya fotos
  },

  /* --- Música --------------------------------------------------------
     Coloca el archivo en assets/audio/ y pon su ruta en src.
     Luego cambia enabled a true. */
  music: {
    enabled: true,
    src: "assets/audio/cancion.mpeg",
    autoplay: true // intenta sonar al abrir el sobre (interacción del usuario)
  },

  /* --- Regalos (lluvia de sobres) ------------------------------------
     Activa transferEnabled y completa bank cuando quieras mostrar datos
     bancarios. Ningún dato se muestra si transferEnabled es false. */
  gifts: {
    type: "lluvia-de-sobres",
    transferEnabled: false,
    bank: {
      bankName: "",
      accountType: "",
      accountNumber: "",
      holder: "",
      extra: ""
    }
  },

  /* --- Crédito del diseñador (pie de página, enlaza a WhatsApp) -------- */
  credit: {
    text: "Diseñado con amor por OracleTech",
    whatsapp: "573502837223", // solo dígitos, con indicativo de país
    message: "¡Hola OracleTech! Vi la invitación que hiciste y me encantó."
  }
};

// Exponer la configuración de forma global.
window.weddingConfig = weddingConfig;
