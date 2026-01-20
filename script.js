document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Glass Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // --- 3. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

    // --- 4. Testimonial Slider Logic ---
    const track = document.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.slider-nav');

    let currentSlideIndex = 0;

    // Create dots automatically based on number of slides
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dotsNav.appendChild(dot);
    });
    const dots = Array.from(dotsNav.children);

    // Function to move the track
    const moveToSlide = (targetIndex) => {
        // Handle looping
        if (targetIndex < 0) {
            targetIndex = slides.length - 1;
        } else if (targetIndex >= slides.length) {
            targetIndex = 0;
        }

        // Move track
        track.style.transform = 'translateX(-' + (targetIndex * 100) + '%)';
        
        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');
        
        currentSlideIndex = targetIndex;
    };

    // Event Listeners for Controls
    nextButton.addEventListener('click', () => {
        moveToSlide(currentSlideIndex + 1);
        resetAutoSlide(); // Reset timer on manual click
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentSlideIndex - 1);
        resetAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoSlide();
        });
    });

    // Auto Slide Feature
    let slideInterval;
    const startAutoSlide = () => {
        slideInterval = setInterval(() => {
            moveToSlide(currentSlideIndex + 1);
        }, 5000); // Change slide every 5 seconds
    };

    const resetAutoSlide = () => {
        clearInterval(slideInterval);
        startAutoSlide();
    };

    // Initialize Auto Slide
    startAutoSlide();

    // Optional: Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(slideInterval));
    track.addEventListener('mouseleave', startAutoSlide);
