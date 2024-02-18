import accordion from "./accordion";
import { placeholderSlides } from "./data/accordion";
import editor from "./editor";
import { Accordion, AccordionItem, AccordionSingleton } from "./types";

const _accordion = ((): AccordionSingleton => {
  let accordion: Accordion = [...placeholderSlides];
  const addAccordionItem = (item: AccordionItem) => {
    accordion.push(item);
    render();
  };
  const removeAccordionItem = (index: number) => {
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
      .map((slide) => {
        return `<div data-index="${slide.index}" class="accordion__item accordion--${slide.color}">
          <span class="accordion__label">${slide.label}</span>
          <img
            class="accordion__image"
            src="${slide.image.src}"
            alt="${slide.image.alt}"
          />
          <div class="accordion__content">
            <h2 class="accordion__title">${slide.content.title}</h2>
            <h3 class="accordion__subtitle">${slide.content.subtitle}</h3>
            <p class="accordion__text">${slide.content.text}</p>
            <button class="accordion__button" onclick="location.href='${slide.content.button.link}'">${slide.content.button.text}</button>
          </div>
        </div>`;
      })
      .join("");
  };
  const render = () => {
    const el = document.querySelector<HTMLDivElement>("#accordion");
    if (!el) return;
    el.innerHTML = generateAccordionHTML(accordion);
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

(() => {
  accordion();
  editor(_accordion);
  setTimeout(() => {
    _accordion.remove(0);
  }, 5000);
})();
