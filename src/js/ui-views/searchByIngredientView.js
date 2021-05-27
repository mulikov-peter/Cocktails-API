class SearchByIngredientView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement
      .querySelector('.search-ingredient')
      .value.trim()
      .toLowerCase();
    this._clearInput();
    console.log(query);
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search-ingredient').value = '';
  }

  addHandlerSearchByIngredient(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchByIngredientView();
