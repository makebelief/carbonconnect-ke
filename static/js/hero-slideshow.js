document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero slideshow
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const slideCount = slides.length;

    function showSlide(n) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show the current slide
        slides[n].classList.add('active');
        
        currentSlide = n;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slideCount);
    }

    // Auto advance slides every 5 seconds
    if (slideCount > 0) {
        setInterval(nextSlide, 5000);
    }
}); 