import View from './View.js';

class SearchRecipesView extends View {
  _form = document.getElementById('search-form');
  #recipeSearchInput = document.getElementById('search-keyword');

  constructor() {
    super();
    this.#recipeSearchInput.value = '';
  }

  bindSearchRecipes(handler) {
    this._form.addEventListener('submit', e => {
      e.preventDefault();

      const keyword = this.#recipeSearchInput.value.trim();
      if (keyword === '') return;

      handler(keyword);
    });
  }
}

export default new SearchRecipesView();
