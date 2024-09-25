<template>
  <div class="register-page">
    <div class="image-container">
      <img src="@/assets/logAndreg2.webp" alt="Register" />
    </div>
    <div class="form-container">
      <h1 class="title">Register</h1>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group id="input-group-username" label="Username:" label-for="username">
          <b-form-input id="username" v-model="$v.form.username.$model" type="text" :state="validateState('username')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">Username is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.username.length">Username length should be between 3-8 characters long</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">Username must contain only letters</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-firstname" label="First Name:" label-for="firstname">
          <b-form-input id="firstname" v-model="$v.form.firstname.$model" type="text" :state="validateState('firstname')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstname.required">First name is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-lastname" label="Last Name:" label-for="lastname">
          <b-form-input id="lastname" v-model="$v.form.lastname.$model" type="text" :state="validateState('lastname')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastname.required">Last name is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-email" label="Email:" label-for="email">
          <b-form-input id="email" v-model="$v.form.email.$model" type="email" :state="validateState('email')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">Email is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.email.email">Invalid email address</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-country" label="Country:" label-for="country">
          <b-form-select id="country" v-model="$v.form.country.$model" :options="countries" :state="validateState('country')"></b-form-select>
          <b-form-invalid-feedback>Country is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-password" label="Password:" label-for="password">
          <b-form-input id="password" type="password" v-model="$v.form.password.$model" :state="validateState('password')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="$v.form.password.$error">Password must be 5-10 characters long, contain at least one number and one special character</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-confirmedPassword" label="Confirm Password:" label-for="confirmedPassword">
          <b-form-input id="confirmedPassword" type="password" v-model="$v.form.confirmedPassword.$model" :state="validateState('confirmedPassword')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">Password confirmation is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.sameAsPassword">The confirmed password is not equal to the original password</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary" class="ml-2 w-75">Register</b-button>
        <div class="mt-2">
          You have an account already?
          <router-link to="login"> Log in here</router-link>
        </div>
      </b-form>
      <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
        Register failed: {{ form.submitError }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import countries from "../assets/countries";
import { required, minLength, maxLength, alpha, sameAs, email, helpers } from "vuelidate/lib/validators";
import { mockRegister , register } from "../services/auth.js";

const passwordComplexity = helpers.regex(
  "passwordComplexity",
  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{5,10}$/
);

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "Please select a country", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstname: {
        required
      },
      lastname: {
        required
      },
      email: {
        required,
        email
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        passwordComplexity
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    this.countries.push(...countries.map(country => ({ value: country, text: country })));
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const userDetails = {
          username: this.form.username,
          password: this.form.password,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          country: this.form.country,
          email: this.form.email
        };

        // const response = mockRegister(userDetails);
        const response = await axios.post("https://recipesite.cs.bgu.ac.il/register", userDetails);

        if (response.status === 200 || response.status === 201) {
          this.$router.push("/login");
        } else {
          this.form.submitError = response.response.data.message;
        }
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    async onRegister() {
      console.log("Register button clicked");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      await this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register-page {
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
  color: #aa66ba; /* Update to match the navbar color */
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

.ml-2 {
  margin-left: 0.5rem;
}

.w-75 {
  width: 75%;
}
</style>
