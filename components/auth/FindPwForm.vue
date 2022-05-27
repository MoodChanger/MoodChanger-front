<template>
  <v-form>
    <!-- InputId 컴포넌트 사용하고 싶지만 중복체크가 있어서 사용 안함 -->
    <v-text-field
      v-model="email"
      label="이메일"
      prepend-icon="mdi-email"
      type="text"
    />
    <v-btn color="primary" @click="resetPw" block>비밀번호 찾기</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'FindPwForm',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    resetPw() {
      this.$emit('resetPw', this.email)
    },
  },
}
</script>

<style>
</style>