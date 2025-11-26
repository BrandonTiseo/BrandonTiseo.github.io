document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('#image-carousel img');
  let activeSlide = 0;
  const slideCount = slides.length;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  document.getElementById('next-slide').addEventListener('click', () => {
    activeSlide = (activeSlide + 1) % slideCount;
    showSlide(activeSlide);
  });

  document.getElementById('prev-slide').addEventListener('click', () => {
    activeSlide = (activeSlide - 1 + slideCount) % slideCount;
    showSlide(activeSlide);
  });

  setInterval(() => {
    activeSlide = (activeSlide + 1) % slideCount;
    showSlide(activeSlide);
  }, 2000);
});