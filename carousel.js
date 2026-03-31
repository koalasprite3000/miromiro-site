document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.product-carousel');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');

    // Define how far one click should scroll
    // 200px accounts for the card width + gap
    const scrollAmount = 200; 

    // Next Button Click
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth' // Smooth sliding animation
        });
    });

    // Previous Button Click
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Optional: Auto-hide buttons at the start/end of the scroll
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        // If at the very beginning, fade the prev button slightly
        prevBtn.style.opacity = scrollLeft <= 0 ? "0.3" : "1";
        
        // If at the very end, fade the next button slightly
        nextBtn.style.opacity = scrollLeft >= maxScroll ? "0.3" : "1";
    });
});