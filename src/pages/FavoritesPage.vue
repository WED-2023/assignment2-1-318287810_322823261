<template>
  <div class="container">
    <h1>My Favorites</h1>
    <div v-if="favoriteRecipes.length > 0">
      <div v-for="recipe in favoriteRecipes" :key="recipe.id" class="recipe-container">
        <RecipePreview :recipe="recipe" />
      </div>
    </div>
    <div v-else>
      <p>You have no favorite recipes.</p>
    </div>
  </div>
</template>

<script>
import RecipePreview from '@/components/RecipePreview.vue';
import { getFavoriteRecipes } from '@/services/recipes.js';

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      favoriteRecipes: []
    };
  },
  mounted() {
    this.loadFavoriteRecipes();
  },
  methods: {
    loadFavoriteRecipes() {
      this.favoriteRecipes = getFavoriteRecipes();
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.recipe-container {
  margin-bottom: 20px;
}
</style>
