import AbstractComponent from "./abstract-component";

const createSortTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
