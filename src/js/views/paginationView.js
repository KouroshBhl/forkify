import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerRender(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const totalPage = Math.ceil(
      this._data.results.length / this._data.pageDefult
    );
    const currPage = this._data.page;

    // 1) page 1, other pages
    if (currPage === 1 && totalPage > 1) {
      return this._generateMarkupNextBtn();
    }
    // 2) other pages
    // if (totalPage > 1 && currPage !== 1 && currPage !== totalPage) {
    if (currPage < totalPage) {
      return [this._generateMarkupPrevBtn(), this._generateMarkupNextBtn()];
    }
    // 3) last page
    if (currPage === totalPage && totalPage > 1) {
      return this._generateMarkupPrevBtn();
    }
    // 4) only page 1

    return '';
  }
  _generateMarkupPrevBtn() {
    return `
           <button data-goto="${
             this._data.page - 1
           }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this._data.page - 1}</span>
          </button>
    `;
  }
  _generateMarkupNextBtn() {
    return `
          <button data-goto="${
            this._data.page + 1
          }" class="btn--inline pagination__btn--next">
              <span>Page ${this._data.page + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
    `;
  }
}

export default new PaginationView();
