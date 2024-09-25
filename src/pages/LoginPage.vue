<template>
  <div class="login-page">
    <div class="image-container">
      <img src="@/assets/logAndreg2.webp" alt="Login" />
    </div>
    <div class="form-container">
      <h1 class="title">Login</h1>
      <b-form @submit.prevent="onLogin">
        <b-form-group id="input-group-username" label="Username:" label-for="username">
          <b-form-input id="username" v-model="form.username" type="text" required :state="validateState('username')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">Username is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-password" label="Password:" label-for="password">
          <b-form-input id="password" type="password" v-model="form.password" required :state="validateState('password')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary" class="w-100">Login</b-button>
        <div class="mt-2 text-center">
          Do not have an account yet?
          <router-link to="register"> Register here</router-link>
        </div>
      </b-form>
      <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
        Login failed: {{ form.submitError }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from 'vuex';
import { mockLogin , login} from "../services/auth.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async onLogin() {
      console.log("login button clicked");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      try {
        const loginData = {
          username: this.form.username,
          password: this.form.password
        };
        console.log("Sending login request with data:", loginData);

        const response = await login(loginData); 
        // const response = await login(this.form); // Assuming mockLogin handles login
        console.log("Response from login:", response);

        if (response && response.success) {
          console.log("Login successful:", response.message);
          localStorage.setItem('loggedInUser', this.form.username);
          // Update Vuex store to indicate user is logged in
          this.$root.store.login(this.form.username);
          this.$router.push("/"); // Redirect to the main page

        } else {
          this.form.submitError = response.message; // Show login error message
          console.log("Login failed:", response.message);
        }
      }catch (error) {
        console.log("Login error:", error);
        this.form.submitError = "An error occurred during login.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  height: 100vh; /* Full height */
  overflow: hidden;
}

.image-container {
  flex: 1;
  background-color: #f8f9fa;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px; /* Increased padding for more space from the image */
}

.title {
  text-align: center;
  color: #9168b3; /* Update to match the navbar color */
  font-size: 4em;
  font-weight: bold;
}

.b-form-group {
  margin-bottom: 1rem;
}

.b-form-group > label {
  font-weight: bold;
}

.b-form-input, .b-form-select {
  margin-top: 0.5rem;
}

.b-button {
  width: 100%;
  padding: 10px;
}

.b-button:not(:last-child) {
  margin-right: 10px;
}

.b-alert {
  margin-top: 1rem;
}

.mt-2 {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}
</style>
