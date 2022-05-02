<template>
  <v-form>
    <InputPassword
      v-model="form.password1"
      label="비밀번호를 인증해주세요"
      prepend-icon="mdi-lock"
    />
    <v-btn color="primary" block @click="leave">회원 탈퇴</v-btn>
  </v-form>
</template>

<script>
import InputPassword from '@/components/auth/InputPassword'
export default {
  name: 'RemoveUser',
  components: {
    InputPassword,
  },
  data() {
    return {
      form: {
        password1: '',
      },
    }
  },
  methods: {
    async leave() {
      // vuex로도 생각해보기
      // 비밀번호 인증 후
      // 인증 성공 : 인증 탈퇴를 원하는가 alert창으로 보여주기 -> 확인 버튼 누르면 회원 탈퇴되고 메인 페이지로 이동
      // 인증 실패 : 비밀번호가 틀렸습니다라고 말하기
      await alert('회원탈퇴 원하는가?')
    },
  },
}
</script>

<style>
</style>