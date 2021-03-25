class SearchByLetterView {
  _parentElement = document.querySelector('.search-letter');
  _query = '';

  addHendlerSearchByLetter(handler) {
    this._parentElement.addEventListener('click', e => {
      const letter = e.target.closest('.letter').textContent;

      if (!letter) return;

      this._query = letter;

      handler();
      e.preventDefault();
    });
  }
}

export default new SearchByLetterView();
