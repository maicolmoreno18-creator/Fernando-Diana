/* =====================================================================
   LÓGICA DE LA INVITACIÓN · Diana & Fernando
   Lee window.weddingConfig y da vida a la página. JS vanilla.
   ===================================================================== */
(function () {
  "use strict";

  var cfg = window.weddingConfig || {};
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Utilidades cortas */
  function $(id) { return document.getElementById(id); }
  function setText(id, value) { var el = $(id); if (el && value != null) el.textContent = value; }

  /* ---------------------------------------------------------------
     1. Rellenar contenido desde la configuración
     --------------------------------------------------------------- */
  function fillContent() {
    // Sobre y firmas (siempre él primero, luego ella)
    if (cfg.couple) {
      var names = cfg.couple.groom + " & " + cfg.couple.bride;
      setText("envNames", names);
    }

    // Foto de portada (hero)
    fillCoverHero();

    // Texto de invitación (+ foto opcional)
    if (cfg.invitation) {
      setText("inviteEyebrow", cfg.invitation.eyebrow);
      setText("inviteText", cfg.invitation.text);

      var invFig = $("invitePhoto");
      var invImg = $("invitePhotoImg");
      if (invFig && invImg && cfg.invitation.image) {
        invImg.src = cfg.invitation.image;
        invImg.alt = cfg.invitation.imageAlt || "";
        invFig.hidden = false;
        invImg.onerror = function () { invFig.hidden = true; };
      }
    }

    // Versículo
    if (cfg.verse) {
      setText("verseRef", cfg.verse.reference);
      setText("verseText", "“" + cfg.verse.text + "”");
    }

    // Nuestro día: composición de fecha (día grande al centro)
    if (cfg.dateParts) {
      setText("ddWeekday", cfg.dateParts.weekday);
      setText("ddDay", cfg.dateParts.day);
      setText("ddMonth", cfg.dateParts.month);
      setText("ddYear", cfg.dateParts.year);
    }
    setText("dayTime", cfg.timeLabel);
    if (cfg.ceremony) {
      // Nombre del lugar: soporta varias líneas (venueLines) o una sola (venue)
      var venueEl = $("dayVenue");
      if (venueEl) {
        venueEl.innerHTML = "";
        var lines = cfg.ceremony.venueLines ||
                    (cfg.ceremony.venue ? [cfg.ceremony.venue] : []);
        lines.forEach(function (line, idx) {
          var span = document.createElement("span");
          span.className = "venue-line" + (idx === 0 ? " venue-line--main" : "");
          span.textContent = line;
          venueEl.appendChild(span);
        });
      }
      setText("dayAddress", cfg.ceremony.address);
      var mapsBtn = $("mapsBtn");
      if (mapsBtn) {
        if (cfg.ceremony.mapsUrl) {
          mapsBtn.href = cfg.ceremony.mapsUrl;
        } else {
          mapsBtn.setAttribute("aria-disabled", "true");
          mapsBtn.style.display = "none";
        }
      }
    }

    // Código de vestimenta
    if (cfg.dressCode) {
      setText("dcTitle", cfg.dressCode.title);
      var dcNote = $("dcNote");
      if (dcNote && cfg.dressCode.whiteReserved === false) {
        dcNote.style.display = "none";
      }
    }

    fillReception();
    fillGallery();
    fillGifts();
    setupRsvp();
    setupMusic();
    setupCredit();
  }

  /* ---------------------------------------------------------------
     Crédito del diseñador (enlaza a WhatsApp)
     --------------------------------------------------------------- */
  function setupCredit() {
    var link = $("creditLink");
    if (!link) return;
    var c = cfg.credit || {};
    if (c.text) {
      // Mantiene el ✦ y actualiza el texto con "OracleTech" resaltado
      var mark = link.querySelector(".credit-mark");
      link.textContent = "";
      if (mark) link.appendChild(mark);
      link.insertAdjacentHTML("beforeend",
        " " + c.text.replace(/OracleTech/gi, "<strong>OracleTech</strong>"));
    }
    var num = (c.whatsapp || "").replace(/\D/g, "");
    if (num) {
      var msg = encodeURIComponent(c.message || "");
      link.href = "https://wa.me/" + num + (msg ? "?text=" + msg : "");
    }
  }

  /* ---------------------------------------------------------------
     1b. Foto de portada (hero)
     --------------------------------------------------------------- */
  function fillCoverHero() {
    var img = $("coverHeroImg");
    var ph = $("coverHeroPlaceholder");
    var cover = cfg.cover || {};

    if (!img || !ph) return;

    if (cover.image) {
      img.src = cover.image;
      img.alt = cover.alt || (cfg.couple ? cfg.couple.bride + " y " + cfg.couple.groom : "Foto");
      if (cover.focus) img.style.objectPosition = cover.focus;

      // Si la imagen falla al cargar, volvemos al placeholder
      img.onerror = function () {
        img.hidden = true;
        ph.hidden = false;
      };
      img.onload = function () {
        img.hidden = false;
        ph.hidden = true;
      };
      // Si ya está en caché y cargada
      if (img.complete && img.naturalWidth > 0) {
        img.hidden = false;
        ph.hidden = true;
      }
    } else {
      // Sin foto configurada: mostrar el marco placeholder
      img.hidden = true;
      ph.hidden = false;
    }
  }

  /* ---------------------------------------------------------------
     2. Recepción (opcional)
     --------------------------------------------------------------- */
  function fillReception() {
    var section = $("reception");
    if (!section) return;
    var rec = cfg.reception || {};
    if (!rec.enabled) { section.hidden = true; return; }

    section.hidden = false;
    setText("recVenue", rec.venue);
    setText("recTime", rec.time);
    setText("recAddress", rec.address);
    setText("recNote", rec.note);

    var recBtn = $("recMapsBtn");
    if (recBtn && rec.mapsUrl) {
      recBtn.href = rec.mapsUrl;
      recBtn.hidden = false;
    }
  }

  /* ---------------------------------------------------------------
     3. Galería
     --------------------------------------------------------------- */
  function fillGallery() {
    var grid = $("galleryGrid");
    var soon = $("gallerySoon");
    if (!grid) return;

    var gal = cfg.gallery || {};
    var images = Array.isArray(gal.images) ? gal.images : [];

    if (gal.enabled && images.length) {
      images.forEach(function (img, index) {
        // Botón para que sea accesible y se pueda abrir con clic o teclado
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gallery-item";
        btn.setAttribute("aria-label", "Ampliar fotografía " + (index + 1));

        var el = document.createElement("img");
        el.src = img.src;
        el.alt = img.alt || (cfg.couple ? cfg.couple.groom + " y " + cfg.couple.bride : "Fotografía");
        el.loading = "lazy";
        btn.appendChild(el);

        btn.addEventListener("click", function () {
          openLightbox(images, index);
        });

        grid.appendChild(btn);
      });
      if (soon) soon.hidden = true;
      setupLightbox();
    } else {
      // Placeholders elegantes durante el desarrollo
      var count = gal.placeholderCount || 6;
      for (var i = 0; i < count; i++) {
        var ph = document.createElement("div");
        ph.className = "gallery-item is-placeholder";
        ph.setAttribute("aria-hidden", "true");
        grid.appendChild(ph);
      }
    }
  }

  /* ---------------------------------------------------------------
     3b. Lightbox de la galería (abrir foto al hacer clic)
     --------------------------------------------------------------- */
  var lbImages = [];
  var lbIndex = 0;

  function setupLightbox() {
    var lb = $("lightbox");
    if (!lb || lb.dataset.ready) return;
    lb.dataset.ready = "1";

    $("lbClose").addEventListener("click", closeLightbox);
    $("lbPrev").addEventListener("click", function () { lbStep(-1); });
    $("lbNext").addEventListener("click", function () { lbStep(1); });

    // Cerrar al tocar el fondo (fuera de la imagen)
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });

    // Teclado: Esc cierra, flechas navegan
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") lbStep(-1);
      else if (e.key === "ArrowRight") lbStep(1);
    });
  }

  function openLightbox(images, index) {
    lbImages = images;
    lbIndex = index;
    var lb = $("lightbox");
    if (!lb) return;
    lbRender();
    lb.hidden = false;
    document.body.style.overflow = "hidden"; // bloquea scroll de fondo
  }

  function closeLightbox() {
    var lb = $("lightbox");
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = "";
    document.body.style.overflowX = "clip";
    document.body.style.overflowY = "auto";
  }

  function lbStep(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    lbRender();
  }

  function lbRender() {
    var img = lbImages[lbIndex];
    if (!img) return;
    var el = $("lbImg");
    el.src = img.src;
    el.alt = img.alt || "Fotografía";
    setText("lbCounter", (lbIndex + 1) + " / " + lbImages.length);
  }

  /* ---------------------------------------------------------------
     4. Lluvia de sobres (datos bancarios opcionales)
     --------------------------------------------------------------- */
  function fillGifts() {
    var box = $("giftsBank");
    if (!box) return;
    var gifts = cfg.gifts || {};
    if (!gifts.transferEnabled || !gifts.bank) { box.hidden = true; return; }

    var b = gifts.bank;
    box.hidden = false;
    setText("bankName", b.bankName);
    setText("bankType", b.accountType);
    setText("bankNumber", b.accountNumber);
    setText("bankHolder", b.holder);

    var extraRow = $("bankExtraRow");
    if (b.extra) { setText("bankExtra", b.extra); }
    else if (extraRow) { extraRow.style.display = "none"; }
  }

  /* ---------------------------------------------------------------
     5. Confirmación por WhatsApp
     --------------------------------------------------------------- */
  function setupRsvp() {
    var btn = $("rsvpBtn");
    if (!btn || !cfg.whatsapp) return;
    var num = (cfg.whatsapp.number || "").replace(/\D/g, "");
    var msg = encodeURIComponent(cfg.whatsapp.message || "");
    btn.href = "https://wa.me/" + num + (msg ? "?text=" + msg : "");
  }

  /* ---------------------------------------------------------------
     6. Reproductor de música
     --------------------------------------------------------------- */
  function setupMusic() {
    var toggle = $("musicToggle");
    var audio = $("audioPlayer");
    var icon = $("musicIcon");
    var music = cfg.music || {};

    if (!toggle || !audio) return;
    if (!music.enabled || !music.src) { toggle.hidden = true; return; }

    audio.src = music.src;

    toggle.addEventListener("click", function () {
      if (audio.paused) {
        audio.play().then(function () {
          toggle.classList.add("is-playing");
          if (icon) icon.textContent = "❚❚";
          toggle.setAttribute("aria-label", "Pausar música");
        }).catch(function () { /* navegador bloqueó la reproducción */ });
      } else {
        audio.pause();
        toggle.classList.remove("is-playing");
        if (icon) icon.textContent = "▶";
        toggle.setAttribute("aria-label", "Reproducir música");
      }
    });

    function playMusic() {
      audio.play().then(function () {
        toggle.classList.add("is-playing");
        if (icon) icon.textContent = "❚❚";
        toggle.setAttribute("aria-label", "Pausar música");
      }).catch(function () { /* navegador bloqueó; el usuario puede usar el botón */ });
    }

    // Se muestra recién al abrir el sobre (ver revealInvitation)
    window.__showMusicToggle = function () { toggle.hidden = false; };
    // Reproducir al abrir el sobre si autoplay está activo
    window.__playMusic = (music.autoplay !== false) ? playMusic : function () {};
  }

  /* ---------------------------------------------------------------
     6b. Pétalos que caen (ráfaga al abrir + lluvia ambiental esporádica)
     --------------------------------------------------------------- */
  var PETAL_TONES = ["#dcb6a3", "#c99a86", "#d9c295", "#e6dac6", "#c8a96a"];

  // Crea un solo pétalo que cae y se elimina solo al terminar.
  function spawnPetal(layer, opts) {
    opts = opts || {};
    var petal = document.createElement("span");
    petal.className = "petal";

    var size = 10 + Math.random() * 12;            // 10–22 px
    var duration = (opts.minDur || 6) + Math.random() * (opts.durRange || 4);
    petal.style.left = Math.random() * 100 + "%";
    petal.style.width = size + "px";
    petal.style.height = (size * 1.5) + "px";
    petal.style.color = PETAL_TONES[Math.floor(Math.random() * PETAL_TONES.length)];
    petal.style.animationDuration = duration + "s";
    petal.style.animationDelay = (opts.maxDelay ? Math.random() * opts.maxDelay : 0) + "s";
    petal.innerHTML = '<svg viewBox="0 0 16 26"><use href="#petal"></use></svg>';

    layer.appendChild(petal);

    // Auto-limpieza cuando la animación termina (no deja nodos acumulados)
    var life = (duration + (opts.maxDelay || 0) + 0.5) * 1000;
    setTimeout(function () {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
    }, life);
  }

  // Ráfaga inicial al abrir el sobre.
  function spawnPetals() {
    var layer = $("petals");
    if (!layer) return;
    for (var i = 0; i < 30; i++) {
      spawnPetal(layer, { minDur: 5, durRange: 3.5, maxDelay: 2.5 });
    }
  }

  // Lluvia ambiental: 1–2 pétalos cada cierto tiempo, de forma esporádica.
  function startAmbientPetals() {
    var layer = $("petals");
    if (!layer || reduceMotion) return;

    function tick() {
      // No genera pétalos si la pestaña está en segundo plano (ahorra recursos)
      if (!document.hidden) {
        var burst = 1 + Math.floor(Math.random() * 2); // 1 o 2 pétalos
        for (var i = 0; i < burst; i++) {
          spawnPetal(layer, { minDur: 7, durRange: 4, maxDelay: 1.5 });
        }
      }
      // Próximo pétalo entre 2.5 y 6 segundos (esporádico, no constante)
      var next = 2500 + Math.random() * 3500;
      setTimeout(tick, next);
    }

    // Empieza tras la ráfaga inicial para que no se sienta continuo
    setTimeout(tick, 4000);
  }

  /* ---------------------------------------------------------------
     7. Apertura del sobre
     --------------------------------------------------------------- */
  function setupEnvelope() {
    var stage = $("envelopeStage");
    var scene = document.querySelector(".envelope-scene");
    var envelope = $("envelope");
    var hint = $("envHint");
    var opened = false;

    if (!stage || !envelope) { revealInvitation(); return; }

    function open() {
      if (opened) return;
      opened = true;

      if (hint) hint.classList.add("is-gone");
      envelope.classList.add("is-open");
      if (scene) scene.classList.add("is-opening");
      envelope.setAttribute("aria-expanded", "true");

      // Reproducir la música aquí (dentro del clic, que el navegador sí permite)
      if (typeof window.__playMusic === "function") window.__playMusic();

      if (!reduceMotion) spawnPetals();

      var wait = reduceMotion ? 100 : 1800;
      setTimeout(function () {
        stage.classList.add("is-hidden");
        revealInvitation();
        // Quitar del flujo tras la transición
        setTimeout(function () { stage.style.display = "none"; }, 950);
      }, wait);
    }

    envelope.addEventListener("click", open);
    envelope.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  }

  /* ---------------------------------------------------------------
     8. Mostrar la invitación
     --------------------------------------------------------------- */
  function revealInvitation() {
    var inv = $("invitation");
    if (!inv) return;
    inv.setAttribute("aria-hidden", "false");
    inv.classList.add("is-visible");
    document.body.style.overflow = "";      // limpia el bloqueo total
    document.body.style.overflowX = "hidden"; // pero mantiene X bloqueado
    document.body.style.overflowY = "auto";   // y permite scroll vertical

    if (typeof window.__showMusicToggle === "function") window.__showMusicToggle();

    // Lluvia ambiental de pétalos mientras se navega la invitación
    startAmbientPetals();

    // Revelar la portada de inmediato
    var firstReveal = inv.querySelector(".reveal");
    if (firstReveal) firstReveal.classList.add("is-in");
  }

  /* ---------------------------------------------------------------
     9. Aparición progresiva al hacer scroll
     --------------------------------------------------------------- */
  function setupReveals() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      });
    }, {
      // Se dispara apenas la sección asoma por la parte de abajo (200px antes),
      // así el contenido ya está visible cuando llegas y no se siente "trabado".
      threshold: 0,
      rootMargin: "0px 0px 200px 0px"
    });

    items.forEach(function (el) { obs.observe(el); });
  }

  /* ---------------------------------------------------------------
     10. Cuenta regresiva
     --------------------------------------------------------------- */
  function setupCountdown() {
    var grid = $("countdownGrid");
    var done = $("countdownDone");
    if (!grid) return;

    // Construir fecha objetivo (hora local)
    var dateStr = cfg.date || "2026-11-15";
    var timeStr = cfg.ceremonyTime || "15:00";
    var parts = dateStr.split("-");
    var tparts = timeStr.split(":");
    var target = new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[2], 10),
      parseInt(tparts[0], 10) || 0,
      parseInt(tparts[1], 10) || 0,
      0
    );

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function tick() {
      var diff = target.getTime() - Date.now();
      if (diff <= 0) {
        grid.hidden = true;
        var label = document.querySelector(".countdown-label");
        if (label) label.hidden = true;
        if (done) done.hidden = false;
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      var days = Math.floor(s / 86400);
      var hours = Math.floor((s % 86400) / 3600);
      var mins = Math.floor((s % 3600) / 60);
      var secs = s % 60;

      setText("cdDays", days);
      setText("cdHours", pad(hours));
      setText("cdMinutes", pad(mins));
      setText("cdSeconds", pad(secs));
    }

    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------------
     Inicio
     --------------------------------------------------------------- */
  function init() {
    document.body.style.overflow = "hidden"; // bloquear scroll tras el sobre
    fillContent();
    setupEnvelope();
    setupReveals();
    setupCountdown();

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
