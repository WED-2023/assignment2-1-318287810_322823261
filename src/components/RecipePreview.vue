<template>
  <router-link
    :to="{ name: 'recipe', params: { id: recipe.id } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="require('@/assets/pasta.jpg')" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li><font-awesome-icon icon="clock" />{{ recipe.readyInMinutes }} minutes</li>
        <li><font-awesome-icon icon="thumbs-up" />{{ recipe.aggregateLikes }} </li>
        <li v-if="recipe.vegan === true">
          <font-awesome-icon icon="leaf" /> vegan
        </li>
        <li v-else-if="recipe.vegetarian === true">
          <font-awesome-icon icon="carrot"/> vegetarian
        </li>
        <li v-if="recipe.glutenFree === true">
          <font-awesome-icon icon="bread-slice"/>glutenFree
        </li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
    console.log(this.recipe);
    console.log("Recipe data: ", this.recipe);
    console.log("Vegan: ", this.recipe.vegan);
    console.log("Vegetarian: ", this.recipe.vegetarian);
    console.log("Gluten Free: ", this.recipe.glutenFree);
  },
  data() {
    return {
      image_load: true
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  color: inherit;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 60%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recipe-preview .recipe-body:hover .recipe-image {
  transform: scale(1.2);
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: inherit;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>