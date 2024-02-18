import { Accordion } from "./types";

export default function editor(accordion: Accordion) {
  const editor = document.querySelector("#editor");
  if (!editor) return;

  const generateEditorHTML = (accordion: Accordion) => {
    let accordionHTML = accordion
      .map(
        (item) => `
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
          <button class="delete">Delete</button>
          <button class="save">Save</button>
        </footer>
      </div>
      
  `
      )
      .join("");

    return accordionHTML;
  };

  editor.innerHTML = generateEditorHTML(accordion);
}
