import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: require('@/components/Crypto').default,
    },
    {
      path: '/hash',
      name: 'Hash',
      component: require('@/components/Hash').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
