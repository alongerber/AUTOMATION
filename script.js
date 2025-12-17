// =====================================================
// Legal Automation Landing Page - JavaScript
// =====================================================

// Smooth Scroll for anchor links
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

// Meta Pixel Tracking (placeholder)
// Uncomment and add your Pixel ID when ready
/*
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
*/

// Form submission tracking
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Track form submission with Meta Pixel (if enabled)
        // fbq('track', 'Lead');

        // You can also add custom form handling here
        console.log('Form submitted');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.pain-card, .process-step, .timeline-item, .pricing-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Hide floating CTA when near contact section
const floatingCta = document.querySelector('.floating-call');
const contactSection = document.getElementById('contact');

if (floatingCta && contactSection) {
    window.addEventListener('scroll', () => {
        const contactRect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Hide button when contact section is visible
        if (contactRect.top < windowHeight && contactRect.bottom > 0) {
            floatingCta.style.opacity = '0';
            floatingCta.style.pointerEvents = 'none';
        } else {
            floatingCta.style.opacity = '1';
            floatingCta.style.pointerEvents = 'auto';
        }
    });
}
