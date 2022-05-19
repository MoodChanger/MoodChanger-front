export default async ({ $axios, store }) => {
  if (process.browser) {
    const user = JSON.parse(localStorage.getItem('user')) || ''
    if (user) {
      try {
        const accessToken = user.access_token
        await $axios.post('http://127.0.0.1:8000/token/verify/', {
          token: accessToken,
        })
      } catch (error) {
        const errorAPI = error.response
        if (errorAPI.status === 401) {
          await store.dispatch('nuxtServerInit')
        }
      }
    }
  }
}
