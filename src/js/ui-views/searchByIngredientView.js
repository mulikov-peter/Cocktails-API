class SearchByIngredientView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement
      .querySelector('.search-ingredient')
      .value.trim();
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search-ingredient').value = '';
  }

  addHendlerSearchByIngredient(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchByIngredientView();
