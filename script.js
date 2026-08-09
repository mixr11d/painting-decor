/* ==========================================================================
   Project: Jeddah Painting & Decor Website Dynamic Script & Google Tracking
   Author: Thunder Tech (0578539687)
   ========================================================================== */

// 1. Google Ads Tracker Setup (Replace placeholders when launching campaigns)
const GOOGLE_ADS_ID = ''; // Example: 'AW-123456789'
const CALL_CONVERSION_LABEL = ''; // Example: 'AbC-D_efGhIjKLmN'
const WHATSAPP_CONVERSION_LABEL = ''; // Example: 'OpQ-R_stUvWxYz12'
const FORM_CONVERSION_LABEL = ''; // Example: '345-6_7890abcdef'

// Dynamic Injection of gtag.js
if (GOOGLE_ADS_ID) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GOOGLE_ADS_ID);
}

// Function to trigger Google Ads Conversion Event
function trackConversion(label) {
    if (typeof gtag === 'function' && GOOGLE_ADS_ID && label) {
        gtag('event', 'conversion', {
            'send_to': `${GOOGLE_ADS_ID}/${label}`
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // 3. Touch/Click Dropdown Nav for Services
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // 4. Scroll To Top Logic
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Track Phone Calls
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackConversion(CALL_CONVERSION_LABEL);
        });
    });

    // 6. Track WhatsApp Clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackConversion(WHATSAPP_CONVERSION_LABEL);
        });
    });

    // 7. Interactive Lead Form Handling -> Redirects to WhatsApp
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const district = document.getElementById('formDistrict').value.trim();
            const service = document.getElementById('formService').value;

            if (!name || !phone) {
                alert('يرجى كتابة الاسم ورقم الجوال للتواصل.');
                return;
            }

            // Track Conversion
            trackConversion(FORM_CONVERSION_LABEL);

            // Compose WhatsApp Message
            const clientNum = '966550892103';
            const msg = `مرحباً، أود طلب معاينة مجانية عبر الموقع:%0A` +
                        `👤 *الاسم:* ${encodeURIComponent(name)}%0A` +
                        `📱 *الجوال:* ${encodeURIComponent(phone)}%0A` +
                        `📍 *الحي:* ${encodeURIComponent(district || 'غير محدد')}%0A` +
                        `🎨 *الخدمة المطلوبة:* ${encodeURIComponent(service)}`;

            const targetUrl = `https://wa.me/${clientNum}?text=${msg}`;

            // Open WhatsApp
            window.open(targetUrl, '_blank');
            leadForm.reset();
        });
    }
});
