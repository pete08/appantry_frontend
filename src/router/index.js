import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserItemsIndex from '../views/UserItemsIndex.vue';
import UserShow from '../views/UserShow.vue';
import UserItemsShow from '../views/UserItemsShow.vue';
import GroceriesShow from '../views/GroceriesShow.vue';

Vue.use(VueRouter);

const routes = [
  
  {
    path: '/index',
    name: "UserItemsIndex" ,
    component: UserItemsIndex
  },
    
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/user/:id',
    name: 'UserShow',
    component: UserShow
  },
  {
    path: '/pantry/:id', //update based on current user logged in
    name: 'UserItemsShow',
    component: UserItemsShow
  },
  {
    path: '/groceries/:id', //update based on current user logged in
    name: 'GroceriesShow',
    component: GroceriesShow
  },


  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
