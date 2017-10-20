import * as types from '../mutation-types'
import api from '../api'
// import * as getters from '../getters'

const state = {
  data: []
}

const actions = {
  getPosts ({ commit }, payload) {
    api.getPosts(payload)
      .then((items) => {
        commit(types.GET_POSTS, items.data)
      })
      .catch(err => console.error(err))
  },

  addPost ({ commit }, payload) {
    api.addPost(payload)
    .then((items) => {
      commit(types.ADD_POST, items.data)
    })
    .catch(err => console.error(err))
  },

  setPost ({ commit }, payload) {
    api.setPost(payload)
    .then((items) => {
      commit(types.SET_POST, payload)
    })
    .catch(err => console.error(err))
  },

  deletePost ({commit}, payload) {
    api.deletePost(payload)
    .then((items) => {
      commit(types.DELETE_POST, items.data)
    })
    .catch(err => console.error(err))
  }
}

const mutations = {
  [types.GET_POSTS] (state, payload) {
    if (!payload) {
      state.data = []
      return false
    }
    state.data = [...payload]
  },

  [types.ADD_POST] (state, payload) {
    state.data.push(payload)
  },

  [types.SET_POST] (state, payload) {
    state.data[payload.id - 1] = payload
    console.log(state.data[payload.id - 1])
  },

  [types.DELETE_POST] (state, payload) {
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
