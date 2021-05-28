import { createAlphabet } from '../helpers.js';
export default class View {
  _data;

  //^ Clear html of parent element
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
      <h4 class='m-2 text-center error'> 
        <span> 
          <i class="fas fa-exclamation icon warning"></i>
          ${message}
        </span>
      </h4>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    setTimeout(() => {
      const el = document.querySelector('.result-container');

      el.classList.add('hide');
    }, 3000);
  }
}
