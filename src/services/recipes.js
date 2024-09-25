import recipe1 from "../assets/mocks/recipe_full_view.json";
import recipe2 from "../assets/mocks/recipe_full_view_2.json";
import recipe3 from "../assets/mocks/recipe_full_view_3.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import axios from 'axios';

//const recipes = [recipe1, recipe2, recipe3];
const apiBase = 'https://recipesite.cs.bgu.ac.il';
const randomRecipesURL = `${apiBase}/recipes/random?number=3&includeTags=&excludeTags=`;


export function mockGetRecipesPreview(amount = 3) {
  return { data: { recipes: recipes.slice(0, amount) } };
}

export function mockGetRecipeFullDetails(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  return { data: { recipe: recipe || null } };
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


export async function getRandomRecipes() {
  try {
    console.log("Fetching random from URL");
    // const response1 = await axios.get('https://api.spoonacular.com/recipes/665573/information', {
    //   params: {
    //     apiKey: '9acd91c866604e20923e719c70987917'
    //   }
    // });
    
    // console.log('API Quota Used:', response1.headers['x-api-quota-used']);
    // console.log('API Quota Left:', response1.headers['x-api-quota-left']);
    
    const response = await axios.get(`${apiBase}/recipes/recipe/random`, {
      params: { 
        number: 3, 
        includeTags: '', 
        excludeTags: ''  
      },
      withCredentials: true
    });
    return { data: { recipes: response.data } };
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return { data: { recipes: [] } };
  }
}

export async function getRecipesPreview(recipeIds) {
  try {
    console.log("get recipenfull preview in recipes.js 2-1", recipeIds);
    const cleanRecipeIds = [...recipeIds]; // שכפול המזהים למניעת Vue Observable
    console.log('Clean recipe IDs:', cleanRecipeIds); // בדיקה של המזהים

    if (!Array.isArray(recipeIds) || recipeIds.length === 0) {
      throw new Error('No recipe IDs provided');
    }
    // Call the server-side endpoint to search for recipes
    const response = await axios.get(`${apiBase}/recipes/preview`, {
      params: {
        ids: cleanRecipeIds.join(','),
      },
    });
    console.log("response from getRecipePreview: (recipes.js)", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes preview:', error);
    throw error;
  }
}

export async function getRecipeFullDetails(recipeId) {
  try {
    console.log("get recipenfull details in recipes.js 2-1");
    // Call the server-side endpoint to get full recipe details
    const response = await axios.get(`${apiBase}/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
}

export async function searchRecipes(searchQuery, cuisine, diet, intolerance, number) {
  try {
    const response = await axios.get(`${apiBase}/recipes/search`, {
      params: {
        recipeName: searchQuery,
        cuisine: cuisine,
        diet: diet,
        intolerance: intolerance,
        number: number
      },
      withCredentials: true
    });
    console.log("response in serchRecipes: (recipes.js)", response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching for recipes:', error);
    throw error;
  }
}

