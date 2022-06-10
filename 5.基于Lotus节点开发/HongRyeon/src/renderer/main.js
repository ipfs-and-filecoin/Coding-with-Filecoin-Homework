import Vue from 'vue';
import log from 'electron-log';

import App from './App';
import router from './router';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, '$log', { value: log });

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>',
}).$mount('#app');
