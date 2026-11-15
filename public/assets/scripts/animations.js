/* === Segmentos, CTA y Footer: efectos visuales === */
(function () {
  'use strict';

  var root = document.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // El estado inicial oculto del CSS solo aplica con .js: sin JS todo queda visible
  root.classList.add('js');

  /* --- Aparición al entrar en pantalla (data-reveal="seg|cta|footer") --- */
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      var order = {}; // posición dentro de este lote, por sección

      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var prefix = el.getAttribute('data-reveal');
        order[prefix] = order[prefix] || 0;

        revealObserver.unobserve(el); // se dispara una sola vez
        // 120ms entre elementos que entran juntos (ej. las 4 tarjetas en escritorio)
        el.style.setProperty('--' + prefix + '-delay', (order[prefix]++ * 120) + 'ms');
        el.classList.add(prefix + '-visible');
      });
    }, { threshold: 0.2 });

    Array.prototype.forEach.call(document.querySelectorAll('[data-reveal]'), function (el) {
      el.classList.add(el.getAttribute('data-reveal') + '-reveal');
      revealObserver.observe(el);
    });
  }

  /* --- Segmentos: tilt 3D sutil con el mouse (solo dispositivos con mouse) --- */
  var tiltQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
  var maxTilt = 6; // grados

  Array.prototype.forEach.call(document.querySelectorAll('.seg-card'), function (card) {
    var frame = 0;
    var pointerX = 0;
    var pointerY = 0;

    var applyTilt = function () {
      frame = 0;
      var rect = card.getBoundingClientRect();
      var x = (pointerX - rect.left) / rect.width - 0.5;  // -0.5 a 0.5
      var y = (pointerY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--seg-ry', (x * maxTilt * 2).toFixed(2) + 'deg');
      card.style.setProperty('--seg-rx', (-y * maxTilt * 2).toFixed(2) + 'deg');
    };

    card.addEventListener('mousemove', function (event) {
      if (!tiltQuery.matches || reducedMotion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      card.classList.add('seg-tilting');
      if (!frame) frame = window.requestAnimationFrame(applyTilt);
    });

    card.addEventListener('mouseleave', function () {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      card.classList.remove('seg-tilting');
      card.style.removeProperty('--seg-rx');
      card.style.removeProperty('--seg-ry');
    });
  });

  /* --- Footer: botón volver arriba con scroll suave --- */
  var topBtn = document.getElementById('footer-top');
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  }
})();
/* === Fin Segmentos, CTA y Footer === */
