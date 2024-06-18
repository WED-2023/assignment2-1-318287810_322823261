import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";

export function mockGetRecipesPreview(amount = 3) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    recipes.push({
      ...recipe_preview,
      id: i + 1, // ensure unique ID for each recipe
      vegan: i % 2 === 0,
      vegetarian: i % 2 !== 0,
      glutenFree: i % 3 === 0
    });
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
  // simulate finding the recipe by ID
  if (recipeId === 1) {
    return { data: { recipe: recipe_full_view } };
  } else {
    return { data: { recipe: null } };
  }
}
