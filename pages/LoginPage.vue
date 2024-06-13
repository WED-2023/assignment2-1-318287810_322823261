<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
        :state="$v.form.username.$dirty ? !$v.form.username.$error : null"
      >
        <b-form-input
          id="Username"
          v-model.trim="$v.form.username.$model"
          type="text"
          :state="$v.form.username.$dirty ? validateState('username') : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ $v.form.username.required ? 'Username is required' : '' }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
        :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model.trim="$v.form.password.$model"
          :state="$v.form.password.$dirty ? validateState('password') : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ $v.form.password.required ? 'Password is required' : '' }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        :disabled="$v.$invalid"
      >
        Login
      </b-button>
      <div class="mt-2">
        Don't have an account yet?
        <router-link to="register">Register here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="danger"
      dismissible
      show
    >
      {{ form.submitError }}
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
        submitError: null
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
      this.form.submitError = null;
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      try {
        const success = true; // Replace with actual login logic
        const response = mockLogin(this.form.username, this.form.password, success);
        // Handle successful login
        console.log(response);
        this.$router.push("/");
      } catch (err) {
        console.error(err.response);
        this.form.submitError = err.response?.data?.message || "Login failed.";
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
