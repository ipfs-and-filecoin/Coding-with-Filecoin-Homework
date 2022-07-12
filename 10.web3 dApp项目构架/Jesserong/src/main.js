import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap-4/node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
    props: (route) => ({ name: route.query.name })
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')