<template>
  <div>
    <h2>Comments</h2>
    <div v-if='comments.length > 0'>
      <div class="card mb-3" :data-userId='comment.userId' :data-id='comment.id' v-for='comment in comments'>
        <div class="card-body" >
          <strong class="card-title">{{comment.name}}</strong>
          <p class="card-subtitle mb-2 text-muted">{{comment.email}}</p>
          <p class="card-text">{{comment.body}}</p>
          <div v-if='comment.name === userName'>
            <a href='#' class="card-link" :data-id='comment.id' data-event='edit' v-on:click='eventComment'>Edit</a>
            <a href='#' class="card-link" :data-id='comment.id' data-event='delete' v-on:click='eventComment'>Delete</a>
          </div>
        </div>
      </div>
    </div>

    <form v-on:submit='submitForm' class='bd-example'>
      <div class="form-group">
        <label>Body</label>
        <textarea class="form-control" rows='10' v-if="event === 'edit'" :value='editComment.body' name="body"/>
        <textarea class="form-control" rows='10' v-else value='' name="body"/>
      </div>

      <button type='submit' class="btn btn-primary">Apply</button>
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
    this.postId = this.$route.params.id
    this.$store.dispatch('getComments', {id: this.postId})
  }
}
</script>