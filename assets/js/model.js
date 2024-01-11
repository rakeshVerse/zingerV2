class Model {
  constructor() {}

  storeTheme(themeClass) {
    localStorage.setItem('theme', themeClass);
  }

  retrieveTheme() {
    this.themeClass = localStorage.getItem('theme');
  }
}

export default new Model();
