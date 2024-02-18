import { accordion } from "./accordion";
import editor from "./editor";


const _accordion = accordion;

(() => {
  _accordion.render();
  editor(_accordion);
  setTimeout(() => {
    _accordion.remove(0);
  }, 1000);
})();
