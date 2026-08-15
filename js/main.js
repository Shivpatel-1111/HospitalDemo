// Mobile nav toggle
// Global image fallback — if any image fails to load, swap in a clean placeholder
// so the layout never shows a broken-image icon (useful once real photos are added).
document.addEventListener('error', (e) => {
  const el = e.target;
  if (el.tagName === 'IMG' && !el.dataset.fallbackApplied) {
    el.dataset.fallbackApplied = 'true';
    const w = el.naturalWidth || 800;
    const h = el.naturalHeight || 600;
    el.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${w || 800}" height="${h || 600}" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#EAF3FA"/>
        <g fill="#0B4F8A" opacity="0.35">
          <path d="M400 210c-40 35-100 90-100 150a100 100 0 0 0 200 0c0-60-60-115-100-150z" transform="scale(0.9) translate(45,40)"/>
        </g>
        <text x="400" y="330" font-family="sans-serif" font-size="20" fill="#5A7286" text-anchor="middle">MediCare Hospital</text>
      </svg>
    `);
    el.alt = el.alt || 'MediCare Hospital';
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav__list');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
    });
    // Close mobile menu when a nav link is tapped
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        toggle.classList.remove('is-active');
      });
    });
  }

  // Highlight active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__list a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Simple counter animation for stats
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = current.toLocaleString();
        requestAnimationFrame(tick);
      }
    };
    tick();
  };

  if ('IntersectionObserver' in window && counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => observer.observe(c));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item__q').forEach(q => {
    q.addEventListener('click', () => {
      q.parentElement.classList.toggle('open');
    });
  });

  // Generic filter bar (doctors / gallery) — filters items by data-category
  document.querySelectorAll('.filter-bar, .gallery-filter').forEach(bar => {
    const buttons = bar.querySelectorAll('button');
    const targetSelector = bar.dataset.target;
    if (!targetSelector) return;
    const items = document.querySelectorAll(targetSelector);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });

  // Appointment form basic validation
  const apptForm = document.querySelector('#appointment-form');
  if (apptForm) {
    apptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredFields = apptForm.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#E4573D';
        } else {
          field.style.borderColor = '';
        }
      });
      const feedback = document.querySelector('#form-feedback');
      if (valid) {
        feedback.textContent = 'Thank you! Your appointment request has been received. Our team will call you shortly to confirm.';
        feedback.style.color = '#1FAE8C';
        apptForm.reset();
      } else {
        feedback.textContent = 'Please fill in all required fields.';
        feedback.style.color = '#E4573D';
      }
    });
  }

  // Contact form basic validation
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredFields = contactForm.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#E4573D';
        } else {
          field.style.borderColor = '';
        }
      });
      const feedback = document.querySelector('#contact-feedback');
      if (valid) {
        feedback.textContent = "Thanks for reaching out — we'll reply within one business day.";
        feedback.style.color = '#1FAE8C';
        contactForm.reset();
      } else {
        feedback.textContent = 'Please fill in all required fields.';
        feedback.style.color = '#E4573D';
      }
    });
  }
});
