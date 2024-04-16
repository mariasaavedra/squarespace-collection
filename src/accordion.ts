import { placeholderSlides } from "./data/accordion";
import { AccordionSingleton, Accordion, AccordionItem } from "./types";

export const accordion = ((): AccordionSingleton => {
  const tabWidth = 50;
  let accordion: Accordion = [...placeholderSlides];
  const addAccordionItem = (item: AccordionItem) => {
    accordion.push(item);
    render();
  };
  const removeAccordionItem = (index: number) => {
    console.log("removing", index);
    accordion = accordion.filter((item) => item.index !== index);
    render();
  };
  const updateAccordionItem = (index: number, newItem: AccordionItem) => {
    accordion = accordion.map((item) =>
      item.index === index ? newItem : item
    );
    render();
  };
  const getAccordion = () => {
    return accordion;
  };
  const generateAccordionHTML = (slides: Accordion): string => {
    return slides
      .map((slide, index) => {
        return `<div data-index="${index}" class="accordion__item accordion--${slide.color}" style="background: ${slide.background};">
          <span class="accordion__label">${slide.label}</span>
          <img
            class="accordion__image"
            src="${slide.image.src}"
            alt="${slide.image.alt}"
          />
          <img
          class="accordion__image"
          src="${slide.image_right.src}"
          alt="${slide.image_right.alt}"
        />
        </div>`;
      })
      .join("");
  };
  const parseIndex = (index: string | undefined): number => {
    if (!index) return 0;
    return parseInt(index);
  };
  const assignActiveCard = (slide: HTMLDivElement) => {
    const indexOfClickedSlide = parseIndex(slide?.dataset?.index);
    const $slides =
      document.querySelectorAll<HTMLDivElement>(".accordion__item");
    const indexesFromSlides = Array.from($slides).map((slide) => {
      if (!slide.dataset.index) return null;
      return parseIndex(slide.dataset.index);
    });
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
  const render = () => {
    const tabWidth = 50;
    const el = document.querySelector<HTMLDivElement>("#accordion");
    if (!el) return;
    el.innerHTML = generateAccordionHTML(accordion);
    const $slides =
      document.querySelectorAll<HTMLDivElement>(".accordion__item");
    for (const slide of $slides) {
      if (!slide.dataset.index) return;
      const Xoffset = tabWidth * parseInt(slide.dataset.index);
      slide.style.zIndex = slide.dataset.index;
      slide.style.transform = `translateX(${Xoffset}px)`;
      slide.addEventListener("click", () => assignActiveCard(slide));
    }
  };
  render();
  return {
    add: addAccordionItem,
    update: updateAccordionItem,
    get: getAccordion,
    render: render,
    remove: removeAccordionItem,
  };
})();
