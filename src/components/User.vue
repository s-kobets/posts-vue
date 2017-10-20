<template>
  <p>Id User: {{user.idUser}}</p>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({}),

  computed: {
    ...mapState({
      user: state => state.user.data
    })
  },

  components: {},

  methods: {},

  created () {
    if (!this.user.idUser) {
      this.$store.dispatch('setUser')
    }
  }
}
</script>