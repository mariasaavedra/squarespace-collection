import { Accordion } from "./types";

export default function editor(accordion: Accordion) {
  const editor = document.querySelector("#editor");
  if (!editor) return;
  editor.innerHTML = `<pre>${JSON.stringify(accordion, null, 2)}</pre>`;
}
