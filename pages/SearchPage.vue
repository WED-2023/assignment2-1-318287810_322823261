<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div class="search-controls">
      <input 
        v-model="searchQuery" 
        @input="searchRecipes" 
        type="text" 
        placeholder="Search for recipes..."
      />
      <div>
        <label for="numberOfRecipes">Number of recipes:</label>
        <select v-model="numberOfRecipes" @change="searchRecipes">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div>
        <label for="selectedCuisine">Cuisine:</label>
        <select v-model="selectedCuisine" @change="searchRecipes">
          <option value="">No Filter</option>
          <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
        </select>
      </div>
    </div>
    <div class="search-results">
      <div v-if="searchResults.length === 0">No results found</div>
      <div v-else>
        <div v-for="recipe in searchResults" :key="recipe.id" class="recipe-item">
          <img :src="recipe.image" :alt="recipe.title" @click="showRecipeDetails(recipe.id)" />
          <div class="recipe-info">
            <h3>{{ recipe.title }}</h3>
            <p>Ready in {{ recipe.readyInMinutes }} minutes</p>
            <p>Likes: {{ recipe.aggregateLikes }}</p>
            <button @click="showRecipeDetails(recipe.id)">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockSearchRecipes } from "../services/recipes.js";

export default {
  data() {
    return {
      searchQuery: '',
      numberOfRecipes: 5,
      selectedCuisine: '',
      cuisines: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American'], // Mocked list of cuisines
      searchResults: []
    };
  },
  methods: {
    searchRecipes() {
      const response = mockSearchRecipes(this.searchQuery, this.numberOfRecipes, this.selectedCuisine);
      this.searchResults = response.data.recipes;
    },
    showRecipeDetails(recipeId) {
      this.$router.push({ name: 'recipe', params: { id: recipeId } });
    }
  },
  watch: {
    searchQuery: 'searchRecipes',
    numberOfRecipes: 'searchRecipes',
    selectedCuisine: 'searchRecipes'
  },
  created() {
    const lastSearchQuery = localStorage.getItem('lastSearchQuery');
    if (lastSearchQuery) {
      this.searchQuery = lastSearchQuery;
      this.searchRecipes();
    }
  },
  beforeDestroy() {
    localStorage.setItem('lastSearchQuery', this.searchQuery);
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-controls input {
  flex: 1;
  margin-right: 10px;
  padding: 5px;
}

.search-controls div {
  display: flex;
  flex-direction: column;
}

.search-controls select {
  padding: 5px;
}

.search-results {
  display: flex;
  flex-direction: column;
}

.recipe-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.recipe-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
}

.recipe-info {
  margin-left: 10px;
}
</style>
