'use strict';

import model from './model.js';
import headerView from './view/HeaderView.js';
import searchRecipesView from './view/SearchRecipesView.js';
import recipePreviewView from './view/RecipePreviewView.js';
import paginationView from './view/PaginationView.js';
import recipeView from './view/RecipeView.js';
import addRecipeView from './view/AddRecipeView.js';

class Controller {
  #model;
  #headerView;
  #searchRecipesView;
  #recipePreviewView;
  #paginationView;
  #recipeView;

  constructor(model, headerView, searchRecipesView, recipePreviewView, paginationView, recipeView) {
    this.#model = model;
    this.#headerView = headerView;
    this.#searchRecipesView = searchRecipesView;
    this.#recipePreviewView = recipePreviewView;
    this.#paginationView = paginationView;
    this.#recipeView = recipeView;

    this.#headerView.bindChangeTheme(this.handleChangeTheme);
    this.#headerView.bindPersistTheme(this.handlePersistTheme);
    this.#searchRecipesView.bindSearchRecipes(this.handleSearchRecipes);
    this.#paginationView.bindPagination(this.handlePagination);
    this.#searchRecipesView.bindTypehead(this.handleTypehead);
    this.#searchRecipesView.bindTypeheadClick(this.handleTypeheadClick);
    this.#recipeView.bindShowRecipe(this.handleShowRecipe);
  }

  // SUBSCRIBERS

  handleChangeTheme = themeClass => {
    this.#model.storeTheme(themeClass);
  };

  handlePersistTheme = () => {
    this.#model.retrieveTheme();
    if (this.#model.themeClass) this.#headerView.renderTheme(this.#model.themeClass);
  };

  handleSearchRecipes = async keyword => {
    try {
      this.#paginationView.hidePaginationButtons();

      this.#recipePreviewView.displayInfo('Searching...');

      await this.#model.loadSearchRecipesResult(keyword);

      this.#recipePreviewView.renderRecipeList(this.#model.getSearchResults());

      if (this.#model.state.recipe.id) this.#recipePreviewView.highlightItem(this.#model.state.recipe.id);

      this.#paginationView.renderInitailPaginationBtn(this.#model.state.totalRecipes);

      this.#searchRecipesView.clearFormInputs();
    } catch (error) {
      console.log(error);
      this.#recipePreviewView.displayError(error);
    }
  };

  handlePagination = (startIndex, endIndex) => {
    this.#recipePreviewView.renderRecipeList(this.#model.state.recipes.slice(startIndex, endIndex));
    if (this.#model.state.recipe.id) this.#recipePreviewView.highlightItem(this.#model.state.recipe.id);
  };

  handleTypehead = () => {
    this.#searchRecipesView.searchKeyword(this.#model.state.allowedSearchKeywords);
  };

  handleTypeheadClick = keyword => {
    this.handleSearchRecipes(keyword);
  };

  handleShowRecipe = async () => {
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;

      // Render loading message
      this.#recipeView.displayInfo('Loading...');

      // Highlight current item
      this.#recipePreviewView.highlightItem(id);

      // Fetch recipe
      await this.#model.loadRecipe(id);

      // Render recipe
      this.#recipeView.renderRecipe(this.#model.state.recipe, this.#model.isSavedRecipe());
    } catch (error) {
      console.dir(error);
    }
  };
}

const app = new Controller(
  model,
  headerView,
  searchRecipesView,
  recipePreviewView,
  paginationView,
  recipeView
);
