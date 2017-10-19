import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'

import posts from './modules/posts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  modules: {
    posts
  },

  actions
})
