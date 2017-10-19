import axios from 'axios'

const serverUrl = 'https://jsonplaceholder.typicode.com'

export default {
  getPosts () {
    return axios.get(`${serverUrl}/posts`)
  },

  getUserTrade (data) {
    return axios.post(`${serverUrl}/users/options`, {url: data})
  },

  setWithdraw (data) {
    return axios.put(`${serverUrl}/withdraw/${data.id}`, data)
  },

  removeWithdraw (data) {
    return axios.put(`${serverUrl}/withdraw/${data.id}`)
  }
}
