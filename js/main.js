/* ========================================
   PORTFOLIO - Main JavaScript
   Goodness Ogundare
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- MOBILE NAV TOGGLE ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  const toggleNav = () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleNav);
  navOverlay.addEventListener('click', toggleNav);

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleNav();
    });
  });

  // --- ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --- SCROLL REVEAL ANIMATIONS ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // --- TYPING EFFECT FOR HERO ---
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = JSON.parse(typingEl.dataset.words || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const current = words[wordIndex];
      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      setTimeout(type, delay);
    };

    setTimeout(type, 1000);
  }

  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- CONTACT FORM (mailto fallback) ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value;
      const email = contactForm.querySelector('[name="email"]').value;
      const message = contactForm.querySelector('[name="message"]').value;

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:goodybagwork11@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // --- STAGGER ANIMATION FOR CARDS ---
  const staggerContainers = document.querySelectorAll('.projects-grid, .skills-container');
  staggerContainers.forEach(container => {
    const cards = container.querySelectorAll('.reveal');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });
  });

});
