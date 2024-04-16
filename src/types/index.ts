export type AccordionSingleton = {
  add: (item: AccordionItem) => void;
  remove: (index: number) => void;
  update: (index: number, newItem: AccordionItem) => void;
  get: () => Accordion;
  render: () => void;
};
export type AccordionItem = {
  index: number;
  background: string;
  color: string;
  label: string;
  image: {
    src: string;
    alt: string;
  };
  image_right: {
    src: string;
    alt: string;
  };
};
export type Accordion = AccordionItem[];
