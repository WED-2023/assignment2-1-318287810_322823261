<template>
  <div class="recipe-preview-list">
    <h2>{{ title }}</h2>
    <div v-if="recipes && recipes.length">
      <RecipePreview
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        :has-viewed="hasViewed(recipe.id)"
        @toggle-favorite="toggleFavorite"
      />
    </div>
    <p v-else>No recipes found.</p>
  </div>
</template>

<script>
import RecipePreview from './RecipePreview.vue';
//import { mockGetRecipesPreview, mockGetRecipeFullDetails } from "../services/recipes.js";
import { getRecipesPreview, getRecipeFullDetails } from "../services/recipes.js";


export default {
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // async loadRecipes() {
    //   if (this.recipeIds.length) {
    //     for (let recipeId of this.recipeIds) {
    //       try {
    //         const recipeDetails = await getRecipeFullDetails(recipeId); // Corrected function call
    //         if (recipeDetails) {
    //           this.recipes.push(recipeDetails); // Adjusted to handle the API response
    //         }
    //       } catch (error) {
    //         console.error("Error fetching recipe details:", error);
    //       }
    //     }
    //   } else {
    //     try {
    //       const recipesPreview = await getRecipesPreview(this.recipeIds); // Corrected function call
    //       if (recipesPreview) {
    //         this.recipes = recipesPreview;
    //       }
    //     } catch (error) {
    //       console.error("Error fetching recipes preview:", error);
    //     }
    //   }
    // },
    hasViewed(recipeId) {
      console.log('Recipes passed to RecipePreviewList:', this.recipes);

      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      return viewedRecipes.includes(recipeId);
    },
    toggleFavorite(recipeId) {
      this.$emit('toggle-favorite', recipeId);
    }
  }
};
</script>

<style scoped>
.recipe-preview-list {
  margin: 20px 0;
}
</style>
