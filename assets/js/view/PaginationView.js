import { RECIPE_ITEMS_PER_PAGE } from '../config';

class PaginationView {
  #paginationContainer = document.querySelector('.pagination-box');
  #paginationBtnPrev = document.querySelector('.btn-pg-prev');
  #paginationBtnNext = document.querySelector('.btn-pg-next');

  hidePaginationButtons() {
    this.#paginationBtnPrev.classList.add('hidden');
    this.#paginationBtnNext.classList.add('hidden');
  }

  showPaginationContainer() {
    this.#paginationContainer.classList.remove('hidden');
  }

  renderInitailPaginationBtn(totalRecipes) {
    if (totalRecipes > RECIPE_ITEMS_PER_PAGE) {
      this.#paginationBtnNext.classList.remove('hidden');
      this.#paginationBtnNext.dataset.index = RECIPE_ITEMS_PER_PAGE;
    } else {
      this.#paginationBtnNext.classList.add('hidden');
    }
  }
}

export default new PaginationView();
