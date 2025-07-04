// Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector("#screenshot-carousel .carousel-track");
    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const prevBtn = document.querySelector("#screenshot-carousel .carousel-btn.left");
    const nextBtn = document.querySelector("#screenshot-carousel .carousel-btn.right");
    const dotsContainer = document.getElementById("carousel-dots");

    let current = 0;

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
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");
        current = idx;
        slides[current].classList.add("active");
        dots[current].classList.add("active");
    }

    prevBtn.addEventListener("click", () => {
        showSlide((current - 1 + slides.length) % slides.length);
    });
    nextBtn.addEventListener("click", () => {
        showSlide((current + 1) % slides.length);
    });

    // Optional: Arrow keys navigation
    track.setAttribute("tabindex", "0");
    track.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
    });
});