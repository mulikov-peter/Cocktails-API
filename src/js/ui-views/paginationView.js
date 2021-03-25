import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination-container');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button type="button" class="btn btn-outline-danger btn-pagination-next" data-goto="${
          curPage + 1
        }">Next page ${curPage + 1}</button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button type="button" class="btn btn-outline-danger btn-pagination-prev" data-goto="${
        curPage - 1
      }">Prev page ${curPage - 1}</button>
    `;
    }
    // Other page
    if (curPage < numPages) {
      return `
      <button type="button" class="btn btn-outline-danger btn-pagination-prev mr-2" data-goto="${
        curPage - 1
      }">Prev page ${curPage - 1}</button>
      <button type="button" class="btn btn-outline-danger btn-pagination-next ml-2" data-goto="${
        curPage + 1
      }">Next page ${curPage + 1}</button>
      `;
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
