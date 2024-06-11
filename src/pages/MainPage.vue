<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList title="Randome Recipes" :recipes="randomRecipes" class="RandomRecipes center" />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    {{ !$root.store.username }}
    <RecipePreviewList
      title="Last Viewed Recipes"
      :recipes="lastViewedRecipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      randomRecipes: [
        {
          id: 1,
          image: require('@/assets/pasta.jpg'),
          title: 'מתכון לדוגמה 1',
          readyInMinutes: 30,
          aggregateLikes: 100,
          isVegan: true,
          isVegetarian: true,
          isGlutenFree: false,
          isFavorite: false,
          isViewed: false
        },
        {
          id: 2,
          image: require('@/assets/pasta.jpg'), 
          title: 'מתכון לדוגמה 2',
          readyInMinutes: 45,
          aggregateLikes: 150,
          isVegan: false,
          isVegetarian: true,
          isGlutenFree: true,
          isFavorite: true,
          isViewed: true
        }
      ],
      lastViewedRecipes: [
        {
          id: 3,
          image: require('@/assets/pasta.jpg'), 
          title: 'מתכון לדוגמה 3',
          readyInMinutes: 25,
          aggregateLikes: 200,
          isVegan: false,
          isVegetarian: true,
          isGlutenFree: false,
          isFavorite: true,
          isViewed: true
        },
        {
          id: 4,
          image: require('@/assets/pasta.jpg'),
          title: 'מתכון לדוגמה 4',
          readyInMinutes: 35,
          aggregateLikes: 250,
          isVegan: true,
          isVegetarian: true,
          isGlutenFree: true,
          isFavorite: false,
          isViewed: false
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
