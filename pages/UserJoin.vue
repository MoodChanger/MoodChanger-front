<template>
  <v-content style="height: 90%">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-row>
              <v-col cols="12" md="4" class="green lighten-1">
                <v-card-text class="white--text mt-5 mb-5">
                  프랑시스 북간도에 별에도 이름을 많은 묻힌 그리고 패,
                  까닭입니다. 어머님, 이름과, 아름다운 겨울이 별 언덕 한 다
                  사람들의 거외다. 이웃 자랑처럼 아무 사람들의 있습니다. 이 것은
                  한 그리고 아직 까닭입니다.
                </v-card-text>
                <div class="text-center">
                  <v-btn outlined style="width: 100px" to="/UserLogin"
                    >로그인</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12" md="8">
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
                  <SignUpForm :isLoading="isLoading" @onSave="save" />
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>

  <!-- <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10">
      <v-toolbar>
        <v-toolbar-title>회원가입</v-toolbar-title>
        <v-toolbar-title class="font-weight-light text-subtitle-1"
          >(ID는 이메일 형식으로 입력해주세요)</v-toolbar-title
        >
      </v-toolbar>
      <v-card-text>
        <SignUpForm :isLoading="isLoading" @onSave="save" />
      </v-card-text>
    </v-card>
  </div> -->
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SignUpForm from '@/components/auth/SignUpForm'
export default {
  name: 'UserJoin',
  components: { SignUpForm },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapState('modules/user', ['validateEmail']),
  },
  methods: {
    ...mapActions('modules/user', ['createUser']),
    async save(form) {
      try {
        if (this.validateEmail) {
          this.isLoading = true
          await this.createUser(form)
          this.isLoading = false
          console.log('form', form)
          this.$router.push('/')
        } else {
          // Toast로 바꾸기
          alert('중복검사 하세요')
        }
      } catch (error) {
        console.log('axios error', error.response)
      }
    },
  },
}
</script>

<style>
</style>