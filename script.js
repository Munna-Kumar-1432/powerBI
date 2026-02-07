document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Animation on Scroll using CSS Classes
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Register elements for animation
    const animateElements = document.querySelectorAll(
        '[class*="reveal-"], .section-padding h2, .section-padding h6, .component-card, .info-card, ' +
        '.workflow-timeline .row, .advantage-card, .solution-card, .roadmap-step, .showcase-card, ' +
        '.faq-item, .instructor-stats div, .visual-box, .outcome-item'
    );

    animateElements.forEach((el) => {
        // Add default reveal class if none present and no other reveal class exists
        if (![...el.classList].some(cls => cls.startsWith('reveal-'))) {
            el.classList.add('reveal-on-scroll');
        }
        observer.observe(el);
    });
    // Sidebar Active Link handling (Encyclopedia)
    const sidebarLinks = document.querySelectorAll('.sidebar-nav .list-group-item');
    const sections = document.querySelectorAll('.content-section');
    const sidebarContainer = document.querySelector('.sidebar-nav .list-group');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
                
                // On mobile, scroll the active item into view horizontally
                if (window.innerWidth < 992 && sidebarContainer) {
                    const linkRect = link.getBoundingClientRect();
                    const containerRect = sidebarContainer.getBoundingClientRect();
                    if (linkRect.left < containerRect.left || linkRect.right > containerRect.right) {
                        sidebarContainer.scrollTo({
                            left: link.offsetLeft - 20,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // Add particle-like background effect to Hero (Optional Subtle effect)
    const hero = document.querySelector('.hero-section');
    for(let i=0; i<20; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        hero.appendChild(particle);
    }

    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        setTimeout(() => {
            cursorFollower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, 80);
    });

    document.querySelectorAll('a, button, .component-card, .info-card, .showcase-card, .solution-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorFollower.classList.add('cursor-follower-active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorFollower.classList.remove('cursor-follower-active');
        });
    });
});

// Particle CSS added via JS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .hero-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(242, 200, 17, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 10s linear infinite;
        z-index: 1;
    }
    @keyframes particleFloat {
        0% { transform: translate(0,0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translate(${Math.random()*100-50}px, ${-Math.random()*200}px); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);
