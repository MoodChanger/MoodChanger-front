<template>
  <v-form>
    <!-- InputId 컴포넌트 사용하고 싶지만 중복체크가 있어서 사용 안함 -->
    <v-text-field
      label="아이디"
      v-model="form.user_id"
      prepend-icon="mdi-account"
    />
    <InputPassword
      label="비밀번호"
      v-model="form.user_pw"
      prepend-icon="mdi-lock"
      counter="30"
    />
    <v-btn color="primary" block>로그인</v-btn>
  </v-form>
</template>

<script>
import InputPassword from '@/components/auth/InputPassword'
export default {
  name: 'SignInForm',
  data() {
    return {
      form: {
        user_id: '',
        user_pw: '',
      },
    }
  },
  components: {
    InputPassword,
  },
}
</script>

<style>
</style>