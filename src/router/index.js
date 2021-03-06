import Vue from 'vue'
import VueRouter from 'vue-router'
import Registration from '../views/Registration.vue'
import Authorization from '../views/Authorization.vue'
import Catalog from '../views/Catalog.vue'
import User from '../views/User.vue'
import PostEdit from '../views/PostEdit.vue'
import Post from '../views/Post.vue'
import SiteMenuSetup from '../views/SiteMenuSetup.vue'
import PostList from '../views/PostList.vue'
import Users from '../views/Users.vue'
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Catalog',
      props: true,
      component: Catalog
    },
    {
      path: '/catalog/',
      name: 'Catalog',
      props: true,
      component: Catalog
    },
  {
    path: '/catalog/:id',
    name: 'Catalog',
    props: true,
    component: Catalog
  },
  {
    path: '/postEdit/:id',
    name: 'postEdit',
    props: true,
    component: PostEdit
  },
  {
    path: '/postList/',
    name: 'postList',
    component: PostList
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
    component: Registration,
  },
   {
    path: '/authorization',
    name: 'authorization',
    component: Authorization,

  },
  {
    path: '/siteMenuSetup',
    name: 'siteMenuSetup',
    component: SiteMenuSetup,

  },
  {
    path: '/user',
    name: 'user',
    component: User,
    // beforeEnter(to, from, next){
    //   store.getters.checkUser ? next() : next('/authorization');
    // }
  },
  
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
   
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    // возвращаем требуемую позицию прокрутки
    return { x: 0, y: 0 }
  }
})

export default router
