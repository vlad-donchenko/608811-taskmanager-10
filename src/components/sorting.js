import AbstractComponent from "./abstract-component";

export const SortType = {
  SORT_BY_DEFAULT: `default`,
  SORT_BY_DATE_UP: `date-up`,
  SORT_BY_DATE_DOWN: `date-down`,
};

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter" data-sort="${SortType.SORT_BY_DEFAULT}">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort="${SortType.SORT_BY_DATE_UP}">SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort="${SortType.SORT_BY_DATE_DOWN}">SORT BY DATE down</a>
    </div>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.SORT_BY_DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sort;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
