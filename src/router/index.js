import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '../views/landing-page.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing Page',
    component: LandingPage
  },
  {
    path: '/store',
    name: 'Store creds',
    component: () => import(/* webpackChunkName: "store-creds" */'../views/upload-creds.vue')
  },
  {
    path: '/retrieve',
    name: 'Retrieve creds',
    component: () => import(/* webpackChunkName: "retrieve-creds" */'../views/download-creds.vue')
  },
  {
    path: '/retrieve/:id',
    name: 'Retrieve creds page with id',
    component: () => import(/* webpackChunkName: "retrieve-creds" */'../views/download-creds.vue')
  },
  {
    path: '/terms-of-use',
    name: 'Terms of use',
    component: () => import(/* webpackChunkName: "terms-of-use" */'../views/terms-of-use.vue')
  },
  {
    path: '*',
    name: 'Redirect Invalid Paths to landing page',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
