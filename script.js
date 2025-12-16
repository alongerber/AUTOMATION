// =====================================================
// Meta Pixel Integration
// =====================================================

/**
 * Initialize Meta Pixel
 * Replace 'YOUR_PIXEL_ID' with your actual Meta Pixel ID
 */
function initMetaPixel() {
    // Uncomment and configure when ready:
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
}

/**
 * Track lead event when form is submitted
 */
function trackLead() {
    // Uncomment when Meta Pixel is configured:
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', 'Lead');
    // }
    console.log('Lead event tracked');
}

// =====================================================
// Form Handling
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Meta Pixel
    initMetaPixel();

    // Form submission handling
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            // Track lead event
            trackLead();

            // Form will submit normally to thank-you.html
            // If you want to use a different form handler (like Formspree),
            // you can update the form action in index.html
        });
    }

    // Smooth scroll for anchor links
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
});

// =====================================================
// Google Analytics 4 (optional)
// =====================================================

/**
 * Initialize Google Analytics 4
 * Replace 'G-XXXXXXXXXX' with your actual GA4 measurement ID
 */
function initGA4() {
    // Uncomment and configure when ready:
    /*
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    */
}
