class SearchByNameView {
  _parentElement = document.querySelector('.search-name');

  getQuery() {
    const query = this._parentElement.value.trim().toLowerCase();
    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentElement.value = '';
  }

  addHandlerSearchByName(handler) {
    this._parentElement
      .closest('.search')
      .addEventListener('submit', function (e) {
        e.preventDefault();
        handler();
      });
  }
}

export default new SearchByNameView();
