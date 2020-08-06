import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import user from './user'
import post from './posts'
import comments from './comments'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common,
    user,
    post,
    comments
  }
})
