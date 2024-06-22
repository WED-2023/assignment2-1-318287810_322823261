<template>
  <div class="about-page container">
    <img src="@/assets/about.webp" alt="Logo" class="about-logo" />
    <h1>About Us</h1>
    <p>Welcome to our recipe website! We are dedicated to providing a comprehensive platform for food enthusiasts to explore, share, and enjoy a wide variety of recipes. Our team of passionate developers has worked tirelessly to create a user-friendly and engaging experience for all our users.</p>
    
    <h2>Our Team</h2>
    <div class="team-member">
      <h3>Shilat Alon</h3>
      <p>Student Developer</p>
      <p>I am a third-year student in Information Systems Engineering at Ben-Gurion University. As part of the course "Internet Development Environments", we are creating a recipe website.</p>
    </div>
    <div class="team-member">
      <h3>John Doe</h3>
      <p>Project Manager</p>
      <p>John leads the team with a strong vision and exceptional project management skills, ensuring that all milestones are met on time.</p>
    </div>
    
    <h2>Previous Exercises</h2>
    <ul>
      <li><router-link :to="{ name: 'exercise1' }">Exercise 1</router-link></li>
      <li><router-link :to="{ name: 'exercise2' }">Exercise 2</router-link></li>
      <li><router-link :to="{ name: 'exercise3' }">Exercise 3</router-link></li>
      <!-- Add more exercises as needed -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
};
</script>

<style scoped>
.about-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.about-logo {
  display: block;
  margin: 0 auto 20px;
  max-width: 40%;
  height: auto;
}

h1 {
  font-size: 4em;
  font-weight: bold;
  text-align: center;
  color: #17a2b8; /* צבע ה-navbar */
}

.team-member {
  margin: 20px 0;
}

.team-member h3 {
  margin: 10px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 5px 0;
}

ul li a {
  color: #42b983;
  text-decoration: none;
}

ul li a:hover {
  text-decoration: underline;
}
</style>
