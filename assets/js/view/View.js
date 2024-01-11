export default class View {
  clearFormInputs(form) {
    form.querySelectorAll('input').forEach(inp => (inp.value = ''));
  }
}
