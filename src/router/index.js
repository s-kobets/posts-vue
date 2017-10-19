import Vue from 'vue'
import Router from 'vue-router'

const Home = (resolve) => require(['@/containers/Home'], resolve)
const Post = (resolve) => require(['@/containers/Post'], resolve)

Vue.use(Router)

const routes = [
  {path: '/', component: Home},
  {path: '/post/:id', name: 'post', component: Post}
]

export default new Router({
  routes,
  mode: 'history',  // убираем решетку в url
  linkActiveClass: 'active'  // класс для активного линка
})
