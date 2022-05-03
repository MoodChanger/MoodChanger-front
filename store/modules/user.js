import {
  VALIDATE_FALSE,
  VALIDATE_TRUE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FETCH_USER,
  REFRESH_TOKEN,
  UPDATE_USER,
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
  [REFRESH_TOKEN](state, user) {
    state.currentUser = user
    state.loggedIn = true
  },

  [UPDATE_USER](state, user) {
    state.currentUser = user
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
      const loginData = { email: form.email, password: form.password1 }
      await context.dispatch('loginUser', loginData)
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
  async updateUser(context, form) {
    try {
      await this.$axios.put('url', form)

      // 로컬스토리지 업데이트
      const userData = JSON.parse(localStorage.getItem('user'))
      userData.user.user_name = form.user_name
      localStorage.setItem('user', JSON.stringify(userData))

      context.commit(UPDATE_USER, userData)
      this.$toast.success('수정이 완료되었습니다.')
      this.$router.push('/')
    } catch (error) {
      console.log('error', error.response)

      this.$toast.error('수정을 다시해주세요.')
      this.$router.push('/UpdateUserInfo')
    }
  },
  async removeUser(context, form) {
    try {
      // 비밀번호 인증(form.password1)
      const removeUser = await this.$axios.post('url', form)

      if (removeUser) {
        await this.$axios.delete('url', '삭제할 데이터')
        context.dispatch('logoutUser')
        this.$toast.success('회원정보가 삭제되었습니다.')
      } else {
        this.$toast.error('비밀번호가 틀렸습니다.')
      }
    } catch (error) {
      console.log('error', error.response)
      this.$toast.error('서버에 에러가 있습니다.')
    }
  },
  // access token 만료 후 refresh token으로 access token 재발급 요청
  async refreshToken(context, refreshToken) {
    this.$toast.success('referstToek 실행')
    try {
      const accrssToken = await this.$axios.post(
        'http://127.0.0.1:8000/token/refresh',
        { refresh: refreshToken }
      )
      if (accrssToken) {
        const user = JSON.parse(localStorage.getItem('user'))
        user.access_token = accrssToken
        localStorage.setItem('user', JSON.stringify(user))
        context.commit(REFRESH_TOKEN, user)
        console.log('accrssToken 재발급 성공 ', accrssToken)
      }
    } catch {
      console.log('accrssToken 재발급 실패 ')
    }
  },
  // access token, refresh token 둘 다 없을 때
  checkUser(context) {
    if (process.browser) {
      const tokenAuth = JSON.parse(localStorage.getItem('user')) || ''
      if (
        tokenAuth.access_token === undefined &&
        tokenAuth.refresh_token === undefined
      ) {
        this.$toast.error('로그인 해주세요')
        this.$router.push('/userlogin')
      }
    }
  },
}
