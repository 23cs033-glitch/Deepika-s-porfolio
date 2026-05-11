// ============ PARTICLES BACKGROUND ============
class ParticleSystem {
    constructor() {
        this.particlesContainer = document.getElementById('particles');
        this.particleCount = 50;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.bottom = '-10px';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        this.particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, (duration + 2) * 1000);
    }

    start() {
        setInterval(() => {
            this.createParticle();
        }, 200);
    }
}

// ============ TYPING ANIMATION ============
class TypingAnimation {
    constructor() {
        this.text = 'Building Intelligent Digital Experiences with AI & Full Stack Development';
        this.fullText = this.text;
        this.currentIndex = 0;
        this.typingElement = document.querySelector('.typing-text');
        this.speed = 50;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        if (this.currentIndex < this.fullText.length) {
            this.typingElement.textContent = this.fullText.substring(0, this.currentIndex + 1);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// ============ SMOOTH SCROLL ============
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                closeHamburgerMenu();
            }
        });
    });
}

// ============ HAMBURGER MENU ============
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

function closeHamburgerMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// ============ ANIMATED COUNTERS ============
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = true;
                    this.animateCounter(entry.target);
                }
            });
        });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }
}

// ============ SCROLL ANIMATIONS ============
function setupScrollAnimations() {
    const elements = document.querySelectorAll(
        '.skill-category, .project-card, .achievement-card, .certification-item, .stat-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============ SKILL PROGRESS ANIMATION ============
function animateSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = true;
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s ease-out';
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ============ FORM HANDLING ============
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        successMessage.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #00d9ff, #06b6d4);
            color: #0a0e27;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInDown 0.5s ease-out;
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
        `;

        document.body.appendChild(successMessage);

        // Clear form
        form.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOutUp 0.5s ease-out forwards';
            setTimeout(() => successMessage.remove(), 500);
        }, 3000);
    });
}

// ============ NAVBAR ACTIVE STATE ============
function setupNavbarActiveState() {
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = 'var(--text-secondary)';
            }
        });
    });
}

// ============ SCROLL PROGRESS ============
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d9ff, #7c3aed, #06b6d4);
        z-index: 999;
        box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============ GLOW CURSOR ============
function setupGlowCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00d9ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px rgba(0, 217, 255, 0.6), inset 0 0 10px rgba(0, 217, 255, 0.3);
        transform: translate(-50%, -50%);
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseout', () => {
        cursor.style.display = 'none';
    });
}

// ============ MODAL/POPUP FOR RESUME ============
function setupResumeDownload() {
    const resumeBtn = document.querySelector('.btn-tertiary');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Resume download link would be configured here. You can add your resume file to the project.');
        });
    }
}

// ============ LAZY LOADING ANIMATIONS ============
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-out';
                img.onload = () => {
                    img.style.opacity = '1';
                };
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing portfolio...');

    // Initialize all systems
    const particleSystem = new ParticleSystem();
    particleSystem.start();

    const typingAnimation = new TypingAnimation();
    
    smoothScroll();
    setupHamburgerMenu();
    
    const counter = new AnimatedCounter();
    
    setupScrollAnimations();
    animateSkillProgress();
    setupContactForm();
    setupNavbarActiveState();
    setupScrollProgress();
    setupGlowCursor();
    setupResumeDownload();
    setupLazyLoading();

    console.log('Portfolio initialized successfully!');
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    // ESC to close menu
    if (e.key === 'Escape') {
        closeHamburgerMenu();
    }
    // Ctrl+K or Cmd+K for quick search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search feature could be added here');
    }
});

// ============ PERFORMANCE OPTIMIZATION ============
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback for older browsers
    setupLazyLoading();
}

// ============ SERVICE WORKER ============
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker for offline support
        // navigator.serviceWorker.register('/sw.js');
    });
}
