// ===========================
// Mobile Menu Toggle
// ===========================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked or outside is clicked
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && hamburger) {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && hamburger) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===========================
// Navbar Scroll Effect
// ===========================
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (lastScrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===========================
// Smooth Scroll Behavior
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .experience-card, .experience-item, .skill-category, .project-card, .project-card-mini').forEach(el => {
    el.classList.add('observe');
    observer.observe(el);
});

// ===========================
// Form Handling (Google Sheets & Direct Delivery)
// ===========================
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzT5i83V08X3m5J9eUn2CV5st3KdLmc8iBi6IGc72dcLBKXGBBdZXsXexkYRetzwWC0/exec';

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// Remove error highlight when user starts typing
if (contactForm) {
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            if (formStatus && formStatus.classList.contains('error')) {
                setFormStatus('', '');
            }
        });
    });
}

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Anti-Spam Honeypot Verification (Silently reject bots)
        const botcheck = document.getElementById('botcheck');
        if (botcheck && botcheck.value.trim() !== '') {
            console.warn('Bot detected via honeypot.');
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            return;
        }

        // 2. Client-Side Cooldown / Rate-Limiting (60-second timer)
        const lastSent = sessionStorage.getItem('last_form_sent');
        const now = Date.now();
        if (lastSent && (now - parseInt(lastSent, 10)) < 60000) {
            const remaining = Math.ceil((60000 - (now - parseInt(lastSent, 10))) / 1000);
            setFormStatus(`Please wait ${remaining}s before sending another message.`, 'error');
            return;
        }

        // 3. Extract Form Inputs
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const subjectInput = contactForm.querySelector('#subject');
        const messageInput = contactForm.querySelector('#message');

        const rawName = (nameInput?.value || '').trim();
        const rawEmail = (emailInput?.value || '').trim();
        const rawSubject = (subjectInput?.value || '').trim();
        const rawMessage = (messageInput?.value || '').trim();

        // Reset previous field errors
        [nameInput, emailInput, subjectInput, messageInput].forEach(el => el?.classList.remove('input-error'));

        // 4. Strict Validation Checks
        // --- Name validation (2 to 80 characters, must have letters) ---
        if (!rawName || rawName.length < 2) {
            nameInput?.classList.add('input-error');
            nameInput?.focus();
            setFormStatus('Please enter your full name (minimum 2 characters).', 'error');
            return;
        }
        if (rawName.length > 80) {
            nameInput?.classList.add('input-error');
            nameInput?.focus();
            setFormStatus('Name is too long (maximum 80 characters).', 'error');
            return;
        }
        if (!/[a-zA-Z\u00C0-\u024F]/.test(rawName)) {
            nameInput?.classList.add('input-error');
            nameInput?.focus();
            setFormStatus('Please enter a valid name containing letters.', 'error');
            return;
        }

        // --- Email validation ---
        if (!rawEmail) {
            emailInput?.classList.add('input-error');
            emailInput?.focus();
            setFormStatus('Please enter your email address.', 'error');
            return;
        }
        if (!isValidEmail(rawEmail)) {
            emailInput?.classList.add('input-error');
            emailInput?.focus();
            setFormStatus('Please enter a valid email address (e.g. yourname@domain.com).', 'error');
            return;
        }
        if (rawEmail.length > 100) {
            emailInput?.classList.add('input-error');
            emailInput?.focus();
            setFormStatus('Email is too long (maximum 100 characters).', 'error');
            return;
        }

        // --- Subject validation (3 to 150 characters) ---
        if (!rawSubject || rawSubject.length < 3) {
            subjectInput?.classList.add('input-error');
            subjectInput?.focus();
            setFormStatus('Please enter a subject (minimum 3 characters).', 'error');
            return;
        }
        if (rawSubject.length > 150) {
            subjectInput?.classList.add('input-error');
            subjectInput?.focus();
            setFormStatus('Subject is too long (maximum 150 characters).', 'error');
            return;
        }

        // --- Message validation (10 to 2500 characters) ---
        if (!rawMessage || rawMessage.length < 10) {
            messageInput?.classList.add('input-error');
            messageInput?.focus();
            setFormStatus('Please enter a detailed message (minimum 10 characters).', 'error');
            return;
        }
        if (rawMessage.length > 2500) {
            messageInput?.classList.add('input-error');
            messageInput?.focus();
            setFormStatus('Message exceeds maximum limit of 2,500 characters.', 'error');
            return;
        }

        // --- Anti-Spam Link Threshold (reject submissions with > 3 URLs) ---
        const urlMatches = rawMessage.match(/https?:\/\/[^\s]+/gi) || [];
        if (urlMatches.length > 3) {
            messageInput?.classList.add('input-error');
            messageInput?.focus();
            setFormStatus('For security reasons, messages cannot contain more than 3 links.', 'error');
            return;
        }

        // 5. Sanitize Strings for Safe Transport
        const name = sanitizeText(rawName);
        const email = sanitizeText(rawEmail);
        const subject = sanitizeText(rawSubject);
        const message = sanitizeText(rawMessage);

        // 6. Update Button State to Loading
        const btnText = submitBtn.querySelector('.btn-text') || submitBtn;
        const originalText = btnText.textContent;
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        btnText.textContent = 'Sending Message...';
        setFormStatus('', '');

        try {
            if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.trim() !== '') {
                // Send to Google Sheets Web App as JSON string
                const payload = {
                    name,
                    email,
                    subject,
                    message,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent ? navigator.userAgent.slice(0, 150) : 'Browser'
                };

                await fetch(GOOGLE_SHEET_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Google Apps Script requires no-cors for client-side redirection
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8'
                    },
                    body: JSON.stringify(payload)
                });

                // Record cooldown timestamp
                sessionStorage.setItem('last_form_sent', Date.now().toString());

                // Success UI
                submitBtn.classList.remove('is-loading');
                submitBtn.classList.add('is-success');
                btnText.textContent = '✓ Message Sent!';
                setFormStatus('Thank you! Your message has been sent successfully. I will get back to you shortly.', 'success');
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.classList.remove('is-success');
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                }, 4000);
            } else {
                // Fallback: If Google Sheets URL is not yet added, pre-fill email client directly
                const mailtoUrl = `mailto:vivektailor012@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
                window.location.href = mailtoUrl;

                submitBtn.classList.remove('is-loading');
                btnText.textContent = '✓ Opened in Email';
                setFormStatus('Opening your email client to send message to vivektailor012@gmail.com...', 'success');
                showNotification('Opening email client...', 'info');
                contactForm.reset();

                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.classList.remove('is-loading');
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            setFormStatus('Failed to send. Please reach out directly to vivektailor012@gmail.com', 'error');
            showNotification('Failed to send message. Please email directly.', 'error');
        }
    });
}

function setFormStatus(text, type) {
    if (!formStatus) return;
    if (!text) {
        formStatus.style.display = 'none';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        return;
    }
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

// ===========================
// Utility & Security Functions
// ===========================
function sanitizeText(str) {
    if (!str) return '';
    return str
        .replace(/[<>]/g, '') // Strip potential HTML tags
        .trim();
}

function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(email.trim());
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
        max-width: 300px;
        ${type === 'success' ? `
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: 1px solid #10b981;
        ` : `
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            border: 1px solid #ef4444;
        `}
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .observe {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .observe.in-view {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===========================
// Parallax Effect (Optional)
// ===========================
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(el => {
        const speed = el.dataset.parallax;
        el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});

// ===========================
// Active Navigation Link
// ===========================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ===========================
// Add CSS for active nav link
// ===========================
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active {
        color: var(--text-primary);
    }

    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyle);

// ===========================
// Performance: Lazy Loading Images (if any)
// ===========================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// Analytics Tracking (Optional)
// ===========================
function trackEvent(eventName, eventData = {}) {
    // This would typically send data to your analytics service
    console.log(`Event: ${eventName}`, eventData);
    
    // Example: Google Analytics
    /*
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    */
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', { button_text: btn.textContent });
    });
});

// Track section views
sections.forEach(section => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_view', { section_id: entry.target.id });
            }
        });
    });
    sectionObserver.observe(section);
});

// ===========================
// Initialize on Page Load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add any initialization code here
    // e.g., load external data, initialize plugins, etc.
});

// ===========================
// Handle Back to Top Button
// ===========================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(15, 98, 254, 0.4);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
});

// ===========================
// Mobile Menu Styles
// ===========================
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            display: none !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-dark);
            flex-direction: column;
            padding: var(--spacing-lg);
            gap: var(--spacing-md);
            border-bottom: 1px solid var(--border-color);
        }

        .nav-links.active {
            display: flex !important;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// ===========================
// Mobile Optimization
// ===========================

// Detect if device is mobile
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Optimize for mobile
if (isMobile()) {
    // Add mobile class to body
    document.body.classList.add('is-mobile');

    // Reduce animation on low-end devices
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        document.documentElement.style.setProperty('--transition', 'all 0.1s ease');
    }

    // Improve touch responsiveness
    document.addEventListener('touchstart', function(){}, false);
    document.addEventListener('touchend', function(){}, false);
}

// Prevent double-tap zoom on buttons
document.addEventListener('touchstart', function(e) {
    if (e.target.matches('.btn, .nav-links a, .contact-link, button, a[href]')) {
        e.preventDefault();
        e.target.click();
    }
}, { passive: false });

// Improve form input UX on mobile
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        // Scroll input into view with padding
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Set minimum font size to prevent zoom on iOS
    this.style.fontSize = '16px';
});

// Add viewport height fix for mobile browsers with address bars
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Improve notification positioning on mobile
if (isMobile()) {
    const originalShowNotification = window.showNotification || showNotification;
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 10px;
            right: 10px;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 9999;
            animation: slideUp 0.3s ease;
            backdrop-filter: blur(10px);
            max-width: 100%;
            ${type === 'success' ? `
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: 1px solid #10b981;
            ` : `
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                border: 1px solid #ef4444;
            `}
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    };

    // Add mobile notification animations
    const mobileNotificationStyle = document.createElement('style');
    mobileNotificationStyle.textContent = `
        @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(mobileNotificationStyle);
}

// Handle viewport orientation changes
window.addEventListener('orientationchange', () => {
    // Re-close mobile menu on orientation change
    if (hamburger && navLinks) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
