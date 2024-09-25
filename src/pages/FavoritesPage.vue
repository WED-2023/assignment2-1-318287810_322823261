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
import { getFavoriteRecipes } from '@/services/user.js';

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
    async loadFavoriteRecipes() {
      try {
        const response = await getFavoriteRecipes();
        console.log("response from getFavoriteRecipes: (FavoritesPage)", response);
        this.favoriteRecipes = response;
      } catch (err) {
        console.error("Failed to load favorite recipes:", err);
      }
    },
    async removeFromFavorites(recipe) {
      try {
        await removeFavorite(recipe.id);
        this.favoriteRecipes = this.favoriteRecipes.filter(r => r.id !== recipe.id);
      } catch (err) {
        console.error("Failed to remove favorite recipe:", err);
      }
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
