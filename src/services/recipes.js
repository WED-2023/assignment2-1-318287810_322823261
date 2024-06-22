import recipe1 from "../assets/mocks/recipe_full_view.json";
import recipe2 from "../assets/mocks/recipe_full_view_2.json";
import recipe3 from "../assets/mocks/recipe_full_view_3.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";

const recipes = [recipe1, recipe2, recipe3];

export function mockGetRecipesPreview(amount = 3) {
  return { data: { recipes: recipes.slice(0, amount) } };
}

export function mockGetRecipeFullDetails(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  return { data: { recipe: recipe || null } };
}

export function getFavoriteRecipes() {
  const favoriteIds = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return recipes.filter(recipe => favoriteIds.includes(recipe.id));
}

export function toggleFavoriteRecipe(recipeId) {
  let favoriteIds = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favoriteIds.includes(recipeId)) {
    favoriteIds = favoriteIds.filter(id => id !== recipeId);
  } else {
    favoriteIds.push(recipeId);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteIds));
}


export function mockSearchRecipes(query, numberOfRecipes, selectedCuisine, selectedDiet, selectedIntolerance, sortBy) {
  let results = recipes;

  // סינון לפי השם
  if (query) {
    results = results.filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase()));
  }

  // סינון לפי סוג מטבח
  if (selectedCuisine) {
    results = results.filter(recipe => recipe.cuisine && recipe.cuisine.toLowerCase() === selectedCuisine.toLowerCase());
  }

  // סינון לפי דיאטה (טבעוני/צמחוני)
  if (selectedDiet) {
    if (selectedDiet.toLowerCase() === 'vegan') {
      results = results.filter(recipe => recipe.vegan);
    } else if (selectedDiet.toLowerCase() === 'vegetarian') {
      results = results.filter(recipe => recipe.vegetarian);
    }
  }

  // סינון לפי אי סבילות (glutenFree)
  if (selectedIntolerance) {
    if (selectedIntolerance.toLowerCase() === 'gluten') {
      results = results.filter(recipe => recipe.glutenFree);
    }
  }

  // מיון
  if (sortBy === 'time') {
    results.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  } else if (sortBy === 'popularity') {
    results.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
  }

  // החזרת כל התוצאות אם יש פחות ממספר המתכונים המבוקש
  return { data: { recipes: results.slice(0, Math.min(results.length, numberOfRecipes)) } };
}
