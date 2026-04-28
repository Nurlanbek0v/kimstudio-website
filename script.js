// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  }
});

// Animated counters
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Intersection Observer for counters and reveal animations
const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -40px 0px' };

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.direction-card, .about-text, .about-image, .trainer-info, .trainer-image, .gallery-item, .contact-item, .contact-form'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 3) * 100;
  revealObserver.observe(el);
});

// Form submit → open pre-filled WhatsApp message
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name      = data.get('name')      || '';
  const phone     = data.get('phone')     || '';
  const direction = data.get('direction') || '';
  const message   = data.get('message')  || '';

  const text = [
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Направление: ${direction}`,
    message ? `Сообщение: ${message}` : '',
  ].filter(Boolean).join('\n');

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Открываем WhatsApp...';
  btn.disabled = true;

  window.open(`https://wa.me/996707430777?text=${encodeURIComponent(text)}`, '_blank');

  form.reset();
  setTimeout(() => {
    btn.textContent = 'Отправить заявку';
    btn.disabled = false;
  }, 2000);
});

// Smooth active link highlight based on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--pink)'
      : '';
  });
}, { passive: true });
