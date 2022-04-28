<template>
  <v-form>
    <!-- InputId 컴포넌트 사용하고 싶지만 중복체크가 있어서 사용 안함 -->
    <v-text-field
      v-model="form.email"
      label="아이디"
      prepend-icon="mdi-account"
      type="text"
    />
    <InputPassword
      v-model="form.password"
      label="비밀번호"
      prepend-icon="mdi-lock"
    />
    <v-btn color="primary" block @click="loginUser">로그인</v-btn>
  </v-form>
</template>

<script>
import InputPassword from '@/components/auth/InputPassword'
export default {
  name: 'SignInForm',
  components: {
    InputPassword,
  },
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
}
</script>

<style>
</style>