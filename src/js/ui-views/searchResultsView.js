import View from './View.js';

class SearchResultsView extends View {
  _parentElement = document.querySelector('.result-container');
  _errorMessage = 'We could not find that query. Please try another one...';
  _message = '';

  _generateMarkup() {
    return `
        ${this._data.map(this._generateMarkupPreview).join('')}
    `;
  }

  _generateMarkupPreview(result) {
    return `
      <div class="card col m-2 p-0">
        <a class="stretched-link text-success text-decoration-none" href="#${result.id}">
          <div class="card-body p-0">
            <img class="img-fluid img-cocktail rounded-circle" src="${result.img}" alt="${result.title}"/>
           <p class="m-0 pt-2">${result.title}</p>
          </div>
        </a>
      </div>
    `;
  }
}

export default new SearchResultsView();
