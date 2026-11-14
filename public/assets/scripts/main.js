// Cada integrante agrega aquí el JavaScript de su sección

/* === Segmentos / CTA / Footer === */
(function () {
  'use strict';

  var segReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* --- Aparición al hacer scroll (data-reveal="seg|cta|footer") --- */
  var segRevealEls = document.querySelectorAll('[data-reveal]');

  if (!segReducedMotion.matches && 'IntersectionObserver' in window) {
    var segRevealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var prefix = el.getAttribute('data-reveal');
        segRevealObserver.unobserve(el);
        el.classList.add(prefix + '-visible');

        // Al terminar la entrada se quitan las clases para no interferir con los hover
        var onEnd = function (event) {
          if (event.target !== el || event.propertyName !== 'opacity') return;
          el.removeEventListener('transitionend', onEnd);
          el.classList.remove(prefix + '-reveal', prefix + '-visible');
        };
        el.addEventListener('transitionend', onEnd);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(segRevealEls, function (el) {
      el.classList.add(el.getAttribute('data-reveal') + '-reveal');
      segRevealObserver.observe(el);
    });
  }

  /* --- Segmentos: tilt 3D siguiendo el mouse (solo escritorio con mouse) --- */
  var segTiltQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  var segMaxTilt = 6; // grados

  Array.prototype.forEach.call(document.querySelectorAll('.seg-card'), function (card) {
    card.addEventListener('mousemove', function (event) {
      if (!segTiltQuery.matches || segReducedMotion.matches) return;
      var rect = card.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      card.classList.add('seg-tilting');
      card.style.setProperty('--seg-ry', (x * segMaxTilt * 2).toFixed(2) + 'deg');
      card.style.setProperty('--seg-rx', (-y * segMaxTilt * 2).toFixed(2) + 'deg');
    });

    card.addEventListener('mouseleave', function () {
      card.classList.remove('seg-tilting');
      card.style.removeProperty('--seg-rx');
      card.style.removeProperty('--seg-ry');
    });
  });

  /* --- CTA: formulario de lista de espera (no envía datos a ningún servidor) --- */
  var ctaForm = document.getElementById('cta-form');

  if (ctaForm) {
    var ctaFields = {
      email: document.getElementById('cta-email'),
      tipo: document.getElementById('cta-tipo'),
      distrito: document.getElementById('cta-distrito')
    };
    var ctaStatus = document.getElementById('cta-status');
    var ctaEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var ctaValidators = {
      email: function (value) {
        if (!value) return 'Ingresa tu correo para avisarte del lanzamiento.';
        if (!ctaEmailRegex.test(value)) return 'Ingresa un correo válido (ej. nombre@correo.com).';
        return '';
      },
      tipo: function (value) {
        return value ? '' : 'Selecciona qué tipo de usuario eres.';
      },
      distrito: function (value) {
        return value ? '' : 'Indica tu distrito.';
      }
    };

    var ctaSetError = function (name, message) {
      var field = ctaFields[name];
      var error = document.getElementById('cta-' + name + '-error');
      error.textContent = message;
      if (message) {
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    };

    var ctaValidateField = function (name) {
      var message = ctaValidators[name](ctaFields[name].value.trim());
      ctaSetError(name, message);
      return !message;
    };

    // Limpia el error del campo en cuanto el usuario lo corrige
    Object.keys(ctaFields).forEach(function (name) {
      var eventName = ctaFields[name].tagName === 'SELECT' ? 'change' : 'input';
      ctaFields[name].addEventListener(eventName, function () {
        if (ctaFields[name].getAttribute('aria-invalid') === 'true') {
          ctaValidateField(name);
        }
      });
    });

    ctaForm.addEventListener('submit', function (event) {
      event.preventDefault();
      ctaStatus.textContent = '';

      var firstInvalid = null;
      Object.keys(ctaFields).forEach(function (name) {
        if (!ctaValidateField(name) && !firstInvalid) {
          firstInvalid = ctaFields[name];
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var alias = document.getElementById('cta-alias').value.trim();
      ctaForm.reset();
      ctaStatus.textContent = '¡Listo' + (alias ? ', ' + alias : '') +
        '! Te avisaremos cuando Vigía esté disponible en tu distrito. No guardamos datos personales.';
    });
  }

  /* --- Footer: año dinámico --- */
  var footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
})();
/* === Fin Segmentos / CTA / Footer === */
