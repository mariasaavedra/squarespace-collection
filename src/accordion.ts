export default function accordion() {
  const tabWidth = 50;

  const toggleSlide = (slide: HTMLDivElement) => {
    assignActiveCard(slide);
  };

  const parseIndex = (index: string | undefined): number => {
    if (!index) return 0;
    return parseInt(index);
  };

  const $slides = document.querySelectorAll<HTMLDivElement>(".accordion__item");
  const indexesFromSlides = Array.from($slides).map((slide) => {
    if (!slide.dataset.index) return null;
    return parseIndex(slide.dataset.index);
  });

  for (const slide of $slides) {
    if (!slide.dataset.index) return;
    const Xoffset = tabWidth * parseInt(slide.dataset.index);
    slide.style.zIndex = slide.dataset.index;
    slide.style.transform = `translateX(${Xoffset}px)`;
    slide.addEventListener("click", () => toggleSlide(slide));
  }
  const assignActiveCard = (slide: HTMLDivElement) => {
    const indexOfClickedSlide = parseIndex(slide?.dataset?.index);
    for (const $slide of $slides) {
      const indexesFromReversedSlides = indexesFromSlides.slice().reverse();
      const currentIndex = parseIndex($slide?.dataset?.index);
      const indexOfReversedSlides =
        indexesFromReversedSlides.indexOf(currentIndex) + 1;

      // If it's the first slide, don't move it
      if (currentIndex === 0) {
        continue;
      }
      // Shift all the slides to the left
      if (currentIndex <= indexOfClickedSlide) {
        console.log("current index", currentIndex, "indexOfClickedSlide");
        $slide.style.transform = `translateX(${currentIndex * tabWidth}px)`;
      }
      // Shift all the slides to the right
      if (currentIndex > indexOfClickedSlide) {
        $slide.style.transform = `translateX(calc(100% - ${
          indexOfReversedSlides * tabWidth
        }px))`;
      }
    }
  };
}
