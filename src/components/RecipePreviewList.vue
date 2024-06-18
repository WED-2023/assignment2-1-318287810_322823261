<template>
  <div class="recipe-preview-list">
    <h2>{{ title }}</h2>
    <div v-if="recipes.length">
      <RecipePreview v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
    <p v-else>No recipes found.</p>
  </div>
</template>

<script>
import RecipePreview from './RecipePreview.vue';
import { mockGetRecipesPreview, mockGetRecipeFullDetails } from "../services/recipes.js";

export default {
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipeIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  async mounted() {
    if (this.recipeIds.length) {
      for (let recipeId of this.recipeIds) {
        const response = mockGetRecipeFullDetails(recipeId);
        if (response.data && response.data.recipe) {
          this.recipes.push(response.data.recipe);
        }
      }
    } else {
      const response = await mockGetRecipesPreview(3);
      if (response.data && response.data.recipes) {
        this.recipes = response.data.recipes;
      }
    }
  }
};
</script>

<style scoped>
.recipe-preview-list {
  margin: 20px 0;
}
</style>
