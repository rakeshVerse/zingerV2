import View from './View.js';
import fracty from 'fracty';

class RecipeView extends View {
  _msgContainer = document.querySelector('.recipe-info');
  #recipeContainer = document.querySelector('.detail-box');

  displayInfo(msg) {
    this.showInfo(undefined, msg);
    this.emptyContainer();
  }

  emptyContainer() {
    this.#recipeContainer.textContent = '';
  }

  renderRecipe(recipe, isSavedRecipe) {
    /**
     * Generate List for ingredients
     * @param {Array} ingredients Array of ingredients
     */
    const generateIngredientList = ingredients =>
      ingredients
        .map(ing => {
          const { quantity, unit, description } = ing;
          return `
        <li class="recipe-ingredient">
          <span class="opacity-6">👉🏿</span>

          <div>
            <span class="ing-quantity">${quantity ? fracty(quantity) : ''}</span>
            ${unit} ${description}
          </div>
        </li>`;
        })
        .join('');

    const { publisher, ingredients, source_url, image_url, title, servings, cooking_time, key, id } = recipe;

    // Add servings to app state
    // servingsCounter = servings;

    const html = `
  <div class="recipe-img-box">
    <img src="${image_url}" alt="" class="recipe-img"/>
    <h1 class="recipe-title">${title}</h1>
  </div>

  <div class="recipe-text">
    <div class="recipe-header recipe-sub-section">
      <div class="recipe-actions">
        <p class="recipe-duration"><span class="action-logo">🕒</span> <span class="action-value">${cooking_time}</span> minutes</p>
        <div class="recipe-servings-box">
          <p class="recipe-servings"><span class="action-logo opacity-6">👥</span> <span class="action-value">${servings}</span> servings</p>
          <div class = "update-ing-btns">
            <a href="#" class="increase-servings">➕</a>
            <a href="#" class="decrease-servings">➖</a>
          </div>
        </div>
      </div>

      <div class="recipe-actions">
        ${key ? '<span class="recipe-user opacity-6">👤</span>' : ''}
        <a href="#" class="save-recipe opacity-6">${isSavedRecipe ? '❤️' : '🤍'}</a>
      </div>
    </div>

    <div class="ingredients recipe-sub-section">
      <h2 class="ingredients-title recipe-sub-head">Recipe Ingredients</h2>
      <ul class="recipe-ingredient-list">${generateIngredientList(ingredients)}</ul>
    </div>

    <div class="cook">
      <h2 class="cook-title recipe-sub-head">How to cook it</h2>
      <p class="cook-text">
        This recipe was carefully designed and tested by
        <span> ${publisher}</span>. Please check out directions at
        their website.
      </p>
      <a href="${source_url}" target="_blank" class="btn-link light-bg">Direction &rightarrow;</a>
    </div>
  </div>`;

    this._msgContainer.classList.add('hidden-info');
    this.#recipeContainer.insertAdjacentHTML('afterbegin', html);

    // Bind Save-recipe event
    document.querySelector('.save-recipe').addEventListener('click', e => saveRecipeHandler(e, recipe));

    // Bind update servings event
    document.querySelector('.update-ing-btns').addEventListener('click', e => scaleIngredientsCB(e, recipe));
  }

  bindShowRecipe(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
}

export default new RecipeView();
