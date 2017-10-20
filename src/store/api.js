import axios from 'axios'

const serverUrl = 'https://jsonplaceholder.typicode.com'

export default {
  getPosts () {
    return axios.get(`${serverUrl}/posts`)
  },

  setPost (data) {
    return axios.put(`${serverUrl}/posts/${data.id}`, data)
  },

  addPost (data) {
    return axios.post(`${serverUrl}/posts`, data)
  },

  deletePost (data) {
    return axios.delete(`${serverUrl}/posts/${data.id}`, data)
  },

  getComments (data) {
    return axios.get(`${serverUrl}/posts/${data.id}/comments`)
  }
}
