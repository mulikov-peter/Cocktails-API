class SearchByIngredientView {
  _parentElement = document.querySelector('.search-ingredient');

  addHandlerSearchByIngredient(handler) {
    this._parentElement.nextElementSibling.addEventListener('click', e => {
      this._parentElement.textContent = e.target.textContent;
      handler(e.target.textContent);
    });
  }
}

export default new SearchByIngredientView();
