import {remove, render, RenderPosition, replace} from "../utils/render";
import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import NoTasksComponent from "../components/no-tasks";
import SortComponent, {SortType} from "../components/sorting";
import TasksComponent from "../components/tasks";
import LoadMoreButtonComponent from "../components/load-more-button";

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

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTaskCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        tasks.slice(prevTaskCount, showingTasksCount).forEach((it) => {
          renderTask(taskListElement, it);
        });

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.SORT_BY_DATE_UP:
          sortedTasks = tasks.slice().sort((a, b) => {
            return a.dueDate - b.dueDate;
          });
          break;
        case SortType.SORT_BY_DATE_DOWN:
          sortedTasks = tasks.slice().sort((a, b) => {
            return b.dueDate - a.dueDate;
          });
          break;
        case SortType.SORT_BY_DEFAULT:
          sortedTasks = tasks.slice(0, showingTasksCount);
          break;
      }
      console.log(sortedTasks);
      taskListElement.innerHTML = ``;
      renderTasks(taskListElement, sortedTasks);

      if (sortType === SortType.SORT_BY_DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
