// 토큰 인증 axios interceptor
export default function ({ $axios }) {
  // request
  $axios.onRequest((config) => {
    try {
      if (process.browser) {
        const userInfo = localStorage.getItem('user') || ''
        if (userInfo.access_token) {
          config.timeout = 10000
          config.headers['x-access-token'] = userInfo.access_token
          config.headers['x-refresh-token'] = userInfo.refresh_token
          config.headers['Content-Type'] = 'application/json'
        }
        return config
      }
    } catch (error) {
      console.log('config onrequest 에러 ', error)
      return error
    }
  })

  // response
  $axios.onResponse((response) => {
    try {
      console.log('onResponse 성공 ', response)
      return response
    } catch (error) {
      console.log('onResponse 에러 ', error)
      return error.message
    }
  })

  // axios 에러
  $axios.onError(async (error) => {
    const errorAPI = error.response.config
    const userInfo = localStorage.getItem('user') || ''
    if (
      error.response.status === 401 &&
      errorAPI.retry === undefined &&
      userInfo.refresh_token !== undefined
    ) {
      errorAPI.retry = true
      return await $axios(errorAPI)
    } else {
      return false
    }
  })
}
