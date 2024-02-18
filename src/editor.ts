import { Accordion, AccordionItem, AccordionSingleton } from "./types";

export default function editor(accordionSingleton: AccordionSingleton) {
  const editor = document.querySelector("#editor");
  if (!editor) return;

  const generateEditorHTML = (accordion: Accordion) => {
    let accordionHTML = accordion
      .map(
        (item: AccordionItem) => `
        <div class="editor__form">
        <div class="editor__form__group">
          <label>Label:</label>
          <input
            type="text"
            value="${item.label}"
          />
        </div>
        <div class="editor__form__group">
          <label>Image Source:</label>
          <input type="text" value="${item.image.src}" />
        </div>
        <div class="editor__form__group">
          <label>Image Alt:</label>
          <input type="text" value="${item.image.alt}" />
        </div>
        <div class="editor__form__group">
          <label>Title:</label>
          <input
            type="text"
            value="${item.content.title}"
          />
        </div>
        <div class="editor__form__group">
          <label>Subtitle:</label>
          <input
            type="text"
            value="${item.content.subtitle}"
          />
        </div>
        <div class="editor__form__group">
          <label>Content:</label>
          <textarea>${item.content.text}</textarea>
        </div>
        <div class="editor__form__group">
          <label>Button Label:</label>
          <input type="text" value="${item.content.button.text}" />
        </div>
        <div class="editor__form__group">
          <label>Button Link:</label>
          <input type="text" value="${item.content.button.link}" />
        </div>
        <footer class="editor__form__footer">
          <button data-index="${item.index}" class="delete">Delete</button>
          <button data-index="${item.index}" class="save">Save</button>
        </footer>
      </div>
  `
      )
      .join("");

    return accordionHTML;
  };

  editor.innerHTML = generateEditorHTML(accordionSingleton.get());

  const deleteButtons = document.querySelectorAll(".delete");
  for (const button of deleteButtons) {
    button.addEventListener("click", () => {
      const el = button as HTMLButtonElement;
      if (!el.dataset.index) return;
      const index = parseInt(el.dataset.index);
      accordionSingleton.remove(index);
      editor.innerHTML = generateEditorHTML(accordionSingleton.get());
    });
  }

  const targetNode = document.getElementById("accordion");
  const config = { attributes: true, childList: true, subtree: true };
  // Callback function to execute when mutations are observed
  const callback = (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" || mutation.type === "attributes") {
        editor.innerHTML = generateEditorHTML(accordionSingleton.get());
      }
    }
  };
  const observer = new MutationObserver(callback);
  if (!targetNode) return;
  observer.observe(targetNode, config);
}
