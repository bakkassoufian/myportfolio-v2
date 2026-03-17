(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.header');

  // Menu mobile
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('is-open'));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
      });
    });
  }

  // Header au scroll (optionnel : fond plus opaque)
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.scrollY;
      if (currentScroll > 80) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
      } else {
        header.style.background = 'rgba(15, 23, 42, 0.85)';
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Animation au scroll (révélation douce des sections)
  const sections = document.querySelectorAll('.section');
  const observerOptions = { rootMargin: '-10% 0px -10% 0px', threshold: 0 };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
  });

  // Fallback photo : afficher initiales "SB" si l'image ne charge pas
  const heroPhoto = document.querySelector('.hero-photo img');
  if (heroPhoto) {
    heroPhoto.addEventListener('error', function () {
      const wrap = this.closest('.hero-photo');
      if (wrap && !wrap.querySelector('.hero-photo-fallback')) {
        const fallback = document.createElement('span');
        fallback.className = 'hero-photo-fallback';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.textContent = 'SB';
        fallback.style.cssText = '';
        fallback.classList.add('hero-photo-fallback');
        wrap.style.position = 'relative';
        wrap.appendChild(fallback);
        this.style.opacity = '0';
      }
    });
  }
})();
