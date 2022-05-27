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

export const getters = {
  getLoggedIn(state) {
    return state.loggedIn
  },
}

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
  async updateUserPw(context, form) {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const accessToken = user.access_token
      this.$axios.setToken(accessToken, 'Bearer', ['post'])

      const updatePW = await this.$axios.$post(
        'http://127.0.0.1:8000/password/change/',
        form
      )
      if (updatePW) {
        context.commit(UPDATE_USER)
        this.$toast.success('비밀번호를 수정했습니다.')
        this.$router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  },
  async updateUserName(context, form) {
    try {
      console.log('username', form)
      const user = JSON.parse(localStorage.getItem('user'))
      const accessToken = user.access_token
      this.$axios.setToken(accessToken, 'Bearer', ['put'])

      const update = await this.$axios.$put(
        'http://127.0.0.1:8000/user/edit',
        form
      )

      if (update) {
        // 로컬스토리지 업데이트
        const userData = JSON.parse(localStorage.getItem('user'))
        userData.user.user_name = form.user_name
        localStorage.setItem('user', JSON.stringify(userData))

        context.commit(UPDATE_USER, userData)
        this.$toast.success(`${update.user_name}님 수정이 완료되었습니다.`)
        this.$router.push('/')
      }
    } catch (error) {
      console.log('error', error.response)

      this.$toast.error('수정을 다시해주세요.')
      this.$router.push('/UpdateUserInfo')
    }
  },
  async removeUser(context) {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const accessToken = user.access_token

      this.$axios.setToken(accessToken, 'Bearer', ['delete'])
      await this.$axios.$delete('http://127.0.0.1:8000/user/byebye')
      context.commit(LOGOUT)
      this.$router.push('/')
    } catch (error) {
      console.log('error', error)
      this.$toast.error('서버에 에러가 있습니다.')
    }
  },
  // access token 만료 후 refresh token으로 access token 재발급 요청
  async refreshToken(context) {
    if (process.browser) {
      const user = JSON.parse(localStorage.getItem('user')) || ''
      const refreshToken = user.refresh_token
      if (user) {
        try {
          const newUser = await this.$axios.post(
            'http://127.0.0.1:8000/token/refresh/',
            {
              refresh: refreshToken,
            }
          )
          // At x, Rt o
          user.access_token = newUser.data.access
          localStorage.setItem('user', JSON.stringify(user))
          context.commit(REFRESH_TOKEN, user)
          alert('Access Toekn 재발급')
        } catch {
          // At x , Rt x
          context.commit(LOGOUT)
          localStorage.removeItem('user')
          alert('Refresh Token 만료, 로그아웃')
          this.$router.push('/')
        }
      }
    }
  },
  async resetPw(context, userEmail) {
    try {
      await this.$axios.post('http://127.0.0.1:8000/password/reset/', {
        email: userEmail,
      })
      alert('이메일을 확인해주세요')
      this.$router.push('/')
    } catch (error) {
      console.log(error.response)
    }
  },
  async changePassword(context, form) {
    try {
      await this.$axios.post(
        'http://127.0.0.1:8000/password/reset/confirm/',
        form
      )
      alert('비밀번호가 변경되었습니다.')
      this.$router.push('/UserLogin')
    } catch (error) {
      console.log(error.response)
    }
  },
}
