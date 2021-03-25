class SearchByNameView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement
      .querySelector('.search-name')
      .value.trim();
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search-name').value = '';
  }

  addHendlerSearchByName(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchByNameView();
