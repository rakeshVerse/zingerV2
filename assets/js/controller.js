'use strict';

import model from './model.js';
import headerView from './view/HeaderView.js';
import searchRecipesView from './view/SearchRecipesView.js';
import recipePreviewView from './view/RecipePreviewView.js';
import paginationView from './view/PaginationView.js';
import addRecipeView from './view/AddRecipeView.js';

class Controller {
  #model;
  #headerView;
  #searchRecipesView;
  #recipePreviewView;
  #paginationView;

  constructor(model, headerView, searchRecipesView, recipePreviewView, paginationView) {
    this.#model = model;
    this.#headerView = headerView;
    this.#searchRecipesView = searchRecipesView;
    this.#recipePreviewView = recipePreviewView;
    this.#paginationView = paginationView;

    this.#headerView.bindChangeTheme(this.handleChangeTheme);
    this.#headerView.bindPersistTheme(this.handlePersistTheme);
    this.#searchRecipesView.bindSearchRecipes(this.handleSearchRecipes);
    this.#paginationView.bindPagination(this.handlePagination);
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

      this.#paginationView.renderInitailPaginationBtn(this.#model.recipeSearchResults.totalRecipes);

      this.#searchRecipesView.clearFormInputs();
    } catch (error) {
      console.log(error);
      this.#recipePreviewView.displayError(error);
    }
  };

  handlePagination = (startIndex, endIndex) => {
    this.#recipePreviewView.renderRecipeList(
      this.#model.recipeSearchResults.recipes.slice(startIndex, endIndex)
    );
  };
}

const app = new Controller(model, headerView, searchRecipesView, recipePreviewView, paginationView);
