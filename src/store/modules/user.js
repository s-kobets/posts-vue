import * as types from '../mutation-types'

const state = {
  data: {}
}

const actions = {
  setUser ({ commit }) {
    const idUser = Math.ceil(Math.random() * 10)
    commit(types.SET_USER, {idUser})
  }
}

const mutations = {
  [types.SET_USER] (state, payload) {
    state.data = {...payload}
  }
}

export default {
  state,
  actions,
  mutations
}
