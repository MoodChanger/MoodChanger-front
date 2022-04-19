import {
  VALIDATE_FALSE,
  VALIDATE_TRUE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FETCH_USER,
} from './mutation-types'

export const state = () => ({
  currentUser: {},
  loggedIn: false,
  validateEmail: false,
})

export const mutations = {
  [VALIDATE_TRUE](state) {
    state.validateEmail = true
  },
  [VALIDATE_FALSE](state) {
    state.validateEmail = false
  },
  [LOGIN_SUCCESS](state, user) {
    state.loggedIn = true
    state.currentUser = user
  },
  [LOGIN_FAILURE](state) {
    state.loggedIn = false
    state.currentUser = null
  },
  [LOGOUT](state) {
    state.loggedIn = false
    state.currentUser = null
  },
  // 나중에 회원가입하는 순간 로그인되게 하기
  [REGISTER_SUCCESS](state) {
    state.loggedIn = false
  },
  [REGISTER_FAILURE](state) {
    state.loggedIn = false
  },
  [FETCH_USER](state, payload) {
    state.currentUser = payload.user
    state.loggedIn = payload.loggedInState
  },
}

export const getters = {}

export const actions = {
  fetchUser(context) {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
      context.commit(FETCH_USER, { user: userData.user, loggedInState: true })
    } else {
      context.commit(FETCH_USER, { user: null, loggedInState: false })
    }
  },
  async createUser(context, form) {
    try {
      const data = await this.$axios.post('http://127.0.0.1:8000/signup/', form)
      context.commit(REGISTER_SUCCESS)
      return data
    } catch (error) {
      console.log(error.response)
      context.commit(REGISTER_FAILURE)
    }
  },
  async duplicateCheck(context, email) {
    try {
      // 이메일 empty로 날라오는거 못잡음
      const checkId = await this.$axios.post(
        'http://127.0.0.1:8000/signup/check',
        email
      )
      return checkId.data // false : 중복 O, true : 중복 X
    } catch (error) {
      console.log(error.response)
    }
  },
  async loginUser(context, user) {
    console.log('로그인할 때 보내는 user', user)
    try {
      this.$toast.show('로그인 중')
      const userData = await this.$axios.post(
        'http://127.0.0.1:8000/login/',
        user
      )

      if (userData) {
        this.$toast.success('로그인 성공')
        localStorage.setItem('user', JSON.stringify(userData.data))
        context.commit(LOGIN_SUCCESS, userData.data.user)
        this.$router.push('/userinfo')
      }
    } catch (error) {
      console.log('error ', error.response)
      this.$toast.error('id나 pw를 다시 확인하세요')
      context.commit(LOGIN_FAILURE)
      this.$router.push('/userlogin')
    }
  },
  logoutUser(context) {
    localStorage.removeItem('user')
    context.commit(LOGOUT)
    this.$router.push('/')
  },
}
