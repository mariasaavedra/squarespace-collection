import { Accordion } from "./types";

export default function editor(accordion: Accordion) {
  const editor = document.querySelector("#editor");
  if (!editor) return;

  const generateEditorHTML = (accordion: Accordion) => {
    return '';
  };

  editor.innerHTML = generateEditorHTML(accordion);
}
