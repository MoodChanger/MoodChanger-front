<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10">
      <v-toolbar>{{ title }}</v-toolbar>
      <v-card-text>
        <ValidationObserver>
          <v-form>
            <InputPassword
              v-model="form.new_password1"
              label="새로운 비밀번호"
              counter="30"
              name="새로운 비밀번호"
              prepend-icon="mdi-lock"
              :rules="{
                required: true,
                min: 8,
                regex:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
              }"
            />
            <InputPassword
              v-model="form.new_password2"
              label="비밀번호 확인"
              counter="30"
              name="새로운 비밀번호 확인"
              prepend-icon="mdi-lock"
              rules="required|password:@새로운 비밀번호"
            />
            <v-btn block @click="changePassword(form)">비밀번호 변경</v-btn>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import InputPassword from '@/components/auth/InputPassword'

export default {
  name: 'ResetPassword',
  components: {
    InputPassword,
    ValidationObserver,
  },
  // asyncData({ params }) {
  //   const uid = params.id
  //   const token = params.token

  //   return {uid, token}
  // },
  data() {
    return {
      form: {
        uid: this.$route.params.id,
        token: this.$route.params.token,
        new_password1: '',
        new_password2: '',
      },
    }
  },

  computed: {
    ...mapState({
      title: (state) => state.state.title,
    }),
  },
  methods: {
    ...mapActions('modules/user', ['changePassword']),
  },
}
</script>

<style>
</style>