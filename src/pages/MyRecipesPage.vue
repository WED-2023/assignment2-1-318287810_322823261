<template>
  <div class="my-recipes-page">
    <h1>My Recipes</h1>
    <RecipePreviewList title="My Recipes" :recipeIds="myRecipeIds" class="center" />
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
.center {
  text-align: center;
}
</style>
