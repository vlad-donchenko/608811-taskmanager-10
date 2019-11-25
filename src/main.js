import {createBoardTemplate} from './components/board.js';
import {createMainFilterTemplate} from './components/filter.js';
import {createLoadMoreTemplate} from './components/load-more-button.js';
import {createMenuTemplate} from './components/site-menu.js';
import {createBoardFilterTemplate} from './components/sorting.js';
import {createCardTemplate} from './components/task';
import {createCardEditTemplate} from './components/task-edit';

const TASK_COUNT = 3;

const renderTemplate = (wrapper, template, position = `beforeend`) => {
  wrapper.insertAdjacentHTML(position, template);
};

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

renderTemplate(mainControl, createMenuTemplate());
renderTemplate(main, createMainFilterTemplate());
renderTemplate(main, createBoardTemplate());

const boardWrapper = main.querySelector(`.board`);
renderTemplate(boardWrapper, createBoardFilterTemplate(), `afterbegin`);

const boardTaskList = boardWrapper.querySelector(`.board__tasks`);
renderTemplate(boardTaskList, createCardEditTemplate());

new Array(TASK_COUNT).fill(``).forEach(() => {
  renderTemplate(boardTaskList, createCardTemplate());
});

renderTemplate(boardWrapper, createLoadMoreTemplate());
