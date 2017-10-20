<template>
  <div>
    <router-link :to="{path: '/'}"><< Posts</router-link>
    <h1>Posts</h1>
    <User />
    <div v-if='post'>
      <ul>
        <li><a href='#' data-event='get' v-on:click='eventPost'>Get</a></li>
        <li><a href='#' data-event='add' v-on:click='eventPost'>Add</a></li>
        <li><a href='#' data-event='edit' v-on:click='eventPost' v-if='user.idUser === post.userId'>Edit</a></li>
        <li><a href='#' data-event='delete' v-on:click='eventPost' v-if='user.idUser === post.userId'>Delete</a></li>
      </ul>
      <ul v-if="event === 'get'">
        <li :data-userId='post.userId' :data-id='post.id'>
          <h3>{{post.title}}</h3>
          <p>{{post.body}}</p>
        </li>
      </ul>

      <form v-else v-on:submit='submitForm'>
        <label>
          <p>title</p>
          <input type='text' v-if="event === 'edit'" :value='post.title' name="title"/>
          <input type='text' v-if="event === 'add'" value='' name="title"/>
        </label>
        <label>
          <p>body</p>
          <textarea rows='10' v-if="event === 'edit'" :value='post.body' name="body"/>
          <textarea rows='10' v-if="event === 'add'" value='' name="body"/>
        </label>

        <button type='submit'>Apply</button>
      </form>
    </div>

    <div v-else>Пост удален.</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import User from '@/components/User.vue'

export default {
  data: () => ({
    post: null,
    event: 'get'
  }),

  computed: {
    ...mapState({
      user: state => state.user.data,
      posts: state => state.posts.data
    })
  },

  components: {
    User
  },

  methods: {
    getData (elements) {
      const elementForm = {}
      for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].name) {
          elementForm[elements[i].name] = elements[i].value
        }
      }
      return elementForm
    },
    submitForm (e) {
      e.preventDefault()
      const dataForm = this.getData(e.target.elements)
      if (this.event === 'edit') {
        const request = {...this.post, ...dataForm}
        this.$store.dispatch('setPost', request)
        this.post = request
      } else {
        this.$store.dispatch('addPost', dataForm)
        this.post.push(dataForm)
      }
      this.event = 'get'
    },
    eventPost (e) {
      e.preventDefault()
      const eventData = e.target.getAttribute('data-event')
      this.event = eventData
      if (eventData === 'delete') {
        this.$store.dispatch('deletePost', this.post)
        this.post = null
      }
    }
  },

  mounted () {
    this.post = this.posts[this.$route.params.id - 1]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
