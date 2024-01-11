import View from './View.js';

class HeaderView extends View {
  #body = document.body;
  #themeMenu = document.querySelector('.theme-item');

  renderTheme(themeClass) {
    this.#body.className = themeClass;
  }

  // PUBLISHERS

  bindChangeTheme(handler) {
    this.#themeMenu.addEventListener('click', e => {
      e.preventDefault();

      if (e.target === this.#themeMenu) return;

      const themeClass = e.target.classList[1];
      this.renderTheme(themeClass);

      handler(themeClass);
    });
  }

  bindPersistTheme(handler) {
    window.addEventListener('load', handler);
  }
}

export default new HeaderView();
