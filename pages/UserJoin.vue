<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10">
      <v-toolbar>
        <v-toolbar-title>회원가입</v-toolbar-title>
        <v-toolbar-title class="font-weight-light text-subtitle-1"
          >(ID는 이메일 형식으로 입력해주세요)</v-toolbar-title
        >
      </v-toolbar>
      <v-card-text>
        <SignUpForm :isLoading="isLoading" @onSave="save" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SignUpForm from '@/components/auth/SignUpForm'
export default {
  name: 'UserJoin',
  components: { SignUpForm },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapState('modules/user', ['validateEmail']),
  },
  methods: {
    ...mapActions('modules/user', ['createUser']),
    async save(form) {
      try {
        if (this.validateEmail) {
          this.isLoading = true
          await this.createUser(form)
          this.isLoading = false
          console.log('form', form)
          this.$router.push('/')
        } else {
          // Toast로 바꾸기
          alert('중복검사 하세요')
        }
      } catch (error) {
        console.log('axios error', error.response)
      }
    },
  },
}
</script>

<style>
</style>