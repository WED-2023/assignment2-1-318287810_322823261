import recipe1 from "../assets/mocks/recipe_full_view.json";
import recipe2 from "../assets/mocks/recipe_full_view_2.json";
import recipe3 from "../assets/mocks/recipe_full_view_3.json";

const recipes = [recipe1, recipe2, recipe3];

export function mockGetRecipesPreview(amount = 3) {
  return { data: { recipes: recipes.slice(0, amount) } };
}

export function mockGetRecipeFullDetails(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  return { data: { recipe: recipe || null } };
}
