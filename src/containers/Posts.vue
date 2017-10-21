<template>
  <div class="row">
    <div class="col-sm-12">
      <h1>Posts</h1>
      <User />
      <div class="card mb-3" v-for='post in posts' :data-userId='post.userId' :data-id='post.id'>
        <router-link :to="{name: 'post', params: {id: post.id}}">
          <div class="card-header">{{post.title}}</div>
        </router-link>
        <div class="card-body">
          {{post.body}}
          <p class="card-text"><small class="text-muted">Author: {{post.userId}}</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import User from '@/components/User.vue'

export default {
  data: () => ({}),

  computed: {
    ...mapState({
      user: state => state.user.data,
      posts: state => state.posts.data
    })
  },

  components: {
    User
  },

  methods: {},

  mounted () {
    this.$store.dispatch('getPosts')
    this.$store.dispatch('setUser')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
