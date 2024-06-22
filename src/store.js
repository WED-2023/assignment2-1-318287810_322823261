// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false, // Track user login status
  },
  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    login({ commit }) {
      // Simulate successful login
      commit('SET_LOGIN_STATUS', true);
    },
    logout({ commit }) {
      // Simulate logout
      commit('SET_LOGIN_STATUS', false);
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
  },
});
