<template>
  <div style="height: 100%">
    좋아요 보는 페이지
    <v-btn to="/useranimal">그냥 동물 보는 곳</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LikeAnimal',
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