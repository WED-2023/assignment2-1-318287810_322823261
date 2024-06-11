// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {
  const recipes = recipesPreview.slice(0, amount);
  return { data: { recipes: recipes } };
  }


export function mockGetRecipeFullDetails(recipeId) {
  const recipe = recipeFullView.find(recipe => recipe.id === recipeId);
  return { data: { recipe: recipe } };
  }
  
