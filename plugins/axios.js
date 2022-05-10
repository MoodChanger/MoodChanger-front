// 토큰 인증 axios interceptor
export default function ({ $axios }) {
  // request
  $axios.onRequest((config) => {
    console.log('onRequest', config)
  })
  $axios.onRequestError((error) => {
    console.log('onRequestError', error)
  })

  // response
  $axios.onResponse((response) => {
    console.log('onResponse', response)
  })

  $axios.onResponseError((error) => {
    console.log('onResponseError', error)
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
