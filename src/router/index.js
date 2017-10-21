import Vue from 'vue'
import Router from 'vue-router'

const Posts = (resolve) => require(['@/containers/Posts'], resolve)
const Post = (resolve) => require(['@/containers/Post'], resolve)

Vue.use(Router)

const routes = [
  {path: '/posts', component: Posts},
  {path: '/post/:id', name: 'post', component: Post}
]

export default new Router({
  routes,
  mode: 'history',  // убираем решетку в url
  linkActiveClass: 'active'  // класс для активного линка
})
