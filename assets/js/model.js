import { AJAX } from './helper';
import { FORKIFY_API_URL, FORKIFY_API_KEY, RECIPE_ITEMS_PER_PAGE } from './config';

class Model {
  constructor() {
    this.state = {
      recipes: [],
      savedRecipes: [],
      recipe: {},
      allowedSearchKeywords: [
        'vegan',
        'buttermilk',
        'butter',
        'curd',
        'milk',
        'soup',
        'noodles',
        'dosa',
        'bread',
        'chana',
        'dal',
        'wheat',
        'rice',
        'burger',
        'eggs',
        'carrot',
        'broccoli',
        'asparagus',
        'cauliflower',
        'corn',
        'cucumber',
        'green pepper',
        'lettuce',
        'mushrooms',
        'onion',
        'potato',
        'pumpkin',
        'red pepper',
        'tomato',
        'beetroot',
        'brussel sprouts',
        'peas',
        'zucchini',
        'radish',
        'sweet potato',
        'artichoke',
        'leek',
        'cabbage',
        'celery',
        'chili',
        'garlic',
        'basil',
        'coriander',
        'parsley',
        'dill',
        'rosemary',
        'oregano',
        'cinnamon',
        'saffron',
        'green bean',
        'bean',
        'chickpea',
        'lentil',
        'apple',
        'apricot',
        'avocado',
        'banana',
        'blackberry',
        'blackcurrant',
        'blueberry',
        'boysenberry',
        'cherry',
        'coconut',
        'fig',
        'grape',
        'grapefruit',
        'kiwifruit',
        'lemon',
        'lime',
        'lychee',
        'mandarin',
        'mango',
        'melon',
        'nectarine',
        'orange',
        'papaya',
        'passion fruit',
        'peach',
        'pear',
        'pineapple',
        'plum',
        'pomegranate',
        'quince',
        'raspberry',
        'strawberry',
        'watermelon',
        'salad',
        'pizza',
        'pasta',
        'popcorn',
        'lobster',
        'steak',
        'bbq',
        'pudding',
        'hamburger',
        'pie',
        'cake',
        'sausage',
        'tacos',
        'kebab',
        'poutine',
        'seafood',
        'chips',
        'fries',
        'masala',
        'paella',
        'som tam',
        'chicken',
        'toast',
        'marzipan',
        'tofu',
        'ketchup',
        'hummus',
        'maple syrup',
        'parma ham',
        'fajitas',
        'champ',
        'lasagna',
        'poke',
        'chocolate',
        'croissant',
        'arepas',
        'bunny chow',
        'pierogi',
        'donuts',
        'rendang',
        'sushi',
        'ice cream',
        'duck',
        'curry',
        'beef',
        'goat',
        'lamb',
        'turkey',
        'pork',
        'fish',
        'crab',
        'bacon',
        'ham',
        'pepperoni',
        'salami',
        'ribs',
      ],
    };
  }

  storeTheme(themeClass) {
    localStorage.setItem('theme', themeClass);
  }

  retrieveTheme() {
    this.themeClass = localStorage.getItem('theme');
  }

  async loadSearchRecipesResult(keyword) {
    try {
      const jsonData = await AJAX(`${FORKIFY_API_URL}?search=${keyword}&key=${FORKIFY_API_KEY}`);
      this.state.totalRecipes = jsonData.results;
      if (!this.state.totalRecipes) throw new Error('No recipes found. Please try again!');

      this.state.recipes.length = 0;
      this.state.recipes.push(...jsonData.data.recipes);
      console.log(this.state);
    } catch (error) {
      throw error;
    }
  }

  getSearchResults() {
    return this.state.totalRecipes > RECIPE_ITEMS_PER_PAGE
      ? this.state.recipes.slice(0, RECIPE_ITEMS_PER_PAGE)
      : this.state.recipes;
  }

  async loadRecipe(id) {
    try {
      const jsonData = await AJAX(`${FORKIFY_API_URL}/${id}?key=${FORKIFY_API_KEY}`);
      this.state.recipe = jsonData.data.recipe;
    } catch (error) {
      throw error;
    }
  }

  isSavedRecipe() {
    return !this.state.savedRecipes.every(recipe => recipe.id !== this.state.recipe.id);
  }
}

export default new Model();
