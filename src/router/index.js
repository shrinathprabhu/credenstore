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
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => 
  // },
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
