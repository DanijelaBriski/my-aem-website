function createCarousel() {
  const carouselWrappers = document.querySelectorAll('.carousel-wrapper');

  carouselWrappers.forEach((carouselWrapper) => {
    const carousel = carouselWrapper.querySelector('.carousel');

    const numSlides = [...carousel.querySelectorAll(':scope > div > div')].length;

    if (numSlides > 1) {
      if (carouselWrapper.querySelectorAll('.arrow').length === 2) {
        return;
      }

      const leftArrow = document.createElement('button');
      leftArrow.className = 'arrow chevron-left button-icon';

      const rightArrow = document.createElement('button');
      rightArrow.className = 'arrow chevron-right button-icon';

      let countRight = 1;
      let interval;

      const slideToRight = () => {
        if (countRight !== 1) {
          const firstItem = carousel.firstElementChild;
          carousel.insertBefore(firstItem, carousel.lastElementChild.nextElementSibling);
        }

        const itemWidth = carouselWrapper.offsetWidth;
        const scrollAmount = itemWidth;

        carousel.scrollLeft += scrollAmount;
        countRight = 0;
      };

      const slideToLeft = () => {
        const lastItem = carousel.lastElementChild;
        carousel.insertBefore(lastItem, carousel.firstElementChild);

        const itemWidth = carouselWrapper.offsetWidth;
        const scrollAmount = itemWidth;

        carousel.scrollLeft -= scrollAmount;
      };

      const setCarouselInterval = () => {
        interval = setInterval(slideToRight, 5500);
      };

      const clearCarouselInterval = () => {
        clearInterval(interval);
      };

      fetch('/icons/chevron-left.svg')
        .then((response) => response.text())
        .then((svgContent) => {
          leftArrow.innerHTML = svgContent;
          leftArrow.addEventListener('click', slideToLeft);
        });

      fetch('/icons/chevron-right.svg')
        .then((response) => response.text())
        .then((svgContent) => {
          rightArrow.innerHTML = svgContent;
          rightArrow.addEventListener('click', () => {
            slideToRight();
            clearCarouselInterval();
          });
        });

      const intersectionCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && entry.intersectionRatio <= 1) {
            clearCarouselInterval();
            setCarouselInterval();
            carouselWrapper.addEventListener('pointerenter', clearCarouselInterval);
            carouselWrapper.addEventListener('pointerleave', setCarouselInterval);
          } else {
            clearCarouselInterval();
            carouselWrapper.removeEventListener('pointenter', clearCarouselInterval);
            carouselWrapper.removeEventListener('pointerleave', setCarouselInterval);
          }
        });
      };

      const observer = new IntersectionObserver(intersectionCallback, { threshold: [0, 1] });
      observer.observe(carouselWrapper);

      carouselWrapper.appendChild(leftArrow);
      carouselWrapper.appendChild(rightArrow);
    } else {
      carouselWrapper.classList.add('carousel-single-slide');
    }
  });
}

export default async function decorate() {
  createCarousel();
}
