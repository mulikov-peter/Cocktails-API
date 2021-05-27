class SearchByNameView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement
      .querySelector('.search-name')
      .value.trim()
      .toLowerCase();
    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search-name').value = '';
  }

  addHandlerSearchByName(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchByNameView();
