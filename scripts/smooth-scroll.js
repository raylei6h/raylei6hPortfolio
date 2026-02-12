// Smooth Scroll Snapping Enhancement
// This script enhances the CSS scroll-snap with smoother transitions

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    let scrollTimeout;

    // Debounce function
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    }

    // Let CSS scroll-snap handle most of the work
    // Only intervene for specific cases like keyboard navigation

    // Handle touch swipe for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) < swipeThreshold) {
            return; // Not a swipe, just a tap
        }

        // Find current section
        let currentIndex = -1;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= 100) {
                currentIndex = index;
            }
        });

        if (currentIndex === -1) return;

        // Swipe up = scroll down, Swipe down = scroll up
        if (diff > 0 && currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else if (diff < 0 && currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Handle keyboard navigation (arrow keys, page up/down)
    document.addEventListener('keydown', (e) => {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.key)) {
            // Find current section
            let currentIndex = -1;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= -100 && rect.top <= 100) {
                    currentIndex = index;
                }
            });

            if (currentIndex === -1) return;

            let targetIndex = currentIndex;

            switch(e.key) {
                case 'ArrowDown':
                case 'PageDown':
                case 'Space':
                    targetIndex = Math.min(currentIndex + 1, sections.length - 1);
                    e.preventDefault();
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    targetIndex = Math.max(currentIndex - 1, 0);
                    e.preventDefault();
                    break;
            }

            if (targetIndex !== currentIndex) {
                sections[targetIndex].scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Update navigation active state based on scroll position
    const updateActiveNav = debounce(() => {
        let currentSectionId = '';
        
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= 300) {
                currentSectionId = section.id;
            }
        });

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', updateActiveNav);

    // Add smooth scrolling to nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
