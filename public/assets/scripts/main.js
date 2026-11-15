// Cada integrante agrega aquí el JavaScript de su sección

// feature/navbar: menú móvil accesible y estado de scroll del header
(() => {
  const navbar = document.querySelector('.navbar');
  const toggleButton = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('#navbar-menu');

  if (!navbar || !toggleButton || !navMenu) return;

  const toggleIcon = toggleButton.querySelector('i');
  const navItems = navMenu.querySelectorAll('a');

  const setMenuOpen = (isOpen) => {
    navMenu.classList.toggle('is-open', isOpen);
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    toggleButton.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );

    if (toggleIcon) {
      toggleIcon.classList.toggle('fa-bars', !isOpen);
      toggleIcon.classList.toggle('fa-xmark', isOpen);
    }
  };

  toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isExpanded);
  });

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener('click', (event) => {
    const isOpen = navMenu.classList.contains('is-open');
    if (isOpen && !navbar.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
      setMenuOpen(false);
      toggleButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navMenu.classList.contains('is-open')) {
      setMenuOpen(false);
    }
  });

  const updateScrollState = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 10);
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
})();

/* === Segmentos / CTA / Footer === */
(function () {
  'use strict';

  var segReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Los efectos visuales (aparición, tilt, volver arriba) están en animations.js

  /* --- CTA: formulario de lista de espera (no envía datos a ningún servidor) --- */
  var ctaForm = document.getElementById('cta-form');

  if (ctaForm) {
    var ctaFields = {
      email: document.getElementById('cta-email'),
      tipo: document.getElementById('cta-tipo'),
      distrito: document.getElementById('cta-distrito')
    };
    var ctaStatus = document.getElementById('cta-status');
    var ctaStatusBox = ctaStatus.parentNode;
    var ctaBtn = ctaForm.querySelector('.cta-btn');
    var ctaBusy = false;
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

    // Reinicia una animación CSS quitando y volviendo a poner la clase
    var ctaReplayClass = function (el, className) {
      el.classList.remove(className);
      void el.offsetWidth;
      el.classList.add(className);
    };

    var ctaShake = function (field) {
      var control = field.parentNode;
      ctaReplayClass(control, 'cta-shake');
      control.addEventListener('animationend', function onEnd() {
        control.removeEventListener('animationend', onEnd);
        control.classList.remove('cta-shake');
      });
    };

    ctaForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (ctaBusy) return;

      ctaStatus.textContent = '';
      ctaStatusBox.classList.remove('cta-status-show');

      var firstInvalid = null;
      Object.keys(ctaFields).forEach(function (name) {
        if (!ctaValidateField(name)) {
          ctaShake(ctaFields[name]);
          if (!firstInvalid) firstInvalid = ctaFields[name];
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Estado de carga breve (simulado: no se envía nada a ningún servidor)
      var alias = document.getElementById('cta-alias').value.trim();
      ctaBusy = true;
      ctaBtn.classList.add('cta-loading');
      ctaBtn.setAttribute('aria-busy', 'true');
      ctaBtn.setAttribute('aria-disabled', 'true');

      window.setTimeout(function () {
        ctaBusy = false;
        ctaBtn.classList.remove('cta-loading');
        ctaBtn.removeAttribute('aria-busy');
        ctaBtn.removeAttribute('aria-disabled');
        ctaForm.reset();

        ctaReplayClass(ctaStatusBox, 'cta-status-show');
        ctaStatus.textContent = '¡Listo' + (alias ? ', ' + alias : '') +
          '! Te avisaremos cuando Vigía esté disponible en tu distrito. No guardamos datos personales.';
      }, segReducedMotion.matches ? 300 : 900);
    });
  }

  /* --- Footer: año dinámico --- */
  var footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
})();
/* === Fin Segmentos / CTA / Footer === */

// =========================================
// ANIMACIÓN: SECCIÓN PROBLEMA
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll('.problema-card');

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
    scrollObserver.observe(card);
  });
});
