<template>
  <v-btn color="primary" block @click="removeUser">회원 탈퇴</v-btn>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RemoveUser',
  components: {},
  methods: {
    ...mapActions('modules/user', ['removeUser']),
  },
}
</script>

<style>
</style>