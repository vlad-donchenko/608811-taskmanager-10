import {createElement} from "../utils";

const createSortTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
