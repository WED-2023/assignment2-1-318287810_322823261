import Vue from "vue";
import App from "./App.vue";
import store from './store';
import VueAxios from "vue-axios";
import axios from "axios";
import './scss/form-style.scss';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import routes from "./routes";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faHeart as fasHeart, faLeaf, faCarrot, faBreadSlice, faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faClock, fasHeart, farHeart ,faLeaf, faCarrot, faBreadSlice, faThumbsUp, faEye);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// axios.defaults.withCredentials = true;

const router = new VueRouter({
  routes,
});

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const shared_data = {
  //server_domain: "http://localhost:3000",
  server_domain: "http://recipesite.cs.bgu.ac.il",
  username: localStorage.getItem("username"),
  lastSearchQuery: localStorage.getItem("lastSearchQuery") || '',
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout main.js");
    localStorage.removeItem("username");
    localStorage.removeItem("lastSearchQuery");
    this.username = undefined;
    this.lastSearchQuery = '';
  },
};

Vue.mixin({
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data: shared_data,
  render: (h) => h(App),
}).$mount("#app");
