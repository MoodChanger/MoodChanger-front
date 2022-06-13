<template>
  <div class="text-center mt-3">
    <v-btn color="green lighten-1" style="width: 200px" @click="removeUser"
      >회원 탈퇴</v-btn
    >
  </div>
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