import View from './View.js';

class AddRecipeView extends View {
  #popup = document.getElementById('popup');
  #backdrop = document.getElementById('backdrop');
  #openPopupBtn = document.querySelector('#app-header-list .open-popup-item');
  #closePopupBtn = document.querySelector('.btn-close-popup');
  #popupInfo = document.querySelector('#popup .popup-info');
  #addRecipeSubmitBtn = document.querySelector('#popup .btn-submit-recipe');
  _form = document.getElementById('add-recipe');

  constructor() {
    super();
    this.#openAddRecipePopup();
    this.#closeAddRecipePopup();
  }

  #togglePopup() {
    this.#popup.classList.toggle('hidden-popup');
    this.#backdrop.classList.toggle('hidden-popup');
  }

  #openAddRecipePopup() {
    this.#openPopupBtn.addEventListener('click', () => {
      // this.clearFormInputs(this._form);
      this.#popupInfo.classList.add('hidden-info');
      this.#addRecipeSubmitBtn.disabled = false;
      this.#togglePopup();
    });
  }

  #closeAddRecipePopup() {
    this.#closePopupBtn.addEventListener('click', () => {
      this.#togglePopup();
    });
  }
}

export default new AddRecipeView();
