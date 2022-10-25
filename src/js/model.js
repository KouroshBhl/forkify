import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pageDefult: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (hashId) {
  try {
    const data = await getJSON(`${API_URL}/${hashId}`);

    let { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (error) {
    console.error(`Something went wrong! ${error} 😒`);
    throw error;
  }
};

export const searchQuery = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipes => {
      return {
        id: recipes.id,
        image: recipes.image_url,
        publisher: recipes.publisher,
        title: recipes.title,
      };
    });

    //? Reset page view
    state.search.page = 1;
  } catch (error) {
    console.error(`Something went wrong! ${error} 😒`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.pageDefult;
  const end = page * state.search.pageDefult;
  return state.search.results.slice(start, end);
};

export const updateServing = function (newServing = state.recipe.servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

export const addBookmark = function (recipe) {
  //? Push bookmark for displaying in object!
  state.bookmarks.push(recipe);

  //? Add obj attribute set to true
  // if (recipe.id === state.recipe.id)
  state.recipe.isBookmarked = true;

  console.log(state);
};
