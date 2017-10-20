<template>
  <div>
    <h2>Comments</h2>
    <ul v-if='comments.length > 0'>
      <li :data-userId='comment.userId' :data-id='comment.id' v-for='comment in comments'>
        <h3>{{comment.name}}</h3>
        <p>{{comment.email}}</p>
        <p>{{comment.body}}</p>
        <ul v-if='comment.name === userName'>
          <li><a href='#' :data-id='comment.id' data-event='edit' v-on:click='eventComment'>Edit</a></li>
          <li><a href='#' :data-id='comment.id' data-event='delete' v-on:click='eventComment'>Delete</a></li>
        </ul>
      </li>
    </ul>

    <form v-on:submit='submitForm'>
      <label>
        <p>body</p>
        <textarea rows='10' v-if="event === 'edit'" :value='editComment.body' name="body"/>
        <textarea rows='10' v-else value='' name="body"/>
      </label>

      <button type='submit'>Apply</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    postId: null,
    editComment: {},
    event: 'add'
  }),

  computed: {
    ...mapState({
      user: state => state.user.data,
      comments: state => state.comments.data
    }),

    userName () {
      return `UserId=${this.postId}`
    }
  },

  components: {},

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
      dataForm.name = this.userName
      dataForm.email = `aaa@bbb.vv`
      if (this.event === 'add') {
        dataForm.id = this.comments.length
        this.$store.dispatch('addComment', dataForm)
      } else {
        this.$store.dispatch('setComment', {...this.editComment, ...dataForm})
        this.event = 'add'
      }
      e.target.reset()
    },

    eventComment (e) {
      e.preventDefault()
      const eventData = e.target.getAttribute('data-event')
      this.event = eventData
      this.editComment = this.comments[e.target.getAttribute('data-id')]
      if (eventData === 'delete') {
        this.$store.dispatch('deleteComment', this.editComment)
      }
    }
  },

  mounted () {
    this.postId = this.$route.params.id - 1
    this.$store.dispatch('getComments', {id: this.postId})
  }
}
</script>