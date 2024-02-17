(() => {
  type AccordionItem = {
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
  type Accordion = AccordionItem[];
  const slides: Accordion = [
    {
      index: 0,
      background:
        "url(https://images.squarespace-cdn.com/content/65c2c220adf46e63fa5f1aac/9a7c73f8-8578-4896-bf7c-3e81286d5ff1/6f6f3a89499d38b0dfca29ff79b0d37a.jpg?content-type=image%2Fjpeg)",
      color: "light",
      label: "Consult",
      image: {
        src: "https://images.squarespace-cdn.com/content/65c2c220adf46e63fa5f1aac/9a7c73f8-8578-4896-bf7c-3e81286d5ff1/6f6f3a89499d38b0dfca29ff79b0d37a.jpg?content-type=image%2Fjpeg",
        alt: "Consult",
      },
      content: {
        title: "Consult",
        subtitle: "For the woman who wants clarity",
        text: "This service is a comprehensive session using muscle testing as a diagnostic tool that uses the bod's own nervous",
        button: {
          text: "Learn More",
          link: "#",
        },
      },
    },
    {
      index: 1,
      background:
        "url(https://images.squarespace-cdn.com/content/65c2c220adf46e63fa5f1aac/9a7c73f8-8578-4896-bf7c-3e81286d5ff1/6f6f3a89499d38b0dfca29ff79b0d37a.jpg?content-type=image%2Fjpeg)",
      color: "peach",
      label: "Rise Session",
      image: {
        src: "https://images.squarespace-cdn.com/content/65c2c220adf46e63fa5f1aac/9a7c73f8-8578-4896-bf7c-3e81286d5ff1/6f6f3a89499d38b0dfca29ff79b0d37a.jpg?content-type=image%2Fjpeg",
        alt: "Consult",
      },
      content: {
        title: "Rise Session",
        subtitle: "For the woman who wants clarity",
        text: "This service is a comprehensive session using muscle testing as a diagnostic tool that uses the",
        button: {
          text: "Learn More",
          link: "#",
        },
      },
    },
    {
      index: 2,
      background:
        "url(https://images.squarespace-cdn.com/content/65c2c220adf46e63fa5f1aac/9a7c73f8-8578-4896-bf7c-3e81286d5ff1/6f6f3a89499d38b0dfca29ff79b0d37a.jpg?content-type=image%2Fjpeg)",
      color: "green",
      label: "Rise Session",
      image: {
        src: "https://images.squarespace-cdn.com/content/65c2c220adf46e63fa5f1aac/9a7c73f8-8578-4896-bf7c-3e81286d5ff1/6f6f3a89499d38b0dfca29ff79b0d37a.jpg?content-type=image%2Fjpeg",
        alt: "Consult",
      },
      content: {
        title: "Remedy Session",
        subtitle: "For the woman who wants clarity",
        text: "This service is a comprehensive session using muscle testing as a diagnostic tool that uses the bod's own",
        button: {
          text: "Learn More",
          link: "#",
        },
      },
    },
  ];
  const accordion = document.querySelector<HTMLDivElement>("#accordion");
  const tabWidth = 50;

  function generateAccordionHTML(slides: Accordion): string {
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
  }

  const accordionHTML = generateAccordionHTML(slides);
  if (accordion) {
    accordion.innerHTML = accordionHTML;
  }

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


      if (currentIndex > indexOfClickedSlide) {
        $slide.style.transform = `translateX(calc(100% - ${
          indexOfReversedSlides * tabWidth
        }px))`;
      }
    }
  };
})();
