import Vue from 'vue'
import VueRouter from 'vue-router'
import Registration from '../views/Registration.vue'
import Authorization from '../views/Authorization.vue'
import  Home from '../views/Home.vue'
import store from '../store'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Registration',
    name: 'Registration',
    component: Registration
  },
   {
    path: '/authorization',
    name: 'authorization',
    component: Authorization
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter(to, from, next){
      store.getters.checkUser ? next() : next('/authorization');
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
