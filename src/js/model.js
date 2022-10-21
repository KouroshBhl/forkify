import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
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

    console.log(state.recipe);
  } catch (error) {
    console.error(`Something went wrong! ${error} 😒`);
    throw error;
  }
};
