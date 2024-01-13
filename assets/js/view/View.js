export default class View {
  clearFormInputs(form) {
    form.querySelectorAll('input').forEach(inp => (inp.value = ''));
  }

  /**
   * @param {HTML element} element Element in which you want to show the message
   * @param {String} msg Message to display
   * @param {String} color Message color
   */
  showInfo(element = this._msgContainer, msg, className = 'info') {
    element.classList.remove('hidden-info');
    element.textContent = msg;
    element.className = `${element.classList[0]} ${className}`;
  }
}
