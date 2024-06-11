import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./routes";
import axios from "axios";
import VueAxios from "vue-axios";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);

[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));

const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false;

const shared_data = {
  server_domain: "http://localhost:3000",
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
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

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");


