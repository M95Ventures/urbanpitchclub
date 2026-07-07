/* ========================================
   URBAN PITCH CLUB — Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Loader ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });

    // Fallback: hide loader after 2s max
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    // --- Navigation Scroll ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Mobile Menu ---
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Counter Animation for Stats ---
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                if (isNaN(value)) return;

                let current = 0;
                const increment = value / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        target.textContent = value;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, 30);

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Parallax on Hero Grid ---
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroGrid.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
        }, { passive: true });
    }

    // --- Nav link active state based on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--white)';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

});
