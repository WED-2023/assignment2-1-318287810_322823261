<template>
  <div id="app">
    <div id="nav">
      <!-- Links for everyone -->
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|

      <!-- Links for offline users -->
      <span v-if="!$root.store.username">
        Hello Guest |
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>

      <!-- Links for logged-in users -->
      <span v-else>
        {{ $root.store.username }} |
        <b-dropdown id="dropdown-1" text="Personal Area" variant="link" no-caret>
<<<<<<< HEAD
          <b-dropdown-item :to="{ name: 'favorites' }">My favorite recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'my-recipes' }">My recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'family-recipes' }">My family recipes</b-dropdown-item>
        </b-dropdown>|
        <router-link :to="{ name: 'create-recipe' }">New Recipe</router-link>|
        <button @click="Logout" class="logout-btn">Logout</button>|
=======
        <b-dropdown-item :to="{ name: 'favorites' }">My favorite recipes</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'my-recipes' }">My recipes</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'family-recipes' }">My family recipes</b-dropdown-item>
        </b-dropdown>|
        <router-link :to="{ name: 'create-recipe' }">New Recipe</router-link>|
        <button @click="Logout">Logout</button>|
>>>>>>> 666adae821f8f65fa65df85945146e188ea38efb
      </span>
      
      <!-- Link to view random recipes -->
      <router-link v-if="$root.store.username" :to="{ name: 'randomRecipes' }">View Random Recipes</router-link>
    </div>
    <router-view />
  </div>
</template>


<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue';

export default {
  name: "App",
  components: {
    BDropdown,
    BDropdownItem,
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 1rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
<<<<<<< HEAD

=======
>>>>>>> 666adae821f8f65fa65df85945146e188ea38efb
.logout-btn {
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  font-weight: bold;
  padding: 0;
}

.logout-btn:hover {
  color: #42b983;
}
</style>


