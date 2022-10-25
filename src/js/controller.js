import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { async } from 'regenerator-runtime';
import View from './views/View.js';

// if (module.hot) {
//   module.hot.accept();
// }

//! Get recipe data from API
const controlRecipes = async function () {
  try {
    const hashId = window.location.hash.slice(1);
    if (!hashId) return;

    resultView.update(model.getSearchResultsPage());

    //? Load spinner before recipe load
    recipeView.loadingSpinner();

    //? Load recipe
    await model.loadRecipe(hashId);

    //? Render recipe and make markup html
    recipeView.render(model.state.recipe);
    controlUpdateServings();
  } catch (error) {
    recipeView.errorMessage();
  }
};

const searchRecipe = async function () {
  try {
    // Loading Spinner
    resultView.loadingSpinner();

    //? 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //? 2) Search query
    await model.searchQuery(query);

    //? 3) Render query
    resultView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlUpdateServings = function (newServing) {
  model.updateServing(newServing);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.isBookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
};

//? Add Handlers
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerNewBookmark(controlAddBookmark);
  searchView.addHandlerRender(searchRecipe);
  paginationView.addHandlerRender(controlPagination);
};
init();
