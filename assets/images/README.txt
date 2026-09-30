CARPETA DE FOTOGRAFÍAS
======================

Coloca aquí las fotos de Diana y Fernando (ej: foto1.jpg, foto2.jpg ...).

------------------------------------------------------------
FOTO DE PORTADA (la grande de arriba, tras abrir el sobre)
------------------------------------------------------------
1. Guarda tu foto aquí, por ejemplo: assets/images/portada.jpg
2. Edita js/config.js en el bloque "cover":

  cover: {
    image: "assets/images/portada.jpg",
    alt: "Diana y Fernando",
    focus: "center 35%"   // sube/baja el encuadre: "center 20%" (más arriba),
                          // "center 50%" (centro), "center 70%" (más abajo)
  }

Recomendado para la portada:
- Foto horizontal o cuadrada se ve muy bien (ocupa todo el ancho).
- Buena resolución (mín. 1200px de ancho), peso < 500 KB.
- Si la cara queda cortada, ajusta "focus" hasta encuadrarla bien.

Mientras no pongas foto, se muestra un marco elegante que dice
"Su fotografía aquí".

------------------------------------------------------------
GALERÍA (varias fotos más abajo)
------------------------------------------------------------

Recomendado:
- Formato JPG o WebP optimizado.
- Orientación vertical (retrato) para verse bien en móvil.
- Peso por imagen: idealmente menos de 300 KB.

Para activarlas, edita js/config.js:

  gallery: {
    enabled: true,
    images: [
      { src: "assets/images/foto1.jpg", alt: "Diana y Fernando" },
      { src: "assets/images/foto2.jpg", alt: "Diana y Fernando" }
    ]
  }

Puedes agregar entre 4 y 6 fotografías.
