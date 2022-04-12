<template>
  <v-form>
    <!-- InputId 컴포넌트 사용하고 싶지만 중복체크가 있어서 사용 안함 -->
    <v-text-field label="아이디" prepend-icon="mdi-account" />
    <v-btn color="primary" block>비밀번호 찾기</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'FindPwForm',
}
</script>

<style>
</style>