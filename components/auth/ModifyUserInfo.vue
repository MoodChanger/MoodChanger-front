<template>
  <ValidationObserver>
    <v-form>
      <InputPassword
        v-model="passwordForm.new_password1"
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
        v-model="passwordForm.new_password2"
        label="새로운 비밀번호 확인"
        name="새로운 비밀번호 확인"
        counter="30"
        prepend-icon="mdi-lock"
        rules="required|password:@새로운 비밀번호"
      />
      <InputPassword
        v-model="passwordForm.old_password"
        label="예전 비밀번호 확인"
        name="예전 비밀번호 확인"
        counter="30"
        prepend-icon="mdi-lock"
      />
      <v-btn class="mt-4" color="primary" block @click="updateUserPw"
        >비밀번호 수정</v-btn
      >
    </v-form>
    <v-form>
      <ValidationProvider v-slot="{ errors }" rules="required" name="이름">
        <v-text-field
          v-model="nameForm.user_name"
          label="닉네임"
          counter="10"
          :maxlength="10"
          prepend-icon="mdi-card-account-details-outline"
          :error-messages="errors"
        />
      </ValidationProvider>
      <v-btn class="mt-4" color="primary" block @click="updateUserName"
        >닉네임 수정</v-btn
      >
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
      passwordForm: {
        new_password1: '',
        new_password2: '',
        old_password: '',
      },
      nameForm: {
        user_name: '',
      },
    }
  },
  methods: {
    updateUserPw() {
      this.$emit('updateUserPw', this.passwordForm)
    },
    updateUserName() {
      this.$emit('updateUserName', this.nameForm)
    },
  },
}
</script>

<style>
</style>