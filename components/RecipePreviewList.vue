<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
    <router-link v-if="showButton" :to="{ name: 'randomRecipes' }" tag="button">Show More Random Recipes</router-link>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      showButton: false
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const amountToFetch = 5; // Set this to how many recipes you want to fetch
        const response = mockGetRecipesPreview(amountToFetch);

        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes);

        // Check if there are more recipes available to show
        this.showButton = true; // Assuming there are always more random recipes to show for now
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
