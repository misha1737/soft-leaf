import Vue from 'vue'
import VueRouter from 'vue-router'
import Registration from '../views/Registration.vue'
import Authorization from '../views/Authorization.vue'
import  Home from '../views/Home.vue'
import store from '../store'
import User from '../views/User.vue'
import PostEdit from '../views/PostEdit.vue'
import Post from '../views/Post.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/postEdit',
    name: 'postEdit',
    component: PostEdit
  },
  {
        path: '/post/:id',
        name: 'Post',
        props: true,
        component: Post
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
    path: '/user',
    name: 'user',
    component: User,
    beforeEnter(to, from, next){
      store.getters.checkUser ? next() : next('/authorization');
    }
  },
  
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
   
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
