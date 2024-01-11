'use strict';

import model from './model.js';
import headerView from './view/HeaderView.js';

class Controller {
  #model;
  #headerView;

  constructor(model, headerView) {
    this.#model = model;
    this.#headerView = headerView;

    this.#headerView.bindChangeTheme(this.handleChangeTheme);
    this.#headerView.bindPersistTheme(this.handlePersistTheme);
  }

  // SUBSCRIBERS

  handleChangeTheme = themeClass => {
    this.#model.storeTheme(themeClass);
  };

  handlePersistTheme = () => {
    this.#model.retrieveTheme();
    if (this.#model.themeClass)
      this.#headerView.renderTheme(this.#model.themeClass);
  };
}

const app = new Controller(model, headerView);
