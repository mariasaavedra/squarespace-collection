import accordion from "./accordion";
import { placeholderSlides } from "./data/accordion";
import editor from "./editor";
import { Accordion, AccordionItem, AccordionSingleton } from "./types";

const _accordion = ((): AccordionSingleton => {
  let accordion: Accordion = [...placeholderSlides];
  const addAccordionItem = (item: AccordionItem) => {
    accordion.push(item);
  };
  const removeAccordionItem = (index: number) => {
    accordion = accordion.filter((item) => item.index !== index);
  };
  const updateAccordionItem = (index: number, newItem: AccordionItem) => {
    accordion = accordion.map((item) =>
      item.index === index ? newItem : item
    );
  };
  const getAccordion = () => {
    return accordion;
  };
  return {
    add: addAccordionItem,
    remove: removeAccordionItem,
    update: updateAccordionItem,
    get: getAccordion,
  };
})();

(() => {
  accordion(_accordion.get());
  editor(_accordion);
})();
