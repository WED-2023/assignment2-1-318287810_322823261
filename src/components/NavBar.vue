<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">My App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Main Page</b-nav-item>
        <b-nav-item to="/search">Search Page</b-nav-item>
        <b-nav-item to="/about">About Page</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <template v-if="!isLoggedIn">
          <b-navbar-text>Hello Guest</b-navbar-text>
          <b-nav-item to="/login">Log In</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
        </template>
        <template v-else>
          <b-navbar-text>Hello, {{ username }}</b-navbar-text>
          <b-nav-item-dropdown text="Personal Area" right>
            <b-dropdown-item to="/favorites">My favorite recipes</b-dropdown-item>
            <b-dropdown-item to="/my-recipes">My recipes</b-dropdown-item>
            <b-dropdown-item to="/family-recipes">My family recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item @click="logout">Disconnect</b-nav-item>
          <b-nav-item to="/create-recipe">Create Recipe</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Initialize with false, assuming user is not logged in initially
      username: '', // Initialize with an empty string
    };
  },
  methods: {
    logout() {
      // Add your logout logic here
      // For example, clear authentication tokens or session information
      // Then set isLoggedIn to false and redirect to login page
      this.isLoggedIn = false;
      this.username = '';
      // Redirect to login page
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Navbar styling */
.navbar {
  background-color: #343a40; /* Dark background color */
}

/* Navbar brand (logo) styling */
.navbar-brand {
  color: #fff; /* White color for brand */
}

/* Navbar links styling */
.navbar-nav .nav-item .nav-link {
  color: #fff; /* White color for links */
}

/* Active link styling */
.navbar-nav .nav-item.active .nav-link {
  color: #fff; /* White color for active link */
  background-color: #007bff; /* Blue background color for active link */
}

/* Dropdown menu styling */
.dropdown-menu {
  background-color: #343a40; /* Dark background color for dropdown menu */
}

/* Dropdown item styling */
.dropdown-menu .dropdown-item {
  color: #fff; /* White color for dropdown items */
}

/* Logout button styling */
.logout-button {
  color: #fff; /* White color for logout button */
}

/* Responsive styling for small screens */
@media (max-width: 575.98px) {
  .navbar-expand-sm .navbar-nav .nav-link {
    padding-right: 0.5rem; /* Adjust padding for small screens */
    padding-left: 0.5rem; /* Adjust padding for small screens */
  }
}

/* Custom CSS rules */
/* Add any additional custom CSS rules here */
</style>

