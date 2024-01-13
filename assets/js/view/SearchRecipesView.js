class SearchRecipesView {
  #searchForm = document.getElementById('search-form');

  bindSearchRecipes(handler) {
    this.#searchForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = new FormData(this);
      const keyword = data.get('search-keyword').trim();
      if (keyword === '') return;

      handler(keyword);
    });
  }
}

export default new SearchRecipesView();
