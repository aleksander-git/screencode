document.addEventListener('DOMContentLoaded', function () {
    // --- Header Navigation Toggle Functionality ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // For hamburger animation
            // Toggle aria-expanded for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Optional: Close menu when a link is clicked (for smooth scrolling)
        // Only target internal anchor links
        const navLinks = mainNav.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                // Check if the menu is active on small screens before closing
                // Use a media query match instead of window.innerWidth for robustness
                if (window.matchMedia('(max-width: 768px)').matches) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Carousel functionality ---
    const track = document.querySelector("#screenshot-carousel .carousel-track");
    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const prevBtn = document.querySelector("#screenshot-carousel .carousel-btn.left");
    const nextBtn = document.querySelector("#screenshot-carousel .carousel-btn.right");
    const dotsContainer = document.getElementById("carousel-dots");

    // Only proceed with carousel if all elements are found
    if (track && slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
        let current = 0;

        // Initialize first slide as active
        if (slides[0]) {
            slides[0].classList.add("active");
        }

        // Dots
        slides.forEach((_, idx) => {
            const dot = document.createElement("button");
            dot.className = "carousel-dot" + (idx === 0 ? " active" : "");
            dot.setAttribute("aria-label", "Go to screenshot " + (idx + 1));
            dot.addEventListener("click", () => showSlide(idx));
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        function showSlide(idx) {
            // Remove active from current elements
            if (slides[current]) {
                slides[current].classList.remove("active");
            }
            if (dots[current]) {
                dots[current].classList.remove("active");
            }

            // Update current index
            current = (idx + slides.length) % slides.length; // Ensure index wraps correctly

            // Add active to new current elements
            if (slides[current]) {
                slides[current].classList.add("active");
            }
            if (dots[current]) {
                dots[current].classList.add("active");
            }
        }

        prevBtn.addEventListener("click", () => {
            showSlide(current - 1); // showSlide handles wrapping
        });
        nextBtn.addEventListener("click", () => {
            showSlide(current + 1); // showSlide handles wrapping
        });

        // Optional: Arrow keys navigation
        track.setAttribute("tabindex", "0"); // Make the track focusable
        track.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") {
                e.preventDefault(); // Prevent page scrolling
                prevBtn.click();
            }
            if (e.key === "ArrowRight") {
                e.preventDefault(); // Prevent page scrolling
                nextBtn.click();
            }
        });

        // Initial display of the first slide
        showSlide(0); // Call this explicitly to ensure initial state is correct
    } else {
        // Fallback or warning if carousel elements are not found
        console.warn("Carousel elements not found. Carousel functionality might be incomplete.");
    }
});