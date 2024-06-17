<template>
  <div id="app">
    <div id="nav" ref="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      {{ !$root.store.username }}
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
        <router-link :to="{ name: 'AboutPage' }">AboutPage</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
    </div>
    <main ref="main">
    <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // Set the top margin of the main content dynamically based on the nav bar height
    this.$refs.main.style.marginTop = `${this.$refs.nav.offsetHeight}px`;
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
