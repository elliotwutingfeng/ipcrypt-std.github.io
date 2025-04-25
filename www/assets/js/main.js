// IPCrypt Website JavaScript

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

    // Transition effects removed as per user feedback
});