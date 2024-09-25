<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div class="search-controls">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search for recipes..."
      />
      <div>
        <label for="numberOfRecipes">Number of recipes:</label>
        <select v-model="numberOfRecipes">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div>
        <label for="selectedCuisine">Cuisine:</label>
        <select v-model="selectedCuisine">
          <option value="">No Filter</option>
          <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
        </select>
      </div>
      <div>
        <label for="selectedDiet">Diet:</label>
        <select v-model="selectedDiet">
          <option value="">No Filter</option>
          <option v-for="diet in diets" :key="diet" :value="diet">{{ diet }}</option>
        </select>
      </div>
      <div>
        <label for="selectedIntolerance">Intolerance:</label>
        <select v-model="selectedIntolerance">
          <option value="">No Filter</option>
          <option v-for="intolerance in intolerances" :key="intolerance" :value="intolerance">{{ intolerance }}</option>
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
            <p>Likes: {{ recipe.popularity }}</p>
            <button @click="viewDetails(recipe.id)">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockSearchRecipes } from "../services/recipes.js";
import cuisines from "../assets/mocks/cuisines.json";
import diets from "../assets/mocks/diets.json";
import intolerances from "../assets/mocks/intolerances.json";
import RecipePreviewList from '@/components/RecipePreviewList.vue';
import { searchRecipes, fetchRandomRecipesFromServer } from '../services/recipes';

export default {
  data() {
    return {
      searchQuery: this.$root.store.lastSearchQuery || '',
      numberOfRecipes: 5,
      selectedCuisine: '',
      selectedDiet: '',
      selectedIntolerance: '',
      cuisines,
      diets,
      intolerances,
      searchResults: []
    };
  },
  methods: {
    async searchRecipes() {
        try {
          const response = await searchRecipes(
            this.searchQuery,
            this.selectedCuisine,
            this.selectedDiet,
            this.selectedIntolerance,
            parseInt(this.numberOfRecipes)
          );
          console.log('Recipes found from SerchPage.vue:', response);

          this.searchResults = response;
          console.log("this.searchResults in searchPage.vue: ", this.searchResults);
        } catch (error) {
          console.error('Failed to search recipes:', error);
          alert('Failed to search recipes. Please try again.');
        }
      },
      viewDetails(recipeId) {
        this.$router.push({ name: 'recipe', params: { id: recipeId } });
      },
  },
  watch: {
    searchQuery: 'searchRecipes',
    numberOfRecipes: 'searchRecipes',
    selectedCuisine: 'searchRecipes',
    selectedDiet: 'searchRecipes',
    selectedIntolerance: 'searchRecipes',
    // sortBy: 'searchRecipes'
  },
  created() {
    if (this.$root.store.username && this.$root.store.lastSearchQuery) {
      this.searchQuery = this.$root.store.lastSearchQuery;
      this.searchRecipes();
    }
    // this.fetchRandomRecipes();
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
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-controls > div {
  margin-bottom: 10px;
}

.search-controls input, .search-controls select {
  padding: 5px;
  margin-right: 10px;
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
