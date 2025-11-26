document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('image-carousel');
  const slides = carousel.querySelectorAll('img');
  let activeSlide = 0;
  const slideCount = slides.length;

  setInterval(() => {
    slides[activeSlide].classList.remove('active');
    activeSlide = (activeSlide + 1) % slideCount;
    slides[activeSlide].classList.add('active');
  }, 2000);
});