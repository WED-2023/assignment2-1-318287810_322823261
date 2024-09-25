// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
  
import axios from 'axios';


  export function mockAddFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  
  export function mockAddUserRecipe(recipeDetails) {
    return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };

  }

const apiBase = 'https://recipesite.cs.bgu.ac.il';

export async function addFavorite(recipeId) {
  try {
    const response = await axios.post(`${apiBase}/users/favorites`, 
      { recipeId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function removeFavorite(recipeId) {
  try {
    const response = await axios.delete(`${apiBase}/users/favorites`, 
      { 
        data: { recipeId },
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function getFavoriteRecipes() {
  try {
    console.log("Fetching favorite recipes...");
    const response = await axios.get(`${apiBase}/users/favorites`, 
      { withCredentials: true }
    );
    console.log("Favorite recipes response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    throw error.response;
  }
}

export async function isFavorite(recipeId) {
  try {
    console.log("is favorite in user.js 2-1:", recipeId);
    const response = await axios.post(`${apiBase}/users/isFavorite`, 
      { recipeId },
      { withCredentials: true }
    );
    console.log("is favorite in user.js 2-1 resolte:", response.data.favorite);
    return response.data.favorite;
  } catch (error) {
    throw error.response;
  }
}


export async function getUserRecipes() {
  try {
    console.log("Fetching My recipes...");
    const response = await axios.get(`${apiBase}/users/userRecipes`, 
      { withCredentials: true }
    );
    console.log("My recipes response:", response.data);
    return response.data;
  } catch (error) {
      console.log("My recipes response:", error);
      throw error.response;
  }
}

export async function createRecipe(recipe) {
  try {
    const response = await axios.post(`${apiBase}/users/createARecipe`, recipe, { withCredentials: true });
    console.log("is create recipe in user.js 2-1:", response);
    return response;
  } catch (error) {
    throw error.response;
  }
}



