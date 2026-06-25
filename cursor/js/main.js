(function () {
  'use strict';

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const contactForm = document.getElementById('contactForm');
  const ctaForm = document.getElementById('ctaForm');
  const formFeedback = document.getElementById('formFeedback');

  // Mobile menu
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  }, { passive: true });

  // Scroll reveal
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // Contact form
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formFeedback.textContent = '¡Mensaje enviado! Te responderemos pronto.';
    formFeedback.classList.add('success');
    contactForm.reset();

    setTimeout(() => {
      formFeedback.textContent = '';
      formFeedback.classList.remove('success');
    }, 5000);
  });

  // Waitlist form
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = ctaForm.querySelector('input[type="email"]');
    if (!emailInput.value.trim()) {
      emailInput.focus();
      return;
    }

    const note = ctaForm.parentElement.querySelector('.cta__note');
    const originalText = note.textContent;
    note.textContent = '¡Registro exitoso! Te avisaremos cuando lancemos la beta.';
    note.style.color = '#22c55e';
    ctaForm.reset();

    setTimeout(() => {
      note.textContent = originalText;
      note.style.color = '';
    }, 5000);
  });
})();
