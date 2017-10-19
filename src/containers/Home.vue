<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for='post in posts' :data-userId='post.userId' :data-id='post.id'>
        <h3>{{post.title}}</h3>
        <p>{{post.body}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({}),

  computed: {
    ...mapState({
      posts: state => state.posts.data
    })
  },

  components: {},

  methods: {},

  created () {
    this.$store.dispatch('getPosts')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
