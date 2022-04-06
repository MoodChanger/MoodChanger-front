<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid">
    <InputId
      v-model="form.user_id"
      label="이메일 주소"
      prepend-icon="mdi-account"
      counter="50"
    />
    <InputPassword
      label="비밀번호"
      v-model="form.user_pw"
      prepend-icon="mdi-lock"
    />
    <InputPassword
      label="비밀번호 확인"
      v-model="confirmPw"
      prepend-icon="mdi-lock"
    />
    <v-text-field
      label="이름"
      v-model="form.user_name"
      prepend-icon="mdi-card-account-details-outline"
    />
    <InputDate
      v-model="form.user_birth"
      label="생년월일"
      prepend-icon="mdi-calendar"
    />
    <InputRadio
      v-model="form.user_gender"
      :items="genderItems"
      row
      prepend-icon="mid-gender-male-female"
    />
    <v-btn type="submit">회원가입</v-btn>
  </v-form>
</template>

<script>
import InputId from '@/components/auth/InputId'
import InputPassword from '@/components/auth/InputPassword'
import InputDate from '@/components/auth/InputDate'
import InputRadio from '@/components/auth/InputRadio'

export default {
  name: 'SignUpForm',
  components: { InputId, InputPassword, InputDate, InputRadio },
  data() {
    return {
      valid: true,
      form: {
        user_id: '',
        user_pw: '',
        user_name: '',
        user_birth: '',
        user_gender: '',
      },
      confirmPw: '',
      genderItems: [
        { label: '남자', value: 'M' },
        { label: '여자', value: 'F' },
      ],
    }
  },
  methods: {
    async save() {
      this.$refs.form.validate()
      await this.$nextTick()
      if (!this.valid) return

      console.log(this.form)
    },
  },
}
</script>

<style>
</style>