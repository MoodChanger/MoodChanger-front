<template>
  <div style="height: 100%">
    <p>currentUser : {{ currentUser }}</p>
    <p>loggedIn : {{ loggedIn }}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'UserInfo',
  computed: {
    ...mapState('modules/user', ['currentUser', 'loggedIn']),
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/userlogin')
    }
  },
}
</script>

<style>
</style>