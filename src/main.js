import BoardComponent from "./components/board";
import FilterComponent from "./components/filter";
import SiteMenuComponent from "./components/site-menu";
import BoardController from "./controllers/board-controller";
import {render, RenderPosition} from "./utils/render";
import {getFilters} from "./mock/filter";
import {getTasks} from "./mock/task";

const TASK_COUNT = 22;

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
const boardController = new BoardController(boardComponent);
boardController.render(tasks);
