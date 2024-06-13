<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <!-- Username Field -->
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must contain only letters
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name Field -->
      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last Name Field -->
      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country Field -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password Field -->
      <b-form-group
        id="input-group-password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.password.length">
          Password must be between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.password.hasNumber">
          Password must contain at least one number
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.password.hasSpecialChar">
          Password must contain at least one special character
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirm Password Field -->
      <b-form-group
        id="input-group-confirmPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmPassword"
      >
        <b-form-input
          id="confirmPassword"
          type="password"
          v-model="$v.form.confirmPassword.$model"
          :state="validateState('confirmPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.confirmPassword.sameAsPassword">
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email Field -->
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.email.email">
          Email must be valid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
      >Register</b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>


<script>
import axios from 'axios';
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  helpers
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "Select Country", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required: helpers.withMessage("Username is required", required),
        minLength: helpers.withMessage("Username must be at least 3 characters", minLength(3)),
        maxLength: helpers.withMessage("Username must be no more than 8 characters", maxLength(8)),
        alpha: helpers.withMessage("Username must contain only letters", alpha)
      },
      firstName: {
        required: helpers.withMessage("First name is required", required)
      },
      lastName: {
        required: helpers.withMessage("Last name is required", required)
      },
      country: {
        required: helpers.withMessage("Country is required", required)
      },
      password: {
        required: helpers.withMessage("Password is required", required),
        minLength: helpers.withMessage("Password must be at least 5 characters", minLength(5)),
        maxLength: helpers.withMessage("Password must be no more than 10 characters", maxLength(10)),
        hasNumber: helpers.withMessage("Password must contain at least one number", value => /\d/.test(value)),
        hasSpecialChar: helpers.withMessage("Password must contain at least one special character", value => /[!@#$%^&*(),.?":{}|<>]/.test(value))
      },
      confirmPassword: {
        required: helpers.withMessage("Password confirmation is required", required),
        sameAsPassword: helpers.withMessage("Passwords do not match", sameAs("password"))
      },
      email: {
        required: helpers.withMessage("Email is required", required),
        email: helpers.withMessage("Must be a valid email address", email)
      }
    }
  },
  mounted() {
    this.fetchCountries();
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async fetchCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        this.countries = response.data.map(country => ({
          value: country.name.common,
          text: country.name.common
        }));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    },
    async Register() {
      try {
        const userDetails = {
          username: this.form.username,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          country: this.form.country,
          password: this.form.password,
          email: this.form.email
        };

        await axios.post('http://localhost:3000/register', userDetails);
        this.$router.push("/login");
      } catch (err) {
        this.form.submitError = err.response.data.message || 'Registration failed.';
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
.title {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
