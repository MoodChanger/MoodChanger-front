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
          <SignUpForm
            :cbCheckId="checkId"
            @onSave="save"
            :isLoading="isLoading"
          />
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
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
    checkId(id) {
      console.log('UserJoin Id', id)
      // 0 => id사용가능
      return { cnt: 0 }
    },
    async save(form) {
      try {
        this.isLoading = true
        await this.$axios.post('http://127.0.0.1:8000/signup/', form)
        this.isLoading = false
      } catch(error) {
        console.log("axios error",error.response)
      }
    },
  },
}
</script>

<style>
</style>