// Navigation Guard로 토큰 체크
export default ({ app, store }) => {
  app.router.beforeResolve(async (to, from, next) => {
    // access token 없고 refresh token만 있을 때
    if (process.browser) {
      const token = JSON.parse(localStorage.getItem('user')) || ''
      console.log('router navigation check', token)

      if (token.access_token === null && token.refresh_token !== null) {
        console.log('refresh token만 없는 경우')
        await this.$store.dispatch('refreshToken', token.refresh_token)
      }
      // access token, refresh token이 둘 다 없는 경우를 하면 무한 로딩으로 에러 뜸 -> default.vue에서 구현
      // else if (token.access_token === null && token.refresh_token === null) {
      //   console.log("둘 다 없음")
      //   return next({ name: 'UserLogin' })
      // }
    }
    return next()
  })
}
