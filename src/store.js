// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false, // Track user login status
    username: null,
  },
  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    },
    SET_USERNAME(state, username) {
      state.username = username; // שמירת שם המשתמש ב-Vuex
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.username = null;
      localStorage.removeItem('loggedInUser');
    },
  },
  actions: {
    login({ commit }, username) {
      // Simulate successful login
      commit('SET_LOGIN_STATUS', { status: true, username });
      commit('SET_USERNAME', { status: true, username });
      localStorage.setItem('loggedInUser', username);
    },
    logout({ commit }) {
      console.log("logout from Vuex store");
      localStorage.removeItem('username');
      localStorage.removeItem('lastSearchQuery');
      commit('LOGOUT');
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    username: state => state.username,
  },
});


