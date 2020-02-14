import BoardComponent from "./components/board";
import FilterComponent from "./components/filter";
import LoadMoreButtonComponent from "./components/load-more-button";
import TaskEditComponent from "./components/task-edit";
import TaskComponent from "./components/task";
import SiteMenuComponent from "./components/site-menu";
import SortComponent from "./components/sorting";
import TasksComponent from "./components/tasks";
import NoTasksComponent from "./components/no-tasks";
import {render, replace, remove, RenderPosition} from "./utils/render";
import {getFilters} from "./mock/filter";
import {getTasks} from "./mock/task";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const escKeyPressHandler = (evt) => {
    const isEsc = evt.key === `Escape` || evt.key === `Ecs`;

    if (isEsc) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, escKeyPressHandler);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, escKeyPressHandler);
  });

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler(replaceTaskToEdit);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuComponent();
render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const filters = getFilters();
const filterComponent = new FilterComponent(filters);
render(siteMainElement, filterComponent, RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const tasks = getTasks(TASK_COUNT);
const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived) {
  render(boardComponent.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
} else {
  render(boardComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent(), RenderPosition.BEFOREEND);
}

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(0, showingTasksCount).forEach((it) => {
  renderTask(taskListElement, it);
});

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);

loadMoreButtonComponent.setClickHandler(() => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount).forEach((it) => {
    renderTask(taskListElement, it);
  });

  if (showingTasksCount >= tasks.length) {
    remove(loadMoreButtonComponent);
  }
});
