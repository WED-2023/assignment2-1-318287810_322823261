<template>
  <div class="recipe-preview">
    <router-link :to="{ name: 'recipe', params: { id: recipe.id } }" class="recipe-link" @click.native="markAsViewed">
      <div class="recipe-body">
        <img v-if="image_load" :src="recipe.image" class="recipe-image" />
      </div>
      <div class="recipe-footer">
        <div :class="{ 'recipe-title': true, 'viewed': hasViewed }" :title="recipe.title">{{ recipe.title }}</div>
        <ul class="recipe-overview">
          <li><font-awesome-icon icon="clock" /> {{ recipe.readyInMinutes }} mins</li>
          <li><font-awesome-icon icon="thumbs-up" /> {{ recipe.aggregateLikes }}</li>
          <li v-if="recipe.vegan"><font-awesome-icon icon="leaf" /> vegan</li>
          <li v-else-if="recipe.vegetarian"><font-awesome-icon icon="carrot" /> vegetarian</li>
          <li v-if="recipe.glutenFree"><font-awesome-icon icon="bread-slice" /> glutenFree</li>
        </ul>
      </div>
    </router-link>
    <div class="actions">
      <button @click="toggleFavorite" :class="{ 'favorite': isFavorite, 'not-favorite': !isFavorite }">
        <font-awesome-icon :icon="[isFavorite ? 'fas' : 'far', 'heart']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlayVisible: false,
      isFavorite: false,
      hasViewed: false,
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const img = new Image();
    img.src = this.recipe.image;
    img.onload = () => {
      this.image_load = true;
    };
    img.onerror = () => {
      console.error("Failed to load image:", this.recipe.image);
    };

    // בדיקה אם המשתמש כבר צפה במתכון
    this.hasViewed = localStorage.getItem(`viewed_${this.recipe.id}`) === 'true';

    // בדיקה אם המתכון במועדפים
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    this.isFavorite = favoriteRecipes.includes(this.recipe.id);
  },
  methods: {
    toggleFavorite() {
      let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (this.isFavorite) {
        favoriteRecipes = favoriteRecipes.filter(id => id !== this.recipe.id);
      } else {
        favoriteRecipes.push(this.recipe.id);
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      this.isFavorite = !this.isFavorite;
    },
    markAsViewed() {
      localStorage.setItem(`viewed_${this.recipe.id}`, 'true');
      this.hasViewed = true;

      // הוספה לרשימת מתכונים שנצפו לאחרונה
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      if (!viewedRecipes.includes(this.recipe.id)) {
        viewedRecipes.push(this.recipe.id);
        localStorage.setItem('viewedRecipes', JSON.stringify(viewedRecipes));
      }
    }
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
  background-color: #ffffff; /* צבע רקע לבן */
  border: 1px solid #ccc; /* מסגרת בצבע אפור בהיר */
  /* border-radius: 5px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* הוספת צל */
}
.recipe-link {
  text-decoration: none;
  color: inherit;
}
.recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}
.recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 60%;
  height: auto;
  background-size: cover;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.recipe-body:hover .recipe-image {
  transform: scale(1.2);
}
.recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
}
.recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
  list-style-type: none; /* הסרת הנקודות */
}
.recipe-footer ul.recipe-overview li {
  flex: 1;
  text-align: center;
  font-size: 20px; /* הגדלת גודל הסמלים */
}
.actions {
  padding: 10px;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 10px;
}
button.favorite, button.not-favorite {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 32px; /* הגדלת גודל הסמל */
  padding: 0;
  color: inherit;
}
.not-favorite {
  color: red;
  border: 2px solid red; /* מסגרת אדומה ללב לא לחוץ */
  border-radius: 50%;
  padding: 5px;
}
.favorite {
  color: red;
}
.viewed {
  color: blue;
  font-style: italic;
}
</style>
