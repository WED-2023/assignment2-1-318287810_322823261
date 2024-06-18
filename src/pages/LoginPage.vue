<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-username"
        label="Username:"
        label-for="username"
        label-cols-sm="3"
        :state="validateState('username')"
      >
        <b-form-input
          id="username"
          v-model="form.username"
          type="text"
          required
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-password"
        label="Password:"
        label-for="password"
        label-cols-sm="3"
        :state="validateState('password')"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="form.password"
          required
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width: 100px; display: block;"
        class="mx-auto w-100"
      >
        Login
      </b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register here</router-link>
      </div>
    </b-form>
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
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mockLogin } from "../services/auth.js";

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
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      try {
        const response = await mockLogin(this.form); // Pass the entire form object

        if (response.status === 200) {
          // Assuming mockLogin returns { status: 200, data: { username: 'username' } }
          this.$root.store.username = response.data.username;
          localStorage.setItem("loggedInUser", response.data.username);
          this.$router.push("/");
        } else {
          this.form.submitError = response.data.message; // Assuming response.data.message contains error message
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
  max-width: 400px;
}
</style>
