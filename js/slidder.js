document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const $carouselPrevBtn = document.querySelector(".carousel-prev");
  const $carouselNextBtn = document.querySelector(".carousel-next");
  const totalSlides = slides.length;

  function showSlide(index) {
    // Loop back to the first slide if current index is less than 0
    // Loop to the last slide if current index exceeds total slides
    currentSlide = (index + totalSlides) % totalSlides;

    // Move the slides container
    const offset =
      -currentSlide * document.querySelector(".carousel-images").clientWidth; // Width of the slides
    document.querySelector(
      ".carousel-images"
    ).style.transform = `translateX(${offset}px)`;

    // Update indicators
    updateIndicators();
  }

  // Function to update indicators
  function updateIndicators() {
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  // Function to change the slide
  const changeSlide = (direction) => {
    showSlide(currentSlide + direction);
  };

  $carouselPrevBtn.addEventListener("click", function () {
    changeSlide(-1);
  });
  $carouselNextBtn.addEventListener("click", function () {
    changeSlide(1);
  });

  // Auto-slide functionality (optional)
  setInterval(() => {
    changeSlide(1);
  }, 3000); // Change slide every 3 seconds

  // Initialize indicators on page load
  updateIndicators();
});
