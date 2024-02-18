import accordion from "./accordion";
import { placeholderSlides } from "./data/accordion";
import editor from "./editor";
import { Accordion, AccordionItem } from "./types";

// const _accordion = (() => {
//   let accordion: Accordion = [];
//   const addAccordionItem = (item: AccordionItem) => {
//     accordion.push(item);
//   };
//   const removeAccordionItem = (index: number) => {
//     accordion = accordion.filter((item) => item.index !== index);
//   };
//   const updateAccordionItem = (index: number, newItem: AccordionItem) => {
//     accordion = accordion.map((item) =>
//       item.index === index ? newItem : item
//     );
//   };
//   const getAccordion = () => {
//     return accordion;
//   };
//   return {
//     add: addAccordionItem,
//     remove: removeAccordionItem,
//     update: updateAccordionItem,
//     get: getAccordion,
//   };
// })();

// Initialize
let _accordion: Accordion = [...placeholderSlides];

(() => {
  accordion();
  editor(_accordion);
})();
