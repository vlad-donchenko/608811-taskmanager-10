import {COLORS, DAYS, MONTH_NAMES} from '../const.js';
import {formatTime, createElement} from '../utils.js';

const createHashtagsMarkUp = (hashtag) => {
  return (
    `<span class="card__hashtag-inner">
        <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
        <span class="card__hashtag-name">
          #${hashtag}
        </span>
        <button type="button" class="card__hashtag-delete">
           delete
        </button>
    </span>`
  );
};

const createRepeatDaysMarkUp = (day, repeatingDays) => {
  const isChecked = repeatingDays[day];

  return (
    `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-4" name="repeat" value="${day}" ${isChecked ? `checked` : ``}>
    <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`
  );
};

const createColorsMarkUp = (color, currentColor) => {
  const isChecked = (color === currentColor) ? `checked` : ``;

  return (
    `<input type="radio" id="color-${color}-4" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${isChecked}>
    <label for="color-${color}-4" class="card__color card__color--${color}">${color}</label>`
  );
};

const createTaskEditTemplate = (task) => {
  const {description, tags, color, dueDate, repeatingDays} = task;

  const hashtagsMarkUp = Array.from(tags).map((it) => {
    return createHashtagsMarkUp(it);
  }).join(`\n`);

  const repeatDaysMarkUp = DAYS.map((day) => {
    return createRepeatDaysMarkUp(day, repeatingDays);
  }).join(`\n`);

  const colorsMarkUp = COLORS.map((it) => {
    return createColorsMarkUp(it, color);
  }).join(`\n`);

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  return (
    `<article class="card card--edit card--${color} ${deadlineClass} ${repeatClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="" name="date" value="${date} ${time}">
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                      ${repeatDaysMarkUp}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtagsMarkUp}
                </div>

                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                  ${colorsMarkUp}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
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
