<template>
  <ValidationObserver>
    <v-form>
      <InputPassword
        v-model="form.password1"
        label="새로운 비밀번호"
        name="새로운 비밀번호"
        counter="30"
        prepend-icon="mdi-lock"
        :rules="{
          required: true,
          min: 8,
          regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
        }"
      />
      <InputPassword
        v-model="form.password2"
        label="새로운 비밀번호 확인"
        name="새로운 비밀번호 확인"
        counter="30"
        prepend-icon="mdi-lock"
        rules="required|password:@새로운 비밀번호"
      />
      <ValidationProvider v-slot="{ errors }" rules="required" name="이름">
        <v-text-field
          v-model="form.user_name"
          label="닉네임"
          counter="10"
          :maxlength="10"
          prepend-icon="mdi-card-account-details-outline"
          :error-messages="errors"
        />
      </ValidationProvider>
      <v-btn class="mt-4" color="primary" block>회원정보 수정</v-btn>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import InputPassword from '@/components/auth/InputPassword'

export default {
  name: 'ModifyUserInfo',
  components: {
    InputPassword,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        password1: '',
        password2: '',
        user_name: '',
      },
    }
  },
}
</script>

<style>
</style>