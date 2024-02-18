export type AccordionItem = {
    index: number;
    background: string;
    color: string;
    label: string;
    image: {
      src: string;
      alt: string;
    };
    content: {
      title: string;
      subtitle: string;
      text: string;
      button: {
        text: string;
        link: string;
      };
    };
  };
  export type Accordion = AccordionItem[];