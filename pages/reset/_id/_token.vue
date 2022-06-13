<template>
  <v-content style="height: 90%">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-row>
              <v-col>
                <v-card-text class="mt-5">
                  <h1
                    class="
                      text-center
                      display-2
                      black--text
                      text--accent-3
                      mb-7
                    "
                  >
                    MoodChanger
                  </h1>
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
                      <div class="text-center mt-3">
                        <v-btn
                          color="green lighten-1"
                          style="width: 200px"
                          @click="changePassword(form)"
                          >비밀번호 변경</v-btn
                        >
                      </div>
                    </v-form>
                  </ValidationObserver>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
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