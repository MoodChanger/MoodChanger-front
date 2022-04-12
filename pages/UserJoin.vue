<template>
  <v-app>
    <div class="d-flex justify-center align-center" style="height: 100%">
      <v-card max-width="400" width="100%" elevation="10">
        <v-toolbar>
          <v-toolbar-title>회원가입</v-toolbar-title>
          <v-toolbark-item class="font-weight-light"
            >(ID는 이메일 형식으로 입력해주세요)</v-toolbark-item
          >
        </v-toolbar>
        <v-card-text>
          <SignUpForm @onSave="save" :isLoading="isLoading" />
        </v-card-text>
      </v-card>
    </div>
  </v-app>
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
  methods: {
    ...mapActions('modules/user', ['createUser']),
    async save(form) {
      try {
        if (this.validateEmail) {
          this.isLoading = true
          await this.createUser(form)
          this.isLoading = false
          console.log("form", form)
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
  computed: {
    ...mapState('modules/user', ['validateEmail']),
  },
}
</script>

<style>
</style>