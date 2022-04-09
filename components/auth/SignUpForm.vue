<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid">
    <InputId
      ref="id"
      v-model="form.email"
      label="이메일 주소"
      prepend-icon="mdi-account"
      counter="50"
      :cbCheck="cbCheckId"
      :rules="validateRules.user_id_rule"
    />
    <InputPassword
      label="비밀번호"
      v-model="form.user_pw1"
      prepend-icon="mdi-lock"
      counter="30"
      :rules="validateRules.user_pw_rule"
    />
    <InputPassword
      label="비밀번호 확인"
      v-model="form.user_pw2"
      prepend-icon="mdi-lock"
      counter="30"
      :rules="validateRules.user_pw_rule2"
    />
    <v-text-field
      label="이름"
      v-model="form.user_name"
      prepend-icon="mdi-card-account-details-outline"
      counter="10"
      :maxlength="10"
      :rules="validateRules.user_name_rule"
    />
    <InputDate
      v-model="form.user_birth"
      label="생년월일"
      prepend-icon="mdi-calendar"
      :rules="validateRules.user_birth_rule"
      counter="10"
      :maxlength="10"
    />
    <InputRadio
      v-model="form.user_gender"
      :items="genderItems"
      row
      prepend-icon="mid-gender-male-female"
    />
    <v-btn type="submit" :loading="isLoading">회원가입</v-btn>
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
        email: '',
        user_pw1: '',
        user_pw2: '',
        user_name: '',
        user_birth: '',
        user_gender: '',
      },
      // form.user_pw2: '',
      genderItems: [
        { label: '남자', value: 'M' },
        { label: '여자', value: 'F' },
      ],
      validateRules: {
        user_id_rule: [
          (v) => !!v || '아이디는 필수 입력사항입니다.',
          (v) => {
            const replaceV = v.replace(/(\s*)/g, '')
            const pattern =
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
            return pattern.test(replaceV) || '이메일 형식으로 입력해주세요'
          },
        ],
        user_pw_rule: (v) => !!v || '비밀번호는 필수 입력사항입니다.',
        user_pw_rule2: [
          (v) => !!v || '비밀번호는 필수 입력사항입니다.',

          (v) => v === this.form.user_pw1 || '비밀번호가 일치하지 않습니다.',
        ],
        user_name_rule: [
          (v) => !!v || '이름은 필수 입력사항입니다.',
          (v) =>
            !/[~!@#$%^&*()_+|<>?:{}]/.test(v) ||
            '이름에는 특수문자를 사용할 수 없습니다.',
        ],
      },
    }
  },
  props: {
    cbCheckId: {
      type: Function,
      default: null,
    },
    isLoading: Boolean
  },
  methods: {
    async save() {
      const validate = this.$refs.form.validate()
      await this.$nextTick()
      if (!this.valid) return
      if (!this.$refs.id.validate()) return

      console.log('validate ', validate)
      this.$emit('onSave',this.form )
    },
  },
}
</script>

<style>
</style>