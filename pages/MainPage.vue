<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <!-- Left Column - Random Recipes -->
    <div class="left-column">
      <h2>Random Recipes</h2>
      <RecipePreviewList
        title="Random Recipes"
        :class="{ RandomRecipes: true, blur: !$root.store.username }"
      ></RecipePreviewList>
      <button v-if="!$root.store.username" @click="redirectToLogin">
        You need to Login to view this
      </button>
    </div>

    <!-- Right Column - Last Viewed Recipes / Login/Register -->
    <div class="right-column">
      <h2 v-if="$root.store.username">Last Viewed Recipes</h2>
      <h2 v-else>Login or Register</h2>
      <RecipePreviewList
        title="Last Viewed Recipes"
        :class="{ RandomRecipes: true, blur: !$root.store.username }"
        :disabled="!$root.store.username"
      ></RecipePreviewList>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList,
  },
  methods: {
    redirectToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.left-column {
  width: 50%;
}

.right-column {
  width: 45%;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

.left-column button {
  margin-top: 10px;
}
</style>
