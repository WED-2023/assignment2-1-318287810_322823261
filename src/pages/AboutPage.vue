<template>
  <div class="about-page container">
    <h1>About Us</h1>
    <p>Welcome to our recipe website! We are dedicated to providing a comprehensive platform for food enthusiasts to explore, share, and enjoy a wide variety of recipes. Our team of passionate developers has worked tirelessly to create a user-friendly and engaging experience for all our users.</p>
    
    <h2>Our Team</h2>
    <div class="team-member">
      <h3>John Doe</h3>
      <p>Project Manager</p>
      <p>John leads the team with a strong vision and exceptional project management skills, ensuring that all milestones are met on time.</p>
    </div>
    <div class="team-member">
      <h3>Jane Smith</h3>
      <p>Lead Developer</p>
      <p>Jane is the brain behind the code. Her expertise in Vue.js and frontend development has been pivotal in building this amazing platform.</p>
    </div>
    <div class="team-member">
      <h3>Mike Johnson</h3>
      <p>UI/UX Designer</p>
      <p>Mike ensures that our platform is not only functional but also visually appealing, providing a seamless user experience.</p>
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
