<template>
  <div style="height: 100%">feeling 페이지</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserFeeling',
  created() {
    this.checkUser()
  },
  methods: {
    ...mapActions('modules/user', ['checkUser']),
  },
}
</script>

<style>
</style>