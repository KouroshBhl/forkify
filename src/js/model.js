import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (hashId) {
  try {
    const data = await getJSON(`${API_URL}v2/recipes/${hashId}`);

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
    const data = await getJSON(`${API_URL}search?q=${query}`);

    state.search.results = data.recipes.map(recipes => {
      return {
        RecipeID: recipes.recipe_id,
        image: recipes.image_url,
        publisher: recipes.publisher,
        sourceUrl: recipes.source_url,
        title: recipes.title,
        socialRank: recipes.social_rank,
        publisherUrl: recipes.publisher_url,
      };
    });
  } catch (error) {
    console.error(`Something went wrong! ${error} 😒`);
    throw error;
  }
};
