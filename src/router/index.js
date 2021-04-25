import Vue from 'vue';
import VueRouter from 'vue-router';
import classify from '../views/classify.vue';
import home from '../views/home.vue';
import shopping from '../views/shopping.vue';
import search from '../views/search.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function () {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: home,
    children: [
      {
        path: 'shopping',
        component: shopping,
      },
      {
        path: 'classify',
        name: 'classify',
        component: classify,
      },
    ],
  },
  {
    path: '*',
    redirect: '/home/classify',
  },
  {
    path: '/search',
    name: 'search',
    component: search,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
