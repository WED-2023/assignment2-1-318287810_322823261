<template>
  <div class="container main-page">
    <h1 class="title">Main Page</h1>
    
    <!-- Left Column - Random Recipes -->
    <div class="left-column">
      <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
      <b-button @click="fetchRandomRecipes" variant="info">Load New Random Recipes</b-button>
    </div>
    
    <!-- Right Column - Last Viewed Recipes or Login for Unregistered Users -->
    <div class="right-column">
      <h2 v-if="$root.store.username">Last Viewed Recipes</h2>
      <RecipePreviewList
        v-if="$root.store.username"
        :recipeIds="viewedRecipeIds"
        :class="{ RandomRecipes: true, blur: !$root.store.username, center: true }"
      ></RecipePreviewList>
      
      <!-- Login Section for Unregistered Users -->
      <div v-else>
        <h2>Login to View More</h2>
        <form @submit.prevent="login">
          <b-form-group
            id="input-group-username"
            label="Username:"
            label-for="username"
            label-cols-sm="3"
          >
            <b-form-input
              id="username"
              v-model="loginData.username"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group
            id="input-group-password"
            label="Password:"
            label-for="password"
            label-cols-sm="3"
          >
            <b-form-input
              id="password"
              v-model="loginData.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-button type="submit" variant="primary">Login</b-button>
        </form>
        <div class="mt-2">
          Do not have an account yet?
          <router-link to="register">Register here</router-link>
        </div>
        <b-alert
          class="mt-2"
          v-if="form.submitError"
          variant="warning"
          dismissible
          show
        >
          Login failed: {{ form.submitError }}
        </b-alert>
      </div>
    </div>
    
    <!-- Create Recipe Modal Trigger -->
    <b-button @click="showModal" variant="dark">Create Recipe</b-button>
    <CreateRecipeModal ref="createRecipeModal" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import CreateRecipeModal from "@/pages/CreateRecipeModal.vue";
import { mockLogin } from "../services/auth.js";

export default {
  components: {
    RecipePreviewList,
    CreateRecipeModal,
  },
  data() {
    return {
      viewedRecipeIds: [],
      loginData: {
        username: '',
        password: ''
      },
      form: {
        submitError: undefined
      }
    };
  },
  created() {
    const viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
    this.viewedRecipeIds = viewedRecipes;
  },
  methods: {
    showModal() {
      if (this.$refs.createRecipeModal && this.$refs.createRecipeModal.show) {
        this.$refs.createRecipeModal.show();
      } else {
        console.error('Modal ref not found or show method not defined');
      }
    },
    fetchRandomRecipes() {
      // Implement logic to fetch new random recipes
      console.log('Fetching new random recipes...');
    },
    async login() {
      try {
        const response = await mockLogin(this.loginData);
        if (response.status === 200) {
          this.$root.store.username = response.data.username; // Assuming response has username
          localStorage.setItem('loggedInUser', response.data.username);
          this.$router.push('/');
        } else {
          this.form.submitError = response.data.message;
        }
      } catch (error) {
        this.form.submitError = error.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #dbd4db; /* צבע רקע לסגול בהיר */
  padding: 20px;
  // border-radius: 10px; /* מסגרת עגולה */
}

.main-page {
  padding: 20px;
  border: 2px solid #fcfbfc; /* צבע המסגרת לסגול בהיר */
}

.title {
  font-size: 2em;
  color: #744a74; /* צבע הכותרת לסגול */
}

.left-column, .right-column {
  width: 45%;
}

.left-column {
  margin-right: 20px;
}

.RandomRecipes {
  margin-bottom: 20px;
}

.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}

.center {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}

form label {
  margin-bottom: 5px;
}

form input[type="text"],
form input[type="password"],
form button {
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}
</style>
