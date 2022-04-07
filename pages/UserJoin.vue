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
          <SignUpForm :cbCheckId="checkId" />
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
  methods: {
    checkId(id) {
      console.log('UserJoin Id', id)
      // 0 => id사용가능
      return { cnt: 0 }
    },
  },
}
</script>

<style>
</style>