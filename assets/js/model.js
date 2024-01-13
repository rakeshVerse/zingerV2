import { AJAX } from './helper';
import { FORKIFY_API_URL, FORKIFY_API_KEY, RECIPE_ITEMS_PER_PAGE } from './config';

class Model {
  constructor() {
    this.recipeSearchResults = {
      recipes: [],
    };
  }

  storeTheme(themeClass) {
    localStorage.setItem('theme', themeClass);
  }

  retrieveTheme() {
    this.themeClass = localStorage.getItem('theme');
  }

  async loadSearchRecipesResult(keyword) {
    try {
      const jsonData = await AJAX(`${FORKIFY_API_URL}?search=${keyword}&key=${FORKIFY_API_KEY}`);
      this.recipeSearchResults.totalRecipes = jsonData.results;
      if (!this.recipeSearchResults.totalRecipes) throw new Error('No recipes found. Please try again!');

      this.recipeSearchResults.recipes.length = 0;
      this.recipeSearchResults.recipes.push(...jsonData.data.recipes);
      console.log(this.recipeSearchResults);
    } catch (error) {
      throw error;
    }
  }

  getSearchResults() {
    return this.recipeSearchResults.totalRecipes > RECIPE_ITEMS_PER_PAGE
      ? this.recipeSearchResults.recipes.slice(0, RECIPE_ITEMS_PER_PAGE)
      : this.recipeSearchResults.recipes;
  }
}

export default new Model();
