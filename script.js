// =====================================================
// Premium Legal Automation Landing Page
// JavaScript - Animations & Interactions
// =====================================================

// Smooth Scroll
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
    // Pain cards - staggered
    document.querySelectorAll('.pain-card').forEach((el, i) => {
        el.dataset.delay = i * 100;
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });

    // Flow items - staggered
    document.querySelectorAll('.flow-item').forEach((el, i) => {
        el.dataset.delay = i * 120;
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });

    // Feature cards - staggered
    document.querySelectorAll('.feature-card').forEach((el, i) => {
        el.dataset.delay = i * 100;
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });

    // Timeline items - staggered
    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.dataset.delay = i * 150;
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });

    // Single elements
    document.querySelectorAll('.pricing-card, .contact-form-wrapper, .about-content, .solution-highlight').forEach(el => {
        el.classList.add('animate-on-scroll');
        animateOnScroll.observe(el);
    });
});

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(styleSheet);

// Hide floating call button near contact section
const floatingCall = document.querySelector('.floating-call');
const contactSection = document.getElementById('contact');

if (floatingCall && contactSection) {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const rect = contactSection.getBoundingClientRect();
                const isNearContact = rect.top < window.innerHeight && rect.bottom > 0;

                floatingCall.style.opacity = isNearContact ? '0' : '1';
                floatingCall.style.pointerEvents = isNearContact ? 'none' : 'auto';
                floatingCall.style.transform = isNearContact ? 'translateY(20px)' : 'translateY(0)';

                ticking = false;
            });
            ticking = true;
        }
    });
}

// Form handling with Formspree
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector('button');
    button.textContent = 'שולח...';
    button.disabled = true;

    // Track Meta Pixel Lead event
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
    }

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
            button.textContent = 'רוצה לשמוע';
            button.disabled = false;
        }
    } catch (error) {
        alert('שגיאה בשליחה. נסה שוב.');
        button.textContent = 'רוצה לשמוע';
        button.disabled = false;
    }
});

// Parallax effect for phone mockup (subtle)
const phoneWrapper = document.querySelector('.phone-wrapper');
if (phoneWrapper && window.innerWidth > 768) {
    let rafId;

    window.addEventListener('scroll', () => {
        if (rafId) return;

        rafId = requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.15;

            if (scrolled < window.innerHeight) {
                phoneWrapper.style.transform = `translateY(${rate}px)`;
            }

            rafId = null;
        });
    });
}
