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
