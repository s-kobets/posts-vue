import Vue from 'vue'

import * as types from '../mutation-types'
import api from '../api'
// import * as getters from '../getters'

const state = {
  data: []
}

const actions = {
  getComments ({ commit }, payload) {
    api.getComments(payload)
      .then((items) => {
        commit(types.GET_COMMENTS, items.data)
      })
      .catch(err => console.error(err))
  },

  addComment ({ commit }, payload) {
    commit(types.ADD_COMMENT, payload)
  },

  setComment ({ commit }, payload) {
    commit(types.SET_COMMENT, payload)
  },

  deleteComment ({commit}, payload) {
    commit(types.DELETE_COMMENT, payload)
  }
}

const mutations = {
  [types.GET_COMMENTS] (state, payload) {
    if (!payload) {
      state.data = []
      return false
    }
    state.data = [...payload]
  },

  [types.ADD_COMMENT] (state, payload) {
    state.data.push(payload)
  },

  [types.SET_COMMENT] (state, payload) {
    Vue.set(state.data, payload.id, payload)
  },

  [types.DELETE_COMMENT] (state, payload) {
    const select = payload.id
    state.data = state.data.filter((item, key) => item.id !== select)
  }
}

export default {
  state,
  // getters,
  actions,
  mutations
}
