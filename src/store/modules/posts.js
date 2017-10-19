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

  setPost ({ commit }, payload) {
    commit(types.SET_POST, payload)
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
    state.data.push(...payload)
  },

  [types.SET_POST] (state, payload) {
    const select = payload.id
    return state.data.filter((item, key) => item.id === select)
  }
}

export default {
  state,
  // getters,
  actions,
  mutations
}
