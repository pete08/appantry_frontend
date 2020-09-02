import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserItemsIndex from '../views/UserItemsIndex.vue';
import UserShow from '../views/UserShow.vue';
import GroceriesIndex from '../views/GroceriesIndex.vue';
import Signup from '../views/Signup.vue';
import Logout from '../views/Logout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  
  
  {
    path: '/pantry',
    name: "UserItemsIndex" ,
    component: UserItemsIndex
  },
    
  {
    path: '/home',
    name: 'Home',
    component: Home
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
    path: '/groceries', //update based on current user logged in
    name: 'GroceriesIndex',
    component: GroceriesIndex
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
