import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pageDefult: RES_PER_PAGE,
  },
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
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipes => {
      return {
        id: recipes.id,
        image: recipes.image_url,
        publisher: recipes.publisher,
        title: recipes.title,
      };
    });
  } catch (error) {
    console.error(`Something went wrong! ${error} 😒`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.pageDefult) {
  const start = (page - 1) * state.search.pageDefult;
  const end = page * state.search.pageDefult;
  return state.search.results.slice(start, end);
};
