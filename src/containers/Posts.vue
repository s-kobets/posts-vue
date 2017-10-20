<template>
  <div>
    <h1>Posts</h1>
    <User />
    <ul>
      <li v-for='post in posts' :data-userId='post.userId' :data-id='post.id'>
        <span>Author: {{post.userId}}</span>
        <router-link :to="{name: 'post', params: {id: post.id}}">
          {{post.title}}
        </router-link>
        <p>{{post.body}}</p>
      </li>
    </ul>
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
