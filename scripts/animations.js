// Advanced Animations and Visual Effects

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 3D Tilt effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Parallax scrolling for sections
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        
        // Parallax for skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            const yPos = -(scrolled * speed / 100);
            tag.style.transform = `translateY(${yPos}px)`;
        });
        
        // Parallax for certifications
        const certCards = document.querySelectorAll('.cert-card');
        certCards.forEach((cert, index) => {
            const speed = 0.3 + (index % 4) * 0.15;
            const yPos = -(scrolled * speed / 100);
            cert.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Throttle function for performance
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    window.addEventListener('scroll', throttle(parallaxScroll, 10));

    // Animated gradient background for entire page
    function animateGradient() {
        const body = document.body;
        if (!body) return;

        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            const gradient = `radial-gradient(circle at ${50 + Math.sin(hue * 0.01) * 20}% ${50 + Math.cos(hue * 0.01) * 20}%, 
                                rgba(0, 212, 255, 0.08) 0%, 
                                rgba(131, 56, 236, 0.08) 50%, 
                                rgba(255, 0, 110, 0.08) 100%)`;
            body.style.backgroundImage = gradient;
        }, 50);
    }

    animateGradient();

    // Ripple effect on buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
        ripple.classList.add('ripple');

        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('style[data-ripple]')) {
            rippleStyle.setAttribute('data-ripple', 'true');
            document.head.appendChild(rippleStyle);
        }

        const ripples = button.getElementsByClassName('ripple');
        if (ripples.length > 0) {
            ripples[0].remove();
        }

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
    }

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Interactive text reveal
    function revealText() {
        const reveals = document.querySelectorAll('.section-title, .subtitle, .lead');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', revealText);

    // Magnetic effect for buttons
    function magneticEffect(event) {
        const btn = event.currentTarget;
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        
        const deltaX = event.clientX - btnCenterX;
        const deltaY = event.clientY - btnCenterY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 100; // magnetic field radius
        
        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const moveX = deltaX * strength * 0.3;
            const moveY = deltaY * strength * 0.3;
            
            btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        }
    }

    function resetMagnetic(event) {
        const btn = event.currentTarget;
        btn.style.transform = 'translate(0, 0) scale(1)';
    }

    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', magneticEffect);
        btn.addEventListener('mouseleave', resetMagnetic);
    });

    // Glowing effect for cards on hover
    const cards = document.querySelectorAll('.demo-card, .example-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
            
            const glow = `radial-gradient(circle at var(--mouse-x) var(--mouse-y), 
                          rgba(0, 212, 255, 0.3) 0%, 
                          transparent 40%)`;
            card.style.backgroundImage = glow;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.backgroundImage = 'none';
        });
    });

    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff 0%, #ff006e 50%, #8338ec 100%);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Matrix rain effect (optional background)
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.05;
            pointer-events: none;
        `;
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(5, 8, 22, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 50);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Uncomment to enable matrix rain effect
    // createMatrixRain();

    // Floating animation for skills tags
    const tags = document.querySelectorAll('.project-tag');
    tags.forEach((tag, index) => {
        tag.style.animation = `float-tag ${3 + (index % 3)}s ease-in-out infinite`;
        tag.style.animationDelay = `${index * 0.1}s`;
    });

    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float-tag {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyle);
});
