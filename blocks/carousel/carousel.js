function createCarousel() {
  const carouselWrappers = document.querySelectorAll('.carousel-wrapper');

  carouselWrappers.forEach((carouselWrapper) => {
    const carousel = carouselWrapper.querySelector('.carousel');

    // Create left and right arrows
    const leftArrow = document.createElement('button');
    leftArrow.className = 'arrow chevron-left button-icon';
    // leftArrow.disabled = true;

    const rightArrow = document.createElement('button');
    rightArrow.className = 'arrow chevron-right button-icon';

    const numSlides = [...carousel.querySelectorAll(':scope > div > div')].length;

    let countRight = 1;

    if (numSlides > 1) {
      // Fetch SVG files
      fetch('/icons/chevron-left.svg')
        .then((response) => response.text())
        .then((svgContent) => {
          leftArrow.innerHTML = svgContent;

          // Attach event listener to left arrow
          leftArrow.addEventListener('click', () => {
            const lastItem = carousel.lastElementChild;
            carousel.insertBefore(lastItem, carousel.firstElementChild);

            const itemWidth = carouselWrapper.offsetWidth;
            const scrollAmount = itemWidth;

            carousel.scrollLeft -= scrollAmount;
          });
        });

      fetch('/icons/chevron-right.svg')
        .then((response) => response.text())
        .then((svgContent) => {
          rightArrow.innerHTML = svgContent;

          // Attach event listener to right arrow
          rightArrow.addEventListener('click', () => {
            if (countRight !== 1) {
              const firstItem = carousel.firstElementChild;
              carousel.insertBefore(firstItem, carousel.lastElementChild.nextElementSibling);
            }

            const itemWidth = carouselWrapper.offsetWidth;
            const scrollAmount = itemWidth;

            carousel.scrollLeft += scrollAmount;
            countRight = 0;
          });
        });

      // Append arrows to the carousel wrapper
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
