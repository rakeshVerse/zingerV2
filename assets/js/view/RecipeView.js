import View from "./View.js";
import fracty from "fracty";

class RecipeView extends View {
  // Publishers
  bindLoadRecipe(handler) {
    document.getElementById("app-logo").addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new RecipeView();
