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
      <h3>Razan Jbara</h3>
      <p>Student Developer</p>
      <p>A keen developer with a passion for learning new things.</p>
    </div>
    
    <h2>Previous Exercises</h2>
    <ExerciseLinks />

  </div>
</template>

<script>
import ExerciseLinks from '@/components/ExerciseLinks.vue'; // Adjust the path based on your project structure

export default {
  name: 'AboutPage',
  components: {
    ExerciseLinks,
  },
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
  color: #9f71ad; /* Navbar color */
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
