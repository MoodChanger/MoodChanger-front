<template>
  <ValidationObserver>
    <v-form @submit.prevent="save" ref="form" v-model="valid">
      <InputId
        label="이메일 주소"
        v-model="form.email"
        :counter="30"
        prepend-icon="mdi-account"
        rules="required|email"
      />
      <InputPassword
        label="비밀번호"
        v-model="form.user_pw1"
        counter="30"
        prepend-icon="mdi-lock"
        rules="required|min:3"
      />
      <InputPassword
        label="비밀번호 확인"
        v-model="form.user_pw2"
        counter="30"
        prepend-icon="mdi-lock"
        rules="required"
      />
      <ValidationProvider
        :rules="{ required: true, regex: /[^~!@#$%^&*()_+|<>?:{}]/ }"
        name="이름"
        v-slot="{ errors }"
      >
        <v-text-field
          label="이름"
          v-model="form.user_name"
          counter="10"
          :maxlength="10"
          prepend-icon="mdi-card-account-details-outline"
          :error-messages="errors"
        />
      </ValidationProvider>

      <InputDate
        label="생년월일"
        v-model="form.user_birth"
        counter="10"
        prepend-icon="mdi-calendar"
        :rules="{ required: true, regex: /^\d{4}-\d{2}-\d{2}$/ }"
      />

      <InputRadio
        v-model="form.user_gender"
        :items="genderItems"
        row
        prepend-icon="mid-gender-male-female"
      />
      <v-btn type="submit" :loading="isLoading">회원가입</v-btn>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import InputId from '@/components/auth/InputId'
import InputPassword from '@/components/auth/InputPassword'
import InputDate from '@/components/auth/InputDate'
import InputRadio from '@/components/auth/InputRadio'

export default {
  name: 'SignUpForm',
  components: {
    InputId,
    InputPassword,
    InputDate,
    InputRadio,
    ValidationProvider,
  },
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
      genderItems: [
        { label: '남자', value: 'M' },
        { label: '여자', value: 'F' },
      ],
    }
  },
  props: {
    isLoading: Boolean,
    rules: {
      type: [Object, String],
      default: '',
    },
  },
  methods: {
    save() {
      // const validate = this.$refs.form.validate()
      // await this.$nextTick()
      // if (!this.valid) return
      // if (!this.$refs.id.validate()) return
      // console.log('validate ', validate)
      this.$emit('onSave', this.form)
    },
  },
}
</script>

<style>
</style>