import { VALIDATE_FALSE, VALIDATE_TRUE } from './mutation-types'

export const state = () => ({
  validateEmail: false,
})

export const mutations = {
  [VALIDATE_TRUE](state) {
    state.validateEmail = true
  },
  [VALIDATE_FALSE](state) {
    state.validateEmail = false
  },
}

export const getters = {}

export const actions = {
  async createUser(context, form) {
    try {
      const data = await this.$axios.post('http://127.0.0.1:8000/signup/', form)
      return data
    } catch (error) {
      console.log(error.response)
    }
  },
  async duplicateCheck(context, email) {
    try {
      const checkId = await this.$axios.post(
        'http://127.0.0.1:8000/signup/check',
        email
      )
      return checkId.data
    } catch (error) {
      console.log(error.response)
    }
  },
}
