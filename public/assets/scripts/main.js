// Cada integrante agrega aquí el JavaScript de su sección

/* === Segmentos / CTA / Footer === */
(function () {
  'use strict';

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
})();
/* === Fin Segmentos / CTA / Footer === */
