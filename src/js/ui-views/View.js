import warning from 'url:../../img/warning.png';
import { createAlphabet } from '../helpers.js';
export default class View {
  _data;

  //^ Clear html of parent elemnt
  _clear() {
    this._parentElement.innerHTML = '';
  }

  //^ Render data to ui
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderAlphabet() {
    const alphabet = createAlphabet();
    this._parentElement.insertAdjacentHTML('afterbegin', alphabet);
  }

  //^ Update
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Convert markup-string to DOM-object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          console.log(attr);
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  //^ Render spinner
  renderSpinner() {
    const markup = `
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //^ Render error
  renderError(message = this._errorMessage) {
    const markup = `
      <h4 class='m-2 text-center'> <span> <img class='icon warning align-top' src="${warning}" alt="warning"> ${message}</span></h4>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
