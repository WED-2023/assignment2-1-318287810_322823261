<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="mb-3">
          <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
          <div>Likes: {{ recipe.aggregateLikes }} likes</div>
          <div>Servings: {{ recipe.servings }}</div>
          <div v-if="recipe.vegan">Vegan</div>
          <div v-if="recipe.vegetarian">Vegetarian</div>
          <div v-if="recipe.glutenFree">Gluten Free</div>
        </div>
        <div class="wrapper">
          <div class="wrapped">
            Ingredients:
            <ul>
              <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index + '_' + ingredient.id">
                {{ ingredient.original }}
              </li>
            </ul>
          </div>
          <div v-if="recipeInstructions.length > 0" class="wrapped">
            Instructions:
            <ol>
              <li v-for="(step, index) in recipeInstructions" :key="index">
                {{ step.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Recipe not found.</p>
      <router-link to="/">Go back to home page</router-link>
    </div>
  </div>
</template>

<script>
//import { mockGetRecipeFullDetails } from "../services/recipes.js";
import { getRecipeFullDetails } from "../services/recipes.js";

export default {
  data() {
    return {
      recipe: null
    };
  },
  computed: {
    recipeInstructions() {
      return this.recipe?.analyzedInstructions?.[0]?.steps || [];
    }
  },
  async created() {
    try {
      const recipeId = parseInt(this.$route.params.id);
      console.log("this.$route.params.id in RecipeViewPage.vue: ", this.$route.params.id);
      console.log("Fetching details for recipe ID:", recipeId); // Debug log

      const response = await getRecipeFullDetails(recipeId);
      console.log("Fetched recipe details:", response);
      
      if (response) {
        this.recipe = response;
        console.log("Recipe data set:", this.recipe);
        this.saveRecipeToLastViewed(recipeId);


//      const response = await mockGetRecipeFullDetails(recipeId);
//      console.log("Fetched recipe details:", response); // Debug log
//      if (response.data && response.data.recipe) {
//        this.recipe = response.data.recipe;
//        console.log("Recipe data set:", this.recipe); // Debug log
//        // Update viewed status
//        localStorage.setItem(`viewed_${this.recipe.id}`, 'true');

      } else {
        this.recipe = null;
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      this.recipe = null;
    }
  },
  methods: {
    saveRecipeToLastViewed(recipeId) {
      const lastViewedRecipes = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
      
      // הסרת מתכון אם כבר קיים ברשימה
      const updatedRecipes = lastViewedRecipes.filter(id => id !== recipeId);
      
      // הוספת מתכון חדש לרשימה
      updatedRecipes.unshift(recipeId);

      // שמירת מקסימום 3 מתכונים
      if (updatedRecipes.length > 3) {
        updatedRecipes.pop();
      }

      // שמירת הרשימה המעודכנת ב-localStorage
      localStorage.setItem('lastViewedRecipes', JSON.stringify(updatedRecipes));
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
.recipe-header {
  text-align: center;
}
.recipe-header img {
  max-width: 100%;
  height: auto;
}
.recipe-body {
  margin-top: 20px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
.wrapped {
  flex: 1;
  margin-right: 10px;
}
.wrapped:last-child {
  width: 50%;
  margin-right: 0;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
