/* ===================================================
   WESTFINK CLONE — script.js
   Interactions: sticky header, hamburger, scroll reveal
=================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // === STICKY HEADER ===
  const header = document.getElementById('site-header');
  function handleScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // === HAMBURGER MENU ===
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  hamburgerBtn.addEventListener('click', function () {
    hamburgerBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  // Close nav when clicking a link
  const navLinks = mobileNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburgerBtn.classList.remove('active');
      mobileNav.classList.remove('open');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      mobileNav.classList.remove('open');
    }
  });

  // === SCROLL REVEAL ===
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for sibling elements
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          let index = Array.from(siblings).indexOf(entry.target);
          index = Math.min(index, 4); // cap at 4 for timing
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(el => observer.observe(el));

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  // === PILLAR CARDS — glow effect on hover ===
  const pillarCards = document.querySelectorAll('.pillar-card');
  pillarCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // === METHODOLOGY CAROUSEL (mobile swipe) ===
  // Simple touch handling for method steps on mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  document.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; }, { passive: true });

});
