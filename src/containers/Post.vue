<template>
  <div class="row">
    <div class="col-sm-12">
      <nav class="navbar navbar-light bg-light">
        <router-link :to="{path: '/posts'}" class="navbar-link"><< Posts</router-link>
      </nav>

      <h1>Post</h1>
      <User />
      <div v-if='post' class='bd-example'>
        <div class='btn-group mb-3'>
          <button type='button' data-event='get' v-on:click='eventPost' class="btn btn-primary">Get</button>
          <button type='button' data-event='add' v-on:click='eventPost' class="btn btn-primary">Add</button>
          <button type='button' data-event='edit' v-on:click='eventPost' v-if='user.idUser === post.userId' class="btn btn-primary">Edit</button>
          <button type='button' data-event='delete' v-on:click='eventPost' v-if='user.idUser === post.userId' class="btn btn-primary">Delete</button>
        </div>

        <div class="card mb-3" v-if="event === 'get'" :data-userId='post.userId' :data-id='post.id'>
          <div class="card-header">{{post.title}}</div>
          <div class="card-body">{{post.body}}</div>
        </div>

        <form v-else v-on:submit='submitForm' class='bd-example'>
          <div class="form-group">
            <label>Title</label>
            <input class="form-control" type='text' v-if="event === 'edit'" :value='post.title' name="title"/>
            <input class="form-control" type='text' v-if="event === 'add'" value='' name="title"/>
          </div>
          <div class="form-group">
            <label>Body</label>
            <textarea class="form-control" rows='10' v-if="event === 'edit'" :value='post.body' name="body"/>
            <textarea class="form-control" rows='10' v-if="event === 'add'" value='' name="body"/>
          </div>
            <button type='submit' class="btn btn-primary">Apply</button>
        </form>
      </div>

      <div v-else class="alert alert-success" role="alert">Пост удален.</div>

      <Comments :post='post' />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import User from '@/components/User.vue'
import Comments from '@/components/Comments.vue'

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
    User,
    Comments
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
