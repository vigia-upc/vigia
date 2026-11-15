// Cada integrante agrega aquí el JavaScript de su sección

/* === feature/como-funciona: línea de progreso de los 3 pasos === */
(function () {
  'use strict';

  var steps = document.getElementById('como-steps');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!steps || reduced || !('IntersectionObserver' in window)) return;

  steps.classList.add('como-anim');

  var stepsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      stepsObserver.unobserve(entry.target);
      entry.target.classList.add('como-on');
    });
  }, { threshold: 0.35 });

  stepsObserver.observe(steps);
})();
/* === Fin feature/como-funciona === */
