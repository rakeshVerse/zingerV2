'use strict';

import model from './model.js';
import headerView from './view/HeaderView.js';
import addRecipeView from './view/AddRecipeView.js';

class Controller {
  #model;
  #headerView;
  #addRecipeView;

  constructor(model, headerView, addRecipeView) {
    this.#model = model;
    this.#headerView = headerView;
    this.#addRecipeView = addRecipeView;

    this.#headerView.bindChangeTheme(this.handleChangeTheme);
    this.#headerView.bindPersistTheme(this.handlePersistTheme);
  }

  // SUBSCRIBERS

  handleChangeTheme = themeClass => {
    this.#model.storeTheme(themeClass);
  };

  handlePersistTheme = () => {
    this.#model.retrieveTheme();
    if (this.#model.themeClass) this.#headerView.renderTheme(this.#model.themeClass);
  };
}

const app = new Controller(model, headerView, addRecipeView);
