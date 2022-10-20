import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'regenerator-runtime/runtime';
import 'core-js/stable';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    console.error(`Something went wrong! ${error} 😒`);
  }
};

['hashchange', 'load'].map(ev => window.addEventListener(ev, controlRecipes));
