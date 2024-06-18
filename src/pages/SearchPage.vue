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
      <button @click="searchRecipes">Search</button>
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
      cuisines: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
      searchResults: []
    };
  },
  methods: {
    searchRecipes() {
      console.log('User is logged in:', this.$root.isLoggedIn); // הוספת לוג לבדיקת מצב ההתחברות
      const response = mockSearchRecipes(this.searchQuery, this.numberOfRecipes, this.selectedCuisine);
      this.searchResults = response.data.recipes;
      if (this.$root.isLoggedIn) {
        console.log('Saving last search');
        this.saveLastSearch();
      }
    },
    showRecipeDetails(recipeId) {
      if (this.$route.params.id !== recipeId) { // לוודא שאנו לא מנווטים לדף הנוכחי שוב
        this.$router.push({ name: 'recipe', params: { id: recipeId } });
      }
    },
    saveLastSearch() {
      if (this.$root.isLoggedIn) {
        localStorage.setItem('lastSearchQuery', this.searchQuery);
        localStorage.setItem('lastNumberOfRecipes', this.numberOfRecipes);
        localStorage.setItem('lastSelectedCuisine', this.selectedCuisine);
        console.log('Last search saved:', {
          searchQuery: this.searchQuery,
          numberOfRecipes: this.numberOfRecipes,
          selectedCuisine: this.selectedCuisine
        });
      }
    },
    loadLastSearch() {
      const lastSearchQuery = localStorage.getItem('lastSearchQuery');
      const lastNumberOfRecipes = localStorage.getItem('lastNumberOfRecipes');
      const lastSelectedCuisine = localStorage.getItem('lastSelectedCuisine');

      if (lastSearchQuery) {
        this.searchQuery = lastSearchQuery;
      }

      if (lastNumberOfRecipes) {
        this.numberOfRecipes = Number(lastNumberOfRecipes);
      }

      if (lastSelectedCuisine) {
        this.selectedCuisine = lastSelectedCuisine;
      }

      if (lastSearchQuery || lastNumberOfRecipes || lastSelectedCuisine) {
        console.log('Loading last search:', {
          lastSearchQuery,
          lastNumberOfRecipes,
          lastSelectedCuisine
        });
        this.searchRecipes();
      }
    }
  },
  created() {
    console.log('Created: User is logged in:', this.$root.isLoggedIn); // לוג נוסף לבדיקת מצב ההתחברות בעת יצירת הרכיב
    if (this.$root.isLoggedIn) {
      console.log('User is logged in, loading last search');
      this.loadLastSearch();
    } else {
      console.log('User is not logged in, not loading last search');
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

.search-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.search-controls input {
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
      <button @click="searchRecipes">Search</button>
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
      cuisines: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
      searchResults: []
    };
  },
  methods: {
    searchRecipes() {
      console.log('User is logged in:', this.$root.isLoggedIn); // הוספת לוג לבדיקת מצב ההתחברות
      const response = mockSearchRecipes(this.searchQuery, this.numberOfRecipes, this.selectedCuisine);
      this.searchResults = response.data.recipes;
      if (this.$root.isLoggedIn) {
        console.log('Saving last search');
        this.saveLastSearch();
      }
    },
    showRecipeDetails(recipeId) {
      if (this.$route.params.id !== recipeId) { // לוודא שאנו לא מנווטים לדף הנוכחי שוב
        this.$router.push({ name: 'recipe', params: { id: recipeId } });
      }
    },
    saveLastSearch() {
      if (this.$root.isLoggedIn) {
        localStorage.setItem('lastSearchQuery', this.searchQuery);
        localStorage.setItem('lastNumberOfRecipes', this.numberOfRecipes);
        localStorage.setItem('lastSelectedCuisine', this.selectedCuisine);
        console.log('Last search saved:', {
          searchQuery: this.searchQuery,
          numberOfRecipes: this.numberOfRecipes,
          selectedCuisine: this.selectedCuisine
        });
      }
    },
    loadLastSearch() {
      const lastSearchQuery = localStorage.getItem('lastSearchQuery');
      const lastNumberOfRecipes = localStorage.getItem('lastNumberOfRecipes');
      const lastSelectedCuisine = localStorage.getItem('lastSelectedCuisine');

      if (lastSearchQuery) {
        this.searchQuery = lastSearchQuery;
      }

      if (lastNumberOfRecipes) {
        this.numberOfRecipes = Number(lastNumberOfRecipes);
      }

      if (lastSelectedCuisine) {
        this.selectedCuisine = lastSelectedCuisine;
      }

      if (lastSearchQuery || lastNumberOfRecipes || lastSelectedCuisine) {
        console.log('Loading last search:', {
          lastSearchQuery,
          lastNumberOfRecipes,
          lastSelectedCuisine
        });
        this.searchRecipes();
      }
    }
  },
  created() {
    console.log('Created: User is logged in:', this.$root.isLoggedIn); // לוג נוסף לבדיקת מצב ההתחברות בעת יצירת הרכיב
    if (this.$root.isLoggedIn) {
      console.log('User is logged in, loading last search');
      this.loadLastSearch();
    } else {
      console.log('User is not logged in, not loading last search');
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

.search-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.search-controls input {
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
