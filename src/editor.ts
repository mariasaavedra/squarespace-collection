import { Accordion, AccordionItem, AccordionSingleton } from "./types";

export default function editor(accordionSingleton: AccordionSingleton) {
  const editor = document.querySelector("#editor");
  if (!editor) return;

  const getFormData = ($slide_form: HTMLFormElement) => {
    // Extracting values from the form
    const label = (
      $slide_form.querySelector('input[type="text"]') as HTMLInputElement
    )?.value;

    const imageSource = (
      $slide_form.querySelector(
        'input[type="text"][value="${item.image.src}"]'
      ) as HTMLInputElement
    )?.value;

    const imageAlt = (
      $slide_form.querySelector(
        'input[type="text"][value="${item.image.alt}"]'
      ) as HTMLInputElement
    )?.value;

    const title = (
      $slide_form.querySelector(
        'input[type="text"][value="${item.content.title}"]'
      ) as HTMLInputElement
    )?.value;

    const subtitle = (
      $slide_form.querySelector(
        'input[type="text"][value="${item.content.subtitle}"]'
      ) as HTMLInputElement
    )?.value;

    const content = (
      $slide_form.querySelector("textarea") as HTMLTextAreaElement
    )?.value;

    const buttonLabel = (
      $slide_form.querySelector(
        'input[type="text"][value="${item.content.button.text}"]'
      ) as HTMLInputElement
    )?.value;

    const buttonLink = (
      $slide_form.querySelector(
        'input[type="text"][value="${item.content.button.link}"]'
      ) as HTMLInputElement
    )?.value;

    return {
      label,
      imageSource,
      imageAlt,
      title,
      subtitle,
      content,
      buttonLabel,
      buttonLink,
    };
  };

  const attachEventListeners = () => {
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
    const saveButtons = document.querySelectorAll(".save");
    for (const button of saveButtons) {
      button.addEventListener("click", () => {
        const el = button as HTMLButtonElement;
        if (!el.dataset.index) return;
        const index = parseInt(el.dataset.index);
        const $slide_form = document.querySelector(
          `.editor__form[data-index="${index}"]`
        ) as HTMLFormElement;
        if (!$slide_form) return;

        const formData = getFormData($slide_form);
        accordionSingleton.update(index, {
          index,
          background: accordionSingleton.get()[index].background,
          color: accordionSingleton.get()[index].color,
          image: {
            src:
              formData.imageSource || accordionSingleton.get()[index].image.src,
            alt: formData.imageAlt || accordionSingleton.get()[index].image.alt,
          },
          label: formData.label || accordionSingleton.get()[index].label,
          content: {
            title:
              formData.title || accordionSingleton.get()[index].content.title,
            subtitle:
              formData.subtitle ||
              accordionSingleton.get()[index].content.subtitle,
            text:
              formData.content || accordionSingleton.get()[index].content.text,
            button: {
              text:
                formData.buttonLabel ||
                accordionSingleton.get()[index].content.button.text,
              link:
                formData.buttonLink ||
                accordionSingleton.get()[index].content.button.link,
            },
          },
        });
        editor.innerHTML = generateEditorHTML(accordionSingleton.get());
      });
    }
  };

  const generateEditorHTML = (accordion: Accordion) => {
    let accordionHTML = accordion
      .map(
        (item: AccordionItem) => `
        <div class="editor__form" data-index="${item.index}">
        <div class="editor__form__group">
          <label>Label:</label>
          <input
            type="text"
            value="${item.label}"s
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
  attachEventListeners();

  const targetNode = document.getElementById("accordion");
  const config = { attributes: true, childList: true, subtree: true };
  // Callback function to execute when mutations are observed
  const callback = (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" || mutation.type === "attributes") {
        editor.innerHTML = generateEditorHTML(accordionSingleton.get());
        attachEventListeners();
      }
    }
  };
  const observer = new MutationObserver(callback);
  if (!targetNode) return;
  observer.observe(targetNode, config);
}
