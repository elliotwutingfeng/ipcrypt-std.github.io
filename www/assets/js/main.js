// IPCrypt Website JavaScript

// Add js-enabled class to body as soon as possible
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', function () {
    // Handle implementation card clicks
    const implementationCards = document.querySelectorAll('.implementation-card');

    implementationCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Prevent the default behavior for links inside the card
            if (e.target.tagName === 'A' && e.target.href) {
                e.stopPropagation();
                return;
            }

            // Get the href attribute of the card
            const href = this.getAttribute('href');

            // Open the link in a new tab
            if (href) {
                window.open(href, '_blank');
            }
        });
    });

    // Section animations for page transitions
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add page transition class to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }
});