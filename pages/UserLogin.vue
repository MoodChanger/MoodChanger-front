<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10">
      <v-toolbar>{{ title }} </v-toolbar>

      <v-tabs v-model="tabs">
        <v-tab v-for="(item, index) in items" :key="index" style="flex: 1">{{
          item
        }}</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <SignInForm @loginHandler="loginUser($event)" />
          </v-tab-item>
          <v-tab-item>
            <FindPwForm @resetPw="resetPw($event)" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-text>
        <v-btn to="/userjoin" block>회원가입</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SignInForm from '@/components/auth/SignInForm'
import FindPwForm from '@/components/auth/FindPwForm'

export default {
  name: 'UserLogin',
  components: {
    SignInForm,
    FindPwForm,
  },
  data() {
    return {
      tabs: 0,
      items: ['로그인', '비밀번호 찾기'],
    }
  },
  computed: {
    ...mapState({
      title: (state) => state.state.title,
    }),
  },
  methods: {
    ...mapActions('modules/user', ['loginUser']),
    ...mapActions('modules/user', ['resetPw']),
  },
}
</script>

<style>
</style>