// Main JavaScript File
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
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

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Typing animation for hero section
    const codeElement = document.getElementById('typing-code');
    const codeLines = [
        'const developer = {',
        '  name: "Christian Ilag",',
        '  role: "Computer Engineer",',
        '  skills: [',
        '    "JavaScript", "C++",',
        '    "Java", "Python",',
        '    "IoT", "Flutter"',
        '  ],',
        '  passion: "Building Innovation"',
        '};'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let typingSpeed = 50;

    function typeCode() {
        if (lineIndex < codeLines.length) {
            if (charIndex < codeLines[lineIndex].length) {
                codeElement.textContent += codeLines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeCode, typingSpeed);
            } else {
                codeElement.textContent += '\n';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeCode, typingSpeed * 2);
            }
        } else {
            // Restart animation after a pause
            setTimeout(() => {
                codeElement.textContent = '';
                lineIndex = 0;
                charIndex = 0;
                typeCode();
            }, 3000);
        }
    }

    if (codeElement) {
        typeCode();
    }

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Scroll animations (custom AOS-like implementation)
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay for staggered animation effect
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, 100);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual backend)
            setTimeout(() => {
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessage.className = 'success';
                contactForm.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // Create particle effect
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(0, 212, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.pointerEvents = 'none';
            
            // Animation
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createParticles();

    // Cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Handle PDF Download - Ensure it works properly
    const cvDownloadLink = document.querySelector('a[href="assets/CV_ILAG-2025.pdf"]');
    if (cvDownloadLink) {
        cvDownloadLink.addEventListener('click', (e) => {
            // Allow normal browser download behavior
            e.stopPropagation();
            // Ensure the link has proper attributes
            cvDownloadLink.setAttribute('download', 'Christian-Raylie-Ilag-CV.pdf');
            cvDownloadLink.setAttribute('type', 'application/pdf');
        });
    }

    // Cursor grows on hover over interactive elements
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(0, 212, 255, 0.2)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});
