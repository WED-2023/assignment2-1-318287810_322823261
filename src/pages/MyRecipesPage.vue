<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>

    <div v-if="myRecipes.length > 0">
      <div v-for="recipe in myRecipes" :key="recipe.title" class="recipe-card">
        <h2>{{ recipe.title }}</h2>
        <p><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</p>
        <p><strong>Servings:</strong> {{ recipe.servings }}</p>
        <p><strong>Vegan:</strong> {{ recipe.vegan ? 'Yes' : 'No' }}</p>
        <p><strong>Gluten-Free:</strong> {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>

        <div class="ingredients">
          <h4>Ingredients:</h4>
          <ul>
            <li v-for="ingredient in formatToArray(recipe.ingredients)" :key="ingredient">{{ ingredient }}</li>
          </ul>
        </div>

        <div class="instructions">
          <h4>Preparation:</h4>
          <ol>
            <li v-for="(step, index) in formatToArray(recipe.instructions)" :key="index">{{ step }}</li>
          </ol>
        </div>

        <div class="photos">
          <h4>Photo:</h4>
          <img :src="recipe.image" :alt="'Photo of ' + recipe.title" class="recipe-photo" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>No recipes found.</p>
    </div>
  </div>
</template>

<script>
import RecipePreview from "@/components/RecipePreview.vue";
//import { mockGetUserRecipes } from "@/services/recipes.js";
import { getUserRecipes } from '@/services/user.js';

export default {
  name: "MyRecipesPage",

  data() {
    return {
      myRecipes: []
    };
  },
  created() {
    this.fetchMyRecipes();
  },
  methods: {
    async fetchMyRecipes() {
      try{
        const response = await getUserRecipes();
        console.log("response from getUserRecipes: (MyRecipesPage)", response);
        this.myRecipes = response;
      } catch(err) {
        console.error("Failed to load My recipes:", err);
      }
    },
    formatToArray(data) {
      return typeof data === 'string' ? data.split(',') : data;
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

.title {
  text-align: center;
  margin-bottom: 20px;
}

.recipe-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.recipe-card h2 {
  margin-top: 0;
}

.recipe-card p {
  margin-bottom: 10px;
}

.ingredients, .instructions, .photos {
  margin-bottom: 20px;
}

.recipe-photo {
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
}
</style>
