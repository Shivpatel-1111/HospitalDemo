// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav__list');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
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
