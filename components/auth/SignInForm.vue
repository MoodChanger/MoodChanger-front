<template>
  <v-form>
    <!-- InputId 컴포넌트 사용하고 싶지만 중복체크가 있어서 사용 안함 -->
    <v-text-field
      label="아이디"
      v-model="form.email"
      prepend-icon="mdi-account"
      type="text"
    />
    <InputPassword
      label="비밀번호"
      v-model="form.password"
      prepend-icon="mdi-lock"
    />
    <v-btn @click="loginUser" color="primary" block>로그인</v-btn>
  </v-form>
</template>

<script>
import InputPassword from '@/components/auth/InputPassword'
export default {
  name: 'SignInForm',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    loginUser() {
      this.$emit('loginHandler', this.form)
    },
  },
  components: {
    InputPassword,
  },
}
</script>

<style>
</style>