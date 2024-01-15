import View from './View.js';

class SearchRecipesView extends View {
  _form = document.getElementById('search-form');
  #recipeSearchInput = document.getElementById('search-keyword');
  #typeheadContainer = document.querySelector('.typehead-list');

  #searchKeyword;
  #typeheadIndex = -1;
  #keywordsLen = 0;

  constructor() {
    super();
    this.#recipeSearchInput.value = '';

    // when search input loses focus, hide typehead
    this.#recipeSearchInput.addEventListener('blur', e => this.#hideTypehead());
  }

  bindSearchRecipes(handler) {
    this._form.addEventListener('submit', e => {
      e.preventDefault();

      const keyword = this.#recipeSearchInput.value.trim();
      if (keyword === '') return;

      handler(keyword);
    });
  }

  // TYPEHEAD
  #hideTypehead() {
    this.#typeheadContainer.style.height = 0;
  }

  #handleTypeheadScroll(currentItem) {
    if (
      currentItem.offsetTop < this.#typeheadContainer.scrollTop || // scroll up
      currentItem.offsetTop + currentItem.offsetHeight > this.#typeheadContainer.clientHeight // scroll down
    ) {
      currentItem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  #highlightTypehead(index) {
    const typeheadItems = this.#typeheadContainer.querySelectorAll('.typehead-item');
    const typeheadItem = typeheadItems[index];

    // display keyword in input box
    this.#recipeSearchInput.value = typeheadItem.innerHTML;

    // highlight
    typeheadItems.forEach(item => item.classList.remove('hover'));
    typeheadItem.classList.add('hover');

    // scroll to highlighted item
    this.#handleTypeheadScroll(typeheadItem);
  }

  #renderTypehead(keywords) {
    let html = '';
    keywords.forEach(keyword => (html += `<li class="typehead-item">${keyword}</li>`));

    this.#typeheadIndex = -1;
    this.#typeheadContainer.textContent = '';
    this.#typeheadContainer.style.height = 'fit-content';
    this.#typeheadContainer.insertAdjacentHTML('afterbegin', html);
  }

  searchKeyword(allowedSearchKeywords) {
    // search keyword in the array
    const keywords = allowedSearchKeywords.filter(keyword => keyword.startsWith(this.#searchKeyword)).sort();
    this.#keywordsLen = keywords.length;

    // if keyword not found, hide typehead
    if (!this.#keywordsLen) {
      this.#hideTypehead();
      return;
    }

    this.#renderTypehead(keywords);
  }

  bindTypehead(handler) {
    this.#recipeSearchInput.addEventListener('keyup', e => {
      const key = e.key;
      this.#searchKeyword = this.#recipeSearchInput.value.toLowerCase().trim();

      // If input is empty or key is enter or escape, hide typehead
      if (!this.#searchKeyword || key === 'Enter' || key === 'Escape') {
        this.#hideTypehead();
        return;
      }

      const lastIndex = this.#keywordsLen - 1;
      switch (key) {
        case 'ArrowDown':
          this.#typeheadIndex = this.#typeheadIndex === lastIndex ? 0 : ++this.#typeheadIndex;
          this.#highlightTypehead(this.#typeheadIndex);
          break;
        case 'ArrowUp':
          this.#typeheadIndex = this.#typeheadIndex < 1 ? lastIndex : --this.#typeheadIndex;
          this.#highlightTypehead(this.#typeheadIndex);
          break;
        default:
          handler();
      }
    });
  }

  bindTypeheadClick(handler) {
    // when click on typehead item, start search
    this.#typeheadContainer.addEventListener('click', e => {
      if (e.target === this.#typeheadContainer) return;

      this.#hideTypehead();
      const keyword = e.target.innerHTML;
      if (!keyword) return;

      this.#recipeSearchInput.value = keyword;
      handler(keyword);
    });
  }
}

export default new SearchRecipesView();
