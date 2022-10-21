import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//! Get recipe data from API
const controlRecipes = async function () {
  try {
    const hashId = window.location.hash.slice(1);

    if (!hashId) return;

    //? Load spinner before recipe load
    recipeView.loadingSpinner();

    //? Load recipe
    await model.loadRecipe(hashId);

    //? Render recipe and make markup html
    recipeView.render(model.state.recipe);

    //? Handle errors
  } catch (error) {
    recipeView.errorMessage();
  }
};

const searchRecipe = async function () {
  try {
    //? 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //? 2) Search query
    await model.searchQuery(query);

    //? 3) Render query
    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(searchRecipe);
};
init();
