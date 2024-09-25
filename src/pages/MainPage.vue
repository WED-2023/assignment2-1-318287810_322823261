<template>
  <div class="container main-page">
    <h1 class="title">Main Page</h1>
    
    <!-- Left Column - Random Recipes -->
    <div class="left-column">
      <RecipePreviewList :recipes="randomRecipesR.recipes" title="Explore this recipes" class="RandomRecipes center" />

      <b-button @click="fetchRandomRecipes" variant="info">Load New Random Recipes</b-button>
      <div v-if="isLoadingRecipes">
        <p>Loading random recipes...</p>
      </div>
      <!-- <div v-else>
        <p>No recipes available.</p>
      </div> -->
    </div>
    
    <!-- Right Column - Last Viewed Recipes or Login for Unregistered Users -->
    <div class="right-column">
      <h2 v-if="$root.store.username"></h2>
        <RecipePreviewList v-if="$root.store.username" 
          :recipes="randomRecipesL.recipes" class="RandomRecipes center" />

      <!-- <RecipePreviewList
        v-if="$root.store.username"
        :recipeIds="randomRecipes.recipes"
        :class="{ RandomRecipes: true, center: true }"
      ></RecipePreviewList> -->

      
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
    <b-button v-if="store.username" @click="showModal" variant="dark">Create Recipe</b-button>
    <CreateRecipeModal ref="createRecipeModal" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import CreateRecipeModal from "@/pages/CreateRecipeModal.vue";
//import { mockLogin, login } from "../services/auth.js";
import { getRecipesPreview, getFavoriteRecipes, getRandomRecipes } from "../services/recipes"; // Update imports

import { login } from "../services/auth.js";

export default {
  components: {
    RecipePreviewList,
    CreateRecipeModal,
  },
  data() {
    return {
      recipes: [],
      randomRecipesL: {
        recipes: []
      },
      randomRecipesR: {
        recipes: []
      },
      viewedRecipes: {
        recipes: []
      },
      viewedRecipeIds: [],
      loginData: {
        username: '',
        password: ''
      },
      form: {
        submitError: undefined
      },
      isLoadingRecipes: false
    };
  },


  async created() {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      console.log("Logged In User from localStorage:", loggedInUser);

      this.$root.$on("user-logged-in", (username) => {
        console.log("User logged in via event:", username);
        this.store.username = username; // Update the store with the username
      });
      this.$root.$on("logged-out", this.clearForm);
      await this.fetchRandomRecipes();
      // await this.loadLastViewedRecipes();
      if (loggedInUser) {
        this.store.username = loggedInUser;
      } else {
        console.log("No logged in user, staying on the main page.");
      }
    } catch (error) {
      console.error("Error during component creation:", error);
    }
  },

  computed: {
    isLoggedIn() {
      // בדיקה אם המשתמש מחובר מתוך ה-Vuex store
      return localStorage.getItem('loggedInUser') != null;
    }
  },

  methods: {
    showModal() {
      if (this.$refs.createRecipeModal && this.$refs.createRecipeModal.show) {
        this.$refs.createRecipeModal.show();
      } else {
        console.error('Modal ref not found or show method not defined');
      }
    },

    async fetchRandomRecipes() {
      this.isLoadingRecipes = true; // Show loading
      try {
        // Left side =>
        const responseForLeft = await getRandomRecipes();
        console.log('Random recipes fetched from MainPage: (LeftSide)', responseForLeft.data.recipes);
        this.randomRecipesL = responseForLeft.data.recipes;

        // Right side =>
        const responseForRight = await getRandomRecipes();
        console.log('Random recipes fetched from MainPage: (RightSide)', responseForRight.data.recipes);
        this.randomRecipesR = responseForRight.data.recipes;

      } catch (error) {
        console.error('Error fetching random recipes:', error);
        this.form.submitError = "Failed to load random recipes. Please try again.";
      } finally {
        this.isLoadingRecipes = false; // Hide loading
      }
    },

    clearForm() {
      this.loginData.username = ''; // איפוס השדות לאחר ההתנתקות
      this.loginData.password = '';
    },


    async loadLastViewedRecipes() {
      try {
        const viewedRecipeIds = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
        console.log("lastViewedRecipes from MainPage:", viewedRecipeIds);
        this.viewedRecipeIds = viewedRecipeIds;
        console.log("this.lastViewedRecipes from MainPage:", this.viewedRecipeIds);
        if (viewedRecipeIds.length > 0) {
          // קריאה ל-API כדי לקבל את הפרטים המלאים של המתכונים
          const recipes = await getRecipesPreview(viewedRecipeIds); 
          console.log('viewedRecipes:', recipes);
          
          // שמירת המתכונים המלאים במשתנה
          this.viewedRecipes = recipes;
        } else {
          this.viewedRecipes = []; // במקרה שאין מתכונים נצפים
        }
      } catch (error) {
          console.error('Error loading last viewed recipes:', error);
      }
    },

    async login() {
      try {
        const loginData = {
          username: this.loginData.username,
          password: this.loginData.password
        };
        console.log("Sending login request with data:", this.loginData);
        const response = await login(loginData);
        console.log("Response from server:", response);

        if (response && response.success) {
          localStorage.setItem('loggedInUser', this.loginData.username);
          this.store.login(this.loginData.username); // שמירת המשתמש ב־shared_data
          this.$root.$emit("user-logged-in", this.loginData.username);
          if (this.$route.path !== "/") { // בדיקה אם כבר נמצא בדף הבית
            this.$router.push("/"); // העברה לדף הבית
          }
        } else {
          this.form.submitError = response.message || "Login failed. Please try again.";
        }
      } catch (error) {
        console.log("Login error:", error);
        this.form.submitError = error.message || "An error occurred during login.";
      }
    },
    logout() {
    this.$root.store.logout();
    this.loginData.username = '';
    this.loginData.password = ''; 
    this.form.submitError = undefined;
    this.$router.push("/login");
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
