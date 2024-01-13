import View from './View';

class RecipePreviewView extends View {
  #recipePreviewContainer = document.querySelector('.recipe-preview-list');
  _msgContainer = document.querySelector('.preview-info');

  displayError(error) {
    this.showInfo(undefined, error.message, 'danger');
  }

  displayInfo(msg) {
    this.showInfo(undefined, msg);
    this.emptyContainer();
  }

  emptyContainer() {
    this.#recipePreviewContainer.textContent = '';
  }

  generateRecipePreviewItem(recipe, className) {
    const { id, image_url, title, publisher, key } = recipe;

    return `<li class="recipe-item hightlight-hover ${className}" data-id="${id}">
              <a href="#" class="recipe-preview-link">
                <img
                  class="preview-img"
                  src="${image_url}"
                  alt=""
                />
                <div class="preview-text">
                  <p class="preview-title">${title}</p>
                  <p class="preview-publisher">
                  <span>${publisher}</span>
                  ${key ? '<span class="preview-user opacity-6">👤</span>' : ''}
                  </p>
                </div>
              </a>
            </li>`;
  }

  renderRecipeList(
    recipes,
    infoContainer = this._msgContainer,
    listContainer = this.#recipePreviewContainer,
    className = 'recipe-preview-item'
  ) {
    let html = '';
    recipes.forEach(recipe => (html += this.generateRecipePreviewItem(recipe, className)));

    infoContainer.classList.add('hidden-info');
    listContainer.textContent = '';
    listContainer.insertAdjacentHTML('afterbegin', html);

    // Highlight recipe item
    // 1. Saved recipes view: When page loads with recipeId
    // 2. Recipe preview view: When user searches or click on pagination button
    // if (recipeId) highlightItem(recipeId);
  }
}

export default new RecipePreviewView();
