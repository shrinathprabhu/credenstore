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
    name: 'Store creds page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/upload-creds.vue')
  },
  {
    path: '/retrieve',
    name: 'Retrieve creds page',
    component: () => import('../views/download-creds.vue')
  },
  {
    path: '/retrieve/:id',
    name: 'Retrieve creds page with id',
    component: () => import('../views/download-creds.vue')
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
