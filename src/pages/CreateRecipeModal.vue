<template>
    <b-modal ref="modal" hide-footer title="Create Recipe">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Title:" label-for="title">
          <b-form-input
            id="title"
            v-model="form.title"
            required
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Image URL:" label-for="image">
          <b-form-input
            id="image"
            v-model="form.image"
            required
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Ready In Minutes:" label-for="readyInMinutes">
          <b-form-input
            id="readyInMinutes"
            v-model="form.readyInMinutes"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Servings:" label-for="servings">
          <b-form-input
            id="servings"
            v-model="form.servings"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Ingredients:" label-for="ingredients">
          <b-form-textarea
            id="ingredients"
            v-model="form.ingredients"
            rows="3"
            required
          ></b-form-textarea>
        </b-form-group>
  
        <b-form-group label="Instructions:" label-for="instructions">
          <b-form-textarea
            id="instructions"
            v-model="form.instructions"
            rows="3"
            required
          ></b-form-textarea>
        </b-form-group>
  
        <b-form-checkbox v-model="form.vegan">Vegan</b-form-checkbox>
        <b-form-checkbox v-model="form.vegetarian">Vegetarian</b-form-checkbox>
        <b-form-checkbox v-model="form.glutenFree">Gluten Free</b-form-checkbox>
  
        <b-button type="submit" variant="primary">Create</b-button>
      </b-form>
    </b-modal>
  </template>
  
  <script>
  import axios from 'axios';
  import { createRecipe } from '@/services/user.js';
  
  export default {
    data() {
      return {
        form: {
          title: '',
          image: '',
          readyInMinutes: null,
          servings: null,
          ingredients: '',
          instructions: '',
          vegan: false,
          vegetarian: false,
          glutenFree: false,
        },
      };
    },
    methods: {
      show() {
        console.log('Showing modal');
        this.$refs.modal.show();
      },
      hide() {
        this.$refs.modal.hide();
      },
      async onSubmit() {
        try {
          console.log('Form data to send:', this.form);
          console.log(this.axios);
          const response = await createRecipe(this.form);
          console.log('createRecipe.vue:', response);
          if (response.status === 201) {
            this.$bvToast.toast('Recipe created successfully!', {
              title: 'Success',
              variant: 'success',
              solid: true
            });
            console.log('Recipe created:', this.form);
            this.hide();
          } else{
            throw new Error('Failed to create recipe');
          }
        } catch (error) {
          console.error('Error creating recipe:', error.response || error);
          this.$bvToast.toast('Failed to create recipe', {
            title: 'Error',
            variant: 'danger',
            solid: true
          });
        }
      },
    },
  };
  </script>
  
  
