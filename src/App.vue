<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" class="custom-navbar">
      <b-navbar-brand :to="{ name: 'main' }" class="navbar-brand-custom">
        <img src="@/assets/logo3.png" alt="Logo" class="logo" />
        <span class="brand-text">Vue Recipes</span>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'main' }">Home</b-nav-item>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name:'about' }" tag="router-link">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!$root.store.username" disabled>Hello, Guest</b-nav-item>
          <b-nav-item v-if="!$root.store.username" :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item v-if="!$root.store.username" :to="{ name: 'register' }">Register</b-nav-item>
          
          <b-nav-item-dropdown v-if="$root.store.username" right>
            <template #button-content>{{ $root.store.username }}</template>
            <b-dropdown-item :to="{ name: 'favorites' }">My Favorite Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'my-recipes' }">My Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'family-recipes' }">Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-button v-if="$root.store.username" @click="logout" variant="outline-light">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <main ref="main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('lastSearchQuery'); // מחיקת החיפוש האחרון רק בעת ההתנתקות
      this.$root.$emit('logged-out');
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 10px 30px;
  position: fixed; /* Position the nav bar fixed */
  top: 0; /* Align it to the top of the page */
  width: 100%; /* Make it span the full width */
  background-color: #fff; /* Background color */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Optional shadow for better visibility */
  z-index: 1000; /* Make sure it is on top of other content */
}

.custom-navbar {
  background-color: rgba(154, 95, 154, 0.79) !important; 
  font-size: x-large;
}

#nav a {
  font-weight: bold;
  color: #452c50;
}

#nav a.router-link-exact-active {
  color: #bca3eb;
}

main {
  padding-top: 60px; /* Allow space for the fixed navbar */
}

.logo {
  height: 80px;
  margin-right: 10px;
}

.navbar-brand-custom .brand-text {
  font-size: 2rem; /* Adjust the font size as needed */
}
</style>
