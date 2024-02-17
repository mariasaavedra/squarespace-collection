const slides = document.querySelectorAll<HTMLDivElement>(".accordion__item");

const toggleSlide = (slide: HTMLDivElement) => {
  assignActiveCard(slide);
};
const assignActiveCard = (slide: HTMLDivElement) => {
  const index = slide.dataset.index;
  switch (index) {
    case "0":
      slides[0]?.classList.add("active");
      slides[1]?.classList.remove("active");
      slides[2]?.classList.remove("active");
      break;
    case "1":
      slides[0]?.classList.remove("active");
      slides[1]?.classList.add("active");
      slides[2]?.classList.remove("active");
      break;
    case "2":
      slides[0]?.classList.add("active");
      slides[1]?.classList.add("active");
      slides[2]?.classList.add("active");
      break;
    default:
      console.log("default");
  }
};

for (const slide of slides) {
  slide.addEventListener("click", () => toggleSlide(slide));
}
