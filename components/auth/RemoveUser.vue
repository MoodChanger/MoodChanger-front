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
    leave() {
      this.$emit('removeUser', this.form)
    },
  },
}
</script>

<style>
</style>