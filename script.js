// Form submission with redirect
document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('.submit-btn');
  const originalText = button.textContent;

  button.textContent = 'שולח...';
  button.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xrezzvrw', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      window.location.href = 'thank-you.html';
    } else {
      alert('שגיאה בשליחה. נסה שוב.');
      button.textContent = originalText;
      button.disabled = false;
    }
  } catch (error) {
    alert('שגיאה בשליחה. נסה שוב.');
    button.textContent = originalText;
    button.disabled = false;
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.problem-card, .method-card, .feature-item, .founder-card, .pricing-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
