<template>
  <v-form>
    <!-- InputId 컴포넌트 사용하고 싶지만 중복체크가 있어서 사용 안함 -->
    <v-text-field
      v-model="form.email"
      label="아이디"
      prepend-icon="mdi-account"
      type="text"
      color="green darken-1"
    />
    <InputPassword
      v-model="form.password"
      label="비밀번호"
      prepend-icon="mdi-lock"
      color="green darken-1"
    />
    <div class="text-center mt-3">
      <v-btn
        color="green lighten-1"
        style="width: 100px"
        class="mx-2"
        @click="loginUser"
        >로그인</v-btn
      >
      <v-btn
        color="green lighten-1"
        style="width: 100px"
        class="mx-2"
        @click="plusStep"
        >비밀번호 찾기</v-btn
      >
    </div>
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
    plusStep() {
      this.$emit('clickStep')
    },
  },
}
</script>

<style>
</style>