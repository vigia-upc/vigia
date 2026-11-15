/* === Efectos visuales: Hero, Problema, Cómo funciona, Características, Segmentos, CTA y Footer === */
(function () {
  'use strict';

  var root = document.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // El estado inicial oculto del CSS solo aplica con .js: sin JS todo queda visible
  root.classList.add('js');

  /* --- Aparición al entrar en pantalla (data-reveal="hero|problema|como|carac|seg|cta|footer") --- */
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

  /* --- Hero: el iris del pin sigue suavemente al mouse (solo escritorio) --- */
  var iris = document.querySelector('.hero-iris');
  var pin = document.querySelector('.hero-pin');
  var irisQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (iris && pin) {
    var irisX = 0, irisY = 0, irisTX = 0, irisTY = 0, irisFrame = 0;
    var maxX = 5, maxY = 2.5; // desplazamiento máximo en unidades del viewBox

    var stepIris = function () {
      irisX += (irisTX - irisX) * 0.12;
      irisY += (irisTY - irisY) * 0.12;
      iris.style.transform = 'translate(' + irisX.toFixed(2) + 'px,' + irisY.toFixed(2) + 'px)';
      if (Math.abs(irisTX - irisX) > 0.02 || Math.abs(irisTY - irisY) > 0.02) {
        irisFrame = window.requestAnimationFrame(stepIris);
      } else {
        irisFrame = 0;
      }
    };

    window.addEventListener('mousemove', function (event) {
      if (!irisQuery.matches || reducedMotion.matches) return;
      var rect = pin.getBoundingClientRect();
      if (!rect.width || rect.bottom < 0 || rect.top > window.innerHeight) return;
      // Centro del ojo: (60, 56) dentro del viewBox de 120 x 150
      var dx = event.clientX - (rect.left + rect.width * 0.5);
      var dy = event.clientY - (rect.top + rect.height * 56 / 150);
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var reach = Math.min(1, dist / 320);
      irisTX = (dx / dist) * maxX * reach;
      irisTY = (dy / dist) * maxY * reach;
      if (!irisFrame) irisFrame = window.requestAnimationFrame(stepIris);
    }, { passive: true });
  }

  /* --- Footer: botón volver arriba con scroll suave --- */
  var topBtn = document.getElementById('footer-top');
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  }
})();
/* === Fin efectos visuales === */
