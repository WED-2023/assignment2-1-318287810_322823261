<template>
    <div class="last-viewed-recipes">
      <h2>Last Viewed Recipes</h2>
      <div v-if="recipes.length">
        <RecipePreview v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
      </div>
      <p v-else>No recipes viewed recently.</p>
    </div>
  </template>
  
  <script>
  import RecipePreview from './RecipePreview.vue';
  import { mockGetRecipeFullDetails } from "../services/recipes.js";
  
  export default {
    components: {
      RecipePreview
    },
    data() {
      return {
        recipes: []
      };
    },
    async mounted() {
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      for (let recipeId of viewedRecipes) {
        const response = mockGetRecipeFullDetails(recipeId);
        if (response.data && response.data.recipe) {
          this.recipes.push(response.data.recipe);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .last-viewed-recipes {
    margin-top: 20px;
  }
  </style>
  