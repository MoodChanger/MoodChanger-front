<template>
  <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
  <v-menu v-else offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs">
        <v-avatar color="accent" size="32">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-switch
          label="Dark Theme"
          :input-value="darkMode"
          @change="setDarkMode($event)"
        ></v-switch>
      </v-card-text>
      <template>
        <v-card-actions class="d-flex flex-column" v-if="loggedIn">
          <p class="font-weight-bold" block>{{ currentUser.user_name }}님</p>
          <v-btn @click="logoutUser" block>로그아웃</v-btn>
        </v-card-actions>
        <div v-else>
          <v-card-actions>
            <v-btn to="/userlogin" block>로그인</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn to="/userjoin" block>회원가입</v-btn>
          </v-card-actions>
        </div>
      </template>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MoodUser',
  data() {
    return {
      isLoading: false,
      cardLodaing: true,
      isLogin: false,
      userName: '',
    }
  },
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark
    },
    ...mapState('modules/user', ['loggedIn', 'currentUser']),
  },
  mounted() {
    this.getDarkMode()
  },
  methods: {
    ...mapActions('modules/user', ['logoutUser']),
    setDarkMode(mode) {
      this.$vuetify.theme.dark = mode
      localStorage.setItem('darkMode', mode ? 'dark' : 'light')
    },
    getDarkMode() {
      const mode = localStorage.getItem('darkMode') === 'dark'
      this.$vuetify.theme.dark = mode
    },
    showCard() {
      this.cardLodaing = true
    },
  },
}
</script>

<style>
</style>