import { RECIPE_ITEMS_PER_PAGE } from '../config';

class PaginationView {
  #paginationContainer = document.querySelector('.pagination-box');
  #paginationBtnPrev = document.querySelector('.btn-pg-prev');
  #paginationBtnNext = document.querySelector('.btn-pg-next');
  #totalRecipes;

  hidePaginationButtons() {
    this.#paginationBtnPrev.classList.add('hidden');
    this.#paginationBtnNext.classList.add('hidden');
  }

  showPaginationContainer() {
    this.#paginationContainer.classList.remove('hidden');
  }

  renderInitailPaginationBtn(totalRecipes) {
    this.#totalRecipes = totalRecipes;
    if (totalRecipes > RECIPE_ITEMS_PER_PAGE) {
      this.#paginationBtnNext.classList.remove('hidden');
      this.#paginationBtnNext.dataset.index = RECIPE_ITEMS_PER_PAGE;
    } else {
      this.#paginationBtnNext.classList.add('hidden');
    }
  }

  bindPagination(handler) {
    this.#paginationContainer.addEventListener('click', e => {
      // Guard clause
      if (e.target === this.#paginationContainer) return;

      /**
       * Show specified pagination button
       * @param {Element} btn Pagination button to show
       */
      const showPaginationBtn = btn => {
        if (btn.classList.contains('hidden')) btn.classList.remove('hidden');
      };

      let startIndex;
      let endIndex;

      // Previous btn
      if (e.target === this.#paginationBtnPrev) {
        // Get the endIndex from button data-index
        endIndex = +this.#paginationBtnPrev.dataset.index;

        // Calculate startIndex
        startIndex = endIndex - RECIPE_ITEMS_PER_PAGE;

        // If startIndex is <= 0, then it's a first page, hide previous btn
        if (startIndex <= 0) {
          this.#paginationBtnPrev.classList.add('hidden');
        }

        // Show next button
        showPaginationBtn(this.#paginationBtnNext);
      }

      // Next btn
      if (e.target === this.#paginationBtnNext) {
        // Get start index from button data-index
        startIndex = +this.#paginationBtnNext.dataset.index;

        // Calculate end index
        endIndex = startIndex + RECIPE_ITEMS_PER_PAGE;

        // If endIndex is greater than totalRecipes then it's a last page so hide next btn
        if (endIndex >= this.#totalRecipes) {
          endIndex = this.#totalRecipes;
          this.#paginationBtnNext.classList.add('hidden');
        }

        // Show previous button
        showPaginationBtn(this.#paginationBtnPrev);
      }

      // Add index to data attribute of buttons
      this.#paginationBtnPrev.dataset.index = startIndex;
      this.#paginationBtnNext.dataset.index = endIndex;

      handler(startIndex, endIndex);
    });
  }
}

export default new PaginationView();
