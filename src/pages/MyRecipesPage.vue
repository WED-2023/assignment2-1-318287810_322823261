<template>
  <div class="my-recipes-page container">
    <div class="recipes-container">
      <RecipePreviewList title="My Recipes" :recipeIds="myRecipeIds" class="center" />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "@/components/RecipePreviewList";
import { mockGetUserRecipes } from "@/services/recipes.js"; // Assuming you have a service function to fetch user's recipes

export default {
  name: "MyRecipesPage",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      myRecipeIds: []
    };
  },
  created() {
    this.fetchMyRecipes();
  },
  methods: {
    fetchMyRecipes() {
      const userRecipes = mockGetUserRecipes(); // Replace with actual logic to fetch user's recipes
      this.myRecipeIds = userRecipes.data.recipes.map(recipe => recipe.id);
    }
  }
};
</script>

<style scoped>
.my-recipes-page {
  padding: 20px;
}

.title {
  font-size: 2em;
  color: #9a5f9a; /* צבע הכותרת לסגול */
  text-align: center;
}

.recipes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.recipe-preview-list {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
